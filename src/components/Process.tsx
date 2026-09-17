import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useApi } from '../hooks/useApi';
import type { ProcessStep } from '../lib/types';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Process() {
  const { data: steps } = useApi<ProcessStep>('/api/process');
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (steps.length === 0) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;

      const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth + 120);

      const tween = gsap.to(track, {
        x: () => -getAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${getAmount() * 1.15}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { x: 0 });
      };
    });

    return () => mm.revert();
  }, [steps.length]);

  return (
    <section id="process" className="relative scroll-mt-20">
      {/* Desktop: Pinned Horizontal Side-Scroll driven by page scroll */}
      <div
        ref={wrapRef}
        className="relative hidden min-h-screen overflow-hidden lg:flex lg:flex-col lg:justify-between lg:py-16"
      >
        <div className="pointer-events-none absolute left-[-12%] top-[30%] h-[46vmin] w-[46vmin] rounded-full bg-electric/[0.07] blur-[130px]" />

        {/* Section Header */}
        <div className="mx-auto w-full max-w-7xl px-8">
          <p className="text-[11px] font-medium tracking-[0.5em] text-electric">HOW WE WORK</p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1.0] tracking-[-0.02em]">
            From idea
            <br />
            to{' '}
            <span className="bg-gradient-to-r from-[#9db4ff] via-electric to-iris bg-clip-text text-transparent">
              impact.
            </span>
          </h2>
        </div>

        {/* Side-Scrolling Cards Track */}
        <div className="relative mt-8 w-full overflow-hidden">
          <div
            ref={trackRef}
            data-cursor
            className="flex w-max items-stretch gap-6 pl-8 pr-16 will-change-transform"
          >
            {steps.map((s) => (
              <article
                key={s.id}
                className="group relative flex w-[370px] shrink-0 flex-col"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute h-full w-full rounded-full bg-electric/50 transition-all duration-500 group-hover:scale-150 group-hover:bg-electric" />
                  </span>
                  <span className="h-px w-full bg-gradient-to-r from-white/25 to-white/[0.04]" />
                </div>
                <div className="glass flex h-full flex-col justify-between rounded-3xl p-8 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-electric/35 group-hover:shadow-[0_24px_70px_-24px_rgba(77,124,254,0.45)]">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-stroke-faint font-display text-6xl font-bold">{s.code}</span>
                      <span className="text-[10px] tracking-[0.3em] text-white/40">{s.phase.toUpperCase()}</span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{s.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{s.description}</p>
                  </div>
                  <div className="mt-6 border-t border-white/[0.08] pt-5">
                    <p className="text-[10px] tracking-[0.35em] text-white/35">OUTPUTS</p>
                    <ul className="mt-3 space-y-2">
                      {s.outputs.map((o) => (
                        <li key={o} className="flex items-center gap-2.5 text-[13px] text-white/70">
                          <span className="h-1 w-1 rounded-full bg-electric" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Timeline Progress Bar */}
        <div className="mx-auto flex w-full max-w-7xl items-center gap-5 px-8 pt-6">
          <span className="text-[10px] tracking-[0.35em] text-white/40">01 DISCOVER</span>
          <div className="h-px flex-1 bg-white/10">
            <div
              ref={barRef}
              className="h-full origin-left bg-gradient-to-r from-electric to-iris"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <span className="text-[10px] tracking-[0.35em] text-white/40">05 COMPOUND</span>
        </div>
      </div>

      {/* Mobile / Tablet Screen: Touch-friendly horizontal swipe */}
      <div className="px-5 py-24 sm:px-8 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="text-[11px] font-medium tracking-[0.5em] text-electric">HOW WE WORK</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight">
            From idea
            <br />
            to{' '}
            <span className="bg-gradient-to-r from-[#9db4ff] via-electric to-iris bg-clip-text text-transparent">
              impact.
            </span>
          </h2>
        </motion.div>

        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {steps.map((s) => (
            <article
              key={s.id}
              className="group relative w-[82vw] max-w-[340px] shrink-0 snap-start"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute h-full w-full rounded-full bg-electric/50" />
                </span>
                <span className="h-px w-full bg-gradient-to-r from-white/25 to-white/[0.04]" />
              </div>
              <div className="glass flex h-full flex-col justify-between rounded-3xl border border-white/10 p-6 sm:p-7">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-stroke-faint font-display text-5xl font-bold">{s.code}</span>
                    <span className="text-[10px] tracking-[0.3em] text-white/40">{s.phase.toUpperCase()}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{s.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{s.description}</p>
                </div>
                <div className="mt-6 border-t border-white/[0.08] pt-5">
                  <p className="text-[10px] tracking-[0.35em] text-white/35">OUTPUTS</p>
                  <ul className="mt-3 space-y-2">
                    {s.outputs.map((o) => (
                      <li key={o} className="flex items-center gap-2.5 text-[13px] text-white/70">
                        <span className="h-1 w-1 rounded-full bg-electric" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
