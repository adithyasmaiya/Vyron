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
      {/* Ambient background atmosphere */}
      <div className="pointer-events-none absolute right-[-5%] top-[20%] h-[48vmin] w-[48vmin] rounded-full bg-iris/[0.06] blur-[140px]" />
      <div className="pointer-events-none absolute left-[-5%] bottom-[15%] h-[40vmin] w-[40vmin] rounded-full bg-electric/[0.035] blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-electric/60" />
            <p className="text-[11px] font-medium tracking-[0.5em] text-electric">THE STUDIO</p>
          </div>
          <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.0] tracking-[-0.02em]">
            Six disciplines.
            <br />
            <span className="text-stroke">One vision.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Digital Monolith */}
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
              className="group relative overflow-hidden rounded-[2rem] sm:rounded-[2.25rem] border border-white/12 bg-ink/90 shadow-[0_35px_100px_-25px_rgba(0,0,0,0.95)] transition-all duration-700 hover:border-white/25 hover:shadow-[0_45px_120px_-20px_rgba(109,125,251,0.25)]"
              data-cursor
            >
              <div className="relative h-[420px] w-full overflow-hidden sm:h-[520px] md:h-[560px]">
                <motion.img
                  src="/images/about-core.jpg"
                  alt="VYRON monolith — dark glass slab with violet edge light"
                  style={{ scale: imgScale, y: imgY }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />

                {/* Multi-tier gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-void/40 via-transparent to-transparent z-10" />

                {/* Top specular hairline accent */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-20" />

                {/* Outer inset boundary ring */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.08] rounded-[2rem] sm:rounded-[2.25rem] z-20" />

                {/* Ambient corner illumination */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-iris/15 blur-[80px] opacity-0 transition-opacity duration-700 group-hover:opacity-100 z-10" />

                {/* Top Monolith Metadata */}
                <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-6 sm:p-7">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-iris/40 opacity-75" />
                      <span className="h-1.5 w-1.5 rounded-full bg-iris shadow-[0_0_6px_#8b5cf6]" />
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-white/80">
                      STUDIO // ARTIFACT
                    </span>
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[9px] tracking-[0.25em] text-white/50 backdrop-blur-md">
                    MONOLITH 01
                  </span>
                </div>

                {/* Bottom Monolith Information */}
                <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-7 sm:p-8">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-iris" />
                      <p className="font-mono text-[10px] tracking-[0.4em] text-white/55">VYRON CORE</p>
                    </div>
                    <p className="mt-2 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      Design × Technology × Growth
                    </p>
                  </div>
                  <span className="hidden rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 font-mono text-[10px] tracking-[0.3em] text-white/70 backdrop-blur-xl transition-colors group-hover:border-white/25 group-hover:text-white sm:block">
                    EST. MMXXVI
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Studio Values Capsules */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              {VALUES.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-1.5 text-xs font-medium tracking-[0.08em] text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                >
                  <span className="h-1 w-1 rounded-full bg-iris/60" />
                  {v}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Editorial Manifesto & Disciplines Index */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, delay: 0.12, ease: EASE }}
            className="flex flex-col justify-center"
          >
            <div className="border-l-2 border-electric/40 pl-6">
              <p className="text-[15px] leading-relaxed text-white/70 sm:text-base font-normal">
                VYRON is a multidisciplinary growth studio operating where a creative studio,
                an engineering team and a performance agency converge. No silos, no handoffs
                lost in translation — one team fluent in technology, design, content,
                media, automation and data.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/70 sm:text-base font-normal">
                We partner with a small number of ambitious brands at a time, embedding
                deeply and building systems designed to outlast the engagement.
              </p>
            </div>

            <div className="mt-9 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {disciplines.map((d) => (
                <button
                  key={d.id}
                  onClick={() => scrollToId('#system')}
                  className="group flex w-full items-center justify-between py-4 text-left transition-all duration-300 hover:pl-2"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-xs font-semibold tracking-wider" style={{ color: d.color }}>
                      {d.code}
                    </span>
                    <span className="font-display text-lg font-medium tracking-tight text-white/80 transition-colors duration-300 group-hover:text-white sm:text-xl">
                      {d.name}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="hidden text-[12px] tracking-wide text-white/45 sm:block">{d.tagline}</span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/40 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/[0.08] group-hover:text-white">
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
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
