import { useCallback, useEffect, useState } from "react";
import { FILES } from "./data/files.js";
import { profile } from "./data/content.js";
import { useClock, useIsCompact } from "./hooks/useShell.js";
import { FileIcon, IconGitHub } from "./components/Icons.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";
import Readme from "./components/Readme.jsx";
import CopilotPanel from "./components/CopilotPanel.jsx";
import Terminal from "./components/Terminal.jsx";
import SearchPalette from "./components/SearchPalette.jsx";
import SettingsPanel from "./components/SettingsPanel.jsx";
import Preloader from "./components/Preloader.jsx";

const PAGES = {
  home: Home,
  about: About,
  projects: Projects,
  skills: Skills,
  experience: Experience,
  contact: Contact,
  readme: Readme,
};

const THEMES = [
  { id: "default", name: "Devansh Dark", dot: "#ff6fd8" },
  { id: "rose-pine", name: "Rosé Pine", dot: "#ebbcba" },
  { id: "tokyo-night", name: "Tokyo Night", dot: "#7aa2f7" },
  { id: "catppuccin", name: "Catppuccin", dot: "#f5c2e7" },
  { id: "nord", name: "Nord", dot: "#88c0d0" },
  { id: "gruvbox", name: "Gruvbox", dot: "#fabd2f" },
];

export default function App() {
  const compact = useIsCompact();
  const clock = useClock();
  const [openTabs, setOpenTabs] = useState(["home"]);
  const [active, setActive] = useState("home");
  const [theme, setTheme] = useState("default");
  const [themeOpen, setThemeOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalCmd, setTerminalCmd] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menu, setMenu] = useState(null); // "file" | "edit" | "view" | "go" | "help"
  const toggleMenu = (name) => setMenu((m) => (m === name ? null : name));
  const [zoom, setZoom] = useState(1);
  const [booted, setBooted] = useState(() => sessionStorage.getItem("booted") === "1");

  useEffect(() => {
    if (booted) sessionStorage.setItem("booted", "1");
  }, [booted]);

  // staggered entrance once the preloader finishes
  useEffect(() => {
    if (!booted) return;
    document.body.classList.add("booted");
    return () => document.body.classList.remove("booted");
  }, [booted]);

  useEffect(() => {
    document.documentElement.style.setProperty("--ui-zoom", zoom);
  }, [zoom]);
  const zoomIn = () => setZoom((z) => Math.min(1.4, +(z + 0.1).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(0.7, +(z - 0.1).toFixed(2)));
  const zoomReset = () => setZoom(1);
  const [recents, setRecents] = useState([]);

  const RESUME_PATH = "/resume/Devansh_Shrivastava_Resume.pdf";

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen().catch(() => {});
  };

  const toast = useCallback((text) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // home-page buttons dispatch this event to open files
  useEffect(() => {
    const fn = (e) => openTab(e.detail);
    window.addEventListener("open-file", fn);
    return () => window.removeEventListener("open-file", fn);
  }, []);

  const openTerminal = (cmd) => {
    setTerminalCmd(cmd ?? null);
    setTerminalOpen(true);
  };

  // Edit-menu context helpers: terminal input when open, else page selection
  const termInput = () => document.querySelector('[aria-label="Terminal input"]');
  const selectAllCtx = () => {
    const el = termInput();
    if (el) {
      el.focus();
      el.select();
      toast("🔲 Terminal input selected");
    } else {
      document.activeElement?.select?.() ?? document.getSelection().selectAllChildren(document.body);
      toast("🔲 Selected all content");
    }
  };
  const copyCtx = async () => {
    const sel = document.getSelection().toString();
    const text = sel || termInput()?.value || "";
    if (!text) return toast("📋 Nothing to copy");
    try {
      await navigator.clipboard.writeText(text);
      toast("📋 Copied to clipboard");
    } catch {
      toast("📋 Copy blocked by browser");
    }
  };

  // global shortcuts: Ctrl+P palette, Ctrl+` terminal, Ctrl+B sidebar, F11 fullscreen
  useEffect(() => {
    const fn = (e) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      } else if (mod && e.key === "`") {
        e.preventDefault();
        setTerminalOpen((o) => !o);
      } else if (mod && e.key.toLowerCase() === "b") {
        e.preventDefault();
        if (compact) setDrawerOpen((o) => !o);
        else setSideOpen((o) => !o);
      } else if (mod && e.key.toLowerCase() === "t") {
        e.preventDefault();
        newTab();
      } else if (mod && e.key.toLowerCase() === "w") {
        e.preventDefault();
        closeTabById(active);
      } else if (mod && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        setCopilotOpen((o) => !o);
      } else if (mod && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (mod && e.key.toLowerCase() === "a" && terminalOpen) {
        e.preventDefault();
        termInput()?.select();
      } else if (mod && e.key.toLowerCase() === "c" && terminalOpen) {
        e.preventDefault();
        copyCtx();
      } else if (mod && (e.key === "+" || e.key === "=")) {
        e.preventDefault();
        zoomIn();
      } else if (mod && e.key === "-") {
        e.preventDefault();
        zoomOut();
      } else if (mod && e.key === "0") {
        e.preventDefault();
        zoomReset();
      } else if (e.key === "F11") {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [compact, terminalOpen, copyCtx]);

  // Esc closes the copilot panel (settings/palette handle Esc themselves)
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && setCopilotOpen(false);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const openTab = (id) => {
    if (id === "resume") {
      const w = window.open(RESUME_PATH, "_blank", "noopener");
      if (!w) window.location.href = RESUME_PATH; // popup blocked → open in place
      setDrawerOpen(false);
      return;
    }
    setOpenTabs((t) => (t.includes(id) ? t : [...t, id]));
    setActive(id);
    setRecents((r) => [id, ...r.filter((x) => x !== id)].slice(0, 6));
    setDrawerOpen(false);
  };

  const closeTabById = (id) => {
    setOpenTabs((tabs) => {
      const next = tabs.filter((t) => t !== id);
      if (next.length === 0) {
        setOpenTabs(["home"]);
        setActive("home");
        return ["home"];
      }
      if (active === id) setActive(next[next.length - 1]);
      return next;
    });
  };

  const newTab = () => {
    const next = FILES.find((f) => !openTabs.includes(f.id));
    if (next) openTab(next.id);
    else toast("🧩 All tabs are already open");
  };

  const closeAllTabs = () => {
    setOpenTabs(["home"]);
    setActive("home");
  };

  const closeTab = (e, id) => {
    e.stopPropagation();
    closeTabById(id);
  };

  const ActivePage = PAGES[active];
  const activeFile = FILES.find((f) => f.id === active);

  return (
    <div className={`${compact ? "app-compact" : "app-grid"} ${!compact && !sideOpen ? "side-closed" : ""} bg-vscode-bg`}>
      {!booted && <Preloader onDone={() => setBooted(true)} />}
      {/* ── Title bar ─────────────────────────────── */}
      <header
        className="bg-vscode-title border-b border-vscode-border flex items-center gap-2 px-3"
        style={compact ? {} : { gridArea: "title" }}
      >
        {compact ? (
          <>
            <button
              className="text-vscode-text p-1"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open explorer"
            >
              ☰
            </button>
            <span className="text-[12px] text-vscode-dim">~/</span>
            <span className="text-[12px] text-vscode-pink">{active}</span>
          </>
        ) : (
          <>
            <TrafficLights />
            <span className="text-[10px] text-white/50 ml-2">DEVANSH — PORTFOLIO</span>
          </>
        )}
        {!compact && (
          <button
            onClick={() => setSearchOpen(true)}
            className="flex-1 max-w-xs mx-auto flex items-center justify-center gap-2 bg-white/[0.07] hover:bg-white/[0.1] transition-colors rounded h-6 text-[11px] text-vscode-dim"
          >
            <span aria-hidden="true">🔍</span> devansh-shrivastava : portfolio
            <span className="flex gap-1">
              <kbd className="bg-white/10 px-1 py-[1px] rounded text-[10px]">Ctrl</kbd>
              <kbd className="bg-white/10 px-1 py-[1px] rounded text-[10px]">P</kbd>
            </span>
          </button>
        )}
        {compact && (
          <button
            className="text-vscode-purple p-1"
            onClick={() => setCopilotOpen(true)}
            aria-label="Open AI assistant"
          >
            ✦
          </button>
        )}
      </header>

      {/* ── Menu bar ──────────────────────────────── */}
      {!compact && (
        <nav className="relative z-[57] bg-vscode-bg3 border-b border-vscode-border flex items-center gap-0.5 px-2 text-[12px] text-vscode-text">
          <div className="relative">
            <button
              onClick={() => toggleMenu("file")}
              aria-haspopup="menu"
              aria-expanded={menu === "file"}
              className={`px-2 py-0.5 rounded transition-colors ${menu === "file" ? "bg-white/15 text-vscode-bright" : "hover:bg-white/10"}`}
            >
              File
            </button>
            {menu === "file" && (
              <FileMenu
                onClose={() => setMenu(null)}
                recents={recents}
                onOpen={openTab}
                onNewTab={newTab}
                onOpenPalette={() => setSearchOpen(true)}
                onCloseTab={() => closeTabById(active)}
                onCloseAll={closeAllTabs}
                onResume={() => window.open(RESUME_PATH, "_blank", "noopener")}
              />
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => toggleMenu("edit")}
              aria-haspopup="menu"
              aria-expanded={menu === "edit"}
              className={`px-2 py-0.5 rounded transition-colors ${menu === "edit" ? "bg-white/15 text-vscode-bright" : "hover:bg-white/10"}`}
            >
              Edit
            </button>
            {menu === "edit" && (
              <EditMenu
                onClose={() => setMenu(null)}
                onFind={() => setSearchOpen(true)}
                onSelectAll={selectAllCtx}
                onCopy={copyCtx}
              />
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => toggleMenu("view")}
              aria-haspopup="menu"
              aria-expanded={menu === "view"}
              className={`px-2 py-0.5 rounded transition-colors ${menu === "view" ? "bg-white/15 text-vscode-bright" : "hover:bg-white/10"}`}
            >
              View
            </button>
            {menu === "view" && (
              <ViewMenu
                onClose={() => setMenu(null)}
                onPalette={() => setSearchOpen(true)}
                onSidebar={() => (compact ? setDrawerOpen((o) => !o) : setSideOpen((o) => !o))}
                onTerminal={() => setTerminalOpen((o) => !o)}
                onCopilot={() => setCopilotOpen((o) => !o)}
                onFullscreen={toggleFullscreen}
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                onZoomReset={zoomReset}
                zoom={zoom}
              />
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => toggleMenu("go")}
              aria-haspopup="menu"
              aria-expanded={menu === "go"}
              className={`px-2 py-0.5 rounded transition-colors ${menu === "go" ? "bg-white/15 text-vscode-bright" : "hover:bg-white/10"}`}
            >
              Go
            </button>
            {menu === "go" && (
              <GoMenu
                onClose={() => setMenu(null)}
                onOpen={openTab}
                onPalette={() => setSearchOpen(true)}
              />
            )}
          </div>
          {["Run", "Terminal"].map((m) => (
            <button
              key={m}
              onClick={() => {
                if (m === "Terminal") openTerminal();
                else toast(`ℹ️ ${m} menu is decorative in this portfolio`);
              }}
              className="px-2 py-0.5 rounded hover:bg-white/10 transition-colors"
            >
              {m}
            </button>
          ))}
          <div className="relative">
            <button
              onClick={() => toggleMenu("help")}
              aria-haspopup="menu"
              aria-expanded={menu === "help"}
              className={`px-2 py-0.5 rounded transition-colors ${menu === "help" ? "bg-white/15 text-vscode-bright" : "hover:bg-white/10"}`}
            >
              Help
            </button>
            {menu === "help" && (
              <HelpMenu
                onClose={() => setMenu(null)}
                onPalette={() => setSearchOpen(true)}
                onCopilot={() => setCopilotOpen((o) => !o)}
                github={profile.github}
                onAbout={() => {
                  openTab("readme");
                  toast("ℹ️ README — all about this portfolio");
                }}
              />
            )}
          </div>
        </nav>
      )}

      {/* ── Activity bar ──────────────────────────── */}
      {!compact && (
        <div
          className="bg-vscode-bg4 border-r border-vscode-border flex flex-col items-center pt-1"
          style={{ gridArea: "act" }}
        >
          <ActIcon
            label="Explorer"
            active={sideOpen}
            onClick={() => {
              if (compact) setDrawerOpen((o) => !o);
              else setSideOpen((o) => !o);
            }}
          >
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" />
            </svg>
          </ActIcon>
          <ActIcon label="Search" onClick={() => setSearchOpen(true)}>
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </ActIcon>
          <ActIcon label="Source Control" onClick={() => openTerminal("git log")}>
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="8" r="2.5" />
              <path d="M6 8.5v7M18 10.5c0 4-6 3-9 5" />
            </svg>
          </ActIcon>
          <ActIcon label="Gemini Copilot" onClick={() => setCopilotOpen(true)}>
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="currentColor" aria-hidden="true">
              <path d="M12 1.5c.62 3.34 1.9 5.55 4.06 6.9 1.35.84 3.02 1.4 5.44 1.85.62.12.62.38 0 .5-2.42.45-4.09 1-5.44 1.85C13.9 13.95 12.62 16.16 12 19.5c-.62-3.34-1.9-5.55-4.06-6.9-1.35-.84-3.02-1.4-5.44-1.85-.62-.12-.62-.38 0-.5 2.42-.45 4.09-1 5.44-1.85C10.1 7.05 11.38 4.84 12 1.5z" />
            </svg>
          </ActIcon>
          <ActIcon
            label="Download Resume"
            href={RESUME_PATH}
            download="Devansh_Shrivastava_Resume.pdf"
          >
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
          </ActIcon>
          <div className="mt-auto flex flex-col">
            <ActIcon label="Settings" active={settingsOpen} onClick={() => setSettingsOpen((o) => !o)}>
              <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </ActIcon>
          </div>
        </div>
      )}

      {/* ── Explorer sidebar ──────────────────────── */}
      {compact && drawerOpen && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-label="File explorer">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-[260px] bg-vscode-bg2 border-r border-vscode-border flex flex-col anim-fade-in">
            <div className="flex items-center justify-between px-4 h-10 text-[11px] tracking-widest text-vscode-dim">
              EXPLORER
              <button onClick={() => setDrawerOpen(false)} aria-label="Close explorer" className="text-vscode-text">✕</button>
            </div>
            <div className="px-3 py-1 text-[11px] font-semibold text-vscode-dim tracking-wide">
              📁 DEVANSH-SHRIVASTAVA
            </div>
            <div className="flex-1 overflow-y-auto py-1">
              {FILES.map((f) => (
                <FileRow key={f.id} file={f} active={f.id === active} onClick={() => openTab(f.id)} />
              ))}
            </div>
          </div>
        </div>
      )}
      {!compact && sideOpen && (
        <aside
          className="bg-vscode-bg2 border-r border-vscode-border flex flex-col overflow-hidden"
          style={{ gridArea: "side" }}
          aria-label="File explorer"
        >
          <div className="px-4 pt-3 pb-2 text-[11px] tracking-widest text-vscode-dim">PORTFOLIO</div>
          <div className="px-3 py-1 text-[11px] font-semibold text-vscode-dim tracking-wide">
            📁 DEVANSH-SHRIVASTAVA
          </div>
          <div className="py-1 flex-1 overflow-y-auto">
            {FILES.map((f) => (
              <FileRow key={f.id} file={f} active={f.id === active} onClick={() => openTab(f.id)} />
            ))}
          </div>
          <div className="px-3 pt-2 pb-3 mt-auto flex-shrink-0">
            <button
              onClick={() => setCopilotOpen(true)}
              className="w-full flex items-center justify-center gap-2 text-[12px] px-3 py-2 rounded border border-vscode-purple/40 bg-vscode-purple/10 text-vscode-purple hover:bg-vscode-purple/20 transition-all"
            >
              ✦ Devansh's Copilot <span className="text-[10px] opacity-70">AI</span>
            </button>
          </div>
        </aside>
      )}

      {/* ── Editor area ───────────────────────────── */}
      <main
        className="flex flex-col overflow-hidden bg-vscode-bg"
        style={compact ? { flex: 1, minHeight: 0 } : { gridArea: "editor" }}
      >
        {/* tab bar */}
        {!compact && (
          <div className="flex bg-vscode-bg2 border-b border-vscode-border overflow-x-auto flex-shrink-0">
            {openTabs.map((id) => {
              const f = FILES.find((x) => x.id === id);
              const isActive = id === active;
              return (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`group flex items-center gap-1.5 pl-3 pr-2 h-[35px] text-[12px] border-r border-vscode-border flex-shrink-0 transition-colors ${
                    isActive ? "bg-vscode-bg text-vscode-bright border-t-2 border-t-vscode-blue2" : "text-vscode-dim hover:text-vscode-text"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <FileIcon type={f.type} className="w-4 h-4" />
                  {f.name}
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label={`Close ${f.name}`}
                    onClick={(e) => closeTab(e, id)}
                    onKeyDown={(e) => e.key === "Enter" && closeTab(e, id)}
                    className={`ml-1 text-[13px] leading-none ${isActive ? "opacity-80" : "opacity-0 group-hover:opacity-60"}`}
                  >
                    ✕
                  </span>
                </button>
              );
            })}
          </div>
        )}
        {/* breadcrumb */}
        <div className="flex items-center gap-1.5 px-4 h-[26px] text-[11px] text-vscode-dim flex-shrink-0">
          <span>devansh-shrivastava</span>
          {activeFile.folder && (
            <>
              <span>›</span>
              <span>{activeFile.folder}</span>
            </>
          )}
          <span>›</span>
          <span className="text-vscode-bright">{activeFile.name}</span>
        </div>
        {/* content */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <div key={active} className="anim-fade-in h-full">
            <ActivePage />
          </div>
        </div>
        {terminalOpen && (
          <Terminal
            onClose={() => setTerminalOpen(false)}
            openFile={openTab}
            initialCommand={terminalCmd}
          />
        )}
      </main>

      {/* ── Status bar ────────────────────────────── */}
      <footer
        className="bg-vscode-blue2 text-white flex items-center justify-between px-3 text-[11px] z-40"
        style={compact ? { height: 22, flexShrink: 0 } : { gridArea: "status" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex items-center gap-1" aria-hidden="true">⚠ 0</span>
          <span className="flex items-center gap-1" aria-hidden="true">⎇ main</span>
          {!compact && <span className="hidden lg:inline">Devansh's Portfolio</span>}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openTerminal()}
            className="hover:bg-white/15 px-1 rounded transition-colors"
            aria-label="Toggle terminal"
          >
            Terminal
          </button>
          <button
            onClick={() => setCopilotOpen(true)}
            className="hover:bg-white/15 px-1 rounded transition-colors"
          >
            Copilot
          </button>
          {!compact && <span className="hidden md:inline">{activeFile.type.toUpperCase()}</span>}
          <button
            onClick={() => setSearchOpen(true)}
            className="hover:bg-white/15 px-1 rounded transition-colors sm:hidden"
            aria-label="Search portfolio"
          >
            🔍
          </button>
          <span className="hidden sm:inline">UTF-8</span>
          <div className="relative">
            <button
              onClick={() => setThemeOpen((o) => !o)}
              className="flex items-center gap-1 hover:bg-white/15 px-1 rounded transition-colors"
              aria-haspopup="menu"
              aria-expanded={themeOpen}
            >
              🎨 {THEMES.find((t) => t.id === theme).name} ▲
            </button>
            {themeOpen && (
              <div
                role="menu"
                className="absolute bottom-6 right-0 w-44 bg-vscode-bg2 border border-vscode-border rounded shadow-xl py-1 anim-fade-in"
              >
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    role="menuitem"
                    onClick={() => {
                      setTheme(t.id);
                      setThemeOpen(false);
                      toast(`🎨 Theme switched to ${t.name}`);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] text-vscode-text hover:bg-white/10 transition-colors"
                  >
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: t.dot }} />
                    {t.name}
                    {t.id === theme && <span className="ml-auto text-vscode-blue">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span>{clock}</span>
        </div>
      </footer>

      {/* ── Copilot panel ─────────────────────────── */}
      {copilotOpen && <CopilotPanel onClose={() => setCopilotOpen(false)} />}

      {/* ── Settings panel ────────────────────────── */}
      {settingsOpen && (
        <SettingsPanel
          onClose={() => setSettingsOpen(false)}
          themes={THEMES}
          theme={theme}
          setTheme={(id) => {
            setTheme(id);
            toast(`🎨 Theme switched to ${THEMES.find((t) => t.id === id).name}`);
          }}
          actions={{
            palette: () => setSearchOpen(true),
            terminal: () => setTerminalOpen((o) => !o),
            copilot: () => setCopilotOpen(true),
            resume: () => window.open(RESUME_PATH, "_blank", "noopener"),
            fullscreen: toggleFullscreen,
          }}
        />
      )}

      {/* ── Search palette ────────────────────────── */}
      {searchOpen && <SearchPalette onClose={() => setSearchOpen(false)} openFile={openTab} />}

      {/* ── Toasts ────────────────────────────────── */}
      <div className="fixed bottom-8 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="anim-toast-in bg-vscode-bg2 border border-vscode-border rounded px-4 py-2.5 text-[13px] text-vscode-text shadow-xl"
          >
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function FileMenu({ onClose, recents, onOpen, onNewTab, onOpenPalette, onCloseTab, onCloseAll, onResume }) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const run = (fn) => {
    fn();
    onClose();
  };
  const Item = ({ label, hint, onClick, dim }) => (
    <button
      role="menuitem"
      onClick={() => run(onClick)}
      className={`w-full flex items-center justify-between gap-6 px-3 py-1.5 text-[12px] text-left transition-colors ${
        dim ? "text-vscode-dim" : "text-vscode-text"
      } hover:bg-vscode-blue2/30 hover:text-vscode-bright`}
    >
      {label}
      {hint && <span className="text-[10px] text-vscode-dim">{hint}</span>}
    </button>
  );

  return (
    <>
      <div className="fixed inset-0 z-[55]" onClick={onClose} aria-hidden="true" />
      <div
        role="menu"
        aria-label="File menu"
        className="absolute top-full left-0 mt-1 z-[56] w-56 bg-vscode-bg2 border border-vscode-border rounded-md shadow-2xl py-1 anim-fade-in"
      >
        <Item label="New Tab" hint="Ctrl+T" onClick={onNewTab} />
        <Item label="Open File…" hint="Ctrl+P" onClick={onOpenPalette} />
        <div className="my-1 border-t border-vscode-border" />
        <Item label="Close Tab" hint="Ctrl+W" onClick={onCloseTab} />
        <Item label="Close All Tabs" onClick={onCloseAll} />
        <div className="my-1 border-t border-vscode-border" />
        <p className="px-3 py-1 text-[10px] uppercase tracking-widest text-vscode-dim">Open Recent</p>
        {recents.length === 0 ? (
          <p className="px-3 py-1 text-[11px] text-vscode-dim">No recent files</p>
        ) : (
          recents.map((id) => {
            const f = FILES.find((x) => x.id === id);
            return f ? <Item key={id} label={f.name} onClick={() => onOpen(id)} /> : null;
          })
        )}
        <div className="my-1 border-t border-vscode-border" />
        <Item label="Download Resume" onClick={onResume} />
      </div>
    </>
  );
}

function EditMenu({ onClose, onFind, onSelectAll, onCopy }) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  const ITEMS = [
    { icon: "⌕", label: "Find", hint: "Ctrl+F", run: onFind },
    { icon: "▣", label: "Select All", hint: "Ctrl+A", run: onSelectAll },
    { icon: "⧉", label: "Copy", hint: "Ctrl+C", run: onCopy },
  ];
  return (
    <>
      <div className="fixed inset-0 z-[55]" onClick={onClose} aria-hidden="true" />
      <div
        role="menu"
        aria-label="Edit menu"
        className="absolute top-full left-0 mt-1 z-[56] w-56 bg-vscode-bg2 border border-vscode-border rounded-md shadow-2xl py-1 anim-fade-in"
      >
        {ITEMS.map((i) => (
          <button
            key={i.label}
            role="menuitem"
            onClick={() => {
              i.run();
              onClose();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-[12px] text-vscode-text hover:bg-vscode-blue2/30 hover:text-vscode-bright transition-colors"
          >
            <span className="w-4 text-center" aria-hidden="true">{i.icon}</span>
            {i.label}
            <span className="ml-auto text-[10px] text-vscode-dim">{i.hint}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function ViewMenu({ onClose, onPalette, onSidebar, onTerminal, onCopilot, onFullscreen, onZoomIn, onZoomOut, onZoomReset, zoom }) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  const ITEMS = [
    { icon: "⌘", label: "Command Palette", hint: "Ctrl+P", run: onPalette },
    { icon: "▤", label: "Toggle Sidebar", hint: "Ctrl+B", run: onSidebar },
    { icon: "▶", label: "Toggle Terminal", hint: "Ctrl+`", run: onTerminal },
    { icon: "✦", label: "Toggle AI Copilot", hint: "Ctrl+Shift+C", run: onCopilot },
    { icon: "⛶", label: "Enter Full Screen", hint: "F11", run: onFullscreen },
  ];
  const ZOOM = [
    { icon: "＋", label: "Zoom In", hint: "Ctrl++", run: onZoomIn },
    { icon: "－", label: "Zoom Out", hint: "Ctrl+-", run: onZoomOut },
    { icon: "↺", label: "Reset Zoom", hint: `${Math.round(zoom * 100)}%`, run: onZoomReset },
  ];
  const Row = ({ icon, label, hint, run }) => (
    <button
      role="menuitem"
      onClick={() => {
        run();
        onClose();
      }}
      className="w-full flex items-center gap-2.5 px-3 py-1.5 text-[12px] text-vscode-text hover:bg-vscode-blue2/30 hover:text-vscode-bright transition-colors"
    >
      <span className="w-4 text-center text-vscode-dim" aria-hidden="true">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      <span className="text-[10px] text-vscode-dim">{hint}</span>
    </button>
  );
  return (
    <>
      <div className="fixed inset-0 z-[55]" onClick={onClose} aria-hidden="true" />
      <div
        role="menu"
        aria-label="View menu"
        className="absolute top-full left-0 mt-1 z-[56] w-60 bg-vscode-bg2 border border-vscode-border rounded-md shadow-2xl py-1 anim-fade-in"
      >
        {ITEMS.map((i) => <Row key={i.label} {...i} />)}
        <div className="my-1 border-t border-vscode-border" />
        {ZOOM.map((i) => <Row key={i.label} {...i} />)}
      </div>
    </>
  );
}

function GoMenu({ onClose, onOpen, onPalette }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  const files = FILES.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="fixed inset-0 z-[55]" onClick={onClose} aria-hidden="true" />
      <div
        role="menu"
        aria-label="Go menu"
        className="absolute top-full left-0 mt-1 z-[56] w-60 bg-vscode-bg2 border border-vscode-border rounded-md shadow-2xl py-1 anim-fade-in"
      >
        <button
          role="menuitem"
          onClick={() => {
            onPalette();
            onClose();
          }}
          className="w-full flex items-center justify-between px-3 py-2 text-[12px] font-semibold text-vscode-bright hover:bg-vscode-blue2/30 transition-colors"
        >
          Go to File…
          <span className="text-[10px] font-normal text-vscode-dim">Ctrl+P</span>
        </button>
        <div className="px-3 py-1.5 border-t border-vscode-border">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter files…"
            aria-label="Filter files"
            className="w-full bg-vscode-bg border border-vscode-border rounded px-2 py-1 text-[11px] text-vscode-text placeholder-vscode-dim focus:border-vscode-blue2"
          />
        </div>
        <p className="px-3 py-1 text-[10px] uppercase tracking-widest text-vscode-dim">Files</p>
        <div className="max-h-64 overflow-y-auto">
          {files.map((f) => (
            <button
              key={f.id}
              role="menuitem"
              onClick={() => {
                onOpen(f.id);
                onClose();
              }}
              className="w-full text-left px-3 py-1.5 text-[12px] text-vscode-text hover:bg-vscode-blue2/30 hover:text-vscode-bright transition-colors truncate"
            >
              {f.name}
            </button>
          ))}
          {files.length === 0 && <p className="px-3 py-1.5 text-[11px] text-vscode-dim">No matching files</p>}
        </div>
      </div>
    </>
  );
}

function HelpMenu({ onClose, onPalette, onCopilot, github, onAbout }) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const KEYS = [
    ["Ctrl+P", "Go to file"],
    ["Ctrl+B", "Toggle sidebar"],
    ["Ctrl+`", "Toggle terminal"],
    ["Ctrl+Shift+C", "Toggle Copilot ✦"],
    ["Esc", "Close overlay"],
  ];

  return (
    <>
      <div className="fixed inset-0 z-[55]" onClick={onClose} aria-hidden="true" />
      <div
        role="menu"
        aria-label="Help menu"
        className="absolute top-full right-0 mt-1 z-[56] w-64 bg-vscode-bg2 border border-vscode-border rounded-md shadow-2xl py-1 anim-fade-in"
      >
        <button
          role="menuitem"
          onClick={() => {
            onPalette();
            onClose();
          }}
          className="w-full flex items-center justify-between px-3 py-2 text-[12px] font-semibold text-vscode-bright hover:bg-vscode-blue2/30 transition-colors"
        >
          Command Palette
          <span className="text-[10px] font-normal text-vscode-dim">Ctrl+P</span>
        </button>
        <div className="my-1 border-t border-vscode-border" />
        <p className="px-3 py-1 text-[10px] uppercase tracking-widest text-vscode-dim">Keyboard Shortcuts</p>
        {KEYS.map(([k, d]) => (
          <div key={k} className="flex items-center gap-3 px-3 py-1.5">
            <kbd className="bg-white/[0.08] border border-vscode-border rounded px-1.5 py-[2px] text-[10px] text-vscode-bright font-mono whitespace-nowrap">
              {k}
            </kbd>
            <span className="text-[12px] text-vscode-dim">{d}</span>
          </div>
        ))}
        <div className="my-1 border-t border-vscode-border" />
        <a
          role="menuitem"
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 text-[12px] text-vscode-text hover:bg-vscode-blue2/30 hover:text-vscode-bright transition-colors"
        >
          GitHub <span aria-hidden="true" className="text-[10px]">↗</span>
        </a>
        <button
          role="menuitem"
          onClick={() => {
            onAbout();
            onClose();
          }}
          className="w-full text-left px-3 py-2 text-[12px] text-vscode-text hover:bg-vscode-blue2/30 hover:text-vscode-bright transition-colors"
        >
          About
        </button>
      </div>
    </>
  );
}

function TrafficLights() {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      <span className="w-3 h-3 rounded-full hover:brightness-110 transition-all" style={{ background: "#ff5f57" }} />
      <span className="w-3 h-3 rounded-full hover:brightness-110 transition-all" style={{ background: "#febc2e" }} />
      <span className="w-3 h-3 rounded-full hover:brightness-110 transition-all" style={{ background: "#28c840" }} />
    </div>
  );
}

function ActIcon({ label, active, onClick, children, ...rest }) {
  const cls = `w-11 h-11 flex items-center justify-center transition-colors ${
    active ? "text-white border-l-2 border-l-white" : "text-white/40 hover:text-white/80"
  }`;
  if (rest.href) {
    return (
      <a {...rest} onClick={onClick} aria-label={label} title={label} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cls}
    >
      {children}
    </button>
  );
}

function FileRow({ file, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 pl-6 pr-3 h-7 text-[13px] text-left transition-colors ${
        active
          ? "bg-white/10 text-vscode-bright border-l-2 border-l-vscode-blue2"
          : "text-vscode-text hover:bg-white/[0.06]"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <FileIcon type={file.type} className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">{file.name}</span>
    </button>
  );
}
