import { useEffect } from "react";

export default function SettingsPanel({
  onClose,
  themes,
  theme,
  setTheme,
  actions, // { palette, terminal, copilot, resume, fullscreen }
}) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const QUICK = [
    { label: "Command Palette", hint: "Ctrl+P", icon: "⌘", run: actions.palette },
    { label: "Toggle Terminal", hint: "Ctrl+`", icon: "▶", run: actions.terminal },
    { label: "Copilot Chat", hint: "AI", icon: "✦", run: actions.copilot },
    { label: "Download Resume", hint: "PDF", icon: "⤓", run: actions.resume },
    { label: "Toggle Fullscreen", hint: "F11", icon: "⛶", run: actions.fullscreen },
  ];

  const KEYS = [
    ["Ctrl + P", "Command palette / search files"],
    ["Ctrl + B", "Toggle explorer sidebar"],
    ["Ctrl + `", "Toggle integrated terminal"],
    ["Esc", "Close panels & dialogs"],
    ["F11", "Toggle fullscreen"],
  ];

  return (
    <>
      <div className="fixed inset-0 z-[60]" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-label="Settings"
        className="fixed left-14 bottom-10 z-[70] w-[min(360px,calc(100vw-24px))] max-h-[calc(100dvh-60px)] flex flex-col bg-vscode-bg2 border border-vscode-border rounded-lg shadow-2xl anim-fade-in"
      >
        <header className="flex items-center justify-between px-4 py-2.5 border-b border-vscode-border flex-shrink-0">
          <span className="text-[12px] font-semibold text-vscode-bright flex items-center gap-2">
            <span aria-hidden="true">⚙</span> Settings
          </span>
          <button onClick={onClose} aria-label="Close settings" className="text-vscode-dim hover:text-vscode-text">
            ✕
          </button>
        </header>

        <div className="overflow-y-auto px-4 py-3">
          {/* Themes */}
          <p className="text-[10px] uppercase tracking-widest text-vscode-dim mb-2">Color Theme</p>
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded border text-[11px] transition-colors ${
                  t.id === theme
                    ? "border-vscode-blue2 bg-vscode-blue2/15 text-vscode-bright"
                    : "border-vscode-border bg-white/[0.02] text-vscode-text hover:border-vscode-blue2/50 hover:bg-white/[0.05]"
                }`}
                aria-pressed={t.id === theme}
              >
                <span className="w-3 h-3 rounded-full flex-shrink-0 border border-white/10" style={{ background: t.dot }} />
                <span className="truncate">{t.name}</span>
                {t.id === theme && <span className="ml-auto text-vscode-blue">✓</span>}
              </button>
            ))}
          </div>

          {/* Quick actions */}
          <p className="text-[10px] uppercase tracking-widest text-vscode-dim mb-2">Quick Actions</p>
          <div className="flex flex-col gap-1 mb-4">
            {QUICK.map((a) => (
              <button
                key={a.label}
                onClick={() => {
                  a.run();
                  onClose();
                }}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded border border-vscode-border bg-white/[0.02] text-[12px] text-vscode-text hover:border-vscode-purple/60 hover:bg-vscode-purple/10 hover:text-vscode-bright transition-all"
              >
                <span className="w-5 text-center text-vscode-purple" aria-hidden="true">{a.icon}</span>
                {a.label}
                <span className="ml-auto text-[10px] text-vscode-dim bg-white/[0.06] border border-vscode-border rounded px-1.5 py-[1px]">
                  {a.hint}
                </span>
              </button>
            ))}
          </div>

          {/* Shortcuts */}
          <p className="text-[10px] uppercase tracking-widest text-vscode-dim mb-2">Keyboard Shortcuts</p>
          <div className="border border-vscode-border rounded overflow-hidden mb-4">
            {KEYS.map(([k, d], i) => (
              <div
                key={k}
                className={`flex items-center justify-between px-2.5 py-1.5 text-[11px] ${i % 2 ? "bg-white/[0.02]" : ""}`}
              >
                <span className="text-vscode-dim">{d}</span>
                <kbd className="bg-white/[0.08] border border-vscode-border rounded px-1.5 py-[1px] text-vscode-bright font-mono text-[10px]">
                  {k}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        <footer className="px-4 py-2 border-t border-vscode-border text-[10px] text-vscode-dim flex items-center justify-between flex-shrink-0">
          <span>portfolio v1.0 · VS Code UI</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" aria-hidden="true" />
            online
          </span>
        </footer>
      </div>
    </>
  );
}
