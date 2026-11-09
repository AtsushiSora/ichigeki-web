import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteDirectory = path.resolve(scriptDirectory, "..");
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(siteDirectory, "machine-library.js"), "utf8"), sandbox);

const machines = Object.entries(sandbox.window.ICHIGEKI_MACHINES || {});
const dedicated = machines.filter(([, machine]) => machine.sim?.dedicatedFlow);
const errors = [];
const notices = [];

const probabilityKeys = /(?:Chance|Success|Continue|Entry)$/;
const ignoredProbabilityKeys = new Set(["specialChance"]);

function inspectProbabilities(value, trail, slug) {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    const nextTrail = `${trail}.${key}`;
    if (typeof child === "number" && probabilityKeys.test(key) && !ignoredProbabilityKeys.has(key) && (child < 0 || child > 1)) {
      errors.push(`${slug}: ${nextTrail} must be between 0 and 1`);
    }
    if (child && typeof child === "object" && !Array.isArray(child)) inspectProbabilities(child, nextTrail, slug);
  }
}

for (const [slug, machine] of dedicated) {
  const sim = machine.sim;
  const pagePath = path.join(siteDirectory, `${slug}.html`);
  if (sim.dedicatedFlowKey !== slug || Number(sim.dedicatedFlowVersion) !== 2) errors.push(`${slug}: dedicated registration mismatch`);
  if (sim.titleFlow) errors.push(`${slug}: old declarative titleFlow remains`);
  if (!(Number(sim.mainRate) > 0) || !(Number(sim.base50) > 0) || !(Number(sim.coinUnit) > 0)) errors.push(`${slug}: rate, base or coin unit is missing`);
  if (!sim.settingRates || !Object.keys(sim.settingRates).length) errors.push(`${slug}: setting rates are missing`);
  for (const [setting, rate] of Object.entries(sim.settingRates || {})) {
    if (!(Number(rate.main || rate.trigger) > 0)) errors.push(`${slug}: setting ${setting} has no initial-hit rate`);
    if (!(Number(rate.payout) > 0.8 && Number(rate.payout) < 1.3)) errors.push(`${slug}: setting ${setting} payout is outside the audit range`);
  }
  if (!Array.isArray(machine.articleSections) || machine.articleSections.length < 2) errors.push(`${slug}: article sections are incomplete`);
  if (!Array.isArray(machine.sources) || machine.sources.length < 2) errors.push(`${slug}: source list is incomplete`);
  if (!machine.readerGuide?.verdict || !Array.isArray(machine.readerGuide?.bestFor) || !Array.isArray(machine.readerGuide?.check)) errors.push(`${slug}: reader guide is incomplete`);
  if (!fs.existsSync(pagePath)) errors.push(`${slug}: prerendered page is missing`);
  else {
    const html = fs.readFileSync(pagePath, "utf8");
    const hasMachineSnapshot = html.includes(`${machine.shortName}を数字で早分かり`);
    const hasMachineIdentity = html.includes(`data-machine="${slug}"`);
    if (!html.includes(machine.shortName) || !hasMachineSnapshot || !hasMachineIdentity) errors.push(`${slug}: prerendered dedicated copy is missing`);
    if (!html.includes("machine-library.js?v=251") || !html.includes("machine-detail.js?v=284")) errors.push(`${slug}: asset version is stale`);
  }
  inspectProbabilities(sim, "sim", slug);
  if (sim.cycleFlow?.continueModes) {
    const modeWeight = sim.cycleFlow.continueModes.reduce((sum, entry) => sum + (Number(entry?.[1]) || 0), 0);
    if (Math.abs(modeWeight - 1) > 0.001) errors.push(`${slug}: continuation-mode weights do not total 1`);
  }
  if (Number(sim.upperChance) > 0 && !(Number(sim.upperSuccess) > 0)) notices.push(`${slug}: upper route has a chance but no explicit success value`);
}

if (dedicated.length !== 47) errors.push(`expected 47 dedicated machines, found ${dedicated.length}`);

console.log(`Dedicated readiness audit: ${dedicated.length} machines / ${errors.length} errors / ${notices.length} notices`);
for (const notice of notices) console.log(`NOTICE ${notice}`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length) process.exitCode = 1;
