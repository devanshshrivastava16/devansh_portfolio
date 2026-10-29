export const profile = {
  name: "Devansh Shrivastava",
  firstName: "Devansh",
  lastName: "Shrivastava",
  role: "Full-Stack Java Developer",
  location: "Uttar Pradesh, India",
  locationCode: "IN",
  email: "devanshshri16@gmail.com",
  summary:
    "Full-Stack Java Developer with hands-on experience in Spring Boot, React.js, PostgreSQL, and Microservices. Proficient in building secure RESTful APIs with JWT authentication, designing scalable backend systems, and developing responsive frontends. Passionate about solving real-world problems through clean, efficient, and production-ready code.",
  github: "https://github.com/devanshshrivastava16",
  linkedin: "https://www.linkedin.com/in/devanshshrivastava/",
  leetcode: "https://leetcode.com/u/phenom_devansh/",
  domain: "www.devanshshrivastava.me",
};

export const badges = [
  { dot: "bg-vscode-green", label: "Full-Stack Developer" },
  { dot: "text-vscode-purple", label: "Spring Boot" },
  { dot: "text-vscode-blue", label: "React.js" },
  { dot: "text-vscode-pink", label: "@ OccultHouse" },
];

export const typewriterPhrases = [
  "Building secure RESTful APIs with JWT authentication",
  "Designing scalable microservices backends",
  "Crafting responsive React frontends",
  "Solving real-world problems with production-ready code",
];

export const aboutLines = [
  {
    icon: "☕",
    text: "Building **scalable backend systems** with Spring Boot & Microservices",
  },
  {
    icon: "⚛️",
    text: "Developing **responsive frontends** with React.js & Tailwind CSS",
  },
  {
    icon: "🔐",
    text: "Implementing **JWT authentication** & role-based access control",
  },
  { icon: "🚀", text: "Always learning, always shipping" },
];

export const stats = [
  { icon: "∞", label: "Curiosity" },
  { value: "3+", label: "Projects" },
  { value: "8.47", label: "CGPA" },
  { icon: "↑", label: "Always Learning" },
];

export const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "LeetCode", href: profile.leetcode },
  { label: "Email", href: `mailto:${profile.email}` },
];

export const education = {
  school: "Amity University Madhya Pradesh",
  period: "2023 — Present",
  degree: "B.Tech in Computer Science and Engineering",
  gpa: "CGPA: 8.47",
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
  ],
};

export const projects = [
  {
    icon: "🏛️",
    category: ["FULL STACK", "SECURITY", "REAL-TIME"],
    title: "TrustSpace",
    description:
      "Full-stack venue rental marketplace with end-to-end booking workflows and 55+ RESTful APIs. JWT authentication and role-based access control using Spring Security, supporting 3+ user roles, plus real-time host-renter communication over WebSocket.",
    tags: ["React.js", "Spring Boot", "PostgreSQL", "Spring Security", "JWT", "WebSocket", "REST API"],
    links: [],
    color: "text-vscode-purple",
  },
  {
    icon: "🛍️",
    category: ["AI", "RAG", "SEMANTIC SEARCH"],
    title: "VIKAS",
    description:
      "AI-powered fashion marketplace managing a 3,000+ product catalog. Semantic search with pgvector, a RAG-based conversational assistant for context-aware recommendations, and Redis caching that cut API response latency by 60%. Includes a store pickup reservation system for inventory and checkout workflows.",
    tags: ["React.js", "Spring Boot", "Node.js", "PostgreSQL", "pgvector", "Redis", "RAG"],
    links: [],
    color: "text-vscode-pink",
  },
  {
    icon: "🧩",
    category: ["MICROSERVICES", "SPRING BOOT", "TESTING"],
    title: "Microservices User & Contact Management",
    description:
      "Distributed microservices architecture with 2+ independently deployable services. Eureka service discovery with RestTemplate-based inter-service communication, 15+ REST endpoints secured with Spring Security, and 90%+ API validation coverage using JUnit and Postman.",
    tags: ["Spring Boot", "Eureka", "Spring Data JPA", "H2", "JUnit", "REST API"],
    links: [],
    color: "text-vscode-blue",
  },
];

export const skillCategories = [
  {
    name: "Languages",
    skills: [
      { name: "Java", pct: 90, color: "#ff6fd8" },
      { name: "Python", pct: 80, color: "#f97316" },
      { name: "JavaScript", pct: 82, color: "#facc15" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Spring Boot", pct: 88, color: "#4ade80" },
      { name: "Spring Security", pct: 80, color: "#38bdf8" },
      { name: "REST APIs", pct: 90, color: "#ff6fd8" },
      { name: "Microservices", pct: 78, color: "#f97316" },
      { name: "Node.js", pct: 70, color: "#a855f7" },
      { name: "WebSocket", pct: 74, color: "#22d3ee" },
      { name: "Redis", pct: 72, color: "#facc15" },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React.js", pct: 85, color: "#38bdf8" },
      { name: "HTML", pct: 90, color: "#f97316" },
      { name: "CSS", pct: 85, color: "#4ade80" },
      { name: "Tailwind CSS", pct: 82, color: "#ff6fd8" },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "PostgreSQL", pct: 84, color: "#a855f7" },
      { name: "pgvector", pct: 72, color: "#f97316" },
      { name: "MySQL", pct: 76, color: "#4ade80" },
      { name: "MongoDB", pct: 68, color: "#22d3ee" },
    ],
  },
  {
    name: "Tools & Testing",
    skills: [
      { name: "JUnit", pct: 78, color: "#4ade80" },
      { name: "Git", pct: 85, color: "#f97316" },
      { name: "Maven", pct: 80, color: "#ff6fd8" },
      { name: "Postman", pct: 88, color: "#facc15" },
      { name: "Docker", pct: 70, color: "#38bdf8" },
    ],
  },
  {
    name: "Concepts",
    skills: [
      { name: "DSA", pct: 82, color: "#a855f7" },
      { name: "OOP", pct: 88, color: "#4ade80" },
      { name: "JWT Auth", pct: 85, color: "#ff6fd8" },
      { name: "RAG", pct: 75, color: "#f97316" },
      { name: "Semantic Search", pct: 74, color: "#22d3ee" },
    ],
  },
];

export const alsoTags = [
  "Eureka Service Discovery",
  "Spring Data JPA",
  "Agile",
  "Component-Driven Architecture",
];

export const experience = [
  {
    period: "Jul 2025 — Aug 2025",
    role: "Full-Stack Developer Intern",
    company: "OccultHouse Pvt. Ltd.",
    current: true,
    description:
      "Developed 30+ reusable React.js UI components and integrated RESTful APIs for an e-commerce platform. Improved responsiveness and data flow across the stack. Collaborated in an Agile team using component-driven architecture and modern full-stack practices.",
    tags: ["React.js", "REST APIs", "Tailwind CSS", "Agile", "Component Architecture"],
  },
];

export const certifications = [
  {
    issuer: "HackerRank",
    name: "REST API (Intermediate)",
    color: "text-vscode-green",
  },
  {
    issuer: "HackerRank",
    name: "Java (Basic)",
    color: "text-vscode-green",
  },
  {
    issuer: "MongoDB (Credly)",
    name: "From Relational Model (SQL) to MongoDB's Document Model",
    color: "text-vscode-green",
  },
  {
    issuer: "Postman Academy",
    name: "API Documentation Learning Path",
    color: "text-vscode-green",
  },
];

export const contactMethods = [
  {
    key: "email",
    label: "EMAIL",
    value: "devanshshri16@gmail.com",
    href: "mailto:devanshshri16@gmail.com",
    color: "#4ec9b0",
  },
  {
    key: "github",
    label: "GITHUB",
    value: "github.com/devanshshrivastava16",
    href: "https://github.com/devanshshrivastava16",
    color: "#cccccc",
  },
  {
    key: "linkedin",
    label: "LINKEDIN",
    value: "linkedin.com/in/devanshshrivastava",
    href: "https://www.linkedin.com/in/devanshshrivastava/",
    color: "#0a66c2",
  },
  {
    key: "leetcode",
    label: "LEETCODE",
    value: "leetcode.com/u/phenom_devansh",
    href: "https://leetcode.com/u/phenom_devansh/",
    color: "#dcdcaa",
  },
  {
    key: "portfolio",
    label: "PORTFOLIO",
    value: "devanshshrivastava.me",
    href: "https://www.devanshshrivastava.me",
    color: "#4fc1ff",
  },
];

export const readmeBadges = [
  { icon: "☕", label: "Java", color: "#f97316" },
  { icon: "🌿", label: "Spring Boot", color: "#4ade80" },
  { icon: "⚛️", label: "React.js", color: "#38bdf8" },
  { icon: "🐘", label: "PostgreSQL", color: "#a855f7" },
  { icon: "🐳", label: "Docker", color: "#4fc1ff" },
];

export const readmeStack = [
  { label: "Languages:", items: ["Java", "Python", "JavaScript"] },
  {
    label: "Backend:",
    items: ["Spring Boot", "Spring Security", "REST APIs", "Microservices", "Node.js", "Redis"],
  },
  { label: "Frontend:", items: ["React.js", "HTML", "CSS", "Tailwind CSS"] },
  { label: "Databases:", items: ["PostgreSQL", "pgvector", "MySQL", "MongoDB"] },
  { label: "Tools:", items: ["JUnit", "Git", "Maven", "Postman", "Docker"] },
];
