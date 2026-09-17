import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';
import { scrollToId } from '../lib/scroll';

function HeadlineWord({
  text,
  progress,
  range,
  accent,
}: {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
}) {
  // Blackout initially (0.12, matching exact baseline), illuminating brightly (1.0) with scroll
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [14, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block will-change-transform ${
        accent
          ? 'bg-gradient-to-r from-[#9db4ff] via-electric to-iris bg-clip-text text-transparent font-bold'
          : 'text-white'
      }`}
    >
      {text}
    </motion.span>
  );
}

const SUBTITLE_WORDS = [
  'One',
  'conversation.',
  'Zero',
  'noise.',
  'Tell',
  'us',
  'where',
  'you',
  'want',
  'to',
  'go',
  '—',
  "we'll",
  'architect',
  'the',
  'system',
  'that',
  'gets',
  'you',
  'there.',
];

function SubtitleWord({
  text,
  progress,
  range,
}: {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 0.72]);
  return (
    <motion.span
      style={{ opacity }}
      className="mr-[0.26em] inline-block will-change-transform last:mr-0 text-white"
    >
      {text}
    </motion.span>
  );
}

export default function FinalCta({ onStart }: { onStart: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const labelOpacity = useTransform(scrollYProgress, [0.03, 0.16], [0.12, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.8], [0.3, 1]);
  const actionOpacity = useTransform(scrollYProgress, [0.66, 0.88], [0, 1]);
  const actionY = useTransform(scrollYProgress, [0.66, 0.88], [30, 0]);
  const actionScale = useTransform(scrollYProgress, [0.66, 0.88], [0.92, 1]);

  return (
    <section id="contact" ref={containerRef} className="relative h-[220vh] scroll-mt-20">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5 py-8 text-center sm:px-8">
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/[0.12] blur-[140px]"
        />
        <div
          className="animate-spin-slow pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0%, rgba(77,124,254,0.10) 20%, transparent 40%, transparent 60%, rgba(139,92,246,0.10) 80%, transparent 100%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '88px 88px',
            maskImage: 'radial-gradient(ellipse 60% 55% at 50% 50%, black 10%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 50% 50%, black 10%, transparent 75%)',
          }}
        />
        <span className="text-stroke-faint pointer-events-none absolute -bottom-[4vw] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[24vw] font-bold leading-none tracking-[-0.03em] opacity-60">
          VYRON
        </span>

        <div className="relative z-10 flex flex-col items-center">
          <motion.p
            style={{ opacity: labelOpacity }}
            className="text-[11px] font-medium tracking-[0.5em] text-electric"
          >
            READY WHEN YOU ARE
          </motion.p>

          <h2 className="mx-auto mt-5 max-w-5xl font-display text-[clamp(2.6rem,8.8vw,7.8rem)] font-bold leading-[0.96] tracking-[-0.03em]">
            <span className="block space-x-3 sm:space-x-5">
              <HeadlineWord text="LET'S" progress={scrollYProgress} range={[0.04, 0.22]} />
              <HeadlineWord text="BUILD" progress={scrollYProgress} range={[0.2, 0.38]} />
            </span>
            <span className="block mt-1 sm:mt-2">
              <HeadlineWord text="MOMENTUM" progress={scrollYProgress} range={[0.36, 0.58]} accent />
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed">
            {SUBTITLE_WORDS.map((word, idx) => {
              const start = 0.54 + (idx / SUBTITLE_WORDS.length) * 0.22;
              const end = start + 0.04;
              return (
                <SubtitleWord
                  key={idx}
                  text={word}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </p>

          <motion.div
            style={{ opacity: actionOpacity, y: actionY, scale: actionScale }}
            className="mt-10 flex flex-col items-center gap-6 sm:mt-12 sm:gap-8"
          >
            <Magnetic strength={0.4}>
              <button
                onClick={onStart}
                className="group relative flex h-36 w-36 flex-col items-center justify-center gap-1 rounded-full bg-white text-black transition-all duration-500 hover:scale-105 hover:bg-electric hover:text-white hover:shadow-[0_0_100px_-10px_rgba(77,124,254,0.9)] sm:h-44 sm:w-44"
              >
                <span className="animate-ping-soft absolute inset-0 rounded-full border border-white/60" />
                <span className="text-[12px] font-bold tracking-[0.2em]">START</span>
                <span className="text-[12px] font-bold tracking-[0.2em]">A PROJECT</span>
                <ArrowUpRight className="mt-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
              <a
                href="mailto:hello@vyron.studio"
                className="text-sm tracking-[0.08em] text-white/60 underline decoration-white/25 underline-offset-8 transition-colors hover:text-white hover:decoration-electric"
              >
                hello@vyron.studio
              </a>
              <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
              <button
                onClick={() => scrollToId('#work')}
                className="text-[12px] font-semibold tracking-[0.22em] text-white/60 transition-colors hover:text-white"
              >
                OR EXPLORE OUR WORK →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

