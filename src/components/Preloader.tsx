import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import VyronMark from './VyronMark';

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    // Balanced, cinematic 920ms count duration: smooth, crisp, and gives mobile viewports time to settle
    const dur = 920;
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
        timeout = window.setTimeout(onDone, 90);
      }
    };

    raf = requestAnimationFrame(tick);
    const safety = window.setTimeout(onDone, 1500);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.clearTimeout(safety);
    };
  }, [onDone]);

  return (
    <motion.div
      onClick={onDone}
      className="fixed inset-0 z-[400] flex h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#050507] px-4 select-none touch-manipulation cursor-pointer sm:px-10"
      style={{
        paddingTop: 'max(1.25rem, env(safe-area-inset-top, 16px))',
        paddingBottom: 'max(1.1rem, env(safe-area-inset-bottom, 16px))',
      }}
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.015,
        transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Ambient background glow — hardware accelerated */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/[0.12] blur-[80px] sm:blur-[100px] will-change-transform" />
      <div className="pointer-events-none absolute left-[15%] top-[25%] h-[35vmin] w-[35vmin] rounded-full bg-iris/[0.08] blur-[60px] sm:blur-[80px] will-change-transform" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[9.5px] tracking-[0.16em] text-white/45 sm:text-[11px] sm:tracking-[0.25em]">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span>ONLINE · BLR</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="hidden text-white/30 sm:inline">ARCHITECTURE //</span>
          <span className="text-white/60">VYRON v1.0</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDone();
            }}
            className="ml-2 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[8.5px] font-medium tracking-[0.14em] text-white/50 transition-colors hover:border-white/25 hover:text-white active:scale-95"
            aria-label="Skip intro"
          >
            SKIP ↗
          </button>
        </div>
      </div>

      {/* Central Brand Core & Specular Mark */}
      <div className="relative z-10 my-auto mx-auto flex flex-col items-center text-center">
        {/* Specular halo behind mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.84 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          {/* Concentric orbital auras scaled for mobile screen safety */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-white/[0.07] animate-spin-slow pointer-events-none" />
          <div className="absolute -inset-6 sm:-inset-8 rounded-full border border-dashed border-white/[0.04] animate-spin-rev pointer-events-none" />

          <div className="relative flex h-16 w-16 sm:h-22 sm:w-22 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03] p-3.5 sm:p-4.5 shadow-[0_0_45px_-8px_rgba(77,124,254,0.45)] backdrop-blur-xl">
            <VyronMark className="h-full w-full" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 sm:mt-6"
        >
          <p className="font-display text-base font-bold tracking-[0.4em] sm:tracking-[0.45em] text-white sm:text-lg">
            VYRON<sup className="text-[8.5px] font-normal text-white/40">®</sup>
          </p>
          <p className="mt-1 font-mono text-[8.5px] sm:text-[10px] tracking-[0.24em] sm:tracking-[0.3em] text-white/45">
            DIGITAL GROWTH STUDIO
          </p>
        </motion.div>

        {/* Mobile-Optimized Progress Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 sm:mt-8 w-[82vw] max-w-[260px] sm:max-w-[320px]"
        >
          {/* Progress track with specular border */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-full border border-white/10 bg-white/[0.04] p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-electric via-[#7d9eff] to-iris shadow-[0_0_14px_rgba(77,124,254,0.8)] transition-[width] duration-75 ease-out"
              style={{ width: `${count}%` }}
            />
          </div>

          {/* Telemetry metrics & percentage with layout-shift prevention */}
          <div className="mt-2.5 flex h-4 items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.2em]">
            <span className="truncate pr-2 text-left text-white/40">
              {count < 45 ? 'INITIALIZING…' : count < 88 ? 'SYNCING ARCHITECTURE…' : 'SYSTEM READY'}
            </span>
            <span className="shrink-0 font-semibold text-electric tabular-nums">
              {String(count).padStart(3, '0')}%
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Legal & Telemetry Footer */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[8.5px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.22em] text-white/35">
        <span className="truncate">
          <span className="sm:hidden">BLR · IST (+5:30)</span>
          <span className="hidden sm:inline">BENGALURU · IST (UTC+5:30)</span>
        </span>
        <span className="shrink-0 text-right">
          <span className="sm:hidden">DESIGN × TECH</span>
          <span className="hidden sm:inline">DESIGN × TECH × GROWTH</span>
        </span>
      </div>

      {/* Bottom Specular Laser Rim on exit */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent" />
    </motion.div>
  );
}

