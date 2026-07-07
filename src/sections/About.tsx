import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiUsers, FiAward, FiBriefcase } from 'react-icons/fi';
import { STATS } from '@/data/constants';
import AnimatedCounter from '@/components/AnimatedCounter';

const statIcons = [FiBriefcase, FiCode, FiUsers, FiAward];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-medium uppercase tracking-wider mb-3">About Me</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary">
            Crafting Digital <span className="gradient-text">Experiences</span>
          </h2>
          <p className="mt-4 text-secondary max-w-2xl mx-auto text-lg">
            I&apos;m a passionate full-stack developer with over 5 years of experience building 
            modern web applications. I specialize in creating performant, accessible, and beautiful 
            digital products that make a real impact.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {STATS.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <motion.div
                key={stat.label}
                variants={item}
                className="glass rounded-2xl p-6 text-center group hover:bg-white/[0.06] transition-colors glow-hover"
              >
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

        {/* About Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid md:grid-cols-2 gap-6"
        >
          <motion.div variants={item} className="glass rounded-2xl p-8">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <FiCode className="text-accent" size={20} />
            </div>
            <h3 className="text-xl font-heading font-semibold text-primary mb-3">What I Do</h3>
            <p className="text-secondary leading-relaxed">
              I build end-to-end web applications with a focus on user experience, performance, 
              and scalability. From pixel-perfect frontend interfaces to robust backend systems, 
              I handle the full development lifecycle.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Frontend', 'Backend', 'DevOps', 'UI/UX', 'Mobile'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="glass rounded-2xl p-8">
            <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center mb-4">
              <FiAward className="text-accent-purple" size={20} />
            </div>
            <h3 className="text-xl font-heading font-semibold text-primary mb-3">My Approach</h3>
            <p className="text-secondary leading-relaxed">
              I believe in writing clean, maintainable code and following industry best practices. 
              Every project starts with understanding the user&apos;s needs and ends with a polished 
              product that exceeds expectations.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Clean Code', 'Test Driven', 'Agile', 'CI/CD', 'Documentation'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}