(() => {
  const finder = document.querySelector(".new-machine-finder");
  if (!finder) return;

  const priorities = {
    pachinko: [
      { key: "easy", label: "初当り軽め" },
      { key: "continue", label: "継続重視" },
      { key: "impact", label: "一撃重視" }
    ],
    slot: [
      { key: "entry", label: "初当り重視" },
      { key: "continue", label: "継続重視" },
      { key: "upper", label: "上位AT重視" }
    ]
  };

  const recommendations = {
    "pachinko:easy": {
      title: "初当りを試しやすい2機種",
      machines: [
        { slug: "kamen-rider-black-light", meta: "デカヘソ・約1/129.9", name: "ライダーBLACK Light", note: "固定31回/1,000円で、初当りまでの投資とJUSTICE RUSHを短時間で比較。" },
        { slug: "no-game-no-life-119", meta: "初当りALL1000個", name: "ノゲノラ 119", note: "約1/119.8の初当りから、初回RUSH突破とHYPERまでを体験。" }
      ]
    },
    "pachinko:continue": {
      title: "RUSH継続を比べたい2機種",
      machines: [
        { slug: "fever-yokai-watch", meta: "トータル継続約80%", name: "eF妖怪ウォッチ", note: "時短引き戻し込みの入口と、1500個以上中心のRUSHを比較。" },
        { slug: "granbelm-319", meta: "RESTART込み約77%", name: "eグランベルム 319", note: "約51%の直LTから、3000個・4500個を含む出玉の振れ幅を体験。" }
      ]
    },
    "pachinko:impact": {
      title: "大きな出玉を狙う2機種",
      machines: [
        { slug: "juoh-shishi-no-ichigeki", meta: "平均約9800個の契機", name: "e獣王 獅子の一撃", note: "約50%のサバンナチャンスを含む、一撃性の高い結果を比較。" },
        { slug: "toaru3-pachinko", meta: "1500〜7500個以上", name: "eとある3", note: "3段階STと、まとまった出玉振り分けによる収支の差を体験。" }
      ]
    },
    "slot:entry": {
      title: "設定1の初当りが比較的軽い2機種",
      machines: [
        { slug: "garo-yami-slot", meta: "BONUS 約1/291.1", name: "スマスロ 牙狼", note: "4機種の中で平均投資目安が最も軽く、BONUSから上位への流れを試せます。" },
        { slug: "seiya-ougon-slot", meta: "AT 約1/364.2", name: "スマスロ 聖闘士星矢", note: "継続バトル型ATと設定別の初当り差を、固定レートで比較。" }
      ]
    },
    "slot:continue": {
      title: "上位の継続力を比べたい2機種",
      machines: [
        { slug: "seiya-ougon-slot", meta: "千日戦争 約88%", name: "スマスロ 聖闘士星矢", note: "通常ATから千日戦争へ進んだ時の獲得差枚と収支を体験。" },
        { slug: "garo-yami-slot", meta: "究極魔戒RUSH 約82.6%", name: "スマスロ 牙狼", note: "BONUSと上位CZを越えて、高純増の上位RUSHを目指します。" }
      ]
    },
    "slot:upper": {
      title: "上位ATまでの流れを試す2機種",
      machines: [
        { slug: "godzilla-eva2-slot", meta: "G覚醒RUSH", name: "スマスロ ゴジエヴァ2", note: "2種類のBONUS後ジャッジから、決戦と上位ATまでを一連で体験。" },
        { slug: "ggo-slot", meta: "上位ST イカれたレン", name: "スマスロ GGO", note: "BONUS・SQUAD JAM・GGOストームを経て上位STを目指します。" }
      ]
    }
  };

  const typeOptions = [...finder.querySelectorAll("[data-finder-type]")];
  const priorityOptions = finder.querySelector("[data-finder-options='priority']");
  const resultTitle = document.getElementById("newMachineFinderResultTitle");
  const cards = document.getElementById("newMachineFinderCards");
  let selectedType = "pachinko";
  let selectedPriority = priorities[selectedType][0].key;

  function machineCard(machine) {
    return `<article><small>${machine.meta}</small><h3>${machine.name}</h3><p>${machine.note}</p><div><a href="${machine.slug}.html#reader-guide">記事を読む</a><a class="is-primary" href="${machine.slug}.html#simulator">すぐ試す</a></div></article>`;
  }

  function renderResults() {
    const selection = recommendations[`${selectedType}:${selectedPriority}`];
    if (!selection) return;
    resultTitle.textContent = selection.title;
    cards.innerHTML = selection.machines.map(machineCard).join("");
  }

  function renderPriorities() {
    priorityOptions.innerHTML = priorities[selectedType].map((priority, index) => `<button type="button" data-finder-priority="${priority.key}" aria-pressed="${index === 0}">${priority.label}</button>`).join("");
    priorityOptions.querySelectorAll("[data-finder-priority]").forEach(button => {
      button.addEventListener("click", () => {
        selectedPriority = button.dataset.finderPriority;
        priorityOptions.querySelectorAll("button").forEach(option => option.setAttribute("aria-pressed", String(option === button)));
        renderResults();
      });
    });
  }

  typeOptions.forEach(button => {
    button.addEventListener("click", () => {
      selectedType = button.dataset.finderType;
      selectedPriority = priorities[selectedType][0].key;
      typeOptions.forEach(option => option.setAttribute("aria-pressed", String(option === button)));
      renderPriorities();
      renderResults();
    });
  });

  renderPriorities();
  renderResults();
})();
