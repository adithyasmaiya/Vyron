export interface Service {
  id: number;
  code: string;
  key: string;
  name: string;
  tagline: string;
  description: string;
  deliverables: string[];
  accent: string;
  sort_order: number;
}

export interface Project {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  disciplines: string[];
  highlights: string[];
  image: string;
  year: string;
  sort_order: number;
}

export interface Discipline {
  id: number;
  code: string;
  key: string;
  name: string;
  tagline: string;
  description: string;
  capabilities: string[];
  color: string;
  sort_order: number;
}

export interface Principle {
  id: number;
  code: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface ProcessStep {
  id: number;
  code: string;
  name: string;
  phase: string;
  description: string;
  outputs: string[];
  sort_order: number;
}
