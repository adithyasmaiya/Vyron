import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import VyronMark from './VyronMark';

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    let timeout = 0;

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      // Smooth cubic ease-out for snappy start, gentle landing at 100
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = window.setTimeout(onDone, 320);
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
      className="fixed inset-0 z-[400] flex h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#050507] px-6 py-8 select-none touch-none sm:px-10 sm:py-10"
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Ambient background glow — responsive and mobile friendly */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[65vmin] w-[65vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/[0.12] blur-[100px]" />
      <div className="pointer-events-none absolute left-[15%] top-[25%] h-[35vmin] w-[35vmin] rounded-full bg-iris/[0.08] blur-[80px]" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-white/45 sm:text-[11px]">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span>ONLINE · BLR</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-white/30 sm:inline">ARCHITECTURE //</span>
          <span className="text-white/60">VYRON v1.0</span>
        </div>
      </div>

      {/* Central Brand Core & Specular Mark */}
      <div className="relative z-10 mx-auto flex flex-col items-center text-center">
        {/* Specular halo behind mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          {/* Subtle concentric orbital aura */}
          <div className="absolute -inset-4 rounded-full border border-white/[0.07] animate-spin-slow pointer-events-none" />
          <div className="absolute -inset-8 rounded-full border border-dashed border-white/[0.04] animate-spin-rev pointer-events-none" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03] p-4 shadow-[0_0_50px_-10px_rgba(77,124,254,0.4)] backdrop-blur-xl sm:h-24 sm:w-24 sm:p-5">
            <VyronMark className="h-full w-full" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <p className="font-display text-base font-bold tracking-[0.45em] text-white sm:text-lg">
            VYRON<sup className="text-[9px] font-normal text-white/40">®</sup>
          </p>
          <p className="mt-1.5 font-mono text-[9.5px] tracking-[0.3em] text-white/45 sm:text-[10px]">
            DIGITAL GROWTH STUDIO
          </p>
        </motion.div>

        {/* Mobile-Optimized Progress Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 w-[78vw] max-w-[280px] sm:max-w-[320px]"
        >
          {/* Progress track with specular border */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-full border border-white/10 bg-white/[0.04] p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-electric via-[#7d9eff] to-iris shadow-[0_0_14px_rgba(77,124,254,0.8)] transition-[width] duration-75 ease-out"
              style={{ width: `${count}%` }}
            />
          </div>

          {/* Telemetry metrics & percentage */}
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em]">
            <span className="text-white/40">
              {count < 40 ? 'INITIALIZING…' : count < 80 ? 'SYNCING ARCHITECTURE…' : 'READY'}
            </span>
            <span className="font-semibold text-electric tabular-nums">
              {String(count).padStart(3, '0')}%
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Legal & Telemetry Footer */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[9px] tracking-[0.22em] text-white/35 sm:text-[10px]">
        <span>BENGALURU · IST (UTC+5:30)</span>
        <span>DESIGN × TECH × GROWTH</span>
      </div>

      {/* Bottom Specular Laser Rim on exit */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent" />
    </motion.div>
  );
}
