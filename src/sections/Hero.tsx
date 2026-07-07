import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';
import { SITE_CONFIG } from '@/data/constants';
import Radar from '@/components/Radar';

const floatingTechs = [
  'Java', 'Spring Boot', 'React.js', 'PostgreSQL', 'REST APIs', 'Tailwind CSS', 'Redis', 'Microservices',
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background blobs — CSS only, no JS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/20 rounded-full blur-[128px] animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-purple/20 rounded-full blur-[128px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-accent-cyan/15 rounded-full blur-[128px] animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            {/* Availability Badge */}
            <motion.div variants={item} className="mb-6 flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-secondary">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for work
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p variants={item} className="text-lg sm:text-xl text-secondary mb-3">
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight"
            >
              <span className="text-primary">{SITE_CONFIG.name.split(' ')[0]}</span>{' '}
              <span className="gradient-text">{SITE_CONFIG.name.split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            {/* Role */}
            <motion.h2 variants={item} className="mt-2 text-xl sm:text-2xl md:text-3xl text-secondary/80 font-heading font-medium">
              {SITE_CONFIG.role}
            </motion.h2>

            {/* Description */}
            <motion.p variants={item} className="mt-6 text-base sm:text-lg text-secondary/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {SITE_CONFIG.description}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-colors magnetic"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/contact';
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass text-primary font-medium text-sm hover:bg-white/[0.08] transition-colors magnetic"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>

              <motion.a
                href={SITE_CONFIG.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass text-secondary font-medium text-sm hover:text-primary hover:bg-white/[0.08] transition-colors magnetic"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload size={16} />
                Resume
              </motion.a>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={item} className="mt-8 flex gap-4 justify-center lg:justify-start">
              {[
                { icon: FiGithub, label: 'GitHub', url: 'https://github.com' },
                { icon: FiLinkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-secondary hover:text-primary hover:border-accent/30 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Profile Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Main image container */}
            <div className="relative w-[420px] h-[420px]">
              {/* Gradient border — CSS animation instead of Framer Motion */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-accent via-accent-purple to-accent-cyan animate-[gradient-rotate_4s_linear_infinite] opacity-60" />
              <div className="absolute inset-[2px] rounded-3xl bg-card" />

              {/* Radar avatar */}
              <div className="absolute inset-[2px] rounded-3xl overflow-hidden flex items-center justify-center bg-black/60">
                <div className="absolute inset-0">
                  <Radar
                    speed={1.0}
                    scale={0.6}
                    ringCount={10}
                    spokeCount={10}
                    ringThickness={0.04}
                    spokeThickness={0.01}
                    sweepSpeed={1.2}
                    sweepWidth={2.0}
                    sweepLobes={1}
                    color="#6366F1"
                    backgroundColor="#05060a"
                    falloff={2.2}
                    brightness={1.05}
                    enableMouseInteraction
                    mouseInfluence={0.08}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                    <img
                      src="/avatar.png"
                      alt="Avatar"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = 'none';
                        const parent = el.parentElement;
                        if (parent) {
                          const fallback = document.createElement('span');
                          fallback.className = 'text-4xl font-heading font-bold gradient-text';
                          const parts = SITE_CONFIG.name.split(' ');
                          fallback.textContent = (parts[0]?.[0] || 'D') + (parts[1]?.[0] || 'S');
                          parent.appendChild(fallback);
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Floating tech badges — pure CSS animation, no Framer Motion */}
              {floatingTechs.map((tech, i) => (
                <div
                  key={tech}
                  className="absolute px-3 py-1.5 rounded-full glass text-xs font-medium text-secondary animate-float"
                  style={{
                    top: `${20 + (i * 45) % 80}%`,
                    left: i % 2 === 0 ? '-10%' : 'auto',
                    right: i % 2 !== 0 ? '-10%' : 'auto',
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: `${4 + (i % 3)}s`,
                  }}
                >
                  {tech}
                </div>
              ))}

              {/* Decorative elements — CSS only */}
              <div
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-accent/30 animate-pulse-glow"
              />
              <div
                className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-accent-purple/30 animate-pulse-glow"
                style={{ animationDelay: '1s' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
