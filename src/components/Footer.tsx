import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp } from 'react-icons/fi';
import { SITE_CONFIG } from '@/data/constants';
import { socials, navLinks } from '@/data/socials';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FiGithub, FiLinkedin, FiTwitter,
};

function ScrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          {/* Brand */}
          <div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname === '/') {
                  document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/';
                }
              }}
              className="text-2xl font-bold font-heading gradient-text"
            >
              DS
            </a>
            <p className="mt-4 text-secondary text-sm leading-relaxed max-w-xs">
              Crafting modern digital experiences with clean code and thoughtful design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary hover:text-primary text-sm transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.href.startsWith('#')) {
                        if (window.location.pathname !== '/') {
                          window.location.href = '/' + link.href;
                        } else {
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else {
                        window.location.href = link.href;
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Connect</h3>
            <div className="flex gap-3">
              {socials.map((social) => {
                const Icon = iconMap[social.icon];
                return Icon ? (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-secondary hover:text-primary hover:border-accent/30 transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </motion.a>
                ) : null;
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-secondary text-sm">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>

          <motion.button
            onClick={ScrollToTop}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-secondary hover:text-primary hover:border-accent/30 transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <FiArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}