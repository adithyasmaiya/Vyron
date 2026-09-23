import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useApi } from '../hooks/useApi';
import type { ProcessStep } from '../lib/types';

export default function Process() {
  const { data: steps } = useApi<ProcessStep>('/api/process');
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (steps.length === 0) return;

    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth + 60);

    // Initialize first card as active
    if (track.children.length > 0) {
      (track.children[0] as HTMLElement).setAttribute('data-active', 'true');
    }

    const tween = gsap.to(track, {
      x: () => -getAmount(),
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: () => `+=${getAmount() * 1.15}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.8,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${self.progress})`;
          }

          // Sync active step state across the execution pipeline
          const children = track.children;
          const activeIdx = Math.min(
            children.length - 1,
            Math.max(0, Math.round(self.progress * (children.length - 1)))
          );

          for (let i = 0; i < children.length; i++) {
            const el = children[i] as HTMLElement;
            if (i === activeIdx) {
              el.setAttribute('data-active', 'true');
            } else {
              el.removeAttribute('data-active');
            }
          }
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(track, { x: 0 });
      for (let i = 0; i < track.children.length; i++) {
        (track.children[i] as HTMLElement).removeAttribute('data-active');
      }
    };
  }, [steps.length]);

  return (
    <section id="process" className="relative scroll-mt-20">
      {/* Pinned Horizontal Execution Pipeline driven by page scroll on all devices */}
      <div
        ref={wrapRef}
        className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden py-8 sm:py-14"
      >
        {/* Subtle Ambient Depth Lighting */}
        <div className="pointer-events-none absolute -left-32 top-[28%] h-[50vmin] w-[50vmin] rounded-full bg-electric/[0.06] blur-[140px]" />
        <div className="pointer-events-none absolute right-[-10%] top-[45%] h-[40vmin] w-[40vmin] rounded-full bg-iris/[0.04] blur-[120px]" />

        {/* Section Header */}
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-electric/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-electric" />
            </span>
            <p className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.45em] text-electric uppercase">
              HOW WE WORK
            </p>
            <span className="hidden sm:inline-block h-3 w-px bg-white/15" />
            <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
              EXECUTION PIPELINE
            </span>
          </div>
          <h2 className="mt-2.5 sm:mt-4 font-display text-2xl sm:text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
            From idea
            <br />
            to{' '}
            <span className="bg-gradient-to-r from-[#9db4ff] via-electric to-iris bg-clip-text text-transparent">
              impact.
            </span>
          </h2>
        </div>

        {/* Side-Scrolling Execution Pipeline Cards Track */}
        <div className="relative mt-6 sm:mt-8 w-full overflow-hidden">
          <div
            ref={trackRef}
            data-cursor
            className="flex w-max items-stretch gap-4 sm:gap-6 pl-5 pr-10 sm:pl-8 sm:pr-16 will-change-transform"
          >
            {steps.map((s) => (
              <article
                key={s.id}
                className="group relative flex w-[84vw] max-w-[380px] shrink-0 flex-col"
              >
                {/* Pipeline Execution Rail & Telemetry Node */}
                <div className="mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="relative flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#090b12] transition-all duration-500 group-hover:border-electric group-hover:shadow-[0_0_12px_rgba(77,124,254,0.5)] group-[[data-active=true]]:border-electric group-[[data-active=true]]:shadow-[0_0_12px_rgba(77,124,254,0.5)]">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-electric/50 transition-all duration-500 group-hover:scale-125 group-hover:bg-electric group-[[data-active=true]]:scale-125 group-[[data-active=true]]:bg-electric" />
                  </div>
                  <div className="relative h-px w-full overflow-hidden bg-white/[0.08]">
                    <div className="h-full w-full bg-gradient-to-r from-electric/40 via-white/20 to-white/[0.04] transition-all duration-500 group-hover:from-electric group-hover:via-white/35 group-[[data-active=true]]:from-electric group-[[data-active=true]]:via-white/35" />
                  </div>
                  <span className="shrink-0 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-white/35 transition-colors duration-500 group-hover:text-electric group-[[data-active=true]]:text-electric">
                    PHASE_{s.code}
                  </span>
                </div>

                {/* Pipeline Stage Card Module */}
                <div
                  className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0c0d14]/90 p-5 sm:p-8 backdrop-blur-xl group-hover:-translate-y-1.5 group-hover:border-electric/40 group-hover:bg-[#0e101b]/95 group-hover:shadow-[0_24px_60px_-20px_rgba(77,124,254,0.35)] group-[[data-active=true]]:border-electric/40 group-[[data-active=true]]:bg-[#0e101b]/95 group-[[data-active=true]]:shadow-[0_20px_50px_-20px_rgba(77,124,254,0.25)]"
                  style={{
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s ease, background-color 0.5s ease, box-shadow 0.6s ease',
                    willChange: 'transform, border-color, box-shadow',
                  }}
                >
                  {/* Top Specular Edge Highlight */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 group-hover:via-electric/60 group-[[data-active=true]]:via-electric/50" />

                  {/* Radial Ambient Glow */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-electric/[0.03] blur-2xl transition-all duration-700 group-hover:bg-electric/[0.12] group-[[data-active=true]]:bg-electric/[0.08]" />

                  <div>
                    {/* Code & Phase Header */}
                    <div className="flex items-baseline justify-between">
                      <span className="select-none font-mono text-4xl sm:text-6xl font-extrabold tracking-tighter text-white/20 transition-colors duration-500 group-hover:text-white/35 group-[[data-active=true]]:text-electric/40">
                        {s.code}
                      </span>
                      <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-white/50 uppercase backdrop-blur-sm transition-colors duration-300 group-hover:border-electric/30 group-hover:text-white/80 group-[[data-active=true]]:border-electric/30 group-[[data-active=true]]:text-white/80">
                        {s.phase.toUpperCase()}
                      </span>
                    </div>

                    {/* Step Title & Narrative */}
                    <h3 className="mt-4 sm:mt-5 font-display text-xl sm:text-2xl font-semibold tracking-tight text-white transition-colors duration-300">
                      {s.name}
                    </h3>
                    <p className="mt-2.5 sm:mt-3 text-[13px] sm:text-sm leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/75 group-[[data-active=true]]:text-white/75">
                      {s.description}
                    </p>
                  </div>

                  {/* Outputs / Deliverables */}
                  <div className="mt-6 sm:mt-8 border-t border-white/[0.08] pt-4 sm:pt-5">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[9.5px] sm:text-[10px] tracking-[0.3em] text-white/35 uppercase">
                        OUTPUTS
                      </p>
                      <span className="font-mono text-[8.5px] sm:text-[9px] tracking-wider text-white/25">
                        {s.outputs.length} ARTIFACTS
                      </span>
                    </div>
                    <ul className="mt-3 space-y-2 sm:space-y-2.5">
                      {s.outputs.map((o) => (
                        <li
                          key={o}
                          className="flex items-center gap-2.5 text-[12px] sm:text-[13px] text-white/70 transition-colors duration-300 group-hover:text-white/85"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-[1px] bg-electric/60 transition-all duration-300 group-hover:bg-electric group-hover:shadow-[0_0_8px_#4d7cfe] group-[[data-active=true]]:bg-electric" />
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

        {/* Timeline Progress Bar & Pipeline Status Readout */}
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 sm:gap-6 px-5 sm:px-8 pt-4 sm:pt-6">
          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-white/45">
            <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_8px_#4d7cfe]" />
            <span>01 DISCOVER</span>
          </div>

          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              ref={barRef}
              className="h-full origin-left bg-gradient-to-r from-electric via-[#7d9eff] to-iris shadow-[0_0_12px_rgba(77,124,254,0.6)]"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-white/45">
            <span>
              {steps[steps.length - 1]?.code ?? '05'}{' '}
              {steps[steps.length - 1]?.name.toUpperCase() ?? 'COMPOUND'}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-iris/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
