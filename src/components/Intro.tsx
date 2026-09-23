import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const STATEMENT = "Brands don't need more noise. They need momentum.";

function Word({
  progress,
  range,
  children,
  accent,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
  accent?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [12, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`mr-[0.26em] inline-block will-change-transform last:mr-0 ${
        accent
          ? 'bg-gradient-to-r from-[#9db4ff] via-electric to-iris bg-clip-text text-transparent'
          : ''
      }`}
    >
      {children}
    </motion.span>
  );
}

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const words = STATEMENT.split(' ');
  const subOpacity = useTransform(scrollYProgress, [0.72, 0.92], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.72, 0.92], [50, 0]);
  const glow = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <section id="premise" ref={ref} className="relative h-[260vh] sm:h-[300vh]">
      <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 text-center sm:px-6">
        <motion.div
          style={{ opacity: glow }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[52vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/[0.09] blur-[120px]"
        />
        <motion.p
          style={{ opacity: subOpacity }}
          className="absolute top-14 text-[10px] font-medium tracking-[0.5em] text-electric/90 sm:top-28"
        >
          THE PREMISE
        </motion.p>
        <h2 className="max-w-5xl font-display text-[clamp(1.85rem,6.2vw,4.8rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
          {words.map((w, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, Math.min(1, (i + 1.2) / words.length)]}
              accent={w === 'momentum.'}
            >
              {w}
            </Word>
          ))}
        </h2>
        <motion.p
          style={{ opacity: subOpacity, y: subY }}
          className="mt-6 sm:mt-10 max-w-2xl text-balance text-[14px] sm:text-[15px] leading-relaxed text-white/55 md:text-lg"
        >
          We combine technology, design, content, performance and automation
          into one connected growth system.
        </motion.p>
      </div>
    </section>
  );
}
