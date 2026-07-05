const yen = new Intl.NumberFormat("ja-JP");
const rankingStorageKey = "ichigekiLocalRecordsV1";
const rankingSpecVersion = "2026-07-fixed-v1";
const latestResults = {
  juggle: null,
  pachinko319: null,
  hamari: null,
  twoChoice: null,
  ltRush: null,
  czChallenge: null,
  rare8192: null
};

const fixedRankingSpecs = {
  pachinko319: {
    hitRate: 319,
    spinsPerUnit: 17,
    rushRate: 0.6,
    continueRate: 0.81,
    firstPayout: 300,
    rushPayout: 1500
  },
  hamari: {
    rate: 319,
    spins: 1000
  },
  juggle: {
    bigRate: 255,
    regRate: 255,
    medalsPerUnit: 46,
    gamesPerUnit: 35,
    bigMedals: 252,
    regMedals: 96
  },
  ltRush: {
    hitRate: 319,
    spinsPerUnit: 17,
    lowerRushRate: 0.55,
    lowerContinueRate: 0.75,
    upgradeRate: 0.25,
    upperContinueRate: 0.9,
    firstPayout: 300,
    lowerPayout: 1500,
    upperPayout: 3000
  },
  czChallenge: {
    czRate: 180,
    gamesPerUnit: 35,
    successRate: 0.4,
    atContinueRate: 0.7,
    firstMedals: 250,
    continueMedals: 120,
    medalsPerUnit: 46
  },
  rare8192: {
    rate: 8192
  },
  twoChoice: {
    successRate: 0.5
  }
};

function clampNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function formatSavedAt(value) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function createRecordId(type) {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeRecord(type, record, index) {
  return {
    ...record,
    id: record.id || `${type}-${record.savedAt || "record"}-${index}`
  };
}

function getRecordName() {
  const input = document.getElementById("recordName");
  const name = (input?.value || "").trim().replace(/\s+/g, " ").slice(0, 12);
  return name || "あなた";
}

function appendLog(id, line) {
  const element = document.getElementById(id);
  if (!element) return;
  const current = element.textContent.trim();
  element.textContent = current ? `${line}\n${current}` : line;
}

function randomHit(rate) {
  return Math.random() < 1 / rate;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setRunningButton(action, isRunning) {
  const button = document.querySelector(`[data-action="${action}"]`);
  if (!button) return;
  if (!button.dataset.idleLabel) button.dataset.idleLabel = button.textContent;
  button.disabled = isRunning;
  button.textContent = isRunning ? "進行中..." : button.dataset.idleLabel;
  if (isRunning) setSaveReady(recordTypeByRunAction[action], false);
}

const saveActionByType = {
  juggle: "saveJuggle",
  pachinko319: "savePachinko319",
  hamari: "saveHamari",
  twoChoice: "saveTwoChoice",
  ltRush: "saveLtRush",
  czChallenge: "saveCzChallenge",
  rare8192: "saveRare8192"
};

const recordTypeByRunAction = {
  juggle: "juggle",
  pachinko319: "pachinko319",
  hamari: "hamari",
  twoChoiceStart: "twoChoice",
  ltRush: "ltRush",
  czChallenge: "czChallenge",
  rare8192: "rare8192"
};

function setSaveReady(type, isReady) {
  const action = saveActionByType[type];
  if (!action) return;
  const button = document.querySelector(`[data-action="${action}"]`);
  if (!button) return;
  button.classList.toggle("save-ready", isReady);
  button.setAttribute("aria-live", "polite");
}

function markResultReady(type) {
  setSaveReady(type, true);
}

function getFixedSpecSnapshot(type) {
  const spec = fixedRankingSpecs[type];
  if (!spec) return null;
  return JSON.parse(JSON.stringify({
    version: rankingSpecVersion,
    type,
    ...spec
  }));
}

const resultGuidesByAction = {
  juggle: {
    title: "結果の見方",
    points: [
      "ジャグ連は、初当たり後100G以内に当たり続けた回数です。",
      "総ゲームは、初当たりを引いてから100G抜けまでの合計です。",
      "差枚は、1,000円46枚・35G前後で使った枚数を差し引いた目安です。"
    ]
  },
  pachinko319: {
    title: "結果の見方",
    points: [
      "初当たり回転数と投資を見ると、当たるまでの重さを確認できます。",
      "総出玉と連チャンは、一撃でどこまで伸びたかを見る主な数字です。",
      "差玉は投資分を玉数換算して引いた目安で、プラスなら出玉が上回っています。"
    ]
  },
  genericPachinko: {
    title: "結果の見方",
    points: [
      "確率、突入率、継続率を変えると、初当たりと出玉の荒れ方を比較できます。",
      "投資と差玉を見ると、同じ出玉でも初当たりの重さで結果が変わることが分かります。",
      "まず初期値で数回試し、その後に1項目だけ変えると違いを確認しやすくなります。"
    ]
  },
  luckyTrigger: {
    title: "結果の見方",
    points: [
      "LT突入は低確率ですが、入った後の継続と出玉が結果を大きく動かします。",
      "通常終了の多さと、LT突入時の一撃差を比較すると荒さが分かります。",
      "突入率と継続率を別々に変えると、どちらが結果に効くか確認できます。"
    ]
  },
  ltRush: {
    title: "結果の見方",
    points: [
      "到達ルートは、通常終了・下位RUSH・上位RUSH到達のどこで終わったかを示します。",
      "上位RUSHに入るまでの段階が多いほど、同じ319でも結果のブレが大きくなります。",
      "ランキングではスペック固定なので、総出玉と差玉をそのまま比較しやすくしています。"
    ]
  },
  czChallenge: {
    title: "結果の見方",
    points: [
      "CZ当選ゲームは、通常時からCZに入るまでに回したゲーム数です。",
      "CZ成功後はATセット数と獲得枚数、失敗時は投資負けの重さを見ます。",
      "差枚は1,000円46枚換算で、投資した枚数を差し引いた目安です。"
    ]
  },
  tenjo: {
    title: "結果の見方",
    points: [
      "現在ゲーム数から、天井までに自力当選するか天井到達するかを試します。",
      "追加投資は、打ち始めてから当選までに必要だった目安です。",
      "天井到達率目安を見ると、今のゲーム数からどれくらい深く行きやすいか確認できます。"
    ]
  },
  kakenuke: {
    title: "結果の見方",
    points: [
      "駆け抜け率は、RUSHに入っても1回で終わる割合です。",
      "平均連チャンと最高連チャンを一緒に見ると、短期の偏りが分かります。",
      "試行回数を増やすほど、設定した継続率に近い結果になりやすくなります。"
    ]
  },
  hamari: {
    title: "結果の見方",
    points: [
      "ハマる確率は、指定回転数まで当たらない割合です。",
      "当たる確率とセットで見ると、その回転数がどれくらい珍しいか判断できます。",
      "大当たり確率と回転数を変えて、ミドル・ライトミドル・甘デジの違いを比較できます。"
    ]
  },
  rare8192: {
    title: "結果の見方",
    points: [
      "当選回転は、1/8192を何回転目に引けたかを示します。",
      "分母比は、8192回転に対して早いか遅いかの目安です。",
      "当選率を見ると、その回転数までに引ける人がどれくらいいるか分かります。"
    ]
  },
  continuation: {
    title: "結果の見方",
    points: [
      "平均連チャンは、試行全体で見た平均の続き方です。",
      "目標到達率は、10連など指定した連数に届く割合です。",
      "継続率を変えて比較すると、数%の差が体感にどう出るか確認できます。"
    ]
  },
  rush: {
    title: "結果の見方",
    points: [
      "突破と失敗は、指定した突入率で複数回試した結果です。",
      "実測突入率は、今回の試行だけで見た成功割合です。",
      "最大失敗連続を見ると、確率通りでも悪い偏りが起きることを確認できます。"
    ]
  },
  twoChoiceStart: {
    title: "結果の見方",
    points: [
      "現在の連続正解は、50%を何回続けて当てたかです。",
      "到達確率は、同じ連数にたどり着く難しさの目安です。",
      "外れたら終了なので、結果が出た後に保存するとランキングで比較できます。"
    ]
  }
};

const fixedConditionSummariesByAction = {
  juggle: ["BIG 1/255", "REG 1/255", "1,000円46枚", "35G/1,000円", "100G抜けまで"],
  pachinko319: ["大当たり 1/319", "RUSH突入 60%", "継続率 81%", "初当たり 300玉", "RUSH中 1,500玉", "17回転/1,000円"],
  hamari: ["大当たり 1/319", "判定回転数 1,000回転"],
  twoChoiceStart: ["成功率 50%", "外れた時点で終了", "連続正解数でランキング"],
  ltRush: ["大当たり 1/319", "下位突入 55%", "下位継続 75%", "上位昇格 25%", "上位継続 90%"],
  czChallenge: ["CZ 1/180", "CZ成功 40%", "AT継続 70%", "1,000円46枚", "35G/1,000円"],
  rare8192: ["当選確率 1/8192", "当選回転でランキング"]
};

function renderFixedConditionGuide() {
  const card = document.querySelector(".tool-card");
  if (!card || card.querySelector(".fixed-condition-guide")) return;
  const action = Object.keys(fixedConditionSummariesByAction).find(key => document.querySelector(`[data-action="${key}"]`));
  const conditions = fixedConditionSummariesByAction[action];
  if (!conditions) return;
  const element = document.createElement("div");
  element.className = "fixed-condition-guide";
  element.innerHTML = `<h3>ランキング固定条件</h3><div>${conditions.map(condition => `<span>${escapeHtml(condition)}</span>`).join("")}</div><p>ランキングの公平性を保つため、保存名と回転速度以外は固定です。</p>`;
  const controls = card.querySelector(".control-grid");
  if (controls) {
    controls.insertAdjacentElement("afterend", element);
  } else {
    card.prepend(element);
  }
}

const simplePresetsByAction = {
  tenjo: [
    {
      label: "浅め 300G",
      values: { currentGame: 300, ceilingGame: 999, hitRate: 280, gamesPerUnit: 35, bonusMedals: 350, atContinueRate: 65, continueMedals: 120 }
    },
    {
      label: "天井近め 700G",
      values: { currentGame: 700, ceilingGame: 999, hitRate: 280, gamesPerUnit: 35, bonusMedals: 350, atContinueRate: 65, continueMedals: 120 }
    },
    {
      label: "深め 850G",
      values: { currentGame: 850, ceilingGame: 999, hitRate: 280, gamesPerUnit: 35, bonusMedals: 350, atContinueRate: 65, continueMedals: 120 }
    }
  ],
  continuation: [
    { label: "王道 81%", values: { continueRate: 81, targetChain: 10, trials: 10000 } },
    { label: "高継続 90%", values: { continueRate: 90, targetChain: 20, trials: 10000 } },
    { label: "超高継続 93%", values: { continueRate: 93, targetChain: 30, trials: 10000 } }
  ],
  rush: [
    { label: "50%", values: { rushRate: 50, trials: 30 } },
    { label: "60%", values: { rushRate: 60, trials: 100 } },
    { label: "70%", values: { rushRate: 70, trials: 100 } }
  ],
  luckyTrigger: [
    {
      label: "ライト 1/199",
      values: { hitRate: 199, spinPerUnit: 18, triggerRate: 15, triggerContinueRate: 90, firstPayout: 300, triggerPayout: 1500 }
    },
    {
      label: "甘め 1/99",
      values: { hitRate: 99, spinPerUnit: 20, triggerRate: 8, triggerContinueRate: 88, firstPayout: 300, triggerPayout: 1000 }
    },
    {
      label: "荒め 1/319",
      values: { hitRate: 319, spinPerUnit: 17, triggerRate: 20, triggerContinueRate: 92, firstPayout: 300, triggerPayout: 1500 }
    }
  ]
};

function applySimplePreset(action, index) {
  const preset = simplePresetsByAction[action]?.[Number(index)];
  if (!preset) return;
  Object.entries(preset.values).forEach(([id, value]) => {
    const input = document.getElementById(id);
    if (!input || input.disabled) return;
    input.value = value;
  });
  appendLog("log", `${preset.label}の条件をセットしました。`);
  updateSpeedLabel();
}

function renderSimplePresets() {
  const card = document.querySelector(".tool-card");
  if (!card || card.querySelector(".preset-strip")) return;
  const action = Object.keys(simplePresetsByAction).find(key => document.querySelector(`[data-action="${key}"]`));
  const presets = simplePresetsByAction[action];
  if (!presets) return;
  const element = document.createElement("div");
  element.className = "preset-strip";
  element.innerHTML = `<h3>かんたん設定</h3><div class="preset-buttons">${presets.map((preset, index) => `<button class="preset-button" type="button" data-action="applySimplePreset" data-preset-action="${action}" data-preset-index="${index}">${escapeHtml(preset.label)}</button>`).join("")}</div>`;
  const controls = card.querySelector(".control-grid");
  if (controls) {
    controls.insertAdjacentElement("afterend", element);
  } else {
    card.prepend(element);
  }
}

function renderResultGuide() {
  const card = document.querySelector(".tool-card");
  if (!card || card.querySelector(".result-guide")) return;
  const action = Object.keys(resultGuidesByAction).find(key => document.querySelector(`[data-action="${key}"]`));
  const guide = resultGuidesByAction[action];
  if (!guide) return;
  const element = document.createElement("div");
  element.className = "result-guide";
  element.innerHTML = `<h3>${escapeHtml(guide.title)}</h3><ul>${guide.points.map(point => `<li>${escapeHtml(point)}</li>`).join("")}</ul>`;
  const log = card.querySelector(".log-box");
  if (log) {
    log.insertAdjacentElement("afterend", element);
  } else {
    card.appendChild(element);
  }
}

function getSpeedValue() {
  return Math.min(20, Math.max(1, clampNumber(document.getElementById("animationSpeed")?.value, 1)));
}

function getSpeedFactor() {
  return getSpeedValue();
}

function speedAdjustedDuration(duration) {
  return Math.max(40, Math.round(duration / getSpeedFactor()));
}

function updateSpeedLabel() {
  const label = document.getElementById("speedLabel");
  if (!label) return;
  label.textContent = `${getSpeedValue()}倍`;
}

function loadLocalRecords() {
  try {
    const parsed = JSON.parse(localStorage.getItem(rankingStorageKey) || "{}");
    return {
      juggle: Array.isArray(parsed.juggle) ? parsed.juggle.map((record, index) => normalizeRecord("juggle", record, index)) : [],
      pachinko319: Array.isArray(parsed.pachinko319) ? parsed.pachinko319.map((record, index) => normalizeRecord("pachinko319", record, index)) : [],
      hamari: Array.isArray(parsed.hamari) ? parsed.hamari.map((record, index) => normalizeRecord("hamari", record, index)) : [],
      twoChoice: Array.isArray(parsed.twoChoice) ? parsed.twoChoice.map((record, index) => normalizeRecord("twoChoice", record, index)) : [],
      ltRush: Array.isArray(parsed.ltRush) ? parsed.ltRush.map((record, index) => normalizeRecord("ltRush", record, index)) : [],
      czChallenge: Array.isArray(parsed.czChallenge) ? parsed.czChallenge.map((record, index) => normalizeRecord("czChallenge", record, index)) : [],
      rare8192: Array.isArray(parsed.rare8192) ? parsed.rare8192.map((record, index) => normalizeRecord("rare8192", record, index)) : []
    };
  } catch {
    return { juggle: [], pachinko319: [], hamari: [], twoChoice: [], ltRush: [], czChallenge: [], rare8192: [] };
  }
}

function storeLocalRecords(records) {
  try {
    localStorage.setItem(rankingStorageKey, JSON.stringify(records));
    return true;
  } catch {
    return false;
  }
}

function getRecordTime(record) {
  const time = new Date(record.savedAt || 0).getTime();
  return Number.isFinite(time) ? time : 0;
}

function sortRecords(type, records, mode = "score") {
  const sorters = {
    juggle: {
      score: (a, b) => b.chain - a.chain || b.diff - a.diff || b.games - a.games,
      diff: (a, b) => b.diff - a.diff || b.chain - a.chain,
      date: (a, b) => getRecordTime(b) - getRecordTime(a),
      name: (a, b) => String(a.name || "").localeCompare(String(b.name || ""), "ja")
    },
    pachinko319: {
      score: (a, b) => b.totalPayout - a.totalPayout || b.chain - a.chain || b.diff - a.diff,
      diff: (a, b) => b.diff - a.diff || b.totalPayout - a.totalPayout,
      chain: (a, b) => b.chain - a.chain || b.totalPayout - a.totalPayout,
      date: (a, b) => getRecordTime(b) - getRecordTime(a),
      name: (a, b) => String(a.name || "").localeCompare(String(b.name || ""), "ja")
    },
    hamari: {
      score: (a, b) => b.spins - a.spins || b.probability - a.probability,
      probability: (a, b) => b.probability - a.probability || b.spins - a.spins,
      date: (a, b) => getRecordTime(b) - getRecordTime(a),
      name: (a, b) => String(a.name || "").localeCompare(String(b.name || ""), "ja")
    },
    twoChoice: {
      score: (a, b) => b.chain - a.chain || b.rounds - a.rounds,
      probability: (a, b) => a.probability - b.probability || b.chain - a.chain,
      date: (a, b) => getRecordTime(b) - getRecordTime(a),
      name: (a, b) => String(a.name || "").localeCompare(String(b.name || ""), "ja")
    },
    ltRush: {
      score: (a, b) => b.totalPayout - a.totalPayout || b.chain - a.chain || b.diff - a.diff,
      diff: (a, b) => b.diff - a.diff || b.totalPayout - a.totalPayout,
      chain: (a, b) => b.chain - a.chain || b.totalPayout - a.totalPayout,
      route: (a, b) => Number(b.enteredUpper) - Number(a.enteredUpper) || Number(b.enteredLower) - Number(a.enteredLower) || b.totalPayout - a.totalPayout,
      date: (a, b) => getRecordTime(b) - getRecordTime(a),
      name: (a, b) => String(a.name || "").localeCompare(String(b.name || ""), "ja")
    },
    czChallenge: {
      score: (a, b) => b.totalMedals - a.totalMedals || b.chain - a.chain || b.diff - a.diff,
      diff: (a, b) => b.diff - a.diff || b.totalMedals - a.totalMedals,
      chain: (a, b) => b.chain - a.chain || b.totalMedals - a.totalMedals,
      success: (a, b) => Number(b.success) - Number(a.success) || b.totalMedals - a.totalMedals,
      date: (a, b) => getRecordTime(b) - getRecordTime(a),
      name: (a, b) => String(a.name || "").localeCompare(String(b.name || ""), "ja")
    },
    rare8192: {
      score: (a, b) => a.spins - b.spins || b.hitByThen - a.hitByThen,
      long: (a, b) => b.spins - a.spins || b.ratio - a.ratio,
      ratio: (a, b) => a.ratio - b.ratio || a.spins - b.spins,
      date: (a, b) => getRecordTime(b) - getRecordTime(a),
      name: (a, b) => String(a.name || "").localeCompare(String(b.name || ""), "ja")
    }
  };
  return [...records].sort(sorters[type]?.[mode] || sorters[type]?.score || (() => 0));
}

function saveLatestRecord(type) {
  const latest = latestResults[type];
  if (!latest) {
    appendLog("log", "先にスタートして結果を出してください。");
    return;
  }
  const records = loadLocalRecords();
  records[type] = sortRecords(type, [
    { ...latest, id: createRecordId(type), name: getRecordName(), savedAt: new Date().toISOString(), spec: getFixedSpecSnapshot(type) },
    ...records[type]
  ]).slice(0, 30);
  const saved = storeLocalRecords(records);
  if (saved) {
    appendLog("log", "ランキングに保存しました。ランキングページで確認できます。");
    setSaveReady(type, false);
    renderRankingPage();
  } else {
    appendLog("log", "保存できませんでした。ブラウザの保存設定を確認してください。");
  }
}

function updateRecordName(type, id) {
  const records = loadLocalRecords();
  const record = records[type]?.find(item => item.id === id);
  if (!record) return;
  const currentName = record.name || "あなた";
  const nextName = window.prompt?.("新しい保存名を入力してください（最大12文字）", currentName);
  if (nextName === null || nextName === undefined) return;
  const cleanName = nextName.trim().replace(/\s+/g, " ").slice(0, 12) || "あなた";
  records[type] = records[type].map(item => item.id === id ? { ...item, name: cleanName } : item);
  if (storeLocalRecords(records)) renderRankingPage();
}

function deleteRecord(type, id) {
  const records = loadLocalRecords();
  const record = records[type]?.find(item => item.id === id);
  if (!record) return;
  if (window.confirm && !window.confirm("この記録を削除しますか？")) return;
  records[type] = records[type].filter(item => item.id !== id);
  if (storeLocalRecords(records)) renderRankingPage();
}

function clearLocalRecords() {
  if (typeof window !== "undefined" && window.confirm && !window.confirm("保存したランキング記録をすべて削除しますか？")) return;
  try {
    localStorage.removeItem(rankingStorageKey);
  } catch {
    return;
  }
  renderRankingPage();
}

function renderEmptyRows(columns, message = "まだ記録がありません", href = "", label = "") {
  const action = href && label ? `<a class="empty-state-link" href="${href}">${label}</a>` : "";
  return `<tr><td colspan="${columns}"><div class="empty-state"><strong>${message}</strong><span>シミュレーターで結果を出して「ランキングに保存」を押すと、ここに記録が表示されます。</span>${action}</div></td></tr>`;
}

function getRankingSort(type) {
  const element = document.getElementById(`${type}Sort`);
  return element?.value || "score";
}

function renderRecordActions(type, id) {
  return `<div class="record-actions"><button class="mini-button" data-action="editRecord" data-type="${type}" data-id="${escapeHtml(id)}">名前変更</button><button class="mini-button danger" data-action="deleteRecord" data-type="${type}" data-id="${escapeHtml(id)}">削除</button></div>`;
}

function renderPodium(records) {
  const top = sortRecords("juggle", records).slice(0, 3);
  const cards = [
    { rank: 2, className: "second", record: top[1] },
    { rank: 1, className: "first", record: top[0] },
    { rank: 3, className: "third", record: top[2] }
  ];
  return cards.map(({ rank, className, record }) => {
    const name = record ? escapeHtml(record.name || "あなた") : "記録待ち";
    const chain = record ? `${record.chain}連` : "--連";
    const detail = record ? `BIG ${record.big} / REG ${record.reg}` : "BIG -- / REG --";
    return `<div class="podium-card ${className}"><span class="rank-badge">${rank}</span><strong>${name}</strong><b>${chain}</b><small>${detail}</small></div>`;
  }).join("");
}

function renderRankingPage() {
  const records = loadLocalRecords();
  const summary = document.getElementById("rankingCount");
  if (summary) {
    const total = records.juggle.length + records.pachinko319.length + records.hamari.length + records.twoChoice.length + records.ltRush.length + records.czChallenge.length + records.rare8192.length;
    summary.textContent = `${total}件`;
  }

  setText("juggleRecordCount", `${records.juggle.length}件`);
  setText("pachinkoRecordCount", `${records.pachinko319.length}件`);
  setText("hamariRecordCount", `${records.hamari.length}件`);
  setText("twoChoiceRecordCount", `${records.twoChoice.length}件`);
  setText("ltRushRecordCount", `${records.ltRush.length}件`);
  setText("czRecordCount", `${records.czChallenge.length}件`);
  setText("rare8192RecordCount", `${records.rare8192.length}件`);
  setText("juggleBestSummary", records.juggle.length ? `${sortRecords("juggle", records.juggle)[0].chain}連` : "--");
  setText("pachinkoBestSummary", records.pachinko319.length ? `${yen.format(sortRecords("pachinko319", records.pachinko319)[0].totalPayout)}玉` : "--");
  setText("hamariBestSummary", records.hamari.length ? `${yen.format(sortRecords("hamari", records.hamari)[0].spins)}回転` : "--");
  setText("twoChoiceBestSummary", records.twoChoice.length ? `${sortRecords("twoChoice", records.twoChoice)[0].chain}連` : "--");
  setText("ltRushBestSummary", records.ltRush.length ? `${yen.format(sortRecords("ltRush", records.ltRush)[0].totalPayout)}玉` : "--");
  setText("czBestSummary", records.czChallenge.length ? `${yen.format(sortRecords("czChallenge", records.czChallenge)[0].totalMedals)}枚` : "--");
  setText("rare8192BestSummary", records.rare8192.length ? `${yen.format(sortRecords("rare8192", records.rare8192)[0].spins)}回転` : "--");

  const podium = document.getElementById("jugglePodium");
  if (podium) podium.innerHTML = renderPodium(records.juggle);

  const juggleBody = document.getElementById("juggleRankingBody");
  if (juggleBody) {
    const rows = sortRecords("juggle", records.juggle, getRankingSort("juggle")).slice(0, 10).map((record, index) => (
      `<tr><td>${index + 1}</td><td>${escapeHtml(record.name || "あなた")}</td><td>${record.chain}連</td><td>BIG ${record.big} / REG ${record.reg}</td><td>${record.diff > 0 ? "+" : ""}${yen.format(record.diff)}枚</td><td>${formatSavedAt(record.savedAt)}</td><td>${renderRecordActions("juggle", record.id)}</td></tr>`
    ));
    juggleBody.innerHTML = rows.join("") || renderEmptyRows(7, "ジャグ連の記録がありません", "juggle.html", "ジャグ連を試す");
  }

  const pachinkoBody = document.getElementById("pachinkoRankingBody");
  if (pachinkoBody) {
    const rows = sortRecords("pachinko319", records.pachinko319, getRankingSort("pachinko319")).slice(0, 10).map((record, index) => (
      `<tr><td>${index + 1}</td><td>${escapeHtml(record.name || "あなた")}</td><td>${yen.format(record.totalPayout)}玉</td><td>${record.chain}連</td><td>${record.diff > 0 ? "+" : ""}${yen.format(record.diff)}玉</td><td>${formatSavedAt(record.savedAt)}</td><td>${renderRecordActions("pachinko319", record.id)}</td></tr>`
    ));
    pachinkoBody.innerHTML = rows.join("") || renderEmptyRows(7, "319一撃の記録がありません", "pachinko-319.html", "319を試す");
  }

  const hamariBody = document.getElementById("hamariRankingBody");
  if (hamariBody) {
    const rows = sortRecords("hamari", records.hamari, getRankingSort("hamari")).slice(0, 10).map((record, index) => (
      `<tr><td>${index + 1}</td><td>${escapeHtml(record.name || "あなた")}</td><td>${yen.format(record.spins)}回転</td><td>1/${yen.format(record.rate)}</td><td>${record.probability.toFixed(2)}%</td><td>${formatSavedAt(record.savedAt)}</td><td>${renderRecordActions("hamari", record.id)}</td></tr>`
    ));
    hamariBody.innerHTML = rows.join("") || renderEmptyRows(7, "ハマり記録がありません", "hamari.html", "ハマり確率を試す");
  }

  const twoChoiceBody = document.getElementById("twoChoiceRankingBody");
  if (twoChoiceBody) {
    const rows = sortRecords("twoChoice", records.twoChoice, getRankingSort("twoChoice")).slice(0, 10).map((record, index) => (
      `<tr><td>${index + 1}</td><td>${escapeHtml(record.name || "あなた")}</td><td>${record.chain}連</td><td>${record.rounds || record.chain + 1}回</td><td>${record.probability.toFixed(3)}%</td><td>${formatSavedAt(record.savedAt)}</td><td>${renderRecordActions("twoChoice", record.id)}</td></tr>`
    ));
    twoChoiceBody.innerHTML = rows.join("") || renderEmptyRows(7, "二択チャレンジの記録がありません", "two-choice.html", "二択を試す");
  }

  const ltRushBody = document.getElementById("ltRushRankingBody");
  if (ltRushBody) {
    const rows = sortRecords("ltRush", records.ltRush, getRankingSort("ltRush")).slice(0, 10).map((record, index) => (
      `<tr><td>${index + 1}</td><td>${escapeHtml(record.name || "あなた")}</td><td>${yen.format(record.totalPayout)}玉</td><td>${record.status || (record.enteredUpper ? "上位RUSH到達" : record.enteredLower ? "下位RUSH終了" : "通常終了")}</td><td>${record.chain}連</td><td>${record.diff > 0 ? "+" : ""}${yen.format(record.diff)}玉</td><td>${formatSavedAt(record.savedAt)}</td><td>${renderRecordActions("ltRush", record.id)}</td></tr>`
    ));
    ltRushBody.innerHTML = rows.join("") || renderEmptyRows(8, "LT上位RUSHの記録がありません", "lt-rush.html", "LT上位RUSHを試す");
  }

  const czBody = document.getElementById("czRankingBody");
  if (czBody) {
    const rows = sortRecords("czChallenge", records.czChallenge, getRankingSort("czChallenge")).slice(0, 10).map((record, index) => (
      `<tr><td>${index + 1}</td><td>${escapeHtml(record.name || "あなた")}</td><td>${record.success ? "成功" : "失敗"}</td><td>${record.chain}セット</td><td>${yen.format(record.totalMedals)}枚</td><td>${record.diff > 0 ? "+" : ""}${yen.format(record.diff)}枚</td><td>${formatSavedAt(record.savedAt)}</td><td>${renderRecordActions("czChallenge", record.id)}</td></tr>`
    ));
    czBody.innerHTML = rows.join("") || renderEmptyRows(8, "CZ突破の記録がありません", "cz-challenge.html", "CZ突破を試す");
  }

  const rare8192Body = document.getElementById("rare8192RankingBody");
  if (rare8192Body) {
    const rows = sortRecords("rare8192", records.rare8192, getRankingSort("rare8192")).slice(0, 10).map((record, index) => (
      `<tr><td>${index + 1}</td><td>${escapeHtml(record.name || "あなた")}</td><td>${yen.format(record.spins)}回転</td><td>${record.ratio.toFixed(2)}倍</td><td>${record.hitByThen.toFixed(2)}%</td><td>${formatSavedAt(record.savedAt)}</td><td>${renderRecordActions("rare8192", record.id)}</td></tr>`
    ));
    rare8192Body.innerHTML = rows.join("") || renderEmptyRows(7, "1/8192の記録がありません", "rare-8192.html", "1/8192を試す");
  }
}

async function animateCount(id, endValue, suffix, duration = 1200) {
  const element = document.getElementById(id);
  if (!element) return;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reducedMotion) {
    element.textContent = `${yen.format(endValue)}${suffix}`;
    return;
  }
  duration = speedAdjustedDuration(duration);
  const start = performance.now();
  return new Promise(resolve => {
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(endValue * eased);
      element.textContent = `${yen.format(current)}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        element.textContent = `${yen.format(endValue)}${suffix}`;
        resolve();
      }
    }
    requestAnimationFrame(frame);
  });
}

async function animateDecimal(id, endValue, suffix, digits = 1, duration = 1000) {
  const element = document.getElementById(id);
  if (!element) return;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reducedMotion) {
    element.textContent = `${endValue.toFixed(digits)}${suffix}`;
    return;
  }
  duration = speedAdjustedDuration(duration);
  const start = performance.now();
  return new Promise(resolve => {
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${(endValue * eased).toFixed(digits)}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        element.textContent = `${endValue.toFixed(digits)}${suffix}`;
        resolve();
      }
    }
    requestAnimationFrame(frame);
  });
}

async function animateJuggleResult(result) {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reducedMotion || !result.hitEvents.length) {
    setText("resultGames", `${yen.format(result.games)}G`);
    setText("resultAfterHitGames", result.chain > 0 ? "100G抜け" : "0G");
    setText("resultChain", `${result.chain}連`);
    setText("resultBonus", `BIG ${result.big} / REG ${result.reg}`);
    return;
  }

  const duration = speedAdjustedDuration(Math.min(6200, Math.max(2600, result.games * 13)));
  const start = performance.now();
  let hitIndex = -1;
  return new Promise(resolve => {
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentGame = Math.min(result.games, Math.max(1, Math.round(result.games * eased)));

      while (hitIndex + 1 < result.hitEvents.length && result.hitEvents[hitIndex + 1].game <= currentGame) {
        hitIndex++;
        const hit = result.hitEvents[hitIndex];
        setText("resultChain", `${hit.chain}連`);
        setText("resultBonus", `BIG ${hit.big} / REG ${hit.reg}`);
        setText("log", `${hit.game}Gで${hit.type}当選 / ${hit.chain}連`);
      }

      setText("resultGames", `${yen.format(currentGame)}G`);
      if (hitIndex >= 0) {
        const lastHit = result.hitEvents[hitIndex];
        const afterHitGames = currentGame - lastHit.game;
        setText("resultAfterHitGames", afterHitGames === 0 ? "当たり" : `${Math.min(afterHitGames, 100)}G`);
      } else {
        setText("resultAfterHitGames", "初当たり待ち");
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setText("resultGames", `${yen.format(result.games)}G`);
        setText("resultAfterHitGames", result.chain > 0 ? "100G抜け" : "0G");
        setText("resultChain", `${result.chain}連`);
        setText("resultBonus", `BIG ${result.big} / REG ${result.reg}`);
        resolve();
      }
    }
    requestAnimationFrame(frame);
  });
}

let pachinkoRunning = false;
let genericToolRunning = false;

function simulatePachinko319() {
  const { hitRate, spinsPerUnit, rushRate, continueRate, firstPayout, rushPayout: payout } = fixedRankingSpecs.pachinko319;
  let spins = 0;
  while (!randomHit(hitRate) && spins < 5000) spins++;
  spins++;
  const investment = Math.ceil(spins / spinsPerUnit) * 1000;
  let totalPayout = firstPayout;
  let chain = 1;
  const enteredRush = Math.random() < rushRate;
  if (enteredRush) {
    while (Math.random() < continueRate && chain < 200) {
      chain++;
      totalPayout += payout;
    }
  }
  const usedBalls = Math.round(investment / 4);
  const diff = totalPayout - usedBalls;
  return { spins, investment, totalPayout, chain, diff, enteredRush, firstPayout, payout };
}

async function runPachinko319() {
  if (pachinkoRunning) return;
  pachinkoRunning = true;
  setRunningButton("pachinko319", true);
  setText("resultSpins", "0回転");
  setText("resultInvestment", "0円");
  setText("resultPayout", "0玉");
  setText("resultChain", "0連");
  setText("resultDiff", "0玉");
  setText("resultRush", "抽選中");
  setText("log", "初当たり抽選中...");

  const result = simulatePachinko319();
  const { spins, investment, totalPayout, chain, diff, enteredRush, firstPayout, payout } = result;
  await animateCount("resultSpins", spins, "回転", Math.min(3000, Math.max(1200, spins * 6)));

  setText("resultRush", enteredRush ? "突入" : "非突入");
  setText("resultChain", "1連");
  setText("resultPayout", `${yen.format(firstPayout)}玉`);
  setText("log", `${spins}回転で大当たり`);
  if (enteredRush) {
    let currentPayout = firstPayout;
    for (let currentChain = 2; currentChain <= chain; currentChain++) {
      await sleep(speedAdjustedDuration(180));
      currentPayout += payout;
      setText("resultChain", `${currentChain}連`);
      setText("resultPayout", `${yen.format(currentPayout)}玉`);
      setText("log", `RUSH継続 ${currentChain}連 / ${yen.format(currentPayout)}玉`);
    }
  }
  await sleep(speedAdjustedDuration(120));
  setText("resultSpins", `${yen.format(spins)}回転`);
  setText("resultInvestment", `${yen.format(investment)}円`);
  setText("resultPayout", `${yen.format(totalPayout)}玉`);
  setText("resultChain", `${chain}連`);
  setText("resultDiff", `${diff > 0 ? "+" : ""}${yen.format(diff)}玉`);
  setText("resultRush", enteredRush ? "突入" : "非突入");
  setText("log", `${spins}回転で大当たり / ${chain}連 / 差玉 ${diff > 0 ? "+" : ""}${yen.format(diff)}玉`);
  latestResults.pachinko319 = { spins, investment, totalPayout, chain, diff, enteredRush };
  markResultReady("pachinko319");
  setRunningButton("pachinko319", false);
  pachinkoRunning = false;
}

function simulateGenericPachinko() {
  const hitRate = clampNumber(document.getElementById("hitRate")?.value, 199);
  const spinsPerUnit = clampNumber(document.getElementById("spinPerUnit")?.value, 18);
  const rushRate = clampNumber(document.getElementById("rushRate")?.value, 55) / 100;
  const continueRate = clampNumber(document.getElementById("continueRate")?.value, 75) / 100;
  const firstPayout = clampNumber(document.getElementById("firstPayout")?.value, 300);
  const payout = clampNumber(document.getElementById("payout")?.value, 1000);
  let spins = 0;
  while (!randomHit(hitRate) && spins < 8000) spins++;
  spins++;
  const investment = Math.ceil(spins / spinsPerUnit) * 1000;
  let totalPayout = firstPayout;
  let chain = 1;
  const enteredRush = Math.random() < rushRate;
  if (enteredRush) {
    while (Math.random() < continueRate && chain < 200) {
      chain++;
      totalPayout += payout;
    }
  }
  const diff = totalPayout - Math.round(investment / 4);
  return { hitRate, spins, investment, totalPayout, chain, diff, enteredRush, firstPayout, payout };
}

async function runGenericPachinko() {
  if (genericToolRunning) return;
  genericToolRunning = true;
  setRunningButton("genericPachinko", true);
  setText("resultSpins", "0回転");
  setText("resultInvestment", "0円");
  setText("resultPayout", "0玉");
  setText("resultChain", "0連");
  setText("resultDiff", "0玉");
  setText("resultRush", "抽選中");
  setText("log", "初当たり抽選中...");

  const result = simulateGenericPachinko();
  await animateCount("resultSpins", result.spins, "回転", Math.min(3000, Math.max(1000, result.spins * 6)));
  setText("resultRush", result.enteredRush ? "突入" : "非突入");
  setText("resultChain", "1連");
  setText("resultPayout", `${yen.format(result.firstPayout)}玉`);
  setText("log", `${result.spins}回転で大当たり`);
  if (result.enteredRush) {
    let currentPayout = result.firstPayout;
    for (let currentChain = 2; currentChain <= result.chain; currentChain++) {
      await sleep(speedAdjustedDuration(160));
      currentPayout += result.payout;
      setText("resultChain", `${currentChain}連`);
      setText("resultPayout", `${yen.format(currentPayout)}玉`);
      setText("log", `RUSH継続 ${currentChain}連 / ${yen.format(currentPayout)}玉`);
    }
  }
  setText("resultSpins", `${yen.format(result.spins)}回転`);
  setText("resultInvestment", `${yen.format(result.investment)}円`);
  setText("resultPayout", `${yen.format(result.totalPayout)}玉`);
  setText("resultChain", `${result.chain}連`);
  setText("resultDiff", `${result.diff > 0 ? "+" : ""}${yen.format(result.diff)}玉`);
  setText("resultRush", result.enteredRush ? "突入" : "非突入");
  setText("log", `1/${result.hitRate} / ${result.spins}回転 / ${result.chain}連 / 差玉 ${result.diff > 0 ? "+" : ""}${yen.format(result.diff)}玉`);
  setRunningButton("genericPachinko", false);
  genericToolRunning = false;
}

function simulateLuckyTrigger() {
  const hitRate = clampNumber(document.getElementById("hitRate")?.value, 199);
  const spinsPerUnit = clampNumber(document.getElementById("spinPerUnit")?.value, 18);
  const triggerRate = clampNumber(document.getElementById("triggerRate")?.value, 15) / 100;
  const triggerContinueRate = clampNumber(document.getElementById("triggerContinueRate")?.value, 90) / 100;
  const firstPayout = clampNumber(document.getElementById("firstPayout")?.value, 300);
  const triggerPayout = clampNumber(document.getElementById("triggerPayout")?.value, 1500);
  let spins = 0;
  while (!randomHit(hitRate) && spins < 8000) spins++;
  spins++;
  const investment = Math.ceil(spins / spinsPerUnit) * 1000;
  const enteredTrigger = Math.random() < triggerRate;
  let chain = 1;
  let totalPayout = firstPayout;
  if (enteredTrigger) {
    while (Math.random() < triggerContinueRate && chain < 300) {
      chain++;
      totalPayout += triggerPayout;
    }
  }
  const diff = totalPayout - Math.round(investment / 4);
  return { hitRate, spins, investment, enteredTrigger, chain, totalPayout, diff, firstPayout, triggerPayout };
}

async function runLuckyTrigger() {
  if (genericToolRunning) return;
  genericToolRunning = true;
  setRunningButton("luckyTrigger", true);
  setText("resultSpins", "0回転");
  setText("resultInvestment", "0円");
  setText("resultTrigger", "抽選中");
  setText("resultChain", "0連");
  setText("resultPayout", "0玉");
  setText("resultDiff", "0玉");
  setText("log", "初当たり抽選中...");
  const result = simulateLuckyTrigger();
  await animateCount("resultSpins", result.spins, "回転", Math.min(3000, Math.max(1000, result.spins * 6)));
  setText("resultTrigger", result.enteredTrigger ? "LT突入" : "通常終了");
  setText("resultPayout", `${yen.format(result.firstPayout)}玉`);
  setText("resultChain", "1連");
  if (result.enteredTrigger) {
    let currentPayout = result.firstPayout;
    for (let currentChain = 2; currentChain <= result.chain; currentChain++) {
      await sleep(speedAdjustedDuration(130));
      currentPayout += result.triggerPayout;
      setText("resultChain", `${currentChain}連`);
      setText("resultPayout", `${yen.format(currentPayout)}玉`);
      setText("log", `LT継続 ${currentChain}連 / ${yen.format(currentPayout)}玉`);
    }
  }
  setText("resultSpins", `${yen.format(result.spins)}回転`);
  setText("resultInvestment", `${yen.format(result.investment)}円`);
  setText("resultTrigger", result.enteredTrigger ? "LT突入" : "通常終了");
  setText("resultChain", `${result.chain}連`);
  setText("resultPayout", `${yen.format(result.totalPayout)}玉`);
  setText("resultDiff", `${result.diff > 0 ? "+" : ""}${yen.format(result.diff)}玉`);
  setText("log", `LT${result.enteredTrigger ? "突入" : "非突入"} / ${result.chain}連 / 差玉 ${result.diff > 0 ? "+" : ""}${yen.format(result.diff)}玉`);
  setRunningButton("luckyTrigger", false);
  genericToolRunning = false;
}

function simulateLtRush() {
  const {
    hitRate,
    spinsPerUnit,
    lowerRushRate,
    lowerContinueRate,
    upgradeRate,
    upperContinueRate,
    firstPayout,
    lowerPayout,
    upperPayout
  } = fixedRankingSpecs.ltRush;
  let spins = 0;
  while (!randomHit(hitRate) && spins < 12000) spins++;
  spins++;
  const investment = Math.ceil(spins / spinsPerUnit) * 1000;
  const usedBalls = Math.round(investment / 4);
  const enteredLower = Math.random() < lowerRushRate;
  let enteredUpper = false;
  let chain = 1;
  let totalPayout = firstPayout;
  const events = [`${spins}回転で初当たり +${yen.format(firstPayout)}玉`];

  if (!enteredLower) {
    const diff = totalPayout - usedBalls;
    return { hitRate, spins, investment, usedBalls, enteredLower, enteredUpper, chain, totalPayout, diff, firstPayout, lowerPayout, upperPayout, events, status: "通常終了" };
  }

  events.push("下位RUSH突入");
  while (chain < 300) {
    if (Math.random() >= lowerContinueRate) {
      events.push("下位RUSH終了");
      break;
    }
    chain++;
    if (!enteredUpper && Math.random() < upgradeRate) {
      enteredUpper = true;
      totalPayout += upperPayout;
      events.push(`${chain}連目 上位RUSH昇格 +${yen.format(upperPayout)}玉`);
      break;
    }
    totalPayout += lowerPayout;
    events.push(`${chain}連目 下位RUSH継続 +${yen.format(lowerPayout)}玉`);
  }

  if (enteredUpper) {
    while (chain < 300) {
      if (Math.random() >= upperContinueRate) {
        events.push("上位RUSH終了");
        break;
      }
      chain++;
      totalPayout += upperPayout;
      events.push(`${chain}連目 上位RUSH継続 +${yen.format(upperPayout)}玉`);
    }
  }

  const diff = totalPayout - usedBalls;
  const status = enteredUpper ? "上位RUSH到達" : "下位RUSH終了";
  return { hitRate, spins, investment, usedBalls, enteredLower, enteredUpper, chain, totalPayout, diff, firstPayout, lowerPayout, upperPayout, events, status };
}

async function runLtRush() {
  if (genericToolRunning) return;
  genericToolRunning = true;
  setRunningButton("ltRush", true);
  setText("resultSpins", "0回転");
  setText("resultInvestment", "0円");
  setText("resultRoute", "抽選中");
  setText("resultChain", "0連");
  setText("resultPayout", "0玉");
  setText("resultDiff", "0玉");
  setText("log", "初当たり抽選中...");

  const result = simulateLtRush();
  await animateCount("resultSpins", result.spins, "回転", Math.min(3200, Math.max(1000, result.spins * 6)));
  setText("resultInvestment", `${yen.format(result.investment)}円`);
  setText("resultRoute", result.enteredLower ? "下位RUSH" : "通常終了");
  setText("resultChain", "1連");
  setText("resultPayout", `${yen.format(result.firstPayout)}玉`);
  setText("log", result.events[0]);

  let currentPayout = result.firstPayout;
  let currentChain = 1;
  for (const event of result.events.slice(1)) {
    await sleep(speedAdjustedDuration(170));
    const payoutMatch = event.match(/\+([0-9,]+)玉/);
    if (payoutMatch) currentPayout += Number(payoutMatch[1].replace(/,/g, ""));
    const chainMatch = event.match(/^(\d+)連目/);
    if (chainMatch) currentChain = Number(chainMatch[1]);
    if (event.includes("上位RUSH")) setText("resultRoute", "上位RUSH");
    setText("resultChain", `${currentChain}連`);
    setText("resultPayout", `${yen.format(currentPayout)}玉`);
    setText("log", event);
  }

  setText("resultSpins", `${yen.format(result.spins)}回転`);
  setText("resultInvestment", `${yen.format(result.investment)}円`);
  setText("resultRoute", result.status);
  setText("resultChain", `${result.chain}連`);
  setText("resultPayout", `${yen.format(result.totalPayout)}玉`);
  setText("resultDiff", `${result.diff > 0 ? "+" : ""}${yen.format(result.diff)}玉`);
  setText("log", `1/${result.hitRate} / ${result.status} / ${result.chain}連 / 差玉 ${result.diff > 0 ? "+" : ""}${yen.format(result.diff)}玉`);
  latestResults.ltRush = {
    spins: result.spins,
    investment: result.investment,
    usedBalls: result.usedBalls,
    enteredLower: result.enteredLower,
    enteredUpper: result.enteredUpper,
    status: result.status,
    chain: result.chain,
    totalPayout: result.totalPayout,
    diff: result.diff
  };
  markResultReady("ltRush");
  setRunningButton("ltRush", false);
  genericToolRunning = false;
}

function simulateCzChallenge() {
  const {
    czRate,
    gamesPerUnit,
    successRate,
    atContinueRate,
    firstMedals,
    continueMedals,
    medalsPerUnit
  } = fixedRankingSpecs.czChallenge;
  let games = 0;
  while (!randomHit(czRate) && games < 8000) games++;
  games++;
  const investment = Math.ceil(games / gamesPerUnit) * 1000;
  const usedMedals = Math.round(investment / 1000 * medalsPerUnit);
  const success = Math.random() < successRate;
  let chain = 0;
  let totalMedals = 0;
  const events = [`${games}GでCZ当選`];

  if (success) {
    chain = 1;
    totalMedals = firstMedals;
    events.push(`CZ成功 AT当選 +${yen.format(firstMedals)}枚`);
    while (Math.random() < atContinueRate && chain < 200) {
      chain++;
      totalMedals += continueMedals;
      events.push(`${chain}セット目 AT継続 +${yen.format(continueMedals)}枚`);
    }
    events.push("AT終了");
  } else {
    events.push("CZ失敗 通常へ");
  }

  const diff = totalMedals - usedMedals;
  return { czRate, games, investment, usedMedals, success, chain, totalMedals, diff, firstMedals, continueMedals, events };
}

async function runCzChallenge() {
  if (genericToolRunning) return;
  genericToolRunning = true;
  setRunningButton("czChallenge", true);
  setText("resultGames", "0G");
  setText("resultInvestment", "0円");
  setText("resultCz", "抽選中");
  setText("resultChain", "0セット");
  setText("resultMedals", "0枚");
  setText("resultDiff", "0枚");
  setText("log", "CZ抽選中...");

  const result = simulateCzChallenge();
  await animateCount("resultGames", result.games, "G", Math.min(3000, Math.max(1000, result.games * 7)));
  setText("resultInvestment", `${yen.format(result.investment)}円`);
  setText("resultCz", result.success ? "成功" : "失敗");
  setText("log", result.events[0]);

  let currentMedals = 0;
  let currentChain = 0;
  for (const event of result.events.slice(1)) {
    await sleep(speedAdjustedDuration(170));
    const medalMatch = event.match(/\+([0-9,]+)枚/);
    if (medalMatch) currentMedals += Number(medalMatch[1].replace(/,/g, ""));
    const chainMatch = event.match(/^(\d+)セット目/);
    if (chainMatch) currentChain = Number(chainMatch[1]);
    if (event.includes("AT当選")) currentChain = 1;
    if (event.includes("CZ成功")) setText("resultCz", "成功");
    if (event.includes("CZ失敗")) setText("resultCz", "失敗");
    setText("resultChain", `${currentChain}セット`);
    setText("resultMedals", `${yen.format(currentMedals)}枚`);
    setText("log", event);
  }

  setText("resultGames", `${yen.format(result.games)}G`);
  setText("resultInvestment", `${yen.format(result.investment)}円`);
  setText("resultCz", result.success ? "成功" : "失敗");
  setText("resultChain", `${result.chain}セット`);
  setText("resultMedals", `${yen.format(result.totalMedals)}枚`);
  setText("resultDiff", `${result.diff > 0 ? "+" : ""}${yen.format(result.diff)}枚`);
  setText("log", `1/${result.czRate} / CZ${result.success ? "成功" : "失敗"} / ${result.chain}セット / 差枚 ${result.diff > 0 ? "+" : ""}${yen.format(result.diff)}枚`);
  latestResults.czChallenge = {
    czRate: result.czRate,
    games: result.games,
    investment: result.investment,
    usedMedals: result.usedMedals,
    success: result.success,
    chain: result.chain,
    totalMedals: result.totalMedals,
    diff: result.diff
  };
  markResultReady("czChallenge");
  setRunningButton("czChallenge", false);
  genericToolRunning = false;
}

function simulateTenjo() {
  const currentGame = clampNumber(document.getElementById("currentGame")?.value, 0);
  const ceilingGame = clampNumber(document.getElementById("ceilingGame")?.value, 999);
  const hitRate = clampNumber(document.getElementById("hitRate")?.value, 280);
  const gamesPerUnit = clampNumber(document.getElementById("gamesPerUnit")?.value, 35);
  const bonusMedals = clampNumber(document.getElementById("bonusMedals")?.value, 350);
  const atContinueRate = clampNumber(document.getElementById("atContinueRate")?.value, 65) / 100;
  const continueMedals = clampNumber(document.getElementById("continueMedals")?.value, 120);
  const startGame = Math.max(0, Math.min(currentGame, ceilingGame - 1));
  let game = startGame;
  let addedGames = 0;
  let route = "自力当選";
  while (game < ceilingGame) {
    game++;
    addedGames++;
    if (randomHit(hitRate)) break;
  }
  if (game >= ceilingGame) route = "天井到達";
  const investment = Math.ceil(addedGames / gamesPerUnit) * 1000;
  const usedMedals = Math.round(investment / 1000 * 46);
  let chain = 1;
  let totalMedals = bonusMedals;
  const events = [`${game}Gで${route} +${yen.format(bonusMedals)}枚`];
  while (Math.random() < atContinueRate && chain < 200) {
    chain++;
    totalMedals += continueMedals;
    events.push(`${chain}セット目 継続 +${yen.format(continueMedals)}枚`);
  }
  const diff = totalMedals - usedMedals;
  const remainingToCeiling = Math.max(0, ceilingGame - startGame);
  const ceilingReachRate = Math.pow((hitRate - 1) / hitRate, remainingToCeiling) * 100;
  return { startGame, ceilingGame, hitRate, game, addedGames, investment, usedMedals, route, chain, totalMedals, diff, bonusMedals, continueMedals, ceilingReachRate, events };
}

async function runTenjo() {
  if (genericToolRunning) return;
  genericToolRunning = true;
  setRunningButton("tenjo", true);
  setText("resultHitGame", "0G");
  setText("resultRoute", "抽選中");
  setText("resultInvestment", "0円");
  setText("resultChain", "0セット");
  setText("resultMedals", "0枚");
  setText("resultDiff", "0枚");
  setText("resultCeilingRate", "--");
  setText("log", "天井まで回転中...");

  const result = simulateTenjo();
  await animateCount("resultHitGame", result.game, "G", Math.min(3200, Math.max(1000, result.addedGames * 7)));
  setText("resultRoute", result.route);
  setText("resultInvestment", `${yen.format(result.investment)}円`);
  setText("resultChain", "1セット");
  setText("resultMedals", `${yen.format(result.bonusMedals)}枚`);
  setText("log", result.events[0]);

  let currentMedals = result.bonusMedals;
  for (const event of result.events.slice(1)) {
    await sleep(speedAdjustedDuration(170));
    const medalMatch = event.match(/\+([0-9,]+)枚/);
    if (medalMatch) currentMedals += Number(medalMatch[1].replace(/,/g, ""));
    const chainMatch = event.match(/^(\d+)セット目/);
    if (chainMatch) setText("resultChain", `${chainMatch[1]}セット`);
    setText("resultMedals", `${yen.format(currentMedals)}枚`);
    setText("log", event);
  }

  setText("resultHitGame", `${yen.format(result.game)}G`);
  setText("resultRoute", result.route);
  setText("resultInvestment", `${yen.format(result.investment)}円`);
  setText("resultChain", `${result.chain}セット`);
  setText("resultMedals", `${yen.format(result.totalMedals)}枚`);
  setText("resultDiff", `${result.diff > 0 ? "+" : ""}${yen.format(result.diff)}枚`);
  setText("resultCeilingRate", `${result.ceilingReachRate.toFixed(2)}%`);
  setText("log", `${result.startGame}G開始 / ${result.game}Gで${result.route} / ${result.chain}セット / 差枚 ${result.diff > 0 ? "+" : ""}${yen.format(result.diff)}枚`);
  setRunningButton("tenjo", false);
  genericToolRunning = false;
}

async function runKakenuke() {
  if (genericToolRunning) return;
  genericToolRunning = true;
  setRunningButton("kakenuke", true);
  const continueRate = clampNumber(document.getElementById("continueRate")?.value, 81) / 100;
  const trials = clampNumber(document.getElementById("trials")?.value, 1000);
  let kakenuke = 0;
  let total = 0;
  let best = 0;
  setText("resultKakenuke", "0回");
  setText("resultRate", "0.0%");
  setText("resultAverage", "--");
  setText("resultBest", "--");
  setText("log", "RUSHを試行中...");
  for (let i = 0; i < trials; i++) {
    let chain = 1;
    while (Math.random() < continueRate && chain < 300) chain++;
    if (chain === 1) kakenuke++;
    total += chain;
    best = Math.max(best, chain);
  }
  await animateCount("resultKakenuke", kakenuke, "回", Math.min(2200, Math.max(900, trials / 8)));
  const rate = kakenuke / trials * 100;
  setText("resultKakenuke", `${yen.format(kakenuke)}回`);
  setText("resultRate", `${rate.toFixed(2)}%`);
  setText("resultAverage", `${(total / trials).toFixed(2)}連`);
  setText("resultBest", `${best}連`);
  setText("log", `${trials}回中 ${kakenuke}回駆け抜け / 駆け抜け率 ${rate.toFixed(2)}%`);
  setRunningButton("kakenuke", false);
  genericToolRunning = false;
}

let juggleRunning = false;

function simulateJuggle() {
  const { bigRate, regRate, medalsPerUnit, gamesPerUnit, bigMedals, regMedals } = fixedRankingSpecs.juggle;
  const costPerGame = medalsPerUnit / gamesPerUnit;
  let games = 0;
  let investment = 0;
  let medals = 0;
  let big = 0;
  let reg = 0;
  let chain = 0;
  let afterHit = 0;
  let started = false;
  const hitEvents = [];
  while (games < 20000) {
    if (medals < costPerGame) {
      investment += 1000;
      medals += medalsPerUnit;
    }
    medals -= costPerGame;
    games++;
    if (started) afterHit++;
    const hitRoll = Math.random();
    const combined = 1 / bigRate + 1 / regRate;
    if (hitRoll < combined) {
      started = true;
      afterHit = 0;
      chain++;
      let type;
      if (Math.random() < 0.5) {
        big++;
        medals += bigMedals;
        type = "BIG";
      } else {
        reg++;
        medals += regMedals;
        type = "REG";
      }
      hitEvents.push({ game: games, type, chain, big, reg });
    }
    if (started && afterHit >= 100) break;
  }
  const finalMedals = Math.max(0, Math.round(medals));
  const investedMedals = Math.round(investment / 1000 * medalsPerUnit);
  const diff = finalMedals - investedMedals;
  return { games, investment, finalMedals, diff, big, reg, chain, hitEvents };
}

async function runJuggle() {
  if (juggleRunning) return;
  juggleRunning = true;
  setRunningButton("juggle", true);
  setText("resultChain", "0連");
  setText("resultGames", "0G");
  setText("resultAfterHitGames", "初当たり待ち");
  setText("resultInvestment", "0円");
  setText("resultMedals", "0枚");
  setText("resultDiff", "0枚");
  setText("resultBonus", "BIG 0 / REG 0");
  setText("log", "回転中...");

  const result = simulateJuggle();
  await animateJuggleResult(result);
  await sleep(speedAdjustedDuration(160));

  const { games, investment, finalMedals, diff, big, reg, chain } = result;
  setText("resultChain", `${chain}連`);
  setText("resultGames", `${yen.format(games)}G`);
  setText("resultInvestment", `${yen.format(investment)}円`);
  setText("resultMedals", `${yen.format(finalMedals)}枚`);
  setText("resultDiff", `${diff > 0 ? "+" : ""}${yen.format(diff)}枚`);
  setText("resultBonus", `BIG ${big} / REG ${reg}`);
  setText("log", `${games}G / ${chain}連 / BIG ${big} REG ${reg} / 差枚 ${diff > 0 ? "+" : ""}${yen.format(diff)}枚`);
  latestResults.juggle = { games, investment, finalMedals, diff, big, reg, chain };
  markResultReady("juggle");
  setRunningButton("juggle", false);
  juggleRunning = false;
}

let hamariRunning = false;

async function runHamari() {
  if (hamariRunning) return;
  hamariRunning = true;
  setRunningButton("hamari", true);
  const { rate, spins } = fixedRankingSpecs.hamari;
  const probability = Math.pow((rate - 1) / rate, spins) * 100;
  const hitByThen = 100 - probability;
  setText("resultHamari", "--");
  setText("resultHit", "--");
  setText("resultRate", `1/${yen.format(rate)}`);
  setText("resultSpins", "0回転");
  setText("log", "回転数をカウント中...");
  await animateCount("resultSpins", spins, "回転", Math.min(2200, Math.max(900, spins * 2)));
  await Promise.all([
    animateDecimal("resultHamari", probability, "%", 2, 900),
    animateDecimal("resultHit", hitByThen, "%", 2, 900)
  ]);
  setText("resultHamari", `${probability.toFixed(2)}%`);
  setText("resultHit", `${hitByThen.toFixed(2)}%`);
  setText("resultRate", `1/${yen.format(rate)}`);
  setText("resultSpins", `${yen.format(spins)}回転`);
  setText("log", `1/${rate}で${spins}回転ハマる確率: ${probability.toFixed(2)}%`);
  latestResults.hamari = { rate, spins, probability, hitByThen };
  markResultReady("hamari");
  setRunningButton("hamari", false);
  hamariRunning = false;
}

let rare8192Running = false;

function simulateRare8192() {
  const { rate } = fixedRankingSpecs.rare8192;
  const random = Math.max(Number.EPSILON, Math.random());
  const spins = Math.ceil(Math.log(1 - random) / Math.log((rate - 1) / rate));
  const ratio = spins / rate;
  const hitByThen = (1 - Math.pow((rate - 1) / rate, spins)) * 100;
  const noHitByThen = 100 - hitByThen;
  const withinOneDenominator = (1 - Math.pow((rate - 1) / rate, rate)) * 100;
  return { rate, spins, ratio, hitByThen, noHitByThen, withinOneDenominator };
}

async function runRare8192() {
  if (rare8192Running) return;
  rare8192Running = true;
  setRunningButton("rare8192", true);
  setText("resultSpins", "0回転");
  setText("resultRatio", "--");
  setText("resultHitByThen", "--");
  setText("resultNoHit", "--");
  setText("resultOneDenominator", "--");
  setText("log", "1/8192を抽選中...");

  const result = simulateRare8192();
  await animateCount("resultSpins", result.spins, "回転", Math.min(5000, Math.max(1600, result.spins * 0.7)));
  await Promise.all([
    animateDecimal("resultHitByThen", result.hitByThen, "%", 2, 900),
    animateDecimal("resultNoHit", result.noHitByThen, "%", 2, 900)
  ]);
  setText("resultSpins", `${yen.format(result.spins)}回転`);
  setText("resultRatio", `${result.ratio.toFixed(2)}倍`);
  setText("resultHitByThen", `${result.hitByThen.toFixed(2)}%`);
  setText("resultNoHit", `${result.noHitByThen.toFixed(2)}%`);
  setText("resultOneDenominator", `${result.withinOneDenominator.toFixed(2)}%`);
  setText("log", `1/${yen.format(result.rate)} は ${yen.format(result.spins)}回転目に当選 / 分母の ${result.ratio.toFixed(2)}倍 / そこまでに当たる確率 ${result.hitByThen.toFixed(2)}%`);
  latestResults.rare8192 = {
    rate: result.rate,
    spins: result.spins,
    ratio: result.ratio,
    hitByThen: result.hitByThen,
    noHitByThen: result.noHitByThen
  };
  markResultReady("rare8192");
  setRunningButton("rare8192", false);
  rare8192Running = false;
}

let continuationRunning = false;

function simulateContinuation() {
  const rate = clampNumber(document.getElementById("continueRate")?.value, 81) / 100;
  const target = clampNumber(document.getElementById("targetChain")?.value, 10);
  const trials = clampNumber(document.getElementById("trials")?.value, 10000);
  let total = 0;
  let reached = 0;
  let best = 0;
  for (let i = 0; i < trials; i++) {
    let chain = 1;
    while (Math.random() < rate && chain < 300) chain++;
    total += chain;
    best = Math.max(best, chain);
    if (chain >= target) reached++;
  }
  return { rate, target, trials, average: total / trials, reach: reached / trials * 100, best };
}

async function runContinuation() {
  if (continuationRunning) return;
  continuationRunning = true;
  setRunningButton("continuation", true);
  setText("resultAverage", "--");
  setText("resultReach", "--");
  setText("resultBest", "--");
  setText("resultTrials", "0回");
  setText("log", "試行中...");

  const result = simulateContinuation();
  await animateCount("resultTrials", result.trials, "回", Math.min(2600, Math.max(1000, result.trials / 12)));
  await Promise.all([
    animateDecimal("resultAverage", result.average, "連", 2, 900),
    animateDecimal("resultReach", result.reach, "%", 2, 900),
    animateCount("resultBest", result.best, "連", 900)
  ]);
  setText("resultAverage", `${result.average.toFixed(2)}連`);
  setText("resultReach", `${result.reach.toFixed(2)}%`);
  setText("resultBest", `${result.best}連`);
  setText("resultTrials", `${yen.format(result.trials)}回`);
  setText("log", `継続率${Math.round(result.rate * 100)}% / 平均 ${result.average.toFixed(2)}連 / 最高 ${result.best}連`);
  setRunningButton("continuation", false);
  continuationRunning = false;
}

let rushRunning = false;
let twoChoiceState = {
  active: false,
  chain: 0,
  best: 0,
  round: 1,
  correct: null,
  history: []
};

function simulateRush() {
  const rushRate = clampNumber(document.getElementById("rushRate")?.value, 60) / 100;
  const trials = clampNumber(document.getElementById("trials")?.value, 100);
  let success = 0;
  let bestFailStreak = 0;
  let currentFail = 0;
  const events = [];
  for (let i = 0; i < trials; i++) {
    if (Math.random() < rushRate) {
      success++;
      currentFail = 0;
    } else {
      currentFail++;
      bestFailStreak = Math.max(bestFailStreak, currentFail);
    }
    events.push({ trial: i + 1, success, fail: i + 1 - success, bestFailStreak });
  }
  const failed = trials - success;
  return { rushRate, trials, success, failed, bestFailStreak, events };
}

async function animateRushResult(result) {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reducedMotion) return;
  const duration = speedAdjustedDuration(Math.min(2600, Math.max(1200, result.trials * 20)));
  const start = performance.now();
  let lastIndex = -1;
  return new Promise(resolve => {
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const index = Math.min(result.events.length - 1, Math.max(0, Math.round((result.events.length - 1) * eased)));
      if (index !== lastIndex) {
        lastIndex = index;
        const event = result.events[index];
        const rate = event.success / event.trial * 100;
        setText("resultSuccess", `${event.success}回`);
        setText("resultFail", `${event.fail}回`);
        setText("resultRate", `${rate.toFixed(1)}%`);
        setText("resultStreak", `${event.bestFailStreak}連続`);
        setText("log", `${event.trial}回目まで試行中 / 突破 ${event.success}回`);
      }
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(frame);
  });
}

async function runRush() {
  if (rushRunning) return;
  rushRunning = true;
  setRunningButton("rush", true);
  setText("resultSuccess", "0回");
  setText("resultFail", "0回");
  setText("resultRate", "0.0%");
  setText("resultStreak", "0連続");
  setText("log", "初当たりを試行中...");

  const result = simulateRush();
  await animateRushResult(result);
  await sleep(speedAdjustedDuration(120));
  const { trials, success, failed, bestFailStreak } = result;
  setText("resultSuccess", `${success}回`);
  setText("resultFail", `${failed}回`);
  setText("resultRate", `${(success / trials * 100).toFixed(1)}%`);
  setText("resultStreak", `${bestFailStreak}連続`);
  setText("log", `${trials}回中 ${success}回突破 / 実測 ${(success / trials * 100).toFixed(1)}%`);
  setRunningButton("rush", false);
  rushRunning = false;
}

function resetTwoChoice() {
  twoChoiceState = {
    active: true,
    chain: 0,
    best: Math.max(twoChoiceState.best || 0, clampNumber(localStorage.getItem("ichigekiTwoChoiceBest"), 0)),
    round: 1,
    correct: Math.random() < 0.5 ? "left" : "right",
    history: []
  };
  setText("resultChain", "0連");
  setText("resultBest", `${twoChoiceState.best}連`);
  setText("resultRound", "1回目");
  setText("resultNextRate", "50.0%");
  setText("log", "左か右を選んでください。");
  latestResults.twoChoice = null;
  setSaveReady("twoChoice", false);
  const effect = document.getElementById("choiceEffect");
  if (effect) {
    effect.textContent = "";
    effect.classList.remove("show");
  }
  document.querySelector(".choice-stage")?.classList.remove("success-pulse");
  document.querySelectorAll("[data-choice]").forEach(button => {
    button.disabled = false;
    button.classList.remove("good", "bad");
  });
}

function initializeTwoChoicePage() {
  if (!document.getElementById("resultBest")) return;
  if (!document.querySelector("[data-action='twoChoicePick']")) return;
  const best = clampNumber(localStorage.getItem("ichigekiTwoChoiceBest"), 0);
  twoChoiceState.best = best;
  twoChoiceState.correct = Math.random() < 0.5 ? "left" : "right";
  twoChoiceState.active = true;
  setText("resultBest", `${best}連`);
  setText("log", "左か右を選んでください。");
}

function playTwoChoiceSuccessEffect() {
  const effect = document.getElementById("choiceEffect");
  const stage = document.querySelector(".choice-stage");
  if (!effect || !stage) return;
  const special = twoChoiceState.chain >= 10 ? "激レア！" : twoChoiceState.chain >= 5 ? "好記録！" : "正解！";
  effect.textContent = `${special} ${twoChoiceState.chain}連`;
  effect.classList.remove("show");
  effect.classList.toggle("legend", twoChoiceState.chain >= 10);
  stage.classList.remove("success-pulse");
  void effect.offsetWidth;
  effect.classList.add("show");
  stage.classList.add("success-pulse");
  window.setTimeout(() => {
    stage.classList.remove("success-pulse");
  }, 560);
}

function finishTwoChoice(selected) {
  const selectedLabel = selected === "left" ? "左" : "右";
  const correctLabel = twoChoiceState.correct === "left" ? "左" : "右";
  const finalChain = twoChoiceState.chain;
  twoChoiceState.active = false;
  twoChoiceState.best = Math.max(twoChoiceState.best, finalChain);
  try {
    localStorage.setItem("ichigekiTwoChoiceBest", String(twoChoiceState.best));
  } catch {}
  latestResults.twoChoice = {
    chain: finalChain,
    rounds: twoChoiceState.round,
    probability: Math.pow(0.5, finalChain) * 100
  };
  markResultReady("twoChoice");
  document.querySelectorAll("[data-choice]").forEach(button => {
    button.disabled = true;
    button.classList.toggle("good", button.dataset.choice === twoChoiceState.correct);
    button.classList.toggle("bad", button.dataset.choice === selected);
  });
  setText("resultBest", `${twoChoiceState.best}連`);
  setText("resultNextRate", "--");
  setText("log", `終了: ${finalChain}連 / 選択 ${selectedLabel} / 正解 ${correctLabel}`);
}

function chooseTwoChoice(selected) {
  if (!twoChoiceState.active) resetTwoChoice();
  if (selected !== "left" && selected !== "right") return;
  const selectedLabel = selected === "left" ? "左" : "右";
  if (selected !== twoChoiceState.correct) {
    finishTwoChoice(selected);
    return;
  }
  twoChoiceState.chain++;
  twoChoiceState.best = Math.max(twoChoiceState.best, twoChoiceState.chain);
  twoChoiceState.history.unshift(`${twoChoiceState.round}回目 ${selectedLabel} 正解 / ${twoChoiceState.chain}連`);
  twoChoiceState.round++;
  twoChoiceState.correct = Math.random() < 0.5 ? "left" : "right";
  setText("resultChain", `${twoChoiceState.chain}連`);
  setText("resultBest", `${twoChoiceState.best}連`);
  setText("resultRound", `${twoChoiceState.round}回目`);
  setText("resultNextRate", "50.0%");
  setText("log", twoChoiceState.history.slice(0, 8).join("\n"));
  latestResults.twoChoice = {
    chain: twoChoiceState.chain,
    rounds: twoChoiceState.round - 1,
    probability: Math.pow(0.5, twoChoiceState.chain) * 100
  };
  markResultReady("twoChoice");
  playTwoChoiceSuccessEffect();
}

function copyShareText() {
  const text = document.getElementById("log")?.textContent.trim() || location.href;
  navigator.clipboard?.writeText(`${document.title}\n${text}\n${location.href}`).catch(() => null);
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (!/^https?:$/.test(location.protocol)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => null);
  });
}

document.addEventListener("click", event => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "pachinko319") runPachinko319();
  if (action === "juggle") runJuggle();
  if (action === "hamari") runHamari();
  if (action === "rare8192") runRare8192();
  if (action === "continuation") runContinuation();
  if (action === "rush") runRush();
  if (action === "genericPachinko") runGenericPachinko();
  if (action === "luckyTrigger") runLuckyTrigger();
  if (action === "ltRush") runLtRush();
  if (action === "czChallenge") runCzChallenge();
  if (action === "tenjo") runTenjo();
  if (action === "kakenuke") runKakenuke();
  if (action === "twoChoiceStart") resetTwoChoice();
  if (action === "twoChoicePick") chooseTwoChoice(target.dataset.choice);
  if (action === "applySimplePreset") applySimplePreset(target.dataset.presetAction, target.dataset.presetIndex);
  if (action === "share") copyShareText();
  if (action === "saveJuggle") saveLatestRecord("juggle");
  if (action === "savePachinko319") saveLatestRecord("pachinko319");
  if (action === "saveHamari") saveLatestRecord("hamari");
  if (action === "saveTwoChoice") saveLatestRecord("twoChoice");
  if (action === "saveLtRush") saveLatestRecord("ltRush");
  if (action === "saveCzChallenge") saveLatestRecord("czChallenge");
  if (action === "saveRare8192") saveLatestRecord("rare8192");
  if (action === "clearRanking") clearLocalRecords();
  if (action === "editRecord") updateRecordName(target.dataset.type, target.dataset.id);
  if (action === "deleteRecord") deleteRecord(target.dataset.type, target.dataset.id);
});

document.addEventListener("input", event => {
  if (event.target?.id === "animationSpeed") updateSpeedLabel();
});

document.addEventListener("change", event => {
  if (event.target?.matches("[data-ranking-sort]")) renderRankingPage();
});

updateSpeedLabel();
renderFixedConditionGuide();
renderSimplePresets();
renderResultGuide();
renderRankingPage();
initializeTwoChoicePage();
registerServiceWorker();
