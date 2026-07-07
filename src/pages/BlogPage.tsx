import { useEffect } from 'react';
import { motion } from 'framer-motion';
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

export default function BlogPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-24 lg:pt-32 section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-accent text-sm font-medium uppercase tracking-wider mb-3">Blog</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary">
            Latest <span className="gradient-text">Articles</span>
          </h1>
          <p className="mt-4 text-secondary max-w-2xl mx-auto text-lg">
            Tutorials, insights, and technical articles about backend development, Spring Boot, and modern web technologies.
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl overflow-hidden mb-12 glow-hover"
        >
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-video md:aspect-auto overflow-hidden">
              <img
                src={blogs[0].image}
                alt={blogs[0].title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 hidden md:block" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-secondary mb-3">
                <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent">Featured</span>
                <span>{blogs[0].date}</span>
                <span className="flex items-center gap-1"><FiClock size={12} /> {blogs[0].readingTime}</span>
              </div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-3">{blogs[0].title}</h2>
              <p className="text-secondary leading-relaxed mb-4">{blogs[0].excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {blogs[0].tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 text-xs rounded-full bg-accent/10 text-accent">{tag}</span>
                ))}
              </div>
              <motion.a
                href={blogs[0].url}
                className="inline-flex items-center gap-2 text-sm text-accent font-medium hover:gap-3 transition-all"
                whileHover={{ x: 4 }}
              >
                Read Article <FiArrowRight size={14} />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* All Posts */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogs.slice(1).map((blog) => (
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
                  <span className="inline-flex items-center gap-1"><FiClock size={12} /> {blog.readingTime}</span>
                </div>
                <h3 className="text-lg font-heading font-semibold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-secondary line-clamp-2 mb-4">{blog.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 text-xs rounded-full bg-accent/10 text-accent">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
