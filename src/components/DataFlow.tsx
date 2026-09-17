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
    <section id="intelligence" className="relative scroll-mt-20 py-28 sm:py-32 overflow-hidden">
      {/* Subtle atmospheric ambient field */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[850px] rounded-full bg-electric/[0.03] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-electric/60" />
            <p className="text-[11px] font-medium tracking-[0.5em] text-electric">
              ANALYTICS &amp; INTELLIGENCE
            </p>
            <span className="h-px w-6 bg-electric/60" />
          </div>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            Every signal feeds the system.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/60">
            Live feedback loops connect every discipline — creative, media and automation
            all tuned by the same intelligence layer. No vanity metrics. Just momentum.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease: EASE }}
          className="group relative mt-12 overflow-hidden rounded-[2rem] sm:rounded-[2.25rem] border border-white/12 bg-ink/90 p-5 sm:p-9 shadow-[0_30px_100px_-25px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all duration-700 hover:border-white/20 hover:shadow-[0_40px_120px_-20px_rgba(77,124,254,0.25)]"
          data-cursor
        >
          {/* Top specular hairline accent */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-20" />

          {/* Outer inset boundary ring */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.08] rounded-[2rem] sm:rounded-[2.25rem] z-20" />

          {/* Ambient corner glow on hover */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-electric/15 blur-[80px] opacity-0 transition-opacity duration-700 group-hover:opacity-100 z-10" />

          {/* Instrument Header Bar */}
          <div className="relative z-20 mb-4 flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-electric/40 opacity-75" />
                <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_6px_#4d7cfe]" />
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-white/80">
                SIGNAL // FEEDBACK LOOP
              </span>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[9px] tracking-[0.25em] text-cyan-400/90 backdrop-blur-md">
              CLOSED-LOOP OS
            </span>
          </div>

          {/* Matrix Coordinate Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
              maskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 80%)',
            }}
          />

          <svg viewBox="0 0 760 300" className="relative h-auto w-full" role="img" aria-label="Animated data flow across the six VYRON disciplines">
            <defs>
              <linearGradient id="flow-g" x1="0" y1="0" x2="760" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4d7cfe" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="return-g" x1="700" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#4d7cfe" stopOpacity="0.15" />
              </linearGradient>
              <filter id="node-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="packet-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Return feedback conduit */}
            <path id="returnPath" d={RETURN_PATH} fill="none" stroke="url(#return-g)" strokeWidth="1.5" strokeDasharray="4 8" strokeLinecap="round" />

            {/* Reverse feedback loop packet */}
            <g filter="url(#packet-glow)">
              <circle r="3" fill="#818cf8" opacity="0.75">
                <animateMotion dur="8.5s" repeatCount="indefinite">
                  <mpath href="#returnPath" />
                </animateMotion>
              </circle>
            </g>

            {/* Forward conduit rail base */}
            <path d={FLOW_PATH} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" strokeLinecap="round" />

            {/* Forward active luminous flow path */}
            <path id="flowPath" d={FLOW_PATH} fill="none" stroke="url(#flow-g)" strokeWidth="2.2" className="flow-dash" strokeLinecap="round" />

            {/* Traveling forward signal packets */}
            {[0, 1.8, 3.6, 5.4].map((begin, i) => (
              <g key={i} filter="url(#packet-glow)">
                <circle r="4.5" fill={i % 2 === 0 ? '#38bdf8' : '#a78bfa'}>
                  <animateMotion dur="7.2s" begin={`${begin}s`} repeatCount="indefinite">
                    <mpath href="#flowPath" />
                  </animateMotion>
                </circle>
                <circle r="9" fill="none" stroke={i % 2 === 0 ? '#38bdf8' : '#a78bfa'} strokeWidth="1" opacity="0.35">
                  <animateMotion dur="7.2s" begin={`${begin}s`} repeatCount="indefinite">
                    <mpath href="#flowPath" />
                  </animateMotion>
                </circle>
              </g>
            ))}

            {/* Six Stage Nodes */}
            {NODES.map((n, i) => (
              <g key={n.label} filter="url(#node-glow)">
                {/* Outer concentric aura */}
                <circle cx={n.x} cy={n.y} r="20" fill="none" stroke="rgba(77,124,254,0.12)" strokeWidth="1" />

                {/* Node substrate */}
                <circle cx={n.x} cy={n.y} r="13" fill="#060810" stroke={i === NODES.length - 1 ? '#a855f7' : '#4d7cfe'} strokeWidth="1.6" />

                {/* Pulsing core signal */}
                <circle cx={n.x} cy={n.y} r="4" fill={i === NODES.length - 1 ? '#c084fc' : '#38bdf8'} className="animate-glow" style={{ animationDelay: `${i * 0.5}s` }} />

                {/* Stage Code Label (Above) */}
                <text x={n.x} y={n.y - 22} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" letterSpacing="2" fontFamily="Space Grotesk, sans-serif">
                  0{i + 1}
                </text>

                {/* Stage Name (Below) */}
                <text x={n.x} y={n.y + 32} textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10.5" fontWeight="600" letterSpacing="2.5" fontFamily="Space Grotesk, sans-serif">
                  {n.label}
                </text>
              </g>
            ))}

            {/* Terminal Growth Milestone */}
            <g filter="url(#node-glow)">
              <rect x="642" y="36" width="116" height="26" rx="13" fill="#060810" stroke="rgba(168,85,247,0.6)" strokeWidth="1.2" />
              <circle cx="658" cy="49" r="3" fill="#c084fc" />
              <text x="705" y="53" textAnchor="middle" fill="#e9d5ff" fontSize="10.5" fontWeight="600" letterSpacing="2.5" fontFamily="Space Grotesk, sans-serif">
                → GROWTH
              </text>
            </g>
          </svg>

          {/* Value Tag Capsules */}
          <div className="relative mt-4 flex flex-wrap items-center justify-center gap-2.5 border-t border-white/[0.08] pt-6">
            {['Real-time pipelines', 'Attribution clarity', 'Experimentation cadence', 'Forecasting', 'Insight sprints'].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.025] px-4 py-1.5 text-xs font-medium text-white/75 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              >
                <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full border border-electric/40 bg-electric/10">
                  <span className="h-1 w-1 rounded-full bg-electric" />
                </span>
                <span>{t}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
