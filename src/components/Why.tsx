import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { FALLBACK_PRINCIPLES } from '../lib/fallbackData';
import type { Principle } from '../lib/types';

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE_WORDS = [
  { text: 'We', accent: false },
  { text: "don't", accent: false },
  { text: 'build', accent: false },
  { text: 'digital', accent: false },
  { text: 'assets.', accent: false },
  { text: 'We', accent: false },
  { text: 'build', accent: false },
  { text: 'systems', accent: true },
  { text: 'that', accent: false },
  { text: 'move', accent: true },
  { text: 'businesses', accent: false },
  { text: 'forward.', accent: false },
];

const PRINCIPLE_TAGS: Record<number, string[]> = {
  1: ['Flywheel Architecture', 'Compounding Returns', 'Zero Dead Ends'],
  2: ['Unified System', 'Cross-Discipline Sync', 'Planned Together'],
  3: ['Ruthless Taste Bar', 'Distinctive Identity', 'Premium Retention'],
  4: ['Owned Infrastructure', 'Autonomous Ops', 'Zero Lock-in Traps'],
  5: ['Continuous Velocity', 'Agile Feedback Loops', 'Compounding Speed'],
};

function WordHighlight({
  item,
  index,
  total,
  progress,
}: {
  item: { text: string; accent: boolean };
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Blackout initially (0.12, matching exact Intro ghost baseline), illuminating brightly (1.0) with scroll
  const start = 0.02 + (index / total) * 0.20;
  const end = start + 0.04;

  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`mr-[0.24em] inline-block will-change-transform last:mr-0 ${
        item.accent
          ? 'bg-gradient-to-r from-[#9db4ff] via-electric to-iris bg-clip-text font-bold text-transparent'
          : 'text-white'
      }`}
    >
      {item.text}
    </motion.span>
  );
}

export default function Why() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: apiPrinciples } = useApi<Principle>('/api/principles');

  // Ensure 5 principle boxes exist
  const principles = useMemo(() => {
    return apiPrinciples.length >= 5 ? apiPrinciples : FALLBACK_PRINCIPLES;
  }, [apiPrinciples]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [activeStep, setActiveStep] = useState(0);

  // Smooth fade-in for the 5-box stage after the headline illuminates
  const stageOpacity = useTransform(scrollYProgress, [0.18, 0.26], [0, 1]);
  const stageY = useTransform(scrollYProgress, [0.18, 0.26], [24, 0]);

  // Sync scroll position with active principle box (step 0 to 4)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (p < 0.28) {
      setActiveStep(0);
    } else {
      // 5 steps mapped across range [0.28, 0.98]
      const step = Math.min(4, Math.max(0, Math.floor((p - 0.28) / 0.14)));
      setActiveStep((curr) => (curr !== step ? step : curr));
    }
  });

  const currentPrinciple = principles[activeStep] || principles[0];

  const handlePillClick = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalHeight = rect.height - window.innerHeight;
    const targetScroll = scrollTop + (0.28 + index * 0.14 + 0.04) * totalHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section id="why" ref={containerRef} className="relative h-[340vh] scroll-mt-20">
      {/* Sticky Presentation Viewport */}
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden px-5 py-8 sm:px-8 sm:py-12">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[50vmin] w-[80vmin] -translate-x-1/2 rounded-full bg-electric/[0.07] blur-[130px]" />

        {/* Top: Section Header with Scroll-Highlighted Words */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-medium tracking-[0.5em] text-electric">WHY VYRON</p>
          <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,3.2rem)] font-semibold leading-[1.18] tracking-[-0.02em]">
            <span className="block mb-1 sm:mb-2">
              {HEADLINE_WORDS.slice(0, 5).map((item, i) => (
                <WordHighlight
                  key={i}
                  item={item}
                  index={i}
                  total={HEADLINE_WORDS.length}
                  progress={scrollYProgress}
                />
              ))}
            </span>
            <span className="block">
              {HEADLINE_WORDS.slice(5).map((item, i) => (
                <WordHighlight
                  key={i + 5}
                  item={item}
                  index={i + 5}
                  total={HEADLINE_WORDS.length}
                  progress={scrollYProgress}
                />
              ))}
            </span>
          </h2>
        </div>

        {/* Middle & Bottom: 5 Principle Slideshow Stage (Reveals after words highlight) */}
        <motion.div
          style={{ opacity: stageOpacity, y: stageY }}
          className="flex flex-1 flex-col justify-between"
        >
          {/* Middle: 5 Step Pill Controls */}
          <div className="mx-auto mt-4 flex w-full max-w-4xl items-center justify-center gap-2 overflow-x-auto pb-1 sm:gap-3">
            {principles.map((pr, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={pr.id}
                  onClick={() => handlePillClick(idx)}
                  className={`group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-medium tracking-[0.16em] transition-all duration-300 sm:px-4 sm:py-2 ${
                    isActive
                      ? 'border border-electric bg-electric/20 text-white shadow-[0_0_24px_-4px_rgba(77,124,254,0.6)]'
                      : 'border border-white/10 bg-white/[0.02] text-white/45 hover:border-white/20 hover:text-white/70'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-electric scale-125 shadow-[0_0_8px_#4d7cfe]' : 'bg-white/30'
                    }`}
                  />
                  <span>{pr.code}</span>
                  <span className="hidden sm:inline opacity-80">
                    {pr.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Showcase Stage: The 5 Boxes Appearing One by One with Scroll */}
          <div className="relative mx-auto flex w-full max-w-4xl flex-1 items-center justify-center py-2 sm:py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPrinciple.id}
                initial={{ opacity: 0, y: 26, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -22, scale: 0.98 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="glass relative w-full overflow-hidden rounded-3xl p-7 sm:p-10 border border-white/12 shadow-[0_20px_70px_-20px_rgba(77,124,254,0.35)] will-change-transform"
              >
                {/* Subtle accent backdrop blur in corner */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-electric/15 blur-[90px]" />

                {/* Card Top Metadata */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-semibold tracking-[0.2em] text-electric">
                      {currentPrinciple.code}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[9px] font-medium tracking-[0.3em] text-white/60">
                      CORE PRINCIPLE
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xs tracking-[0.3em] text-white/40">
                      0{activeStep + 1} / 05
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Box Title */}
                <h3 className="mt-5 font-display text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-tight text-white">
                  {currentPrinciple.title}
                </h3>

                {/* Box Description */}
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/65 sm:text-base">
                  {currentPrinciple.description}
                </p>

                {/* Value Pillars / Highlights */}
                <div className="mt-7 flex flex-wrap gap-2.5 border-t border-white/[0.08] pt-6">
                  {(PRINCIPLE_TAGS[currentPrinciple.id] || ['Continuous Momentum', 'Systemic Thinking', 'Verified Output']).map(
                    (tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/75"
                      >
                        <span className="h-1 w-1 rounded-full bg-electric" />
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom: Progress Bar Tracking All 5 Boxes */}
          <div className="mx-auto flex w-full max-w-4xl items-center gap-4 text-[10px] tracking-[0.35em] text-white/40">
            <span>01</span>
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-electric to-iris"
                style={{
                  scaleX: useTransform(scrollYProgress, [0.28, 0.98], [0.1, 1]),
                }}
              />
            </div>
            <span>05</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
