/* Библиотека ДЗ · Pre-Intermediate · Present Simple vs Present Continuous
   Один файл на всех учеников. %name%, %she%, %her%, %pet%, %friend%, %city%, %hobby% —
   подставляются из файла ученика (hero). %eng% — имя по-английски (nameEn). */
HW_UNIT("pi-tenses", {
  title: "Present Simple vs Continuous",
  heroDefaults: { pet: "cat", friend: "Alex", city: "Moscow", hobby: "music" },
  intro: "Привет, %name%! ДЗ на 20 минут. Сверху виден прогресс, правила — во вкладке «Подсказка» 💡",

  rules: [
    { title: "Present Simple — обычно, всегда",
      text: "Привычки, факты, расписание. Слова-подсказки: **usually, always, often, every day, never**. С he/she/it добавляем **-s**.",
      examples: ["I **get up** at 7 every day.", "%She% **lives** in %city%.", "He **doesn't like** coffee."] },
    { title: "Present Continuous — сейчас",
      text: "То, что происходит прямо сейчас или в эти дни: **am / is / are + -ing**. Подсказки: **now, right now, at the moment, Look!, today**.",
      examples: ["Look! It**'s raining**.", "I**'m reading** a great book at the moment."],
      mistake: "Глаголы состояния (**like, love, want, know, understand, need**) обычно не ставим в Continuous: *I'm knowing* ❌ → *I know* ✅" }
  ],

  words: [
    ["usually", "обычно"], ["at the moment", "в данный момент"], ["go out", "ходить гулять"], ["stay in", "оставаться дома"],
    ["have a snack", "перекусить"], ["chat online", "переписываться"], ["take photos", "фотографировать"], ["be busy", "быть занятым"]
  ],

  tasks: [
    { part: "warmup", type: "wordfall", title: "Словопад-разминка", count: 6 },

    { part: "review", type: "mistakes", title: "Работа над ошибками", count: 6,
      instruction: "Задания, где раньше были ошибки. Ответишь верно — ошибка уйдёт из списка 💪" },

    { part: "words", type: "vocab", title: "Слова прошлых уроков", count: 8 },

    { part: "practice", type: "gaps", title: "Сейчас или обычно?", rule: [0, 1],
      instruction: "Поставь глагол в Present Simple или Present Continuous.",
      tip: "Ищи слова-подсказки: *usually / every day* → Simple, *now / Look!* → Continuous.",
      items: [
        "%eng% usually {gets} up at 7, but today %she% {is sleeping|'s sleeping} late. (get / sleep)",
        "Look! %friend% {is waving|'s waving} at us. (wave)",
        "My %pet% {loves} fish! (love)",
        "What {are} you {doing} right now? (you / do)",
        "I {don't understand|do not understand} this word. (not understand)",
        "We {are having|'re having} lunch at the moment, can I call you back? (have)"
      ] },

    { part: "practice", type: "choice", title: "Выбери правильный вариант", rule: 1,
      items: [
        { q: "I ___ this song!", o: ["love", "am loving"], a: 0 },
        { q: "Sorry, I can't talk — I ___ dinner.", o: ["have", "am having"], a: 1 },
        { q: "%She% ___ in %city%.", o: ["lives", "is living"], a: 0 },
        { q: "___ you ___ what I mean?", o: ["Do … know", "Are … knowing"], a: 0 }
      ] },

    { part: "practice", type: "quest", title: "Квест: суббота %name%", place: "Суббота",
      intro: "Суббота! %friend% пишет %name% — помоги ответить правильно 😉",
      scenes: [
        { scene: "📱 Сообщение", who: "%friend%", say: "Hi! What are you doing?",
          choices: [
            { t: "I'm watching a film.", ok: true, reply: "Cool! Do you want to go out later?" },
            { t: "I watch a film now.", fb: "Сейчас → Present Continuous: *I'm watching…*" }
          ] },
        { scene: "📱 Сообщение", who: "%friend%", say: "Do you want to go out later?",
          choices: [
            { t: "Yes! I usually go out on Saturdays.", ok: true, reply: "Great, see you at 5!" },
            { t: "Yes! I'm usually going out on Saturdays.", fb: "*Usually* → Present Simple: *I usually go out*." }
          ] }
      ],
      endings: [
        { max: 0, emoji: "🎉", text: "Идеальная переписка! Встреча в 5 😎" },
        { emoji: "🙂", text: "Договорились! Но повтори правило во вкладке «Подсказка»." }
      ] },

    { part: "speak", type: "speak", title: "Запиши голосовое 🎙", max: 120,
      tip: "30–60 секунд. Используй и Present Simple, и Present Continuous.",
      items: ["What do you usually do at the weekend?", "What are you doing these days? (новое хобби, сериал, книга…)"] },

    { part: "write", type: "write", title: "Пишем сами",
      items: [{ q: "Опиши свой обычный день и что ты делаешь прямо сейчас (4–5 предложений).", min: 35 }] },

    { part: "final", type: "escape", title: "Escape Room: %name% и %pet%",
      story: "%name% и %pet% заперты в квест-комнате! Открой 3 двери 🔑",
      rooms: [
        { q: "My %pet% ___ right now. Shh!", o: ["is sleeping", "sleeps"], a: 0 },
        { q: "%She% ___ %hobby% every day.", o: ["practises", "is practising"], a: 0 },
        { q: "Впиши код: I ___ (not / want) to go home!", a: ["don't want", "do not want"] }
      ] }
  ]
});
