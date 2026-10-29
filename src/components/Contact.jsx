import { useState } from "react";
import { contactMethods } from "../data/content.js";
import { Reveal } from "./About.jsx";
import { SocialIcon } from "./Icons.jsx";

function ContactRow({ m }) {
  return (
    <a
      href={m.href}
      target={m.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="reveal in flex items-center gap-3 px-3.5 py-2.5 border border-vscode-border rounded bg-white/[0.01] hover:border-vscode-dim transition-colors"
    >
      <span
        className="w-8 h-8 flex items-center justify-center rounded flex-shrink-0"
        style={{ color: m.color, backgroundColor: `${m.color}14`, border: `1px solid ${m.color}33` }}
      >
        <SocialIcon
          label={m.key === "portfolio" ? "Portfolio" : m.label}
          className="w-3.5 h-3.5"
        />
      </span>
      <span className="min-w-0">
        <span
          className="block text-[12px] tracking-widest uppercase mb-0.5 font-semibold"
          style={{ color: m.color }}
        >
          {m.label}
        </span>
        <span className="text-[12px] text-vscode-text truncate block">{m.value}</span>
      </span>
      <span className="ml-auto text-[12px] opacity-25 flex-shrink-0" aria-hidden="true">↗</span>
    </a>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject || `Portfolio contact from ${form.name}`,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        alert(data.message || "Something went wrong — please email me directly.");
      }
    } catch {
      alert("Network error — please email me directly at devanshshri16@gmail.com.");
    }
    setSending(false);
  };

  const field =
    "w-full bg-vscode-bg border border-vscode-border rounded px-3 py-2 text-[13px] text-vscode-text placeholder-vscode-dim/60 focus:border-vscode-blue2 transition-colors font-mono";

  return (
    <div className="px-6 md:px-12 py-12 max-w-[940px]">
      <p className="text-vscode-gcm italic text-[14px] mb-3">
        {"/* contact.css — let's build something */"}
      </p>
      <h2 className="font-display text-[30px] font-extrabold text-vscode-bright tracking-tight mb-1">
        Contact
      </h2>
      <p className="text-vscode-dim text-[14px] mb-8">
        {"// open to work, collabs & good conversations"}
      </p>

      <div className="grid md:grid-cols-2 gap-7">
        <Reveal>
          <div className="text-[14px] uppercase tracking-[0.2em] text-vscode-green mb-4">
            Find me on
          </div>
          <div className="flex flex-col gap-2.5">
            {contactMethods.map((m) => (
              <ContactRow key={m.key} m={m} />
            ))}
          </div>
          <div className="text-[12px] text-vscode-dim mt-4">
            📍 Uttar Pradesh, India · open to internships & collaborations
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="text-[14px] uppercase tracking-[0.2em] text-vscode-green mb-4">
            Send a message
          </div>
          <form onSubmit={submit} className="flex flex-col gap-3.5">
            <label className="block">
              <span className="text-vscode-gcm text-[12px] italic">{"// YOUR_NAME"}</span>
              <span className="text-vscode-red text-[12px]"> *</span>
              <input
                required
                className={field + " mt-1.5"}
                placeholder="string"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-vscode-gcm text-[12px] italic">{"// YOUR_EMAIL"}</span>
              <span className="text-vscode-red text-[12px]"> *</span>
              <input
                required
                type="email"
                className={field + " mt-1.5"}
                placeholder="string"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-vscode-gcm text-[12px] italic">{"// SUBJECT"}</span>
              <input
                className={field + " mt-1.5"}
                placeholder="string"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-vscode-gcm text-[12px] italic">{"// MESSAGE"}</span>
              <span className="text-vscode-red text-[12px]"> *</span>
              <textarea
                required
                rows={4}
                className={field + " mt-1.5 resize-none"}
                placeholder={`' 'your message' '`}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </label>
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-vscode-blue2 text-white text-[13px] py-2.5 rounded hover:brightness-110 transition-all disabled:opacity-50"
            >
              {sending ? "→ sending…" : "→ send_message()"}
            </button>
            <p className="text-vscode-gcm text-[12px] italic">
              {sent
                ? "// Message delivered — lands directly in my inbox. Talk soon! :)"
                : "// Goes straight to my inbox — I'll get back to you soon :)"}
            </p>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
