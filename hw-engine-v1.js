/* =========================================================
   hw-engine-v1.js — общий движок ДЗ-сайтов
   Загружается ОДИН раз на GitHub. Каждое ДЗ — маленький файл,
   который подключает этот движок и описывает только задания.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Темы оформления ---------- */
  var THEMES = {
    pink:     { bg: "#fff0f6", text: "#4a2340", accent: "#ff4f9a", accent2: "#ffb3d1", soft: "#ffe3ef", decor: ["🌸", "🐱", "✨", "💗", "🎀"] },
    purple:   { bg: "#f4efff", text: "#33215a", accent: "#8b5cf6", accent2: "#c4b5fd", soft: "#ede6ff", decor: ["💜", "🐒", "🐱", "✈️", "✨"] },
    pinkblue: { bg: "#f2f7ff", text: "#2c2a4a", accent: "#f0609e", accent2: "#8ccbff", soft: "#e6f2ff", decor: ["💗", "💙", "🐱", "🏃‍♀️", "✨"] },
    beige:    { bg: "#faf6ef", text: "#4b3f2f", accent: "#b8901f", accent2: "#e6d3a3", soft: "#f3ebdd", decor: ["🤍", "✨", "🕊️", "🌾"] },
    barbie:   { bg: "#ffe6f4", text: "#5a0f3c", accent: "#ff1493", accent2: "#ff8fcf", soft: "#ffd1ea", decor: ["💖", "🎾", "✨", "👛", "💅"] },
    football: { bg: "#eefaf0", text: "#173b22", accent: "#16a34a", accent2: "#86efac", soft: "#dcfce7", decor: ["⚽", "🏆", "🥅", "⭐"] },
    gamer:    { bg: "#eef4ff", text: "#1e2a4a", accent: "#3b6ff6", accent2: "#93c5fd", soft: "#dbeafe", decor: ["🎮", "🥁", "🏀", "🐱", "⭐"] },
    sunny:    { bg: "#fffbea", text: "#4a3b10", accent: "#e08a00", accent2: "#fcd34d", soft: "#fef3c7", decor: ["🐷", "🐀", "🌴", "☀️", "⭐"] },
    lilac:    { bg: "#f7f0ff", text: "#3d2a55", accent: "#b16ef0", accent2: "#f0abfc", soft: "#f3e8ff", decor: ["🤸‍♀️", "🐶", "💜", "✨"] },
    strict:   { bg: "#f5f6f8", text: "#1f2937", accent: "#334155", accent2: "#94a3b8", soft: "#e9ecf1", decor: [], plain: true }
  };

  /* ---------- Салют для каждой темы ---------- */
  var CELE = {
    pink:     { emoji: "🪽💖🪽", rain: ["🌸", "🐱", "💗", "🎀", "✨", "🪽"], text: "Всё без единой ошибки! Ты умница! 💖", btn: "Ура! 💖", fx: "fireworks" },
    purple:   { emoji: "🪽💜🪽", rain: ["🐒", "🐱", "💜", "✨", "🪽", "✈️"], text: "Идеально! Ты звезда этого показа! ✨", btn: "Ура! 💜", fx: "both" },
    pinkblue: { emoji: "🏃‍♀️💨🏁", rain: ["💗", "💙", "🐱", "✨", "🏅"], text: "Финиш без единой ошибки! 🏅", btn: "Ура! 💙", fx: "fireworks" },
    beige:    { emoji: "🤍✨🤍", rain: ["🤍", "✨", "🕊️"], text: "Безупречно. Всё верно ✨", btn: "Спасибо ✨", fx: "confetti", colors: ["#d4af37", "#f3e5ab", "#ffffff", "#c9a227"] },
    barbie:   { emoji: "💖🎾💖", rain: ["💖", "🎾", "💅", "👛", "💎", "✨"], text: "Game, set, match! Всё верно! 💖", btn: "Ура! 💖", fx: "both" },
    football: { emoji: "⚽🥅🏆", rain: ["⚽", "🏆", "⭐", "🥇"], text: "ГО-О-ОЛ! Все задания без ошибок!", btn: "Ещё гол! ⚽", fx: "fireworks" },
    gamer:    { emoji: "🎮🏆🎮", rain: ["🎮", "🥁", "🏀", "⭐", "🪙"], text: "LEVEL COMPLETE! 100% без ошибок!", btn: "Next level ▶", fx: "both" },
    sunny:    { emoji: "🐷🏆🐀", rain: ["🐷", "🐀", "🦫", "🌴", "☀️"], text: "Всё верно! Даже капибары аплодируют! 🦫", btn: "Ура! ☀️", fx: "fireworks" },
    lilac:    { emoji: "🤸‍♀️🏅🐶", rain: ["🐶", "💜", "🏅", "✨", "🤸‍♀️"], text: "Идеальное выступление! 10 из 10!", btn: "Ура! 💜", fx: "both" },
    strict:   { emoji: "🏆", rain: [], text: "All tasks completed. 100% correct.", btn: "OK", fx: "confetti", colors: ["#334155", "#94a3b8", "#cbd5e1", "#0ea5e9"] }
  };

  /* ---------- Части ДЗ (единая структура) ---------- */
  var PARTS = {
    warmup:   { icon: "🔥", name: "Разминка" },
    review:   { icon: "🔁", name: "Работа над ошибками" },
    words:    { icon: "📚", name: "Повторяем слова" },
    practice: { icon: "🧩", name: "Отработка" },
    speak:    { icon: "🎙", name: "Говорение" },
    exam:     { icon: "🎓", name: "Формат экзамена" },
    write:    { icon: "✍️", name: "Пишем сами" },
    final:    { icon: "🎉", name: "Финал" }
  };

  /* ---------- Коллекции наград: у каждой темы своя ---------- */
  var COLLECT = {
    pink:     { name: "Домик для котиков 🏠", items: ["🧱", "🏠", "🪟", "🚪", "🌷", "🛋️", "🐱", "🧶", "🎀", "🌸", "🐈", "👑"] },
    purple:   { name: "Чемодан путешественницы 🧳", items: ["🗼", "🗽", "🏯", "🕌", "🗿", "🏝️", "🐒", "🎡", "🌋", "🏰", "🐱", "✈️"] },
    pinkblue: { name: "Марафон медалей 🏃‍♀️", items: ["👟", "🎽", "⏱️", "🐱", "🥤", "🏅", "💙", "🌈", "🎧", "🐾", "🏆", "👑"] },
    beige:    { name: "Vision board ✨", items: ["☕", "🤍", "🕯️", "📖", "🌾", "💐", "🧴", "👜", "🎀", "🕊️", "✨", "💎"] },
    barbie:   { name: "Шкаф трофеев 🎾", items: ["🎾", "💖", "👛", "🏆", "💅", "🎀", "🧘‍♀️", "💎", "🩰", "🌸", "🥇", "👑"] },
    football: { name: "Строим стадион 🏟️", items: ["🌱", "🥅", "⚽", "👟", "🧤", "🎽", "🚩", "📣", "💡", "🏟️", "🏆", "👑"] },
    gamer:    { name: "Инвентарь героя 🎮", items: ["🗡️", "🛡️", "⛑️", "🥾", "🧪", "🪙", "🥁", "🏀", "🗺️", "💎", "🐉", "👑"] },
    sunny:    { name: "Капибара-ферма 🦫", items: ["🌱", "🏡", "🦫", "🐷", "🐀", "🌴", "🍉", "🌻", "🛁", "🍊", "🏝️", "👑"] },
    lilac:    { name: "Медали гимнастки 🤸‍♀️", items: ["🎀", "🤸‍♀️", "🐶", "💜", "🩰", "⭐", "🦴", "🎶", "🏅", "✨", "🏆", "👑"] },
    strict:   { name: "Dev roadmap 🚀", items: ["💡", "📝", "🧩", "⚙️", "🧪", "🐞", "🔧", "📦", "🌐", "🚀", "🏆", "👑"] }
  };

  var H, T, F = true, progEl = null, lastPct = 0, collBox = null, STORE_KEY, S = { v: {}, checks: {}, game: {} };
  var apis = [], celebratedOnce = false;

  /* ---------- Мелкие помощники ---------- */
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>").replace(/\n/g, "<br>"); }
  function plain(s) { return String(s == null ? "" : s).replace(/\*\*|\*/g, ""); }
  function load() { try { var r = localStorage.getItem(STORE_KEY); if (r) { var o = JSON.parse(r); S.v = o.v || {}; S.checks = o.checks || {}; S.game = o.game || {}; } } catch (e) {} }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) {} if (progEl) updateProgress(); }
  function skey(name) { return "hw1:" + name + ":" + (H.student || "me"); }
  function sget(name, def) { try { var r = localStorage.getItem(skey(name)); return r ? JSON.parse(r) : def; } catch (e) { return def; } }
  function sset(name, v) { try { localStorage.setItem(skey(name), JSON.stringify(v)); } catch (e) {} }
  function hash(str) { var h = 0; str = String(str); for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0; return Math.abs(h).toString(36); }
  function rng(seed) { seed = Math.abs(seed | 0) % 233280 || 1; return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }
  function shuffle(a, seed) { var r = rng(seed), b = a.slice(); for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = b[i]; b[i] = b[j]; b[j] = t; } return b; }

  var P = {
    tryShort: function () { return F ? "← попробуй сама" : "← попробуй сам"; },
    doFirst: function () { return F ? "Сначала выполни задание сама, потом нажми «Проверить» 🙂" : "Сначала выполни задание сам, потом нажми «Проверить» 🙂"; },
    empties: function () { return F ? "Есть пустые ячейки — попробуй сама и проверь ещё раз." : "Есть пустые ячейки — попробуй сам и проверь ещё раз."; },
    fix: function () { return "Посмотри на ошибки, разберись и попробуй ещё раз 💪"; },
    great: function () { return F ? "Всё верно! Умница! 🎉" : "Всё верно! Молодец! 🎉"; },
    allDone: function () { return F ? "Всё выполнено без ошибок! Ты умница!" : "Всё выполнено без ошибок! Ты молодец!"; }
  };

  /* ---------- Сравнение ответов: регистр, знаки, сокращения ---------- */
  var PRON = "i|you|he|she|it|we|they|that|there|here|what|where|who|how|when|why|this";
  var reS = new RegExp("\\b(" + PRON + ")'s\\b"), reD = new RegExp("\\b(" + PRON + ")'d\\b");
  function baseNorm(s) {
    s = String(s || "").toLowerCase().replace(/[’‘`´ʼ]/g, "'").replace(/[“”«»"]/g, " ");
    return s.replace(/\bwon't\b/g, "will not").replace(/\bcan't\b/g, "can not").replace(/\bcannot\b/g, "can not")
      .replace(/\bshan't\b/g, "shall not").replace(/\blet's\b/g, "let us")
      .replace(/n't\b/g, " not").replace(/'m\b/g, " am").replace(/'re\b/g, " are").replace(/'ve\b/g, " have").replace(/'ll\b/g, " will");
  }
  function variants(s) {
    var list = [baseNorm(s)];
    for (var guard = 0; guard < 6; guard++) {
      var changed = false, next = [];
      list.forEach(function (v) {
        if (reS.test(v)) { changed = true; next.push(v.replace(reS, "$1 is"), v.replace(reS, "$1 has")); }
        else if (reD.test(v)) { changed = true; next.push(v.replace(reD, "$1 would"), v.replace(reD, "$1 had")); }
        else next.push(v);
      });
      list = next; if (!changed) break;
    }
    return list.map(function (v) { return v.replace(/[^a-z0-9'а-яё ]+/g, " ").replace(/'/g, "").replace(/\s+/g, " ").trim(); });
  }
  function isRight(user, answers) {
    var uv = variants(user);
    return answers.some(function (a) { return variants(a).some(function (x) { return uv.indexOf(x) >= 0; }); });
  }

  function parseLine(s) {
    var out = [], last = 0;
    String(s).replace(/\{([^{}]+)\}/g, function (m, inner, idx) {
      if (idx > last) out.push({ t: s.slice(last, idx) });
      out.push({ g: inner.split("|").map(function (x) { return x.trim(); }) });
      last = idx + m.length; return m;
    });
    if (last < s.length) out.push({ t: s.slice(last) });
    return out;
  }

  function mkInput(key, len) {
    var i = document.createElement("input");
    i.type = "text"; i.className = "gap"; i.value = S.v[key] || "";
    i.setAttribute("autocomplete", "off"); i.setAttribute("autocorrect", "off"); i.setAttribute("autocapitalize", "off"); i.spellcheck = false;
    i.style.width = Math.min(Math.max(len, 3) + 3, 30) + "ch";
    return i;
  }
  function mkArea(key, rows) {
    var t = document.createElement("textarea");
    t.rows = rows || 2; t.value = S.v[key] || "";
    t.setAttribute("autocomplete", "off"); t.setAttribute("autocorrect", "off"); t.setAttribute("autocapitalize", "sentences"); t.spellcheck = false;
    return t;
  }
  function mark(wrap, fb, st, right) {
    wrap.classList.remove("ok", "bad", "empty"); wrap.classList.add(st);
    fb.textContent = st === "bad" ? "✔ " + plain(right) : st === "empty" ? P.tryShort() : "";
  }
  function unmark(wrap, fb) { wrap.classList.remove("ok", "bad", "empty"); fb.textContent = ""; }
  function evalRows(rows, getVal) {
    return rows.map(function (r) {
      var v = getVal(r);
      return { q: r.q, ans: v, right: r.ans[0], st: !v ? "empty" : (isRight(v, r.ans) ? "ok" : "bad"), ref: r };
    });
  }
  function paintRows(det) { det.forEach(function (d) { mark(d.ref.wrap, d.ref.fb, d.st, d.right); }); }

  /* ---------- Типы заданий ---------- */

  // gaps и bank: "She {has got|'s got} a cold."
  function buildGaps(t, ti, body) {
    var gaps = [], lastFocus = null, bank = null, list = el("ol", "items");
    (t.items || []).forEach(function (line, i) {
      var li = el("li"), parts = parseLine(line), gi = 0;
      var qtext = plain(parts.map(function (p) { return p.g ? "___" : p.t; }).join("")).trim();
      parts.forEach(function (p) {
        if (!p.g) { li.appendChild(el("span", "", md(p.t))); return; }
        var key = "t" + ti + "_" + i + "_" + (gi++);
        var wrap = el("span", "gw"), inp = mkInput(key, Math.max.apply(null, p.g.map(function (a) { return a.length; }))), fb = el("span", "fb");
        wrap.appendChild(inp); wrap.appendChild(fb); li.appendChild(wrap);
        var g = { key: key, inp: inp, wrap: wrap, fb: fb, ans: p.g, q: qtext };
        inp.addEventListener("focus", function () { lastFocus = g; });
        inp.addEventListener("input", function () { S.v[key] = inp.value; save(); unmark(wrap, fb); if (bank) bank.refresh(); });
        gaps.push(g);
      });
      list.appendChild(li);
    });

    if (t.type === "bank") {
      var words = gaps.map(function (g) { return g.ans[0]; }).concat(t.extra || []);
      var bankEl = el("div", "bank");
      var chips = shuffle(words, ti * 31 + 7).map(function (w) {
        var b = el("button", "chip", md(w)); b.type = "button"; bankEl.appendChild(b); return { w: plain(w), b: b, used: false };
      });
      bank = {
        refresh: function () {
          var used = {};
          gaps.forEach(function (g) { var v = (S.v[g.key] || "").trim().toLowerCase(); if (v) used[v] = (used[v] || 0) + 1; });
          chips.forEach(function (ch) {
            var k = ch.w.trim().toLowerCase();
            ch.used = used[k] > 0; if (ch.used) used[k]--;
            ch.b.classList.toggle("used", ch.used);
          });
        }
      };
      chips.forEach(function (ch) {
        ch.b.addEventListener("click", function () {
          if (ch.used) { ch.b.classList.add("shake"); setTimeout(function () { ch.b.classList.remove("shake"); }, 400); return; }
          var target = (lastFocus && !(S.v[lastFocus.key] || "").trim()) ? lastFocus : gaps.filter(function (g) { return !(S.v[g.key] || "").trim(); })[0];
          if (!target) return;
          target.inp.value = ch.w; S.v[target.key] = ch.w; save(); unmark(target.wrap, target.fb); lastFocus = null; bank.refresh();
        });
      });
      body.appendChild(bankEl); bank.refresh();
    }
    body.appendChild(list);
    return {
      evaluate: function () { return evalRows(gaps, function (g) { return (S.v[g.key] || "").trim(); }); },
      paint: paintRows
    };
  }

  // rewrite: перефразировать / написать фразу целиком
  function buildRewrite(t, ti, body) {
    var rows = [], list = el("ol", "items");
    (t.items || []).forEach(function (it, i) {
      var li = el("li"), key = "t" + ti + "_" + i;
      li.appendChild(el("div", "q", md(it.q)));
      if (it.hint) li.appendChild(el("div", "hint", "→ " + md(it.hint)));
      var wrap = el("div", "gw wide"), inp = mkArea(key, 2), fb = el("div", "fb");
      wrap.appendChild(inp); wrap.appendChild(fb); li.appendChild(wrap);
      inp.addEventListener("input", function () { S.v[key] = inp.value; save(); unmark(wrap, fb); });
      rows.push({ key: key, wrap: wrap, fb: fb, ans: [].concat(it.a), q: plain(it.q), hint: it.hint ? plain(it.hint) : "" });
      list.appendChild(li);
    });
    body.appendChild(list);
    return {
      evaluate: function () { return evalRows(rows, function (r) { return (S.v[r.key] || "").trim(); }); },
      paint: paintRows
    };
  }

  // choice: выбрать вариант
  function buildChoice(t, ti, body) {
    var rows = [], list = el("ol", "items");
    (t.items || []).map(mix).forEach(function (it, i) {
      var li = el("li"), key = "t" + ti + "_" + i, opts = el("div", "opts"), fb = el("div", "fb");
      li.appendChild(el("div", "q", md(it.q)));
      var ai = typeof it.a === "number" ? it.a : it.o.indexOf(it.a);
      var btns = it.o.map(function (o, oi) {
        var b = el("button", "opt", md(o)); b.type = "button";
        b.addEventListener("click", function () {
          S.v[key] = oi; save(); sel(); li.classList.remove("ok", "bad", "empty"); fb.textContent = "";
          btns.forEach(function (x) { x.classList.remove("right", "wrong"); });
        });
        opts.appendChild(b); return b;
      });
      function sel() { btns.forEach(function (b, bi) { b.classList.toggle("on", S.v[key] === bi); }); }
      sel(); li.appendChild(opts); li.appendChild(fb); list.appendChild(li);
      rows.push({ key: key, li: li, fb: fb, btns: btns, ai: ai, o: it.o, q: plain(it.q) });
    });
    body.appendChild(list);
    return {
      evaluate: function () {
        return rows.map(function (r) {
          var v = S.v[r.key], has = typeof v === "number";
          return { q: r.q, ans: has ? plain(r.o[v]) : "", right: plain(r.o[r.ai]), st: !has ? "empty" : (v === r.ai ? "ok" : "bad"), ref: r };
        });
      },
      paint: function (det) {
        det.forEach(function (d) {
          var r = d.ref; r.li.classList.remove("ok", "bad", "empty"); r.li.classList.add(d.st);
          r.btns.forEach(function (b) { b.classList.remove("right", "wrong"); });
          if (d.st === "ok") r.btns[r.ai].classList.add("right");
          if (d.st === "bad") { r.btns[S.v[r.key]].classList.add("wrong"); r.btns[r.ai].classList.add("right"); }
          r.fb.textContent = d.st === "empty" ? P.tryShort() : "";
        });
      }
    };
  }

  // match: соединить пары
  function buildMatch(t, ti, body) {
    var rights = shuffle(t.pairs.map(function (p) { return p[1]; }), ti * 17 + 3);
    var rows = [], box = el("div", "match");
    t.pairs.forEach(function (p, i) {
      var key = "t" + ti + "_" + i, row = el("div", "mrow");
      row.appendChild(el("div", "ml", md(p[0])));
      var s = document.createElement("select");
      s.appendChild(new Option("— выбери —", ""));
      rights.forEach(function (r) { s.appendChild(new Option(plain(r), r)); });
      s.value = S.v[key] || "";
      var wrap = el("div", "gw wide"), fb = el("div", "fb");
      wrap.appendChild(s); wrap.appendChild(fb); row.appendChild(wrap);
      s.addEventListener("change", function () { S.v[key] = s.value; save(); unmark(wrap, fb); });
      rows.push({ key: key, wrap: wrap, fb: fb, right: p[1], q: plain(p[0]) });
      box.appendChild(row);
    });
    body.appendChild(box);
    return {
      evaluate: function () {
        return rows.map(function (r) {
          var v = S.v[r.key] || "";
          return { q: r.q, ans: plain(v), right: plain(r.right), st: !v ? "empty" : (v === r.right ? "ok" : "bad"), ref: r };
        });
      },
      paint: paintRows
    };
  }

  // order: собрать предложение из слов
  function buildOrder(t, ti, body) {
    var rows = [], list = el("ol", "items");
    (t.items || []).forEach(function (it, i) {
      var o = typeof it === "string" ? { a: it } : it, key = "t" + ti + "_" + i;
      var words = o.a.replace(/[.,!?;:]/g, "").split(/\s+/).filter(Boolean);
      if (words.length && !/^I('|$)/.test(words[0]) && !o.keepCase) words[0] = words[0].charAt(0).toLowerCase() + words[0].slice(1);
      var tiles = shuffle(words.map(function (w, k) { return { w: w, k: k }; }), ti * 100 + i * 7 + 1);
      if (tiles.length > 1 && tiles.every(function (x, k) { return x.k === k; })) tiles.reverse();
      var li = el("li");
      if (o.q) li.appendChild(el("div", "q", md(o.q)));
      var wrap = el("div", "gw wide"), built = el("div", "built"), pool = el("div", "pool"), fb = el("div", "fb");
      wrap.appendChild(built); wrap.appendChild(pool); wrap.appendChild(fb); li.appendChild(wrap);
      function cur() { return (S.v[key] || "").split(",").filter(function (x) { return x !== ""; }).map(Number); }
      function setCur(n) { S.v[key] = n.join(","); save(); unmark(wrap, fb); draw(); }
      function draw() {
        var c = cur(); built.innerHTML = ""; pool.innerHTML = "";
        if (!c.length) built.appendChild(el("span", "ph", "нажимай на слова по порядку"));
        c.forEach(function (idx, pos) {
          var b = el("button", "chip in", esc(tiles[idx].w)); b.type = "button";
          b.addEventListener("click", function () { var n = cur(); n.splice(pos, 1); setCur(n); });
          built.appendChild(b);
        });
        tiles.forEach(function (tl, idx) {
          if (c.indexOf(idx) >= 0) return;
          var b = el("button", "chip", esc(tl.w)); b.type = "button";
          b.addEventListener("click", function () { var n = cur(); n.push(idx); setCur(n); });
          pool.appendChild(b);
        });
      }
      draw(); list.appendChild(li);
      rows.push({ key: key, wrap: wrap, fb: fb, ans: [o.a].concat(o.alt || []), tiles: tiles, cur: cur,
        q: o.q ? plain(o.q) : tiles.map(function (x) { return x.w; }).join(" / ") });
    });
    body.appendChild(list);
    return {
      evaluate: function () { return evalRows(rows, function (r) { return r.cur().map(function (k) { return r.tiles[k].w; }).join(" "); }); },
      paint: paintRows
    };
  }

  // write: свободный ответ, проверяет учитель
  function buildWrite(t, ti, body) {
    var rows = [], list = el("ol", "items");
    (t.items || []).forEach(function (it, i) {
      var o = typeof it === "string" ? { q: it } : it, key = "t" + ti + "_" + i, li = el("li");
      li.appendChild(el("div", "q", md(o.q)));
      var wrap = el("div", "gw wide"), ta = mkArea(key, o.rows || 4), fb = el("div", "fb");
      wrap.appendChild(ta); wrap.appendChild(fb); li.appendChild(wrap);
      ta.addEventListener("input", function () { S.v[key] = ta.value; save(); unmark(wrap, fb); });
      rows.push({ key: key, wrap: wrap, fb: fb, o: o, q: plain(o.q) }); list.appendChild(li);
    });
    body.appendChild(list);
    return {
      written: true,
      evaluate: function () { return rows.map(function (r) { var v = (S.v[r.key] || "").trim(); return { q: r.q, ans: v, st: !v ? "empty" : "written", ref: r }; }); },
      paint: function (det) {
        det.forEach(function (d) {
          var r = d.ref; r.wrap.classList.remove("ok", "bad", "empty");
          if (d.st === "empty") { r.wrap.classList.add("empty"); r.fb.textContent = P.tryShort(); return; }
          r.wrap.classList.add("ok");
          var n = d.ans.split(/\s+/).filter(Boolean).length, m = "Записано ✅ (" + n + " сл.)";
          if (r.o.min && n < r.o.min) m += " — нужно хотя бы " + r.o.min + " слов";
          if (r.o.must) {
            var have = " " + variants(d.ans)[0] + " ";
            var miss = r.o.must.filter(function (w) { return have.indexOf(" " + variants(w)[0] + " ") < 0; });
            if (miss.length) m += " — не забудь использовать: " + miss.join(", ");
          }
          r.fb.textContent = m;
        });
      }
    };
  }

  // wordfall: игра «Словопад»
  function buildWordfall(t, ti, body) {
    var words = (t.words || H.words || []).map(function (w) { return Array.isArray(w) ? [plain(w[0]), plain(w[1])] : [plain(w.en), plain(w.ru)]; });
    var enFirst = t.dir !== "ru-en";
    var N = Math.min(t.count || 10, words.length);
    var info = el("div", "finfo"), area = el("div", "fall"), opts = el("div", "fopts"), start = el("button", "btn", "▶ Играть");
    start.type = "button";
    body.appendChild(info); body.appendChild(area); body.appendChild(opts); body.appendChild(start);
    function showInfo() {
      var g = S.game[ti];
      info.innerHTML = g ? "Последний результат: <b>" + g.score + "/" + g.total + "</b> · игр: " + g.plays
        : N + " слов. Слово падает — успей выбрать " + (enFirst ? "перевод" : "английское слово") + "!";
    }
    showInfo();
    var running = false;
    start.addEventListener("click", function () {
      if (running) return; running = true; start.classList.add("hidden");
      var seed = Date.now() % 100000, q = shuffle(words, seed).slice(0, N), k = 0, score = 0, missed = [];
      function next() {
        if (k >= q.length) return finish();
        var w = q[k++], shown = enFirst ? w[0] : w[1], right = enFirst ? w[1] : w[0];
        var others = shuffle(words.filter(function (x) { return x !== w; }).map(function (x) { return enFirst ? x[1] : x[0]; })
          .filter(function (x) { return x !== right; }), seed + k).slice(0, 3);
        var choices = shuffle(others.concat([right]), seed + k * 13);
        area.innerHTML = ""; opts.innerHTML = "";
        var fw = el("div", "fw", esc(shown)); area.appendChild(fw);
        fw.style.left = Math.max(4, Math.random() * (area.clientWidth - fw.offsetWidth - 8)) + "px";
        var done = false, t0 = performance.now(), dur = (t.speed || 7) * 1000, maxY = area.clientHeight - 44;
        function end(ok, picked) {
          if (done) return; done = true;
          if (ok) { score++; fw.classList.add("hit"); }
          else { missed.push({ q: shown, ans: picked || "", right: right }); fw.classList.add("miss"); fw.textContent = shown + " = " + right; }
          Array.prototype.forEach.call(opts.children, function (b) {
            if (b.dataset.v === right) b.classList.add("right"); else if (b.dataset.v === picked) b.classList.add("wrong");
            b.disabled = true;
          });
          setTimeout(next, ok ? 550 : 1500);
        }
        choices.forEach(function (v) {
          var b = el("button", "opt", esc(v)); b.type = "button"; b.dataset.v = v;
          b.addEventListener("click", function () { end(v === right, v); });
          opts.appendChild(b);
        });
        (function tick(now) {
          if (done) return;
          var p = (now - t0) / dur;
          if (p >= 1) return end(false, "");
          fw.style.top = (p * maxY) + "px";
          requestAnimationFrame(tick);
        })(t0);
      }
      function finish() {
        running = false;
        var plays = (S.game[ti] ? S.game[ti].plays : 0) + 1;
        S.game[ti] = { score: score, total: q.length, missed: missed, plays: plays }; save();
        if (t._vocab) {
          var mm = sget("vocabmiss", {}), ms = {};
          missed.forEach(function (m) { ms[m.q] = 1; });
          q.forEach(function (w) { var shown = enFirst ? w[0] : w[1]; if (ms[shown]) mm[w[0]] = 1; else delete mm[w[0]]; });
          sset("vocabmiss", mm);
        }
        area.innerHTML = '<div class="fres">' + score + "/" + q.length + " " + (score === q.length ? "🎉" : "💪") + "</div>";
        opts.innerHTML = ""; start.classList.remove("hidden"); start.textContent = "↺ Сыграть ещё"; showInfo();
        maybeCelebrate();
      }
      next();
    });
    return { game: true, N: N };
  }

  /* ======================= ИГРЫ ======================= */
  function btnEl(html, cls) { var b = el("button", cls || "btn", html); b.type = "button"; return b; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function gameDone(ti, score, total, missed, extra) {
    var plays = (S.game[ti] ? S.game[ti].plays : 0) + 1;
    S.game[ti] = { score: score, total: total, missed: missed, plays: plays, extra: extra || "" }; save(); maybeCelebrate();
  }
  function lastResult(ti) { var g = S.game[ti]; return g ? "Последний результат: <b>" + g.score + "/" + g.total + "</b> · попыток: " + g.plays : ""; }
  function idxOf(it) { return typeof it.a === "number" ? it.a : it.o.indexOf(it.a); }
  function mix(it) {
    if (!it || !it.o || it.keep || H.keepOrder) return it;
    var ai = idxOf(it), idx = shuffle(it.o.map(function (_, k) { return k; }), (parseInt(hash(it.q || ""), 36) % 100000) + 1);
    return Object.assign({}, it, { o: idx.map(function (k) { return it.o[k]; }), a: idx.indexOf(ai) });
  }
  function lock(box) { Array.prototype.forEach.call(box.querySelectorAll("button,input"), function (x) { x.disabled = true; }); }

  /* ---------- Гонка в шкурках ---------- */
  function raceSkin(t) {
    var k = t.skin || ({ football: "football", barbie: "tennis", purple: "runway", pinkblue: "run" }[H.theme]) || "run";
    var all = {
      football: { me: "⚽", rival: "🧤", goal: "🥅", meName: "Ты", rivalName: "Вратарь", title: "Серия пенальти", ok: ["ГОЛ! ⚽", "Какой удар! 🔥", "В девятку! 🎯"], bad: "Вратарь отбил! 🧤", win: "Победа в серии пенальти! 🏆", lose: "Вратарь сегодня в ударе. Ещё раз? 💪" },
      tennis: { me: "🎾", rival: "🤖", goal: "🏆", meName: "Ты", rivalName: "Соперник", title: "Теннисный матч", ok: ["Эйс! 🎾", "Winner! 💥", "Точно в линию! ✨"], bad: "Аут! Очко сопернику", win: "Game, set, match! 🏆", lose: "Соперник взял сет. Реванш? 💪" },
      run: { me: F ? "🏃‍♀️" : "🏃‍♂️", rival: "🐆", goal: "🏁", meName: "Ты", rivalName: "Гепард", title: "Забег", ok: ["Ускорение! 💨", "Отличный темп! ⚡", "Вперёд! 🔥"], bad: "Гепард вырывается вперёд!", win: F ? "Ты пришла первой! 🥇" : "Ты пришёл первым! 🥇", lose: "Гепард оказался быстрее. Ещё забег? 💪" },
      runway: { me: "💃", rival: "🙀", goal: "🌟", meName: "Ты", rivalName: "Конкурентка", title: "Показ на подиуме", ok: ["Вспышки камер! 📸", "Идеальная походка! 👠", "Зал аплодирует! 👏"], bad: "Ой, каблук подвернулся! 👠", win: "Ты звезда показа! 🌟", lose: "В этот раз звезда не ты. Ещё выход? 💪" }
    };
    return Object.assign({}, all[k] || all.run, t.skinText || {});
  }
  function buildRace(t, ti, body) {
    var sk = raceSkin(t), items = t.items || [], N = items.length;
    var info = el("div", "finfo", lastResult(ti) || (sk.title + ": " + N + " вопросов. Верный ответ — шаг вперёд, ошибка — шаг сопернику."));
    var board = el("div", "rboard"), track = el("div", "rtrack"), banner = el("div", "rbanner"), qbox = el("div", "rq"), start = btnEl("▶ Старт");
    track.innerHTML = '<div class="lane"><span class="rme">' + sk.me + '</span><span class="rgoal">' + sk.goal + '</span></div>' +
      '<div class="lane"><span class="rriv">' + sk.rival + '</span><span class="rgoal">' + sk.goal + "</span></div>";
    var me = track.querySelector(".rme"), riv = track.querySelector(".rriv");
    [info, board, track, banner, qbox, start].forEach(function (x) { body.appendChild(x); });
    function setBoard(a, b) { board.innerHTML = esc(sk.meName) + " <b>" + a + "</b> : <b>" + b + "</b> " + esc(sk.rivalName); }
    setBoard(0, 0);
    start.addEventListener("click", function () {
      start.classList.add("hidden"); var i = 0, sc = 0, rv = 0, missed = [];
      me.style.left = riv.style.left = "0%"; banner.textContent = ""; setBoard(0, 0);
      var order = t.shuffle === false ? items : shuffle(items, Date.now() % 9999);
      function ask() {
        if (i >= N) return end();
        var it = mix(order[i++]), ai = idxOf(it);
        qbox.innerHTML = ""; qbox.appendChild(el("div", "q", '<span class="qn">' + i + "/" + N + "</span> " + md(it.q)));
        var og = el("div", "fopts"); qbox.appendChild(og);
        it.o.forEach(function (o, oi) {
          var b = btnEl(md(o), "opt"); og.appendChild(b);
          b.addEventListener("click", function () {
            lock(og);
            if (oi === ai) { sc++; b.classList.add("right"); banner.textContent = pick(sk.ok); banner.className = "rbanner ok"; }
            else {
              rv++; b.classList.add("wrong"); og.children[ai].classList.add("right"); banner.textContent = sk.bad; banner.className = "rbanner bad";
              missed.push({ q: plain(it.q), ans: plain(o), right: plain(it.o[ai]), o: it.o.map(plain) });
            }
            me.style.left = (sc / N * 80) + "%"; riv.style.left = (rv / N * 80) + "%"; setBoard(sc, rv);
            setTimeout(ask, oi === ai ? 1000 : 1900);
          });
        });
      }
      function end() {
        qbox.innerHTML = ""; banner.className = "rbanner " + (sc > rv ? "ok" : "bad"); banner.textContent = sc > rv ? sk.win : sk.lose;
        start.textContent = "↺ Ещё раз"; start.classList.remove("hidden"); gameDone(ti, sc, N, missed); info.innerHTML = lastResult(ti);
      }
      ask();
    });
    return { game: true, N: N };
  }

  /* ---------- Чат-симулятор ---------- */
  function buildChat(t, ti, body) {
    var who = t.who || { name: "Emma", avatar: "👱‍♀️" }, steps = t.script || [];
    var N = steps.filter(function (s) { return s.me; }).length;
    var info = el("div", "finfo", lastResult(ti) || "Переписка с иностранцем: выбирай правильные реплики.");
    var phone = el("div", "chat"), head = el("div", "chead", '<span class="cav">' + esc(who.avatar) + '</span><div><b>' + esc(who.name) + '</b><div class="cst">была в сети недавно</div></div>');
    var log = el("div", "clog"), opts = el("div", "copts"), start = btnEl("💬 Открыть чат");
    phone.appendChild(head); phone.appendChild(log); phone.appendChild(opts);
    body.appendChild(info); body.appendChild(phone); body.appendChild(start);
    var st = head.querySelector(".cst");
    function bubble(text, cls) { var b = el("div", "bub " + cls, md(text)); log.appendChild(b); log.scrollTop = log.scrollHeight; return b; }
    function typing(ms) {
      st.textContent = "печатает…"; var b = el("div", "bub them typing", "<span></span><span></span><span></span>");
      log.appendChild(b); log.scrollTop = log.scrollHeight;
      return wait(ms).then(function () { b.remove(); st.textContent = "в сети"; });
    }
    start.addEventListener("click", function () {
      start.classList.add("hidden"); log.innerHTML = ""; opts.innerHTML = ""; st.textContent = "в сети";
      var sc = 0, missed = [], k = 0;
      function step() {
        if (k >= steps.length) return finish();
        var s = steps[k++];
        if (s.say != null) return typing(Math.min(1800, 500 + s.say.length * 22)).then(function () { bubble(s.say, "them"); setTimeout(step, 250); });
        if (s.me) {
          var first = true, prev = steps[k - 2];
          opts.innerHTML = "";
          shuffle(s.me, k * 7 + ti + 1).forEach(function (o) {
            var b = btnEl(md(o.t), "opt"); opts.appendChild(b);
            b.addEventListener("click", function () {
              if (o.ok) {
                opts.innerHTML = ""; bubble(o.t, "mine"); if (first) sc++;
                if (o.reply) typing(900).then(function () { bubble(o.reply, "them"); setTimeout(step, 250); }); else setTimeout(step, 300);
              } else {
                if (first) {
                  first = false; var right = s.me.filter(function (x) { return x.ok; })[0];
                  missed.push({ q: plain(s.q || (prev && (prev.say || prev.reply)) || "реплика"), ans: plain(o.t), right: right ? plain(right.t) : "", o: s.me.map(function (x) { return plain(x.t); }) });
                }
                b.disabled = true; b.classList.add("wrong"); bubble(o.t, "mine bad");
                typing(700).then(function () { bubble(o.fb || "💡 Hmm? Попробуй сказать по-другому.", "hint"); });
              }
            });
          });
          return;
        }
        step();
      }
      function finish() {
        opts.innerHTML = ""; bubble("Переписка завершена: " + sc + "/" + N + (sc === N ? " 🎉" : ""), "sys");
        start.textContent = "↺ Начать заново"; start.classList.remove("hidden"); gameDone(ti, sc, N, missed); info.innerHTML = lastResult(ti);
      }
      step();
    });
    return { game: true, N: N };
  }

  /* ---------- Найди ошибку ---------- */
  function buildSpot(t, ti, body) {
    var info = el("div", "finfo", lastResult(ti) || "В тексте спрятаны ошибки. Нажми на неправильное слово и исправь его.");
    var cnt = el("div", "scount"), box = el("div", "spot"), foot = el("div", "foot");
    var done = btnEl(F ? "Я всё нашла 🔍" : "Я всё нашёл 🔍"), again = btnEl("↺ Заново", "btn ghost hidden"), msg = el("div", "msg");
    foot.appendChild(done); foot.appendChild(again); foot.appendChild(msg);
    [info, cnt, box, foot].forEach(function (x) { body.appendChild(x); });
    var errs = [], taps = 0, closed = false;
    function upd() { cnt.innerHTML = "🔍 Исправлено ошибок: <b>" + errs.filter(function (e) { return e.fixed; }).length + " из " + errs.length + "</b>"; }
    function addPlain(s) {
      s.split(/(\s+)/).forEach(function (w) {
        if (!w) return;
        if (/^\s+$/.test(w)) { if (w.indexOf("\n") >= 0) box.appendChild(el("br")); else box.appendChild(document.createTextNode(" ")); return; }
        var sp = el("span", "sw", esc(w));
        sp.addEventListener("click", function () {
          if (closed) return; taps++; sp.classList.add("nope"); setTimeout(function () { sp.classList.remove("nope"); }, 700);
          msg.className = "msg"; msg.textContent = "Здесь всё верно 🙂 Ищи дальше.";
        });
        box.appendChild(sp);
      });
    }
    function addErr(wrong, right) {
      var e = { wrong: wrong, right: right.split("|").map(function (x) { return x.trim(); }), fixed: false };
      var sp = el("span", "sw", esc(wrong)); e.sp = sp;
      sp.addEventListener("click", function () {
        if (closed || e.fixed || e.open) return; e.open = true;
        var ed = el("span", "sedit"), inp = mkInput("_tmp", Math.max(wrong.length, 6)), ok = btnEl("✔", "mini");
        inp.value = ""; inp.placeholder = "исправь"; ed.appendChild(inp); ed.appendChild(ok);
        sp.parentNode.insertBefore(ed, sp.nextSibling); sp.classList.add("found"); e.ed = ed; inp.focus();
        msg.className = "msg"; msg.textContent = "Нашла ошибку? Впиши правильный вариант и нажми ✔".replace("Нашла", F ? "Нашла" : "Нашёл");
        function submit() {
          var v = inp.value.trim(); e.ans = v;
          var canDelete = e.right.indexOf("") >= 0;
          var good = (canDelete && (v === "" || v === "-" || v === "—")) || (v && isRight(v, e.right.filter(Boolean)));
          if (good) {
            e.fixed = true; ed.remove(); sp.innerHTML = "<s>" + esc(wrong) + "</s> " + esc(e.right[0] || ""); sp.className = "sw fixed";
            upd(); msg.className = "msg ok"; msg.textContent = "Верно исправлено! ✅";
          } else {
            inp.classList.add("shake"); setTimeout(function () { inp.classList.remove("shake"); }, 400);
            msg.className = "msg warn"; msg.textContent = canDelete ? "Подсказка: возможно, это слово лишнее — оставь поле пустым и нажми ✔" : "Пока не так — попробуй ещё 💪";
          }
        }
        ok.addEventListener("click", submit); inp.addEventListener("keydown", function (ev) { if (ev.key === "Enter") submit(); });
      });
      box.appendChild(sp); errs.push(e);
    }
    function render() {
      box.innerHTML = ""; errs = []; taps = 0; closed = false;
      var src = String(t.text || ""), re = /\[([^\]]*?)=>([^\]]*?)\]/g, last = 0, m;
      while ((m = re.exec(src))) { addPlain(src.slice(last, m.index)); addErr(m[1], m[2]); last = re.lastIndex; }
      addPlain(src.slice(last)); upd();
    }
    done.addEventListener("click", function () {
      var fx = errs.filter(function (e) { return e.fixed; }).length;
      if (!fx && !taps && !errs.some(function (e) { return e.open; })) { msg.className = "msg warn"; msg.textContent = P.doFirst(); return; }
      closed = true; var missed = [];
      errs.forEach(function (e) {
        if (e.fixed) return;
        if (e.ed) e.ed.remove();
        e.sp.className = "sw reveal"; e.sp.innerHTML = "<s>" + esc(e.wrong) + "</s> " + esc(e.right[0] || "(лишнее)");
        missed.push({ q: "«" + e.wrong + "»", ans: e.open ? (e.ans || "не исправлено") : "не найдено", right: e.right[0] || "(убрать слово)" });
      });
      msg.className = "msg " + (fx === errs.length ? "ok" : "mid");
      msg.textContent = fx + "/" + errs.length + " · " + (fx === errs.length ? P.great() : "Ненайденные ошибки подсвечены зелёным — разберись с ними.");
      done.classList.add("hidden"); again.classList.remove("hidden"); gameDone(ti, fx, errs.length, missed); info.innerHTML = lastResult(ti);
    });
    again.addEventListener("click", function () { render(); msg.textContent = ""; done.classList.remove("hidden"); again.classList.add("hidden"); });
    render();
    return { game: true, N: (String(t.text || "").match(/\[[^\]]*?=>/g) || []).length };
  }

  /* ---------- Детектив ---------- */
  function buildDetective(t, ti, body) {
    var steps = t.steps || [], N = steps.length + 1;
    var info = el("div", "finfo", lastResult(ti) || "Отвечай правильно — и находи улики. В конце назови виновного!");
    var file = el("div", "dfile"), board = el("div", "dboard"), qbox = el("div", "rq"), start = btnEl("🕵️ Взяться за дело");
    file.appendChild(el("div", "dtitle", "📁 " + md(t.case || "Дело №1")));
    file.appendChild(el("div", "dstory", md(t.story || ""))); file.appendChild(board); file.appendChild(qbox);
    body.appendChild(info); body.appendChild(file); body.appendChild(start);
    function drawBoard(found) {
      board.innerHTML = "<div class='dbh'>📌 Улики: " + found.filter(Boolean).length + " / " + steps.length + "</div>";
      steps.forEach(function (s, i) { board.appendChild(el("div", "clue" + (found[i] ? " open" : ""), found[i] ? "📎 " + md(s.clue) : "🔒 Улика " + (i + 1))); });
    }
    drawBoard([]);
    start.addEventListener("click", function () {
      start.classList.add("hidden"); var found = [], sc = 0, missed = [], i = 0; drawBoard(found);
      function ask() {
        if (i >= steps.length) return accuse();
        var s = mix(steps[i]), ai = idxOf(s), first = true;
        qbox.innerHTML = ""; qbox.appendChild(el("div", "q", "<span class='qn'>🔎 " + (i + 1) + "/" + steps.length + "</span> " + md(s.q)));
        var og = el("div", "fopts one"), fb = el("div", "msg"); qbox.appendChild(og); qbox.appendChild(fb);
        s.o.forEach(function (o, oi) {
          var b = btnEl(md(o), "opt"); og.appendChild(b);
          b.addEventListener("click", function () {
            if (oi === ai) {
              if (first) sc++; found[i] = true; i++; b.classList.add("right"); lock(og);
              fb.className = "msg ok"; fb.textContent = "Улика найдена! 📎"; drawBoard(found);
              var c = board.children[i]; if (c) c.classList.add("pop");
              setTimeout(ask, 1300);
            } else {
              if (first) { first = false; missed.push({ q: plain(s.q), ans: plain(o), right: plain(s.o[ai]), o: s.o.map(plain) }); }
              b.disabled = true; b.classList.add("wrong"); fb.className = "msg warn"; fb.textContent = "Ложный след… Подумай ещё 🤔";
            }
          });
        });
      }
      function accuse() {
        qbox.innerHTML = ""; qbox.appendChild(el("div", "q", "<b>Все улики собраны! Кто виноват?</b>"));
        var g = el("div", "sus"); qbox.appendChild(g);
        (t.suspects || []).forEach(function (p, pi) {
          var b = btnEl("<div class='se'>" + esc(p.emoji || "🧑") + "</div><b>" + md(p.name) + "</b><div class='sd'>" + md(p.desc || "") + "</div>", "scard");
          g.appendChild(b);
          b.addEventListener("click", function () {
            lock(g); var ok = pi === t.culprit; if (ok) sc++;
            else missed.push({ q: "Кто виноват?", ans: plain(p.name), right: plain(t.suspects[t.culprit].name) });
            b.classList.add(ok ? "right" : "wrong"); g.children[t.culprit].classList.add("right");
            qbox.appendChild(el("div", "dsol", (ok ? "🎉 <b>Дело раскрыто!</b> " : "❌ <b>Не тот подозреваемый.</b> ") + md(t.solution || "")));
            start.textContent = "↺ Расследовать заново"; start.classList.remove("hidden"); gameDone(ti, sc, N, missed); info.innerHTML = lastResult(ti);
          });
        });
      }
      ask();
    });
    return { game: true, N: N };
  }

  /* ---------- Лента блогера (Instagram / TikTok) ---------- */
  function buildFeed(t, ti, body) {
    var posts = t.posts || [], N = posts.length;
    var acc = t.account || ("@" + String(H.student || "me").toLowerCase().replace(/[^a-zа-яё0-9]/g, "") + "_blog");
    var info = el("div", "finfo", lastResult(ti) || "Ты — блогер! Выбери правильный вариант подписи, чтобы опубликовать пост и набрать подписчиков.");
    var app = el("div", "feed"), top = el("div", "ftop"), stage = el("div", "fstage"), start = btnEl("📲 Открыть ленту");
    app.appendChild(top); app.appendChild(stage); body.appendChild(info); body.appendChild(app); body.appendChild(start);
    var base = t.followers || 120, fol = base;
    function drawTop() { top.innerHTML = "<span>" + esc(acc) + "</span><span class='ffol'><b>" + fol + "</b> подписчиков</span>"; }
    drawTop(); stage.innerHTML = "<div class='fempty'>📱</div>";
    start.addEventListener("click", function () {
      start.classList.add("hidden"); fol = base; drawTop(); var i = 0, sc = 0, missed = [];
      function show() {
        if (i >= N) return end();
        var p = mix(posts[i++]), ai = idxOf(p), likes = p.likes || (80 + (i * 97) % 400);
        stage.innerHTML = "";
        var card = el("div", "post"); card.style.background = p.bg || "linear-gradient(160deg,var(--accent),var(--accent2))";
        card.innerHTML = "<div class='pdots'>" + posts.map(function (_, k) { return "<i class='" + (k < i ? "on" : "") + "'></i>"; }).join("") + "</div>" +
          "<div class='puser'><span class='pav'>" + esc(p.avatar || "🙂") + "</span>" + esc(p.user || acc) + "</div>" +
          "<div class='ppic'>" + esc(p.pic || "📸") + "</div>" +
          "<div class='pside'><div>❤️<br><b class='pl'>" + likes + "</b></div><div>💬<br><b>" + (p.comments || 12) + "</b></div><div>↗️</div></div>";
        var cap = el("div", "pcap", "<b>" + esc(p.user || acc) + "</b> " + md(p.caption)), og = el("div", "fopts"), fb = el("div", "pfb");
        [card, cap, og, fb].forEach(function (x) { stage.appendChild(x); });
        p.o.forEach(function (o, oi) {
          var b = btnEl(md(o), "opt"); og.appendChild(b);
          b.addEventListener("click", function () {
            lock(og);
            if (oi === ai) {
              sc++; b.classList.add("right"); var plus = p.plus || (40 + (i * 53) % 120); fol += plus; drawTop();
              card.appendChild(el("div", "heart", "❤️")); card.querySelector(".pl").textContent = likes + plus * 3;
              cap.innerHTML = "<b>" + esc(p.user || acc) + "</b> " + md(p.caption.replace("___", "**" + plain(p.o[ai]) + "**"));
              fb.className = "pfb ok"; fb.textContent = "Опубликовано! +" + plus + " подписчиков 🎉";
            } else {
              b.classList.add("wrong"); og.children[ai].classList.add("right"); fol = Math.max(0, fol - 15); drawTop();
              fb.className = "pfb bad"; fb.innerHTML = "💬 <b>" + esc(p.troll || "@grammar_police") + "</b>: " + md(p.fb || ("правильно будет *" + plain(p.o[ai]) + "* 😉")) + " <span class='minus'>−15 подписчиков</span>";
              missed.push({ q: plain(p.caption), ans: plain(o), right: plain(p.o[ai]), o: p.o.map(plain) });
            }
            var nx = btnEl(i < N ? "Листать дальше ⬆️" : "Итоги 📊"); nx.addEventListener("click", show); stage.appendChild(nx);
          });
        });
      }
      function end() {
        stage.innerHTML = "<div class='fend'><div class='fe'>" + (sc === N ? "🔥" : "📈") + "</div><b>" + fol + " подписчиков</b><div>" +
          (fol > base ? "+" + (fol - base) + " за сегодня" : "") + "</div><div>Верно: " + sc + "/" + N + "</div></div>";
        start.textContent = "↺ Ещё раз"; start.classList.remove("hidden"); gameDone(ti, sc, N, missed); info.innerHTML = lastResult(ti);
      }
      show();
    });
    return { game: true, N: N };
  }

  /* ---------- Экзамен-шоу с таймером ---------- */
  function buildExam(t, ti, body) {
    var items = t.items || [], N = items.length, T0 = t.time || 25;
    var info = el("div", "finfo", lastResult(ti) || (N + " вопросов, на каждый " + T0 + " сек. Чем быстрее верный ответ — тем больше очков!"));
    var st = el("div", "show"), start = btnEl("🎬 Начать шоу");
    st.innerHTML = "<div class='shtop'><span class='shlogo'>🎤 " + esc(t.show || "Exam Show") + "</span><span class='shpts'>⭐ 0</span></div>" +
      "<div class='shhost'><span class='hh'>" + esc(t.host || "🧑‍🎤") + "</span><div class='hb'>Добро пожаловать на шоу! Готов" + (F ? "а" : "") + "? Жми «Начать шоу»!</div></div>" +
      "<div class='shmid'><svg class='ring' viewBox='0 0 100 100'><circle cx='50' cy='50' r='44' class='rbg'/><circle cx='50' cy='50' r='44' class='rfg'/></svg><div class='tnum'>" + T0 + "</div></div>" +
      "<div class='shq'><div class='q'>Вопросов: " + N + " · время на ответ: " + T0 + " сек.</div></div><div class='shaud'>👏🙂👏😃👏🤩👏</div>";
    body.appendChild(info); body.appendChild(st); body.appendChild(start);
    var pts = st.querySelector(".shpts"), hb = st.querySelector(".hb"), fg = st.querySelector(".rfg"), tn = st.querySelector(".tnum"), qb = st.querySelector(".shq"), aud = st.querySelector(".shaud");
    var C = 2 * Math.PI * 44; fg.style.strokeDasharray = C; fg.style.strokeDashoffset = 0;
    start.addEventListener("click", function () {
      start.classList.add("hidden"); var i = 0, sc = 0, score = 0, missed = [], timer = null;
      pts.textContent = "⭐ 0";
      var order = t.shuffle ? shuffle(items, Date.now() % 999) : items;
      function ask() {
        if (i >= N) return end();
        var it = mix(order[i++]), t1 = performance.now(), left = T0, answered = false, finish;
        var rightText = it.o ? plain(it.o[idxOf(it)]) : [].concat(it.a)[0];
        hb.textContent = i === 1 ? "Первый вопрос! Время пошло ⏱" : pick(["Следующий вопрос!", "А теперь посложнее 😏", "Внимание на экран!", "Студия замерла…"]);
        qb.innerHTML = "<div class='qn'>Вопрос " + i + "/" + N + "</div><div class='q'>" + md(it.q) + (it.word ? " <span class='wkey'>" + esc(it.word) + "</span>" : "") + "</div>";
        if (it.o) {
          var ai = idxOf(it), og = el("div", "fopts"); qb.appendChild(og);
          it.o.forEach(function (o, oi) {
            var b = btnEl(md(o), "opt"); og.appendChild(b);
            b.addEventListener("click", function () { finish(oi === ai, plain(o), b, og.children[ai]); });
          });
        } else {
          var row = el("div", "shin"), inp = mkInput("_tmp", 12), go = btnEl("Ответить");
          inp.value = ""; inp.placeholder = "твой ответ"; row.appendChild(inp); row.appendChild(go); qb.appendChild(row);
          var sub = function () { var v = inp.value.trim(); if (!v) { inp.focus(); return; } finish(isRight(v, [].concat(it.a)), v); };
          go.addEventListener("click", sub); inp.addEventListener("keydown", function (e) { if (e.key === "Enter") sub(); });
          setTimeout(function () { try { inp.focus({ preventScroll: true }); } catch (e) {} st.scrollLeft = 0; }, 60);
        }
        finish = function (ok, ans, b, rb) {
          if (answered) return; answered = true; clearInterval(timer); lock(qb); st.classList.remove("hurry");
          if (b) b.classList.add(ok ? "right" : "wrong"); if (rb && !ok) rb.classList.add("right");
          if (ok) {
            var gain = 100 + Math.round(left) * 10; sc++; score += gain; pts.textContent = "⭐ " + score;
            hb.textContent = pick(["Верно! ", "Блестяще! ", "В точку! "]) + "+" + gain + " очков 🎉";
            aud.classList.add("clap"); setTimeout(function () { aud.classList.remove("clap"); }, 1000);
          } else {
            hb.innerHTML = (ans == null ? "Время вышло! ⏰ " : "Увы! ") + "Правильно: <b>" + esc(rightText) + "</b>";
            missed.push({ q: plain(it.q) + (it.word ? " (" + it.word + ")" : ""), ans: ans == null ? (F ? "не успела" : "не успел") : ans, right: rightText, o: it.o ? it.o.map(plain) : null });
          }
          setTimeout(ask, ok ? 1600 : 2700);
        };
        timer = setInterval(function () {
          left = Math.max(0, T0 - (performance.now() - t1) / 1000);
          tn.textContent = Math.ceil(left); fg.style.strokeDashoffset = C * (1 - left / T0);
          fg.style.stroke = left <= 5 ? "#ef4444" : left <= T0 / 2 ? "#f59e0b" : "";
          st.classList.toggle("hurry", left <= 5 && left > 0);
          if (left <= 0) finish(false, null);
        }, 100);
      }
      function end() {
        clearInterval(timer); st.classList.remove("hurry"); tn.textContent = "🏁"; fg.style.strokeDashoffset = 0; fg.style.stroke = "";
        qb.innerHTML = "<div class='q'><b>Итог шоу: " + score + " очков</b><br>Верных ответов: " + sc + "/" + N + "</div>";
        hb.textContent = sc === N ? "Невероятно! Абсолютный чемпион! 🏆" : "Отличная игра! Приходи ещё 👋";
        start.textContent = "↺ Ещё раз"; start.classList.remove("hidden"); gameDone(ti, sc, N, missed); info.innerHTML = lastResult(ti);
      }
      ask();
    });
    return { game: true, N: N };
  }


  /* ---------- Работа над ошибками (из прошлых ДЗ + от учителя) ---------- */
  function recordMistakes() {
    var store = sget("mistakes", []), title = plain(H.title), add = [];
    H.tasks.forEach(function (t, ti) {
      var a = apis[ti]; if (!a || a.written || a.speak || a.skip || t.type === "mistakes") return;
      if (a.game) {
        var g = S.game[ti]; if (!g || t.type === "wordfall" || t.type === "vocab" || t.type === "spot") return;
        (g.missed || []).forEach(function (m) {
          if (m.o) add.push({ q: m.q, o: m.o, a: m.right });
          else if (t.type === "exam") add.push({ q: m.q, a: [m.right] });
        });
        return;
      }
      a.evaluate().forEach(function (d) {
        if (d.st !== "bad") return; var r = d.ref;
        if (t.type === "choice") add.push({ q: d.q, o: r.o.map(plain), a: d.right });
        else if (t.type === "match") {
          var others = shuffle(t.pairs.map(function (p) { return plain(p[1]); }).filter(function (x) { return x !== d.right; }), 5).slice(0, 3);
          add.push({ q: d.q + " — это…", o: shuffle(others.concat([d.right]), 9), a: d.right });
        }
        else if (t.type === "order") return;
        else if (r.ans) add.push({ q: d.q + (r.hint ? " → " + r.hint : ""), a: r.ans.map(plain) });
      });
    });
    add.forEach(function (m) { m.from = title; store = store.filter(function (x) { return x.q !== m.q; }); store.push(m); });
    sset("mistakes", store.slice(-40));
  }

  function buildMistakes(t, ti, body) {
    var title = plain(H.title);
    var own = (t.items || []).map(function (m) { return { q: m.q, o: m.o, a: m.o ? (typeof m.a === "number" ? m.o[m.a] : m.a) : [].concat(m.a) }; });
    var stored = shuffle(sget("mistakes", []).filter(function (m) { return m.from !== title; }), 11).slice(0, t.count || 6);
    var list = own.concat(stored);
    if (!list.length) { body.appendChild(el("p", "instr", "🎉 Ошибок из прошлых домашек нет — так держать!")); return { skip: true }; }
    var rows = [], ol = el("ol", "items");
    list.forEach(function (m) {
      var key = "t" + ti + "_m_" + hash(m.q), li = el("li"), r = { key: key, m: m, li: li, q: plain(m.q) };
      li.appendChild(el("div", "q", md(m.q) + (m.from ? " <span class='from'>из «" + esc(m.from) + "»</span>" : "")));
      if (m.o) {
        r.ai = m.o.map(plain).indexOf(plain([].concat(m.a)[0])); if (r.ai < 0) r.ai = 0; var opts = el("div", "opts"); r.fb = el("div", "fb");
        r.btns = m.o.map(function (o, oi) {
          var b = btnEl(md(o), "opt");
          b.addEventListener("click", function () {
            S.v[key] = oi; save(); li.classList.remove("ok", "bad", "empty"); r.fb.textContent = "";
            r.btns.forEach(function (x, xi) { x.classList.toggle("on", xi === oi); x.classList.remove("right", "wrong"); });
          });
          opts.appendChild(b); return b;
        });
        r.btns.forEach(function (b, bi) { b.classList.toggle("on", S.v[key] === bi); });
        li.appendChild(opts); li.appendChild(r.fb);
      } else {
        r.wrap = el("div", "gw wide"); var inp = mkArea(key, 1); r.fb = el("div", "fb");
        r.wrap.appendChild(inp); r.wrap.appendChild(r.fb); li.appendChild(r.wrap);
        inp.addEventListener("input", function () { S.v[key] = inp.value; save(); unmark(r.wrap, r.fb); });
      }
      rows.push(r); ol.appendChild(li);
    });
    body.appendChild(ol);
    return {
      evaluate: function () {
        return rows.map(function (r) {
          if (r.m.o) { var v = S.v[r.key], has = typeof v === "number"; return { q: r.q, ans: has ? plain(r.m.o[v]) : "", right: plain(r.m.o[r.ai]), st: !has ? "empty" : (v === r.ai ? "ok" : "bad"), ref: r }; }
          var s2 = (S.v[r.key] || "").trim(), A = [].concat(r.m.a);
          return { q: r.q, ans: s2, right: A[0], st: !s2 ? "empty" : (isRight(s2, A) ? "ok" : "bad"), ref: r };
        });
      },
      paint: function (det) {
        var store = sget("mistakes", []);
        det.forEach(function (d) {
          var r = d.ref;
          if (r.m.o) {
            r.li.classList.remove("ok", "bad", "empty"); r.li.classList.add(d.st);
            r.btns.forEach(function (b) { b.classList.remove("right", "wrong"); });
            if (d.st === "ok") r.btns[r.ai].classList.add("right");
            if (d.st === "bad") { r.btns[S.v[r.key]].classList.add("wrong"); r.btns[r.ai].classList.add("right"); }
            r.fb.textContent = d.st === "empty" ? P.tryShort() : "";
          } else mark(r.wrap, r.fb, d.st, d.right);
          if (d.st === "ok" && r.m.from) store = store.filter(function (x) { return x.q !== r.m.q; });
        });
        sset("mistakes", store);
      }
    };
  }

  /* ---------- Накопительный словарь ---------- */
  function addVocab(list, unit) {
    if (!list || !list.length) return;
    var v = sget("vocab", []), seen = {};
    v.forEach(function (w) { seen[w[0].toLowerCase()] = 1; });
    list.forEach(function (w) {
      var o = Array.isArray(w) ? [plain(w[0]), plain(w[1])] : [plain(w.en), plain(w.ru)];
      if (o[0] && !seen[o[0].toLowerCase()]) { v.push([o[0], o[1], unit]); seen[o[0].toLowerCase()] = 1; }
    });
    sset("vocab", v);
  }
  function buildVocab(t, ti, body) {
    var cur = {}; (H.words || []).forEach(function (w) { cur[plain(Array.isArray(w) ? w[0] : w.en).toLowerCase()] = 1; });
    var all = sget("vocab", []).filter(function (w) { return !cur[w[0].toLowerCase()]; });
    if (all.length < 4) {
      body.appendChild(el("p", "instr", "Слова из прошлых домашек копятся автоматически. Пока их мало — повторим слова этого ДЗ 🙂"));
      all = sget("vocab", []);
    }
    if (all.length < 2) { body.appendChild(el("p", "instr", "Слов пока нет.")); return { skip: true }; }
    var miss = sget("vocabmiss", {}), n = t.count || 8;
    var hard = shuffle(all.filter(function (w) { return miss[w[0]]; }), Date.now() % 97).slice(0, Math.ceil(n / 2));
    var rest = shuffle(all.filter(function (w) { return !miss[w[0]]; }), Date.now() % 9973);
    var picked = hard.concat(rest).slice(0, n).map(function (w) { return [w[0], w[1]]; });
    body.appendChild(el("p", "hint", "В этой игре слова из прошлых уроков" + (hard.length ? ", особенно те, что были трудными 💪" : "")));
    if (t.mode === "match") return buildMatch({ pairs: picked }, ti, body);
    return buildWordfall(Object.assign({}, t, { words: picked, count: picked.length, _vocab: true }), ti, body);
  }

  /* ---------- Говорение: голосовое учителю ---------- */
  function buildSpeak(t, ti, body) {
    var key = "t" + ti + "_speak", items = (t.items || []).map(function (x) { return typeof x === "string" ? { q: x } : x; });
    var ol = el("ol", "items"); items.forEach(function (it) { ol.appendChild(el("li", "q", md(it.q))); }); body.appendChild(ol);
    if (t.tip) body.appendChild(el("p", "hint", "💡 " + md(t.tip)));
    var box = el("div", "speak"), status = el("div", "msg"), rec = btnEl("🎙 Записать ответ"), audio = document.createElement("audio");
    audio.controls = true; audio.className = "hidden";
    var send = btnEl("✈️ Отправить голосовое", "btn hidden"), tg = btnEl("🎤 Записать голосовое в Telegram", "btn ghost"), done = btnEl(F ? "✅ Я отправила голосовое" : "✅ Я отправил голосовое", "linkbtn");
    [rec, audio, send, tg, done, status].forEach(function (x) { box.appendChild(x); });
    body.appendChild(box);
    function setDone() { S.v[key] = 1; save(); status.className = "msg ok"; status.textContent = "Готово! Голосовое у учителя ✅"; }
    if (S.v[key]) setDone();
    var canRec = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
    if (!canRec) { rec.classList.add("hidden"); status.textContent = "Запиши голосовое прямо в Telegram 👇"; }
    var mr = null, chunks = [], file = null, t0 = 0, tick = null;
    rec.addEventListener("click", function () {
      if (mr && mr.state === "recording") { mr.stop(); return; }
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
        chunks = []; mr = new MediaRecorder(stream);
        mr.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
        mr.onstop = function () {
          stream.getTracks().forEach(function (tr) { tr.stop(); }); clearInterval(tick);
          var type = mr.mimeType || "audio/mp4", ext = /webm/.test(type) ? "webm" : /ogg/.test(type) ? "ogg" : "m4a";
          var blob = new Blob(chunks, { type: type });
          file = new File([blob], (H.student || "student") + "-speaking." + ext, { type: type });
          audio.src = URL.createObjectURL(blob); audio.classList.remove("hidden"); send.classList.remove("hidden");
          rec.textContent = "🎙 Перезаписать"; rec.classList.remove("rec");
          status.className = "msg"; status.textContent = "Послушай запись и отправь её 👇";
        };
        mr.start(); t0 = Date.now(); rec.classList.add("rec"); rec.textContent = "⏹ Стоп · 0:00";
        tick = setInterval(function () {
          var sec = Math.floor((Date.now() - t0) / 1000);
          rec.textContent = "⏹ Стоп · " + Math.floor(sec / 60) + ":" + ("0" + sec % 60).slice(-2);
          if (t.max && sec >= t.max) mr.stop();
        }, 500);
      }).catch(function () {
        status.className = "msg warn"; status.textContent = "Нет доступа к микрофону — запиши голосовое прямо в Telegram 👇"; rec.classList.add("hidden");
      });
    });
    send.addEventListener("click", function () {
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: "Speaking" }).then(setDone, function () {});
      } else {
        var a = document.createElement("a"); a.href = audio.src; a.download = file ? file.name : "speaking.m4a";
        document.body.appendChild(a); a.click(); a.remove();
        status.className = "msg"; status.textContent = "Файл сохранён — прикрепи его в Telegram 📎 и нажми «Я отправил" + (F ? "а" : "") + "»";
      }
    });
    tg.addEventListener("click", function () {
      status.className = "msg"; status.textContent = "Запиши голосовое в чате, отправь и вернись нажать «Я отправил" + (F ? "а" : "") + "» 🙂";
      openTg("");
    });
    done.addEventListener("click", setDone);
    return { speak: true, key: key };
  }

  /* ---------- Награды: коллекция, медаль, грамота ---------- */
  function medalFor(p) { return p >= 90 ? { e: "🥇", n: "золото", s: "EXCELLENT" } : p >= 70 ? { e: "🥈", n: "серебро", s: "GREAT JOB" } : p >= 40 ? { e: "🥉", n: "бронза", s: "GOOD EFFORT" } : null; }
  function award(pct) {
    var m = medalFor(pct); if (!m) return null;
    var col = sget("collection", []), id = plain(H.id || H.title), rank = { "🥉": 1, "🥈": 2, "🥇": 3 };
    var ex = col.filter(function (c) { return c.id === id; })[0];
    if (ex) {
      if (rank[m.e] > rank[ex.medal]) { ex.medal = m.e; ex.pct = pct; sset("collection", col); return { item: ex, medal: m, upgrade: true }; }
      return null;
    }
    var cs = COLLECT[H.theme] || COLLECT.pink;
    var rec = { id: id, title: plain(H.title), date: new Date().toLocaleDateString("ru-RU"), medal: m.e, pct: pct, item: cs.items[col.length % cs.items.length] };
    col.push(rec); sset("collection", col);
    return { item: rec, medal: m, isNew: true };
  }
  function drawColl() {
    if (!collBox) return;
    var cs = COLLECT[H.theme] || COLLECT.pink, col = sget("collection", []), n = cs.items.length;
    var season = col.length ? Math.floor((col.length - 1) / n) : 0, cur = col.slice(season * n, season * n + n);
    collBox.innerHTML = "<h3 class='colh'>" + esc(cs.name) + (season ? " · сезон " + (season + 1) : "") + "</h3>" +
      "<p class='instr'>За каждое отправленное ДЗ — новый предмет и медаль: 🥇 от 90%, 🥈 от 70%, 🥉 от 40%. Собрано: <b>" + cur.length + " из " + n + "</b></p>";
    var bar = el("div", "pbar", "<i style='width:" + Math.round(cur.length / n * 100) + "%'></i>"); collBox.appendChild(bar);
    var g = el("div", "cgrid");
    for (var i = 0; i < n; i++) {
      var c = cur[i], s2 = el("div", "cslot" + (c ? " got" : ""), c ? "<div class='ci'>" + c.item + "</div><div class='cm'>" + c.medal + "</div><div class='ct'>" + esc(c.title) + "</div>" : "<div class='ci'>" + (i === cur.length ? "❔" : "🔒") + "</div>");
      if (c) (function (c) { s2.addEventListener("click", function () { showCert(c); }); })(c);
      g.appendChild(s2);
    }
    collBox.appendChild(g);
    if (cur.length === n) collBox.appendChild(el("p", "instr", "👑 Коллекция собрана полностью! Следующее ДЗ откроет новый сезон."));
    collBox.appendChild(el("p", "small", "Нажми на предмет, чтобы открыть грамоту. Коллекция хранится на этом телефоне."));
  }
  function showCert(c) {
    var m = medalFor(c.pct) || { s: "WELL DONE" };
    var ov = el("div", "cele certov"), wrap = el("div", "certwrap"), card = el("div", "cert");
    card.innerHTML = "<div class='cframe'><div class='ctop'>" + (T.decor.slice(0, 3).join(" ") || "✦ ✦ ✦") + "</div>" +
      "<div class='ch'>ГРАМОТА</div><div class='csub'>Certificate of Achievement</div><div class='cfor'>награждается</div>" +
      "<div class='cname'>" + esc(H.student || "") + "</div><div class='cwhat'>за выполнение домашнего задания<br><b>«" + esc(c.title) + "»</b></div>" +
      "<div class='cmed'>" + c.medal + "</div><div class='cres'>Результат: " + c.pct + "%</div>" +
      "<div class='cfoot'><span>" + esc(c.date) + "</span><span class='csign'>" + esc(H.teacherSign || "English teacher") + "</span></div>" +
      "<div class='cstamp'><b>" + c.item + "</b>" + m.s + "</div></div>";
    var close = btnEl("Закрыть");
    wrap.appendChild(card); wrap.appendChild(el("div", "ctip", "📸 Сделай скриншот, чтобы сохранить грамоту")); wrap.appendChild(close);
    ov.appendChild(wrap); document.body.appendChild(ov);
    close.addEventListener("click", function () { ov.remove(); });
  }
  function rewardModal(res, proceed, goText) {
    var cs = COLLECT[H.theme] || COLLECT.pink, ov = el("div", "cele"), box = el("div", "cbox");
    box.innerHTML = "<div class='rtitle'>" + (res.isNew ? "🎁 Новая награда!" : "⬆️ Медаль улучшена!") + "</div>" +
      "<div class='bigitem'>" + res.item.item + "</div><div class='medalrow'>" + res.medal.e + " " + res.medal.n + "</div>" +
      "<div class='small'>" + esc(cs.name) + " · вкладка 🏆</div>";
    var cert = btnEl("📜 Моя грамота", "btn ghost"), go = btnEl(goText || "✈️ Отправить отчёт"), btns = el("div", "btns");
    btns.appendChild(cert); btns.appendChild(go); box.appendChild(btns); ov.appendChild(box); document.body.appendChild(ov);
    cert.addEventListener("click", function () { showCert(res.item); });
    go.addEventListener("click", function () { ov.remove(); proceed(); });
  }

  /* ---------- Прогресс по ДЗ ---------- */
  function updateProgress() {
    var n = 0, d = 0;
    H.tasks.forEach(function (t, ti) {
      var a = apis[ti]; if (!a || a.skip) return; n++;
      if (a.game ? S.game[ti] : a.speak ? S.v[a.key] : S.checks[ti]) d++;
    });
    progEl.innerHTML = "<div class='ptxt'>Прогресс: <b>" + d + " из " + n + "</b> " + (d === n && n ? "— можно отправлять! 💌" : "") + "</div><div class='pbar'><i style='width:" + (n ? Math.round(d / n * 100) : 0) + "%'></i></div>";
  }

  /* ---------- Кто хочет стать миллионером ---------- */
  function buildMillionaire(t, ti, body) {
    var items = t.items || [], N = items.length;
    var base = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
    var prizes = t.prizes || base.slice(Math.max(0, base.length - N));
    var fmt = function (n) { return n.toLocaleString("ru-RU"); };
    var info = el("div", "finfo", lastResult(ti) || (N + " вопросов. Ошибка — конец игры. Подсказка 50:50 — один раз!"));
    var box = el("div", "mil"), start = btnEl("💰 Начать игру");
    box.innerHTML = "<div class='mhead'>💰 Кто хочет стать миллионером?</div><div class='mladder'></div><div class='mq'><div class='q'>Готов" + (F ? "а" : "") + " сыграть?</div></div><div class='mopts'></div><div class='mlife'></div><div class='mmsg'></div>";
    body.appendChild(info); body.appendChild(box); body.appendChild(start);
    var ladder = box.querySelector(".mladder"), qb = box.querySelector(".mq"), ob = box.querySelector(".mopts"), life = box.querySelector(".mlife"), msg = box.querySelector(".mmsg");
    function drawLadder(cur) {
      ladder.innerHTML = prizes.map(function (p, i) { return "<span class='" + (i < cur ? "done" : i === cur ? "cur" : "") + "'>" + fmt(p) + "</span>"; }).join("");
      var c = ladder.querySelector(".cur"); if (c) ladder.scrollLeft = c.offsetLeft - 80;
    }
    drawLadder(-1);
    start.addEventListener("click", function () {
      start.classList.add("hidden"); var i = 0, used = false, missed = [];
      msg.textContent = "";
      function ask() {
        if (i >= N) return end(true);
        drawLadder(i);
        var it = mix(items[i]), ai = idxOf(it), L = ["A", "B", "C", "D"];
        qb.innerHTML = "<div class='mqn'>Вопрос " + (i + 1) + " · на " + fmt(prizes[i]) + "</div><div class='q'>" + md(it.q) + "</div>";
        ob.innerHTML = ""; life.innerHTML = ""; msg.textContent = "";
        var bs = it.o.map(function (o, oi) {
          var b = btnEl("<b>" + L[oi] + ":</b> " + md(o), "mopt"); ob.appendChild(b);
          b.addEventListener("click", function () {
            lock(ob); lb.disabled = true; b.classList.add("final"); msg.textContent = "Это ваш окончательный ответ? …";
            setTimeout(function () {
              b.classList.remove("final");
              if (oi === ai) { b.classList.add("right"); msg.textContent = "Верно! 🎉 " + fmt(prizes[i]); i++; setTimeout(ask, 1300); }
              else {
                b.classList.add("wrong"); bs[ai].classList.add("right");
                missed.push({ q: plain(it.q), ans: plain(o), right: plain(it.o[ai]), o: it.o.map(plain) });
                setTimeout(function () { end(false); }, 1600);
              }
            }, 1100);
          });
          return b;
        });
        var lb = btnEl("50:50", "lifeb" + (used ? " usedl" : "")); life.appendChild(lb); lb.disabled = used;
        lb.addEventListener("click", function () {
          if (used) return; used = true; lb.classList.add("usedl"); lb.disabled = true;
          var wrong = it.o.map(function (_, k) { return k; }).filter(function (k) { return k !== ai; });
          shuffle(wrong, Date.now() % 97).slice(0, Math.max(0, wrong.length - 1)).forEach(function (k) { bs[k].classList.add("gone"); bs[k].disabled = true; });
        });
      }
      function end(win) {
        drawLadder(i); ob.innerHTML = ""; life.innerHTML = "";
        qb.innerHTML = "<div class='q mend'>" + (win ? "🏆 Миллион! Ты ответил" + (F ? "а" : "") + " на все вопросы!" : "Игра окончена. Твой выигрыш: <b>" + (i ? fmt(prizes[i - 1]) : "0") + "</b>") + "</div>";
        msg.textContent = win ? "" : "Попробуй ещё раз — вопросы те же 💪";
        start.textContent = "↺ Играть снова"; start.classList.remove("hidden");
        gameDone(ti, i, N, missed); info.innerHTML = lastResult(ti);
      }
      ask();
    });
    return { game: true, N: N };
  }

  /* ---------- Мемори ---------- */
  function buildMemory(t, ti, body) {
    var src = t.pairs || H.words || [];
    var pairs = src.slice(0, t.count || 8).map(function (p) { return Array.isArray(p) ? [plain(p[0]), plain(p[1])] : [plain(p.en), plain(p.ru)]; });
    var N = pairs.length;
    var info = el("div", "finfo", lastResult(ti) || "Открывай по две карточки и ищи пары «слово — перевод»" + (t.time ? ". Время: " + t.time + " сек!" : "!"));
    var stats = el("div", "mstats"), grid = el("div", "memgrid"), start = btnEl("🃏 Начать");
    body.appendChild(info); body.appendChild(stats); body.appendChild(grid); body.appendChild(start);
    var back = (T.decor && T.decor[0]) || "❓";
    start.addEventListener("click", function () {
      start.classList.add("hidden");
      var cards = [], found = 0, moves = 0, open = [], busy = false, t0 = Date.now(), timer;
      pairs.forEach(function (p, k) { cards.push({ k: k, txt: p[0], en: true }); cards.push({ k: k, txt: p[1] }); });
      cards = shuffle(cards, Date.now() % 9999); grid.innerHTML = "";
      function tm() { var s = Math.floor((Date.now() - t0) / 1000); return Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2); }
      function upd() { stats.innerHTML = "Пары: <b>" + found + "/" + N + "</b> · Ходы: <b>" + moves + "</b> · ⏱ " + tm(); }
      timer = setInterval(function () {
        upd();
        if (t.time && (Date.now() - t0) / 1000 >= t.time) finish(false);
      }, 500); upd();
      cards.forEach(function (c) {
        var b = btnEl("<span class='mb'>" + back + "</span><span class='mf'>" + esc(c.txt) + "</span>", "mcard" + (c.en ? " en" : ""));
        c.b = b; grid.appendChild(b);
        b.addEventListener("click", function () {
          if (busy || c.done || open.indexOf(c) >= 0) return;
          b.classList.add("open"); open.push(c);
          if (open.length < 2) return;
          moves++; var a = open[0], d = open[1];
          if (a.k === d.k && a.en !== d.en) {
            a.done = d.done = true; found++; open = [];
            setTimeout(function () { a.b.classList.add("matched"); d.b.classList.add("matched"); }, 250);
            if (found === N) setTimeout(function () { finish(true); }, 500);
          } else {
            busy = true;
            setTimeout(function () { a.b.classList.remove("open"); d.b.classList.remove("open"); open = []; busy = false; }, 900);
          }
          upd();
        });
      });
      function finish(all) {
        clearInterval(timer); upd(); Array.prototype.forEach.call(grid.children, function (x) { x.disabled = true; });
        var missed = pairs.filter(function (p, k) { return !cards.some(function (c) { return c.k === k && c.done; }); }).map(function (p) { return { q: p[0], ans: "", right: p[1] }; });
        stats.innerHTML += all ? " · 🎉 Все пары найдены!" : " · ⏰ Время вышло!";
        start.textContent = "↺ Ещё раз"; start.classList.remove("hidden");
        gameDone(ti, found, N, missed, "время " + tm() + ", ходов " + moves); info.innerHTML = lastResult(ti);
      }
    });
    return { game: true, N: N };
  }

  /* ---------- Escape Room ---------- */
  function buildEscape(t, ti, body) {
    var rooms = t.rooms || [], N = rooms.length;
    var info = el("div", "finfo", lastResult(ti) || ("Ты заперт" + (F ? "а" : "") + " в квест-комнате! " + N + " дверей — каждая откроется только после правильного ответа."));
    var box = el("div", "esc"), start = btnEl("🔐 Войти в комнату");
    box.innerHTML = "<div class='ehead'>🔐 ESCAPE ROOM</div>" + (t.story ? "<div class='estory'>" + md(t.story) + "</div>" : "") +
      "<div class='edoors'></div><div class='escene'><div class='edoor'>🚪</div><div class='elock'>🔒</div></div><div class='eq'></div><div class='emsg'></div>";
    body.appendChild(info); body.appendChild(box); body.appendChild(start);
    var doors = box.querySelector(".edoors"), door = box.querySelector(".edoor"), lockI = box.querySelector(".elock"), qb = box.querySelector(".eq"), msg = box.querySelector(".emsg");
    function drawDoors(k) { doors.innerHTML = rooms.map(function (_, i) { return "<span class='" + (i < k ? "open" : i === k ? "cur" : "") + "'>" + (i < k ? "🔓" : "🔒") + "</span>"; }).join(""); }
    drawDoors(0);
    start.addEventListener("click", function () {
      start.classList.add("hidden"); var i = 0, sc = 0, missed = [], t0 = Date.now();
      function room() {
        if (i >= N) return out();
        drawDoors(i); door.className = "edoor"; lockI.textContent = "🔒"; msg.textContent = "";
        var r = mix(rooms[i]), first = true;
        qb.innerHTML = "<div class='eqn'>Комната " + (i + 1) + " из " + N + "</div><div class='q'>" + md(r.q) + "</div>";
        function ok() {
          if (first) sc++; lockI.textContent = "🔓"; door.classList.add("opening");
          msg.className = "emsg ok"; msg.textContent = pick(["Верно! Дверь открыта ➡️", "Щёлк! Замок открыт 🔑", "Отлично, идём дальше ➡️"]);
          i++; setTimeout(room, 1400);
        }
        function bad(ans, right, o) {
          if (first) { first = false; missed.push({ q: plain(r.q), ans: ans, right: right, o: o }); }
          box.classList.add("shake"); setTimeout(function () { box.classList.remove("shake"); }, 400);
          msg.className = "emsg bad"; msg.textContent = "Неверно — дверь заперта 🔒 " + (r.hint ? "Подсказка: " + plain(r.hint) : "Попробуй ещё");
        }
        if (r.o) {
          var ai = idxOf(r), og = el("div", "fopts"); qb.appendChild(og);
          r.o.forEach(function (o, oi) {
            var b = btnEl(md(o), "opt"); og.appendChild(b);
            b.addEventListener("click", function () {
              if (oi === ai) { lock(og); b.classList.add("right"); ok(); }
              else { b.disabled = true; b.classList.add("wrong"); bad(plain(o), plain(r.o[ai]), r.o.map(plain)); }
            });
          });
        } else {
          var row = el("div", "shin"), inp = mkInput("_tmp", 12), go = btnEl("🔑 Открыть");
          inp.value = ""; inp.placeholder = "код-ответ"; row.appendChild(inp); row.appendChild(go); qb.appendChild(row);
          var sub = function () {
            var v = inp.value.trim(); if (!v) return;
            if (isRight(v, [].concat(r.a))) { lock(row); ok(); } else { bad(v, [].concat(r.a)[0]); inp.select(); }
          };
          go.addEventListener("click", sub); inp.addEventListener("keydown", function (e) { if (e.key === "Enter") sub(); });
        }
      }
      function out() {
        drawDoors(N); var s = Math.floor((Date.now() - t0) / 1000), tm = Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2);
        door.className = "edoor"; door.textContent = "🌅"; lockI.textContent = "";
        qb.innerHTML = "<div class='q mend'>🎉 Ты выбрал" + (F ? "ась" : "ся") + "! Время: " + tm + "<br>С первой попытки: " + sc + "/" + N + "</div>";
        msg.textContent = ""; start.textContent = "↺ Пройти заново"; start.classList.remove("hidden");
        gameDone(ti, sc, N, missed, "время " + tm); info.innerHTML = lastResult(ti);
        setTimeout(function () { door.textContent = "🚪"; }, 4000);
      }
      room();
    });
    return { game: true, N: N };
  }

  /* ---------- Квест-симулятор (как «Аэропорт») ---------- */
  function buildQuest(t, ti, body) {
    var scenes = t.scenes || [], N = scenes.length, byId = {};
    scenes.forEach(function (s, k) { byId[s.id || ("s" + k)] = k; });
    var info = el("div", "finfo", lastResult(ti) || "Выбирай реплики — от них зависит концовка!");
    var box = el("div", "quest"), start = btnEl("▶ " + (t.startText || "Начать квест"));
    box.innerHTML = "<div class='qhead'><i></i><i></i><i></i><span class='qplace'>" + esc(t.place || "Квест") + "</span></div><div class='qbody'>" +
      (t.intro ? "<div class='qintro'>" + md(t.intro) + "</div>" : "<div class='qintro'>🧳</div>") + "</div>";
    body.appendChild(info); body.appendChild(box); body.appendChild(start);
    var place = box.querySelector(".qplace"), qbody = box.querySelector(".qbody");
    start.addEventListener("click", function () {
      start.classList.add("hidden"); var k = 0, steps = 0, mistakes = 0, sc = 0, missed = [];
      function scene() {
        if (k == null || k >= N) return ending();
        var s = scenes[k]; steps++;
        place.textContent = (s.place || t.place || "Квест") + " · шаг " + steps;
        qbody.innerHTML = (s.scene ? "<div class='qscene'>" + md(s.scene) + "</div>" : "") +
          "<div class='qline'>" + (s.who ? "<b>" + esc(s.who) + ":</b> " : "") + md(s.say || "") + "</div>";
        var og = el("div", "qopts"), fb = el("div", "qfb"), first = true; qbody.appendChild(og); qbody.appendChild(fb);
        shuffle(s.choices || [], k * 13 + ti + 3).forEach(function (c) {
          var b = btnEl(md(c.t), "qopt"); og.appendChild(b);
          b.addEventListener("click", function () {
            if (c.ok) {
              lock(og); b.classList.add("right"); if (first) sc++;
              var go = function () { k = c.next != null ? byId[c.next] : k + 1; scene(); };
              if (c.reply) { fb.className = "qfb ok"; fb.innerHTML = (s.who ? "<b>" + esc(s.who) + ":</b> " : "") + md(c.reply); setTimeout(go, 1700); }
              else setTimeout(go, 700);
            } else {
              mistakes++; b.classList.add("wrong"); b.disabled = true;
              if (first) { first = false; var r = (s.choices || []).filter(function (x) { return x.ok; })[0]; missed.push({ q: plain((s.who ? s.who + ": " : "") + (s.say || "")), ans: plain(c.t), right: r ? plain(r.t) : "", o: (s.choices || []).map(function (x) { return plain(x.t); }) }); }
              fb.className = "qfb bad"; fb.innerHTML = md(c.fb || "Ошибка! Попробуй другую реплику.");
              if (c.next != null) { lock(og); setTimeout(function () { k = byId[c.next]; scene(); }, 1800); }
            }
          });
        });
      }
      function ending() {
        var ends = (t.endings || []).slice().sort(function (a, b) { return (a.max == null ? 99 : a.max) - (b.max == null ? 99 : b.max); });
        var e = ends.filter(function (x) { return x.max == null || mistakes <= x.max; })[0] || { emoji: "🏁", text: "Квест пройден!" };
        place.textContent = (t.place || "Квест") + " · финал";
        qbody.innerHTML = "<div class='qend'><div class='qee'>" + esc(e.emoji || "🏁") + "</div>" + md(e.text) + "<div class='small'>Ошибок: " + mistakes + "</div></div>";
        start.textContent = "↺ Пройти заново"; start.classList.remove("hidden");
        gameDone(ti, sc, steps, missed, "ошибок " + mistakes); info.innerHTML = lastResult(ti);
      }
      scene();
    });
    return { game: true, N: N };
  }

  var BUILDERS = { gaps: buildGaps, bank: buildGaps, rewrite: buildRewrite, choice: buildChoice, match: buildMatch, order: buildOrder, write: buildWrite, wordfall: buildWordfall,
    race: buildRace, millionaire: buildMillionaire, memory: buildMemory, escape: buildEscape, quest: buildQuest, mistakes: buildMistakes, vocab: buildVocab, speak: buildSpeak, chat: buildChat, spot: buildSpot, detective: buildDetective, feed: buildFeed, exam: buildExam };

  /* ---------- Карточка задания ---------- */
  function buildTask(t, ti) {
    var c = el("section", "card pat" + (T.plain ? 0 : ti % 4)), inner = el("div", "inner");
    c.id = "task-" + ti; c.appendChild(inner);
    inner.appendChild(el("h2", "", '<span class="num">' + (ti + 1) + "</span><span>" + md(t.title || "") + "</span>"));
    if (t.instruction) inner.appendChild(el("p", "instr", md(t.instruction)));
    if (t.rule != null && H.rules) {
      var rb = el("button", "rulebtn", "💡 Подсказка"); rb.type = "button";
      rb.addEventListener("click", function () { openRule(t.rule, ti); });
      inner.appendChild(rb);
    }
    var body = el("div", "body"); inner.appendChild(body);
    var api = (BUILDERS[t.type] || buildGaps)(t, ti, body);
    apis[ti] = api;
    if (api.game || api.speak || api.skip) return c;

    var foot = el("div", "foot"), btn = el("button", "btn", "Проверить ✨"), msg = el("div", "msg");
    btn.type = "button"; foot.appendChild(btn); foot.appendChild(msg); inner.appendChild(foot);
    btn.addEventListener("click", function () {
      var det = api.evaluate(), filled = det.filter(function (d) { return d.st !== "empty"; }).length;
      if (!filled) { msg.className = "msg warn"; msg.textContent = P.doFirst(); return; }
      S.checks[ti] = (S.checks[ti] || 0) + 1; save();
      api.paint(det);
      if (api.written) { msg.className = "msg ok"; msg.textContent = "Ответы сохранены — их проверит учитель 💌"; return; }
      var ok = det.filter(function (d) { return d.st === "ok"; }).length, empty = det.length - filled;
      msg.className = "msg " + (ok === det.length ? "ok" : "mid");
      msg.innerHTML = "<b>" + ok + "/" + det.length + "</b> · " + (ok === det.length ? P.great() : (empty ? P.empties() : P.fix())) +
        (t.tip && ok < det.length ? '<div class="tip">💡 ' + md(t.tip) + "</div>" : "");
      maybeCelebrate();
    });
    return c;
  }

  /* ---------- Итог и отчёт ---------- */
  function allCorrect() {
    var any = false;
    for (var i = 0; i < H.tasks.length; i++) {
      var a = apis[i]; if (!a || a.written || a.speak || a.skip) continue;
      any = true;
      if (a.game) { var g = S.game[i]; if (!g || g.score < g.total) return false; continue; }
      if (a.evaluate().some(function (d) { return d.st !== "ok"; })) return false;
    }
    return any;
  }
  function maybeCelebrate() { if (!celebratedOnce && allCorrect()) { celebratedOnce = true; setTimeout(celebrate, 400); } }

  function buildReport() {
    var tot = 0, ok = 0, lines = [], errs = [], writes = [];
    H.tasks.forEach(function (t, ti) {
      var a = apis[ti], name = (ti + 1) + ". " + plain(t.title || "");
      if (a.skip) return;
      if (a.speak) { lines.push(name + ": " + (S.v[a.key] ? "🎙 голосовое отправлено ✅" : "🎙 голосовое не записано")); return; }
      if (a.written) {
        a.evaluate().forEach(function (d) { writes.push("• " + d.q + "\n" + (d.ans || "— (не написано)")); });
        return;
      }
      if (a.game) {
        var g = S.game[ti]; tot += a.N;
        if (!g) { lines.push(name + ": не сыграна"); errs.push("— " + name + ": игра не сыграна"); return; }
        ok += Math.round(g.score * a.N / g.total);
        lines.push(name + ": " + g.score + "/" + g.total + " (игр: " + g.plays + (g.extra ? ", " + g.extra : "") + ")");
        if (g.missed.length) { errs.push("— " + name); g.missed.forEach(function (m) { errs.push("• " + m.q + " → " + (m.ans ? "«" + m.ans + "»" : (F ? "не успела" : "не успел")) + " → правильно: " + m.right); }); }
        return;
      }
      var det = a.evaluate(), c = det.filter(function (d) { return d.st === "ok"; }).length;
      tot += det.length; ok += c;
      lines.push(name + ": " + c + "/" + det.length + " (проверок: " + (S.checks[ti] || 0) + ")");
      var bad = det.filter(function (d) { return d.st !== "ok"; });
      if (bad.length) {
        errs.push("— " + name);
        bad.forEach(function (d) { errs.push("• " + d.q + " → " + (d.st === "empty" ? "пропущено" : "«" + d.ans + "»") + " → правильно: " + plain(d.right)); });
      }
    });
    var pct = tot ? Math.round(ok * 100 / tot) : 0; lastPct = pct;
    var out = H.student + " — HW " + plain(H.title) + "\nИтого: " + ok + "/" + tot + " (" + pct + "%)\n\n" + lines.join("\n");
    out += "\n\n❌ Ошибки и пропуски\n" + (errs.length ? errs.join("\n") : "нет 🎉");
    if (writes.length) out += "\n\n✍️ Письменные ответы\n" + writes.join("\n\n");
    return out;
  }

  function openTg(text) {
    var u = "https://t.me/" + String(H.telegram || "").replace(/^@/, "");
    if (text) { var e = encodeURIComponent(text); if (e.length < 6000) u += "?text=" + e; }
    var w = null; try { w = window.open(u, "_blank"); } catch (err) {}
    if (!w) location.href = u;
  }
  function copyText(s) {
    try { if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(s).then(function () { return true; }, fallback); } catch (e) {}
    return Promise.resolve(fallback());
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = s; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); var ok = false; try { ok = document.execCommand("copy"); } catch (e) {} ta.remove(); return ok;
    }
  }

  function buildSend() {
    var c = el("section", "card send pat" + (T.plain ? 0 : 1)), inner = el("div", "inner"); c.appendChild(inner);
    var who = H.teacher ? "<b>именно " + esc(H.teacher) + "</b>" : "<b>именно своему учителю</b>";
    inner.appendChild(el("h2", "", "<span>💌 Отправить результат</span>"));
    inner.appendChild(el("p", "", "Когда всё сделаешь — нажми кнопку и отправь отчёт " + who + " в Telegram."));
    var btns = el("div", "btns"), tg = el("button", "btn", "✈️ Отправить в Telegram"), cp = el("button", "btn ghost", "📋 Скопировать отчёт"), see = el("button", "btn ghost", "👀 Посмотреть");
    [tg, cp, see].forEach(function (b) { b.type = "button"; btns.appendChild(b); });
    var note = el("div", "msg"), pre = el("pre", "rep hidden");
    inner.appendChild(btns); inner.appendChild(note); inner.appendChild(pre);
    function finishHW(proceed, goText) {
      buildReport(); recordMistakes();
      var res = award(lastPct); drawColl();
      if (res) rewardModal(res, proceed, goText); else proceed();
    }
    tg.addEventListener("click", function () { finishHW(doSend); });
    function doSend() {
      var r = buildReport();
      copyText(r);
      note.innerHTML = "Отчёт скопирован ✅ Открывается чат с учителем. Если текст не появился сам — <b>вставь</b> его и отправь.";
      openTg(r);
    }
    cp.addEventListener("click", function () {
      finishHW(function () { copyText(buildReport()); note.textContent = "Скопировано ✅ Вставь в Telegram и отправь " + (H.teacher || "учителю") + "."; }, "📋 Скопировать отчёт");
    });
    see.addEventListener("click", function () { pre.textContent = buildReport(); pre.classList.toggle("hidden"); });
    var small = el("p", "small", "Ответы сохраняются на этом телефоне — можно закрыть страницу и вернуться позже. ");
    var reset = el("button", "linkbtn", "Начать заново"); reset.type = "button";
    reset.addEventListener("click", function () {
      if (confirm("Стереть все ответы и начать заново?")) { S = { v: {}, checks: {}, game: {} }; save(); location.reload(); }
    });
    small.appendChild(reset); inner.appendChild(small);
    return c;
  }

  /* ---------- Слова ---------- */
  function speak(s) {
    try {
      var u = new SpeechSynthesisUtterance(s), vs = speechSynthesis.getVoices();
      u.lang = "en-GB"; u.rate = 0.9;
      var v = vs.filter(function (x) { return /en-GB/i.test(x.lang); })[0] || vs.filter(function (x) { return /^en/i.test(x.lang); })[0];
      if (v) u.voice = v;
      if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  function buildWords() {
    var box = el("div", "words");
    if (H.wordsNote) box.appendChild(el("p", "instr", md(H.wordsNote)));
    if (!window.speechSynthesis) box.appendChild(el("p", "nosound", "🔇 В этом окне звук не работает. Открой ссылку в Chrome или Safari: нажми ⋮ (или значок компаса) → «Открыть в браузере»."));
    H.words.forEach(function (w) {
      var o = Array.isArray(w) ? { en: w[0], ru: w[1], tr: w[2], note: w[3] } : w;
      var c = el("div", "wcard"), b = el("button", "say", "🔊"); b.type = "button"; b.setAttribute("aria-label", "Послушать");
      b.addEventListener("click", function () { speak(plain(o.en)); });
      var txt = el("div", "", '<div class="wen">' + md(o.en) + (o.tr ? ' <span class="tr">' + esc(o.tr) + "</span>" : "") + "</div>" +
        '<div class="wru">' + md(o.ru) + "</div>" + (o.note ? '<div class="wnote">' + md(o.note) + "</div>" : ""));
      c.appendChild(b); c.appendChild(txt); box.appendChild(c);
    });
    return box;
  }

  /* ---------- Подсказка (правила) ---------- */
  var showPane = function () {}, backBar = null;
  function buildRules() {
    var box = el("div", "words");
    if (H.rulesNote) box.appendChild(el("p", "instr", md(H.rulesNote)));
    H.rules.forEach(function (r, i) {
      var c = el("div", "rcard"); c.id = "rule-" + i;
      c.appendChild(el("h3", "", md(r.title || "")));
      if (r.text) c.appendChild(el("div", "rtext", md(r.text)));
      if (r.examples && r.examples.length) {
        var ul = el("ul", "rex"); r.examples.forEach(function (e) { ul.appendChild(el("li", "", md(e))); }); c.appendChild(ul);
      }
      if (r.mistake) c.appendChild(el("div", "rwarn", "⚠️ " + md(r.mistake)));
      box.appendChild(c);
    });
    backBar = el("div", "backbar hidden");
    return { box: box };
  }
  function openRule(idx, ti) {
    showPane("rules");
    var target = document.getElementById("rule-" + [].concat(idx)[0]);
    [].concat(idx).forEach(function (k) { var c = document.getElementById("rule-" + k); if (c) { c.classList.add("flash"); setTimeout(function () { c.classList.remove("flash"); }, 1600); } });
    if (backBar) {
      backBar.innerHTML = ""; var b = el("button", "btn", "← Вернуться к заданию " + (ti + 1)); b.type = "button";
      b.addEventListener("click", function () { showPane("tasks"); backBar.classList.add("hidden"); var c = document.getElementById("task-" + ti); if (c) c.scrollIntoView({ behavior: "smooth", block: "start" }); });
      backBar.appendChild(b); backBar.classList.remove("hidden");
    }
    if (target) setTimeout(function () { target.scrollIntoView({ behavior: "smooth", block: "center" }); }, 50);
  }

  /* ---------- Салют ---------- */
  function celebrate() {
    var cfg = Object.assign({}, CELE[H.theme] || CELE.pink, H.celebrate || {});
    var ov = el("div", "cele"), cv = document.createElement("canvas");
    ov.appendChild(cv);
    var rain = cfg.rain || [];
    for (var i = 0; i < (rain.length ? 26 : 0); i++) {
      var s = el("span", "rain", rain[i % rain.length]);
      s.style.left = Math.random() * 100 + "%"; s.style.animationDuration = (3 + Math.random() * 3) + "s"; s.style.animationDelay = (Math.random() * 2) + "s";
      ov.appendChild(s);
    }
    var box = el("div", "cbox", '<div class="wings">' + esc(cfg.emoji || "🏆") + '</div><div class="ctext">' + md(cfg.text || P.allDone()) + "</div>");
    var close = el("button", "btn", esc(cfg.btn || "Ура! ✨")); close.type = "button"; box.appendChild(close); ov.appendChild(box);
    document.body.appendChild(ov);
    var ctx = cv.getContext("2d"), W, Hh, parts = [], fr = 0, alive = true;
    function rs() { W = cv.width = innerWidth; Hh = cv.height = innerHeight; } rs();
    var cols = cfg.colors || [T.accent, T.accent2, "#ffd700", "#ffffff", "#7cc4ff"];
    var fw = cfg.fx !== "confetti", cf = cfg.fx === "confetti" || cfg.fx === "both";
    function burst() {
      var x = W * (0.15 + Math.random() * 0.7), y = Hh * (0.12 + Math.random() * 0.4), col = cols[Math.floor(Math.random() * cols.length)];
      for (var i = 0; i < 70; i++) { var a = Math.random() * Math.PI * 2, sp = 1 + Math.random() * 4; parts.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, l: 60 + Math.random() * 40, c: col }); }
    }
    function confetti() {
      for (var i = 0; i < 8; i++) parts.push({ x: Math.random() * W, y: -10, vx: (Math.random() - 0.5) * 1.5, vy: 1.5 + Math.random() * 2, l: 400, c: cols[Math.floor(Math.random() * cols.length)], r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, rect: true });
    }
    (function loop() {
      if (!alive) return;
      if (fw && fr % 22 === 0 && fr < 260) burst();
      if (cf && fr < 220) confetti();
      fr++;
      ctx.clearRect(0, 0, W, Hh);
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i];
        if (p.rect) {
          p.x += p.vx + Math.sin((fr + i) / 15); p.y += p.vy; p.r += p.vr; p.l--;
          if (p.y > Hh + 20 || p.l <= 0) { parts.splice(i, 1); continue; }
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-4, -7, 8, 14); ctx.restore();
          continue;
        }
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.vx *= 0.99; p.l--;
        if (p.l <= 0) { parts.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, p.l / 100); ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, 2.6, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (fr < 260 || parts.length) requestAnimationFrame(loop);
    })();
    close.addEventListener("click", function () { alive = false; ov.remove(); });
  }

  /* ---------- Стили ---------- */
  function injectCSS() {
    var css = ":root{--bg:" + T.bg + ";--text:" + T.text + ";--accent:" + T.accent + ";--accent2:" + T.accent2 + ";--soft:" + T.soft + "}" + [
      "*{box-sizing:border-box}",
      "body{margin:0;background:var(--bg);color:var(--text);font:17px/1.5 -apple-system,BlinkMacSystemFont,'SF Pro Rounded','Nunito','Segoe UI',Roboto,sans-serif;-webkit-text-size-adjust:100%}",
      ".decor-layer{position:fixed;top:0;right:0;bottom:0;left:0;pointer-events:none;z-index:0;overflow:hidden}",
      ".decor-layer span{position:absolute;font-size:26px;opacity:.2;animation:flo 9s ease-in-out infinite}",
      "@keyframes flo{50%{transform:translateY(-16px) rotate(10deg)}}",
      ".wrap{position:relative;z-index:1;max-width:760px;margin:0 auto;padding:12px 12px 60px}",
      "header.top{text-align:center;padding:16px 8px 4px}",
      ".deco{font-size:28px;letter-spacing:6px}",
      "h1{margin:6px 0 4px;font-size:26px;line-height:1.2;color:var(--accent)}",
      ".hello{font-size:17px;opacity:.85;margin:4px 0}",
      ".intro{background:rgba(255,255,255,.85);border-radius:16px;padding:12px 14px;margin:10px 0;border:2px dashed var(--accent2)}",
      ".tabs{position:sticky;top:0;z-index:5;display:flex;gap:8px;justify-content:center;padding:10px 0 14px;margin:0 -12px;background:linear-gradient(var(--bg) 75%,rgba(255,255,255,0))}",
      ".tab{border:2px solid var(--accent2);background:#fff;color:var(--text);border-radius:999px;padding:8px 18px;font:inherit;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,.06)}",
      ".tab.on{background:var(--accent);border-color:var(--accent);color:#fff}",
      ".card{border-radius:22px;margin:16px 0;padding:10px;background:var(--soft);box-shadow:0 6px 20px rgba(0,0,0,.06)}",
      ".pat1{background:radial-gradient(circle,var(--accent2) 1.3px,transparent 2px) 0 0/16px 16px,radial-gradient(circle,#fff 1.2px,transparent 1.8px) 8px 8px/16px 16px,var(--soft)}",
      ".pat2{background-color:var(--soft);background-image:linear-gradient(var(--accent2) 1px,transparent 1px),linear-gradient(90deg,var(--accent2) 1px,transparent 1px);background-size:20px 20px}",
      ".pat3{background:radial-gradient(circle at 20% 30%,#fff 0 2px,transparent 3px) 0 0/60px 60px,radial-gradient(circle at 70% 60%,var(--accent2) 0 2.5px,transparent 3.5px) 0 0/80px 80px,radial-gradient(circle at 40% 80%,#fff 0 1.5px,transparent 2.5px) 0 0/46px 46px,linear-gradient(135deg,var(--soft),var(--accent2))}",
      ".inner{background:rgba(255,255,255,.93);border-radius:16px;padding:16px 14px}",
      "h2{font-size:20px;line-height:1.3;margin:0 0 6px;display:flex;align-items:center;gap:10px}",
      ".num{display:inline-grid;place-items:center;flex:none;width:32px;height:32px;border-radius:50%;background:var(--accent);color:#fff;font-size:16px}",
      ".instr{margin:0 0 10px;opacity:.85}",
      "ol.items{padding-left:24px;margin:0}",
      "ol.items>li{margin:14px 0;line-height:2.2}",
      ".q{line-height:1.5;margin-bottom:6px}",
      ".hint{font-size:15px;opacity:.7;line-height:1.4;margin-bottom:6px}",
      "input.gap{font:inherit;font-size:17px;padding:2px 8px;border:2px solid transparent;border-bottom-color:var(--accent2);background:var(--soft);border-radius:8px;color:var(--text);max-width:100%;line-height:1.5}",
      "input.gap:focus,textarea:focus,select:focus{outline:none;border-color:var(--accent)}",
      ".gw{display:inline}",
      ".gw.wide{display:block}",
      "textarea,select{width:100%;font:inherit;font-size:17px;line-height:1.4;padding:8px 10px;border:2px solid var(--accent2);border-radius:12px;background:#fff;color:var(--text)}",
      ".gw.ok input,.gw.ok textarea,.gw.ok select{border-color:#22c55e;background:#ecfdf3}",
      ".gw.bad input,.gw.bad textarea,.gw.bad select{border-color:#ef4444;background:#fef2f2}",
      ".gw.empty input,.gw.empty textarea,.gw.empty select{border-color:#f59e0b;border-style:dashed}",
      ".fb{font-size:14px;line-height:1.3}",
      ".gw:not(.wide) .fb:not(:empty){margin:0 6px 0 4px}",
      ".gw.bad .fb{color:#15803d;font-weight:700}",
      ".gw.empty .fb,li.empty .fb{color:#b45309}",
      ".gw.ok .fb{color:#15803d}",
      ".btn{appearance:none;-webkit-appearance:none;border:none;border-radius:999px;padding:12px 22px;font:inherit;font-weight:800;color:#fff;background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 4px 14px rgba(0,0,0,.14),inset 0 1px 0 rgba(255,255,255,.6);position:relative;overflow:hidden;cursor:pointer}",
      ".btn::after{content:'';position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent);transform:skewX(-20deg);animation:shine 3.5s infinite}",
      "@keyframes shine{0%{left:-60%}60%,100%{left:130%}}",
      ".btn.ghost{background:#fff;color:var(--accent);border:2px solid var(--accent2)}",
      ".foot{margin-top:12px;display:flex;flex-wrap:wrap;align-items:center;gap:10px}",
      ".msg{flex:1 1 200px;font-size:15px;line-height:1.4}",
      ".msg.ok{color:#15803d}.msg.warn{color:#b45309}",
      ".tip{margin-top:4px}",
      ".bank{display:flex;flex-wrap:wrap;gap:8px;padding:10px;border:2px dashed var(--accent2);border-radius:14px;margin-bottom:6px;background:#fff}",
      ".chip{font:inherit;font-size:16px;line-height:1.3;padding:6px 12px;border-radius:999px;border:2px solid var(--accent2);background:#fff;color:var(--text);cursor:pointer}",
      ".chip.used{opacity:.35;text-decoration:line-through}",
      ".chip.in{background:var(--soft);border-color:var(--accent)}",
      ".shake{animation:sh .35s}@keyframes sh{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}",
      ".opts{display:flex;flex-wrap:wrap;gap:8px;line-height:1.3;margin-bottom:4px}",
      ".opt{font:inherit;font-size:16px;line-height:1.3;padding:9px 14px;border-radius:14px;border:2px solid var(--accent2);background:#fff;color:var(--text);cursor:pointer}",
      ".opt.on{background:var(--accent);color:#fff;border-color:var(--accent)}",
      ".opt.right{border-color:#22c55e;box-shadow:inset 0 0 0 2px #22c55e}.opt.on.right,.fopts .opt.right{background:#22c55e;color:#fff}",
      ".opt.wrong{background:#ef4444;border-color:#ef4444;color:#fff}",
      ".built,.pool{display:flex;flex-wrap:wrap;gap:6px;min-height:46px;padding:6px;border-radius:12px;line-height:1.3}",
      ".built{background:#fff;border:2px solid var(--accent2);margin-bottom:4px}",
      ".gw.ok .built{border-color:#22c55e;background:#ecfdf3}.gw.bad .built{border-color:#ef4444;background:#fef2f2}.gw.empty .built{border-color:#f59e0b;border-style:dashed}",
      ".ph{opacity:.5;font-size:14px;align-self:center;padding-left:4px}",
      ".mrow{display:grid;grid-template-columns:1fr 1.3fr;gap:10px;align-items:center;margin:10px 0}",
      ".ml{font-weight:700}",
      ".fall{position:relative;height:300px;border-radius:16px;background:linear-gradient(#fff,var(--soft));overflow:hidden;border:2px solid var(--accent2);margin:8px 0}",
      ".fw{position:absolute;top:0;max-width:92%;overflow:hidden;text-overflow:ellipsis;padding:7px 16px;border-radius:999px;background:var(--accent);color:#fff;font-weight:800;font-size:18px;white-space:nowrap;box-shadow:0 4px 10px rgba(0,0,0,.15)}",
      ".fw.hit{background:#22c55e}.fw.miss{background:#ef4444}",
      ".fopts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}",
      ".fres{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;font-size:42px;font-weight:800;color:var(--accent)}",
      ".finfo{font-size:15px;opacity:.85}",
      ".words{display:grid;gap:10px}",
      ".wcard{display:flex;gap:12px;align-items:flex-start;background:#fff;border-radius:16px;padding:12px;border:2px solid var(--accent2)}",
      ".say{font-size:22px;border:none;background:var(--soft);border-radius:50%;width:46px;height:46px;flex:none;cursor:pointer}",
      ".wen{font-weight:800;font-size:18px}.tr{font-weight:400;opacity:.6;font-size:15px}.wnote{font-size:14px;color:var(--accent);margin-top:2px}",
      ".send .inner{text-align:center}",
      ".btns{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:12px 0}",
      "pre.rep{white-space:pre-wrap;text-align:left;font:14px/1.45 ui-monospace,Menlo,monospace;background:var(--soft);padding:10px;border-radius:12px;max-height:320px;overflow:auto}",
      ".small{font-size:13px;opacity:.75;margin-top:14px}",
      ".linkbtn{background:none;border:none;color:var(--accent);text-decoration:underline;font:inherit;font-size:13px;padding:0;cursor:pointer}",
      ".cele{position:fixed;top:0;right:0;bottom:0;left:0;z-index:100;background:rgba(20,10,30,.55);display:grid;place-items:center;overflow:hidden}",
      ".cele canvas{position:absolute;top:0;right:0;bottom:0;left:0}",
      ".cbox{position:relative;background:#fff;border-radius:26px;padding:24px 22px;text-align:center;max-width:320px;margin:0 16px;box-shadow:0 10px 40px rgba(0,0,0,.3);animation:pop .5s}",
      "@keyframes pop{0%{transform:scale(.5);opacity:0}100%{transform:scale(1);opacity:1}}",
      ".wings{font-size:50px;animation:flap .5s ease-in-out infinite alternate}@keyframes flap{to{transform:scale(1.15)}}",
      ".ctext{font-size:22px;font-weight:800;color:var(--accent);margin:8px 0 16px;line-height:1.3}",
      ".rain{position:absolute;top:-50px;font-size:30px;animation:rain linear forwards}@keyframes rain{to{transform:translateY(115vh) rotate(360deg)}}",
      ".hidden{display:none!important}",
      "button,select,input,textarea{touch-action:manipulation}button{-webkit-tap-highlight-color:transparent}",
      "html,body{overflow-x:hidden;max-width:100%}.card,.inner{min-width:0}.q,.qline,.bub,.pcap,.rtext,.rex li,.wen,.wru{overflow-wrap:anywhere}",
      ".fopts{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.fopts.one{grid-template-columns:minmax(0,1fr)}.opt,.mopt,.qopt,.chip{overflow-wrap:anywhere;min-width:0}.escene{overflow:hidden}",
      ".nosound{background:#fff7ed;border-radius:12px;padding:10px;font-size:15px;line-height:1.4}",
      ".mcard{min-height:84px}.cslot{min-height:70px}",
      ".rq:not(:empty){min-height:170px}.shq{min-height:150px}.mopts:not(:empty){min-height:216px}.mlife{min-height:36px}.eq{min-height:150px}.qbody{min-height:250px}.pfb{min-height:44px}",
      ".mil{background:radial-gradient(ellipse at 50% 0,#3b2a8a,#0b0b3b 70%);border-radius:20px;padding:14px;color:#fff;margin:8px 0}",
      ".mhead{text-align:center;font-weight:800;font-size:18px;color:#fcd34d;margin-bottom:8px}",
      ".mladder{display:flex;gap:6px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none}.mladder span{flex:none;font-size:13px;padding:3px 9px;border-radius:999px;background:rgba(255,255,255,.1);color:#cbd5e1}",
      ".mladder span.done{background:rgba(252,211,77,.25);color:#fcd34d}.mladder span.cur{background:#fcd34d;color:#1e1b4b;font-weight:800}",
      ".mq{background:linear-gradient(90deg,#1e3a8a,#312e81);border:2px solid #93c5fd;border-radius:30px;padding:12px 16px;margin:10px 0;text-align:center}.mq .q{margin:0;font-weight:700}",
      ".mqn{font-size:13px;color:#fcd34d;margin-bottom:4px}.mend{line-height:1.5}",
      ".mopts{display:grid;grid-template-columns:1fr;gap:8px}",
      ".mopt{font:inherit;font-size:16px;text-align:left;padding:10px 16px;border-radius:999px;border:2px solid #93c5fd;background:#1e1b4b;color:#fff;cursor:pointer}.mopt b{color:#fcd34d}",
      ".mopt.final{background:#f59e0b;border-color:#f59e0b;animation:pulse .5s infinite}.mopt.right{background:#16a34a;border-color:#16a34a}.mopt.wrong{background:#dc2626;border-color:#dc2626}.mopt.gone{visibility:hidden}.mopt:disabled{color:#fff}",
      ".mlife{text-align:center;margin-top:10px}.lifeb{font:800 15px sans-serif;color:#1e1b4b;background:#fcd34d;border:none;border-radius:999px;padding:8px 16px;cursor:pointer}.lifeb.usedl{opacity:.35;text-decoration:line-through}",
      ".mmsg{text-align:center;min-height:22px;margin-top:8px;color:#fcd34d;font-weight:700}",
      ".mstats{text-align:center;font-size:15px;margin:6px 0}",
      ".memgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}",
      ".mcard{font:inherit;aspect-ratio:3/4;border-radius:12px;border:2px solid var(--accent2);background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;padding:4px;cursor:pointer;display:grid;place-items:center;transition:transform .3s}",
      ".mcard .mf{display:none;font-size:13px;line-height:1.15;word-break:break-word}.mcard .mb{font-size:26px}",
      ".mcard.open,.mcard.matched{background:#fff;color:var(--text);animation:pop .25s}.mcard.open .mf,.mcard.matched .mf{display:block}.mcard.open .mb,.mcard.matched .mb{display:none}",
      ".mcard.en .mf{font-weight:800}.mcard.matched{border-color:#22c55e;background:#ecfdf3;animation:pop .4s}.mcard:disabled{color:var(--text)}",
      ".esc{background:linear-gradient(160deg,#1f2937,#111827);border-radius:20px;padding:14px;color:#f9fafb;margin:8px 0}",
      ".ehead{text-align:center;font-weight:800;letter-spacing:3px;color:#fbbf24}.estory{font-size:15px;opacity:.9;margin:8px 0;line-height:1.45}",
      ".edoors{display:flex;justify-content:center;gap:6px;margin:8px 0}.edoors span{font-size:20px;opacity:.5}.edoors span.cur{opacity:1;transform:scale(1.3)}.edoors span.open{opacity:1}",
      ".escene{position:relative;text-align:center;height:110px}.edoor{font-size:90px;line-height:110px;transition:transform .8s}.edoor.opening{transform:perspective(300px) rotateY(-70deg);opacity:.7}",
      ".elock{position:absolute;left:50%;top:40%;transform:translateX(10px);font-size:30px}",
      ".eq{background:#f9fafb;color:#111827;border-radius:16px;padding:12px;margin-top:8px}.eqn{display:inline-block;background:#fbbf24;color:#111;border-radius:999px;padding:1px 10px;font-size:13px;font-weight:700;margin-bottom:4px}",
      ".emsg{text-align:center;min-height:22px;margin-top:8px;font-weight:700}.emsg.ok{color:#4ade80}.emsg.bad{color:#f87171}",
      ".shake{animation:sh .35s}",
      ".quest{border-radius:18px;overflow:hidden;border:2px solid var(--accent2);background:#fff;margin:8px 0}",
      ".qhead{background:var(--accent);color:#fff;padding:10px 12px;font-weight:800;font-size:13px;letter-spacing:1px;text-transform:uppercase;display:flex;align-items:center;gap:5px}.qhead i{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.6)}.qhead span{margin-left:6px}",
      ".qbody{padding:14px}.qintro{font-size:16px;line-height:1.5;text-align:center}.qscene{font-size:14px;opacity:.75;margin-bottom:6px}",
      ".qline{font-size:19px;font-weight:700;line-height:1.35;margin-bottom:12px}.qline b{color:var(--accent)}",
      ".qopts{display:grid;gap:8px}.qopt{font:inherit;font-size:16px;font-weight:600;padding:12px;border-radius:12px;border:none;background:var(--soft);color:var(--text);cursor:pointer}",
      ".qopt.right{background:var(--accent);color:#fff}.qopt.wrong{background:#fee2e2;color:#991b1b;text-decoration:line-through}.qopt:disabled{color:inherit}",
      ".qfb{margin-top:10px;font-size:15px;line-height:1.4}.qfb.bad{color:#b91c1c;font-weight:700}.qfb.ok{color:var(--text)}",
      ".qend{text-align:center;font-size:17px;line-height:1.5}.qee{font-size:64px}",
      ".tabs{flex-wrap:wrap;position:static!important}",
      ".prog{margin:6px 0 4px}.ptxt{font-size:15px;margin-bottom:4px}",
      ".pbar{height:12px;border-radius:999px;background:#fff;border:2px solid var(--accent2);overflow:hidden}.pbar i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:999px;transition:width .5s}",
      ".parthead{margin:22px 4px 0;font-size:15px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:var(--accent);display:flex;align-items:center;gap:8px}",
      ".parthead span{font-size:22px}.parthead::after{content:'';flex:1;height:2px;background:var(--accent2);border-radius:2px}",
      ".from{font-size:13px;opacity:.6;font-weight:400}",
      ".speak{display:flex;flex-direction:column;align-items:center;gap:10px;margin-top:10px}.speak audio{width:100%}",
      ".btn.rec{background:#ef4444;animation:pulse 1s infinite}@keyframes pulse{50%{box-shadow:0 0 0 10px rgba(239,68,68,.2)}}",
      ".coll{background:rgba(255,255,255,.9);border-radius:20px;padding:16px;border:2px solid var(--accent2)}",
      ".colh{margin:0 0 6px;color:var(--accent);font-size:20px}",
      ".cgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px}",
      ".cslot{aspect-ratio:1;border-radius:14px;background:var(--soft);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;border:2px dashed var(--accent2);overflow:hidden}",
      ".cslot.got{background:#fff;border:2px solid var(--accent);cursor:pointer;animation:pop .4s}",
      ".ci{font-size:32px;line-height:1}.cslot:not(.got) .ci{opacity:.4;font-size:24px}",
      ".cm{position:absolute;top:2px;right:4px;font-size:16px}.ct{font-size:10px;line-height:1.1;text-align:center;padding:2px 3px;opacity:.7;max-height:2.3em;overflow:hidden}",
      ".rtitle{font-size:22px;font-weight:800;color:var(--accent)}.bigitem{font-size:84px;margin:6px 0;animation:flap .6s ease-in-out infinite alternate}.medalrow{font-size:20px;font-weight:700;margin-bottom:6px}",
      ".certov{background:rgba(20,10,30,.7);overflow-y:auto}.certwrap{display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px 12px}",
      ".cert{width:min(92vw,380px);background:#fffdf5;border-radius:6px;padding:10px;box-shadow:0 10px 40px rgba(0,0,0,.4);animation:pop .4s}",
      ".cframe{position:relative;border:3px double #c9a227;outline:2px solid var(--accent2);outline-offset:4px;padding:18px 14px 22px;text-align:center;font-family:Georgia,'Times New Roman',serif;color:#3b2f1a;background:radial-gradient(circle at 50% 0,rgba(201,162,39,.12),transparent 60%)}",
      ".ctop{font-size:22px;letter-spacing:6px}.ch{font-size:34px;font-weight:700;letter-spacing:6px;color:#b8901f;margin-top:6px}.csub{font-style:italic;font-size:14px;opacity:.7}",
      ".cfor{margin-top:12px;font-size:14px}.cname{font-size:30px;font-weight:700;color:var(--accent);margin:2px 0 6px}",
      ".cwhat{font-size:15px;line-height:1.4}.cmed{font-size:60px;margin:8px 0 0}.cres{font-size:15px;font-weight:700}",
      ".cfoot{display:flex;justify-content:space-between;margin-top:18px;font-size:13px;border-top:1px solid #d6c08a;padding-top:6px}.csign{font-style:italic}",
      ".cstamp{position:absolute;right:8px;bottom:58px;width:78px;height:78px;border-radius:50%;border:3px solid rgba(220,38,38,.6);color:rgba(220,38,38,.75);font:800 9px/1.1 sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-14deg)}.cstamp b{font-size:24px}",
      ".ctip{color:#fff;font-size:14px}",
      ".opt:disabled{color:var(--text);opacity:1}.opt.right:disabled,.opt.wrong:disabled{color:#fff}",
      ".fopts.one{grid-template-columns:1fr}",
      ".rboard{text-align:center;font-size:18px;margin:8px 0}",
      ".rtrack{background:var(--soft);border-radius:16px;padding:6px 8px;border:2px solid var(--accent2)}",
      ".lane{position:relative;height:54px;border-bottom:2px dashed var(--accent2)}.lane:last-child{border-bottom:none}",
      ".rme,.rriv{position:absolute;left:0;top:7px;font-size:34px;line-height:1;transition:left .8s cubic-bezier(.3,1.5,.6,1)}",
      ".rgoal{position:absolute;right:2px;top:7px;font-size:34px;line-height:1}",
      ".rbanner{text-align:center;font-weight:800;font-size:21px;min-height:32px;margin:8px 0}",
      ".rbanner.ok{color:#15803d;animation:pop .4s}.rbanner.bad{color:#dc2626;animation:sh .35s}",
      ".rq .q,.shq .q{font-weight:600;margin:6px 0 10px;line-height:1.45}",
      ".qn{display:inline-block;background:var(--accent);color:#fff;border-radius:999px;padding:1px 10px;font-size:14px;margin-right:4px}",
      ".chat{border-radius:22px;overflow:hidden;border:2px solid var(--accent2);background:#fff;margin:8px 0}",
      ".chead{display:flex;gap:10px;align-items:center;padding:10px 12px;background:var(--accent);color:#fff;line-height:1.3}",
      ".cav{font-size:28px;background:#fff;border-radius:50%;width:44px;height:44px;display:grid;place-items:center;flex:none}",
      ".cst{font-size:13px;opacity:.9}",
      ".clog{height:360px;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:var(--soft) radial-gradient(circle,rgba(255,255,255,.8) 1px,transparent 1.6px) 0 0/18px 18px}",
      ".bub{max-width:82%;padding:8px 12px;border-radius:18px;line-height:1.4;font-size:16px;animation:pop .25s;box-shadow:0 1px 2px rgba(0,0,0,.08)}",
      ".bub.them{align-self:flex-start;background:#fff;border-bottom-left-radius:4px}",
      ".bub.mine{align-self:flex-end;background:var(--accent);color:#fff;border-bottom-right-radius:4px}",
      ".bub.mine.bad{background:#fecaca;color:#7f1d1d;text-decoration:line-through}",
      ".bub.hint{align-self:flex-start;background:#fff7ed;color:#9a3412;font-size:15px}",
      ".bub.sys{align-self:center;background:rgba(0,0,0,.1);font-size:14px;font-weight:700}",
      ".typing span{display:inline-block;width:7px;height:7px;margin:0 2px;border-radius:50%;background:#aaa;animation:dot 1s infinite}",
      ".typing span:nth-child(2){animation-delay:.2s}.typing span:nth-child(3){animation-delay:.4s}@keyframes dot{50%{transform:translateY(-4px);opacity:.4}}",
      ".copts{display:flex;flex-direction:column;gap:6px;padding:8px;background:#fff}.copts:empty{display:none}.copts .opt{text-align:left}",
      ".scount{margin:8px 0;font-size:16px}",
      ".spot{background:#fff;border:2px solid var(--accent2);border-radius:16px;padding:14px;line-height:2.2;font-size:17px}",
      ".sw{cursor:pointer;border-radius:6px;padding:2px 1px}",
      ".sw.nope{background:#fde68a}.sw.found{background:#fee2e2;text-decoration:underline wavy #ef4444}",
      ".sw.fixed,.sw.reveal{background:#dcfce7;color:#15803d;font-weight:700;padding:2px 4px}.sw.reveal{outline:2px dashed #22c55e}",
      ".sw.fixed s,.sw.reveal s{color:#ef4444;font-weight:400}",
      ".sedit{display:inline-flex;gap:4px;align-items:center;margin:0 4px;vertical-align:middle}",
      ".mini{font:inherit;font-size:16px;border:none;border-radius:8px;background:var(--accent);color:#fff;padding:4px 12px;cursor:pointer}",
      ".dfile{background:#fdf6e3;border:2px solid #d6c08a;border-radius:16px;padding:12px;margin:8px 0}",
      ".dtitle{font-weight:800;font-size:18px;color:#7c5a10;margin-bottom:6px}.dstory{font-size:16px;line-height:1.5;margin-bottom:10px}",
      ".dboard{background:#c9a27e;background-image:radial-gradient(circle,rgba(0,0,0,.1) 1px,transparent 1.5px);background-size:8px 8px;border-radius:12px;padding:10px;display:grid;gap:8px;margin-bottom:10px}",
      ".dbh{font-weight:800;color:#3b2a14}",
      ".clue{background:#fff8dc;border-radius:4px;padding:8px 10px;font-size:15px;line-height:1.4;box-shadow:0 2px 4px rgba(0,0,0,.25);color:#666}",
      ".clue:not(.open){font-style:italic;opacity:.75}.clue.open{transform:rotate(-.8deg);color:#222}.clue.open:nth-child(odd){transform:rotate(.8deg)}.clue.pop{animation:pop .5s}",
      ".sus{display:grid;grid-template-columns:1fr 1fr;gap:8px}",
      ".scard{font:inherit;font-size:15px;line-height:1.3;background:#fff;border:2px solid var(--accent2);border-radius:14px;padding:10px;cursor:pointer;color:var(--text)}",
      ".scard.right{border-color:#22c55e;background:#ecfdf3}.scard.wrong{border-color:#ef4444;background:#fef2f2}.scard:disabled{color:var(--text)}",
      ".se{font-size:36px}.sd{font-size:13px;opacity:.75;margin-top:2px}",
      ".dsol{margin-top:10px;background:#fff;border-radius:12px;padding:10px;line-height:1.45}",
      ".feed{max-width:380px;margin:8px auto;border-radius:30px;border:8px solid #111;background:#111;overflow:hidden}",
      ".ftop{display:flex;justify-content:space-between;padding:10px 14px;font-size:14px;color:#fff}",
      ".fstage{background:#fff;padding:0 0 12px;min-height:220px}",
      ".fempty{font-size:80px;text-align:center;padding:60px 0}",
      ".post{position:relative;height:290px;color:#fff;display:flex;flex-direction:column;overflow:hidden}",
      ".puser{display:flex;align-items:center;gap:8px;padding:14px 10px 0;font-weight:700;font-size:15px;text-shadow:0 1px 3px rgba(0,0,0,.4)}",
      ".pav{background:#fff;border-radius:50%;width:34px;height:34px;display:grid;place-items:center;font-size:19px;text-shadow:none}",
      ".ppic{flex:1;display:grid;place-items:center;font-size:84px}",
      ".pside{position:absolute;right:10px;bottom:24px;display:grid;gap:12px;text-align:center;font-size:24px;line-height:1.1;text-shadow:0 1px 3px rgba(0,0,0,.4)}.pside b{font-size:13px}",
      ".pdots{position:absolute;top:6px;left:10px;right:10px;display:flex;gap:3px}.pdots i{flex:1;height:3px;background:rgba(255,255,255,.4);border-radius:2px}.pdots i.on{background:#fff}",
      ".heart{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;font-size:110px;animation:heart 1s forwards;pointer-events:none}",
      "@keyframes heart{0%{transform:scale(0);opacity:0}30%{transform:scale(1.25);opacity:1}100%{transform:scale(1);opacity:0}}",
      ".pcap{padding:10px 12px;font-size:16px;line-height:1.45}",
      ".fstage .fopts{padding:0 12px}.fstage>.btn{display:block;margin:10px auto 0}",
      ".pfb{padding:6px 12px;font-size:15px;line-height:1.4}.pfb.ok{color:#15803d;font-weight:700}.pfb.bad{color:#7f1d1d}.minus{color:#dc2626;font-weight:700;white-space:nowrap}",
      ".fend{text-align:center;padding:40px 10px;font-size:18px;line-height:1.6}.fe{font-size:70px}",
      ".show{background:radial-gradient(ellipse at 50% -10%,rgba(255,255,255,.35),transparent 55%),linear-gradient(160deg,#1e1b4b,#4c1d95 60%,var(--accent));border-radius:20px;padding:14px;color:#fff;margin:8px 0;position:relative;overflow:hidden}",
      ".show.hurry{animation:hurry .45s infinite alternate}@keyframes hurry{to{box-shadow:inset 0 0 50px rgba(239,68,68,.8)}}",
      ".shtop{display:flex;justify-content:space-between;align-items:center;font-weight:800}",
      ".shlogo{background:linear-gradient(90deg,#fde047,#f9a8d4);-webkit-background-clip:text;background-clip:text;color:transparent;font-size:20px}",
      ".shpts{background:rgba(255,255,255,.18);border-radius:999px;padding:2px 12px}",
      ".shhost{display:flex;gap:8px;align-items:center;margin:10px 0}.hh{font-size:42px;flex:none}",
      ".hb{background:#fff;color:#1e1b4b;border-radius:16px;padding:8px 12px;font-size:15px;font-weight:600;line-height:1.35}",
      ".shmid{position:relative;width:104px;height:104px;margin:4px auto 10px}",
      ".ring{width:104px;height:104px;transform:rotate(-90deg)}",
      ".rbg{fill:none;stroke:rgba(255,255,255,.2);stroke-width:8}.rfg{fill:none;stroke:#fde047;stroke-width:8;stroke-linecap:round;transition:stroke .3s}",
      ".tnum{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;font-size:34px;font-weight:800}",
      ".shq{background:rgba(255,255,255,.96);color:#1e1b4b;border-radius:16px;padding:12px;min-height:60px}",
      ".wkey{display:inline-block;background:#1e1b4b;color:#fde047;border-radius:6px;padding:0 8px;font-weight:800;letter-spacing:1px}",
      ".shin{display:flex;gap:8px;align-items:center}.shin input.gap{flex:1 1 auto;min-width:0;width:auto!important;border:2px solid var(--accent2);background:#fff;padding:8px 10px}.shin .btn{flex:none;padding:10px 16px}",
      ".shaud{text-align:center;font-size:24px;margin-top:10px;letter-spacing:3px}.shaud.clap{animation:clap .33s 3}@keyframes clap{50%{transform:translateY(-8px) scale(1.12)}}",
      ".tabs{gap:6px}.tab{padding:7px 12px;font-size:15px;white-space:nowrap}",
      ".rulebtn{font:inherit;font-size:15px;font-weight:700;border:2px dashed var(--accent);background:#fff;color:var(--accent);border-radius:999px;padding:5px 14px;margin:0 0 10px;cursor:pointer}",
      ".rcard{background:#fff;border-radius:16px;padding:14px;border:2px solid var(--accent2);transition:box-shadow .3s}",
      ".rcard h3{margin:0 0 6px;font-size:18px;color:var(--accent)}",
      ".rtext{line-height:1.5}.rex{margin:8px 0 0;padding-left:20px}.rex li{margin:4px 0}",
      ".rwarn{margin-top:8px;font-size:15px;background:#fff7ed;border-radius:10px;padding:8px 10px}",
      ".rcard.flash{box-shadow:0 0 0 4px var(--accent)}",
      ".backbar{position:sticky;top:8px;z-index:6;text-align:center;margin-bottom:8px}",
      ".plain .btn::after{display:none}.plain h1{color:var(--text)}"
    ].join("\n");
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var m = document.querySelector('meta[name=viewport]');
    if (!m) { m = document.createElement("meta"); m.name = "viewport"; m.content = "width=device-width,initial-scale=1"; document.head.appendChild(m); }
  }

  /* ---------- Сборка страницы ---------- */
  function render() {
    document.title = plain(H.title) + (H.student ? " — " + H.student : "");
    if (T.plain) document.body.classList.add("plain");
    if (T.decor.length) {
      var layer = el("div", "decor-layer"), r = rng(42);
      for (var i = 0; i < 12; i++) {
        var s = el("span", "", T.decor[i % T.decor.length]);
        s.style.left = (r() * 92) + "%"; s.style.top = (r() * 92) + "%"; s.style.animationDelay = (r() * 6) + "s";
        layer.appendChild(s);
      }
      document.body.appendChild(layer);
    }
    var wrap = el("div", "wrap"); document.body.appendChild(wrap);
    var head = el("header", "top");
    if (T.decor.length) head.appendChild(el("div", "deco", T.decor.slice(0, 4).join("")));
    head.appendChild(el("h1", "", md(H.title)));
    if (H.student) head.appendChild(el("p", "hello", "Привет, " + esc(H.student) + "! " + (T.plain ? "" : (T.decor[0] || ""))));
    wrap.appendChild(head);
    if (H.intro) wrap.appendChild(el("div", "intro", md(H.intro)));

    var panes = [], tasksBox = el("div", "pane"), prevPart = null;
    var progWrap = el("div", "prog"); tasksBox.appendChild(progWrap);
    H.tasks.forEach(function (t, ti) {
      if (t.part && t.part !== prevPart) {
        var pp = PARTS[t.part] || { icon: "⭐", name: t.part };
        tasksBox.appendChild(el("div", "parthead", "<span>" + pp.icon + "</span> " + esc(t.partName || pp.name)));
      }
      prevPart = t.part || prevPart;
      tasksBox.appendChild(buildTask(t, ti));
    });
    progEl = progWrap; updateProgress();
    tasksBox.appendChild(buildSend());
    panes.push({ id: "tasks", label: "📝 Задания", el: tasksBox });
    if (H.rules && H.rules.length) {
      var rp = el("div", "pane"), rr = buildRules(); rp.appendChild(rr.box);
      panes.push({ id: "rules", label: "💡 Подсказка", el: rp });
    }
    if (H.words && H.words.length) {
      var wp = el("div", "pane"); wp.appendChild(buildWords());
      panes.push({ id: "words", label: "📚 Слова", el: wp });
    }
    if (H.rewards !== false) {
      var ap = el("div", "pane"); collBox = el("div", "coll"); ap.appendChild(collBox); drawColl();
      panes.push({ id: "awards", label: "🏆 Награды", el: ap });
    }
    if (panes.length > 1) {
      var tabs = el("div", "tabs");
      panes.forEach(function (p) {
        p.btn = el("button", "tab", p.label); p.btn.type = "button";
        p.btn.addEventListener("click", function () { showPane(p.id); if (backBar && p.id !== "rules") backBar.classList.add("hidden"); });
        tabs.appendChild(p.btn);
      });
      wrap.appendChild(tabs);
      if (backBar) wrap.appendChild(backBar);
    }
    showPane = function (id) {
      panes.forEach(function (p) { p.el.classList.toggle("hidden", p.id !== id); if (p.btn) p.btn.classList.toggle("on", p.id === id); });
    };
    panes.forEach(function (p) { wrap.appendChild(p.el); });
    showPane("tasks");
    if (allCorrect()) celebratedOnce = true; // не взрывать салют при каждом открытии
  }

  /* ---------- Библиотека ДЗ: юнит + файл ученика ---------- */
  var UNITS = {};
  window.HW_UNIT = function (id, data) { UNITS[id] = data; };
  function walk(x, fn) {
    if (typeof x === "string") return fn(x);
    if (Array.isArray(x)) return x.map(function (y) { return walk(y, fn); });
    if (x && typeof x === "object") { var o = {}; for (var k in x) o[k] = walk(x[k], fn); return o; }
    return x;
  }
  function fromUnit(cfg) {
    var u = UNITS[cfg.unit];
    if (!u) return null;
    var tasks = (u.tasks || []).filter(function (t) { return !(cfg.skipParts || []).some(function (p) { return p === t.part; }); });
    if (cfg.insert && cfg.insert.length) {
      var pos = tasks.findIndex(function (t) { return t.part === "write" || t.part === "final"; });
      if (pos < 0) pos = tasks.length;
      tasks = tasks.slice(0, pos).concat(cfg.insert, tasks.slice(pos));
    }
    var out = Object.assign({}, u, cfg, { tasks: tasks, words: (u.words || []).concat(cfg.words || []), rules: (u.rules || []).concat(cfg.rules || []) });
    var fem = cfg.gender !== "m";
    var map = Object.assign({}, u.heroDefaults || {}, cfg.hero || {}, {
      name: cfg.student || "", eng: cfg.nameEn || cfg.student || "", "сама": fem ? "сама" : "сам", "а": fem ? "а" : "", "she": fem ? "she" : "he", "She": fem ? "She" : "He", "her": fem ? "her" : "his", "Her": fem ? "Her" : "His"
    });
    return walk(out, function (str) { return str.replace(/%([A-Za-zА-Яа-яЁё]+)%/g, function (m, k) { return map[k] != null ? map[k] : m; }); });
  }

  window.HW = function (cfg) {
    if (cfg.unit) {
      var built = fromUnit(cfg);
      if (!built) { document.body.innerHTML = "<p style='font:18px sans-serif;padding:24px'>Не найден файл юнита <b>unit-" + cfg.unit + ".js</b>. Загрузи его на GitHub рядом с этим файлом.</p>"; return; }
      cfg = built;
    }
    H = cfg; H.tasks = H.tasks || [];
    if (H.telegram == null || H.telegram === "") H.telegram = "Nady_Allayarova";
    T = Object.assign({}, THEMES[cfg.theme] || THEMES.pink, cfg.colors || {});
    if (cfg.decor) T.decor = cfg.decor;
    F = cfg.gender !== "m";
    STORE_KEY = "hw1:" + location.pathname + ":" + (cfg.id || cfg.title);
    addVocab(cfg.vocab, "раньше"); addVocab(cfg.words, plain(cfg.title));
    injectCSS(); load(); render();
  };
})();
