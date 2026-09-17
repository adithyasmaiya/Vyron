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
        <div className="relative h-60 w-60">
          <div
            className="animate-spin-slow absolute inset-0 rounded-full"
            style={{ background: `conic-gradient(from 0deg, transparent 0%, ${accent}66 18%, transparent 38%, transparent 55%, ${accent}44 72%, transparent 90%)` }}
          />
          <div className="absolute inset-5 rounded-full border border-white/12" />
          <div className="animate-spin-rev absolute inset-11 rounded-full border border-dashed border-white/20" />
          <div className="absolute inset-[86px] rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: accent, boxShadow: `0 0 24px 4px ${accent}` }} />
        </div>
      );
    case 'design':
      return (
        <div className="relative h-60 w-60">
          <div className="absolute left-6 top-10 h-36 w-36 rotate-6 rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]" />
          <div className="absolute left-14 top-6 h-36 w-36 -rotate-3 rounded-2xl border bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]" style={{ borderColor: `${accent}66` }} />
          <div className="absolute bottom-8 right-6 h-20 w-20 rounded-full blur-2xl" style={{ background: `${accent}45` }} />
          <div className="absolute left-20 top-12 h-2 w-2 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }} />
        </div>
      );
    case 'content':
      return (
        <div className="flex w-64 flex-col gap-3.5">
          {[100, 72, 88, 55, 94, 66].map((w, i) => (
            <div
              key={i}
              className="animate-line-grow h-[7px] rounded-full"
              style={{ width: `${w}%`, background: `linear-gradient(90deg, ${accent}90, ${accent}20)`, animationDelay: `${i * 0.35}s` }}
            />
          ))}
        </div>
      );
    case 'growth':
      return (
        <div className="flex h-60 items-end gap-3.5">
          {[38, 55, 44, 70, 62, 86, 100].map((h, i) => (
            <div
              key={i}
              className="animate-bar w-7 rounded-t-md md:w-8"
              style={{ height: `${h}%`, background: `linear-gradient(to top, ${accent}25, ${accent})`, animationDelay: `${i * 0.22}s`, boxShadow: `0 0 16px -2px ${accent}40` }}
            />
          ))}
        </div>
      );
    case 'automation':
      return (
        <div className="relative h-60 w-60">
          <div className="animate-spin-slow absolute inset-0 rounded-full border border-white/12">
            <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full" style={{ background: accent, boxShadow: `0 0 18px 3px ${accent}` }} />
          </div>
          <div className="animate-spin-rev absolute inset-9 rounded-full border border-dashed border-white/20">
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/80" />
          </div>
          <div className="absolute inset-[76px] rounded-full border border-white/10" style={{ borderColor: `${accent}66` }} />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }} />
        </div>
      );
    default:
      return (
        <div className="relative w-64">
          <svg viewBox="0 0 260 120" className="w-full">
            <path d="M0,90 C40,90 50,30 90,45 C130,60 140,95 180,70 C210,52 230,20 260,25" fill="none" stroke={accent} strokeWidth="2" className="flow-dash" strokeLinecap="round" />
            <path d="M0,100 C50,100 60,55 100,65 C150,78 170,105 220,85 C240,77 250,65 260,62" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            {[[90, 45], [180, 70], [260, 25]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3.5" fill={accent} className="animate-glow" style={{ animationDelay: `${i * 0.7}s` }} />
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
        <div className="flex items-center gap-3">
          <span
            className="flex h-6 items-center rounded-full border px-2.5 font-display text-xs font-semibold tracking-wider"
            style={{ borderColor: `${s.accent}45`, color: s.accent, background: `${s.accent}14` }}
          >
            {s.code}
          </span>
          <span className="h-px w-10 bg-white/15" />
          <span className="text-[11px] font-medium tracking-[0.4em] text-white/50">{s.key.toUpperCase()}</span>
        </div>
        <h3 className="mt-6 font-display text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[1.0] tracking-[-0.02em]">
          {s.name}
        </h3>
        <p className="mt-3 font-display text-lg md:text-xl" style={{ color: `${s.accent}` }}>
          {s.tagline}
        </p>
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/55">{s.description}</p>
        <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {s.deliverables.map((d) => (
            <li key={d} className="flex items-center gap-2.5 text-[13px] text-white/70 transition-colors duration-200 hover:text-white">
              <span
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: `${s.accent}55`, background: `${s.accent}18` }}
              >
                <Plus className="h-2.5 w-2.5" style={{ color: s.accent }} />
              </span>
              <span>{d}</span>
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

  useLayoutEffect(() => {
    if (services.length === 0) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;
      const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth + 32);
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
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
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
      <div ref={wrapRef} className="relative hidden overflow-hidden lg:block">
        <div ref={trackRef} className="flex h-screen w-max items-stretch">
          <div className="relative flex w-[44vw] shrink-0 flex-col justify-center px-[7vw]">
            <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[45vmin] w-[45vmin] rounded-full bg-electric/[0.08] blur-[120px]" />
            <p className="text-[11px] font-medium tracking-[0.5em] text-electric">WHAT WE DO</p>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[1.0] tracking-[-0.02em]">
              Six practices.
              <br />
              <span className="text-stroke">One system.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55">
              Scroll to travel through every discipline — each one deep enough to stand
              alone, designed to compound together.
            </p>
            <div className="mt-10 flex items-center gap-3 text-[11px] tracking-[0.35em] text-white/40">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15">
                <ArrowUpRight className="h-4 w-4 rotate-45" />
              </span>
              KEEP SCROLLING
            </div>
          </div>
          {services.map((s) => (
            <div
              key={s.id}
              className="group relative flex w-[78vw] shrink-0 items-center border-l border-white/[0.08] px-[6vw] transition-colors duration-500 hover:border-white/[0.16]"
            >
              <div
                className="pointer-events-none absolute left-1/4 top-1/3 h-[45vmin] w-[45vmin] rounded-full blur-[140px] opacity-30 transition-opacity duration-700 group-hover:opacity-60"
                style={{ background: s.accent }}
              />
              <span className="text-stroke-faint pointer-events-none absolute right-[4vw] top-[8vh] font-display text-[10rem] font-bold leading-none select-none opacity-30 transition-opacity duration-700 group-hover:opacity-50 xl:text-[12rem]">
                {s.code}
              </span>
              <ServiceBody s={s} />
            </div>
          ))}
          <div className="flex w-[32vw] shrink-0 flex-col items-center justify-center border-l border-white/[0.08] px-8 text-center">
            <p className="font-display text-2xl font-semibold tracking-tight text-white/40 sm:text-3xl">
              One system<span style={{ color: '#4d7cfe' }}>.</span>
            </p>
            <p className="mt-2 text-xs tracking-[0.3em] text-white/30">VYRON CONTINUUM</p>
          </div>
        </div>
        <div className="absolute bottom-9 left-[7vw] right-[7vw] flex items-center gap-6">
          <span className="font-display text-[11px] font-semibold tracking-[0.3em] text-white/60">01</span>
          <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              ref={barRef}
              className="h-full origin-left rounded-full bg-gradient-to-r from-electric via-iris to-cyan-400 shadow-[0_0_12px_rgba(77,124,254,0.8)]"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <span className="font-display text-[11px] font-semibold tracking-[0.3em] text-white/60">06</span>
        </div>
      </div>

      <div className="px-5 py-28 sm:px-8 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] font-medium tracking-[0.5em] text-electric">WHAT WE DO</p>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight">
            Six practices. <span className="text-white/40">One system.</span>
          </h2>
        </motion.div>
        <div className="mt-12 space-y-5">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7, delay: Math.min(i * 0.05, 0.25) }}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-ink/80 p-6 backdrop-blur-xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] sm:p-8 transition-colors duration-300"
              style={{ borderColor: `${s.accent}28` }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[80px] opacity-40" style={{ background: `${s.accent}` }} />
              <span className="text-stroke-faint pointer-events-none absolute -right-2 -top-2 font-display text-7xl font-bold leading-none select-none opacity-20">
                {s.code}
              </span>
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-5 items-center rounded-full border px-2 font-display text-[10px] font-semibold"
                  style={{ borderColor: `${s.accent}45`, color: s.accent, background: `${s.accent}15` }}
                >
                  {s.code}
                </span>
                <span className="h-px w-8 bg-white/15" />
                <span className="text-[10px] tracking-[0.35em] text-white/50">{s.key.toUpperCase()}</span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">{s.name}</h3>
              <p className="mt-2 text-[15px]" style={{ color: s.accent }}>{s.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{s.description}</p>
              <ul className="mt-5 grid grid-cols-1 gap-2.5">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-[13px] text-white/70">
                    <span
                      className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border"
                      style={{ borderColor: `${s.accent}55`, background: `${s.accent}18` }}
                    >
                      <Plus className="h-2 w-2" style={{ color: s.accent }} />
                    </span>
                    <span>{d}</span>
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
