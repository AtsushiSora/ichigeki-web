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
const pachinko = Object.entries(machines).filter(([, machine]) => machine.type === "pachinko" && machine.sim?.kind === "pachinko");
const aType = Object.entries(machines).filter(([, machine]) => machine.sim?.kind === "juggler");
const errors = [];
const notices = [];

const finitePositive = value => Number.isFinite(Number(value)) && Number(value) > 0;
const finiteNonNegative = value => Number.isFinite(Number(value)) && Number(value) >= 0;
const probability = value => Number.isFinite(Number(value)) && Number(value) >= 0 && Number(value) <= 1;
const closeToOne = value => Math.abs(value - 1) <= 0.0001;

function expectedInvestment(sim) {
  const probabilityPerSpin = 1 / Number(sim.hitRate);
  const missProbability = 1 - probabilityPerSpin;
  const spinsPerUnit = Number(sim.spinsPer1k);
  let expectedUnits = 0;
  for (let unit = 0; unit < 100000; unit += 1) {
    const threshold = Math.floor(unit * spinsPerUnit);
    const term = Math.pow(missProbability, threshold);
    expectedUnits += term;
    if (term < 1e-12) break;
  }
  return expectedUnits * 1000;
}

function expectedDisplayedPayout(sim, weightedRushPayout) {
  const routes = Array.isArray(sim.initialOutcomes) && sim.initialOutcomes.length
    ? sim.initialOutcomes
    : [[{ payout: sim.firstPayoutOut, rush: false }, 1 - Number(sim.rushEntry)], [{ payout: sim.firstPayoutIn, rush: true }, Number(sim.rushEntry)]];
  const upperDirectChance = sim.upperLabel ? Number(sim.upperDirectChance) || 0 : 0;
  return routes.reduce((total, [route, weight]) => {
    const routeWeight = Number(weight) || 0;
    const basePayout = Number(route?.payout) || 0;
    if (!route?.rush) return total + routeWeight * basePayout;
    const normalContinuation = Number(sim.rushContinue) || 0;
    const normalTotal = basePayout + normalContinuation / (1 - normalContinuation) * weightedRushPayout;
    if (!upperDirectChance) return total + routeWeight * normalTotal;
    const upperContinuation = Number(sim.upperContinue) || 0;
    const upperFirst = Number(sim.upperEntryPayout) || basePayout;
    const upperTotal = upperFirst + upperContinuation / (1 - upperContinuation) * weightedRushPayout;
    return total + routeWeight * ((1 - upperDirectChance) * normalTotal + upperDirectChance * upperTotal);
  }, 0);
}

for (const [slug, machine] of pachinko) {
  const sim = machine.sim;
  if (sim.balanceRevision !== "pachinko-89-v1") errors.push(`${slug}: balance revision is missing`);
  if (!finitePositive(sim.hitRate)) errors.push(`${slug}: invalid hitRate ${sim.hitRate}`);
  if (!finitePositive(sim.spinsPer1k)) errors.push(`${slug}: invalid spinsPer1k ${sim.spinsPer1k}`);
  if (!probability(sim.rushEntry)) errors.push(`${slug}: invalid rushEntry ${sim.rushEntry}`);
  if (!probability(sim.rushContinue) || Number(sim.rushContinue) >= 1) errors.push(`${slug}: invalid rushContinue ${sim.rushContinue}`);
  if (!finitePositive(sim.firstPayoutOut)) errors.push(`${slug}: invalid firstPayoutOut ${sim.firstPayoutOut}`);
  if (!finitePositive(sim.firstPayoutIn)) errors.push(`${slug}: invalid firstPayoutIn ${sim.firstPayoutIn}`);
  if (!Array.isArray(sim.rushPayouts) || sim.rushPayouts.length === 0) {
    errors.push(`${slug}: rushPayouts is empty`);
    continue;
  }

  let weightTotal = 0;
  let weightedPayout = 0;
  for (const [index, entry] of sim.rushPayouts.entries()) {
    const [payout, weight] = Array.isArray(entry) ? entry : [];
    // Some titles use a zero-ball ST reset as a legitimate continuation result.
    if (!finiteNonNegative(payout)) errors.push(`${slug}: rushPayouts[${index}] has invalid payout ${payout}`);
    if (!probability(weight)) errors.push(`${slug}: rushPayouts[${index}] has invalid weight ${weight}`);
    weightTotal += Number(weight) || 0;
    weightedPayout += (Number(payout) || 0) * (Number(weight) || 0);
  }
  if (!closeToOne(weightTotal)) errors.push(`${slug}: rushPayout weights total ${weightTotal}`);

  if (Array.isArray(sim.initialOutcomes)) {
    const initialWeightTotal = sim.initialOutcomes.reduce((sum, entry) => sum + (Number(entry?.[1]) || 0), 0);
    if (!closeToOne(initialWeightTotal)) errors.push(`${slug}: initialOutcome weights total ${initialWeightTotal}`);
    const initialRushChance = sim.initialOutcomes.reduce((sum, [route, weight]) => sum + (route?.rush ? Number(weight) || 0 : 0), 0);
    if (Math.abs(initialRushChance - Number(sim.rushEntry)) > 0.0001) errors.push(`${slug}: initialOutcome rush chance ${initialRushChance} does not match rushEntry ${sim.rushEntry}`);
  }

  const displayedPayout = expectedDisplayedPayout(sim, weightedPayout);
  const expectedActualPayout = displayedPayout * (14 / 15);
  const expectedBalance = expectedActualPayout / 28 * 100 - expectedInvestment(sim);
  if (!Number.isFinite(expectedBalance)) errors.push(`${slug}: expected balance is not finite`);
  if (Math.abs(expectedBalance) >= 15000) notices.push(`${slug}: high-variance expected balance ${Math.round(expectedBalance)} yen`);
}

for (const [slug, machine] of aType) {
  const sim = machine.sim;
  if (sim.balanceRevision !== "atype-12-v1") errors.push(`${slug}: balance revision is missing`);
  if (Number(sim.games) !== 8000) errors.push(`${slug}: session length is ${sim.games}, expected 8000G`);
  if (!finitePositive(sim.bigPayout)) errors.push(`${slug}: invalid bigPayout ${sim.bigPayout}`);
  if (!finitePositive(sim.regPayout)) errors.push(`${slug}: invalid regPayout ${sim.regPayout}`);

  let previousPayout = 0;
  for (let setting = 1; setting <= 6; setting += 1) {
    const rate = sim.settingRates?.[setting];
    if (!rate) {
      errors.push(`${slug}: setting ${setting} is missing`);
      continue;
    }
    if (!finitePositive(rate.big)) errors.push(`${slug}: setting ${setting} BIG rate is invalid`);
    if (!finitePositive(rate.reg)) errors.push(`${slug}: setting ${setting} REG rate is invalid`);
    if (!(Number(rate.payout) >= 0.8 && Number(rate.payout) <= 1.3)) errors.push(`${slug}: setting ${setting} payout ${rate.payout} is outside 80-130%`);
    if (Number(rate.payout) < previousPayout) errors.push(`${slug}: setting ${setting} payout decreases from the previous setting`);
    previousPayout = Number(rate.payout);
  }
}

if (pachinko.length !== 89) errors.push(`pachinko coverage is ${pachinko.length}, expected 89`);
if (aType.length !== 12) errors.push(`A-type coverage is ${aType.length}, expected 12`);

console.log(`Pachinko/A-type audit: ${pachinko.length} pachinko + ${aType.length} A-type / ${errors.length} errors / ${notices.length} notices`);
for (const notice of notices) console.log(`NOTICE ${notice}`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length) process.exitCode = 1;
