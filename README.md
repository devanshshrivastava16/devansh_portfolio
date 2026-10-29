# Devansh Shrivastava — VS Code Portfolio

A personal portfolio that reproduces the VS Code editor experience of
[aahanabobade.com](https://www.aahanabobade.com/) with Devansh Shrivastava's real content.
Navigation works like opening files in an editor: `home.tsx`, `about.html`, `projects.js`,
`skills.json`, `experience.ts`, `contact.css`, `README.md`.

Built with **React 19 + Vite + Tailwind CSS 4** — no other runtime dependencies.

## Setup

```bash
npm install
npm run dev        # http://localhost:5173
```

## Production build & deploy

```bash
npm run build      # outputs static site to dist/
npm run preview    # serve the production build locally
```

Deploy `dist/` to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages).
For Vercel: framework preset "Vite", build command `npm run build`, output `dist`.

## Features

- Full VS Code shell: title bar, menu bar, activity bar, explorer, editor tabs, breadcrumbs,
  status bar with live clock
- 6 switchable themes (Devansh Dark, Rosé Pine, Tokyo Night, Catppuccin, Nord, Gruvbox) via
  CSS custom properties + toast confirmation
- Editor-style pages: hero with typewriter, about cards, project card grid, animated skill
  bars, timeline experience, contact cards + message form, README profile page
- "Copilot" AI-style chat panel — Gemini API backend (`server/`) with a 3-messages-per-device
  daily limit; falls back to a local rule-based knowledge base when the server is off/unconfigured
- Working terminal (menu bar → Terminal, or status bar): `help`, `ls`, `pwd`, `cd`, `cat`/`open`,
  `whoami`, `echo`, `date`, `git log`, `python --version`, `clear` — simulated safely, `cat`/`open`
  opens the file in the editor
- Search palette (Ctrl+P, title-bar search pill, activity-bar Search icon, status bar 🔍):
  finds files, projects, skills, experience, certifications and links, with keyboard navigation
- Responsive: desktop grid collapses to a compact mobile layout with explorer drawer
- Semantic HTML, aria labels on icon buttons, single h1, keyboard-reachable controls

## AI server (optional)

```bash
cd server
cp .env.example .env    # add your GEMINI_API_KEY
npm install
npm start               # http://localhost:3001 — the Vite dev server proxies /api to it
```

Without a key/server the chat panel automatically falls back to local answers. The device
identifier is a random id in localStorage sent as `x-device-id`; the server tracks a persistent
per-device, per-day count in `server/rate-limits.json` and returns HTTP 429 with a clear message
once the limit is reached.

## Content sources

All personal information comes from Devansh's resume/brief: projects (TrustSpace, VIKAS,
Microservices User & Contact Management), OccultHouse internship, Amity University education,
HackerRank/MongoDB/Postman certifications, GitHub (`devanshshrivastava16`) and LeetCode
(`phenom_devansh`) profiles. No invented achievements.

## Deviations from the reference (deliberate, documented)

1. **AI chat is offline.** The reference calls a hosted LLM with a message quota; this version
   answers from a local rule-based knowledge base (`src/components/CopilotPanel.jsx`) so the
   site needs no API keys or paid services. UI (chips, typing indicator, panel) matches.
2. **Contact form opens a mail client.** The reference uses Formspree. Without a form ID the
   form composes a pre-filled email to devanshshri16@gmail.com. To use Formspree instead,
   swap the `submit` handler in `src/components/Contact.jsx` for a POST to
   `https://formspree.io/f/<your-id>`.
3. **Resume download button omitted.** The reference has a resume PDF in the explorer; no PDF
   was provided. Add `public/Devansh_Shrivastava_Resume.pdf` and a row in
   `src/data/files.js` to restore it.
4. **Project links omitted until provided.** Card "Live ↗ / GitHub ↗" pill links render
   automatically when entries in `src/data/content.js` get `links: [{ label, href }]`.
5. **LinkedIn omitted.** No LinkedIn URL was provided. Add it to `socials` in
   `src/data/content.js` when available.
6. **Stats row uses supported figures only** (55+ REST APIs, 3+ projects, CGPA 8.47,
   "Always Learning") — the reference's "3+ Years / 10+ Projects / ∞ Curiosity" would
   overstate experience.
7. Status-bar "branch/remote" items and traffic-light buttons are decorative, as on the
   reference.

## Editing content

All portfolio copy lives in `src/data/content.js` (profile, projects, skills, experience,
certifications, contact links) and `src/data/files.js` (explorer files/tabs). Theme palettes
are in `src/index.css`.

## Structure

```
src/
  App.jsx               # shell: grid, tabs, status bar, theme picker, toasts
  index.css             # Tailwind + theme tokens + keyframes
  data/content.js       # all portfolio content
  data/files.js         # virtual file tree
  hooks/useShell.js     # clock + compact-layout detection
  components/
    Icons.jsx           # inline SVG icon set
    Home.jsx About.jsx Projects.jsx Skills.jsx Experience.jsx Contact.jsx Readme.jsx
    CopilotPanel.jsx    # offline AI-style chat
```
