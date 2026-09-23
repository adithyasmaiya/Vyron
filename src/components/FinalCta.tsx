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
    <section id="contact" ref={containerRef} className="relative h-[200vh] sm:h-[220vh] scroll-mt-20">
      <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 py-6 text-center sm:px-8 sm:py-8">
        {/* Ambient Focal Glow */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/[0.10] blur-[140px]"
        />

        {/* Dynamic Conic Light Field */}
        <div
          className="animate-spin-slow pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0%, rgba(77,124,254,0.12) 20%, transparent 40%, transparent 60%, rgba(139,92,246,0.12) 80%, transparent 100%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Concentric Telemetry Initiation Rings */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[520px] w-[520px] rounded-full border border-white/[0.03] sm:h-[640px] sm:w-[640px]" />
          <div className="absolute inset-0 m-auto h-[380px] w-[380px] rounded-full border border-white/[0.04] border-dashed sm:h-[460px] sm:w-[460px]" />
          <div className="absolute inset-0 m-auto h-[240px] w-[240px] rounded-full border border-white/[0.06] sm:h-[280px] sm:w-[280px]" />
        </div>

        {/* Blueprint Grid Atmosphere */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '88px 88px',
            maskImage: 'radial-gradient(ellipse 60% 55% at 50% 50%, black 10%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 50% 50%, black 10%, transparent 75%)',
          }}
        />

        {/* Background Monolithic Brand Watermark */}
        <span className="text-stroke-faint pointer-events-none absolute -bottom-[4vw] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[24vw] font-bold leading-none tracking-[-0.03em] opacity-60">
          VYRON
        </span>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Header Telemetry Badge */}
          <motion.div
            style={{ opacity: labelOpacity }}
            className="flex items-center justify-center gap-3"
          >
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-electric/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-electric" />
            </span>
            <p className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.45em] text-electric uppercase">
              READY WHEN YOU ARE
            </p>
            <span className="hidden sm:inline-block h-3 w-px bg-white/15" />
            <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
              SYSTEM INITIATION
            </span>
          </motion.div>

          {/* Monumental Headline */}
          <h2 className="mx-auto mt-4 sm:mt-6 max-w-5xl font-display text-[clamp(2.15rem,7.8vw,7.6rem)] font-bold leading-[0.96] tracking-[-0.035em] sm:text-[clamp(2.6rem,8.5vw,7.6rem)]">
            <span className="block space-x-3 sm:space-x-5">
              <HeadlineWord text="LET'S" progress={scrollYProgress} range={[0.04, 0.22]} />
              <HeadlineWord text="BUILD" progress={scrollYProgress} range={[0.2, 0.38]} />
            </span>
            <span className="block mt-1 sm:mt-2">
              <HeadlineWord text="MOMENTUM" progress={scrollYProgress} range={[0.36, 0.58]} accent />
            </span>
          </h2>

          {/* Subtitle Word-by-word Reveal */}
          <p className="mx-auto mt-4 sm:mt-6 max-w-lg text-[13.5px] sm:text-[15.5px] leading-relaxed">
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

          {/* Action Trigger Area */}
          <motion.div
            style={{ opacity: actionOpacity, y: actionY, scale: actionScale }}
            className="mt-6 flex flex-col items-center sm:mt-12"
          >
            {/* Focal Magnetic Circular CTA */}
            <Magnetic strength={0.22}>
              <button
                onClick={onStart}
                className="group relative flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-full bg-white text-black transition-all duration-500 hover:scale-105 hover:bg-electric hover:text-white hover:shadow-[0_0_90px_10px_rgba(77,124,254,0.7)] active:scale-95 touch-manipulation sm:h-44 sm:w-44"
                aria-label="Start a project with VYRON"
              >
                {/* Precision beacon ring */}
                <span className="animate-ping-soft absolute inset-0 rounded-full border border-white/70" />
                <span className="pointer-events-none absolute -inset-2 rounded-full border border-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:border-electric/50" />

                {/* Specular highlight rim */}
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-transparent to-black/10 opacity-60 transition-opacity duration-500 group-hover:opacity-0" />

                <span className="relative z-10 font-mono text-[11px] font-bold tracking-[0.22em] sm:text-[12px]">
                  START
                </span>
                <span className="relative z-10 font-mono text-[11px] font-bold tracking-[0.22em] sm:text-[12px]">
                  A PROJECT
                </span>
                <ArrowUpRight className="relative z-10 mt-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-5 sm:w-5" />
              </button>
            </Magnetic>

            {/* Subordinate Direct Transmission Links (Comfortably spaced to avoid magnetic interference) */}
            <div className="relative z-20 mt-8 flex flex-col items-center gap-3 sm:mt-16 sm:flex-row sm:gap-8">
              <a
                href="mailto:hello@vyron.in"
                className="font-mono text-sm tracking-[0.08em] text-white/60 underline decoration-white/20 underline-offset-8 transition-colors duration-300 hover:text-white hover:decoration-electric"
              >
                hello@vyron.in
              </a>
              <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
              <a
                href="https://wa.me/919845012345?text=Hi%20VYRON%2C%20let%27s%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm tracking-[0.08em] text-emerald-400/90 underline decoration-emerald-400/30 underline-offset-8 transition-colors duration-300 hover:text-emerald-300"
              >
                WhatsApp: +91 98450 12345 ↗
              </a>
              <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
              <button
                onClick={() => scrollToId('#work')}
                className="font-mono text-[12px] font-semibold tracking-[0.22em] text-white/60 transition-colors duration-300 hover:text-white"
              >
                EXPLORE WORK →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

