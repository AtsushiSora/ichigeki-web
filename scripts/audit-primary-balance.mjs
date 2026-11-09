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
const primarySlugs = [
  "tokyo-ghoul-slot", "tokyo-revengers-slot", "magia-record-slot", "god-eater-resurrection",
  "lycoris-recoil-slot", "toaru-index2-slot", "symphogear-seigi-slot", "sao2-slot",
  "monster-hunter-rise-slot", "monster-hunter-sunbreak"
];
const remainingSlugs = [
  "kinnikuman-7-slot", "kanokari-slot", "aobuta-slot", "hokuto-tensei2", "bofuri-slot", "azur-lane-slot",
  "million-god-kiseki", "juoh-slot", "paripi-koumei-slot", "okidoki-black", "fire-force2-slot", "okidoki-gold",
  "gundam-unicorn-awakening-drive", "darling-in-the-franxx-slot", "gundam-seed-slot", "mushoku-tensei-slot",
  "super-bingo-neo-slot", "magical-halloween8", "iza-bancho", "toloveru-darkness-slot", "biohazard5-slot",
  "yoshimune-slot", "vivy-slot", "shin-onimusha3-slot", "super-blackjack-slot", "golden-kamuy-slot",
  "bancho4-slot", "zenigata4-slot", "inuyasha2-slot", "shin-onimusha2-slot", "fire-force-slot",
  "godzilla-eva-slot", "dmc5-st-slot", "initial-d-2nd-slot", "lupin-dai-koukaisha", "basilisk-tenzen-slot",
  "chibariyo2-slot"
];
const errors = [];

for (const slug of primarySlugs) {
  const sim = machines[slug]?.sim;
  if (!sim) errors.push(`${slug}: missing machine`);
  else if (sim.balanceRevision !== "primary-10-v1") errors.push(`${slug}: balance revision is missing`);
}
for (const slug of remainingSlugs) {
  const sim = machines[slug]?.sim;
  if (!sim) errors.push(`${slug}: missing machine`);
  else if (sim.balanceRevision !== "remaining-37-v1") errors.push(`${slug}: remaining balance revision is missing`);
}

const weightedTotal = (entries) => (entries || []).reduce((sum, entry) => sum + (Number(entry?.[1]) || 0), 0);
const assertWeight = (slug, key) => {
  const total = weightedTotal(machines[slug]?.sim?.[key]);
  if (Math.abs(total - 1) > 0.0001) errors.push(`${slug}: ${key} totals ${total}`);
};
assertWeight("tokyo-ghoul-slot", "tokyoGhoulBitesModes");
assertWeight("god-eater-resurrection", "godEaterRewards");
assertWeight("god-eater-resurrection", "godEaterGateOutcomes");
assertWeight("toloveru-darkness-slot", "toloveruPresentChances");
assertWeight("toloveru-darkness-slot", "toloveruUpperPresents");
for (const [index, hero] of (machines["aobuta-slot"]?.sim?.aobutaStHeroes || []).entries()) {
  const total = weightedTotal(hero.awards);
  if (Math.abs(total - 1) > 0.0001) errors.push(`aobuta-slot: hero ${index + 1} awards total ${total}`);
}
for (const [index, entry] of (machines["toloveru-darkness-slot"]?.sim?.toloveruPresentChances || []).entries()) {
  const total = weightedTotal(entry?.[0]?.payouts);
  if (Math.abs(total - 1) > 0.0001) errors.push(`toloveru-darkness-slot: normal present ${index + 1} payouts total ${total}`);
}
for (const [index, entry] of (machines["toloveru-darkness-slot"]?.sim?.toloveruUpperPresents || []).entries()) {
  const total = weightedTotal(entry?.[0]?.payouts);
  if (Math.abs(total - 1) > 0.0001) errors.push(`toloveru-darkness-slot: upper present ${index + 1} payouts total ${total}`);
}

const checks = [
  ["tokyo-ghoul-slot", "tokyoGhoulUpperAtChance", 0.05, 0.5],
  ["god-eater-resurrection", "godEaterOverkillChance", 0.01, 0.2],
  ["lycoris-recoil-slot", "lycorisLegendaryChance", 0.001, 0.1],
  ["monster-hunter-sunbreak", "sunbreakOpeningQuestChance", 0.05, 0.5],
  ["monster-hunter-rise-slot", "mhRiseAllyAssistPerExtra", 0.01, 0.15],
  ["tokyo-revengers-slot", "tokyoDirectAddChance", 0.05, 0.5]
];
for (const [slug, key, min, max] of checks) {
  const value = Number(machines[slug]?.sim?.[key]);
  if (!(value >= min && value <= max)) errors.push(`${slug}: ${key}=${value} is outside ${min}-${max}`);
}

console.log(`Balance audit: ${primarySlugs.length + remainingSlugs.length} machines / ${errors.length} errors`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length) process.exitCode = 1;
