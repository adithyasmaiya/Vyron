import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import type { Discipline } from '../lib/types';
import { scrollToId } from '../lib/scroll';

const EASE = [0.22, 1, 0.36, 1] as const;

const VALUES = ['Precision', 'Momentum', 'Craft', 'Intelligence', 'Restraint', 'Velocity'];

export default function About() {
  const { data: disciplines } = useApi<Discipline>('/api/disciplines');
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });

  const onTilt = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };

  return (
    <section id="studio" ref={sectionRef} className="relative scroll-mt-20 overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute right-[-8%] top-[20%] h-[44vmin] w-[44vmin] rounded-full bg-iris/[0.07] blur-[130px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="text-[11px] font-medium tracking-[0.5em] text-electric">THE STUDIO</p>
          <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.0] tracking-[-0.02em]">
            Six disciplines.
            <br />
            <span className="text-stroke">One vision.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: EASE }}
            style={{ perspective: 1200 }}
          >
            <motion.div
              ref={cardRef}
              onMouseMove={onTilt}
              onMouseLeave={() => {
                rx.set(0);
                ry.set(0);
              }}
              style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10"
              data-cursor
            >
              <div className="relative h-[480px] w-full overflow-hidden sm:h-[560px]">
                <motion.img
                  src="/images/about-core.jpg"
                  alt="VYRON monolith — dark glass slab with violet edge light"
                  style={{ scale: imgScale, y: imgY }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 sm:p-8">
                  <div>
                    <p className="text-[10px] tracking-[0.4em] text-white/50">VYRON CORE</p>
                    <p className="mt-2 font-display text-xl font-semibold sm:text-2xl">
                      Design × Technology × Growth
                    </p>
                  </div>
                  <span className="glass hidden rounded-full px-4 py-2 text-[10px] tracking-[0.3em] text-white/70 sm:block">
                    EST. MMXXVI · BENGALURU, INDIA
                  </span>
                </div>
              </div>
            </motion.div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {VALUES.map((v) => (
                <span key={v} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white/60">
                  {v}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, delay: 0.12, ease: EASE }}
            className="flex flex-col justify-center"
          >
            <p className="text-[15px] leading-relaxed text-white/60 sm:text-base">
              Engineered in Bengaluru, VYRON is a multidisciplinary growth studio
              operating where high-end design, deep engineering and compounding growth converge.
              No silos, no handoffs lost in translation — one team fluent in technology,
              design, content, performance marketing, automation and intelligence.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-white/60 sm:text-base">
              We partner with an intentional cohort of category-defining Indian brands and
              fast-scaling global ventures, embedding deeply to build systems designed to outlast
              the engagement.
            </p>

            <div className="mt-9">
              {disciplines.map((d) => (
                <button
                  key={d.id}
                  onClick={() => scrollToId('#system')}
                  className="group flex w-full items-center justify-between border-t border-white/[0.09] py-4 text-left last:border-b"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-display text-xs" style={{ color: d.color }}>{d.code}</span>
                    <span className="font-display text-lg font-medium tracking-tight text-white/75 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white sm:text-xl">
                      {d.name}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="hidden text-[12px] text-white/40 sm:block">{d.tagline}</span>
                    <ArrowUpRight className="h-4 w-4 text-white/25 transition-all duration-300 group-hover:text-white" />
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
