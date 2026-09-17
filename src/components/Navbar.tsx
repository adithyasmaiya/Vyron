import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import VyronMark from './VyronMark';
import Magnetic from './Magnetic';
import { scrollToId, scrollToTop } from '../lib/scroll';

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

  const go = (href: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(href), open ? 350 : 0);
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
            className={`mt-3 flex items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-xl transition-all duration-500 sm:px-5 ${
              scrolled
                ? 'border-white/10 bg-black/55 shadow-[0_12px_50px_-12px_rgba(77,124,254,0.25)]'
                : 'border-white/[0.07] bg-black/25'
            }`}
          >
            <button
              onClick={() => {
                setOpen(false);
                scrollToTop();
              }}
              className="group flex items-center gap-2.5"
              aria-label="VYRON home"
            >
              <VyronMark className="h-7 w-7 transition-transform duration-500 group-hover:rotate-[8deg]" />
              <span className="font-display text-[15px] font-semibold tracking-[0.22em] text-white">
                VYRON<sup className="text-[8px] font-normal text-white/50">®</sup>
              </span>
              <span className="ml-1.5 hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[9px] tracking-[0.16em] text-white/55 md:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                BLR · BOM
              </span>
            </button>

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
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/80 transition-colors hover:border-white/30 hover:text-white lg:hidden"
                aria-label="Toggle menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] flex flex-col justify-center bg-void/90 px-8 backdrop-blur-2xl lg:hidden"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-electric/15 blur-[120px]" />
            {LINKS.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => go(l.href)}
                className="group flex items-baseline gap-4 border-b border-white/8 py-4 text-left"
              >
                <span className="font-display text-xs text-electric">{l.index}</span>
                <span className="font-display text-4xl font-semibold tracking-tight text-white/90 transition-colors group-active:text-electric">
                  {l.label}
                </span>
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => {
                setOpen(false);
                window.setTimeout(onStart, 300);
              }}
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-semibold tracking-[0.14em] text-black"
            >
              START A PROJECT <ArrowUpRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
