import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, X } from 'lucide-react';
import { startScroll, stopScroll } from '../lib/scroll';

const EASE = [0.22, 1, 0.36, 1] as const;
const BUDGETS = ['Under ₹5 Lakhs', '₹5L – ₹15 Lakhs', '₹15L – ₹35 Lakhs', '₹35 Lakhs+'];

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const close = useCallback(() => {
    setStatus('idle');
    setErrorMsg('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    stopScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      startScroll();
    };
  }, [open, close]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, budget, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Something went wrong. Please try again.');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-void/80 p-4 backdrop-blur-xl"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 44, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.55, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-8 w-full max-w-lg overflow-hidden rounded-[1.75rem] border border-white/12 bg-ink/95 p-8 shadow-[0_60px_160px_-30px_rgba(77,124,254,0.35)] sm:p-10"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-electric/15 blur-[100px]" />
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/60 transition-colors hover:border-white/30 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {status === 'success' ? (
              <div className="flex flex-col items-center py-10 text-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-electric shadow-[0_0_60px_-8px_rgba(77,124,254,0.9)]"
                >
                  <Check className="h-7 w-7 text-white" />
                </motion.span>
                <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight">Signal received.</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
                  Your brief is in the system. Our team in Bengaluru will respond within one business day.
                </p>
                <button
                  onClick={close}
                  className="mt-8 rounded-full bg-white px-8 py-3.5 text-[12px] font-semibold tracking-[0.16em] text-black transition-colors hover:bg-electric hover:text-white"
                >
                  BACK TO THE SITE
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-medium tracking-[0.45em] text-electric">START A PROJECT</p>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] tracking-[0.2em] text-white/50">
                    BENGALURU · MUMBAI
                  </span>
                </div>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Tell us where you&apos;re headed.
                </h3>
                <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="vy-name" className="mb-2 block text-[11px] tracking-[0.25em] text-white/45">NAME *</label>
                      <input id="vy-name" className="field" placeholder="Aarav Sharma" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
                    </div>
                    <div>
                      <label htmlFor="vy-email" className="mb-2 block text-[11px] tracking-[0.25em] text-white/45">EMAIL *</label>
                      <input id="vy-email" type="email" className="field" placeholder="aarav@brand.in" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="vy-company" className="mb-2 block text-[11px] tracking-[0.25em] text-white/45">COMPANY</label>
                      <input id="vy-company" className="field" placeholder="Acme Brands Pvt Ltd" value={company} onChange={(e) => setCompany(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="vy-budget" className="mb-2 block text-[11px] tracking-[0.25em] text-white/45">PROJECT BUDGET (INR)</label>
                      <select id="vy-budget" className="field" value={budget} onChange={(e) => setBudget(e.target.value)}>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="vy-message" className="mb-2 block text-[11px] tracking-[0.25em] text-white/45">PROJECT *</label>
                    <textarea id="vy-message" className="field min-h-[110px] resize-y" placeholder="Goals, timeline, scope — anything that helps us understand the mission." value={message} onChange={(e) => setMessage(e.target.value)} required minLength={10} />
                  </div>
                  {status === 'error' && (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-200">
                      {errorMsg}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex w-full items-center justify-center gap-2.5 rounded-full bg-white py-4 text-[13px] font-semibold tracking-[0.16em] text-black transition-all duration-300 hover:bg-electric hover:text-white disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> TRANSMITTING…
                      </>
                    ) : (
                      'TRANSMIT BRIEF'
                    )}
                  </button>
                  <div className="flex flex-col items-center justify-between gap-2 pt-2 sm:flex-row text-[11px] text-white/40">
                    <span>Direct: +91 (080) 4920 3100</span>
                    <a
                      href="https://wa.me/919845012345?text=Hello%20VYRON%2C%20we%20would%20like%20to%20discuss%20a%20digital%20growth%20engagement."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Chat on WhatsApp ↗
                    </a>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
