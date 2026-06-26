// ─── Navigation ────────────────────────────────────────────────
export interface NavItem {
  name: string;
  href: string;
}

// ─── Stats ────────────────────────────────────────────────────
export interface Stat {
  value: string;
  label: string;
  numericValue?: number;
  suffix?: string;
}

// ─── Skills ───────────────────────────────────────────────────
export interface Skill {
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

// ─── Projects ────────────────────────────────────────────────
export interface Project {
  id: string;
  num: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
  icon: string;
  images?: string[];
}

// ─── Experience ──────────────────────────────────────────────
export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  bullets: string[];
}

// ─── Certifications ─────────────────────────────────────────
export interface Certification {
  name: string;
  issuer: string;
  date: string;
  highlight?: boolean;
}

// ─── Languages ───────────────────────────────────────────────
export interface Language {
  name: string;
  level: string;
  flag: string;
}

// ─── Contact ─────────────────────────────────────────────────
export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}

export interface ContactLink {
  name: string;
  href: string;
  icon: string;
}