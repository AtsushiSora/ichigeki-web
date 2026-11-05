import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(root, "machine-library.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { filename: "machine-library.js" });

const machines = sandbox.window.ICHIGEKI_MACHINES || {};
const quote = value => `'${String(value).replaceAll("'", "''")}'`;
const rows = [];

for (const [slug, machine] of Object.entries(machines)) {
  const sim = machine?.sim || {};
  const type = machine?.type;
  if (!type || !sim.kind) continue;
  const scoreKind = type === "slot" ? "coins" : "balls";
  const version = type === "slot"
    ? (sim.kind !== "juggler" && sim.settingRates ? "v3" : "v2")
    : "v2-actual-payout";
  const machineSlug = type === "slot"
    ? `${slug}--random-setting-${version}`
    : `${slug}--fixed-rate-${version}`;
  const simKind = sim.kind === "juggler" ? "juggler" : type === "slot" ? "slot" : "pachinko";
  const attemptsPerThousand = type === "slot"
    ? simKind === "juggler" ? 0 : Number(sim.base50 || 20) * 46 / 50
    : Number(sim.spinsPer1k || 10);
  const maxAttempts = simKind === "juggler" ? Number(sim.games || 8000) : 1000000;
  const maxPayout = type === "slot" ? (simKind === "juggler" ? 50000 : 19000) : 2000000;
  const settings = type === "slot"
    ? (Array.isArray(sim.settingPool) && sim.settingPool.length ? sim.settingPool : [1, 2, 3, 4, 5, 6])
        .map(Number).filter(value => Number.isInteger(value) && value >= 1 && value <= 6)
    : [];
  rows.push(`(${quote(machineSlug)}, ${quote(scoreKind)}, ${quote(simKind)}, ${attemptsPerThousand.toFixed(6)}, ${Math.round(maxAttempts)}, ${Math.round(maxPayout)}, ARRAY[${settings.join(",")} ]::integer[], now())`);
}

// 初代ユニコーン専用ページは共通機種ページと異なるランキングキーを使用します。
rows.push(`('gundam-unicorn--fixed-rate-v1', 'balls', 'pachinko', 17.000000, 1000000, 500000, '{}'::integer[], now())`);

const output = `-- machine-library.js から自動生成。直接編集せず scripts/generate-ranking-rules.mjs を実行してください。\ninsert into public.ranking_machine_rules (machine_slug, score_kind, sim_kind, attempts_per_thousand, max_attempts, max_payout, allowed_settings, updated_at)\nvalues\n${rows.join(",\n")}\non conflict (machine_slug) do update set\n  score_kind = excluded.score_kind,\n  sim_kind = excluded.sim_kind,\n  attempts_per_thousand = excluded.attempts_per_thousand,\n  max_attempts = excluded.max_attempts,\n  max_payout = excluded.max_payout,\n  allowed_settings = excluded.allowed_settings,\n  updated_at = now();\n`;

fs.writeFileSync(path.join(root, "supabase-ranking-rules.generated.sql"), output);
console.log(`Generated ${rows.length} ranking rules.`);
