import { Suspense, lazy, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';
import ErrorBoundary from './ErrorBoundary';
import { scrollToId } from '../lib/scroll';

const HeroScene = lazy(() => import('./HeroScene'));

const EASE = [0.22, 1, 0.36, 1] as const;

function HeadlineLine({
  children,
  delay,
  ready = true,
}: {
  children: React.ReactNode;
  delay: number;
  ready?: boolean;
}) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: '112%' }}
        animate={ready ? { y: 0 } : { y: '112%' }}
        transition={{ duration: 1.05, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero({ onStart, ready = true }: { onStart: () => void; ready?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.15]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div style={{ opacity: glowOpacity }} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[46%] h-[62vmin] w-[86vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/[0.11] blur-[110px]" />
        <div className="absolute left-[18%] top-[24%] h-[30vmin] w-[30vmin] rounded-full bg-iris/[0.10] blur-[100px]" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-void via-void/60 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
            backgroundSize: '88px 88px',
            maskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, black 20%, transparent 75%)',
          }}
        />
      </motion.div>

      <div className="absolute inset-0">
        <ErrorBoundary>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </ErrorBoundary>
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 pb-12 pt-24 text-center sm:px-8"
      >
        <h1 className="font-display text-[clamp(2.15rem,9.5vw,10rem)] font-bold leading-[0.94] tracking-[-0.03em] sm:text-[clamp(2.9rem,11vw,10rem)]">
          <HeadlineLine delay={0.1} ready={ready}>
            DIGITAL
          </HeadlineLine>
          <HeadlineLine delay={0.22} ready={ready}>
            <span className="text-stroke">GROWTH,</span>
          </HeadlineLine>
          <HeadlineLine delay={0.34} ready={ready}>
            <span className="bg-gradient-to-r from-[#9db4ff] via-electric to-iris bg-clip-text text-transparent">
              REIMAGINED
            </span>
          </HeadlineLine>
        </h1>

        <div className="mt-8 flex w-full flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.52 }}
            className="max-w-xl text-balance text-[15px] leading-relaxed text-white/60 sm:text-base"
          >
            We build digital experiences, growth systems and intelligent automation
            that move ambitious brands forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.68 }}
            className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row sm:gap-4"
          >
            <Magnetic strength={0.3} className="w-full max-w-xs sm:w-auto">
              <button
                onClick={onStart}
                className="group relative flex min-h-[48px] w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[13px] font-semibold tracking-[0.14em] text-black transition-all duration-300 hover:bg-electric hover:text-white hover:shadow-[0_0_50px_-6px_rgba(77,124,254,0.85)] active:scale-[0.98] touch-manipulation sm:w-auto"
              >
                START A PROJECT
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>
            <Magnetic strength={0.3} className="w-full max-w-xs sm:w-auto">
              <button
                onClick={() => scrollToId('#work')}
                className="glass group flex min-h-[48px] w-full items-center justify-center rounded-full border border-white/12 px-8 py-4 text-[13px] font-semibold tracking-[0.14em] text-white/85 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:text-white active:scale-[0.98] touch-manipulation sm:w-auto"
              >
                EXPLORE OUR WORK
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.05, duration: 0.8 }}
        onClick={() => scrollToId('#premise')}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/35 transition-colors hover:text-white/70 md:flex"
        aria-label="Scroll to explore"
      >
        <span className="text-[9px] tracking-[0.4em]">SCROLL</span>
        <motion.span animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
