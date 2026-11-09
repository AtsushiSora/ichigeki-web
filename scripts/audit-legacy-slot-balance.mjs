import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteDirectory = path.resolve(scriptDirectory, "..");
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(siteDirectory, "machine-library.js"), "utf8"), sandbox);

const machines = sandbox.window.ICHIGEKI_MACHINES || {};
const legacy = Object.entries(machines).filter(([, machine]) => machine.sim?.balanceRevision === "legacy-31-v1");
const errors = [];
const finitePositive = value => Number.isFinite(Number(value)) && Number(value) > 0;
const probability = value => Number.isFinite(Number(value)) && Number(value) >= 0 && Number(value) <= 1;

for (const [slug, machine] of legacy) {
  const sim = machine.sim;
  if (machine.type !== "slot" || sim.kind !== "slot") errors.push(`${slug}: legacy revision is attached to a non-slot machine`);
  for (const key of ["triggerRate", "mainRate", "base50"]) {
    if (!finitePositive(sim[key])) errors.push(`${slug}: invalid ${key} ${sim[key]}`);
  }
  if (!probability(sim.triggerSuccess)) errors.push(`${slug}: invalid triggerSuccess ${sim.triggerSuccess}`);

  const flowKeys = Object.keys(sim).filter(key => key.endsWith("Flow") && sim[key]);
  if (flowKeys.length === 0) errors.push(`${slug}: no title-specific flow is enabled`);

  const settingEntries = Object.entries(sim.settingRates || {}).sort((left, right) => Number(left[0]) - Number(right[0]));
  if (settingEntries.length < 5) errors.push(`${slug}: only ${settingEntries.length} setting rows are present`);
  let previousPayout = 0;
  for (const [setting, row] of settingEntries) {
    if (!finitePositive(row.trigger)) errors.push(`${slug}: setting ${setting} trigger rate is invalid`);
    if (!finitePositive(row.main)) errors.push(`${slug}: setting ${setting} main rate is invalid`);
    if (!(Number(row.payout) >= 0.8 && Number(row.payout) <= 1.3)) errors.push(`${slug}: setting ${setting} payout ${row.payout} is outside 80-130%`);
    if (Number(row.payout) < previousPayout) errors.push(`${slug}: setting ${setting} payout decreases from the previous setting`);
    previousPayout = Number(row.payout);
  }
}

if (legacy.length !== 31) errors.push(`legacy slot coverage is ${legacy.length}, expected 31`);

const revisionCounts = Object.values(machines).reduce((counts, machine) => {
  const revision = machine.sim?.balanceRevision;
  if (revision) counts[revision] = (counts[revision] || 0) + 1;
  return counts;
}, {});
const covered = Object.values(revisionCounts).reduce((sum, count) => sum + count, 0);
if (covered !== 179) errors.push(`total balance coverage is ${covered}, expected 179 machines`);

console.log(`Legacy slot audit: ${legacy.length} machines / ${errors.length} errors`);
console.log(`Balance coverage: ${covered}/179 machines (${Object.entries(revisionCounts).map(([revision, count]) => `${revision}=${count}`).join(", ")})`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length) process.exitCode = 1;
