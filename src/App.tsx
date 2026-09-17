import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Intro from './components/Intro';
import SystemSection from './components/SystemSection';
import Services from './components/Services';
import Burst from './components/Burst';
import Process from './components/Process';
import Work from './components/Work';
import Why from './components/Why';
import About from './components/About';
import DataFlow from './components/DataFlow';
import FinalCta from './components/FinalCta';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = ['TECHNOLOGY', 'DESIGN', 'CONTENT', 'GROWTH', 'AUTOMATION', 'INTELLIGENCE'];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const finishLoad = useCallback(() => {
    setLoading(false);
    window.scrollTo(0, 0);
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    ScrollTrigger.refresh();
  }, []);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 240, damping: 35, mass: 0.15, restDelta: 0.001 });

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    lenis.scrollTo(0, { immediate: true });

    lenis.on('scroll', ScrollTrigger.update);
    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const resetToTop = () => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', resetToTop);
    window.addEventListener('beforeunload', resetToTop);
    return () => {
      window.removeEventListener('load', resetToTop);
      window.removeEventListener('beforeunload', resetToTop);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      (window as unknown as { __lenis: Lenis | null }).__lenis = null;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    if (!loading) {
      window.scrollTo(0, 0);
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <div className="min-h-screen bg-void font-body text-frost antialiased">
      <Cursor />
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[150] h-[2px] origin-left bg-gradient-to-r from-electric via-iris to-electric"
      />

      <AnimatePresence>{loading && <Preloader onDone={finishLoad} />}</AnimatePresence>

      <Navbar onStart={openModal} />

      <main>
        <Hero onStart={openModal} />
        <Marquee items={MARQUEE_ITEMS} />
        <Intro />
        <SystemSection />
        <Services />
        <Burst />
        <Process />
        <Work />
        <Why />
        <About />
        <DataFlow />
        <FinalCta onStart={openModal} />
      </main>

      <Footer />
      <ContactModal open={modalOpen} onClose={closeModal} />
      <div className="grain" aria-hidden="true" />
    </div>
  );
}
