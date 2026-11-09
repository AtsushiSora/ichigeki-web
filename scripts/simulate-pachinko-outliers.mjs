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
const targets = ["garo12-gokugen", "godzilla7-choshinkan", "takt-opus-destiny", "majo-to-yaju-pachinko", "smart-pachinko-gantz", "shangri-la-frontier", "karakuri2-maou"];
const trials = 200000;
let seed = 0x1a2b3c4d;
const errors = [];

function random() {
  seed = (1664525 * seed + 1013904223) >>> 0;
  return seed / 0x100000000;
}

function geometric(rate) {
  const probability = 1 / rate;
  return Math.max(1, Math.ceil(Math.log(1 - random()) / Math.log(1 - probability)));
}

function weighted(entries) {
  let cursor = random();
  for (const [value, weight] of entries) {
    cursor -= Number(weight) || 0;
    if (cursor <= 0) return value;
  }
  return entries.at(-1)?.[0];
}

function quantile(sorted, ratio) {
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * ratio))];
}

function simulate(sim) {
  const spins = geometric(sim.hitRate);
  const investment = Math.ceil(spins / sim.spinsPer1k) * 1000;
  const initialOutcome = Array.isArray(sim.initialOutcomes) && sim.initialOutcomes.length ? weighted(sim.initialOutcomes) : null;
  const rush = initialOutcome ? Boolean(initialOutcome.rush) : random() < sim.rushEntry;
  let displayedPayout = Number(initialOutcome?.payout) || (rush ? Number(sim.firstPayoutIn) : Number(sim.firstPayoutOut));
  let hits = 1;
  let upper = rush && Boolean(sim.upperLabel) && (Boolean(initialOutcome?.upper) || random() < (Number(sim.upperDirectChance) || 0));
  if (upper && sim.upperEntryPayout) displayedPayout = Number(sim.upperEntryPayout);
  if (rush) {
    while (hits < 100 && random() < (upper ? Number(sim.upperContinue) : Number(sim.rushContinue))) {
      hits += 1;
      displayedPayout += Number(weighted(sim.rushPayouts)) || 0;
    }
  }
  const payout = Math.round(displayedPayout * 14 / 15);
  const exchangeValue = Math.round(payout / 28 * 100);
  return { balance: exchangeValue - investment, displayedPayout, hits, rush, upper, initialLabel: initialOutcome?.label || "" };
}

for (const slug of targets) {
  const machine = machines[slug];
  if (!machine?.sim) {
    errors.push(`${slug}: machine is missing`);
    continue;
  }
  const results = Array.from({ length: trials }, () => simulate(machine.sim));
  const balances = results.map(result => result.balance).sort((left, right) => left - right);
  const average = key => results.reduce((sum, result) => sum + Number(result[key] || 0), 0) / results.length;
  const rushRate = results.filter(result => result.rush).length / trials;
  const upperRate = results.filter(result => result.upper).length / trials;
  const winRate = results.filter(result => result.balance > 0).length / trials;
  const gChargeRate = results.filter(result => result.initialLabel.startsWith("G-CHARGE")).length / trials;
  const destinyChargeRate = results.filter(result => result.initialLabel.startsWith("運命CHARGE")).length / trials;
  const revengeChargeRate = results.filter(result => result.initialLabel.startsWith("復讐CHARGE")).length / trials;
  const directUpperRate = results.filter(result => /運命分岐|BEAST ATTACK/.test(result.initialLabel)).length / trials;
  const gantzDirectRate = results.filter(result => result.initialLabel.startsWith("超行って下ちいBONUS3000")).length / trials;
  const gantzChallengeRate = results.filter(result => result.initialLabel.startsWith("チャレンジ") || result.initialLabel.startsWith("5段階突破")).length / trials;
  const shangriSmallRushRate = results.filter(result => result.initialLabel === "300個・RUSH").length / trials;
  const karakuriSmallRushRate = results.filter(result => result.initialLabel.startsWith("約300個")).length / trials;
  if (Math.abs(rushRate - Number(machine.sim.rushEntry)) > 0.005) errors.push(`${slug}: observed RUSH ${(rushRate * 100).toFixed(2)}% differs from configured ${(machine.sim.rushEntry * 100).toFixed(2)}%`);
  if (slug === "garo12-gokugen" && Math.abs(upperRate - 0.25) > 0.005) errors.push(`${slug}: observed LT ${(upperRate * 100).toFixed(2)}% differs from expected 25.00%`);
  if (slug === "godzilla7-choshinkan" && Math.abs(gChargeRate - 0.8351) > 0.005) errors.push(`${slug}: observed G-CHARGE ${(gChargeRate * 100).toFixed(2)}% differs from expected 83.51%`);
  if (slug === "takt-opus-destiny" && Math.abs(destinyChargeRate - 0.75) > 0.005) errors.push(`${slug}: observed CHARGE ${(destinyChargeRate * 100).toFixed(2)}% differs from expected 75.00%`);
  if (slug === "majo-to-yaju-pachinko" && Math.abs(revengeChargeRate - 0.1253133) > 0.005) errors.push(`${slug}: observed CHARGE ${(revengeChargeRate * 100).toFixed(2)}% differs from expected 12.53%`);
  if (slug === "majo-to-yaju-pachinko" && Math.abs(directUpperRate - 0.0087468) > 0.002) errors.push(`${slug}: observed direct upper ${(directUpperRate * 100).toFixed(2)}% differs from expected 0.87%`);
  if (slug === "smart-pachinko-gantz" && Math.abs(gantzDirectRate - 0.15) > 0.005) errors.push(`${slug}: observed direct BONUS ${(gantzDirectRate * 100).toFixed(2)}% differs from expected 15.00%`);
  if (slug === "smart-pachinko-gantz" && Math.abs(gantzChallengeRate - 0.517) > 0.005) errors.push(`${slug}: observed challenge ${(gantzChallengeRate * 100).toFixed(2)}% differs from expected 51.70%`);
  if (slug === "shangri-la-frontier" && Math.abs(shangriSmallRushRate - 0.01) > 0.002) errors.push(`${slug}: observed 300-ball RUSH ${(shangriSmallRushRate * 100).toFixed(2)}% differs from expected 1.00%`);
  if (slug === "karakuri2-maou" && Math.abs(karakuriSmallRushRate - 0.01) > 0.002) errors.push(`${slug}: observed 300-ball RUSH ${(karakuriSmallRushRate * 100).toFixed(2)}% differs from expected 1.00%`);
  console.log(`${slug}: ${trials.toLocaleString("ja-JP")} trials`);
  console.log(`  RUSH ${(rushRate * 100).toFixed(2)}% / LT ${(upperRate * 100).toFixed(2)}% / win ${(winRate * 100).toFixed(2)}%`);
  if (gChargeRate) console.log(`  G-CHARGE ${(gChargeRate * 100).toFixed(2)}%`);
  if (destinyChargeRate) console.log(`  運命CHARGE ${(destinyChargeRate * 100).toFixed(2)}%`);
  if (revengeChargeRate) console.log(`  復讐CHARGE ${(revengeChargeRate * 100).toFixed(2)}% / direct upper ${(directUpperRate * 100).toFixed(2)}%`);
  if (gantzChallengeRate) console.log(`  direct BONUS ${(gantzDirectRate * 100).toFixed(2)}% / challenge ${(gantzChallengeRate * 100).toFixed(2)}%`);
  if (shangriSmallRushRate) console.log(`  300-ball RUSH ${(shangriSmallRushRate * 100).toFixed(2)}%`);
  if (karakuriSmallRushRate) console.log(`  300-ball RUSH ${(karakuriSmallRushRate * 100).toFixed(2)}%`);
  console.log(`  average payout ${Math.round(average("displayedPayout")).toLocaleString("ja-JP")} balls / hits ${average("hits").toFixed(2)} / balance ${Math.round(average("balance")).toLocaleString("ja-JP")} yen`);
  console.log(`  balance P10 ${quantile(balances, 0.10).toLocaleString("ja-JP")} / median ${quantile(balances, 0.50).toLocaleString("ja-JP")} / P90 ${quantile(balances, 0.90).toLocaleString("ja-JP")} yen`);
}

console.log(`Monte Carlo audit: ${targets.length} machines / ${errors.length} errors`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length) process.exitCode = 1;
