const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

const knowledgeBase = [
  {
    keys: ["cash", "card", "carry", "wallet"],
    answer:
      "For most travelers, carry a mix: small local cash for transport/tips, and a forex card or international debit/credit card for larger payments.",
  },
  {
    keys: ["fee", "fees", "markup", "charges", "avoid"],
    answer:
      "To reduce forex charges: compare exchange rates, avoid airport counters, use low-markup cards, and avoid dynamic currency conversion at POS.",
  },
  {
    keys: ["best time", "exchange", "rate", "rates"],
    answer:
      "Track rates over a few days and convert in parts instead of all at once. Lock rates in advance if your provider supports it.",
  },
  {
    keys: ["documents", "kyc", "need", "required"],
    answer:
      "Common forex documents include passport, visa/ticket details, PAN (where applicable), and completed KYC forms. Requirements vary by country/provider.",
  },
  {
    keys: ["forex card", "reload", "top up"],
    answer:
      "A forex card is useful for budget control and better rates than many cards. Choose one with low ATM withdrawal and reload charges.",
  },
  {
    keys: ["atm", "withdraw", "withdrawal"],
    answer:
      "Use bank-affiliated ATMs abroad, withdraw fewer larger amounts to reduce fixed fees, and check daily withdrawal limits before travel.",
  },
  {
    keys: ["safe", "security", "lost", "stolen", "scam"],
    answer:
      "Split money across cash/card, keep emergency backup funds, enable transaction alerts, and store card support numbers separately.",
  },
  {
    keys: ["how much", "budget", "spend", "daily"],
    answer:
      "Estimate daily spending by destination: accommodation, meals, local travel, shopping, and emergency buffer (10-15%). Convert with a conservative rate.",
  },
];

const fallbackReply =
  "I can help with travel-forex topics like exchange rates, forex cards, cash vs card, ATM use, charges, and documentation. Please try rephrasing your question.";

function getReply(question) {
  const text = question.toLowerCase();
  let bestMatch = null;
  let score = 0;

  for (const intent of knowledgeBase) {
    let current = 0;
    for (const key of intent.keys) {
      if (text.includes(key)) current += 1;
    }
    if (current > score) {
      score = current;
      bestMatch = intent.answer;
    }
  }

  return score > 0 ? bestMatch : fallbackReply;
}

function appendMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const question = userInput.value.trim();
  if (!question) return;

  appendMessage(question, "user");
  const reply = getReply(question);
  appendMessage(reply, "bot");

  userInput.value = "";
  userInput.focus();
});
