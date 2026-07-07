export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  category: string;
}

export const projects: Project[] = [
  {
    id: 'trustspace',
    title: 'TrustSpace — Venue Rental Marketplace',
    description: 'A full-stack venue rental platform enabling users to discover, list, and book event venues with real-time chat and JWT authentication.',
    longDescription: 'TrustSpace is a comprehensive full-stack venue rental marketplace built with React and Spring Boot. Users can browse and discover event venues, list their own spaces, and manage bookings end-to-end. The platform features JWT-based authentication with role-based access control via Spring Security, ensuring secure user management. The backend exposes RESTful APIs for venue management, booking workflows, and user operations backed by PostgreSQL. The responsive React frontend provides an intuitive user experience, and WebSocket integration powers a real-time chat system between venue owners and renters for seamless communication.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop',
    techStack: ['React', 'Spring Boot', 'PostgreSQL', 'JWT', 'WebSocket', 'Spring Security'],
    githubUrl: 'https://github.com/devanshshri16',
    liveUrl: '#',
    featured: true,
    category: 'Full-Stack',
  },
  {
    id: 'vikas',
    title: 'VIKAS — AI-Powered Fashion Marketplace',
    description: 'Backend infrastructure for an AI fashion marketplace with semantic search, RAG-based assistant, Redis caching, and pickup reservation system.',
    longDescription: 'VIKAS is an AI-powered fashion marketplace backend system that supports a complete product catalog, order management pipeline, and inventory workflows. One of the key innovations is the use of PostgreSQL pgvector for semantic product search, which dramatically improves search relevance by understanding the meaning behind user queries rather than just keyword matching. A RAG-based conversational assistant provides context-aware user support and intelligent product recommendations. Redis caching is integrated throughout to optimize API response times and reduce database load. Additionally, a store pickup reservation system was designed to enhance checkout efficiency and improve product visibility for physical store locations.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop',
    techStack: ['Spring Boot', 'React.js', 'Node.js', 'PostgreSQL', 'pgvector', 'Redis'],
    githubUrl: 'https://github.com/devanshshri16',
    liveUrl: '#',
    featured: true,
    category: 'Backend / AI',
  },
  {
    id: 'microservices',
    title: 'Microservices User & Contact Management',
    description: 'A microservices-based application for managing users and contacts using Spring Boot, Eureka Service Discovery, and Spring Data JPA.',
    longDescription: 'This project demonstrates a microservices architecture for managing users and contacts. Built with Spring Boot and Eureka Service Discovery for dynamic service registration and load balancing, the system features well-separated services communicating via RestTemplate. Spring Data JPA handles database persistence with H2 for rapid development. Security is implemented using Spring Security, and comprehensive unit testing ensures reliability with JUnit and API validation via Postman. The architecture is designed for horizontal scalability and independent service deployment.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
    techStack: ['Spring Boot', 'Eureka', 'Spring Data JPA', 'Spring Security', 'H2', 'JUnit'],
    githubUrl: 'https://github.com/devanshshri16',
    liveUrl: '#',
    featured: true,
    category: 'Backend',
  },
  {
    id: 'portfolio',
    title: 'Developer Portfolio Website',
    description: 'A premium dark-themed developer portfolio built with React, TypeScript, Vite, and Tailwind CSS featuring smooth animations and glassmorphism.',
    longDescription: 'Designed and built this personal portfolio website from scratch using React 19, TypeScript, Vite, and Tailwind CSS v4. The site features a dark glassmorphism aesthetic inspired by Linear and Vercel, with smooth 60fps animations powered by Framer Motion, a custom cursor follower, background particle system, scroll progress indicator, and fully responsive layout across all screen sizes. Content is fully data-driven for easy customization.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/devanshshri16',
    liveUrl: '#',
    featured: true,
    category: 'Frontend',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform (Internship)',
    description: 'Developed and optimized reusable UI components using React.js for an e-commerce platform during internship at OccultHouse Pvt. Ltd.',
    longDescription: 'During the frontend developer internship at OccultHouse Pvt. Ltd., I contributed to an e-commerce platform by developing and optimizing reusable React.js UI components. The work involved collaborating with cross-functional teams, following modern frontend best practices including component-driven development, and improving the overall responsiveness and user experience of the platform. Key contributions included building a modular component library that reduced development time for new features.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    techStack: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
    githubUrl: 'https://github.com/devanshshri16',
    liveUrl: '#',
    featured: false,
    category: 'Frontend',
  },
];