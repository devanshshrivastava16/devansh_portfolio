import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin } from 'react-icons/fi';
import { experiences } from '@/data/experience';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const itemRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-medium uppercase tracking-wider mb-3">Experience</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary">
            My Professional <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent-purple to-accent-cyan opacity-30" />

          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="space-y-12"
          >
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  variants={isLeft ? itemLeft : itemRight}
                  className={`relative flex items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-12 md:pl-0 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="glass rounded-2xl p-6 sm:p-8 glow-hover"
                    >
                      <div className={`flex items-center gap-3 mb-1 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20">
                          {exp.type}
                        </span>
                        <span className="text-sm text-secondary">{exp.period}</span>
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-primary mt-3">
                        {exp.role}
                      </h3>
                      <p className="text-accent text-sm font-medium mt-1">{exp.company}</p>
                      <p className="text-secondary text-sm mt-3 leading-relaxed">{exp.description}</p>

                      <ul className={`mt-4 space-y-2 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                        {exp.achievements.map((achievement, j) => (
                          <li key={j} className="text-sm text-secondary/80 flex items-start gap-2">
                            {!isLeft && <span className="text-accent mt-1">&#8226;</span>}
                            <span className={!isLeft ? '' : 'order-first text-accent mt-1'}>&#8226;</span>
                            {!isLeft && <span>{achievement}</span>}
                            {isLeft && <span>{achievement}</span>}
                          </li>
                        ))}
                      </ul>

                      <div className={`flex flex-wrap gap-2 mt-4 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 text-xs rounded-full bg-white/[0.06] text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Dot on timeline */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-bg z-10 shadow-[0_0_12px_rgba(99,102,241,0.5)]" />

                  {/* Spacer for other side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}