import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import type { Project } from '../lib/types';

const EASE = [0.22, 1, 0.36, 1] as const;

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const cleanIndex = p.code.replace(/[^\d]/g, '') || String(index + 1).padStart(2, '0');

  return (
    <article
      ref={ref}
      className="group sticky overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] border border-white/12 bg-ink/90 shadow-[0_30px_100px_-25px_rgba(0,0,0,0.95)] transition-all duration-500 hover:border-white/25 hover:shadow-[0_35px_110px_-20px_rgba(77,124,254,0.25)]"
      style={{ top: `${88 + index * 26}px` }}
      data-cursor
    >
      <div className="relative h-[78vh] min-h-[490px] sm:min-h-[540px] w-full">
        <motion.img
          src={p.image}
          alt={p.title}
          style={{ y: imgY }}
          className="absolute inset-0 h-[120%] w-full scale-105 object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.07]"
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />

        {/* Multi-tier cinematic vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/10 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/75 via-void/25 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.08] rounded-[1.75rem] sm:rounded-[2.25rem] z-20" />

        {/* Top specular hairline accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent z-20" />

        {/* Ambient corner glow on hover */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-electric/15 blur-[80px] opacity-0 transition-opacity duration-700 group-hover:opacity-100 z-10" />

        {/* Faint oversized archive watermark number */}
        <span className="pointer-events-none absolute right-6 sm:right-12 top-8 sm:top-10 font-display text-8xl sm:text-[11rem] font-bold tracking-tighter text-white/[0.03] select-none transition-all duration-700 group-hover:text-white/[0.06] group-hover:translate-x-1 z-10">
          {cleanIndex}
        </span>

        {/* Top archive header */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5 sm:p-9">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
              <span className="absolute h-full w-full rounded-full bg-electric/40 animate-ping opacity-75" />
              <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_6px_rgba(77,124,254,0.9)]" />
            </span>
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-white/90">
              ARCHIVE // {p.code}
            </span>
            <span className="hidden h-3 w-px bg-white/20 sm:inline-block" />
            <span className="hidden font-mono text-[11px] tracking-[0.25em] text-white/50 sm:inline-block">
              RELEASE {p.year}
            </span>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-ink/75 px-3.5 py-1.5 text-[9px] sm:text-[10px] font-medium tracking-[0.28em] text-white/80 backdrop-blur-xl transition-all duration-300 group-hover:border-white/25 group-hover:text-white shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            CONCEPT STUDY
          </span>
        </div>

        {/* Bottom card content */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-9">
          <div className="flex flex-wrap gap-2">
            {p.disciplines.map((d) => (
              <span
                key={d}
                className="rounded-full border border-white/12 bg-ink/60 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.22em] text-white/75 backdrop-blur-md transition-colors duration-300 hover:border-white/25 hover:text-white"
              >
                {d.toUpperCase()}
              </span>
            ))}
          </div>

          <h3 className="mt-4 font-display text-[clamp(2rem,5.2vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.025em] text-white transition-colors duration-300">
            {p.title}
          </h3>
          <p className="mt-2.5 max-w-xl text-[14px] leading-relaxed text-white/60 sm:text-[15px]">{p.subtitle}</p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="pt-5 border-t border-white/[0.08] mt-4">
                  <p className="max-w-2xl text-[14px] leading-relaxed text-white/75">{p.description}</p>
                  <ul className="mt-4 grid max-w-2xl gap-2.5 sm:grid-cols-3">
                    {p.highlights.map((h) => (
                      <li
                        key={h}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-[12.5px] leading-snug text-white/80 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-electric shadow-[0_0_6px_rgba(77,124,254,0.8)]" />
                          <span>{h}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="group/btn relative inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[11.5px] sm:text-[12px] font-semibold tracking-[0.16em] text-ink transition-all duration-300 hover:bg-electric hover:text-white shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_30px_rgba(77,124,254,0.45)] active:scale-[0.98]"
            >
              <span>{expanded ? 'CLOSE STUDY' : 'OPEN STUDY'}</span>
              <span
                className={`flex h-4 w-4 items-center justify-center transition-transform duration-300 ${
                  expanded ? 'rotate-45' : ''
                }`}
              >
                {expanded ? <Plus className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
              </span>
            </button>
            {!expanded && (
              <div className="hidden items-center gap-2 text-[12px] leading-relaxed text-white/45 md:flex">
                <span className="h-1 w-1 rounded-full bg-white/25" />
                <span>Fictional exploration crafted by VYRON — no client affiliation.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const { data: projects } = useApi<Project>('/api/projects');

  return (
    <section id="work" className="relative scroll-mt-20 py-28 sm:py-36 overflow-hidden">
      {/* Subtle atmospheric ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-32 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-electric/[0.025] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-electric/60" />
              <p className="text-[11px] font-medium tracking-[0.5em] text-electric">SELECTED WORK</p>
            </div>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.0] tracking-[-0.02em]">
              Studies in
              <br />
              <span className="text-white/40">momentum.</span>
            </h2>
          </div>
          <p className="max-w-sm border-l border-white/15 pl-5 text-[13px] leading-relaxed text-white/50">
            Conceptual projects exploring our craft across commerce, fintech, media and
            automation — clearly labeled, never passed off as client work.
          </p>
        </motion.div>

        <div className="mt-14 space-y-6 pb-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
