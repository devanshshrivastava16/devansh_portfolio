export interface Experience {
  id: string;
  company: string;
  role: string;
  type: string;
  period: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export const experiences: Experience[] = [
  {
  id: 'exp-1',
  company: 'OccultHouse Pvt. Ltd.',
  role: 'Full-Stack Developer Intern',
  type: 'Internship',
  period: 'July 2025 – August 2025',
  description:
    'Contributed to the development of a scalable e-commerce platform by building reusable React.js components, integrating RESTful APIs, and collaborating in an Agile environment to deliver production-ready features.',
  achievements: [
    'Developed 30+ reusable React.js components, improving UI consistency and accelerating feature development.',
    'Integrated RESTful APIs with frontend components, enabling seamless data flow across the application.',
    'Collaborated with designers and backend engineers in an Agile development environment.',
    'Enhanced application responsiveness and user experience through performance-focused UI optimizations.',
    'Followed component-driven architecture and modern full-stack development best practices.',
    'Participated in code reviews, debugging, and feature implementation throughout the development lifecycle.'
  ],
  techStack: [
    'React.js',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'REST APIs',
    'Git'
  ],
},
];