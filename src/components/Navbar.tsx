import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import VyronMark from './VyronMark';
import Magnetic from './Magnetic';
import { scrollToId, scrollToTop, startScroll, stopScroll } from '../lib/scroll';

const LINKS = [
  { label: 'System', href: '#system', index: '01' },
  { label: 'Services', href: '#services', index: '02' },
  { label: 'Process', href: '#process', index: '03' },
  { label: 'Work', href: '#work', index: '04' },
  { label: 'Studio', href: '#studio', index: '05' },
];

export default function Navbar({ onStart, ready = true }: { onStart: () => void; ready?: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const delta = y - prev;
    if (open) return;

    // Mobile-optimized deadband: prevent rapid jitter caused by touchscreen momentum/rubber-banding
    if (y < 120) {
      setHidden(false);
    } else if (delta > 22 && y > 280) {
      setHidden(true);
    } else if (delta < -20) {
      setHidden(false);
    }
    setScrolled(y > 24);
  });

  // Body scroll locking without breaking touchAction inside the drawer
  useEffect(() => {
    if (open) {
      stopScroll();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      startScroll();
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      startScroll();
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(href), 140);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: !ready ? '-120%' : hidden ? '-130%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[120] pointer-events-none w-full max-w-[100vw] overflow-x-hidden"
        style={{
          paddingTop: 'max(0.45rem, env(safe-area-inset-top, 0px))',
        }}
      >
        <div className="mx-auto max-w-7xl px-2.5 sm:px-6 pointer-events-auto">
          <nav
            className={`mt-1 flex items-center justify-between rounded-2xl border px-3 py-2 backdrop-blur-xl transition-all duration-300 sm:mt-2.5 sm:px-5 sm:py-3 ${
              open
                ? 'border-white/15 bg-[#090b12]/95 shadow-[0_8px_32px_rgba(0,0,0,0.65)] backdrop-blur-2xl'
                : scrolled
                ? 'border-white/10 bg-black/75 shadow-[0_12px_50px_-12px_rgba(77,124,254,0.25)]'
                : 'border-white/[0.08] bg-black/40'
            }`}
          >
            {/* Brand Logo & Signature */}
            <button
              onClick={() => {
                setOpen(false);
                scrollToTop();
              }}
              className="group flex items-center gap-2 sm:gap-2.5 focus:outline-none"
              aria-label="VYRON home"
            >
              <VyronMark className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-500 group-hover:rotate-[8deg]" />
              <span className="font-display text-[14px] sm:text-[15px] font-semibold tracking-[0.18em] sm:tracking-[0.22em] text-white">
                VYRON<sup className="text-[7.5px] sm:text-[8px] font-normal text-white/50">®</sup>
              </span>
              <span className="ml-1.5 hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[9px] tracking-[0.16em] text-white/55 md:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE · BLR
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-7 lg:flex">
              {LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="group relative text-[13px] font-medium tracking-[0.14em] text-white/60 transition-colors duration-300 hover:text-white"
                >
                  <span className="mr-1.5 text-[9px] text-electric/80">{l.index}</span>
                  {l.label.toUpperCase()}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-electric to-iris transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Actions: Desktop CTA + Mobile Quick Action + Hamburger Trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Quick "START" Action */}
              <button
                type="button"
                onClick={onStart}
                className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold tracking-[0.1em] text-black shadow-[0_0_18px_rgba(255,255,255,0.18)] transition-transform active:scale-95 sm:hidden"
                aria-label="Start a project"
              >
                <span>START</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>

              {/* Desktop CTA */}
              <div className="hidden sm:inline-block">
                <Magnetic strength={0.3}>
                  <button
                    onClick={onStart}
                    className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12px] font-semibold tracking-[0.12em] text-black transition-all duration-300 hover:bg-electric hover:text-white hover:shadow-[0_0_36px_-6px_rgba(77,124,254,0.8)]"
                  >
                    START A PROJECT
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </Magnetic>
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setOpen((v) => !v)}
                className={`flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border transition-all duration-300 active:scale-90 touch-manipulation lg:hidden ${
                  open
                    ? 'border-white/30 bg-white/12 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                    : 'border-white/12 bg-white/[0.04] text-white/80 hover:border-white/30 hover:text-white'
                }`}
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                {open ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-[115] h-[100dvh] w-full max-w-[100vw] overflow-y-auto overscroll-contain bg-[#050507]/98 backdrop-blur-3xl touch-pan-y lg:hidden"
            style={{
              paddingTop: 'max(4.6rem, calc(env(safe-area-inset-top, 0px) + 4.2rem))',
              paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            {/* Ambient atmospheric glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-electric/[0.12] blur-[100px] will-change-transform" />

            <div className="mx-auto flex min-h-full w-full max-w-lg flex-col justify-between px-5 sm:px-6">
              {/* Navigation Section */}
              <div className="relative z-10 flex flex-col">
                <p className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase mb-2">
                  NAVIGATION
                </p>

                {LINKS.map((l, i) => (
                  <motion.button
                    key={l.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: 0.03 * i, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => go(l.href)}
                    className="group flex min-h-[46px] items-center justify-between border-b border-white/[0.08] py-2.5 text-left touch-manipulation active:bg-white/[0.02]"
                  >
                    <div className="flex items-baseline gap-3.5">
                      <span className="font-mono text-[11px] font-semibold text-electric">{l.index}</span>
                      <span className="font-display text-[clamp(1.45rem,6vw,2.1rem)] font-semibold tracking-tight text-white/90 transition-colors group-active:text-electric">
                        {l.label}
                      </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition-transform duration-300 group-active:text-electric group-active:translate-x-0.5 group-active:-translate-y-0.5" />
                  </motion.button>
                ))}

                {/* Start A Project Button inside Drawer */}
                <motion.button
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    setOpen(false);
                    window.setTimeout(onStart, 160);
                  }}
                  className="mt-5 flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full bg-white py-3 font-mono text-xs font-semibold tracking-[0.14em] text-black shadow-[0_0_26px_rgba(255,255,255,0.15)] transition-all touch-manipulation active:scale-[0.98]"
                >
                  START A PROJECT <ArrowUpRight className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Drawer Studio Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.24, duration: 0.35 }}
                className="relative z-10 mt-6 border-t border-white/[0.08] pt-3.5 font-mono text-xs text-white/50"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10.5px] text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                    ONLINE STUDIO · BLR
                  </span>
                  <span className="text-[9.5px] text-white/35">IST (UTC+5:30)</span>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-white/60">
                  <a
                    href="mailto:hello@vyron.in"
                    className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white py-1"
                  >
                    hello@vyron.in
                  </a>
                  <a
                    href="https://wa.me/919845012345?text=Hello%20VYRON%2C%20we%20want%20to%20discuss%20a%20project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 transition-colors hover:underline py-1"
                  >
                    WhatsApp ↗
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

