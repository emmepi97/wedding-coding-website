const SEMANTIC_MAP = {
  conoscere: ["conosciuti", "incontrati", "incontrato", "inizio", "origine", "nata", "iniziata"],
  appuntamento: ["uscita", "prima uscita", "prima cena", "date", "prima volta"],
  amore: ["innamorati", "innamorato", "sentimenti", "amarsi", "amore"],
  ricordo: ["momento", "speciale", "memoria", "episodio"],
  proposta: ["anello", "vuoi sposarmi", "matrimonio", "fidanzamento"],
  difficolta: ["crisi", "problemi", "ostacoli", "litigio", "fatica"],
  sposarsi: ["matrimonio", "scelta", "moglie", "marito", "sposano"],
  testimoni: ["amici", "vicini", "persone importanti", "accanto"],
  futuro: ["domani", "sogni", "progetti", "anni"],
};

const STOP_WORDS = new Set([
  "il","lo","la","i","gli","le","un","uno","una","di","a","da","in","con","su","per","tra","fra",
  "e","o","ma","che","chi","cui","del","della","dello","dei","degli","delle","al","allo","alla",
  "ai","agli","alle","dal","dallo","dalla","dai","dagli","dalle","nel","nello","nella","nei","negli",
  "nelle","come","quando","dove","quanto","quale","quali","mi","ti","vi","ci","si","e","ed","ho",
  "hai","ha","avete","sono","sei","siamo","era","erano","poi","piu","più","solo","anche","mai"
]);

const storyTitle = document.getElementById("storyTitle");
const storyIntro = document.getElementById("storyIntro");
const chatTitle = document.getElementById("chatTitle");
const sidebarQuestions = document.getElementById("sidebarQuestions");
const quickActions = document.getElementById("quickActions");
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function initUI() {
  storyTitle.textContent = window.STORY_CONFIG.title;
  storyIntro.textContent = window.STORY_CONFIG.intro;
  chatTitle.textContent = window.STORY_CONFIG.chatTitle;
  renderQuestionChips(window.STORY_CONFIG.quickQuestions, sidebarQuestions);
  renderQuestionChips(window.STORY_CONFIG.quickQuestions, quickActions);
  addBotMessage(window.STORY_CONFIG.welcomeMessage);
}

function renderQuestionChips(questions, container) {
  container.innerHTML = "";
  questions.forEach((question) => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.type = "button";
    btn.textContent = question;
    btn.addEventListener("click", () => {
      userInput.value = question;
      sendMessage();
    });
    container.appendChild(btn);
  });
}

function addMessage(text, sender = "bot") {
  const row = document.createElement("div");
  row.className = `message-row ${sender}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = sender === "bot" ? "💖" : "🧑";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  row.appendChild(avatar);
  row.appendChild(bubble);
  chatMessages.appendChild(row);
  scrollToBottom();
}

function addBotMessage(text) {
  addMessage(text, "bot");
}

function addUserMessage(text) {
  addMessage(text, "user");
}

function addTypingIndicator() {
  const row = document.createElement("div");
  row.className = "message-row bot";
  row.id = "typingIndicator";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = "💖";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';

  row.appendChild(avatar);
  row.appendChild(bubble);
  chatMessages.appendChild(row);
  scrollToBottom();
}

function removeTypingIndicator() {
  const indicator = document.getElementById("typingIndicator");
  if (indicator) indicator.remove();
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalizeText(text)
    .split(" ")
    .filter(token => token && !STOP_WORDS.has(token));
}

function expandTokens(tokens) {
  const expanded = new Set(tokens);

  tokens.forEach((token) => {
    for (const [baseWord, synonyms] of Object.entries(SEMANTIC_MAP)) {
      if (token === baseWord || synonyms.includes(token)) {
        expanded.add(baseWord);
        synonyms.forEach((s) => expanded.add(s));
      }
    }
  });

  return [...expanded];
}

function scoreIntent(userText, intent) {
  const normalizedUserText = normalizeText(userText);
  const userTokens = expandTokens(tokenize(userText));
  let score = 0;

  intent.patterns.forEach((pattern) => {
    const p = normalizeText(pattern);

    if (normalizedUserText === p) {
      score += 100;
    } else if (normalizedUserText.includes(p)) {
      score += 60;
    } else {
      const pTokens = expandTokens(tokenize(p));
      const overlap = pTokens.filter((t) => userTokens.includes(t)).length;
      const ratio = pTokens.length ? overlap / pTokens.length : 0;
      score += ratio * 45;
    }
  });

  intent.tags.forEach((tag) => {
    const tagTokens = expandTokens(tokenize(tag));
    const overlap = tagTokens.filter((t) => userTokens.includes(t)).length;
    if (overlap > 0) score += overlap * 12;
  });

  return score;
}

function detectBestIntent(userText) {
  const results = window.STORY_CONFIG.intents.map((intent) => ({
    intent,
    score: scoreIntent(userText, intent),
  }));

  results.sort((a, b) => b.score - a.score);
  const best = results[0];
  const second = results[1];

  if (!best || best.score < 24) return null;
  if (second && best.score - second.score < 5 && best.score < 35) return null;

  return best.intent;
}

function generateResponse(userText) {
  const normalized = normalizeText(userText);

  if (["ciao", "hey", "salve", "buongiorno", "buonasera"].includes(normalized)) {
    return "Ciao 💖 Puoi chiedermi come si sono conosciuti, come è andato il primo appuntamento, quando hanno capito di amarsi, com'è arrivata la proposta o perché hanno deciso di sposarsi.";
  }

  if (normalized.includes("grazie")) {
    return "Con piacere 💌 Se vuoi puoi farmi un'altra domanda sulla storia di Harry e Kate.";
  }

  const bestIntent = detectBestIntent(userText);
  return bestIntent ? bestIntent.response : window.STORY_CONFIG.fallback;
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addUserMessage(text);
  userInput.value = "";
  userInput.style.height = "64px";

  addTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    const response = generateResponse(text);
    addBotMessage(response);
  }, 480);
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

userInput.addEventListener("input", () => {
  userInput.style.height = "64px";
  userInput.style.height = Math.min(userInput.scrollHeight, 160) + "px";
});

initUI();
