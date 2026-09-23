import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import type { Discipline } from '../lib/types';
import { scrollToId } from '../lib/scroll';

const EASE = [0.22, 1, 0.36, 1] as const;

function nodePosition(i: number, total: number, orbitRadius = 37) {
  const angle = (i * (360 / total) - 90) * (Math.PI / 180);
  return {
    x: 50 + orbitRadius * Math.cos(angle),
    y: 50 + orbitRadius * Math.sin(angle),
    angle,
  };
}

export default function SystemSection() {
  const { data: disciplines } = useApi<Discipline>('/api/disciplines');
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const orbitRadius = isMobile ? 35 : 37;

  // Auto-rotation timer: cycles through disciplines every 4.0 seconds when in view
  useEffect(() => {
    if (!isInView || paused || disciplines.length === 0) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % disciplines.length);
    }, 4000);
    return () => clearInterval(t);
  }, [isInView, paused, disciplines.length]);

  // Clean up user interaction timeout
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const handleUserSelect = (index: number) => {
    setActive(index);
    setPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    // Pause auto-rotation for 6s on manual tap/swipe so user can read, then resume
    pauseTimeoutRef.current = setTimeout(() => {
      setPaused(false);
    }, 6000);
  };

  const handleMouseEnter = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    setPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    setPaused(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null || disciplines.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe gesture on card (> 40px)
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        handleUserSelect((active + 1) % disciplines.length);
      } else {
        handleUserSelect((active - 1 + disciplines.length) % disciplines.length);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const current = disciplines[active];

  return (
    <section id="system" ref={sectionRef} className="relative scroll-mt-20 overflow-hidden py-28 sm:py-36">
      {/* Ambient background atmosphere */}
      <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[50vmin] w-[50vmin] rounded-full bg-iris/[0.07] blur-[130px]" />
      <div
        className="pointer-events-none absolute left-[-8%] bottom-[15%] h-[42vmin] w-[42vmin] rounded-full blur-[140px] transition-colors duration-1000"
        style={{ backgroundColor: current ? `${current.color}12` : 'transparent' }}
      />

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

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Interactive Operating Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 1.1, ease: EASE }}
            className="relative mx-auto aspect-square w-full max-w-[560px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Orbital Rings with Refined Hierarchical Depth */}
            <div className="animate-spin-slower pointer-events-none absolute inset-[3%] rounded-full border border-dashed border-white/[0.09]" />
            <div className="animate-spin-rev pointer-events-none absolute inset-[18%] rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute inset-[32%] rounded-full border border-white/[0.11]" />

            {/* SVG Connection Lines with Pulse Dynamics */}
            <svg
              className="absolute inset-0 h-full w-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="0.8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {disciplines.map((d, i) => {
                const p = nodePosition(i, disciplines.length, orbitRadius);
                const isActive = i === active;
                return (
                  <g key={d.id}>
                    {/* Background inactive connection track */}
                    <line
                      x1="50"
                      y1="50"
                      x2={p.x}
                      y2={p.y}
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth={0.75}
                      vectorEffect="non-scaling-stroke"
                      strokeDasharray="2 3"
                    />

                    {/* Active highlighted connection line */}
                    {isActive && (
                      <>
                        <line
                          x1="50"
                          y1="50"
                          x2={p.x}
                          y2={p.y}
                          stroke={d.color}
                          strokeWidth={1.6}
                          vectorEffect="non-scaling-stroke"
                          filter="url(#glow-line)"
                          style={{
                            transition: 'stroke 0.4s ease',
                            opacity: 0.85,
                          }}
                        />

                        {/* High-performance traveling energy packet (Core → Node) */}
                        <motion.circle
                          r="1.4"
                          fill="#ffffff"
                          animate={{
                            cx: [50, p.x],
                            cy: [50, p.y],
                            opacity: [0, 0.9, 0.9, 0],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* VYRON CORE — Center Glass Engine */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Restrained aura pulse attuned to active discipline color */}
              <div
                className="pointer-events-none absolute -inset-5 rounded-full blur-xl transition-all duration-700"
                style={{
                  backgroundColor: current ? `${current.color}24` : 'transparent',
                }}
              />
              <div
                className="pointer-events-none absolute -inset-2 animate-pulse rounded-full border opacity-50 transition-colors duration-700"
                style={{
                  borderColor: current ? `${current.color}40` : 'rgba(255,255,255,0.15)',
                }}
              />

              {/* Core Cylinder */}
              <div
                className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border border-white/20 bg-void/85 backdrop-blur-2xl transition-all duration-700 md:h-32 md:w-32"
                style={{
                  boxShadow: current
                    ? `0 0 55px -12px ${current.color}50, inset 0 1px 1px 0 rgba(255,255,255,0.25)`
                    : '0 0 50px -12px rgba(77,124,254,0.4)',
                }}
              >
                {/* Inner specular bevel */}
                <div className="pointer-events-none absolute inset-[3px] rounded-full border border-white/[0.08]" />

                <span className="font-display text-sm font-bold tracking-[0.2em] text-white md:text-base">
                  VYRON
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-[8px] tracking-[0.4em] text-white/50 md:text-[9px]">
                  <span
                    className="h-1 w-1 rounded-full animate-ping"
                    style={{ backgroundColor: current ? current.color : '#4d7cfe' }}
                  />
                  CORE
                </span>
              </div>
            </div>

            {/* Six Discipline Nodes */}
            {disciplines.map((d, i) => {
              const p = nodePosition(i, disciplines.length, orbitRadius);
              const isActive = i === active;
              const labelAbove = p.y > 56;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => handleUserSelect(i)}
                  onMouseEnter={() => {
                    handleMouseEnter();
                    setActive(i);
                  }}
                  onMouseLeave={handleMouseLeave}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 focus:outline-none active:scale-95 touch-manipulation"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  aria-label={`Select ${d.name}`}
                >
                  {/* Outer active beacon ring */}
                  {isActive && (
                    <span
                      className="absolute -inset-1.5 rounded-full border animate-ping-soft opacity-60 pointer-events-none"
                      style={{ borderColor: d.color }}
                    />
                  )}

                  {/* Node Capsule */}
                  <span
                    className={`relative flex h-11 w-11 items-center justify-center rounded-full border font-display text-[11px] font-semibold backdrop-blur-xl transition-all duration-500 sm:h-12 sm:w-12 md:h-16 md:w-16 md:text-xs ${
                      isActive
                        ? 'scale-110 text-white font-bold'
                        : 'border-white/12 bg-void/80 text-white/60 hover:scale-105 hover:border-white/35 hover:text-white'
                    }`}
                    style={
                      isActive
                        ? {
                            background: `linear-gradient(135deg, ${d.color}45, rgba(5,5,7,0.85))`,
                            borderColor: d.color,
                            boxShadow: `0 0 34px -4px ${d.color}80, inset 0 0 14px -2px ${d.color}40`,
                          }
                        : undefined
                    }
                  >
                    {d.code}
                  </span>

                  {/* Node Label with Clean Badge Appearance */}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[8.5px] font-medium tracking-[0.25em] transition-all duration-300 md:text-[9.5px] ${
                      labelAbove ? 'bottom-full mb-2 sm:mb-2.5' : 'top-full mt-2 sm:mt-2.5'
                    } ${
                      isActive
                        ? 'border border-white/15 bg-white/[0.08] text-white font-semibold shadow-sm'
                        : 'text-white/45 group-hover:text-white/75'
                    }`}
                  >
                    {d.key}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Interactive Glass Detail Card */}
          <div
            className="relative min-h-[380px] lg:min-h-[440px]"
            data-cursor
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-ink/80 p-5 backdrop-blur-2xl shadow-[0_24px_64px_-16px_rgba(0,0,0,0.75)] sm:p-10 select-none"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Top specular accent line */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                  {/* Ambient Glow */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-[95px] transition-colors duration-700"
                    style={{ backgroundColor: `${current.color}25` }}
                  />

                  {/* Watermark Code */}
                  <span className="text-stroke-faint pointer-events-none absolute -top-5 right-4 select-none font-display text-[7rem] font-bold leading-none sm:text-[9rem] opacity-35">
                    {current.code}
                  </span>

                  {/* Discipline Header */}
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full shadow-sm"
                      style={{
                        backgroundColor: current.color,
                        boxShadow: `0 0 10px ${current.color}`,
                      }}
                    />
                    <p
                      className="text-[11px] font-semibold tracking-[0.45em]"
                      style={{ color: current.color }}
                    >
                      {current.key} — {current.name.toUpperCase()}
                    </p>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-4xl">
                    {current.tagline}
                  </h3>

                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
                    {current.description}
                  </p>

                  {/* Capabilities Badges */}
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {current.capabilities.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-white/75 transition-colors hover:border-white/20 hover:bg-white/[0.08]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Explore Link */}
                  <button
                    type="button"
                    onClick={() => scrollToId('#services')}
                    className="group mt-8 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.22em] text-white/75 transition-colors hover:text-white"
                  >
                    EXPLORE THE PRACTICE
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  {/* System Node Selector Indicators */}
                  <div className="mt-8 flex items-center gap-2">
                    {disciplines.map((d, i) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => handleUserSelect(i)}
                        aria-label={`Go to ${d.key}`}
                        className="py-2.5 -my-2.5 focus:outline-none"
                      >
                        <span
                          className={`block h-1.5 rounded-full transition-all duration-500 ${
                            i === active ? 'w-10' : 'w-4 bg-white/15 hover:bg-white/30'
                          }`}
                          style={
                            i === active
                              ? {
                                  backgroundColor: current.color,
                                  boxShadow: `0 0 10px ${current.color}80`,
                                }
                              : undefined
                          }
                        />
                      </button>
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
