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

  return (
    <article
      ref={ref}
      className="group sticky overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] transition-colors hover:border-white/20"
      style={{ top: `${88 + index * 26}px` }}
      data-cursor
    >
      <div className="relative h-[78vh] min-h-[490px] sm:min-h-[540px] w-full">
        <motion.img
          src={p.image}
          alt={p.title}
          style={{ y: imgY }}
          className="absolute inset-0 h-[120%] w-full scale-105 object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-void/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-transparent" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 sm:p-9">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-semibold tracking-[0.2em] text-white/85">{p.code}</span>
            <span className="h-1 w-1 rounded-full bg-electric" />
            <span className="text-[11px] tracking-[0.3em] text-white/55">{p.year}</span>
          </div>
          <span className="glass rounded-full px-4 py-1.5 text-[10px] font-medium tracking-[0.3em] text-white/75">
            CONCEPT STUDY
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
          <div className="flex flex-wrap gap-2">
            {p.disciplines.map((d) => (
              <span key={d} className="rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.25em] text-white/75 backdrop-blur-md">
                {d.toUpperCase()}
              </span>
            ))}
          </div>
          <h3 className="mt-4 font-display text-[clamp(2rem,5.5vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
            {p.title}
          </h3>
          <p className="mt-2 max-w-xl text-[14px] text-white/60 sm:text-[15px]">{p.subtitle}</p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="max-w-2xl pt-5 text-[14px] leading-relaxed text-white/70">{p.description}</p>
                <ul className="mt-4 grid max-w-2xl gap-2.5 sm:grid-cols-3">
                  {p.highlights.map((h) => (
                    <li key={h} className="glass rounded-2xl p-4 text-[12.5px] leading-snug text-white/75">
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="group flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-[12px] font-semibold tracking-[0.16em] text-black transition-all duration-300 hover:bg-electric hover:text-white"
            >
              {expanded ? 'CLOSE STUDY' : 'OPEN STUDY'}
              <span className={`transition-transform duration-300 ${expanded ? 'rotate-45' : ''}`}>
                {expanded ? <Plus className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
              </span>
            </button>
            {!expanded && (
              <p className="hidden max-w-sm text-[12px] leading-relaxed text-white/45 md:block">
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
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="text-[11px] font-medium tracking-[0.5em] text-electric">SELECTED WORK</p>
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
