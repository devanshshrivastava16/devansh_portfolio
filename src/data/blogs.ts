export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  image: string;
  tags: string[];
  url: string;
}

export const blogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'Getting Started with Spring Boot Microservices',
    excerpt: 'A beginner-friendly guide to building microservices using Spring Boot, Eureka Service Discovery, and Spring Data JPA for scalable backend architecture.',
    date: 'Jul 2025',
    readingTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    tags: ['Spring Boot', 'Microservices', 'Java'],
    url: '#',
  },
  {
    id: 'blog-2',
    title: 'Implementing JWT Authentication in Spring Security',
    excerpt: 'Step-by-step walkthrough of implementing JSON Web Token authentication with role-based access control in Spring Boot applications.',
    date: 'Jun 2025',
    readingTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1610986603136-8b6e673a9db6?w=800&h=400&fit=crop',
    tags: ['Security', 'JWT', 'Spring Boot'],
    url: '#',
  },
  {
    id: 'blog-3',
    title: 'Building Real-Time Features with WebSocket in React',
    excerpt: 'Learn how to integrate WebSocket for real-time chat functionality in a React application, with Spring Boot on the backend.',
    date: 'May 2025',
    readingTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    tags: ['React', 'WebSocket', 'Real-Time'],
    url: '#',
  },
];