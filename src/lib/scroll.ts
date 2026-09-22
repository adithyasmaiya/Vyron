type LenisLike = {
  scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void;
  stop: () => void;
  start: () => void;
};

function getLenis(): LenisLike | null {
  if (typeof window === 'undefined') return null;
  return (window as unknown as { __lenis?: LenisLike }).__lenis ?? null;
}

export function scrollToId(selector: string) {
  const el = document.querySelector(selector) as HTMLElement | null;
  if (!el) return;
  const lenis = getLenis();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (lenis) {
    lenis.scrollTo(el, {
      offset: isMobile ? -58 : -72,
      duration: isMobile ? 0.95 : 1.7,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export function scrollToTop() {
  const lenis = getLenis();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (lenis) {
    lenis.scrollTo(0, {
      duration: isMobile ? 0.95 : 1.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function stopScroll() {
  getLenis()?.stop();
}

export function startScroll() {
  getLenis()?.start();
}
