#!/usr/bin/env python3
"""Apply reviewed image manifest entries to the machine catalog."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LIBRARY = ROOT / "machine-library.js"
MANIFEST = ROOT / "assets" / "machines" / "manifest.json"


def js_string(value: object) -> str:
    return json.dumps(str(value), ensure_ascii=False)


def main() -> int:
    source = LIBRARY.read_text(encoding="utf-8")
    catalog_end = source.index("\n};", source.index("window.ICHIGEKI_MACHINES"))
    catalog = source[:catalog_end]
    tail = source[catalog_end:]
    applied = 0

    for item in json.loads(MANIFEST.read_text(encoding="utf-8")):
        if item.get("status") != "downloaded":
            continue
        slug = re.escape(str(item["slug"]))
        pattern = re.compile(rf'(^  "{slug}": \{{\n.*?^    name:.*?\n)', re.MULTILINE | re.DOTALL)
        match = pattern.search(catalog)
        if not match:
            raise RuntimeError(f"catalog entry not found: {item['slug']}")
        block_start = match.start()
        next_entry = re.search(r'^  "[^"]+": \{', catalog[match.end():], re.MULTILINE)
        block_end = match.end() + (next_entry.start() if next_entry else len(catalog) - match.end())
        block = catalog[block_start:block_end]
        fields = (
            f"    image: {js_string(item['path'])},\n"
            f"    imageAlt: {js_string(item['alt'])},\n"
            f"    imageCredit: {js_string(item['credit'])},\n"
            f"    imageSource: {js_string(item['source'])},\n"
        )
        existing = re.search(
            r'^    image:.*\n^    imageAlt:.*\n^    imageCredit:.*\n^    imageSource:.*\n',
            block,
            re.MULTILINE,
        )
        if existing:
            start = block_start + existing.start()
            end = block_start + existing.end()
            catalog = catalog[:start] + fields + catalog[end:]
        else:
            catalog = catalog[:match.end()] + fields + catalog[match.end():]
        applied += 1

    LIBRARY.write_text(catalog + tail, encoding="utf-8")
    print(f"applied {applied} machine visuals")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
