import { Suspense, lazy, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';
import ErrorBoundary from './ErrorBoundary';
import { scrollToId } from '../lib/scroll';

const HeroScene = lazy(() => import('./HeroScene'));

const EASE = [0.22, 1, 0.36, 1] as const;

function HeadlineLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: '112%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.15, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero({ onStart }: { onStart: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.15]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div style={{ opacity: glowOpacity }} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[46%] h-[62vmin] w-[86vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/[0.13] blur-[110px]" />
        <div className="absolute left-[18%] top-[24%] h-[30vmin] w-[30vmin] rounded-full bg-iris/[0.12] blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-40 w-[120%] -translate-x-1/2 bg-gradient-to-t from-void to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.5]"
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
        <h1 className="font-display text-[clamp(2.5rem,10.5vw,10rem)] font-bold leading-[0.94] tracking-[-0.03em]">
          <HeadlineLine delay={0.2}>DIGITAL</HeadlineLine>
          <HeadlineLine delay={0.32}>
            <span className="text-stroke">GROWTH,</span>
          </HeadlineLine>
          <HeadlineLine delay={0.44}>
            <span className="bg-gradient-to-r from-[#9db4ff] via-electric to-iris bg-clip-text text-transparent">
              REIMAGINED
            </span>
          </HeadlineLine>
        </h1>

        <div className="mt-8 flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.05 }}
            className="max-w-xl text-balance text-[15px] leading-relaxed text-white/60 sm:text-base"
          >
            We build digital experiences, growth systems and intelligent automation
            that move ambitious brands forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.2 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Magnetic strength={0.3}>
              <button
                onClick={onStart}
                className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[13px] font-semibold tracking-[0.14em] text-black transition-all duration-300 hover:bg-electric hover:text-white hover:shadow-[0_0_60px_-8px_rgba(77,124,254,0.9)]"
              >
                START A PROJECT
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button
                onClick={() => scrollToId('#work')}
                className="glass rounded-full px-8 py-4 text-[13px] font-semibold tracking-[0.14em] text-white/85 transition-all duration-300 hover:border-white/30 hover:text-white"
              >
                EXPLORE OUR WORK
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
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
