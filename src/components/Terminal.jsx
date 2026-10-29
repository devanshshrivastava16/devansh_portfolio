import { useEffect, useRef, useState } from "react";
import { FILES } from "../data/files.js";
import { profile } from "../data/content.js";

// virtual filesystem built from the explorer files
const TREE = { dirs: { src: {}, data: {} }, files: ["README.md"] };
FILES.forEach((f) => {
  if (f.folder) TREE.dirs[f.folder].files = [...(TREE.dirs[f.folder].files || []), f.name];
  else if (!TREE.files.includes(f.name)) TREE.files.push(f.name);
});

const GIT_LOG = [
  { hash: "a3f9c21", msg: "feat: add VIKAS RAG assistant with pgvector semantic search", when: "2 weeks ago" },
  { hash: "7d2e480", msg: "perf: cut API latency 60% with Redis caching", when: "3 weeks ago" },
  { hash: "91bc0f7", msg: "feat: TrustSpace booking workflows + WebSocket chat", when: "1 month ago" },
  { hash: "4c8a1d3", msg: "sec: JWT auth & role-based access via Spring Security", when: "1 month ago" },
  { hash: "e5f60b9", msg: "test: 90%+ validation coverage (JUnit + Postman)", when: "2 months ago" },
  { hash: "initial", msg: "init: hello world — portfolio bootstrapped", when: "2023" },
];

const HELP = [
  "help              show this help",
  "ls                list files in current directory",
  "pwd               print working directory",
  "cd <dir>          change directory (cd .. to go up)",
  "cat <file>        open a file in the editor",
  "open <file>       open a file in the editor",
  "whoami            who is this developer?",
  "echo <text>       print text",
  "date              current date & time",
  "git log           recent commits",
  "python --version  python version",
  "clear             clear the terminal",
];

const PROMPT = "devansh@portfolio";

export default function Terminal({ onClose, openFile, initialCommand }) {
  const [lines, setLines] = useState([
    { type: "dim", text: "Welcome! Type 'help' to see available commands." },
  ]);
  const [cwd, setCwd] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const initialSent = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);
  useEffect(() => {
    if (initialCommand && !initialSent.current) {
      initialSent.current = true;
      run(initialCommand);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCommand]);

  const path = () => (cwd.length ? cwd.join("/") : "~");
  const print = (...out) => setLines((l) => [...l, ...out]);

  function resolveDir(arg) {
    let parts = [...cwd];
    for (const seg of arg.split("/").filter(Boolean)) {
      if (seg === "..") parts.pop();
      else if (seg === ".") continue;
      else parts.push(seg);
    }
    return parts;
  }

  function run(raw) {
    const cmd = raw.trim();
    print({ type: "cmd", text: cmd, cwd: path() });
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setHIdx(-1);
    const [name, ...args] = cmd.split(/\s+/);
    const rest = cmd.slice(name.length).trim();

    switch (name) {
      case "help":
        print(...HELP.map((t) => ({ type: "out", text: t })));
        break;
      case "ls": {
        if (cwd.length === 0)
          print({ type: "out", text: "src/  data/  README.md" });
        else {
          const dir = TREE.dirs[cwd[0]];
          print({ type: "out", text: (dir?.files || []).join("  ") || "" });
        }
        break;
      }
      case "pwd":
        print({ type: "out", text: "/portfolio" + (cwd.length ? "/" + cwd.join("/") : "") });
        break;
      case "cd": {
        if (!rest || rest === "~" || rest === "/") { setCwd([]); break; }
        if (rest === "..") { setCwd((c) => c.slice(0, -1)); break; }
        const target = resolveDir(rest);
        const ok =
          target.length <= 1 &&
          (!target.length || Object.keys(TREE.dirs).includes(target[0]));
        if (ok) setCwd(target);
        else print({ type: "err", text: `cd: no such directory: ${rest}` });
        break;
      }
      case "cat":
      case "open": {
        const f = FILES.find(
          (x) => x.name === rest || x.id === rest || x.name === rest?.replace(/^\.\//, "")
        );
        if (!rest) print({ type: "err", text: `${name}: missing file operand` });
        else if (!f) print({ type: "err", text: `${name}: ${rest}: No such file or directory` });
        else {
          openFile(f.id);
          print({ type: "ok", text: `→ opening ${f.name} in editor…` });
        }
        break;
      }
      case "whoami":
        print(
          { type: "ok", text: profile.name },
          { type: "out", text: `${profile.role} · ${profile.location}` },
          { type: "out", text: profile.email },
          { type: "dim", text: profile.github }
        );
        break;
      case "echo":
        print({ type: "out", text: rest });
        break;
      case "date":
        print({ type: "out", text: new Date().toString() });
        break;
      case "git":
        if (rest === "log")
          print(
            ...GIT_LOG.flatMap((c) => [
              { type: "yellow", text: `commit ${c.hash}` },
              { type: "out", text: `Date:   ${c.when}` },
              { type: "out", text: `    ${c.msg}` },
              { type: "blank", text: "" },
            ])
          );
        else print({ type: "err", text: `git: '${rest || "git"}' is not supported here — try 'git log'` });
        break;
      case "python":
        if (rest === "--version" || rest === "-V")
          print({ type: "out", text: "Python 3.12.4" });
        else print({ type: "err", text: "python: only --version is supported here" });
        break;
      case "clear":
        setLines([]);
        return;
      default:
        print({ type: "err", text: `command not found: ${name} — type 'help'` });
    }
  }

  const onKey = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hIdx < history.length - 1) {
        const i = hIdx + 1;
        setHIdx(i);
        setInput(history[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx > 0) {
        const i = hIdx - 1;
        setHIdx(i);
        setInput(history[i]);
      } else {
        setHIdx(-1);
        setInput("");
      }
    }
  };

  return (
    <section
      className="h-52 flex flex-col border-t border-vscode-border bg-vscode-bg flex-shrink-0"
      aria-label="Terminal panel"
    >
      <header className="flex items-center justify-between px-4 h-8 border-b border-vscode-border bg-vscode-bg2 text-[11px] text-vscode-text">
        <span className="uppercase tracking-widest">Terminal</span>
        <button
          onClick={onClose}
          className="text-vscode-dim hover:text-vscode-text px-1"
          aria-label="Close terminal"
        >
          ✕
        </button>
      </header>
      <div
        ref={bodyRef}
        className="flex-1 overflow-y-auto px-4 py-2 text-[12px] leading-[1.7] font-mono"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((l, i) => {
          if (l.type === "cmd")
            return (
              <div key={i}>
                <span className="text-vscode-green">{PROMPT}</span>
                <span className="text-vscode-text">:{l.cwd}$ </span>
                <span className="text-vscode-bright">{l.text}</span>
              </div>
            );
          const cls = {
            out: "text-vscode-text",
            err: "text-vscode-red",
            ok: "text-vscode-green",
            yellow: "text-vscode-yellow",
            dim: "text-vscode-dim",
            blank: "",
          }[l.type] || "text-vscode-text";
          return (
            <div key={i} className={cls} style={{ whiteSpace: "pre-wrap" }}>
              {l.text}
            </div>
          );
        })}
        <div className="flex items-center">
          <span className="text-vscode-green">{PROMPT}</span>
          <span className="text-vscode-text">:{path()}$&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent border-none text-vscode-bright text-[12px] font-mono p-0"
            aria-label="Terminal input"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </section>
  );
}
