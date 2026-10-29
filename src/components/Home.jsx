import { useEffect, useState } from "react";
import { profile, badges, typewriterPhrases, stats, socials } from "../data/content.js";
import { SocialIcon } from "./Icons.jsx";

function Typewriter() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = typewriterPhrases[phraseIdx];
    let delay = deleting ? 30 : 55;
    if (!deleting && len === phrase.length) delay = 2000;
    else if (deleting && len === 0) delay = 400;
    const t = setTimeout(() => {
      if (!deleting && len === phrase.length) setDeleting(true);
      else if (deleting && len === 0) {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % typewriterPhrases.length);
      } else setLen((l) => l + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [len, deleting, phraseIdx]);

  return (
    <span>
      {typewriterPhrases[phraseIdx].slice(0, len)}
      <span className="anim-blink text-vscode-pink">|</span>
    </span>
  );
}

function openFile(open) {
  return () => {
    window.dispatchEvent(new CustomEvent("open-file", { detail: open }));
  };
}

export default function Home() {
  return (
    <div className="px-6 md:px-12 py-12 max-w-[940px]">
      <p className="text-vscode-gcm italic text-[14px] mb-3">
        {"// hello world !! Welcome to my portfolio"}
      </p>
      <h1
        className="font-display font-extrabold text-vscode-bright tracking-[-2.5px]"
        style={{ fontSize: "clamp(32px, 8.5vw, 60px)", lineHeight: 1 }}
      >
        Devansh
        <br />
        <em className="not-italic text-vscode-pink">Shrivastava</em>
        <span className="block h-[3px] w-full bg-vscode-pink mt-1" aria-hidden="true"></span>
      </h1>

      <div className="flex flex-wrap gap-2 mt-6">
        {badges.map((b) => (
          <span
            key={b.label}
            className="flex items-center gap-2 text-[13px] px-3 py-1 rounded border border-vscode-border bg-vscode-bg2"
          >
            <span className={`w-2 h-2 rounded-full ${b.dot.replace("text-", "bg-")}`}></span>
            {b.label}
          </span>
        ))}
      </div>

      <p className="text-[15px] text-vscode-dim mt-5 h-6">
        <Typewriter />
      </p>

      <p className="text-[16px] leading-[1.8] mt-4">
        Passionate about solving real-world problems through{" "}
        <strong className="text-vscode-blue">clean, efficient</strong>, and{" "}
        <strong className="text-vscode-blue">production-ready code</strong> — from secure{" "}
        <strong className="text-vscode-blue">Spring Boot</strong> backends to responsive{" "}
        <strong className="text-vscode-blue">React</strong> frontends.
      </p>

      <div className="flex flex-wrap gap-3 mt-8">
        <button
          onClick={openFile("projects")}
          className="flex items-center gap-2 px-4 py-2 text-[13px] rounded bg-vscode-blue2 text-white hover:brightness-110 transition-all"
        >
          <span aria-hidden="true">📁</span> Projects
        </button>
        <button
          onClick={openFile("about")}
          className="flex items-center gap-2 px-4 py-2 text-[13px] rounded border border-vscode-border text-vscode-text hover:bg-white/5 transition-all"
        >
          <span aria-hidden="true">👤</span> About Me
        </button>
        <button
          onClick={openFile("contact")}
          className="flex items-center gap-2 px-4 py-2 text-[13px] rounded border border-vscode-border text-vscode-text hover:bg-white/5 transition-all"
        >
          <span aria-hidden="true">✉</span> Contact
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 mt-10 border border-vscode-border rounded overflow-hidden">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col items-center justify-center py-6 px-2 border-vscode-border ${
              i > 0 ? "md:border-l" : ""
            } ${i % 2 === 1 ? "border-l md:border-l" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""}`}
          >
            <span className="font-display text-[26px] font-extrabold text-vscode-bright">
              {s.value ?? s.icon}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-vscode-dim mt-1">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-8">
        {socials
          .filter((s) => s.href)
          .map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-[12px] rounded border border-vscode-border text-vscode-text hover:border-vscode-blue hover:text-vscode-blue transition-all"
            >
              <SocialIcon label={s.label} className="w-3.5 h-3.5" />
              {s.label}
            </a>
          ))}
      </div>
    </div>
  );
}
