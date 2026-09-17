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
        <div className="relative h-56 w-56">
          <div
            className="animate-spin-slow absolute inset-0 rounded-full"
            style={{ background: `conic-gradient(from 0deg, transparent 0%, ${accent}66 18%, transparent 38%, transparent 55%, ${accent}44 72%, transparent 90%)` }}
          />
          <div className="absolute inset-5 rounded-full border border-white/12" />
          <div className="animate-spin-rev absolute inset-11 rounded-full border border-dashed border-white/20" />
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: accent, boxShadow: `0 0 24px 4px ${accent}` }} />
        </div>
      );
    case 'design':
      return (
        <div className="relative h-56 w-56">
          <div className="glass absolute left-6 top-10 h-36 w-36 rotate-6 rounded-2xl" />
          <div className="glass absolute left-14 top-6 h-36 w-36 -rotate-3 rounded-2xl" style={{ borderColor: `${accent}55` }} />
          <div className="absolute bottom-8 right-6 h-16 w-16 rounded-full blur-2xl" style={{ background: `${accent}55` }} />
        </div>
      );
    case 'content':
      return (
        <div className="flex w-60 flex-col gap-3">
          {[100, 72, 88, 55, 94, 66].map((w, i) => (
            <div
              key={i}
              className="animate-line-grow h-[7px] rounded-full"
              style={{ width: `${w}%`, background: `linear-gradient(90deg, ${accent}88, ${accent}22)`, animationDelay: `${i * 0.35}s` }}
            />
          ))}
        </div>
      );
    case 'growth':
      return (
        <div className="flex h-56 items-end gap-3">
          {[38, 55, 44, 70, 62, 86, 100].map((h, i) => (
            <div
              key={i}
              className="animate-bar w-7 rounded-t-md md:w-9"
              style={{ height: `${h}%`, background: `linear-gradient(to top, ${accent}33, ${accent})`, animationDelay: `${i * 0.22}s` }}
            />
          ))}
        </div>
      );
    case 'automation':
      return (
        <div className="relative h-56 w-56">
          <div className="animate-spin-slow absolute inset-0 rounded-full border border-white/12">
            <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full" style={{ background: accent, boxShadow: `0 0 18px 3px ${accent}` }} />
          </div>
          <div className="animate-spin-rev absolute inset-9 rounded-full border border-dashed border-white/20">
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/80" />
          </div>
          <div className="absolute inset-[76px] rounded-full border" style={{ borderColor: `${accent}66` }} />
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
        <div className="flex items-center gap-4">
          <span className="font-display text-sm font-semibold" style={{ color: s.accent }}>
            {s.code}
          </span>
          <span className="h-px w-14" style={{ background: `${s.accent}88` }} />
          <span className="text-[11px] font-medium tracking-[0.4em] text-white/45">{s.key}</span>
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
            <li key={d} className="flex items-center gap-2.5 text-[13px] text-white/65">
              <Plus className="h-3.5 w-3.5 shrink-0" style={{ color: s.accent }} />
              {d}
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
          <div className="flex w-[44vw] shrink-0 flex-col justify-center px-[7vw]">
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
              className="relative flex w-[78vw] shrink-0 items-center border-l border-white/[0.07] px-[6vw]"
            >
              <div
                className="pointer-events-none absolute left-1/4 top-1/3 h-[40vmin] w-[40vmin] rounded-full blur-[130px]"
                style={{ background: `${s.accent}1f` }}
              />
              <span className="text-stroke-faint pointer-events-none absolute right-[4vw] top-[9vh] font-display text-[11rem] font-bold leading-none">
                {s.code}
              </span>
              <ServiceBody s={s} />
            </div>
          ))}
          <div className="flex w-[30vw] shrink-0 items-center justify-center border-l border-white/[0.07]">
            <p className="font-display text-2xl tracking-tight text-white/35">
              One system<span style={{ color: '#4d7cfe' }}>.</span>
            </p>
          </div>
        </div>
        <div className="absolute bottom-8 left-[7vw] right-[7vw] flex items-center gap-5">
          <span className="text-[10px] tracking-[0.35em] text-white/40">01</span>
          <div className="h-px flex-1 bg-white/10">
            <div ref={barRef} className="h-full origin-left bg-gradient-to-r from-electric to-iris" style={{ transform: 'scaleX(0)' }} />
          </div>
          <span className="text-[10px] tracking-[0.35em] text-white/40">06</span>
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
              className="glass relative overflow-hidden rounded-3xl p-7"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[80px]" style={{ background: `${s.accent}2e` }} />
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-semibold" style={{ color: s.accent }}>{s.code}</span>
                <span className="h-px w-10" style={{ background: `${s.accent}88` }} />
                <span className="text-[10px] tracking-[0.35em] text-white/45">{s.key}</span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">{s.name}</h3>
              <p className="mt-2 text-[15px]" style={{ color: s.accent }}>{s.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{s.description}</p>
              <ul className="mt-5 grid grid-cols-1 gap-2.5">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2.5 text-[13px] text-white/65">
                    <Plus className="h-3.5 w-3.5 shrink-0" style={{ color: s.accent }} />
                    {d}
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
