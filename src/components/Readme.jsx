import { profile, readmeBadges, readmeStack } from "../data/content.js";
import { Reveal } from "./About.jsx";

export default function Readme() {
  return (
    <div className="px-6 md:px-12 py-12 max-w-[940px]">
      <Reveal>
        <h1 className="font-display text-[32px] font-extrabold text-vscode-bright tracking-tight">
          Devansh Shrivastava
        </h1>
        <hr className="border-vscode-border my-4" />
        <p className="text-[14px] text-vscode-text">
          {profile.role} · {profile.location} · {profile.locationCode}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {readmeBadges.map((b) => (
            <span
              key={b.label}
              className="flex items-center gap-1.5 text-[12px] px-2.5 py-1 rounded border"
              style={{ color: b.color, borderColor: `${b.color}55`, backgroundColor: `${b.color}11` }}
            >
              <span aria-hidden="true">{b.icon}</span>
              {b.label}
            </span>
          ))}
        </div>

        <h2 className="font-display text-[19px] font-extrabold text-vscode-bright mt-8 mb-3">
          <span className="text-vscode-purple mr-2" aria-hidden="true">💜</span>About
        </h2>
        <p className="text-[14px] text-vscode-dim leading-[1.9]">{profile.summary}</p>

        <h2 className="font-display text-[22px] font-extrabold text-vscode-bright mt-10 mb-3">
          Stack
        </h2>
        <div className="flex flex-col gap-2.5">
          {readmeStack.map((row) => (
            <div key={row.label} className="flex flex-wrap items-center gap-2 text-[13px]">
              <span className="text-vscode-bright font-semibold">{row.label}</span>
              {row.items.map((it) => (
                <span
                  key={it}
                  className="text-vscode-orange px-1.5 py-0.5 rounded bg-white/[0.04] border border-vscode-border"
                >
                  {it}
                </span>
              ))}
            </div>
          ))}
        </div>

        <h2 className="font-display text-[19px] font-extrabold text-vscode-bright mt-10 mb-3">
          <span className="text-vscode-pink mr-2" aria-hidden="true">🔗</span>Links
        </h2>
        <ul className="text-[13px] leading-[2]">
          <li>
            <span className="text-vscode-gcm">-</span> GitHub:{" "}
            <a className="text-vscode-blue hover:underline" href={profile.github} target="_blank" rel="noreferrer">
              github.com/devanshshrivastava16
            </a>
          </li>
          <li>
            <span className="text-vscode-gcm">-</span> LeetCode:{" "}
            <a className="text-vscode-blue hover:underline" href={profile.leetcode} target="_blank" rel="noreferrer">
              leetcode.com/u/phenom_devansh
            </a>
          </li>
          <li>
            <span className="text-vscode-gcm">-</span> Email:{" "}
            <a className="text-vscode-blue hover:underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </li>
        </ul>

        <p className="text-vscode-gcm italic text-[13px] mt-10">
          {"// Thanks for scrolling all the way here — happy to connect!"}
        </p>
      </Reveal>
    </div>
  );
}
