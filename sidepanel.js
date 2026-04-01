// ══════════════════════════════════════════════
//  UNITS  (none → centillion, 10^303)
// ══════════════════════════════════════════════
const UNITS = [
  { id: "1", val: 1, label: "(----)" },
  { id: "1e3", val: 1e3, label: "thousand" },
  { id: "1e6", val: 1e6, label: "million" },
  { id: "1e9", val: 1e9, label: "billion" },
  { id: "1e12", val: 1e12, label: "trillion" },
  { id: "1e15", val: 1e15, label: "quadrillion" },
  { id: "1e18", val: 1e18, label: "quintillion" },
  { id: "1e21", val: 1e21, label: "sextillion" },
  { id: "1e24", val: 1e24, label: "septillion" },
  { id: "1e27", val: 1e27, label: "octillion" },
  { id: "1e30", val: 1e30, label: "nonillion" },
  { id: "1e33", val: 1e33, label: "decillion" },
  { id: "1e36", val: 1e36, label: "undecillion" },
  { id: "1e39", val: 1e39, label: "duodecillion" },
  { id: "1e42", val: 1e42, label: "tredecillion" },
  { id: "1e45", val: 1e45, label: "quattuordecillion" },
  { id: "1e48", val: 1e48, label: "quindecillion" },
  { id: "1e51", val: 1e51, label: "sexdecillion" },
  { id: "1e54", val: 1e54, label: "septendecillion" },
  { id: "1e57", val: 1e57, label: "octodecillion" },
  { id: "1e60", val: 1e60, label: "novemdecillion" },
  { id: "1e63", val: 1e63, label: "vigintillion" },
  { id: "1e66", val: 1e66, label: "unvigintillion" },
  { id: "1e69", val: 1e69, label: "duovigintillion" },
  { id: "1e72", val: 1e72, label: "trevigintillion" },
  { id: "1e75", val: 1e75, label: "quattuorvigintillion" },
  { id: "1e78", val: 1e78, label: "quinvigintillion" },
  { id: "1e81", val: 1e81, label: "sexvigintillion" },
  { id: "1e84", val: 1e84, label: "septenvigintillion" },
  { id: "1e87", val: 1e87, label: "octovigintillion" },
  { id: "1e90", val: 1e90, label: "novemvigintillion" },
  { id: "1e93", val: 1e93, label: "trigintillion" },
  { id: "1e96", val: 1e96, label: "untrigintillion" },
  { id: "1e99", val: 1e99, label: "duotrigintillion" },
  { id: "1e100", val: 1e100, label: "googol" },
  { id: "1e102", val: 1e102, label: "tretrigintillion" },
  { id: "1e120", val: 1e120, label: "novemtrigintillion" },
  { id: "1e123", val: 1e123, label: "quadragintillion" },
  { id: "1e153", val: 1e153, label: "quinquagintillion" },
  { id: "1e183", val: 1e183, label: "sexagintillion" },
  { id: "1e213", val: 1e213, label: "septuagintillion" },
  { id: "1e243", val: 1e243, label: "octogintillion" },
  { id: "1e273", val: 1e273, label: "nonagintillion" },
  { id: "1e303", val: 1e303, label: "centillion" },
];

const DD_IDS = ["currentUnit", "targetUnit", "cpsUnit"];

function unitById(id) {
  return UNITS.find((u) => u.id === id) || UNITS[0];
}

// ══════════════════════════════════════════════
//  CUSTOM DROPDOWN
// ══════════════════════════════════════════════
const ddSel = {};

function initDD(id, defaultUnitId) {
  ddSel[id] = defaultUnitId || "1";

  const wrap = document.getElementById("dd-" + id);
  if (!wrap) return;

  const btn = document.createElement("button");
  btn.id = "ddbtn-" + id;
  btn.className = "dd-btn";
  btn.type = "button";
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDD(id);
  });
  wrap.appendChild(btn);

  const list = document.createElement("div");
  list.id = "ddlist-" + id;
  list.className = "dd-list";
  document.body.appendChild(list);

  renderBtn(id);
  rebuildList(id);
}

function renderBtn(id) {
  const btn = document.getElementById("ddbtn-" + id);
  if (!btn) return;
  btn.textContent = unitById(ddSel[id]).label;
}

function rebuildList(id) {
  const list = document.getElementById("ddlist-" + id);
  if (!list) return;
  list.innerHTML = "";

  UNITS.forEach((unit) => {
    const item = document.createElement("div");
    item.className = "dd-item" + (ddSel[id] === unit.id ? " sel" : "");

    const nameEl = document.createElement("span");
    nameEl.className = "dd-item-name";
    nameEl.textContent = unit.label;

    const expEl = document.createElement("span");
    expEl.className = "dd-item-exp";
    expEl.textContent =
      unit.val >= 1e6
        ? "×10" + superscript(Math.round(Math.log10(unit.val)))
        : "";

    item.appendChild(nameEl);
    item.appendChild(expEl);
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      selectUnit(id, unit.id);
    });
    list.appendChild(item);
  });
}

function superscript(n) {
  const map = {
    0: "⁰",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹",
  };
  return String(n)
    .split("")
    .map((c) => map[c] || c)
    .join("");
}

function toggleDD(id) {
  const list = document.getElementById("ddlist-" + id);
  const isOpen = list.classList.contains("open");
  closeAll();
  if (!isOpen) {
    const btn = document.getElementById("ddbtn-" + id);
    const rect = btn.getBoundingClientRect();
    list.style.top = rect.bottom + 3 + "px";
    list.style.left = rect.left + "px";
    list.classList.add("open");
    btn.classList.add("open");
  }
}

function closeAll() {
  DD_IDS.forEach((id) => {
    document.getElementById("ddlist-" + id)?.classList.remove("open");
    document.getElementById("ddbtn-" + id)?.classList.remove("open");
  });
}

function selectUnit(id, unitId) {
  ddSel[id] = unitId;
  renderBtn(id);
  rebuildList(id);
  closeAll();
  saveLocal();
}

document.addEventListener("click", closeAll);

// ══════════════════════════════════════════════
//  CLOCK
// ══════════════════════════════════════════════

let progAnimId = null;
function animProg() {
  if (!appSt.finishTs) return;
  const diff = appSt.finishTs - Date.now();
  if (diff <= 0) {
    document.getElementById("progressBar").style.width = "100%";
    return;
  }
  const total = (appSt.target - appSt.current) / appSt.cps;
  if (total <= 0) return;
  const elapsed = total - diff / 1000;
  const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
  document.getElementById("progressBar").style.width = pct + "%";
  progAnimId = requestAnimationFrame(animProg);
}
function startProgAnim() {
  if (progAnimId) cancelAnimationFrame(progAnimId);
  progAnimId = requestAnimationFrame(animProg);
}

// ══════════════════════════════════════════════
//  APP STATE
// ══════════════════════════════════════════════
let appSt = { current: 0, target: 0, cps: 0, finishTs: null, goals: [], notified: false };

function numFor(inputId, ddId) {
  const n = parseFloat(document.getElementById(inputId).value) || 0;
  return n * unitById(ddSel[ddId] || "1").val;
}

// ══════════════════════════════════════════════
//  CALCULATE
// ══════════════════════════════════════════════
function calculate() {
  const current = numFor("current", "currentUnit");
  const target = numFor("target", "targetUnit");
  const cps = numFor("cps", "cpsUnit");

  if (cps <= 0) {
    showErr("CPS must be greater than 0");
    return;
  }
  if (target <= current) {
    showErr("Target must be greater than current cookies");
    return;
  }
  document.getElementById("errBox").style.display = "none";

  appSt.current = current;
  appSt.target = target;
  appSt.cps = cps;
  appSt.finishTs = Date.now() + ((target - current) / cps) * 1000;
  appSt.notified = false;

  if (document.getElementById("notifyToggle").checked) {
    chrome.alarms.create("cookieTimer", { when: appSt.finishTs });
  } else {
    chrome.alarms.clear("cookieTimer");
  }

  document.getElementById("resultSection").classList.remove("result-hidden");
  refreshCD();
  saveLocal();
  startProgAnim();
}

function showErr(m) {
  const el = document.getElementById("errBox");
  el.textContent = m;
  el.style.display = "block";
}

function refreshCD() {
  const diff = appSt.finishTs - Date.now();
  const total = (appSt.target - appSt.current) / appSt.cps;

  if (diff <= 0) {
    ["cdD", "cdH", "cdM", "cdS"].forEach(
      (id) => (document.getElementById(id).textContent = "00"),
    );
    setProg(100, "Goal reached!");

    if (!appSt.notified) {
      appSt.notified = true;
      if (document.getElementById("notifyToggle").checked) {
        chrome.runtime.sendMessage({
          type: "notify",
          text: "目標のクッキー数に到達しました！"
        }).catch((err) => console.error("Notification send error:", err));
      }
    }

    return;
  }

  const s = Math.floor(diff / 1000);
  document.getElementById("cdD").textContent = pad(Math.floor(s / 86400));
  document.getElementById("cdH").textContent = pad(
    Math.floor((s % 86400) / 3600),
  );
  document.getElementById("cdM").textContent = pad(Math.floor((s % 3600) / 60));
  document.getElementById("cdS").textContent = pad(s % 60);
  document.getElementById("arriveTime").textContent = new Date(
    appSt.finishTs,
  ).toLocaleString("en-US", { hour12: false });

  const elapsed = total - diff / 1000;
  const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
  setProg(pct, fmtDur(s) + " remaining");
}

function setProg(pct, label) {
  document.getElementById("progPct").textContent = pct.toFixed(1) + "%";
  document.getElementById("progRem").textContent = label;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function fmtDur(s) {
  if (s < 60) return s + "s";
  if (s < 3600) return Math.floor(s / 60) + "m " + (s % 60) + "s";
  if (s < 86400)
    return Math.floor(s / 3600) + "h " + Math.floor((s % 3600) / 60) + "m";
  return Math.floor(s / 86400) + "d " + Math.floor((s % 86400) / 3600) + "h";
}

// ══════════════════════════════════════════════
//  PERSIST
// ══════════════════════════════════════════════
function saveLocal() {
  try {
    localStorage.setItem(
      "cct2",
      JSON.stringify({
        inputs: {
          current: document.getElementById("current").value,
          target: document.getElementById("target").value,
          cps: document.getElementById("cps").value,
          currentUnit: ddSel.currentUnit || "1",
          targetUnit: ddSel.targetUnit || "1",
          cpsUnit: ddSel.cpsUnit || "1",
        },
        goals: appSt.goals,
        finishTs: appSt.finishTs,
        s_current: appSt.current,
        s_target: appSt.target,
        s_cps: appSt.cps,
        notify: document.getElementById("notifyToggle").checked,
      }),
    );
  } catch (e) { }
}

function loadLocal() {
  try {
    const raw = localStorage.getItem("cct2");
    if (!raw) return;
    const d = JSON.parse(raw);
    if (d.inputs) {
      document.getElementById("current").value = d.inputs.current || "";
      document.getElementById("target").value = d.inputs.target || "";
      document.getElementById("cps").value = d.inputs.cps || "";
      if (d.inputs.currentUnit) {
        ddSel.currentUnit = d.inputs.currentUnit;
        renderBtn("currentUnit");
        rebuildList("currentUnit");
      }
      if (d.inputs.targetUnit) {
        ddSel.targetUnit = d.inputs.targetUnit;
        renderBtn("targetUnit");
        rebuildList("targetUnit");
      }
      if (d.inputs.cpsUnit) {
        ddSel.cpsUnit = d.inputs.cpsUnit;
        renderBtn("cpsUnit");
        rebuildList("cpsUnit");
      }
    }
    if (d.goals) {
      appSt.goals = d.goals;
      renderGoals();
    }
    if (d.notify) document.getElementById("notifyToggle").checked = d.notify;
    if (d.finishTs && d.finishTs > Date.now()) {
      appSt.finishTs = d.finishTs;
      appSt.current = d.s_current || 0;
      appSt.target = d.s_target || 0;
      appSt.cps = d.s_cps || 0;
      document
        .getElementById("resultSection")
        .classList.remove("result-hidden");
      refreshCD();
      startProgAnim();
    }
  } catch (e) { }
}

// ══════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════
initDD("currentUnit");
initDD("targetUnit");
initDD("cpsUnit");
loadLocal();

function renderGoals() {
  // Empty stub to prevent ReferenceErrors from setInterval and loadLocal
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-calc')?.addEventListener('click', calculate);
  document.getElementById('notifyToggle')?.addEventListener('change', (e) => {
    saveLocal();
    if (appSt.finishTs && appSt.finishTs > Date.now()) {
      if (e.target.checked) chrome.alarms.create("cookieTimer", { when: appSt.finishTs });
      else chrome.alarms.clear("cookieTimer");
    }
  });
});
