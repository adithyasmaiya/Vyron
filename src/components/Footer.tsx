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
        <div className="grid gap-12 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <VyronMark className="h-8 w-8" />
              <span className="font-display text-base font-semibold tracking-[0.22em]">
                VYRON<sup className="text-[8px] font-normal text-white/50">®</sup>
              </span>
              <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] tracking-[0.15em] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                INDIA · IST
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              India&apos;s multidisciplinary digital growth studio — technology, design, content,
              performance, automation and intelligence in one connected system.
            </p>
            <div className="mt-5 space-y-1.5 text-xs text-white/70">
              <p>
                <a
                  href="mailto:hello@vyron.in"
                  className="tracking-[0.06em] underline decoration-electric/60 underline-offset-4 transition-colors hover:text-white"
                >
                  hello@vyron.in
                </a>
              </p>
              <p className="text-white/45">Studio Desk: +91 (080) 4920 3100</p>
              <p>
                <a
                  href="https://wa.me/919845012345?text=Hi%20VYRON%2C%20we%20want%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  WhatsApp: +91 98450 12345 ↗
                </a>
              </p>
            </div>
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
            <p className="text-[10px] tracking-[0.4em] text-white/35">STUDIO HUBS</p>
            <div className="mt-5 space-y-4 text-xs">
              <div>
                <p className="font-semibold text-white/80 tracking-wide">BENGALURU</p>
                <p className="mt-0.5 text-white/45 leading-relaxed">
                  100ft Road, Indiranagar<br />
                  Karnataka 560038
                </p>
              </div>
              <div>
                <p className="font-semibold text-white/80 tracking-wide">MUMBAI</p>
                <p className="mt-0.5 text-white/45 leading-relaxed">
                  Bandra Kurla Complex<br />
                  Maharashtra 400051
                </p>
              </div>
              <p className="text-[10px] tracking-[0.2em] text-electric">TIMEZONE: IST (UTC+5:30)</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.4em] text-white/35">CONNECT</p>
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
          <p>© 2026 VYRON Digital Technologies Pvt. Ltd. · Registered in India</p>
          <p className="tracking-[0.2em]">GST COMPLIANT · BENGALURU, INDIA</p>
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
