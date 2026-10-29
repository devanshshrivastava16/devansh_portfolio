// Small inline SVG icon set (VS Code / simple-icons equivalents, hand-drawn paths)

export function FileIcon({ type, className = "w-4 h-4" }) {
  const c = className;
  switch (type) {
    case "tsx":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="1.6" fill="#61dafb" />
          <ellipse cx="8" cy="8" rx="6.8" ry="2.7" stroke="#61dafb" strokeWidth="0.9" />
          <ellipse cx="8" cy="8" rx="6.8" ry="2.7" stroke="#61dafb" strokeWidth="0.9" transform="rotate(60 8 8)" />
          <ellipse cx="8" cy="8" rx="6.8" ry="2.7" stroke="#61dafb" strokeWidth="0.9" transform="rotate(120 8 8)" />
        </svg>
      );
    case "html":
      return (
        <svg className={c} viewBox="0 0 16 16" aria-hidden="true">
          <path d="M2 1h12l-1.1 12.5L8 15l-4.9-1.5L2 1z" fill="#e44d26" />
          <path d="M8 2.5v11l4-1.2L12.9 2.5H8z" fill="#f16529" />
          <path d="M4.5 4.5h7l-.2 2H6.5l.1 2h4.5l-.4 3.5-2.7.8-2.7-.8-.2-2h2l.1 1 1 .3.9-.3.1-1H5l-.5-5.5z" fill="#fff" />
        </svg>
      );
    case "js":
      return (
        <svg className={c} viewBox="0 0 16 16" aria-hidden="true">
          <rect width="16" height="16" rx="2" fill="#f7df1e" />
          <text x="8" y="12" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#000" fontFamily="monospace">JS</text>
        </svg>
      );
    case "json":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6.2 2.2C4.4 2.2 4.7 5 4.7 5.8c0 .9-.6 1.4-1.5 1.7.9.3 1.5.8 1.5 1.7 0 .8-.3 3.6 1.5 3.6" stroke="#f1c40f" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M9.8 2.2c1.8 0 1.5 2.8 1.5 3.6 0 .9.6 1.4 1.5 1.7-.9.3-1.5.8-1.5 1.7 0 .8.3 3.6-1.5 3.6" stroke="#f1c40f" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      );
    case "ts":
      return (
        <svg className={c} viewBox="0 0 16 16" aria-hidden="true">
          <rect width="16" height="16" rx="2" fill="#3178c6" />
          <text x="8" y="12" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff" fontFamily="monospace">TS</text>
        </svg>
      );
    case "css":
      return (
        <svg className={c} viewBox="0 0 16 16" aria-hidden="true">
          <rect width="16" height="16" rx="2" fill="#3178c6" />
          <text x="8" y="12" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff" fontFamily="monospace">#</text>
        </svg>
      );
    case "md":
      return (
        <svg className={c} viewBox="0 0 16 16" aria-hidden="true">
          <rect width="16" height="16" rx="2" fill="#333" stroke="#ccc" strokeWidth="0.8" />
          <path d="M2.5 11V5h1.7L6 7.5 7.8 5h1.7v6H7.8V7.8L6 10 4.2 7.8V11H2.5zm10 0L10 8.5h1.7V5h1.6v3.5H15L12.5 11z" fill="#ccc" />
        </svg>
      );
    case "pdf":
      return (
        <svg className={c} viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 1h7l3 3v11H3V1z" fill="#f44747" />
          <path d="M10 1l3 3h-3V1z" fill="#ff8a8a" />
          <text x="8" y="12.5" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#fff" fontFamily="monospace">PDF</text>
        </svg>
      );
    default:
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 1.5h5.5L13 5v9.5H4v-13z" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
  }
}

export function IconGitHub({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.66.41.36.78 1.06.78 2.14v3.17c0 .3.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export function IconLinkedIn({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function IconLeetCode({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M13.5 3 6 10.5a2.1 2.1 0 0 0 0 3l7.5 7.5" />
      <path d="M9.5 12H21" />
      <path d="M14 7h5.5" />
      <path d="M14 17h5.5" />
    </svg>
  );
}

export function IconMail({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

export function IconGlobe({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
    </svg>
  );
}

export function SocialIcon({ label, className }) {
  switch ((label || "").toLowerCase()) {
    case "github": return <IconGitHub className={className} />;
    case "linkedin": return <IconLinkedIn className={className} />;
    case "leetcode": return <IconLeetCode className={className} />;
    case "email": return <IconMail className={className} />;
    case "portfolio": return <IconGlobe className={className} />;
    default: return null;
  }
}
