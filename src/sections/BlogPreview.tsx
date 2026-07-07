import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import { blogs } from '@/data/blogs';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogPreview() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="blog" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent text-sm font-medium uppercase tracking-wider mb-3">Blog</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary">
            Latest <span className="gradient-text">Articles</span>
          </h2>
          <p className="mt-4 text-secondary max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, design, and technology.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid md:grid-cols-3 gap-6"
        >
          {blogs.map((blog) => (
            <motion.article
              key={blog.id}
              variants={item}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer glow-hover"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-secondary mb-3">
                  <span>{blog.date}</span>
                  <span className="w-1 h-1 rounded-full bg-secondary/40" />
                  <span className="inline-flex items-center gap-1">
                    <FiClock size={12} />
                    {blog.readingTime}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-semibold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-secondary line-clamp-2 mb-4">{blog.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs rounded-full bg-accent/10 text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}