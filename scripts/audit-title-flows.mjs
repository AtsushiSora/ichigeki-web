import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../machine-library.js", import.meta.url), "utf8");
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);

const machines = Object.entries(sandbox.window.ICHIGEKI_MACHINES || {});
const titleFlows = machines.filter(([, machine]) => machine.sim?.titleFlow);
const expectedProfiles = { battle: 10, st: 12, heaven: 5, bonus: 8, addon: 12 };
const errors = [];
const rows = [];

for (const [slug, machine] of titleFlows) {
  const sim = machine.sim;
  const cycle = sim.cycleFlow;
  const titleFlow = sim.titleFlow;
  if (!cycle || cycle.engine !== "title-flow-v1") errors.push(`${slug}: title-flow engine is missing`);
  if (!Array.isArray(cycle?.rounds) || cycle.rounds.length < Math.max(1, Number(cycle.maxRounds) || 1)) errors.push(`${slug}: explicit rounds are incomplete`);
  if (!cycle?.routeSummary) errors.push(`${slug}: route summary is missing`);
  if (!cycle?.rewardSummary) errors.push(`${slug}: reward summary is missing`);
  if (!titleFlow?.balance || !Number.isFinite(titleFlow.balance.averageRounds) || !Number.isFinite(titleFlow.balance.upperRoute)) errors.push(`${slug}: balance metrics are missing`);
  for (const [index, round] of (cycle?.rounds || []).entries()) {
    if (!round.title || !round.detail || !Array.isArray(round.rewards) || !round.rewards.length) errors.push(`${slug}: round ${index + 1} is incomplete`);
    const chance = Number(round.continueChance);
    if (!(chance > 0 && chance <= 1)) errors.push(`${slug}: round ${index + 1} has an invalid continue chance`);
  }
  rows.push({
    slug,
    profile: titleFlow.profile,
    rounds: cycle?.rounds?.length || 0,
    average: titleFlow.balance?.averageRounds,
    upper: `${((titleFlow.balance?.upperRoute || 0) * 100).toFixed(1)}%`
  });
}

if (titleFlows.length !== 47) errors.push(`expected 47 title flows, found ${titleFlows.length}`);
for (const [profile, expected] of Object.entries(expectedProfiles)) {
  const actual = titleFlows.filter(([, machine]) => machine.sim.titleFlow.profile === profile).length;
  if (actual !== expected) errors.push(`${profile}: expected ${expected}, found ${actual}`);
}

if (process.argv.includes("--verbose")) console.table(rows);
console.log(`Title-flow audit: ${titleFlows.length} machines / ${rows.reduce((sum, row) => sum + row.rounds, 0)} explicit rounds / ${errors.length} errors`);
if (errors.length) {
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}
