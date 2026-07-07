export interface Skill {
  name: string;
  icon: string;
  category: string;
  proficiency: number;
}

export const skillCategories = [
  'Languages',
  'Backend',
  'Frontend',
  'Databases',
  'Tools',
] as const;

export const skills: Skill[] = [
  { name: 'Java', icon: 'SiJava', category: 'Languages', proficiency: 85 },
  { name: 'Python', icon: 'SiPython', category: 'Languages', proficiency: 70 },
  { name: 'JavaScript', icon: 'SiJavascript', category: 'Languages', proficiency: 78 },
  { name: 'Spring Boot', icon: 'SiSpring', category: 'Backend', proficiency: 82 },
  { name: 'Spring Security', icon: 'SiSpring', category: 'Backend', proficiency: 75 },
  { name: 'REST APIs', icon: 'SiPostman', category: 'Backend', proficiency: 85 },
  { name: 'Spring Data JPA', icon: 'SiSpring', category: 'Backend', proficiency: 78 },
  { name: 'Microservices', icon: 'FiCloud', category: 'Backend', proficiency: 72 },
  { name: 'WebSocket', icon: 'FiZap', category: 'Backend', proficiency: 68 },
  { name: 'React.js', icon: 'SiReact', category: 'Frontend', proficiency: 75 },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', category: 'Frontend', proficiency: 78 },
  { name: 'HTML/CSS', icon: 'SiHtml5', category: 'Frontend', proficiency: 85 },
  { name: 'PostgreSQL', icon: 'SiPostgresql', category: 'Databases', proficiency: 80 },
  { name: 'MySQL', icon: 'SiMysql', category: 'Databases', proficiency: 75 },
  { name: 'MongoDB', icon: 'SiMongodb', category: 'Databases', proficiency: 70 },
  { name: 'Redis', icon: 'SiRedis', category: 'Databases', proficiency: 65 },
  { name: 'Git', icon: 'SiGit', category: 'Tools', proficiency: 85 },
  { name: 'Maven', icon: 'FiPackage', category: 'Tools', proficiency: 75 },
  { name: 'Postman', icon: 'SiPostman', category: 'Tools', proficiency: 82 },
  { name: 'JUnit', icon: 'SiJunit5', category: 'Tools', proficiency: 78 },
  { name: 'VS Code', icon: 'FiMonitor', category: 'Tools', proficiency: 90 },
];