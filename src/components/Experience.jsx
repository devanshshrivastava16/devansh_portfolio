import { experience } from "../data/content.js";
import { Reveal } from "./About.jsx";

export default function Experience() {
  return (
    <div className="px-6 md:px-12 py-12 max-w-[940px]">
      <p className="text-vscode-gcm italic text-[14px] mb-3">
        {"// experience.ts - professional journey"}
      </p>
      <h2 className="font-display text-[30px] font-extrabold text-vscode-bright tracking-tight mb-1">
        Experience
      </h2>
      <p className="text-vscode-dim text-[14px] mb-8">{"interface Career extends Timeline {}"}</p>

      <div className="pl-3 border-l border-vscode-border">
        {experience.map((e, i) => (
          <Reveal key={e.role} delay={i * 80}>
            <div className={`relative pl-5 mb-9 ${e.current ? "tl-dot" : "tl-dot-dim"}`}>
              <div className="text-[14px] text-vscode-dim tracking-wide mb-1.5">{e.period}</div>
              <div className="font-display text-[18px] font-extrabold text-vscode-bright mb-0.5">
                {e.role}
              </div>
              <div className="text-[14px] text-vscode-blue mb-2.5">@ {e.company}</div>
              <p className="text-[14px] text-vscode-dim leading-[1.8] mb-3">{e.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {e.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[12px] px-1.5 py-0.5 rounded-sm border border-vscode-blue/25 bg-vscode-blue/[0.08] text-vscode-blue"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
