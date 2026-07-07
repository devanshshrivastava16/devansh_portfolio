import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundParticles from './components/BackgroundParticles';
import ScrollProgress from './components/ScrollProgress';
import Loader from './components/Loader';

// Lazy-load every page for faster initial load
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
    </div>
  );
}

function AppRoutes() {
  const path = window.location.pathname;

  if (path === '/about') return <AboutPage />;
  if (path === '/skills') return <SkillsPage />;
  if (path === '/projects') return <ProjectsPage />;
  if (path === '/experience') return <ExperiencePage />;
  if (path === '/blog') return <BlogPage />;
  if (path === '/contact') return <ContactPage />;
  return <HomePage />;
}

function App() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('portfolio_loaded'));
  const [isHome, setIsHome] = useState(window.location.pathname === '/' || window.location.pathname === '');

  useEffect(() => {
    if (!loading) return;
  }, [loading]);

  // Track current page for particles (only render on home)
  useEffect(() => {
    const checkPath = () => setIsHome(window.location.pathname === '/' || window.location.pathname === '');
    // Run on initial mount
    checkPath();
    // Also listen for popstate (back/forward)
    window.addEventListener('popstate', checkPath);
    return () => window.removeEventListener('popstate', checkPath);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <Loader
            onComplete={() => {
              setLoading(false);
              sessionStorage.setItem('portfolio_loaded', 'true');
            }}
          />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen bg-bg">
          {/* Particles only on home page to save GPU */}
          <BackgroundParticles enabled={isHome} />
          {isHome && <ScrollProgress />}
          <Navbar />

          <main>
            <Suspense fallback={<PageFallback />}>
              <AppRoutes />
            </Suspense>
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
