import { Discipline, Principle, ProcessStep, Project, Service } from './types';

export const FALLBACK_SERVICES: Service[] = [
  {
    id: 1,
    code: '01',
    key: 'technology',
    name: 'Technology & Web',
    tagline: 'Engineered for momentum.',
    description:
      'We engineer websites, platforms and digital products built for speed, scale and conversion. Clean architecture, obsessive performance, zero bloat — technology that becomes a competitive advantage rather than a maintenance burden.',
    deliverables: [
      'High-performance websites & platforms',
      'E-commerce systems & headless builds',
      'Web applications & portals',
      'Technical SEO & performance engineering',
    ],
    accent: '#4D7CFE',
    sort_order: 1,
  },
  {
    id: 2,
    code: '02',
    key: 'design',
    name: 'Design & Branding',
    tagline: 'Distinctive by design.',
    description:
      'Identities and interfaces with intent. We design brands and digital experiences that feel inevitable — distinctive enough to be remembered, systematic enough to scale across every touchpoint without dilution.',
    deliverables: [
      'Brand identity & visual systems',
      'Web design & interface design',
      'Design systems & component libraries',
      'Art direction & motion design',
    ],
    accent: '#6D7DFB',
    sort_order: 2,
  },
  {
    id: 3,
    code: '03',
    key: 'content',
    name: 'Content & Social',
    tagline: 'Attention, engineered.',
    description:
      'Content engines, not content calendars. We build editorial and social systems that compound — sharp strategy, distinctive creative and distribution designed to turn attention into audience and audience into demand.',
    deliverables: [
      'Content strategy & editorial systems',
      'Social media management & growth',
      'Video, photo & campaign production',
      'Copywriting & brand voice',
    ],
    accent: '#8B5CF6',
    sort_order: 3,
  },
  {
    id: 4,
    code: '04',
    key: 'growth',
    name: 'Growth & Performance',
    tagline: 'Compounding growth loops.',
    description:
      'Growth as a discipline, not a gamble. Full-funnel performance programs — paid media, CRO and lifecycle — run as continuous experiments, where every rupee spent teaches the system how to spend the next one better.',
    deliverables: [
      'Paid media & performance marketing',
      'Conversion rate optimization',
      'Funnel strategy & landing systems',
      'Lifecycle & retention marketing',
    ],
    accent: '#A06BF5',
    sort_order: 4,
  },
  {
    id: 5,
    code: '05',
    key: 'automation',
    name: 'AI, CRM & Automation',
    tagline: 'Systems that work while you sleep.',
    description:
      'Intelligence wired into operations. We deploy AI, CRM and automation that remove friction across marketing, sales and service — so your team spends time on judgment, not on repetitive tasks machines do better.',
    deliverables: [
      'AI strategy & implementation',
      'CRM setup & lifecycle automation',
      'Workflow & sales automation',
      'Chatbots & intelligent assistants',
    ],
    accent: '#5B8CFF',
    sort_order: 5,
  },
  {
    id: 6,
    code: '06',
    key: 'intelligence',
    name: 'Analytics & Intelligence',
    tagline: 'Signal over noise.',
    description:
      'Clarity over vanity. We build the measurement backbone — tracking, dashboards, attribution — that turns noise into signal, so every creative and commercial decision is backed by evidence, not opinion.',
    deliverables: [
      'Analytics setup & tracking architecture',
      'Dashboards & reporting systems',
      'Attribution & incrementality analysis',
      'Insight sprints & forecasting',
    ],
    accent: '#7DD3FC',
    sort_order: 6,
  },
];

export const FALLBACK_DISCIPLINES: Discipline[] = [
  {
    id: 1,
    code: '01',
    key: 'BUILD',
    name: 'Technology',
    tagline: 'Platforms engineered to convert.',
    description:
      'The foundation layer. Fast, scalable platforms and products engineered to convert — architecture that holds up as you grow.',
    capabilities: ['Web platforms', 'E-commerce', 'Web apps', 'Integrations'],
    color: '#4D7CFE',
    sort_order: 1,
  },
  {
    id: 2,
    code: '02',
    key: 'BRAND',
    name: 'Design',
    tagline: 'Identities impossible to ignore.',
    description:
      'The distinction layer. Identities and interfaces that make brands unmistakable — systematic enough to scale everywhere.',
    capabilities: ['Identity', 'Interface design', 'Design systems', 'Motion'],
    color: '#6D7DFB',
    sort_order: 2,
  },
  {
    id: 3,
    code: '03',
    key: 'ATTRACT',
    name: 'Content',
    tagline: 'Content that pulls, not pushes.',
    description:
      'The gravity layer. Content and social engines that pull attention in — then turn audiences into sustained demand.',
    capabilities: ['Editorial', 'Social systems', 'Production', 'Distribution'],
    color: '#8B5CF6',
    sort_order: 3,
  },
  {
    id: 4,
    code: '04',
    key: 'CONVERT',
    name: 'Growth',
    tagline: 'Demand converted into revenue.',
    description:
      'The acceleration layer. Full-funnel performance programs where every campaign makes the next one smarter.',
    capabilities: ['Paid media', 'CRO', 'Funnels', 'Lifecycle'],
    color: '#A06BF5',
    sort_order: 4,
  },
  {
    id: 5,
    code: '05',
    key: 'AUTOMATE',
    name: 'Automation',
    tagline: 'Leverage on autopilot.',
    description:
      'The leverage layer. AI and automation wired through marketing, sales and service — compounding team output.',
    capabilities: ['AI systems', 'CRM', 'Workflows', 'Assistants'],
    color: '#5B8CFF',
    sort_order: 5,
  },
  {
    id: 6,
    code: '06',
    key: 'MEASURE',
    name: 'Intelligence',
    tagline: 'Every signal, accounted for.',
    description:
      'The clarity layer. Measurement that feeds every other discipline — closing the loop from signal to decision.',
    capabilities: ['Tracking', 'Dashboards', 'Attribution', 'Forecasting'],
    color: '#7DD3FC',
    sort_order: 6,
  },
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    code: 'C—01',
    title: 'NEBULA / Modular Living',
    subtitle: 'Cinematic commerce flagship — concept',
    description:
      'A direct-to-consumer concept exploring how a modular product ecosystem could be presented through one cinematic digital flagship — configurators, editorial storytelling and a checkout flow designed around desire, not friction.',
    disciplines: ['Technology', 'Design', 'Content'],
    highlights: [
      'Immersive 3D product configurator concept',
      'Editorial storytelling meets commerce',
      'Conversion-first checkout architecture',
    ],
    image: '/images/work-nebula.jpg',
    year: '2026',
    sort_order: 1,
  },
  {
    id: 2,
    code: 'C—02',
    title: 'PRISM / Capital Clarity',
    subtitle: 'Clarity-first wealth platform — concept',
    description:
      'A wealth-technology concept exploring clarity in complexity — a dashboard experience that translates dense portfolio data into calm, confident interfaces, supported by an education engine that builds trust before it asks for it.',
    disciplines: ['Design', 'Intelligence', 'Automation'],
    highlights: [
      'Data-dense UI with editorial calm',
      'Onboarding that teaches, then converts',
      'Lifecycle automation blueprint',
    ],
    image: '/images/work-prism.jpg',
    year: '2026',
    sort_order: 2,
  },
  {
    id: 3,
    code: 'C—03',
    title: 'FLUX / Signal Network',
    subtitle: 'Membership media universe — concept',
    description:
      'A streaming-culture concept imagining how a niche media brand could build a membership universe — episodic content systems, community rituals and a growth loop where every release compounds the audience for the next.',
    disciplines: ['Content', 'Growth', 'Technology'],
    highlights: [
      'Editorial engine for episodic IP',
      'Membership & community architecture',
      'Compounding release-loop strategy',
    ],
    image: '/images/work-flux.jpg',
    year: '2025',
    sort_order: 3,
  },
  {
    id: 4,
    code: 'C—04',
    title: 'ORBIT / Ops Intelligence',
    subtitle: 'AI operations command layer — concept',
    description:
      'An operations concept for service businesses — an AI-assisted command layer connecting CRM, scheduling, follow-ups and reporting into one calm surface, designed to give founders leverage without adding headcount.',
    disciplines: ['Automation', 'Intelligence', 'Technology'],
    highlights: [
      'Unified CRM + automation command layer',
      'AI-assisted follow-up sequences',
      'Real-time operational intelligence',
    ],
    image: '/images/work-orbit.jpg',
    year: '2025',
    sort_order: 4,
  },
];

export const FALLBACK_PROCESS: ProcessStep[] = [
  {
    id: 1,
    code: '01',
    name: 'Discover',
    phase: 'Week 0–2',
    description:
      'We map your market, model the opportunity and define what momentum means for you — in numbers, not adjectives.',
    outputs: ['Growth audit & teardown', 'Opportunity model', 'Success metrics'],
    sort_order: 1,
  },
  {
    id: 2,
    code: '02',
    name: 'Architect',
    phase: 'Week 2–4',
    description:
      'One connected blueprint across tech, brand, content, media, automation and data — sequenced for fastest compounding impact.',
    outputs: ['System blueprint', 'Prioritized roadmap', 'Measurement plan'],
    sort_order: 2,
  },
  {
    id: 3,
    code: '03',
    name: 'Create',
    phase: 'Week 4–10',
    description:
      'Design and engineering in tight loops. You see progress weekly — real builds, not slideware.',
    outputs: ['Brand & interface design', 'Platform development', 'Content production'],
    sort_order: 3,
  },
  {
    id: 4,
    code: '04',
    name: 'Activate',
    phase: 'Week 10–12',
    description:
      'Campaigns, automation and intelligence layers go live together — a coordinated launch across every channel that matters.',
    outputs: ['Campaign launch', 'Automation wiring', 'Analytics live'],
    sort_order: 4,
  },
  {
    id: 5,
    code: '05',
    name: 'Compound',
    phase: 'Ongoing',
    description:
      'The system learns. We run structured experiments, feed insights back into every discipline and compound the wins.',
    outputs: ['Experiment cadence', 'Insight reports', 'Scaling roadmap'],
    sort_order: 5,
  },
];

export const FALLBACK_PRINCIPLES: Principle[] = [
  {
    id: 1,
    code: 'P—01',
    title: 'Systems over assets',
    description:
      'We think in flywheels, not funnels. Every asset we ship — a site, a campaign, an automation — is designed to make the next one perform better.',
    sort_order: 1,
  },
  {
    id: 2,
    code: 'P—02',
    title: 'Integration over isolation',
    description:
      'Technology, brand, content, media, automation and data are planned together from day one. Nothing is an afterthought; everything compounds.',
    sort_order: 2,
  },
  {
    id: 3,
    code: 'P—03',
    title: 'Craft over volume',
    description:
      'Taste is a growth lever. We hold a ruthless bar for craft because premium-feeling brands convert better, retain longer and get remembered.',
    sort_order: 3,
  },
  {
    id: 4,
    code: 'P—04',
    title: 'Leverage over dependency',
    description:
      'We build assets you own and systems your team can run. No black boxes, no dependency traps — leverage that stays with you.',
    sort_order: 4,
  },
  {
    id: 5,
    code: 'P—05',
    title: 'Momentum over stagnation',
    description:
      'Execution compounds when kept in constant motion. We build agile feedback loops so your brand continuously iterates, scales, and outperforms.',
    sort_order: 5,
  },
];

export function getFallbackDataForPath<T>(path: string): T[] | null {
  const normalized = path.split('?')[0].replace(/\/+$/, '');
  switch (normalized) {
    case '/api/services':
      return FALLBACK_SERVICES as unknown as T[];
    case '/api/disciplines':
      return FALLBACK_DISCIPLINES as unknown as T[];
    case '/api/projects':
      return FALLBACK_PROJECTS as unknown as T[];
    case '/api/process':
      return FALLBACK_PROCESS as unknown as T[];
    case '/api/principles':
      return FALLBACK_PRINCIPLES as unknown as T[];
    default:
      return null;
  }
}
