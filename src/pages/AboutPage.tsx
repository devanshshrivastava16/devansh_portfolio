import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiUsers, FiAward, FiBriefcase, FiMapPin, FiMail, FiPhone, FiLinkedin, FiGithub, FiBookOpen, FiTarget, FiHeart } from 'react-icons/fi';
import { SITE_CONFIG, STATS, EDUCATION, AWARDS } from '@/data/constants';
import AnimatedCounter from '@/components/AnimatedCounter';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-24 lg:pt-32 section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-medium uppercase tracking-wider mb-3">About Me</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary">
            Know Who <span className="gradient-text">I Am</span>
          </h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {/* Left - Profile Visual */}
          <motion.div variants={item} className="lg:col-span-1">
            <div className="glass rounded-2xl p-8 text-center glow-hover">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-accent via-accent-purple to-accent-cyan p-1 mb-6">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <span className="text-4xl font-heading font-bold gradient-text">DS</span>
                </div>
              </div>
              <h2 className="text-2xl font-heading font-bold text-primary">{SITE_CONFIG.name}</h2>
              <p className="text-accent text-sm font-medium mt-1">{SITE_CONFIG.role}</p>
              <p className="text-secondary text-xs mt-2 flex items-center justify-center gap-1">
                <FiMapPin size={12} /> {SITE_CONFIG.location}
              </p>

              <div className="mt-6 flex justify-center gap-3">
                <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-secondary hover:text-primary transition-colors">
                  <FiGithub size={18} />
                </a>
                <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-secondary hover:text-primary transition-colors">
                  <FiLinkedin size={18} />
                </a>
                <a href={`mailto:${SITE_CONFIG.email}`}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-secondary hover:text-primary transition-colors">
                  <FiMail size={18} />
                </a>
              </div>

              <div className="mt-6 space-y-2 text-left">
                <div className="flex items-center gap-3 text-sm text-secondary">
                  <FiMail size={14} className="text-accent" />
                  <span>{SITE_CONFIG.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-secondary">
                  <FiPhone size={14} className="text-accent" />
                  <span>{SITE_CONFIG.phone}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - About Content */}
          <motion.div variants={item} className="lg:col-span-2 space-y-6">
            {/* Career Objective */}
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FiTarget className="text-accent" size={20} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary">Career Objective</h3>
              </div>
              <p className="text-secondary leading-relaxed">
                {SITE_CONFIG.description} Eager to apply backend development skills to solve real-world problems and grow in a challenging environment.
              </p>
            </div>

            {/* What I Do */}
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center">
                  <FiCode className="text-accent-purple" size={20} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary">What I Do</h3>
              </div>
              <p className="text-secondary leading-relaxed mb-4">
                I specialize in building backend systems with Java and Spring Boot, creating RESTful APIs, and developing full-stack applications with React.js on the frontend. My focus is on writing clean, secure, and maintainable code while continuously learning scalable system design patterns.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Backend Development', 'REST APIs', 'Full-Stack', 'Spring Boot', 'React.js', 'Microservices'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20">{tag}</span>
                ))}
              </div>
            </div>

            {/* What Drives Me */}
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
                  <FiHeart className="text-accent-cyan" size={20} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary">What Drives Me</h3>
              </div>
              <p className="text-secondary leading-relaxed">
                I am passionate about continuous learning and staying up-to-date with the latest technologies. Whether it is exploring new frameworks, contributing to open-source projects, or participating in hackathons, I thrive on challenges that push me to grow as a developer.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {STATS.map((stat, i) => {
            const icons = [FiBriefcase, FiCode, FiAward, FiUsers];
            const Icon = icons[i];
            return (
              <motion.div key={stat.label} variants={item} className="glass rounded-2xl p-6 text-center group hover:bg-white/[0.06] transition-colors glow-hover">
                <div className="inline-flex w-12 h-12 rounded-xl bg-accent/10 items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="text-accent" size={24} />
                </div>
                <div className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-1">
                  {inView && <AnimatedCounter end={stat.value} duration={2.5} suffix={stat.suffix} />}
                </div>
                <p className="text-sm text-secondary">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-8 text-center">
            <FiBookOpen className="inline mr-2 text-accent" size={24} />
            Education
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {EDUCATION.map((edu) => (
              <motion.div
                key={edu.degree}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 glow-hover"
              >
                <span className="text-xs text-accent font-medium">{edu.period}</span>
                <h3 className="text-lg font-heading font-semibold text-primary mt-2">{edu.degree}</h3>
                <p className="text-secondary text-sm mt-1">{edu.institution}</p>
                <div className="mt-3 inline-flex px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20">
                  {edu.score}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-8 text-center">
            <FiAward className="inline mr-2 text-accent" size={24} />
            Awards & Achievements
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {AWARDS.map((award) => (
              <motion.div
                key={award.title}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 glow-hover"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <FiAward className="text-accent" size={20} />
                </div>
                <h3 className="text-lg font-heading font-semibold text-primary">{award.title}</h3>
                <p className="text-secondary text-sm mt-1">{award.issuer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}