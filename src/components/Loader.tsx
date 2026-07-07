import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      onAnimationComplete={onComplete}
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-4xl font-heading font-bold gradient-text"
        >
          DS
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
          onAnimationComplete={() => {
            setTimeout(onComplete, 200);
          }}
          className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-accent via-accent-purple to-accent-cyan"
        />
      </div>
    </motion.div>
  );
}
