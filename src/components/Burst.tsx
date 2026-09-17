import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import type { Discipline } from '../lib/types';

function Shard({
  p,
  angle,
  radius,
  finalX,
  finalY,
  code,
  label,
  color,
}: {
  p: MotionValue<number>;
  angle: number;
  radius: number;
  finalX: number;
  finalY: number;
  code: string;
  label: string;
  color: string;
}) {
  const rad = (angle * Math.PI) / 180;
  const bx = Math.cos(rad) * radius;
  const by = Math.sin(rad) * radius * 0.68;

  // Choreographed transitions: Center (0) -> Scatter (bx, by) -> Hold/Reveal -> Recombine (finalX, finalY)
  const x = useTransform(p, [0, 0.38, 0.6, 0.88], [0, bx, bx * 1.02, finalX]);
  const y = useTransform(p, [0, 0.38, 0.6, 0.88], [0, by, by * 1.02, finalY]);
  const rotate = useTransform(p, [0, 0.38, 0.88], [0, angle * 0.35, 0]);
  const scale = useTransform(p, [0, 0.22, 0.6, 0.88], [0.3, 1, 1, 0.94]);

  const labelOpacity = useTransform(p, [0.46, 0.62, 0.9], [0, 1, 1]);
  const labelY = useTransform(p, [0.46, 0.62], [8, 0]);

  return (
    <motion.div style={{ x, y, rotate, scale }} className="absolute left-1/2 top-1/2">
      <div className="-translate-x-1/2 -translate-y-1/2">
        {/* Diamond Crystal Shard with Precision Inner Bevel */}
        <div
          className="relative flex h-14 w-14 rotate-45 items-center justify-center border backdrop-blur-2xl transition-all duration-300 md:h-[76px] md:w-[76px]"
          style={{
            borderColor: `${color}99`,
            background: `linear-gradient(135deg, ${color}35, rgba(5,5,7,0.92))`,
            boxShadow: `0 0 45px -8px ${color}70, inset 0 0 18px ${color}25`,
          }}
        >
          {/* Inner specular hairline bevel */}
          <div className="pointer-events-none absolute inset-[3px] border border-white/20" />

          <span className="-rotate-45 font-display text-xs font-bold tracking-wider text-white md:text-sm">
            {code}
          </span>
        </div>

        {/* Discipline Tag with System Monospace Typography */}
        <motion.div
          style={{ opacity: labelOpacity, y: labelY }}
          className="mt-3.5 flex flex-col items-center text-center"
        >
          <span className="font-mono text-[9px] font-semibold tracking-[0.3em] text-white/85 md:text-[10px]">
            {label}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Burst() {
  const ref = useRef<HTMLDivElement>(null);
  const { data: disciplines } = useApi<Discipline>('/api/disciplines');
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const radius = Math.min(360, vw * 0.3);
  const isMobile = vw < 768;

  // Phase 1: Core Expansion & Dissipation
  const orbScale = useTransform(p, [0, 0.32, 0.52], [0.55, 1.04, 0]);
  const orbOpacity = useTransform(p, [0.4, 0.54], [1, 0]);
  const ringScale = useTransform(p, [0, 0.42], [0.7, 1.65]);
  const ringOpacity = useTransform(p, [0.1, 0.44], [0.85, 0]);

  // Phase 2 & 3: Header Storytelling Sequence (SCATTER → ONE SYSTEM)
  const scatterOpacity = useTransform(p, [0.12, 0.22, 0.34, 0.46], [0, 1, 1, 0]);
  const scatterY = useTransform(p, [0.12, 0.46], [24, -24]);
  const oneOpacity = useTransform(p, [0.6, 0.76], [0, 1]);
  const oneY = useTransform(p, [0.6, 0.8], [40, 0]);
  const oneScale = useTransform(p, [0.6, 0.8], [0.95, 1]);
  const captionOpacity = useTransform(p, [0.74, 0.88], [0, 1]);

  const items = disciplines.length > 0 ? disciplines : [];

  return (
    <section ref={ref} className="relative h-[340vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Ambient atmospheric aura */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/[0.08] blur-[130px]" />
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:64px_64px]" />

        {/* Narrative Header: SCATTER → ONE SYSTEM */}
        <div className="pointer-events-none absolute top-12 z-10 flex flex-col items-center px-4 text-center sm:top-16 md:top-20">
          <p className="font-mono text-[10px] font-medium tracking-[0.5em] text-white/40 uppercase">
            THE SIGNATURE MOMENT
          </p>

          <div className="relative mt-3 flex min-h-[3.5rem] items-center justify-center sm:mt-4 sm:min-h-[5.5rem]">
            <motion.h3
              style={{ opacity: scatterOpacity, y: scatterY }}
              className="absolute font-display text-[clamp(1.6rem,4vw,3rem)] font-semibold tracking-[0.28em] text-white/85"
            >
              SCATTER
            </motion.h3>
            <motion.h3
              style={{ opacity: oneOpacity, y: oneY, scale: oneScale }}
              className="absolute whitespace-nowrap text-center font-display text-[clamp(2.4rem,7vw,5.5rem)] font-bold leading-none tracking-[-0.02em] will-change-transform"
            >
              ONE{' '}
              <span className="bg-gradient-to-r from-[#9db4ff] via-electric to-iris bg-clip-text text-transparent">
                SYSTEM
              </span>
            </motion.h3>
          </div>
        </div>

        {/* Dynamic Interactive Burst Stage */}
        <div className="relative h-[420px] w-full md:h-[520px]" data-cursor>
          {/* Center Singular Core before Dissolution */}
          <motion.div
            style={{ scale: orbScale, opacity: orbOpacity }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {/* Expanding shockwave ring */}
            <motion.div
              style={{ scale: ringScale, opacity: ringOpacity }}
              className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric/60 md:h-60 md:w-60"
            />
            {/* Swirling energy aura */}
            <div
              className="animate-spin-slow absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-52 md:w-52"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent, rgba(77,124,254,0.35), transparent 40%, transparent 60%, rgba(139,92,246,0.3), transparent)',
                filter: 'blur(6px)',
              }}
            />
            {/* Concentric telemetry orbit */}
            <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20 md:h-48 md:w-48" />

            {/* Core Singularity */}
            <div
              className="relative flex h-28 w-28 items-center justify-center rounded-full md:h-36 md:w-36"
              style={{
                background:
                  'radial-gradient(circle at 32% 28%, #ffffff 0%, #c7d2fe 16%, #4d7cfe 46%, #1a1440 76%, #050507 100%)',
                boxShadow:
                  '0 0 80px -8px rgba(77,124,254,0.85), 0 0 160px -20px rgba(139,92,246,0.5), inset 0 0 24px rgba(255,255,255,0.4)',
              }}
            >
              <span className="font-display text-[11px] font-bold tracking-[0.25em] text-white/90 md:text-xs">
                VYRON
              </span>
            </div>
          </motion.div>

          {/* Six Discipline Shards */}
          {items.map((d, i) => {
            const angle = i * 60 - 90;
            // Responsive positioning: 2 rows of 3 on mobile, unified linear matrix on desktop
            const finalX = isMobile ? ((i % 3) - 1) * 112 : (i - 2.5) * 148;
            const finalY = isMobile ? (i < 3 ? 96 : 196) : 168;
            return (
              <Shard
                key={d.id}
                p={p}
                angle={angle}
                radius={radius}
                finalX={finalX}
                finalY={finalY}
                code={d.code}
                label={d.key}
                color={d.color}
              />
            );
          })}
        </div>

        {/* Narrative Conclusion Punctuation */}
        <motion.p
          style={{ opacity: captionOpacity }}
          className="absolute bottom-[9%] max-w-md px-6 text-center text-[13px] leading-relaxed tracking-[0.18em] text-white/55"
        >
          SIX DISCIPLINES. ONE CHOREOGRAPHY.
          <br />
          <span className="text-white/35">Nothing scattered. Everything connected.</span>
        </motion.p>
      </div>
    </section>
  );
}
