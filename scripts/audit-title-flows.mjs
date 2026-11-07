import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../machine-library.js", import.meta.url), "utf8");
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);

const machines = Object.entries(sandbox.window.ICHIGEKI_MACHINES || {});
const dedicatedFlows = machines.filter(([, machine]) => machine.sim?.dedicatedFlow);
const declarativeFlows = dedicatedFlows.filter(([, machine]) => machine.sim?.titleFlow);
const specializedFlows = dedicatedFlows.filter(([, machine]) => machine.sim?.tokyoGhoulFlow || machine.sim?.basiliskTenzenFlow || machine.sim?.okidokiGoldFlow);
const expectedProfiles = { battle: 8, st: 12, heaven: 4, bonus: 8, addon: 12 };
const errors = [];
const rows = [];

for (const [slug, machine] of dedicatedFlows) {
  const sim = machine.sim;
  if (sim.dedicatedFlowKey !== slug || Number(sim.dedicatedFlowVersion) !== 2) {
    errors.push(`${slug}: dedicated registration key or version is invalid`);
  }
}

for (const [slug, machine] of declarativeFlows) {
  const sim = machine.sim;
  const cycle = sim.cycleFlow;
  const titleFlow = sim.titleFlow;
  if (sim.dedicatedFlowKey !== slug || Number(sim.dedicatedFlowVersion) !== 2) errors.push(`${slug}: dedicated registration is invalid`);
  if (!cycle || cycle.engine !== "dedicated-title-flow-v2") errors.push(`${slug}: dedicated title-flow engine is missing`);
  if (!titleFlow?.dedicated || titleFlow.machineKey !== slug || titleFlow.engine !== cycle?.engine || Number(titleFlow.version) !== 2) errors.push(`${slug}: title-flow registration is incomplete`);
  if (!Array.isArray(cycle?.rounds) || cycle.rounds.length < Math.max(1, Number(cycle.maxRounds) || 1)) errors.push(`${slug}: explicit rounds are incomplete`);
  if (!cycle?.routeSummary) errors.push(`${slug}: route summary is missing`);
  if (!cycle?.rewardSummary || cycle.rewardSummary === "専用報酬") errors.push(`${slug}: title-specific reward summary is missing`);
  if (!titleFlow?.balance || !Number.isFinite(titleFlow.balance.averageRounds) || !Number.isFinite(titleFlow.balance.upperRoute)) errors.push(`${slug}: balance metrics are missing`);
  for (const [index, round] of (cycle?.rounds || []).entries()) {
    if (!round.title || !round.detail || !Array.isArray(round.rewards) || !round.rewards.length) errors.push(`${slug}: round ${index + 1} is incomplete`);
    const chance = Number(round.continueChance);
    if (!(chance > 0 && chance <= 1)) errors.push(`${slug}: round ${index + 1} has an invalid continue chance`);
  }
  const roundTitles = (cycle?.rounds || []).map(round => round.title);
  if (new Set(roundTitles).size !== roundTitles.length) errors.push(`${slug}: round titles are not unique`);
  rows.push({
    slug,
    profile: titleFlow.profile,
    rounds: cycle?.rounds?.length || 0,
    average: titleFlow.balance?.averageRounds,
    upper: `${((titleFlow.balance?.upperRoute || 0) * 100).toFixed(1)}%`
  });
}

if (dedicatedFlows.length !== 47) errors.push(`expected 47 dedicated flows, found ${dedicatedFlows.length}`);
if (declarativeFlows.length !== 44) errors.push(`expected 44 declarative dedicated flows, found ${declarativeFlows.length}`);
for (const [profile, expected] of Object.entries(expectedProfiles)) {
  const actual = declarativeFlows.filter(([, machine]) => machine.sim.titleFlow.profile === profile).length;
  if (actual !== expected) errors.push(`${profile}: expected ${expected}, found ${actual}`);
}
const dedicatedMap = Object.fromEntries(specializedFlows);
if (specializedFlows.length !== 3 || !dedicatedMap["tokyo-ghoul-slot"] || !dedicatedMap["basilisk-tenzen-slot"] || !dedicatedMap["okidoki-gold"]) {
  errors.push(`expected specialized Tokyo Ghoul, Basilisk Tenzen and Okidoki GOLD flows, found ${specializedFlows.map(([slug]) => slug).join(", ") || "none"}`);
} else {
  const tokyoGhoul = dedicatedMap["tokyo-ghoul-slot"];
  const sim = tokyoGhoul.sim;
  if (sim.cycleFlow || sim.titleFlow) errors.push("tokyo-ghoul-slot: legacy reusable flow still exists");
  if (!Array.isArray(sim.tokyoGhoulCzRoutes) || sim.tokyoGhoulCzRoutes.length !== 2) errors.push("tokyo-ghoul-slot: CZ routes are incomplete");
  if (!Array.isArray(sim.tokyoGhoulOpponents) || sim.tokyoGhoulOpponents.length < 5) errors.push("tokyo-ghoul-slot: battle opponents are incomplete");
  if (!Array.isArray(sim.tokyoGhoulArimaBattles) || sim.tokyoGhoulArimaBattles.length !== 5) errors.push("tokyo-ghoul-slot: Arima battle distribution is incomplete");
  if (!Array.isArray(sim.tokyoGhoulBitesModes) || sim.tokyoGhoulBitesModes.length !== 3) errors.push("tokyo-ghoul-slot: BITES modes are incomplete");
  if (!Array.isArray(sim.tokyoGhoulCcgRewards) || sim.tokyoGhoulCcgRewards.length !== 4) errors.push("tokyo-ghoul-slot: CCG rewards are incomplete");
  const basilisk = dedicatedMap["basilisk-tenzen-slot"];
  const basiliskSim = basilisk.sim;
  if (basiliskSim.cycleFlow || basiliskSim.titleFlow) errors.push("basilisk-tenzen-slot: legacy reusable flow still exists");
  if (!Array.isArray(basiliskSim.basiliskBcTypes) || basiliskSim.basiliskBcTypes.length !== 4) errors.push("basilisk-tenzen-slot: BC types are incomplete");
  if (!Array.isArray(basiliskSim.basiliskScenarios) || basiliskSim.basiliskScenarios.length !== 10) errors.push("basilisk-tenzen-slot: BT scenarios are incomplete");
  for (const [scenario] of basiliskSim.basiliskScenarios || []) {
    if (!scenario.name || String(scenario.grades || "").length !== 12) errors.push(`basilisk-tenzen-slot: ${scenario.name || "unnamed"} scenario is incomplete`);
  }
  const okidoki = dedicatedMap["okidoki-gold"];
  const okidokiSim = okidoki.sim;
  if (okidokiSim.cycleFlow || okidokiSim.titleFlow) errors.push("okidoki-gold: legacy reusable flow still exists");
  if (!Array.isArray(okidokiSim.okidokiEntryModes) || okidokiSim.okidokiEntryModes.length !== 4) errors.push("okidoki-gold: entry modes are incomplete");
  if (!["heaven", "doki", "super"].every(mode => Number(okidokiSim.okidokiModeRates?.[mode]) > 0)) errors.push("okidoki-gold: loop rates are incomplete");
  if (!Array.isArray(okidokiSim.settingPool) || okidokiSim.settingPool.join(",") !== "1,2,3,5,6") errors.push("okidoki-gold: setting pool is incorrect");
}

if (process.argv.includes("--verbose")) console.table(rows);
console.log(`Dedicated-flow audit: ${dedicatedFlows.length} machines (${declarativeFlows.length} declarative + ${specializedFlows.length} specialized) / ${rows.reduce((sum, row) => sum + row.rounds, 0)} explicit rounds / ${errors.length} errors`);
if (errors.length) {
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}
