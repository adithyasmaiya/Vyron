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

export default function Navbar({ onStart }: { onStart: () => void }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const shouldHide = y > prev && y > 420 && !open;
    const shouldScroll = y > 40;
    setHidden((curr) => (curr !== shouldHide ? shouldHide : curr));
    setScrolled((curr) => (curr !== shouldScroll ? shouldScroll : curr));
  });

  // Body scroll locking when mobile menu drawer is open
  useEffect(() => {
    if (open) {
      stopScroll();
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      startScroll();
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      startScroll();
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(href), 350);
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-130%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[120]"
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <nav
            className={`mt-2.5 flex items-center justify-between rounded-2xl border px-3.5 py-2.5 backdrop-blur-xl transition-all duration-500 sm:mt-3 sm:px-5 sm:py-3 ${
              open
                ? 'border-transparent bg-transparent shadow-none'
                : scrolled
                ? 'border-white/10 bg-black/60 shadow-[0_12px_50px_-12px_rgba(77,124,254,0.25)]'
                : 'border-white/[0.07] bg-black/30'
            }`}
          >
            {/* Brand Logo & Signature */}
            <button
              onClick={() => {
                setOpen(false);
                scrollToTop();
              }}
              className="group flex items-center gap-2.5 focus:outline-none"
              aria-label="VYRON home"
            >
              <VyronMark className="h-7 w-7 transition-transform duration-500 group-hover:rotate-[8deg]" />
              <span className="font-display text-[15px] font-semibold tracking-[0.22em] text-white">
                VYRON<sup className="text-[8px] font-normal text-white/50">®</sup>
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

            {/* Actions: Desktop CTA + Mobile Hamburger Trigger */}
            <div className="flex items-center gap-3">
              <Magnetic strength={0.3} className="hidden sm:inline-block">
                <button
                  onClick={onStart}
                  className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12px] font-semibold tracking-[0.12em] text-black transition-all duration-300 hover:bg-electric hover:text-white hover:shadow-[0_0_36px_-6px_rgba(77,124,254,0.8)]"
                >
                  START A PROJECT
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Magnetic>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setOpen((v) => !v)}
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 active:scale-90 lg:hidden ${
                  open
                    ? 'border-white/30 bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                    : 'border-white/12 bg-white/[0.03] text-white/80 hover:border-white/30 hover:text-white'
                }`}
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[115] flex h-[100dvh] w-full flex-col justify-between overflow-y-auto overscroll-contain bg-[#050507]/98 px-6 pt-24 pb-8 backdrop-blur-3xl lg:hidden"
          >
            {/* Ambient atmospheric glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-electric/[0.12] blur-[120px]" />

            {/* Navigation Section */}
            <div className="relative z-10 flex flex-col">
              <p className="font-mono text-[10px] tracking-[0.35em] text-white/40 uppercase mb-3">
                NAVIGATION
              </p>

              {LINKS.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(l.href)}
                  className="group flex min-h-[54px] items-center justify-between border-b border-white/[0.08] py-3 text-left active:bg-white/[0.02]"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs font-semibold text-electric">{l.index}</span>
                    <span className="font-display text-[clamp(1.75rem,7vw,2.4rem)] font-semibold tracking-tight text-white/90 transition-colors group-active:text-electric">
                      {l.label}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/30 transition-transform duration-300 group-active:text-electric group-active:translate-x-0.5 group-active:-translate-y-0.5" />
                </motion.button>
              ))}

              {/* Start A Project Button inside Drawer */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => {
                  setOpen(false);
                  window.setTimeout(onStart, 300);
                }}
                className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-white py-4 font-mono text-xs font-semibold tracking-[0.16em] text-black shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all active:scale-[0.98]"
              >
                START A PROJECT <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Drawer Studio Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.5 }}
              className="relative z-10 mt-8 border-t border-white/[0.08] pt-5 font-mono text-xs text-white/50"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[11px] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                  ONLINE STUDIO · BENGALURU
                </span>
                <span className="text-[10px] text-white/35">IST (UTC+5:30)</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-white/60">
                <a
                  href="mailto:hello@vyron.in"
                  className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                >
                  hello@vyron.in
                </a>
                <a
                  href="https://wa.me/919845012345?text=Hello%20VYRON%2C%20we%20want%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 transition-colors hover:underline"
                >
                  WhatsApp ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
