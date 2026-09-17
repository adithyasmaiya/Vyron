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
        {/* Ambient atmospheric depth lighting */}
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[50vmin] w-[75vmin] -translate-x-1/2 rounded-full bg-electric/[0.05] blur-[140px]" />
        <div className="pointer-events-none absolute -right-20 bottom-1/4 h-[40vmin] w-[40vmin] rounded-full bg-iris/[0.03] blur-[120px]" />

        {/* Top: Section Header with Scroll-Highlighted Words */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-electric/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-electric" />
            </span>
            <p className="font-mono text-[11px] font-semibold tracking-[0.45em] text-electric uppercase">
              WHY VYRON
            </p>
            <span className="hidden sm:inline-block h-3 w-px bg-white/15" />
            <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
              OPERATING PRINCIPLES
            </span>
          </div>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,3.3rem)] font-semibold leading-[1.16] tracking-[-0.025em]">
            <span className="mb-1 block sm:mb-2">
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
          {/* Middle: 5 Step Pill Controls (Operating Directive Switcher) */}
          <div className="mx-auto mt-4 flex w-full max-w-4xl items-center justify-center gap-2 overflow-x-auto pb-1 sm:gap-3">
            {principles.map((pr, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={pr.id}
                  onClick={() => handlePillClick(idx)}
                  className={`group relative flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.18em] transition-all duration-300 sm:px-5 sm:py-2.5 ${
                    isActive
                      ? 'border border-electric/60 bg-[#0d111e]/90 text-white shadow-[0_0_24px_-4px_rgba(77,124,254,0.45),0_0_0_1px_rgba(77,124,254,0.2)]'
                      : 'border border-white/[0.09] bg-white/[0.02] text-white/50 hover:border-white/20 hover:bg-white/[0.04] hover:text-white/80'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'scale-110 bg-electric shadow-[0_0_8px_#4d7cfe]'
                        : 'bg-white/25 group-hover:bg-white/50'
                    }`}
                  />
                  <span className="font-semibold">{pr.code}</span>
                  <span className="hidden opacity-75 sm:inline font-sans font-medium text-[12px]">
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
                className="relative w-full overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#090b12]/95 p-7 backdrop-blur-2xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.03)] will-change-transform sm:p-10"
              >
                {/* Top Specular Edge Highlight */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Subtle accent backdrop blur in corner */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-electric/[0.08] blur-[80px]" />

                {/* Background Watermark Index */}
                <span className="pointer-events-none absolute bottom-6 right-8 select-none font-mono text-[clamp(4.5rem,10vw,8rem)] font-black leading-none tracking-tighter text-white/[0.02]">
                  0{activeStep + 1}
                </span>

                {/* Card Top Metadata */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 font-mono text-xs font-semibold tracking-[0.25em] text-electric">
                      {currentPrinciple.code}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/25" />
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[9px] font-medium tracking-[0.25em] text-white/60 uppercase">
                      OPERATING DIRECTIVE
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs tracking-[0.25em] text-white/40">
                      0{activeStep + 1} / 05
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.02] text-white/60">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>

                {/* Box Title */}
                <h3 className="relative z-10 mt-5 font-display text-[clamp(1.75rem,3.8vw,2.9rem)] font-bold tracking-tight text-white leading-[1.08]">
                  {currentPrinciple.title}
                </h3>

                {/* Box Description */}
                <p className="relative z-10 mt-4 max-w-2xl text-[14.5px] leading-relaxed text-white/65 sm:text-[15.5px]">
                  {currentPrinciple.description}
                </p>

                {/* Value Pillars / System Imperatives */}
                <div className="relative z-10 mt-7 border-t border-white/[0.08] pt-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-mono text-[10px] tracking-[0.25em] text-white/35 uppercase">
                      CORE SYSTEM IMPERATIVES
                    </p>
                    <span className="font-mono text-[9px] tracking-wider text-white/25">
                      VERIFIED DIRECTIVE
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {(PRINCIPLE_TAGS[currentPrinciple.id] || [
                      'Continuous Momentum',
                      'Systemic Thinking',
                      'Verified Output',
                    ]).map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] text-white/75 transition-colors duration-300 hover:border-white/20 hover:text-white"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_6px_#4d7cfe]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom: Progress Bar Tracking All 5 Boxes */}
          <div className="mx-auto flex w-full max-w-4xl items-center gap-4 font-mono text-[10px] tracking-[0.3em] text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-electric" />
              01
            </span>
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-electric via-[#7d9eff] to-iris shadow-[0_0_12px_rgba(77,124,254,0.6)]"
                style={{
                  scaleX: useTransform(scrollYProgress, [0.28, 0.98], [0.1, 1]),
                }}
              />
            </div>
            <span className="flex items-center gap-1.5">
              05
              <span className="h-1 w-1 rounded-full bg-iris/60" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
