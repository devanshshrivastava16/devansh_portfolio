import { useEffect } from 'react';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import Experience from '@/sections/Experience';
import BlogPreview from '@/sections/BlogPreview';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <BlogPreview />
      <Testimonials />
      <Contact />
    </>
  );
}