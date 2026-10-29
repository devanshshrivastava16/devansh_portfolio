import { useState, useRef, useEffect } from "react";
import { profile, projects, experience, education, skillCategories } from "../data/content.js";

// stable per-device id (client side; server enforces the actual limit)
function deviceId() {
  let id = localStorage.getItem("device-id");
  if (!id) {
    id = "dev-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("device-id", id);
  }
  return id;
}

const SUGGESTIONS = [
  "Tell me about Devansh?",
  "What projects has Devansh built?",
  "Tell me about his work experience",
  "What's his tech stack?",
  "How can I contact Devansh?",
  "What certifications does he have?",
];

const QA = [
  {
    match: /about|who|devansh\?|himself/i,
    answer: `Devansh Shrivastava is a **Full-Stack Java Developer** from Uttar Pradesh, India. He builds secure RESTful APIs with JWT authentication, scalable Spring Boot microservices, and responsive React frontends. Currently pursuing B.Tech CSE at Amity University Madhya Pradesh (CGPA 8.47).`,
  },
  {
    match: /project|built|trustspace|vikas|microservice/i,
    answer: `He has shipped 3 main projects:\n\n1. **TrustSpace** — full-stack venue rental marketplace (React, Spring Boot, PostgreSQL, JWT, WebSocket) with 55+ REST APIs and real-time chat.\n2. **VIKAS** — AI-powered fashion marketplace (pgvector semantic search, RAG assistant, Redis caching cutting latency 60%).\n3. **Microservices User & Contact Management** — Eureka service discovery, Spring Security on 15+ endpoints, 90%+ JUnit/Postman coverage.`,
  },
  {
    match: /experience|work|intern|occulthouse/i,
    answer: `He interned as a **Full-Stack Developer Intern at OccultHouse Pvt. Ltd.** (Jul–Aug 2025): built 30+ reusable React.js UI components, integrated RESTful APIs for an e-commerce platform, and worked in an Agile team with component-driven architecture.`,
  },
  {
    match: /stack|tech|skills|tools/i,
    answer: `His core stack:\n\n- **Languages:** Java, Python, JavaScript\n- **Backend:** Spring Boot, Spring Security, REST APIs, Microservices, Node.js, WebSocket, Redis\n- **Frontend:** React.js, HTML, CSS, Tailwind\n- **Databases:** PostgreSQL, pgvector, MySQL, MongoDB\n- **Tools:** JUnit, Git, Maven, Postman, Docker`,
  },
  {
    match: /contact|email|reach|hire/i,
    answer: `You can reach him at **devanshshri16@gmail.com**, or via GitHub (devanshshrivastava16) and LeetCode (phenom_devansh). The Contact tab has a message form too!`,
  },
  {
    match: /certif|hacker|rank|mongo|credly|postman/i,
    answer: `His certifications: **REST API (Intermediate)** and **Java (Basic)** from HackerRank, **From Relational Model (SQL) to MongoDB's Document Model** from MongoDB (Credly), and the **API Documentation Learning Path** from Postman Academy.`,
  },
  {
    match: /education|college|university|study|cgpa/i,
    answer: `He's pursuing a **B.Tech in Computer Science and Engineering** at Amity University Madhya Pradesh (Aug 2023 – Present), CGPA **8.47**.`,
  },
  {
    match: /leetcode|github|link/i,
    answer: `GitHub: github.com/devanshshrivastava16 · LeetCode: leetcode.com/u/phenom_devansh`,
  },
];

function renderAnswer(text) {
  // bold **x** and split lines
  return text.split("\n").map((line, i) => (
    <p key={i} className="text-[13px] leading-[1.8] mb-1.5">
      {line.split(/\*\*(.+?)\*\*/g).map((part, j) =>
        j % 2 === 1 ? (
          <strong key={j} className="text-vscode-bright">{part}</strong>
        ) : (
          <span key={j}>{part}</span>
        )
      )}
    </p>
  ));
}

export default function CopilotPanel({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [remaining, setRemaining] = useState(null); // null = local fallback mode
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const localAnswer = (q) => {
    const hit = QA.find((e) => e.match.test(q));
    return (
      hit?.answer ??
      `I don't have that in my knowledge base yet! Try one of the suggestions, or reach out to Devansh directly at **${profile.email}**.`
    );
  };

  const ask = async (q) => {
    if (!q.trim() || typing) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-device-id": deviceId() },
        body: JSON.stringify({ message: q }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok && res.status !== 503 && res.status !== 502) {
        setMessages((m) => [...m, { role: "bot", text: data.error || "AI unavailable." }]);
        if (typeof data.remaining === "number") setRemaining(data.remaining);
      } else if (!res.ok) {
        // server unreachable or unconfigured → local rule-based fallback
        setRemaining(null);
        setMessages((m) => [...m, { role: "bot", text: localAnswer(q) }]);
      } else {
        setRemaining(data.remaining);
        setMessages((m) => [...m, { role: "bot", text: data.reply }]);
      }
    } catch {
      // backend offline → local rule-based fallback
      setRemaining(null);
      const answer = localAnswer(q);
      await new Promise((r) => setTimeout(r, 600));
      setMessages((m) => [...m, { role: "bot", text: answer }]);
    }
    setTyping(false);
  };

  return (
    <aside
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[340px] flex flex-col bg-vscode-bg2 border-l border-vscode-border shadow-2xl anim-fade-in"
      aria-label="AI assistant chat"
    >
      <header className="flex items-center justify-between px-4 h-[35px] border-b border-vscode-border text-[12px]">
        <span className="flex items-center gap-2 text-vscode-purple">
          <span aria-hidden="true">✦</span> Devansh's AI Assistant
        </span>
        <button
          onClick={onClose}
          className="text-vscode-dim hover:text-vscode-text transition-colors"
          aria-label="Close chat panel"
        >
          ✕
        </button>
      </header>

      <div className="px-3 py-1.5 border-b border-vscode-border text-[11px] text-vscode-dim flex items-center gap-2">
        WORKSPACE
        <span className="px-1.5 py-0.5 rounded bg-vscode-blue2/20 text-vscode-blue border border-vscode-blue2/30">
          ● portfolio · devansh
        </span>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center text-center mt-6">
            <div className="w-14 h-14 rounded-full bg-vscode-purple/15 border border-vscode-purple/40 flex items-center justify-center text-[26px] anim-avatar-float">
              🤖
            </div>
            <p className="text-[14px] font-semibold text-vscode-bright mt-4">
              Hi! I'm Devansh's Copilot 👋
            </p>
            <p className="text-[12px] text-vscode-dim mt-1.5 mb-5">
              Ask me anything about his projects, skills, experience, or achievements.
            </p>
            <div className="grid grid-cols-2 gap-2 w-full">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="text-left text-[11px] leading-snug p-2.5 rounded border border-vscode-border bg-white/[0.02] text-vscode-text hover:border-vscode-purple hover:bg-white/[0.05] transition-all"
                >
                  <span className="text-vscode-purple mr-1" aria-hidden="true">✦</span>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`mb-3 ${m.role === "user" ? "text-right" : ""}`}>
            <div
              className={`inline-block max-w-[90%] text-left px-3 py-2 rounded-lg border ${
                m.role === "user"
                  ? "bg-vscode-blue2/15 border-vscode-blue2/30"
                  : "bg-white/[0.03] border-vscode-border"
              }`}
            >
              {m.role === "bot" ? renderAnswer(m.text) : <p className="text-[13px]">{m.text}</p>}
            </div>
          </div>
        ))}
        {typing && (
          <div className="text-[13px] text-vscode-dim">
            <span className="anim-blink">✦ thinking…</span>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="border-t border-vscode-border p-3"
      >
        <div className="flex items-end gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Devansh's projects, experience, skills…"
            aria-label="Ask the AI assistant"
            className="flex-1 bg-vscode-bg border border-vscode-border rounded px-3 py-2 text-[12px] text-vscode-text placeholder-vscode-dim focus:border-vscode-purple transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-8 h-8 rounded bg-vscode-blue2 text-white disabled:opacity-40 hover:brightness-110 transition-all"
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
        <p className="text-[10px] text-vscode-dim mt-2">
          {remaining === null
            ? "Offline assistant · Contact Devansh directly for important info"
            : `${remaining} message${remaining === 1 ? "" : "s"} left today · Contact Devansh directly for important info`}
        </p>
      </form>
    </aside>
  );
}
