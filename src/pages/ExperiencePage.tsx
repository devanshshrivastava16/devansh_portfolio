import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiAward, FiBookOpen } from 'react-icons/fi';
import { experiences } from '@/data/experience';
import { EDUCATION, AWARDS } from '@/data/constants';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const itemLeft = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6 } } };
const itemRight = { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6 } } };

export default function ExperiencePage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-24 lg:pt-32 section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-accent text-sm font-medium uppercase tracking-wider mb-3">Experience</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary">
            My Professional <span className="gradient-text">Journey</span>
          </h1>
          <p className="mt-4 text-secondary max-w-2xl mx-auto text-lg">My work experience, education, and achievements.</p>
        </motion.div>

        {/* Work Experience Timeline */}
        <div className="mb-20">
          <h2 className="text-2xl font-heading font-bold text-primary mb-8 flex items-center gap-2">
            <FiBriefcase className="text-accent" size={22} /> Work Experience
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent-purple to-accent-cyan opacity-30" />
            <motion.div variants={container} initial="hidden" animate={inView ? 'show' : 'hidden'} ref={ref} className="space-y-12">
              {experiences.map((exp, i) => (
                <motion.div key={exp.id} variants={i % 2 === 0 ? itemLeft : itemRight} className="relative flex items-center gap-8 md:flex-row">
                  <div className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <motion.div whileHover={{ y: -2 }} className="glass rounded-2xl p-6 sm:p-8 glow-hover">
                      <div className={`flex items-center gap-3 mb-1 ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20">{exp.type}</span>
                        <span className="text-sm text-secondary">{exp.period}</span>
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-primary mt-3">{exp.role}</h3>
                      <p className="text-accent text-sm font-medium mt-1">{exp.company}</p>
                      <p className="text-secondary text-sm mt-3 leading-relaxed">{exp.description}</p>
                      <ul className={`mt-4 space-y-2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        {exp.achievements.map((a, j) => (
                          <li key={j} className="text-sm text-secondary/80 flex items-start gap-2">
                            <span className="text-accent mt-1">&#8226;</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                      <div className={`flex flex-wrap gap-2 mt-4 ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        {exp.techStack.map((tech) => (
                          <span key={tech} className="px-2.5 py-0.5 text-xs rounded-full bg-white/[0.06] text-secondary">{tech}</span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-bg z-10 shadow-[0_0_12px_rgba(99,102,241,0.5)]" />
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-20">
          <h2 className="text-2xl font-heading font-bold text-primary mb-8 flex items-center gap-2">
            <FiBookOpen className="text-accent" size={22} /> Education
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {EDUCATION.map((edu) => (
              <motion.div key={edu.degree} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} className="glass rounded-2xl p-6 glow-hover">
                <span className="text-xs text-accent font-medium">{edu.period}</span>
                <h3 className="text-lg font-heading font-semibold text-primary mt-2">{edu.degree}</h3>
                <p className="text-secondary text-sm mt-1">{edu.institution}</p>
                <div className="mt-3 inline-flex px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20">{edu.score}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-8 flex items-center gap-2">
            <FiAward className="text-accent" size={22} /> Awards & Achievements
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {AWARDS.map((award) => (
              <motion.div key={award.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} className="glass rounded-2xl p-6 glow-hover">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4"><FiAward className="text-accent" size={20} /></div>
                <h3 className="text-lg font-heading font-semibold text-primary">{award.title}</h3>
                <p className="text-secondary text-sm mt-1">{award.issuer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}