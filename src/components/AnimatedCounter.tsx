import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({ end, duration = 2.5, suffix = '', className }: AnimatedCounterProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    let frameId = 0;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      setValue(Math.round(progress * end));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [end, duration]);

  return <span className={className}>{value}{suffix}</span>;
}
