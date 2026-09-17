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
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#06070a] pt-2 sm:pt-4">
      {/* Top Specular Edge Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Subtle Atmospheric Depth */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[260px] w-[540px] -translate-x-1/2 rounded-full bg-electric/[0.02] blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="grid gap-12 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand Signature Column */}
          <div>
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md">
                <VyronMark className="h-full w-full" />
              </div>
              <div>
                <span className="font-display text-base font-semibold tracking-[0.24em] text-white">
                  VYRON<sup className="text-[9px] font-normal text-white/40">®</sup>
                </span>
                <p className="font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase">
                  DIGITAL GROWTH STUDIO
                </p>
              </div>
              <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[9px] tracking-[0.15em] text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                INDIA · IST
              </span>
            </div>

            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-white/50">
              India&apos;s multidisciplinary digital growth studio — technology, design, content,
              performance, automation and intelligence in one connected system.
            </p>

            <div className="mt-6 space-y-2 border-l border-white/[0.08] pl-3.5 font-mono text-[12px] text-white/65">
              <p>
                <a
                  href="mailto:hello@vyron.in"
                  className="tracking-[0.06em] text-white/80 underline decoration-electric/50 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-electric"
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
                  className="text-emerald-400 transition-colors duration-300 hover:text-emerald-300 hover:underline"
                >
                  WhatsApp: +91 98450 12345 ↗
                </a>
              </p>
            </div>
          </div>

          {/* Sitemap Column */}
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <p className="font-mono text-[10px] tracking-[0.35em] text-white/40 uppercase">
                SITEMAP
              </p>
            </div>
            <ul className="mt-5 space-y-2.5">
              {SITEMAP.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollToId(l.href)}
                    className="group flex items-center gap-2 font-mono text-[13px] text-white/55 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-electric transition-all duration-300 group-hover:w-3" />
                    <span>{l.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Hubs Column */}
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <p className="font-mono text-[10px] tracking-[0.35em] text-white/40 uppercase">
                STUDIO HUBS
              </p>
            </div>
            <div className="mt-5 space-y-4 text-xs">
              <div className="border-l border-white/[0.08] pl-3">
                <p className="font-mono text-[11px] font-semibold tracking-wider text-white/85 uppercase">
                  BENGALURU
                </p>
                <p className="mt-1 leading-relaxed text-white/45">
                  100ft Road, Indiranagar
                  <br />
                  Karnataka 560038
                </p>
              </div>
              <div className="border-l border-white/[0.08] pl-3">
                <p className="font-mono text-[11px] font-semibold tracking-wider text-white/85 uppercase">
                  MUMBAI
                </p>
                <p className="mt-1 leading-relaxed text-white/45">
                  Bandra Kurla Complex
                  <br />
                  Maharashtra 400051
                </p>
              </div>
              <div className="flex items-center gap-2 pt-1 font-mono text-[10px] tracking-[0.2em] text-electric/90">
                <span className="h-1 w-1 rounded-full bg-electric" />
                <span>TIMEZONE: IST (UTC+5:30)</span>
              </div>
            </div>
          </div>

          {/* Connect & Back to Top Column */}
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <p className="font-mono text-[10px] tracking-[0.35em] text-white/40 uppercase">
                CONNECT
              </p>
            </div>
            <ul className="mt-5 space-y-2.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    onClick={(e) => e.preventDefault()}
                    className="group flex items-center gap-2 font-mono text-[13px] text-white/55 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-white/40 transition-all duration-300 group-hover:w-2.5" />
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToTop}
              className="group mt-8 flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.02] px-5 py-2.5 font-mono text-[11px] font-medium tracking-[0.22em] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-electric/60 hover:bg-white/[0.05] hover:text-white hover:shadow-[0_0_20px_rgba(77,124,254,0.3)]"
              aria-label="Scroll back to top of page"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Legal & Compliance Telemetry */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] py-7 font-mono text-[11px] text-white/40 sm:flex-row">
          <p>© 2026 VYRON Digital Technologies Pvt. Ltd. · Registered in India</p>
          <div className="flex items-center gap-2 tracking-[0.2em] text-white/35">
            <span className="h-1 w-1 rounded-full bg-emerald-400/60" />
            <span>GST COMPLIANT · BENGALURU, INDIA</span>
          </div>
        </div>
      </div>

      {/* Final Watermark Echo */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden pb-4">
        <p className="-mb-[4.5vw] text-center font-display text-[20vw] font-extrabold leading-[0.8] tracking-[-0.04em] text-white/[0.02] transition-opacity duration-700">
          VYRON
        </p>
      </div>
    </footer>
  );
}
