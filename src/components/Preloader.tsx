import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import VyronMark from './VyronMark';

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1700;
    let raf = 0;
    let timeout = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = window.setTimeout(onDone, 300);
      }
    };
    raf = requestAnimationFrame(tick);
    const safety = window.setTimeout(onDone, 2200);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.clearTimeout(safety);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center bg-void"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <VyronMark className="h-14 w-14" />
        <p className="mt-5 font-display text-sm font-medium tracking-[0.55em] text-white">
          VYRON<sup className="text-[9px] text-white/50">®</sup>
        </p>
        <p className="mt-2 text-[10px] tracking-[0.4em] text-white/40">DIGITAL GROWTH STUDIO</p>
      </motion.div>

      <div className="mt-10 h-px w-56 overflow-hidden bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-electric to-iris transition-[width] duration-100"
          style={{ width: `${count}%` }}
        />
      </div>
      <p className="mt-4 font-display text-xs tracking-[0.3em] text-white/50 tabular-nums">
        {String(count).padStart(3, '0')}
      </p>
    </motion.div>
  );
}
