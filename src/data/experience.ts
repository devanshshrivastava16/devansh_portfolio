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
    role: 'Frontend Developer Intern',
    type: 'Internship',
    period: 'July 2025',
    description: 'Worked as a Frontend Developer Intern, developing and optimizing reusable UI components for an e-commerce platform using React.js.',
    achievements: [
      'Developed and optimized reusable React.js UI components for an e-commerce platform',
      'Collaborated with cross-functional teams including designers and backend developers',
      'Followed modern frontend best practices including component-driven development',
      'Improved responsiveness and user experience across the platform',
    ],
    techStack: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
];