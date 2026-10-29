import { useEffect, useRef, useState } from "react";

const STEPS = ["Initializing Portfolio...", "Loading Projects...", "Starting AI Copilot..."];

export default function Preloader({ onDone }) {
  const [done, setDone] = useState([]);      // completed lines
  const [chars, setChars] = useState(0);     // chars of current line
  const [pct, setPct] = useState(0);
  const [exit, setExit] = useState(false);
  const alive = useRef(true);
  const doneCb = useRef(onDone);
  doneCb.current = onDone;

  useEffect(() => {
    alive.current = true;
    const onDone = () => doneCb.current?.();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      setPct(100);
      setDone([...STEPS]);
      setChars(0);
      setTimeout(() => setExit(true), reduced ? 0 : 250);
      setTimeout(() => alive.current && onDone(), reduced ? 0 : 750);
    };

    if (reduced) {
      finish();
      return () => { cancelled = true; };
    }

    (async () => {
      for (let i = 0; i < STEPS.length; i++) {
        for (let c = 1; c <= STEPS[i].length; c++) {
          if (cancelled) return;
          setChars(c);
          setPct(Math.round(((i + c / STEPS[i].length) / STEPS.length) * 99));
          await new Promise((r) => setTimeout(r, 30));
        }
        if (cancelled) return;
        setDone(STEPS.slice(0, i + 1));
        setChars(0);
        await new Promise((r) => setTimeout(r, 160));
      }
      finish();
    })();

    return () => { cancelled = true; alive.current = false; };
  }, []);

  const current = done.length < STEPS.length ? STEPS[done.length] : "";
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-vscode-bg transition-all duration-500 ${
        exit ? "opacity-0 scale-[1.04] pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="w-[min(420px,86vw)] font-mono">
        <div className="flex items-center gap-1.5 mb-4" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
          <span className="ml-2 text-[11px] text-vscode-dim tracking-widest">BOOT — devansh@portfolio</span>
        </div>
        <div className="text-[13px] leading-7 min-h-[84px]">
          {done.map((s) => (
            <p key={s} className="text-vscode-green">
              <span className="text-vscode-dim">$</span> {s} <span className="text-vscode-dim">✓</span>
            </p>
          ))}
          {current && (
            <p className="text-vscode-bright">
              <span className="text-vscode-green">$</span> {current.slice(0, chars)}
              <span className="anim-blink text-vscode-blue2">▊</span>
            </p>
          )}
        </div>
        <div className="mt-4 h-[5px] rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-150 ease-out"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, var(--blue2), var(--pink))",
              boxShadow: "0 0 10px var(--pink)",
            }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-vscode-dim">
          <span>booting ide…</span>
          <span className="text-vscode-bright">{pct}%</span>
        </div>
      </div>
    </div>
  );
}
