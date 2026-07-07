import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { navLinks } from '@/data/socials';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 50);
        setIsHidden(currentScrollY > lastScrollYRef.current && currentScrollY > 200);
        lastScrollYRef.current = currentScrollY;

        if (window.location.pathname === '/') {
          const hashSections = ['contact', 'testimonials', 'blog', 'experience', 'projects', 'skills', 'about', 'home'];
          for (let i = 0; i < hashSections.length; i++) {
            const el = document.getElementById(hashSections[i]);
            if (el && el.getBoundingClientRect().top <= 200) {
              setActiveSection(hashSections[i]);
              break;
            }
          }
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navigate = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('#')) {
      // Hash scroll on home page
      if (window.location.pathname !== '/') {
        window.location.href = '/' + href;
      } else {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Page navigation
      window.location.href = href;
    }
  };

  // Determine active based on current path
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') setActiveSection('home');
    else if (path === '/about') setActiveSection('about');
    else if (path === '/skills') setActiveSection('skills');
    else if (path === '/projects') setActiveSection('projects');
    else if (path === '/experience') setActiveSection('experience');
    else if (path === '/blog') setActiveSection('blog');
    else if (path === '/contact') setActiveSection('contact');
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-bg/80 backdrop-blur-xl border-b border-white/[0.06]' : ''
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <motion.a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
              className="text-xl font-bold font-heading"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="gradient-text">DS</span>
            </motion.a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const key = link.href.replace('#', '').replace('/', '');
                const isActive = activeSection === key;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                      isActive ? 'text-white' : 'text-secondary hover:text-primary'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white/[0.08] rounded-lg"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </motion.a>
                );
              })}
            </div>

            <motion.a
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
              className="hidden lg:inline-flex px-5 py-2.5 text-sm font-medium rounded-full bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let&apos;s Talk
            </motion.a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative z-50 p-2 text-primary"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-bg/95 backdrop-blur-xl" />
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="relative h-full flex flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="text-3xl font-heading font-semibold text-primary hover:text-accent transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="/contact"
                onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 px-8 py-3 text-lg font-medium rounded-full bg-accent text-white"
              >
                Let&apos;s Talk
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
