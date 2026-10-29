import { projects } from "../data/content.js";
import { Reveal } from "./About.jsx";

export default function Projects() {
  return (
    <div className="px-6 md:px-12 py-12 max-w-[940px]">
      <p className="text-vscode-gcm italic text-[14px] mb-3">
        {"// projects.js : things I've built & shipped"}
      </p>
      <h2 className="font-display text-[30px] font-extrabold text-vscode-bright tracking-tight mb-1">
        Projects
      </h2>
      <p className="text-vscode-dim text-[14px] mb-8">
        {"const projects = [ ...shipped, ...building ]"}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <article className="h-full border border-vscode-border rounded-lg bg-white/[0.02] p-6 hover:border-vscode-dim transition-colors flex flex-col">
              <span className="text-[24px] anim-avatar-float" aria-hidden="true">
                {p.icon}
              </span>
              <div className="flex items-start justify-between gap-3 mt-3">
                <div className={`text-[12px] tracking-[0.15em] font-semibold ${p.color}`}>
                  {p.category.join(" · ")}
                </div>
                {p.links.length > 0 && (
                  <div className="flex gap-1.5 flex-shrink-0">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] px-2 py-0.5 rounded-sm border border-vscode-border text-vscode-blue hover:bg-vscode-blue2/20 transition-all"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <h3 className="font-display text-[18px] font-extrabold text-vscode-bright mt-1.5 leading-snug">
                {p.title}
              </h3>
              <p className="text-[13px] text-vscode-dim leading-[1.8] mt-2.5 flex-1">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-1.5 py-0.5 rounded-sm border border-vscode-border text-vscode-text bg-white/[0.03]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
