import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiVuedotjs, SiFramer,
  SiNodedotjs, SiPython, SiExpress, SiGraphql, SiFastapi,
  SiDocker, SiKubernetes, SiGithubactions, SiVercel,
  SiGooglecloud, SiFirebase,
  SiPostgresql, SiMongodb, SiRedis, SiPrisma,
  SiTensorflow,
  SiGit, SiFigma,
} from 'react-icons/si';
import { FiCloud, FiMonitor } from 'react-icons/fi';
import { skills, skillCategories } from '@/data/skills';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiVuedotjs, SiFramer,
  SiNodedotjs, SiPython, SiExpress, SiGraphql, SiFastapi,
  SiDocker, SiKubernetes, SiGithubactions, SiVercel,
  SiAmazonwebservices: FiCloud, SiGooglecloud, SiFirebase,
  SiPostgresql, SiMongodb, SiRedis, SiPrisma,
  SiTensorflow, SiOpenai: FiCloud,
  SiGit, SiVisualstudiocode: FiMonitor, SiFigma,
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent text-sm font-medium uppercase tracking-wider mb-3">Skills</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary">
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {['All', ...skillCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                activeCategory === cat
                  ? 'bg-accent text-white'
                  : 'glass text-secondary hover:text-primary hover:bg-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {filteredSkills.map((skill) => {
              const Icon = iconMap[skill.icon];
              return (
                <motion.div
                  key={skill.name}
                  variants={item}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass rounded-xl p-5 group hover:bg-white/[0.06] transition-all cursor-default glow-hover"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {Icon && (
                      <Icon
                        size={24}
                        className="text-accent group-hover:text-accent-purple transition-colors"
                      />
                    )}
                    <span className="text-sm font-medium text-primary truncate">{skill.name}</span>
                  </div>
                  {/* Proficiency bar */}
                  <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-purple"
                    />
                  </div>
                  <p className="mt-2 text-xs text-secondary">{skill.proficiency}%</p>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}