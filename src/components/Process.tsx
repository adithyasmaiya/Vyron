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
        <div className="pointer-events-none absolute left-[-10%] top-[30%] h-[48vmin] w-[48vmin] rounded-full bg-electric/[0.08] blur-[140px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,4,10,0.5)_100%)]" />

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
                {/* Continuous Execution Rail above card */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                    <span className="absolute h-full w-full rounded-full bg-electric/25 transition-all duration-500 group-hover:scale-150 group-hover:bg-electric/40" />
                    <span className="h-1.5 w-1.5 rounded-full bg-electric transition-all duration-500 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_#38bdf8]" />
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] tracking-widest text-white/50 transition-colors group-hover:border-electric/40 group-hover:text-electric">
                    STAGE {s.code}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent transition-all duration-500 group-hover:from-electric/60 group-hover:via-electric/20" />
                </div>
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/12 bg-ink/75 p-8 backdrop-blur-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-electric/45 group-hover:bg-ink/90 group-hover:shadow-[0_30px_70px_-20px_rgba(77,124,254,0.4)]">
                  {/* Ambient corner highlight */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric/15 blur-[60px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-stroke-faint font-display text-6xl font-bold transition-colors duration-500 select-none group-hover:text-white/15">
                        {s.code}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[9px] font-medium tracking-[0.3em] text-white/45 transition-colors group-hover:border-white/20 group-hover:text-white/70">
                        {s.phase.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-white">
                      {s.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      {s.description}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-white/[0.08] pt-5">
                    <p className="text-[10px] tracking-[0.35em] text-white/35">OUTPUTS</p>
                    <ul className="mt-3 space-y-2">
                      {s.outputs.map((o) => (
                        <li key={o} className="flex items-center gap-2.5 text-[13px] text-white/70 transition-colors duration-300 group-hover:text-white/90">
                          <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full border border-electric/40 bg-electric/10">
                            <span className="h-1 w-1 rounded-full bg-electric group-hover:bg-cyan-400" />
                          </span>
                          <span>{o}</span>
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
        <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-8 pt-6">
          <span className="font-display text-[11px] font-semibold tracking-[0.3em] text-white/60">
            {steps[0]?.code ?? '01'} {steps[0]?.name.toUpperCase() ?? 'DISCOVER'}
          </span>
          <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              ref={barRef}
              className="h-full origin-left rounded-full bg-gradient-to-r from-electric via-iris to-cyan-400 shadow-[0_0_12px_rgba(77,124,254,0.8)]"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <span className="font-display text-[11px] font-semibold tracking-[0.3em] text-white/60">
            {steps[steps.length - 1]?.code ?? '05'} {steps[steps.length - 1]?.name.toUpperCase() ?? 'COMPOUND'}
          </span>
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
                <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                  <span className="absolute h-full w-full rounded-full bg-electric/30" />
                  <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] tracking-widest text-white/50">
                  STAGE {s.code}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
              </div>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-ink/80 p-6 backdrop-blur-xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] sm:p-7">
                <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-electric/15 blur-[60px]" />
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-stroke-faint font-display text-5xl font-bold select-none">{s.code}</span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[9px] font-medium tracking-[0.3em] text-white/45">
                      {s.phase.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{s.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{s.description}</p>
                </div>
                <div className="mt-6 border-t border-white/[0.08] pt-5">
                  <p className="text-[10px] tracking-[0.35em] text-white/35">OUTPUTS</p>
                  <ul className="mt-3 space-y-2">
                    {s.outputs.map((o) => (
                      <li key={o} className="flex items-center gap-2.5 text-[13px] text-white/70">
                        <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full border border-electric/40 bg-electric/10">
                          <span className="h-1 w-1 rounded-full bg-electric" />
                        </span>
                        <span>{o}</span>
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
