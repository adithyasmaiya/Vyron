import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import type { Service } from '../lib/types';

gsap.registerPlugin(ScrollTrigger);

function PanelVisual({ serviceKey, accent }: { serviceKey: string; accent: string }) {
  switch (serviceKey) {
    case 'technology':
      return (
        <div className="relative flex h-60 w-60 items-center justify-center rounded-3xl border border-white/[0.08] bg-void/50 backdrop-blur-xl transition-all duration-500 hover:border-white/20">
          <span className="absolute left-3 top-3 font-mono text-[9px] text-white/20">01 // PLATFORMS</span>
          <div className="relative h-44 w-44">
            <div
              className="animate-spin-slow absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, transparent 0%, ${accent}55 18%, transparent 38%, transparent 55%, ${accent}33 72%, transparent 90%)`,
              }}
            />
            <div className="absolute inset-4 rounded-full border border-white/12" />
            <div className="animate-spin-rev absolute inset-9 rounded-full border border-dashed border-white/20" />
            <div
              className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: accent, boxShadow: `0 0 24px 5px ${accent}` }}
            />
          </div>
        </div>
      );
    case 'design':
      return (
        <div className="relative flex h-60 w-60 items-center justify-center rounded-3xl border border-white/[0.08] bg-void/50 backdrop-blur-xl transition-all duration-500 hover:border-white/20">
          <span className="absolute left-3 top-3 font-mono text-[9px] text-white/20">02 // INTERFACE</span>
          <div className="relative h-44 w-44">
            <div className="glass absolute left-4 top-8 h-28 w-28 rotate-6 rounded-2xl border-white/15" />
            <div
              className="glass absolute left-10 top-4 h-28 w-28 -rotate-3 rounded-2xl transition-transform duration-500 hover:rotate-0"
              style={{ borderColor: `${accent}66` }}
            />
            <div
              className="absolute bottom-6 right-4 h-16 w-16 rounded-full blur-2xl opacity-70"
              style={{ background: `${accent}66` }}
            />
          </div>
        </div>
      );
    case 'content':
      return (
        <div className="relative flex h-60 w-60 flex-col items-center justify-center rounded-3xl border border-white/[0.08] bg-void/50 px-8 backdrop-blur-xl transition-all duration-500 hover:border-white/20">
          <span className="absolute left-3 top-3 font-mono text-[9px] text-white/20">03 // EDITORIAL</span>
          <div className="flex w-full flex-col gap-3.5">
            {[100, 72, 88, 55, 94, 66].map((w, i) => (
              <div
                key={i}
                className="animate-line-grow h-[6px] rounded-full"
                style={{
                  width: `${w}%`,
                  background: `linear-gradient(90deg, ${accent}99, ${accent}22)`,
                  animationDelay: `${i * 0.35}s`,
                }}
              />
            ))}
          </div>
        </div>
      );
    case 'growth':
      return (
        <div className="relative flex h-60 w-60 items-end justify-center pb-8 rounded-3xl border border-white/[0.08] bg-void/50 px-6 backdrop-blur-xl transition-all duration-500 hover:border-white/20">
          <span className="absolute left-3 top-3 font-mono text-[9px] text-white/20">04 // TELEMETRY</span>
          <div className="flex h-36 items-end gap-2.5">
            {[38, 55, 44, 70, 62, 86, 100].map((h, i) => (
              <div
                key={i}
                className="animate-bar w-5 rounded-t-sm md:w-6"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(to top, ${accent}25, ${accent})`,
                  animationDelay: `${i * 0.22}s`,
                }}
              />
            ))}
          </div>
        </div>
      );
    case 'automation':
      return (
        <div className="relative flex h-60 w-60 items-center justify-center rounded-3xl border border-white/[0.08] bg-void/50 backdrop-blur-xl transition-all duration-500 hover:border-white/20">
          <span className="absolute left-3 top-3 font-mono text-[9px] text-white/20">05 // WORKFLOWS</span>
          <div className="relative h-44 w-44">
            <div className="animate-spin-slow absolute inset-0 rounded-full border border-white/12">
              <div
                className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
                style={{ background: accent, boxShadow: `0 0 18px 4px ${accent}` }}
              />
            </div>
            <div className="animate-spin-rev absolute inset-8 rounded-full border border-dashed border-white/20">
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/90" />
            </div>
            <div
              className="absolute inset-[64px] rounded-full border"
              style={{ borderColor: `${accent}77` }}
            />
          </div>
        </div>
      );
    default:
      return (
        <div className="relative flex h-60 w-60 flex-col items-center justify-center rounded-3xl border border-white/[0.08] bg-void/50 p-6 backdrop-blur-xl transition-all duration-500 hover:border-white/20">
          <span className="absolute left-3 top-3 font-mono text-[9px] text-white/20">06 // ATTRIBUTION</span>
          <svg viewBox="0 0 260 120" className="w-full">
            <path
              d="M0,90 C40,90 50,30 90,45 C130,60 140,95 180,70 C210,52 230,20 260,25"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              className="flow-dash"
              strokeLinecap="round"
            />
            <path
              d="M0,100 C50,100 60,55 100,65 C150,78 170,105 220,85 C240,77 250,65 260,62"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.5"
            />
            {[[90, 45], [180, 70], [260, 25]].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="3.5"
                fill={accent}
                className="animate-glow"
                style={{ animationDelay: `${i * 0.7}s` }}
              />
            ))}
          </svg>
        </div>
      );
  }
}

function ServiceBody({ s }: { s: Service }) {
  return (
    <div className="relative grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <div className="flex items-center gap-4">
          <span
            className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-xs font-semibold"
            style={{ color: s.accent }}
          >
            {s.code}
          </span>
          <span className="h-px w-12" style={{ background: `linear-gradient(90deg, ${s.accent}88, transparent)` }} />
          <span className="font-mono text-[10.5px] font-medium tracking-[0.35em] text-white/45">
            {s.key.toUpperCase()} // PRACTICE
          </span>
        </div>

        <h3 className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[1.0] tracking-[-0.02em] text-white">
          {s.name}
        </h3>

        <p className="mt-3 font-display text-lg font-medium tracking-tight md:text-xl" style={{ color: s.accent }}>
          {s.tagline}
        </p>

        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/60">
          {s.description}
        </p>

        <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {s.deliverables.map((d) => (
            <li key={d} className="group/item flex items-center gap-2.5 text-[13px] text-white/70 transition-colors hover:text-white">
              <span
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-colors group-hover/item:border-white/30"
                style={{ color: s.accent }}
              >
                <Plus className="h-2.5 w-2.5" />
              </span>
              <span className="leading-snug">{d}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden items-center justify-center lg:flex" data-cursor>
        <PanelVisual serviceKey={s.key} accent={s.accent} />
      </div>
    </div>
  );
}

export default function Services() {
  const { data: services } = useApi<Service>('/api/services');
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const indexIndicatorRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (services.length === 0) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;

      const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -getAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${getAmount()}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${self.progress})`;
            }
            if (indexIndicatorRef.current && services.length > 0) {
              const currentNum = Math.min(
                services.length,
                Math.max(1, Math.round(self.progress * (services.length - 1) + 1))
              );
              indexIndicatorRef.current.textContent = `0${currentNum} / 0${services.length}`;
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
  }, [services.length]);

  return (
    <section id="services" className="relative scroll-mt-20">
      {/* Desktop Horizontal Scroll Experience */}
      <div ref={wrapRef} className="relative hidden overflow-hidden lg:block">
        <div ref={trackRef} className="flex h-screen w-max items-stretch">
          {/* Section Introduction Stage */}
          <div className="flex w-[44vw] shrink-0 flex-col justify-center px-[7vw]">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.45em] text-electric">
              <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
              SYSTEM ARCHITECTURE
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[1.0] tracking-[-0.02em]">
              Six practices.
              <br />
              <span className="text-stroke">One system.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55">
              Scroll horizontally to navigate through every discipline — each one deep enough
              to stand alone, engineered to compound together.
            </p>
            <div className="mt-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-white/45">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.02] transition-colors hover:border-white/30">
                <ArrowUpRight className="h-4 w-4 rotate-45 text-white/70" />
              </span>
              SCROLL TO EXPLORE →
            </div>
          </div>

          {/* Six Service Panels */}
          {services.map((s) => (
            <div
              key={s.id}
              className="relative flex w-[78vw] shrink-0 items-center border-l border-white/[0.07] px-[6vw]"
            >
              {/* Soft Ambient Discipline Aura */}
              <div
                className="pointer-events-none absolute left-1/4 top-1/3 h-[42vmin] w-[42vmin] rounded-full blur-[140px] opacity-75"
                style={{ background: `${s.accent}1c` }}
              />

              {/* Monolithic Number Watermark */}
              <span className="text-stroke-faint pointer-events-none absolute right-[4vw] top-[8vh] select-none font-display text-[12rem] font-bold leading-none opacity-25">
                {s.code}
              </span>

              <ServiceBody s={s} />
            </div>
          ))}

          {/* System Synthesis Outro Panel */}
          <div className="flex w-[32vw] shrink-0 flex-col items-center justify-center border-l border-white/[0.07] px-8 text-center">
            <p className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">SYSTEM SYNTHESIS</p>
            <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-white/50">
              One connected system<span style={{ color: '#4d7cfe' }}>.</span>
            </p>
            <p className="mt-2 text-xs text-white/35">Built for exponential compounding momentum.</p>
          </div>
        </div>

        {/* Bottom Horizontal Scrub Progress Indicator */}
        <div className="absolute bottom-8 left-[7vw] right-[7vw] flex items-center gap-6">
          <span className="font-mono text-[10px] tracking-[0.35em] text-white/40">01</span>
          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              ref={barRef}
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-electric via-iris to-cyan-400 shadow-[0_0_12px_rgba(77,124,254,0.6)]"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <div className="flex items-center gap-3">
            <span
              ref={indexIndicatorRef}
              className="font-mono text-[10px] font-semibold tracking-[0.25em] text-electric"
            >
              01 / 06
            </span>
            <span className="font-mono text-[10px] tracking-[0.35em] text-white/40">06</span>
          </div>
        </div>
      </div>

      {/* Mobile Native Vertical Touch Scroll Experience (< 1024px) */}
      <div className="px-5 py-28 sm:px-8 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.45em] text-electric">
            <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
            WHAT WE DO
          </div>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.02] tracking-tight sm:text-4xl">
            Six practices. <span className="text-white/40">One system.</span>
          </h2>
        </motion.div>

        <div className="mt-12 space-y-6">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.04, 0.2) }}
              className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-ink/90 p-5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] sm:p-8"
            >
              {/* Top subtle highlight line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[85px]"
                style={{ background: `${s.accent}24` }}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-xs font-semibold"
                    style={{ color: s.accent }}
                  >
                    {s.code}
                  </span>
                  <span className="h-px w-8" style={{ background: `${s.accent}66` }} />
                  <span className="font-mono text-[10px] tracking-[0.35em] text-white/45">{s.key}</span>
                </div>
                <span className="text-stroke-faint select-none font-display text-4xl font-bold opacity-30">
                  {s.code}
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{s.name}</h3>
              <p className="mt-1.5 text-[15px] font-medium" style={{ color: s.accent }}>{s.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{s.description}</p>

              <ul className="mt-6 grid grid-cols-1 gap-2.5 border-t border-white/[0.06] pt-5">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2.5 text-[13px] text-white/70">
                    <span
                      className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]"
                      style={{ color: s.accent }}
                    >
                      <Plus className="h-2 w-2" />
                    </span>
                    <span className="leading-snug">{d}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
