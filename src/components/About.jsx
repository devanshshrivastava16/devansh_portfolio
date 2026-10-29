import { useEffect, useRef, useState } from "react";
import { aboutLines, education } from "../data/content.js";

export function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${inView ? "in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function md(text) {
  // render **bold** spans
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-vscode-bright">
        {p}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

export default function About() {
  return (
    <div className="px-6 md:px-12 py-12 max-w-[940px]">
      <p className="text-vscode-gcm italic text-[14px] mb-3">
        {"<!— about.html - Devansh Shrivastava —>"}
      </p>
      <h2 className="font-display text-[30px] font-extrabold text-vscode-bright tracking-tight mb-1">
        About Me
      </h2>
      <p className="text-vscode-dim text-[14px] mb-8">{"// who I am · what I do · where I build"}</p>

      <Reveal>
        <div className="border border-vscode-border rounded-lg bg-white/[0.02] p-6 text-[14px] leading-[1.9]">
          Hi! I'm <strong className="text-vscode-bright">Devansh Shrivastava</strong>, a Full-Stack
          Java Developer from Uttar Pradesh, India. I build{" "}
          <strong className="text-vscode-blue">secure RESTful APIs</strong> with{" "}
          <strong className="text-vscode-blue">JWT authentication</strong>, design{" "}
          <strong className="text-vscode-blue">scalable backend systems</strong> with Spring Boot
          and Microservices, and develop{" "}
          <strong className="text-vscode-blue">responsive frontends</strong> with React.js.
          Currently a <strong className="text-vscode-bright">B.Tech student at Amity University
          Madhya Pradesh</strong>, passionate about solving real-world problems through clean,
          efficient, and production-ready code.
        </div>
      </Reveal>

      <Reveal className="mt-6" delay={60}>
        <div className="border border-vscode-border rounded-lg bg-white/[0.02] p-6">
          <div className="text-[14px] uppercase tracking-[0.2em] text-vscode-yellow mb-4">
            Current Focus
          </div>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-[13px]">
            {aboutLines.map((l, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span aria-hidden="true">{l.icon}</span>
                <span className="text-vscode-dim">{md(l.text)}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-8" delay={100}>
        <div className="text-[14px] uppercase tracking-[0.2em] text-vscode-yellow mb-4">
          Education
        </div>
        <div className="border border-vscode-border rounded-lg bg-white/[0.02] p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true">🎓</span>
              <span className="font-display text-[18px] font-extrabold text-vscode-bright">
                {education.school}
              </span>
            </div>
            <span className="text-[13px] text-vscode-dim">{education.period}</span>
          </div>
          <div className="text-[14px] text-vscode-blue mt-2">{education.degree}</div>
          <div className="text-[13px] text-vscode-dim mt-1">{education.gpa}</div>
          <div className="text-[13px] text-vscode-dim mt-4 mb-2">Relevant coursework:</div>
          <div className="flex flex-wrap gap-1.5">
            {education.coursework.map((c) => (
              <span
                key={c}
                className="text-[12px] px-1.5 py-0.5 rounded-sm border border-vscode-border text-vscode-text bg-white/[0.03]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-8" delay={140}>
        <div className="text-[14px] uppercase tracking-[0.2em] text-vscode-yellow mb-4">
          Certifications
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { issuer: "HackerRank", name: "REST API (Intermediate)" },
            { issuer: "HackerRank", name: "Java (Basic)" },
            { issuer: "MongoDB (Credly)", name: "From Relational Model (SQL) to MongoDB's Document Model" },
            { issuer: "Postman Academy", name: "API Documentation Learning Path" },
          ].map((c) => (
            <div
              key={c.name}
              className="flex items-start gap-3 border border-vscode-border rounded-lg bg-white/[0.02] p-4"
            >
              <span className="text-vscode-green mt-0.5" aria-hidden="true">✓</span>
              <div>
                <div className="text-[13px] text-vscode-text">{c.name}</div>
                <div className="text-[12px] text-vscode-dim mt-0.5">{c.issuer}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
