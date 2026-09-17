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
    <section id="intelligence" className="relative scroll-mt-20 py-28 sm:py-36">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[50vmin] w-[75vmin] -translate-x-1/2 rounded-full bg-electric/[0.04] blur-[140px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-electric/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-electric" />
            </span>
            <p className="font-mono text-[11px] font-semibold tracking-[0.45em] text-electric uppercase">
              ANALYTICS &amp; INTELLIGENCE
            </p>
            <span className="hidden sm:inline-block h-3 w-px bg-white/15" />
            <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
              GROWTH SIGNAL NETWORK
            </span>
          </div>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-white">
            Every signal feeds the system.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[14.5px] sm:text-[15.5px] leading-relaxed text-white/60">
            Live feedback loops connect every discipline — creative, media and automation
            all tuned by the same intelligence layer. No vanity metrics. Just momentum.
          </p>
        </motion.div>

        {/* Growth Signal Network Instrument Container */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease: EASE }}
          className="relative mt-14 overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#090b12]/95 p-5 sm:p-8 backdrop-blur-2xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.03)]"
          data-cursor
        >
          {/* Top Specular Edge Highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          {/* Blueprint Grid Atmosphere */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
              maskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 80%)',
            }}
          />

          {/* System Telemetry Header Bar */}
          <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4 px-1 sm:px-2">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-white/55">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span>SIGNAL CONDUIT // ONLINE</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 font-mono text-[9.5px] tracking-[0.2em] text-white/35">
              <span>CADENCE: REAL-TIME</span>
              <span className="h-3 w-px bg-white/10" />
              <span>NODES: 06 MAPPED</span>
              <span className="h-3 w-px bg-white/10" />
              <span>FEEDBACK: CLOSED LOOP</span>
            </div>
          </div>

          {/* SVG Growth Signal Architecture */}
          <svg
            viewBox="0 0 760 300"
            className="relative h-auto w-full"
            role="img"
            aria-label="Animated data flow across the six VYRON disciplines"
          >
            <defs>
              <linearGradient id="flow-g" x1="0" y1="0" x2="760" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4d7cfe" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>

              <filter id="node-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ingress / Egress Annotations */}
            <text
              x={60}
              y={272}
              textAnchor="middle"
              fill="rgba(255,255,255,0.25)"
              fontSize="7.5"
              fontFamily="monospace"
              letterSpacing="1.5"
            >
              SIGNAL INGRESS
            </text>

            <text
              x={380}
              y={262}
              textAnchor="middle"
              fill="rgba(255,255,255,0.2)"
              fontSize="7"
              fontFamily="monospace"
              letterSpacing="2"
            >
              FEEDBACK RE-INJECTION BUS
            </text>

            {/* Closed Loop Return Path */}
            <path
              id="returnPath"
              d={RETURN_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />

            {/* Return Path Signal Packet */}
            <circle r="2.5" fill="#8b5cf6" opacity="0.75" filter="url(#node-glow)">
              <animateMotion dur="8s" repeatCount="indefinite">
                <mpath href="#returnPath" />
              </animateMotion>
            </circle>

            {/* Flow Path Conduit Trench & Active Luminous Conductor */}
            <path
              d={FLOW_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              id="flowPath"
              d={FLOW_PATH}
              fill="none"
              stroke="url(#flow-g)"
              strokeWidth="2.4"
              className="flow-dash"
              strokeLinecap="round"
            />

            {/* Flow Signal Packets (Continuous Moving Data Conduits) */}
            {[0, 2.2, 4.4].map((begin, i) => (
              <g key={i} filter="url(#node-glow)">
                <circle r="5" fill={i === 1 ? '#8b5cf6' : '#4d7cfe'} opacity="0.6">
                  <animateMotion dur="6.6s" begin={`${begin}s`} repeatCount="indefinite">
                    <mpath href="#flowPath" />
                  </animateMotion>
                </circle>
                <circle r="3" fill="#ffffff">
                  <animateMotion dur="6.6s" begin={`${begin}s`} repeatCount="indefinite">
                    <mpath href="#flowPath" />
                  </animateMotion>
                </circle>
              </g>
            ))}

            {/* Telemetry Stage Nodes */}
            {NODES.map((n, i) => (
              <g key={n.label} filter="url(#node-glow)">
                {/* Node Peripheral Orbit Marker */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="20"
                  fill="none"
                  stroke={i === NODES.length - 1 ? 'rgba(139,92,246,0.18)' : 'rgba(77,124,254,0.18)'}
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />

                {/* Node Core Body */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="13"
                  fill="#080a11"
                  stroke={i === NODES.length - 1 ? '#8b5cf6' : '#4d7cfe'}
                  strokeWidth="1.8"
                />

                {/* Pulsing Core Energy */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="4"
                  fill={i === NODES.length - 1 ? '#c4b5fd' : '#9db4ff'}
                  className="animate-glow"
                  style={{ animationDelay: `${i * 0.45}s` }}
                />

                {/* Stage Index Telemetry */}
                <text
                  x={n.x}
                  y={n.y - 25}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.35)"
                  fontSize="9"
                  fontFamily="monospace"
                  letterSpacing="1.5"
                >
                  0{i + 1}
                </text>

                {/* Stage Label */}
                <text
                  x={n.x}
                  y={n.y + 33}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="10"
                  fontWeight="600"
                  letterSpacing="2.2"
                  fontFamily="Space Grotesk, sans-serif"
                >
                  {n.label}
                </text>
              </g>
            ))}

            {/* Growth Terminal Plaque */}
            <g filter="url(#node-glow)">
              <rect
                x={642}
                y={38}
                width={116}
                height={26}
                rx={13}
                fill="#080a11"
                stroke="#8b5cf6"
                strokeWidth="1.2"
              />
              <circle cx={656} cy={51} r="3" fill="#8b5cf6" className="animate-pulse" />
              <text
                x={704}
                y={55}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
                fontWeight="600"
                letterSpacing="2.5"
                fontFamily="Space Grotesk, sans-serif"
              >
                → GROWTH
              </text>
            </g>
          </svg>

          {/* Value Capabilities Tags */}
          <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-2.5 border-t border-white/[0.08] pt-6">
            {[
              'Real-time pipelines',
              'Attribution clarity',
              'Experimentation cadence',
              'Forecasting',
              'Insight sprints',
            ].map((t) => (
              <span
                key={t}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-xs text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_6px_#4d7cfe]" />
                <span>{t}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
