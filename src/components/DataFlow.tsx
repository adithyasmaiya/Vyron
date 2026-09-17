import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const NODES = [
  { x: 60, y: 210, label: 'BUILD' },
  { x: 190, y: 120, label: 'BRAND' },
  { x: 320, y: 190, label: 'ATTRACT' },
  { x: 450, y: 110, label: 'CONVERT' },
  { x: 580, y: 185, label: 'AUTOMATE' },
  { x: 700, y: 105, label: 'MEASURE' },
];

const FLOW_PATH =
  'M60,210 C110,210 140,120 190,120 C240,120 270,190 320,190 C370,190 400,110 450,110 C500,110 530,185 580,185 C630,185 660,105 700,105';

const RETURN_PATH = 'M700,105 C740,105 750,240 700,250 L60,250';

export default function DataFlow() {
  return (
    <section id="intelligence" className="relative scroll-mt-20 py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-medium tracking-[0.5em] text-electric">
            ANALYTICS &amp; INTELLIGENCE
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            Every signal feeds the system.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/55">
            Live feedback loops connect every discipline — creative, media and automation
            all tuned by the same intelligence layer. No vanity metrics. Just momentum.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease: EASE }}
          className="glass relative mt-12 overflow-hidden rounded-[1.75rem] border border-white/10 p-4 sm:p-8"
          data-cursor
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
              maskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 80%)',
            }}
          />
          <svg viewBox="0 0 760 300" className="relative h-auto w-full" role="img" aria-label="Animated data flow across the six VYRON disciplines">
            <defs>
              <linearGradient id="flow-g" x1="0" y1="0" x2="760" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4d7cfe" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <filter id="node-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path d={RETURN_PATH} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="4 7" />
            <path id="flowPath" d={FLOW_PATH} fill="none" stroke="url(#flow-g)" strokeWidth="2" className="flow-dash" strokeLinecap="round" />

            {[0, 2.2, 4.4].map((begin, i) => (
              <g key={i} filter="url(#node-glow)">
                <circle r="4.5" fill={i === 1 ? '#8b5cf6' : '#4d7cfe'}>
                  <animateMotion dur="6.6s" begin={`${begin}s`} repeatCount="indefinite">
                    <mpath href="#flowPath" />
                  </animateMotion>
                </circle>
              </g>
            ))}

            {NODES.map((n, i) => (
              <g key={n.label} filter="url(#node-glow)">
                <circle cx={n.x} cy={n.y} r="13" fill="#0a0b11" stroke={i === NODES.length - 1 ? '#8b5cf6' : '#4d7cfe'} strokeWidth="1.6" />
                <circle cx={n.x} cy={n.y} r="4" fill={i === NODES.length - 1 ? '#8b5cf6' : '#9db4ff'} className="animate-glow" style={{ animationDelay: `${i * 0.5}s` }} />
                <text x={n.x} y={n.y + 32} textAnchor="middle" fill="rgba(255,255,255,0.62)" fontSize="10" letterSpacing="2.5" fontFamily="Space Grotesk, sans-serif">
                  {n.label}
                </text>
                <text x={n.x} y={n.y - 22} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize="9" letterSpacing="1.5" fontFamily="Space Grotesk, sans-serif">
                  0{i + 1}
                </text>
              </g>
            ))}

            <text x={700} y={52} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="11" letterSpacing="3" fontFamily="Space Grotesk, sans-serif">
              → GROWTH
            </text>
          </svg>

          <div className="relative mt-2 flex flex-wrap items-center justify-center gap-2.5 border-t border-white/[0.08] pt-6">
            {['Real-time pipelines', 'Attribution clarity', 'Experimentation cadence', 'Forecasting', 'Insight sprints'].map((t) => (
              <span key={t} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white/60">
                <span className="h-1 w-1 rounded-full bg-electric" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
