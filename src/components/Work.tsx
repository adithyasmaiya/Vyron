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
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const stickyTop = isMobile ? `${68 + index * 14}px` : `${88 + index * 30}px`;

  return (
    <article
      ref={ref}
      className="group sticky overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#090b10] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.03)] transition-all duration-500 hover:border-white/25 hover:shadow-[0_40px_110px_-24px_rgba(77,124,254,0.2)]"
      style={{ top: stickyTop }}
      data-cursor
    >
      {/* Top Specular Edge Highlight Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent transition-opacity duration-500 group-hover:via-electric/60" />

      {/* Atmospheric Watermark Index */}
      <span className="pointer-events-none absolute right-6 top-3 z-10 select-none font-mono text-[clamp(5.5rem,13vw,10.5rem)] font-black leading-none tracking-tighter text-white/[0.03] transition-colors duration-700 group-hover:text-white/[0.06]">
        0{index + 1}
      </span>

      <div
        className={`relative w-full overflow-hidden transition-all duration-500 ${
          expanded
            ? 'min-h-[620px] h-auto pb-10 sm:pb-12'
            : 'h-[76vh] min-h-[460px] sm:h-[80vh] sm:min-h-[560px]'
        }`}
      >
        <motion.img
          src={p.image}
          alt={p.title}
          style={{ y: imgY }}
          className="absolute inset-0 h-[120%] w-full scale-105 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          loading={index === 0 ? 'eager' : 'lazy'}
        />

        {/* Multi-tier Gradient Occlusion for Pristine Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/75 via-45% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/85 via-[#050608]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/60 via-transparent to-transparent" />

        {/* Top Header Registry Bar */}
        <div className="relative z-20 flex items-center justify-between p-5 sm:p-9">
          <div className="flex items-center gap-3">
            <span className="rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 font-mono text-xs font-semibold tracking-[0.25em] text-white/90 backdrop-blur-md">
              {p.code}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_8px_#4d7cfe]" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-white/50">{p.year}</span>
          </div>
          <span className="rounded-full border border-white/15 bg-black/40 px-4 py-1.5 font-mono text-[10px] font-medium tracking-[0.25em] text-white/75 backdrop-blur-md transition-colors duration-300 group-hover:border-electric/40 group-hover:text-white">
            CONCEPT STUDY
          </span>
        </div>

        {/* Bottom Content / Editorial Presentation */}
        <div className="relative z-20 p-5 sm:p-9">
          <div className="flex flex-wrap items-center gap-2">
            {p.disciplines.map((d) => (
              <span
                key={d}
                className="rounded-full border border-white/12 bg-black/50 px-3 py-1 font-mono text-[9.5px] font-medium tracking-[0.2em] text-white/75 backdrop-blur-md transition-all duration-300 group-hover:border-white/25 group-hover:text-white sm:px-3.5 sm:py-1.5 sm:text-[10px]"
              >
                {d.toUpperCase()}
              </span>
            ))}
          </div>

          <h3 className="mt-4 font-display text-[clamp(1.75rem,5.5vw,4.2rem)] font-semibold leading-[1.0] tracking-[-0.025em] text-white transition-colors duration-300 sm:text-[clamp(2.1rem,5vw,4.2rem)]">
            {p.title}
          </h3>
          <p className="mt-2.5 max-w-xl text-[13.5px] leading-relaxed text-white/65 sm:text-[15px]">
            {p.subtitle}
          </p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="max-w-2xl pt-5 text-[14px] leading-relaxed text-white/75 sm:text-[15px]">
                  {p.description}
                </p>
                <div className="mt-5 border-t border-white/[0.08] pt-4">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
                      SYSTEM HIGHLIGHTS & ARCHITECTURE
                    </p>
                    <span className="font-mono text-[9px] tracking-wider text-white/30">
                      {p.highlights.length} SPECIFICATIONS
                    </span>
                  </div>
                  <ul className="mt-3 grid max-w-2xl gap-2.5 sm:grid-cols-3">
                    {p.highlights.map((h, hIdx) => (
                      <li
                        key={h}
                        className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-black/50 p-3.5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-black/70"
                      >
                        <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-white/40">
                          <span className="h-1 w-1 rounded-full bg-electric" />
                          <span>SPEC_0{hIdx + 1}</span>
                        </div>
                        <p className="mt-2 text-[12.5px] leading-snug text-white/80">
                          {h}
                        </p>
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
              className="group/btn flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-[12px] font-semibold tracking-[0.16em] text-black transition-all duration-300 hover:bg-electric hover:text-white hover:shadow-[0_0_24px_rgba(77,124,254,0.45)]"
            >
              <span>{expanded ? 'CLOSE STUDY' : 'OPEN STUDY'}</span>
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/10 transition-all duration-300 group-hover/btn:bg-white/20 ${
                  expanded ? 'rotate-45' : ''
                }`}
              >
                {expanded ? <Plus className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
              </span>
            </button>
            {!expanded && (
              <p className="hidden max-w-sm font-mono text-[11px] leading-relaxed text-white/40 md:block">
                Fictional exploration crafted by VYRON — no client affiliation.
              </p>
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
    <section id="work" className="relative scroll-mt-20 py-28 sm:py-36">
      {/* Subtle Atmospheric Lighting behind the Archive */}
      <div className="pointer-events-none absolute left-1/2 top-40 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-electric/[0.03] blur-[150px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-electric/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-electric" />
              </span>
              <p className="font-mono text-[11px] font-semibold tracking-[0.45em] text-electric uppercase">
                SELECTED WORK
              </p>
              <span className="hidden sm:inline-block h-3 w-px bg-white/15" />
              <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
                PROJECT ARCHIVE
              </span>
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
