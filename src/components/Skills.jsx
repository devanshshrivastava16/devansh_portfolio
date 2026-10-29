import { useEffect, useRef, useState } from "react";
import { skillCategories, alsoTags } from "../data/content.js";
import { Reveal } from "./About.jsx";

function SkillBar({ skill, animate }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setW(skill.pct), 100);
    return () => clearTimeout(t);
  }, [animate, skill.pct]);
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="w-28 text-[13px] text-vscode-dim flex-shrink-0">{skill.name}</span>
      <div className="flex-1 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-[1400ms] ease-out"
          style={{ width: animate ? `${w}%` : "0%", backgroundColor: skill.color }}
        />
      </div>
      <span className="w-8 text-right text-[13px] flex-shrink-0" style={{ color: skill.color }}>
        {skill.pct}%
      </span>
    </div>
  );
}

export default function Skills() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="px-6 md:px-12 py-12 max-w-[940px]">
      <p className="text-vscode-gcm italic text-[14px] mb-3">
        {"// skills.json — tech stack & tools I actually use"}
      </p>
      <h2 className="font-display text-[30px] font-extrabold text-vscode-bright tracking-tight mb-1">
        Skills
      </h2>
      <p className="text-vscode-dim text-[14px] mb-8">
        {'{ "status": "always_learning", "passion": "immeasurable" }'}
      </p>

      <div className="grid md:grid-cols-2 gap-x-10">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.name} delay={i * 60} className="mb-8">
            <div className="text-[14px] uppercase tracking-[0.2em] text-vscode-yellow mb-4">
              {cat.name}
            </div>
            {cat.skills.map((s) => (
              <SkillBar key={s.name} skill={s} animate={animate} />
            ))}
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="text-[14px] uppercase tracking-[0.2em] text-vscode-yellow mb-4">
          Also working with
        </div>
        <div className="flex flex-wrap gap-2">
          {alsoTags.map((t) => (
            <span
              key={t}
              className="text-[12px] px-2.5 py-1 rounded-full border border-vscode-border text-vscode-text bg-white/[0.03]"
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
