import { useEffect, useMemo, useRef, useState } from "react";
import { FILES } from "../data/files.js";
import {
  projects,
  skillCategories,
  experience,
  certifications,
  education,
  profile,
} from "../data/content.js";
import { FileIcon } from "./Icons.jsx";

// searchable index built from portfolio data
const INDEX = [
  ...FILES.map((f) => ({
    label: f.name,
    kind: "file",
    detail: "Open in editor",
    action: { type: "file", id: f.id },
    keywords: f.name,
  })),
  ...projects.map((p) => ({
    label: p.title,
    kind: "project",
    detail: p.tags.join(", "),
    action: { type: "file", id: "projects" },
    keywords: `${p.title} ${p.description} ${p.tags.join(" ")}`,
  })),
  ...skillCategories.flatMap((c) =>
    c.skills.map((s) => ({
      label: s.name,
      kind: "skill",
      detail: `${c.name} · ${s.pct}%`,
      action: { type: "file", id: "skills" },
      keywords: `${s.name} ${c.name}`,
    }))
  ),
  ...experience.map((e) => ({
    label: e.role,
    kind: "experience",
    detail: `${e.company} · ${e.period}`,
    action: { type: "file", id: "experience" },
    keywords: `${e.role} ${e.company} ${e.description} ${e.tags.join(" ")}`,
  })),
  ...certifications.map((c) => ({
    label: c.name,
    kind: "certification",
    detail: c.issuer,
    action: { type: "file", id: "about" },
    keywords: `${c.name} ${c.issuer} certification`,
  })),
  {
    label: profile.school,
    kind: "education",
    detail: education.degree,
    action: { type: "file", id: "about" },
    keywords: `${profile.school} ${education.degree} education CGPA`,
  },
  {
    label: profile.email,
    kind: "contact",
    detail: "Email",
    action: { type: "file", id: "contact" },
    keywords: `${profile.email} email contact hire`,
  },
  {
    label: "GitHub",
    kind: "link",
    detail: profile.github,
    action: { type: "url", href: profile.github },
    keywords: "github repositories code",
  },
  {
    label: "LeetCode",
    kind: "link",
    detail: profile.leetcode,
    action: { type: "url", href: profile.leetcode },
    keywords: "leetcode algorithms problems",
  },
];

const KIND_COLOR = {
  file: "text-vscode-blue",
  project: "text-vscode-purple",
  skill: "text-vscode-yellow",
  experience: "text-vscode-green",
  certification: "text-vscode-orange",
  education: "text-vscode-orange",
  contact: "text-vscode-pink",
  link: "text-vscode-blue",
};

export default function SearchPalette({ onClose, openFile }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return INDEX.slice(0, 8);
    return INDEX.filter((r) => r.keywords.toLowerCase().includes(needle)).slice(0, 10);
  }, [q]);

  useEffect(() => setSel(0), [q]);

  const choose = (r) => {
    if (!r) return;
    if (r.action.type === "url") window.open(r.action.href, "_blank", "noreferrer");
    else openFile(r.action.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] bg-black/40"
      onClick={onClose}
      role="dialog"
      aria-label="Search portfolio"
    >
      <div
        className="w-[92%] max-w-lg bg-vscode-bg2 border border-vscode-border rounded-lg shadow-2xl overflow-hidden anim-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-3 border-b border-vscode-border">
          <span className="text-vscode-dim text-[13px]" aria-hidden="true">🔍</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSel((s) => Math.min(s + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSel((s) => Math.max(s - 1, 0));
              } else if (e.key === "Enter") {
                choose(results[sel]);
              }
            }}
            placeholder="Search projects, skills, experience…"
            aria-label="Search portfolio"
            className="flex-1 bg-transparent py-2.5 text-[13px] text-vscode-bright placeholder-vscode-dim border-none outline-none"
          />
          <kbd className="text-[10px] text-vscode-dim border border-vscode-border rounded px-1">esc</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto py-1" role="listbox">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-[12px] text-vscode-dim">
              No results for "{q}" — try a project, skill or technology name.
            </li>
          )}
          {results.map((r, i) => (
            <li key={r.kind + r.label}>
              <button
                role="option"
                aria-selected={i === sel}
                onMouseEnter={() => setSel(i)}
                onClick={() => choose(r)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
                  i === sel ? "bg-vscode-blue2/25" : "hover:bg-white/5"
                }`}
              >
                {r.kind === "file" ? (
                  <FileIcon type={FILES.find((f) => f.id === r.action.id)?.type} className="w-4 h-4" />
                ) : (
                  <span className={`text-[11px] w-4 text-center ${KIND_COLOR[r.kind]}`} aria-hidden="true">
                    {r.kind === "link" ? "↗" : "●"}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] text-vscode-bright truncate">{r.label}</span>
                  <span className="block text-[11px] text-vscode-dim truncate">{r.detail}</span>
                </span>
                <span className={`text-[10px] uppercase tracking-wider ${KIND_COLOR[r.kind]}`}>
                  {r.kind}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
