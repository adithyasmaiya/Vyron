import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import type { Discipline } from '../lib/types';
import { scrollToId } from '../lib/scroll';

const EASE = [0.22, 1, 0.36, 1] as const;

function nodePosition(i: number, total: number) {
  const angle = (i * (360 / total) - 90) * (Math.PI / 180);
  return {
    x: 50 + 37 * Math.cos(angle),
    y: 50 + 37 * Math.sin(angle),
    angle,
  };
}

export default function SystemSection() {
  const { data: disciplines } = useApi<Discipline>('/api/disciplines');
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || disciplines.length === 0) return;
    const t = setInterval(() => setActive((a) => (a + 1) % disciplines.length), 4200);
    return () => clearInterval(t);
  }, [paused, disciplines.length]);

  const current = disciplines[active];

  return (
    <section id="system" className="relative scroll-mt-20 overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[50vmin] w-[50vmin] rounded-full bg-iris/[0.08] blur-[130px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-3xl"
        >
          <p className="text-[11px] font-medium tracking-[0.5em] text-electric">THE VYRON SYSTEM</p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            Six disciplines.
            <br />
            <span className="text-white/40">One organism.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/55">
            Every engagement plugs into the same connected core — technology, brand, content,
            growth, automation and intelligence constantly feeding each other.
          </p>
        </motion.div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 1.1, ease: EASE }}
            className="relative mx-auto aspect-square w-full max-w-[560px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="animate-spin-slower absolute inset-[4%] rounded-full border border-dashed border-white/[0.13]" />
            <div className="animate-spin-rev absolute inset-[19%] rounded-full border border-white/[0.07]" />
            <div className="absolute inset-[33%] rounded-full border border-white/[0.09]" />

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {disciplines.map((d, i) => {
                const p = nodePosition(i, disciplines.length);
                const isActive = i === active;
                return (
                  <line
                    key={d.id}
                    x1="50"
                    y1="50"
                    x2={p.x}
                    y2={p.y}
                    stroke={isActive ? d.color : 'rgba(255,255,255,0.10)'}
                    strokeWidth={isActive ? 1.4 : 1}
                    vectorEffect="non-scaling-stroke"
                    strokeDasharray={isActive ? 'none' : '3 4'}
                    style={{ transition: 'stroke 0.4s ease', opacity: isActive ? 0.9 : 0.7 }}
                  />
                );
              })}
            </svg>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="animate-ping-soft absolute inset-0 rounded-full border border-electric/50" />
              <div className="glass relative flex h-24 w-24 flex-col items-center justify-center rounded-full shadow-[0_0_70px_-12px_rgba(77,124,254,0.55)] md:h-32 md:w-32">
                <span className="font-display text-sm font-bold tracking-[0.18em] md:text-base">
                  VYRON
                </span>
                <span className="mt-1 text-[8px] tracking-[0.4em] text-white/50 md:text-[9px]">CORE</span>
              </div>
            </div>

            {disciplines.map((d, i) => {
              const p = nodePosition(i, disciplines.length);
              const isActive = i === active;
              const labelAbove = p.y > 56;
              return (
                <button
                  key={d.id}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  aria-label={`Select ${d.name}`}
                >
                  <span
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full border font-display text-[11px] font-semibold backdrop-blur-xl transition-all duration-500 md:h-16 md:w-16 md:text-xs ${
                      isActive
                        ? 'scale-110 border-transparent text-white'
                        : 'border-white/15 bg-white/[0.03] text-white/60 hover:border-white/35 hover:text-white'
                    }`}
                    style={
                      isActive
                        ? {
                            background: `linear-gradient(135deg, ${d.color}55, ${d.color}22)`,
                            borderColor: d.color,
                            boxShadow: `0 0 44px -6px ${d.color}`,
                          }
                        : undefined
                    }
                  >
                    {d.code}
                  </span>
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium tracking-[0.3em] transition-colors duration-300 md:text-[10px] ${
                      labelAbove ? 'bottom-full mb-2.5' : 'top-full mt-2.5'
                    } ${isActive ? 'text-white' : 'text-white/40'}`}
                  >
                    {d.key}
                  </span>
                </button>
              );
            })}
          </motion.div>

          <div className="relative min-h-[380px] lg:min-h-[440px]" data-cursor>
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10"
                >
                  <div
                    className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[90px] transition-colors duration-700"
                    style={{ backgroundColor: `${current.color}30` }}
                  />
                  <span className="text-stroke-faint pointer-events-none absolute -top-4 right-4 font-display text-[7rem] font-bold leading-none sm:text-[9rem]">
                    {current.code}
                  </span>
                  <p
                    className="text-[11px] font-semibold tracking-[0.45em]"
                    style={{ color: current.color }}
                  >
                    {current.key} — {current.name.toUpperCase()}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {current.tagline}
                  </h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
                    {current.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {current.capabilities.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-white/70"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => scrollToId('#services')}
                    className="group mt-8 flex items-center gap-2 text-[12px] font-semibold tracking-[0.22em] text-white/70 transition-colors hover:text-white"
                  >
                    EXPLORE THE PRACTICE
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <div className="mt-8 flex gap-2">
                    {disciplines.map((d, i) => (
                      <button
                        key={d.id}
                        onClick={() => setActive(i)}
                        aria-label={`Go to ${d.key}`}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          i === active ? 'w-10' : 'w-4 bg-white/15 hover:bg-white/30'
                        }`}
                        style={i === active ? { backgroundColor: current.color } : undefined}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
