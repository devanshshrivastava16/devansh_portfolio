export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Team Lead',
    role: 'Engineering Manager',
    company: 'OccultHouse Pvt. Ltd.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'Devansh showed great enthusiasm and quickly adapted to our React.js codebase. His ability to build clean, reusable components contributed significantly to improving our e-commerce platform\'s user experience.',
  },
  {
    id: 'test-2',
    name: 'Project Mentor',
    role: 'Senior Developer',
    company: 'University Project',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    content: 'Devansh demonstrated strong problem-solving skills and a deep understanding of backend architecture. His microservices project was well-structured and showcased his ability to design scalable systems.',
  },
  {
    id: 'test-3',
    name: 'Hackathon Judge',
    role: 'Technical Evaluator',
    company: 'Symbiosis University',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: 'An impressive performance at the hackathon. Devansh\'s technical skills and ability to work under pressure were commendable. His 4th place finish reflects his dedication and talent.',
  },
];