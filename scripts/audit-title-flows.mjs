import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../machine-library.js", import.meta.url), "utf8");
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);

const machines = Object.entries(sandbox.window.ICHIGEKI_MACHINES || {});
const dedicatedFlows = machines.filter(([, machine]) => machine.sim?.dedicatedFlow);
const declarativeFlows = dedicatedFlows.filter(([, machine]) => machine.sim?.titleFlow);
const specializedFlows = dedicatedFlows.filter(([, machine]) => machine.sim?.tokyoGhoulFlow || machine.sim?.basiliskTenzenFlow || machine.sim?.okidokiGoldFlow || machine.sim?.sao2Flow || machine.sim?.symphogearSeigiFlow || machine.sim?.lycorisFlow || machine.sim?.kanokariFlow || machine.sim?.aobutaFlow || machine.sim?.bofuriFlow || machine.sim?.azurLaneFlow || machine.sim?.magiaRecordFlow || machine.sim?.toaruIndex2Flow);
const expectedProfiles = { battle: 8, st: 3, heaven: 4, bonus: 8, addon: 12 };
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
if (declarativeFlows.length !== 35) errors.push(`expected 35 declarative dedicated flows, found ${declarativeFlows.length}`);
for (const [profile, expected] of Object.entries(expectedProfiles)) {
  const actual = declarativeFlows.filter(([, machine]) => machine.sim.titleFlow.profile === profile).length;
  if (actual !== expected) errors.push(`${profile}: expected ${expected}, found ${actual}`);
}
const dedicatedMap = Object.fromEntries(specializedFlows);
if (specializedFlows.length !== 12 || !dedicatedMap["tokyo-ghoul-slot"] || !dedicatedMap["basilisk-tenzen-slot"] || !dedicatedMap["okidoki-gold"] || !dedicatedMap["sao2-slot"] || !dedicatedMap["symphogear-seigi-slot"] || !dedicatedMap["lycoris-recoil-slot"] || !dedicatedMap["kanokari-slot"] || !dedicatedMap["aobuta-slot"] || !dedicatedMap["bofuri-slot"] || !dedicatedMap["azur-lane-slot"] || !dedicatedMap["magia-record-slot"] || !dedicatedMap["toaru-index2-slot"]) {
  errors.push(`expected twelve specialized flows including Toaru Index 2, found ${specializedFlows.map(([slug]) => slug).join(", ") || "none"}`);
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
  const sao2 = dedicatedMap["sao2-slot"];
  const sao2Sim = sao2.sim;
  if (sao2Sim.cycleFlow || sao2Sim.titleFlow) errors.push("sao2-slot: legacy reusable flow still exists");
  if (!Array.isArray(sao2Sim.sao2SniperOpponents) || sao2Sim.sao2SniperOpponents.length !== 5) errors.push("sao2-slot: Sniper Chance opponents are incomplete");
  if (Number(sao2Sim.sao2SniperMaxWins) !== 3) errors.push("sao2-slot: Sniper Chance win target is incorrect");
  if (Number(sao2Sim.sao2LastAttackGames) !== 5 || Number(sao2Sim.sao2LastAttackChance) !== 0.35) errors.push("sao2-slot: Last Attack model is incorrect");
  if (Number(sao2Sim.sao2DeathGunGames) !== 5 || Number(sao2Sim.sao2DeathGunChance) !== 0.50) errors.push("sao2-slot: Death Gun Battle model is incorrect");
  if (Number(sao2Sim.atPureIncrease) !== 3.6 || Number(sao2Sim.upperPureIncrease) !== 7.2) errors.push("sao2-slot: AT pure increase is incorrect");
  const symphogear = dedicatedMap["symphogear-seigi-slot"];
  const symphogearSim = symphogear.sim;
  if (symphogearSim.cycleFlow || symphogearSim.titleFlow) errors.push("symphogear-seigi-slot: legacy reusable flow still exists");
  if (!Array.isArray(symphogearSim.settingPool) || symphogearSim.settingPool.join(",") !== "1,2,4,5,6") errors.push("symphogear-seigi-slot: setting pool is incorrect");
  if (!Array.isArray(symphogearSim.symphogearGearCharacters) || symphogearSim.symphogearGearCharacters.length !== 5) errors.push("symphogear-seigi-slot: Gear V characters are incomplete");
  if (!Array.isArray(symphogearSim.symphogearUpperThresholds) || symphogearSim.symphogearUpperThresholds.length !== 4) errors.push("symphogear-seigi-slot: upper thresholds are incomplete");
  if (Number(symphogearSim.triggerSuccess) !== 0.65 || Number(symphogearSim.upperSuccess) !== 0.60) errors.push("symphogear-seigi-slot: battle probabilities are incorrect");
  if (Number(symphogearSim.atPureIncrease) !== 2.8 || Number(symphogearSim.upperPureIncrease) !== 5.0) errors.push("symphogear-seigi-slot: AT pure increase is incorrect");
  const lycoris = dedicatedMap["lycoris-recoil-slot"];
  const lycorisSim = lycoris.sim;
  if (lycorisSim.cycleFlow || lycorisSim.titleFlow) errors.push("lycoris-recoil-slot: legacy reusable flow still exists");
  if (!Array.isArray(lycorisSim.lycorisCzRoutes) || lycorisSim.lycorisCzRoutes.length !== 3) errors.push("lycoris-recoil-slot: CZ routes are incomplete");
  if (!Array.isArray(lycorisSim.lycorisBonusTypes) || lycorisSim.lycorisBonusTypes.length !== 4) errors.push("lycoris-recoil-slot: normal bonus types are incomplete");
  if (!Array.isArray(lycorisSim.lycorisUpperBonusTypes) || lycorisSim.lycorisUpperBonusTypes.length !== 3) errors.push("lycoris-recoil-slot: upper bonus types are incomplete");
  if (Number(lycorisSim.lycorisRush20Chance) !== 0.60 || Number(lycorisSim.lycorisUpperCzChance) !== 0.70) errors.push("lycoris-recoil-slot: RUSH20 or upper CZ probabilities are incorrect");
  if (Number(lycorisSim.base50) !== 31.8 || Number(lycorisSim.atPureIncrease) !== 8.4) errors.push("lycoris-recoil-slot: base or bonus pure increase is incorrect");
  if (!lycorisSim.settingRates || Object.keys(lycorisSim.settingRates).length !== 6) errors.push("lycoris-recoil-slot: setting rates are incomplete");
  const kanokari = dedicatedMap["kanokari-slot"];
  const kanokariSim = kanokari.sim;
  if (kanokariSim.cycleFlow || kanokariSim.titleFlow) errors.push("kanokari-slot: legacy reusable flow still exists");
  if (!Array.isArray(kanokariSim.kanokariCzRoutes) || kanokariSim.kanokariCzRoutes.length !== 3) errors.push("kanokari-slot: CZ routes are incomplete");
  if (!Array.isArray(kanokariSim.kanokariInitialBonuses) || kanokariSim.kanokariInitialBonuses.length !== 3) errors.push("kanokari-slot: initial bonuses are incomplete");
  if (Number(kanokariSim.kanokariRentChance) !== 0.40 || Number(kanokariSim.kanokariReturnChance) !== 0.25 || Number(kanokariSim.kanokariYumekanoChance) !== 0.58) errors.push("kanokari-slot: loop probabilities are incorrect");
  if (Number(kanokariSim.base50) !== 31 || Number(kanokariSim.atPureIncrease) !== 5) errors.push("kanokari-slot: base or bonus pure increase is incorrect");
  if (!kanokariSim.settingRates || Object.keys(kanokariSim.settingRates).length !== 6) errors.push("kanokari-slot: setting rates are incomplete");
  const aobuta = dedicatedMap["aobuta-slot"];
  const aobutaSim = aobuta.sim;
  if (aobutaSim.cycleFlow || aobutaSim.titleFlow) errors.push("aobuta-slot: legacy reusable flow still exists");
  if (!Array.isArray(aobutaSim.aobutaStHeroes) || aobutaSim.aobutaStHeroes.length !== 4) errors.push("aobuta-slot: ST heroines are incomplete");
  if (Number(aobutaSim.aobutaUpperCzGames) !== 16 || Number(aobutaSim.aobutaUpperCzChance) !== 0.53) errors.push("aobuta-slot: upper CZ model is incorrect");
  if (Number(aobutaSim.aobutaUpperContinue) !== 0.80 || !Array.isArray(aobutaSim.aobutaUpperAwards)) errors.push("aobuta-slot: upper ST model is incomplete");
  if (Number(aobutaSim.base50) !== 31.5 || Number(aobutaSim.atPureIncrease) !== 8) errors.push("aobuta-slot: base or bonus pure increase is incorrect");
  if (!Array.isArray(aobutaSim.settingPool) || aobutaSim.settingPool.join(",") !== "2,3,4,5,6") errors.push("aobuta-slot: setting pool is incorrect");
  const bofuri = dedicatedMap["bofuri-slot"];
  const bofuriSim = bofuri.sim;
  if (bofuriSim.cycleFlow || bofuriSim.titleFlow) errors.push("bofuri-slot: legacy reusable flow still exists");
  if (!Array.isArray(bofuriSim.bofuriCzRoutes) || bofuriSim.bofuriCzRoutes.length !== 3) errors.push("bofuri-slot: CZ routes are incomplete");
  if (!Array.isArray(bofuriSim.bofuriBonuses) || bofuriSim.bofuriBonuses.length !== 4) errors.push("bofuri-slot: bonus types are incomplete");
  if (!Array.isArray(bofuriSim.bofuriDefenseLevels) || bofuriSim.bofuriDefenseLevels.length !== 5) errors.push("bofuri-slot: defense levels are incomplete");
  if (Number(bofuriSim.bofuriFirstDefenseChance) !== 0.88 || Number(bofuriSim.bofuriCzAppearance) !== 11.9) errors.push("bofuri-slot: defense state model is incorrect");
  if (Number(bofuriSim.bofuriAngelGames) !== 30 || Number(bofuriSim.bofuriViolenceGames) !== 50) errors.push("bofuri-slot: special zones are incorrect");
  if (Number(bofuriSim.base50) !== 33 || Number(bofuriSim.atPureIncrease) !== 5.5) errors.push("bofuri-slot: base or bonus pure increase is incorrect");
  const azur = dedicatedMap["azur-lane-slot"];
  const azurSim = azur.sim;
  if (azurSim.cycleFlow || azurSim.titleFlow) errors.push("azur-lane-slot: legacy reusable flow still exists");
  if (!Array.isArray(azurSim.azurBonusTypes) || azurSim.azurBonusTypes.length !== 2) errors.push("azur-lane-slot: bonus types are incomplete");
  if (!Array.isArray(azurSim.azurAttackLoops) || azurSim.azurAttackLoops.length !== 4) errors.push("azur-lane-slot: Sea Battle Attack loop rates are incomplete");
  if (!Array.isArray(azurSim.azurEnemies) || azurSim.azurEnemies.length !== 3) errors.push("azur-lane-slot: Siren Battle enemies are incomplete");
  if (Number(azurSim.azurAmagiGames) !== 7 || Number(azurSim.azurAmagiChance) !== 0.54) errors.push("azur-lane-slot: Amagi Battle model is incorrect");
  if (Number(azurSim.base50) !== 25.8 || Number(azurSim.atPureIncrease) !== 2.5 || Number(azurSim.upperPureIncrease) !== 5.1) errors.push("azur-lane-slot: base or AT pure increase is incorrect");
  const magia = dedicatedMap["magia-record-slot"];
  const magiaSim = magia.sim;
  if (magiaSim.cycleFlow || magiaSim.titleFlow) errors.push("magia-record-slot: legacy reusable flow still exists");
  if (!Array.isArray(magiaSim.magiaBonusTypes) || magiaSim.magiaBonusTypes.length !== 4) errors.push("magia-record-slot: bonus types are incomplete");
  if (!Array.isArray(magiaSim.magiaAttackGames) || magiaSim.magiaAttackGames.length < 6) errors.push("magia-record-slot: Magia Attack distribution is incomplete");
  if (!Array.isArray(magiaSim.magiaRewardTypes) || magiaSim.magiaRewardTypes.length !== 3) errors.push("magia-record-slot: AT reward types are incomplete");
  if (!Array.isArray(magiaSim.magiaConnectCharacters) || magiaSim.magiaConnectCharacters.length !== 7) errors.push("magia-record-slot: Connect characters are incomplete");
  if (Number(magiaSim.magiaStoryTarget) !== 8 || Number(magiaSim.magiaUpperPrepareGames) !== 32 || Number(magiaSim.magiaUpperAttackGames) !== 10) errors.push("magia-record-slot: upper route is incorrect");
  if (Number(magiaSim.base50) !== 32.6 || Number(magiaSim.atPureIncrease) !== 2.6) errors.push("magia-record-slot: base or AT pure increase is incorrect");
  const toaru = dedicatedMap["toaru-index2-slot"];
  const toaruSim = toaru.sim;
  if (toaruSim.cycleFlow || toaruSim.titleFlow) errors.push("toaru-index2-slot: legacy reusable flow still exists");
  if (!Array.isArray(toaruSim.toaruEntryRoutes) || toaruSim.toaruEntryRoutes.length !== 3) errors.push("toaru-index2-slot: CZ and direct routes are incomplete");
  if (!Array.isArray(toaruSim.toaruBattleTypes) || toaruSim.toaruBattleTypes.length !== 2) errors.push("toaru-index2-slot: battle types are incomplete");
  if (!Array.isArray(toaruSim.toaruChargeRewards) || toaruSim.toaruChargeRewards.length !== 7) errors.push("toaru-index2-slot: Charge Game rewards are incomplete");
  if (!Array.isArray(toaruSim.toaruPlusActions) || toaruSim.toaruPlusActions.length !== 3) errors.push("toaru-index2-slot: Plus Action routes are incomplete");
  if (Number(toaruSim.toaruInitialGames) !== 40 || Number(toaruSim.atPureIncrease) !== 4.0) errors.push("toaru-index2-slot: AT initial games or pure increase is incorrect");
  if (Number(toaruSim.base50) !== 30.8 || !toaruSim.settingRates || Object.keys(toaruSim.settingRates).length !== 6) errors.push("toaru-index2-slot: base or setting rates are incomplete");
}

if (process.argv.includes("--verbose")) console.table(rows);
console.log(`Dedicated-flow audit: ${dedicatedFlows.length} machines (${declarativeFlows.length} declarative + ${specializedFlows.length} specialized) / ${rows.reduce((sum, row) => sum + row.rounds, 0)} explicit rounds / ${errors.length} errors`);
if (errors.length) {
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}
