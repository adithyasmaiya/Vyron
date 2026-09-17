import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [enabled] = useState(() => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.55 });
  const ry = useSpring(y, { stiffness: 520, damping: 42, mass: 0.55 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const isTarget = !!t?.closest?.('a, button, [data-cursor], input, select, textarea');
      setHovering((prev) => (prev !== isTarget ? isTarget : prev));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[300] will-change-transform" style={{ x: rx, y: ry }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white mix-blend-difference"
          animate={{
            width: hovering ? 58 : 14,
            height: hovering ? 58 : 14,
            opacity: 1,
            scale: pressed ? 0.82 : 1,
            backgroundColor: hovering ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0)',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        />
      </motion.div>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[300] will-change-transform" style={{ x, y }}>
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-electric transition-all duration-200 ${
            hovering ? 'h-1 w-1 opacity-60' : 'h-1.5 w-1.5 opacity-100'
          }`}
        />
      </motion.div>
    </>
  );
}
