# Design Specification — VS Code–Themed Portfolio (reverse-engineered from aahanabobade.com)

Reference: https://www.aahanabobade.com/ — a Vite + React + Tailwind single-page app that
renders the entire portfolio as a fake VS Code editor. Navigation = opening "files" in an editor.

## 1. Overall architecture

- Full-viewport grid, no page scroll of the shell; only the editor content area scrolls.
- `.app-grid`: `100vw × 100vh; overflow:hidden; display:grid`
  - `grid-template-rows: 30px 22px 1fr 22px`
  - `grid-template-columns: 48px 220px 1fr`
  - `grid-template-areas: "title title title" / "menu menu menu" / "act side editor" / "status status status"`
  - `transition: grid-template-columns .2s ease`
- Mobile (`app-compact`): switches to flex-column; hamburger + breadcrumb title bar; explorer
  becomes an overlay drawer; AI panel opens full-screen; simplified status bar.
- Stack on reference: Vite + React + Tailwind (arbitrary-value classes) + CSS custom properties.

## 2. Theme system (CSS custom properties on :root)

Default "Aahana Dark":
```
--bg:#1e1e1e; --bg2:#252526; --bg3:#2d2d2d; --bg4:#333333; --title:#1a1a2e;
--border:#3c3c3c; --text:#cccccc; --dim:#777777; --bright:#ffffff;
--blue:#4fc1ff; --blue2:#007acc; --green:#4ec9b0; --gcm:#6a9955; --yellow:#dcdcaa;
--orange:#ce9178; --purple:#c586c0; --pink:#ff6fd8; --red:#f44747
```
Other themes available in a picker: Rosé Pine, Tokyo Night, Catppuccin, Nord, Gruvbox.
Switching rewrites the custom properties (verified: Tokyo Night sets `--bg:#1a1b26` etc.).
A toast ("💜 Theme switched to …") confirms, `toastIn` animation (fade + slide from right).

## 3. Typography

- Base: "JetBrains Mono", monospace — body 16px/24px, weight 400.
- Display: "Syne", sans-serif — headings, weight 800, tight tracking.
  - Home H1: 68px/68px, weight 800, letter-spacing −2.5px; line 1 white, line 2 pink (`<em>`), pink underline bar.
  - Page H2: 35px, weight 800, white.
  - Timeline role titles: Syne 20px/800.
- Comment lines: JetBrains Mono 14px italic `--gcm` (#6a9955).
- Section labels (uppercase): 16px, tracking 0.2em, `--yellow`.

## 4. Shell regions

1. **Title bar** (30px, `--title` #1a1a2e): macOS traffic lights (12px circles #ff5f57/#febc2e/#28c840,
   hover brightness-110), center search pill (max-w-xs, bg white/7%, rounded,
   "🔍 name : portfolio" + kbd chips bg white/10%).
2. **Menu bar** (22px, `--bg3`): File Edit View Go Run Terminal Help Copilot — 12px, px-2 py-0.5,
   rounded, hover bg.
3. **Activity bar** (48px wide, `--bg4` #333, border-r): vertical icons (Explorer, Search, Source
   Control, extensions) 44×44 buttons; active icon white, inactive white/40%.
4. **Explorer sidebar** (220px, `--bg2`): "PORTFOLIO" header (11px, tracking widest, uppercase),
   file tree items (h-7, 13px, icon + name, active row bg white/10% + left blue-2 border).
5. **Tab bar** (35px, `--bg2`): tabs with file-type icon, label; active tab `--bg` + top border
   accent; ✕ close on active.
6. **Breadcrumb** (26px): `name › src › file` (11px, dim; last segment white).
7. **Editor content**: `--bg`, scrollable, content `px-12 py-12 max-w-[940px]`.
   Pane transitions: fadeIn / slideUp (opacity 0→1, translateY 12px→0).
8. **Status bar** (22px, `--blue2` #007acc, white 11px text): left `⚠ 0`, `⎇ main`, site name;
   right Copilot, language, UTF-8, theme picker "▲", live clock.
9. **Copilot panel** (overlay right ~340px, header bg2): avatar circle, greeting, 6 suggestion
   chips (2-col grid), input with send button, disclaimer line. Launch pill in sidebar bottom.

## 5. Page-by-page content anatomy

All pages: green comment line → Syne H2 → dim mono subtitle → section content.

- **home.tsx**: green comment; H1 name (white + pink, pink underline bar); role badge pills;
  typewriter line with blinking cursor; paragraph with blue bold spans; buttons (primary blue,
  ghost bordered); stats row 4 cells; social chip row.
- **about.html**: intro card (bordered, rounded); "CURRENT FOCUS" yellow label + 2-col emoji
  bullet grid; EDUCATION card (school Syne bold, dates right, degree blue, GPA green, coursework
  pills); certifications grid.
- **projects.js**: `const projects = [...]` subtitle; 2-col card grid: emoji, colored uppercase
  category line, Syne title 20px, dim description, tech pills, "Live ↗ / GitHub ↗" pills.
- **skills.json**: JSON subtitle; 2-col categories (yellow uppercase header), skill rows:
  name (13px dim, w-28), 2px track (white/6%), colored fill animated 1.4s ease-out, colored %.
- **experience.ts**: `interface Career extends Timeline {}` subtitle; vertical timeline
  (border-l container): dot 9px circle ring-shadowed (blue2 current, dim past), date dim,
  Syne role 20px, `@ Company` blue, description dim leading-1.8, blue-tinted tech pills.
- **contact.css**: 2-col grid: "FIND ME ON" contact rows (icon box tinted per platform, label
  uppercase colored, value, ↗ arrow); "SEND A MESSAGE" form with comment-style labels,
  mono inputs (placeholder "string"), blue `→ send_message()` submit, footnote.
- **README.md**: rendered-markdown style: Syne H1, hr, role line, colored language badges,
  About section, Stack rows (label + orange pills), links list, sign-off comment.

## 6. Interactions

- File click → opens tab + pane transition (fadeIn/slideUp ~350ms); multiple tabs stay open.
- Theme picker in status bar → popup menu, swatch + name, ✓ on active; CSS vars swap + toast.
- Typewriter on home with blinking block cursor.
- Skill bars animate width on mount (1400ms ease-out).
- Reveal-on-scroll fade/slide for cards.
- Copilot panel: chips send prompts, answers formatted with bold, typing indicator.
- Live clock in status bar. Hover transitions 0.2–0.3s throughout.

## 7. Keyframes

```
blink { 50% { opacity: 0 } }
fadeIn { from { opacity: 0 } }
slideUp { from { opacity:0; transform: translateY(12px) } }
toastIn { from { opacity:0; transform: translate(16px) } }
avatarFloat { 50% { transform: translateY(-8px) } }
```

## 8. Responsive behavior (verified at 375×812)

- Below 768px the grid switches to compact flex-column: hamburger ☰ + `~/ <file>` title bar;
  tab bar hidden; explorer becomes overlay drawer; AI panel full-width; status bar simplified;
  H1 fluid clamp(34px, 9.5vw, 68px); content stacks single-column.

## 9. Asset inventory

- No photographic assets; icons are inline SVGs (reimplemented).
- All personal content replaced with Devansh's real data.

## 10. Deviations

See README.md "Deviations from the reference" — offline chat, mailto form, resume PDF and
project/LinkedIn links pending assets, supported-metrics-only stats row.
