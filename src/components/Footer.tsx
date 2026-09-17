import { ArrowUp } from 'lucide-react';
import VyronMark from './VyronMark';
import { scrollToId, scrollToTop } from '../lib/scroll';

const SITEMAP = [
  { label: 'System', href: '#system' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
  { label: 'Contact', href: '#contact' },
];

const PRACTICES = ['Technology', 'Design', 'Content', 'Growth', 'Automation', 'Intelligence'];

const SOCIALS = [
  { label: 'X / Twitter', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Dribbble', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="grid gap-12 pb-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <VyronMark className="h-8 w-8" />
              <span className="font-display text-base font-semibold tracking-[0.22em]">
                VYRON<sup className="text-[8px] font-normal text-white/50">®</sup>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              A multidisciplinary digital growth studio — technology, design, content,
              performance, automation and intelligence in one system.
            </p>
            <a
              href="mailto:hello@vyron.studio"
              className="mt-5 inline-block text-sm tracking-[0.06em] text-white/75 underline decoration-electric/60 underline-offset-8 transition-colors hover:text-white"
            >
              hello@vyron.studio
            </a>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.4em] text-white/35">SITEMAP</p>
            <ul className="mt-5 space-y-3">
              {SITEMAP.map((l) => (
                <li key={l.href}>
                  <button onClick={() => scrollToId(l.href)} className="text-sm text-white/60 transition-colors hover:text-white">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.4em] text-white/35">PRACTICES</p>
            <ul className="mt-5 space-y-3">
              {PRACTICES.map((p) => (
                <li key={p}>
                  <button onClick={() => scrollToId('#services')} className="text-sm text-white/60 transition-colors hover:text-white">
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.4em] text-white/35">ELSEWHERE</p>
            <ul className="mt-5 space-y-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} onClick={(e) => e.preventDefault()} className="text-sm text-white/60 transition-colors hover:text-white">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={scrollToTop}
              className="mt-8 flex items-center gap-2.5 rounded-full border border-white/12 px-5 py-2.5 text-[11px] font-medium tracking-[0.25em] text-white/65 transition-all hover:border-electric/60 hover:text-white"
            >
              BACK TO TOP <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.08] py-7 text-[12px] text-white/35 sm:flex-row">
          <p>© 2026 VYRON Studio. All rights reserved.</p>
          <p className="tracking-[0.2em]">DIGITAL GROWTH, REIMAGINED.</p>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[3.5vw] text-center font-display text-[19vw] font-bold leading-[0.85] tracking-[-0.03em] text-white/[0.025]">
          VYRON
        </p>
      </div>
    </footer>
  );
}
