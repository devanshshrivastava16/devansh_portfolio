import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMapPin, FiMail, FiPhone, FiCheck, FiLoader, FiAlertCircle, FiLinkedin, FiGithub } from 'react-icons/fi';
import { SITE_CONFIG } from '@/data/constants';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        formRef.current?.reset();
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }

    if (status !== 'error') {
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
    { icon: FiMapPin, label: 'Location', value: SITE_CONFIG.location, href: '#' },
    { icon: FiPhone, label: 'Phone', value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
  ];

  return (
    <div className="pt-24 lg:pt-32 section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-medium uppercase tracking-wider mb-3">Contact</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="mt-4 text-secondary max-w-2xl mx-auto text-lg">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
            Drop me a message and I&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info) => (
              <motion.a
                key={info.label}
                href={info.href}
                whileHover={{ y: -2 }}
                className="flex items-center gap-4 glass rounded-xl p-5 hover:bg-white/[0.06] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <info.icon className="text-accent" size={20} />
                </div>
                <div>
                  <p className="text-xs text-secondary uppercase tracking-wider">{info.label}</p>
                  <p className="text-primary font-medium text-sm mt-0.5">{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              <motion.a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-secondary hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-secondary hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </motion.a>
              <motion.a
                href={`mailto:${SITE_CONFIG.email}`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-secondary hover:text-primary transition-colors"
                aria-label="Email"
              >
                <FiMail size={20} />
              </motion.a>
            </div>

            {/* Availability notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-primary">Currently available</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                Open for internships, freelance projects, and collaboration opportunities.
                Response time is usually within 24 hours.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form — Web3Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 sm:p-8 space-y-6"
            >
              {/* Web3Form hidden fields */}
              <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_KEY || ''} />
              <input type="hidden" name="subject" value="Portfolio Contact Form" />
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
              />

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-primary text-sm placeholder:text-secondary/50 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-primary text-sm placeholder:text-secondary/50 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject_line" className="block text-sm font-medium text-primary mb-2">
                  Subject
                </label>
                <input
                  id="subject_line"
                  name="subject_line"  // Web3Form uses "subject" for the email subject, we use subject_line to avoid conflict
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-primary text-sm placeholder:text-secondary/50 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-colors"
                  placeholder="Project inquiry / Collaboration / Hello!"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-primary text-sm placeholder:text-secondary/50 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-colors resize-none"
                  placeholder="Tell me about your project, idea, or just say hi..."
                />
              </div>

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center justify-center gap-2 py-3 rounded-full bg-green-500/20 text-green-400 text-sm font-medium"
                  >
                    <FiCheck size={18} />
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center justify-center gap-2 py-3 rounded-full bg-red-500/20 text-red-400 text-sm font-medium"
                  >
                    <FiAlertCircle size={18} />
                    {message || 'Something went wrong. Please try again.'}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              {status !== 'success' && (
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                  className={`w-full py-3.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    status === 'sending'
                      ? 'bg-accent/50 text-white/70 cursor-not-allowed'
                      : 'bg-accent text-white hover:bg-accent/90'
                  }`}
                >
                  {status === 'sending' ? (
                    <>
                      <FiLoader size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              )}
            </form>

            {/* Setup hint — only visible if no API key */}
            {!import.meta.env.VITE_WEB3FORMS_KEY && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-4 text-xs text-yellow-500/70 text-center"
              >
                Tip: Add your Web3Forms access key to <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-yellow-400/80">.env</code> as <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-yellow-400/80">VITE_WEB3FORMS_KEY=your_key</code>
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
