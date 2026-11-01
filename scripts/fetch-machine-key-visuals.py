#!/usr/bin/env python3
"""Collect machine key visuals from the source links already stored in the catalog.

The script prefers manufacturer/official pages, keeps a small local JPEG for stable
display, and writes a review manifest. It does not edit machine-library.js; only
reviewed manifest entries are applied to the catalog.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import json
import mimetypes
import re
import shutil
import ssl
import subprocess
import tempfile
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LIBRARY = ROOT / "machine-library.js"
OUTPUT_DIR = ROOT / "assets" / "machines"
MANIFEST = OUTPUT_DIR / "manifest.json"
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/140 Safari/537.36"
OFFICIAL_WORDS = re.compile(r"公式|オンライン博物館|機種サイト|製品|メーカー|発表資料|販売実績")
KNOWN_MAKER_DOMAINS = (
    "sammy.co.jp", "sankyo-fever.jp", "sanyobussan.co.jp", "kyoraku.co.jp",
    "fujimarukun.co.jp", "newgin.co.jp", "heiwanet.co.jp", "universal-777.com",
    "daitogiken.com", "sansei-rd.com", "enterrise.co.jp", "eva-project.jp",
    "fields.biz", "kitac.jp", "yamasa.co.jp", "d-light.co.jp", "daiichi777.jp",
    "nishijin.co.jp", "takao.gr.jp", "bellco.co.jp", "net-fun.co.jp",
)
PWORLD_IDS = {
    "rezero-season2": "9931",
    "bancho-otoko-no-itadaki": "10179",
    "kamen-rider-black-light": "10584",
    "fever-yokai-watch": "10549",
    "karakuri2-maou": "10115",
    "shin-eva-type-rei": "9925",
    "hokuto10-pachinko": "10054",
    "kaguya-sama-slot": "10091",
    "shin-eva-slot": "10196",
    "dumbbell-slot": "10141",
    "symphogear-seigi-slot": "10050",
    "rezero-onigakari": "9537",
    "neo-im-juggler": "10269",
    "gogo-juggler3": "9848",
    "funky-juggler2": "9446",
    "oumi5-agnes": "9833",
    "hokuto11-boukyousei": "10359",
    "fever-kinnikuman": "10432",
    "bakemonogatari-oni99": "10450",
    "im-juggler-ex": "9126",
    "juggler-girls-ss": "10009",
    "fire-force2-slot": "10415",
    "okiumi6-enako": "10462",
    "my-juggler-v": "9514",
    "mr-juggler": "10056",
    "dragon-hanahana-senko": "9924",
    "haru-ichiban-2026": "10533",
    "toaru-index2-slot": "10516",
    "hokuto-kyoteki-lt": "9971",
    "gundam-seed-slot": "10255",
    "biohazard5-slot": "10217",
    "yoshimune-slot": "10242",
    "haihai-shiosai-re": "10553",
    "madoka3-pachinko": "10046",
    "tokyo-revengers-slot": "10313",
    "super-blackjack-slot": "10174",
    "blue-lock-pachinko": "10302",
    "hokuto-boukyousei": "9808",
    "railgun2-pachinko": "10092",
    "dmc5-st-slot": "10277",
    "tokyo-revengers-pachinko": "10486",
    "godzilla-eva-slot": "9990",
}
EXTRA_SOURCES = {
    "granbelm-319": [("HAZUSE 機種情報", "https://hazuse.com/machine/pachinko/PX0380/genre/101/")],
    "ggo-slot": [("P-WORLD 発表記事", "https://news.p-world.co.jp/articles/34077/amusement")],
    "fire-force2-99": [("P-WORLD 発表記事", "https://news.p-world.co.jp/articles/34058/yugitsushin")],
    "blue-reflection-tie": [("P-WORLD 発表記事", "https://news.p-world.co.jp/articles/34689/amusement")],
    "vivy-slot": [("HAZUSE 機種情報", "https://hazuse.com/machine/pachislot/6S0559/genre/209/")],
    "majo-to-yajuu-slot": [("藤商事 公式機種情報", "https://www.fujimarukun.co.jp/products/l_majo/")],
}
DIRECT_IMAGES = {
    "super-bingo-neo-slot": (
        "https://idn.p-world.co.jp/machines/10142/image/thumb_1.jpg",
        "https://www.p-world.co.jp/machine/database/10142",
        "P-WORLD 機種情報",
    ),
    "keiji-kumo": (
        "https://yugi-nippon.com/wp-content/uploads/2026/10/ccd4e648b6792c2d10de7b0ae2219753.jpg",
        "https://yugi-nippon.com/pachinko-new-machine/post-80698/",
        "遊技日本 新台記事",
    ),
    "garo-yami-slot": (
        "https://chonborista.com/wp-content/uploads/2026/09/l_garo_yamiterasu_kyotai-351x600.webp",
        "https://chonborista.com/slot/sansei-slot/270768/",
        "ちょんぼりすた 機種情報",
    ),
    "godzilla-eva2-slot": (
        "https://yugi-nippon.com/wp-content/uploads/2026/10/ffc67e7a5c31462ce0ffe377ab1ca0c0-1.jpg",
        "https://yugi-nippon.com/pachinko-new-machine/post-80463/",
        "遊技日本 新台記事",
    ),
    "garo12-gokugen": (
        "https://www.sansei-rd.co.jp/p_garo_archive/images/archive/machine/main12.png",
        "https://www.sansei-rd.co.jp/p_garo_archive/archive/p_garo12_ok.html",
        "サンセイR&D 公式機種情報",
    ),
    "granbelm-319": (
        "https://image.nana-press.com/kaiseki/machine/1240/20261008173232_6ac7552029085.jpeg",
        "https://nana-press.com/kaiseki/machine/1240/",
        "なな徹 機種情報",
    ),
    "ggo-slot": (
        "https://idn.p-world.co.jp/news/amusement/10005316/10005316_2.png",
        "https://news.p-world.co.jp/articles/34077/amusement",
        "P-WORLD 発表記事",
    ),
    "fire-force2-99": (
        "https://idn.p-world.co.jp/news/yugitsushin/127285/127285_1.jpg",
        "https://news.p-world.co.jp/articles/34058/yugitsushin",
        "P-WORLD 発表記事",
    ),
    "blue-reflection-tie": (
        "https://idn.p-world.co.jp/news/amusement/10005461/10005461_3.jpg",
        "https://news.p-world.co.jp/articles/34689/amusement",
        "P-WORLD 発表記事",
    ),
    "vivy-slot": (
        "https://www.daitogiken.com/contents/product/slot/vivy/img/top/to_main_sp.jpg",
        "https://www.daitogiken.com/contents/product/slot/vivy/",
        "大都技研 公式機種情報",
    ),
    "majo-to-yajuu-slot": (
        "https://yugi-nippon.com/wp-content/uploads/2026/10/b4c8fee9f26b5e7c58e344512190df9a.jpg",
        "https://yugi-nippon.com/pachinko-new-machine/post-80481/",
        "遊技日本 新台記事",
    ),
}


class MetaImageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.images: list[tuple[int, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = {str(k).lower(): (v or "") for k, v in attrs}
        if tag.lower() == "meta":
            key = (data.get("property") or data.get("name") or data.get("itemprop") or "").lower()
            value = data.get("content", "").strip()
            priorities = {
                "og:image:secure_url": 0,
                "og:image": 1,
                "twitter:image": 2,
                "twitter:image:src": 3,
                "image": 4,
            }
            if value and key in priorities:
                self.images.append((priorities[key], value))
        elif tag.lower() == "link":
            rel = data.get("rel", "").lower()
            href = data.get("href", "").strip()
            if href and ("image_src" in rel or "preload" in rel and data.get("as", "").lower() == "image"):
                self.images.append((5, href))


class BingImageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.images: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() != "a":
            return
        data = {str(k).lower(): (v or "") for k, v in attrs}
        payload = data.get("m", "")
        if not payload:
            return
        try:
            item = json.loads(payload)
        except json.JSONDecodeError:
            return
        image_url = str(item.get("murl", ""))
        page_url = str(item.get("purl", ""))
        if image_url.startswith(("http://", "https://")):
            self.images.append((image_url, page_url))


def request(url: str, *, limit: int = 3_000_000) -> tuple[bytes, str, str]:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
            "Accept-Language": "ja,en-US;q=0.8,en;q=0.6",
        },
    )
    context = ssl.create_default_context()
    with urllib.request.urlopen(req, timeout=16, context=context) as response:
        body = response.read(limit + 1)
        if len(body) > limit:
            raise ValueError("response too large")
        return body, response.headers.get_content_type(), response.geturl()


def catalog_entries() -> list[dict[str, object]]:
    text = LIBRARY.read_text(encoding="utf-8")
    matches = list(re.finditer(r'^  "([^"]+)": \{', text, re.M))
    entries: list[dict[str, object]] = []
    for index, match in enumerate(matches):
        block = text[match.start() : matches[index + 1].start() if index + 1 < len(matches) else len(text)]
        slug = match.group(1)
        name_match = re.search(r'\n\s+name:\s*"([^"]+)"', block)
        maker_match = re.search(r'maker:\s*"([^"]+)"', block)
        type_match = re.search(r'type:\s*"([^"]+)"', block)
        sources = re.findall(r'\["([^"]+)",\s*"(https?://[^"]+)"\]', block)
        has_image = bool(re.search(r'\n\s+image:', block))
        entries.append(
            {
                "slug": slug,
                "name": name_match.group(1) if name_match else slug,
                "maker": maker_match.group(1) if maker_match else "",
                "type": type_match.group(1) if type_match else "",
                "sources": sources,
                "has_image": has_image,
            }
        )
    return entries


def source_rank(source: tuple[str, str]) -> tuple[int, int]:
    label, url = source
    host = urllib.parse.urlparse(url).netloc.lower()
    if OFFICIAL_WORDS.search(label) or any(domain in host for domain in KNOWN_MAKER_DOMAINS):
        return (0, 0)
    if "p-world.co.jp" in host:
        return (2, 0)
    if any(domain in host for domain in ("1geki.jp", "p-town.dmm.com", "hisshobon", "nana-press.com")):
        return (3, 0)
    return (1, 0)


def page_image_candidates(page_url: str) -> list[str]:
    if page_url.lower().split("?", 1)[0].endswith(".pdf"):
        return []
    body, content_type, final_url = request(page_url)
    if not content_type.startswith("text/") and "html" not in content_type:
        return []
    parser = MetaImageParser()
    parser.feed(body.decode("utf-8", errors="ignore"))
    result: list[str] = []
    for _, candidate in sorted(parser.images):
        absolute = urllib.parse.urljoin(final_url, candidate)
        if absolute.startswith(("http://", "https://")) and absolute not in result:
            result.append(absolute)
    return result[:6]


def search_image_candidates(entry: dict[str, object]) -> list[tuple[str, str]]:
    machine_kind = "パチンコ" if entry.get("type") == "pachinko" else "スロット"
    query = urllib.parse.quote_plus(f"{entry['name']} {machine_kind} 実機")
    body, content_type, _ = request(f"https://www.bing.com/images/search?q={query}&form=HDRSC2&first=1")
    if not content_type.startswith("text/") and "html" not in content_type:
        return []
    parser = BingImageParser()
    parser.feed(body.decode("utf-8", errors="ignore"))
    return parser.images[:24]


def image_dimensions(path: Path) -> tuple[int, int]:
    result = subprocess.run(
        ["/usr/bin/sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)],
        capture_output=True,
        text=True,
        timeout=15,
        check=False,
    )
    width = re.search(r"pixelWidth:\s*(\d+)", result.stdout)
    height = re.search(r"pixelHeight:\s*(\d+)", result.stdout)
    return (int(width.group(1)), int(height.group(1))) if width and height else (0, 0)


def fetch_image(url: str, target: Path, min_width: int = 420) -> tuple[int, int] | None:
    lowered = urllib.parse.urlparse(url).path.lower()
    rejected_patterns = (
        "/common/img/ogp.",
        "/common/images/ogp.",
        "/asset/img/ogp.png",
        "/assets/images/common/icon_twitter_card.png",
        "tennabi-logo-512.png",
        "/common/img/layout/ogp_img.jpg",
        "/wp-content/uploads/2023/09/character1.jpg",
        "cropped-c8997a34-88fc-425f-a1c9-771ccab59d54.png",
        "suropachi-bg-compressed.webp",
        "favicon",
        "apple-touch-icon",
    )
    if any(pattern in lowered for pattern in rejected_patterns):
        return None
    try:
        data, content_type, _ = request(url, limit=8_000_000)
    except Exception:
        return None
    image_like_path = Path(urllib.parse.urlparse(url).path).suffix.lower() in (".jpg", ".jpeg", ".png", ".webp")
    if not (content_type.startswith("image/") or content_type == "application/octet-stream" and image_like_path) or len(data) < 12_000:
        return None
    suffix = mimetypes.guess_extension(content_type) or Path(urllib.parse.urlparse(url).path).suffix or ".img"
    with tempfile.TemporaryDirectory(prefix="ichigeki-image-") as temp_dir:
        raw = Path(temp_dir) / f"source{suffix}"
        converted_file = Path(temp_dir) / "converted.jpg"
        raw.write_bytes(data)
        width, height = image_dimensions(raw)
        if width < min_width or height < 220:
            return None
        converted = subprocess.run(
            [
                "/usr/bin/sips", "-s", "format", "jpeg", "-s", "formatOptions", "72",
                "-Z", "1000", str(raw), "--out", str(converted_file),
            ],
            capture_output=True,
            text=True,
            timeout=30,
            check=False,
        )
        if converted.returncode != 0 or not converted_file.exists() or converted_file.stat().st_size < 8_000:
            return None
        converted_file.replace(target)
        return image_dimensions(target)


def collect(entry: dict[str, object], search_missing: bool = False, force: bool = False) -> dict[str, object]:
    slug = str(entry["slug"])
    if bool(entry["has_image"]) and not force:
        return {"slug": slug, "status": "existing"}
    sources = sorted(EXTRA_SOURCES.get(slug, []) + list(entry["sources"]), key=source_rank)
    target = OUTPUT_DIR / f"{slug}-key-visual.jpg"
    errors: list[str] = []
    direct = DIRECT_IMAGES.get(slug)
    if direct:
        image_url, source_url, credit = direct
        dimensions = fetch_image(image_url, target, min_width=280)
        if dimensions:
            return {
                "slug": slug,
                "name": entry["name"],
                "path": f"assets/machines/{target.name}",
                "alt": f"{entry['name']}のキービジュアル",
                "credit": credit,
                "source": source_url,
                "imageSource": image_url,
                "width": dimensions[0],
                "height": dimensions[1],
                "official": "公式" in credit,
                "status": "downloaded",
            }
    for label, source_url in sources[:5]:
        try:
            candidates = page_image_candidates(source_url)
        except Exception as error:
            errors.append(f"{label}: {type(error).__name__}")
            continue
        for image_url in candidates:
            dimensions = fetch_image(image_url, target)
            if not dimensions:
                continue
            official = source_rank((label, source_url))[0] == 0
            credit = str(entry["maker"]) if official and entry["maker"] else label
            return {
                "slug": slug,
                "name": entry["name"],
                "path": f"assets/machines/{target.name}",
                "alt": f"{entry['name']}のキービジュアル",
                "credit": credit,
                "source": source_url,
                "imageSource": image_url,
                "width": dimensions[0],
                "height": dimensions[1],
                "official": official,
                "status": "downloaded",
            }
    pworld_id = PWORLD_IDS.get(slug)
    if pworld_id:
        image_url = f"https://idn.p-world.co.jp/machines/{pworld_id}/image/thumb_1.jpg"
        dimensions = fetch_image(image_url, target)
        if dimensions:
            return {
                "slug": slug,
                "name": entry["name"],
                "path": f"assets/machines/{target.name}",
                "alt": f"{entry['name']}の実機画像",
                "credit": "P-WORLD 機種情報",
                "source": f"https://www.p-world.co.jp/machine/database/{pworld_id}",
                "imageSource": image_url,
                "width": dimensions[0],
                "height": dimensions[1],
                "official": False,
                "status": "downloaded",
            }
    if search_missing:
        try:
            search_candidates = search_image_candidates(entry)
        except Exception as error:
            errors.append(f"image search: {type(error).__name__}")
            search_candidates = []
        for image_url, page_url in search_candidates:
            dimensions = fetch_image(image_url, target)
            if not dimensions:
                continue
            return {
                "slug": slug,
                "name": entry["name"],
                "path": f"assets/machines/{target.name}",
                "alt": f"{entry['name']}のキービジュアル",
                "credit": str(entry["maker"]) or "画像出典",
                "source": page_url or image_url,
                "imageSource": image_url,
                "width": dimensions[0],
                "height": dimensions[1],
                "official": False,
                "status": "downloaded-search",
            }
    if target.exists():
        target.unlink()
    return {"slug": slug, "name": entry["name"], "status": "missing", "errors": errors[:3]}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--workers", type=int, default=6)
    parser.add_argument("--retry-missing", action="store_true")
    parser.add_argument("--search-missing", action="store_true")
    parser.add_argument("--discard-search", action="store_true")
    parser.add_argument("--slugs", nargs="*", default=[])
    args = parser.parse_args()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    existing_manifest: list[dict[str, object]] = []
    if MANIFEST.exists():
        existing_manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if args.discard_search:
        for item in existing_manifest:
            if item.get("status") != "downloaded-search":
                continue
            path = ROOT / str(item.get("path", ""))
            if path.is_file():
                path.unlink()
            item["status"] = "missing"
            item.pop("path", None)
            item.pop("imageSource", None)
        MANIFEST.write_text(json.dumps(existing_manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("discarded unreviewed image-search results")
        return 0
    completed = {str(item.get("slug")) for item in existing_manifest if item.get("status") == "downloaded"}
    entries = [entry for entry in catalog_entries() if args.retry_missing or str(entry["slug"]) not in completed]
    if args.slugs:
        requested = set(args.slugs)
        entries = [entry for entry in entries if str(entry["slug"]) in requested]
    if args.limit:
        entries = entries[: args.limit]

    results: list[dict[str, object]] = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=max(1, args.workers)) as executor:
        futures = {executor.submit(collect, entry, args.search_missing, args.retry_missing): entry for entry in entries}
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
            results.append(result)
            print(f"{result['status']:10} {result['slug']}", flush=True)

    by_slug = {str(item.get("slug")): item for item in existing_manifest}
    by_slug.update({str(item.get("slug")): item for item in results})
    ordered = [by_slug[str(entry["slug"])] for entry in catalog_entries() if str(entry["slug"]) in by_slug]
    MANIFEST.write_text(json.dumps(ordered, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    downloaded = sum(item.get("status") in ("downloaded", "downloaded-search") for item in ordered)
    missing = sum(item.get("status") == "missing" for item in ordered)
    print(f"manifest: {downloaded} downloaded, {missing} missing")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
