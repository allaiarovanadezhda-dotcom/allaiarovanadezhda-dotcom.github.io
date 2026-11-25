/* hw-cheers.js — поддерживающие карточки после проверки задания.
   Подключение (после hw-engine-v1.js):
     <script>HW_CHEERS = { gender: "f" };</script>      // необязательно: "f" / "m", свой список — list:[…]
     <script src="hw-cheers.js"></script>
   Карточка выскакивает один раз на каждое задание — после первой проверки. */
(function () {
  "use strict";
  var cfg = window.HW_CHEERS || {};
  var f = (cfg.gender || "f") !== "m";
  var list = cfg.list || (f ? [
    "Ты умница! 🖤", "Так держать — ты справляешься! ✨", "Горжусь тобой! 🤍",
    "Ты сильная — и это видно ✨", "Каждое задание делает тебя увереннее 🖤",
    "Красотка! Отличная работа ✨", "Ошибки — это нормально. Главное, что ты стараешься 🤍",
    "Ты молодец, что не сдаёшься! 🖤", "Шаг за шагом — и ты уже сильнее, чем вчера ✨",
    "Ты большая умница, правда 🤍", "Твоё старание — это суперсила ✨", "Ты справишься с чем угодно 🖤"
  ] : [
    "Ты молодец! 🔥", "Так держать! 💪", "Горжусь тобой! ⭐", "Ты справляешься отлично 🔥",
    "Ошибки — это нормально, главное — стараться 💪", "Шаг за шагом — уже сильнее, чем вчера ⭐",
    "Ты не сдаёшься — это круто 🔥", "Супер работа! 💪"
  ]);
  var bag = [], shown = {};
  function next() { if (!bag.length) bag = list.slice().sort(function () { return Math.random() - 0.5; }); return bag.pop(); }

  var css = document.createElement("style");
  css.textContent =
    ".cheer-wrap{position:fixed;left:0;right:0;bottom:24px;display:flex;justify-content:center;z-index:9999;pointer-events:none}" +
    ".cheer{pointer-events:auto;max-width:86vw;background:#fff;color:#111;border:2px solid #111;border-radius:18px;" +
    "padding:16px 22px;font:600 17px/1.35 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;text-align:center;" +
    "box-shadow:0 10px 30px rgba(0,0,0,.18);transform:translateY(140%) scale(.9);opacity:0;transition:transform .45s cubic-bezier(.2,1.4,.4,1),opacity .3s}" +
    ".cheer.on{transform:none;opacity:1}";
  document.head.appendChild(css);

  function show(text) {
    var w = document.createElement("div"); w.className = "cheer-wrap";
    var c = document.createElement("div"); c.className = "cheer"; c.textContent = text;
    w.appendChild(c); document.body.appendChild(w);
    requestAnimationFrame(function () { requestAnimationFrame(function () { c.classList.add("on"); }); });
    function hide() { c.classList.remove("on"); setTimeout(function () { w.remove(); }, 400); }
    c.addEventListener("click", hide);
    setTimeout(hide, 3200);
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("button.btn");
    if (!b || b.textContent.indexOf("Проверить") < 0) return;
    var sec = b.closest("section"); var id = sec ? sec.id : "x";
    if (shown[id]) return;
    setTimeout(function () {
      var msg = sec && sec.querySelector(".msg");
      if (msg && !msg.textContent.trim()) return;   // ничего не проверено (пустое задание) — карточку не показываем
      shown[id] = true; show(next());
    }, 900);
  }, true);
})();
