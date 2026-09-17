import { useRef } from 'react';
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
  const x = useTransform(p, [0, 0.38, 0.6, 0.88], [0, bx, bx * 1.03, finalX]);
  const y = useTransform(p, [0, 0.38, 0.6, 0.88], [0, by, by * 1.03, finalY]);
  const rotate = useTransform(p, [0, 0.38, 0.88], [0, angle * 0.35, 0]);
  const scale = useTransform(p, [0, 0.22, 0.6, 0.88], [0.3, 1, 1, 0.9]);
  const labelOpacity = useTransform(p, [0.62, 0.8], [0, 1]);
  const labelY = useTransform(p, [0.62, 0.8], [8, 0]);

  return (
    <motion.div style={{ x, y, rotate, scale }} className="absolute left-1/2 top-1/2">
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div
          className="relative flex h-14 w-14 rotate-45 items-center justify-center rounded-sm border backdrop-blur-2xl transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] md:h-[76px] md:w-[76px]"
          style={{
            borderColor: `${color}75`,
            background: `linear-gradient(135deg, ${color}28, rgba(5,8,20,0.85))`,
            boxShadow: `0 0 35px -8px ${color}55, inset 0 0 16px ${color}20`,
          }}
        >
          {/* Micro optical corner pips */}
          <span className="absolute left-1 top-1 h-1 w-1 rounded-full opacity-60" style={{ backgroundColor: color }} />
          <span className="absolute bottom-1 right-1 h-1 w-1 rounded-full opacity-60" style={{ backgroundColor: color }} />
          <span className="-rotate-45 font-display text-xs font-bold tracking-wider text-white md:text-sm">
            {code}
          </span>
        </div>
        <motion.p
          style={{ opacity: labelOpacity, y: labelY }}
          className="mt-4 flex items-center justify-center gap-1.5 text-center text-[9px] font-semibold tracking-[0.32em] text-white/75 md:text-[10px]"
        >
          <span className="h-1 w-1 rounded-full" style={{ backgroundColor: color }} />
          {label}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function Burst() {
  const ref = useRef<HTMLDivElement>(null);
  const { data: disciplines } = useApi<Discipline>('/api/disciplines');
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const radius = Math.min(360, Math.max(120, vw * 0.28));
  const isMobile = vw < 768;
  const stepX = isMobile ? Math.min(100, Math.floor((vw - 48) / 3)) : vw < 1024 ? 120 : 148;

  const bgGlowOpacity = useTransform(p, [0, 0.38, 0.7, 1], [0.06, 0.12, 0.08, 0.10]);
  const orbScale = useTransform(p, [0, 0.32, 0.55], [0.55, 1.05, 0]);
  const orbOpacity = useTransform(p, [0.42, 0.56], [1, 0]);
  const ringScale = useTransform(p, [0, 0.4], [0.7, 1.6]);
  const ringOpacity = useTransform(p, [0.1, 0.45], [0.9, 0]);
  const ringScale2 = useTransform(p, [0, 0.44], [0.5, 2.0]);
  const ringOpacity2 = useTransform(p, [0.15, 0.48], [0.7, 0]);
  const dockRailOpacity = useTransform(p, [0.65, 0.82], [0, 0.65]);

  const scatterOpacity = useTransform(p, [0.12, 0.22, 0.34, 0.46], [0, 1, 1, 0]);
  const scatterY = useTransform(p, [0.12, 0.46], [30, -30]);
  const oneOpacity = useTransform(p, [0.6, 0.76], [0, 1]);
  const oneY = useTransform(p, [0.6, 0.8], [50, 0]);
  const oneScale = useTransform(p, [0.6, 0.8], [0.94, 1]);
  const captionOpacity = useTransform(p, [0.74, 0.88], [0, 1]);

  const items = disciplines.length > 0 ? disciplines : [];

  return (
    <section ref={ref} className="relative h-[340vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: bgGlowOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/[0.10] blur-[130px]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,4,10,0.6)_100%)]" />

        {/* Header grouping: small font on top, title cleanly placed below */}
        <div className="pointer-events-none absolute top-12 z-10 flex flex-col items-center px-4 text-center sm:top-16 md:top-20">
          <p className="text-[10px] font-medium tracking-[0.5em] text-white/40">
            THE SIGNATURE MOMENT
          </p>

          <div className="relative mt-3 flex min-h-[3.5rem] items-center justify-center sm:mt-4 sm:min-h-[5.5rem]">
            <motion.h3
              style={{ opacity: scatterOpacity, y: scatterY }}
              className="absolute font-display text-[clamp(1.6rem,4vw,3rem)] font-semibold tracking-[0.28em] text-white/85"
            >
              SCATTER
            </motion.h3>
            <motion.div
              style={{ opacity: oneOpacity }}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-80 rounded-full bg-electric/[0.12] blur-[80px]"
            />
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

        <div className="relative h-[420px] w-full md:h-[520px]" data-cursor>
          {/* Recombination docking rail */}
          <motion.div
            style={{ opacity: dockRailOpacity, y: isMobile ? 146 : 168 }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 h-px w-[85vw] max-w-4xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />

          {/* Central Singularity & Expanding Shockwaves */}
          <motion.div style={{ scale: orbScale, opacity: orbOpacity }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div style={{ scale: ringScale2, opacity: ringOpacity2 }} className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-iris/40 md:h-72 md:w-72" />
            <motion.div style={{ scale: ringScale, opacity: ringOpacity }} className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric/50 md:h-60 md:w-60" />
            <div
              className="animate-spin-slow absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-52 md:w-52"
              style={{ background: 'conic-gradient(from 0deg, transparent, rgba(77,124,254,0.35), transparent 40%, transparent 60%, rgba(139,92,246,0.3), transparent)', filter: 'blur(6px)' }}
            />
            <div
              className="relative flex h-28 w-28 items-center justify-center rounded-full md:h-36 md:w-36"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, #ffffff 0%, #c4d4ff 16%, #4d7cfe 45%, #181938 75%, #030408 100%)',
                boxShadow: '0 0 80px -10px rgba(77,124,254,0.75), 0 0 160px -20px rgba(139,92,246,0.45)',
              }}
            >
              <div className="h-8 w-8 rounded-full border border-white/50 bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.8)] md:h-10 md:w-10" />
            </div>
          </motion.div>

          {items.map((d, i) => {
            const angle = i * 60 - 90;
            const finalX = isMobile ? ((i % 3) - 1) * stepX : (i - 2.5) * stepX;
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

        <motion.p
          style={{ opacity: captionOpacity }}
          className="absolute bottom-[9%] max-w-md px-6 text-center text-[12px] leading-relaxed tracking-[0.20em] text-white/50 sm:text-[13px]"
        >
          SIX DISCIPLINES. ONE CHOREOGRAPHY.
          <br />
          <span className="text-white/30">Nothing scattered. Everything connected.</span>
        </motion.p>
      </div>
    </section>
  );
}
