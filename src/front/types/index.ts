import type { ComponentType, SVGProps } from "react";

export interface CompanyInfo {
  name: string;
  ceo: string;
  founded: string;
  businesses: string[];
  address: {
    postalCode: string;
    prefecture: string;
    city: string;
    street: string;
    building: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies?: string[];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string[];
  technologies: string[];
  period?: string;
}

export interface Strength {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  deliverables?: string[];
}

export interface TechStack {
  category: string;
  items: TechItem[];
}

export interface TechItem {
  name: string;
  icon?: string;
  proficiency: number;
}

export interface Client {
  name: string;
  url: string;
}

export interface Philosophy {
  mission: string;
  vision: string;
  values: string;
  philosophy: string;
  identity: string;
}

export const newsCategories = ["announcement", "tech-blog"] as const;
export type NewsCategory = (typeof newsCategories)[number];

export interface NewsArticle {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: NewsCategory;
  summary: string;
  content: string; // Markdown本文
}

export interface SlideDoc {
  id: string;
  title: string;
  description: string;
  path: string; // 配信パス（例: "/slides/company/dx.html"）
}

export interface SlideCategory {
  id: string;
  name: string;
  description: string;
  docs: SlideDoc[];
}

export interface PainPoint {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface DxProcessStep {
  step: string;
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface PricingTier {
  name: string;
  priceRange: string;
  description: string;
}

export interface CaseMetric {
  label: string;
  value: string;
  note?: string;
}

export interface CaseImage {
  src: string;
  alt: string;
}

export interface CaseStudy {
  id: string;
  industry: string;
  scale: string;
  supportScope: string;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
  metrics: CaseMetric[];
  flowBefore: string[];
  flowAfter: string[];
  image: CaseImage;
}

export interface IndustrySolution {
  id: string;
  industry: string;
  title: string;
  description: string;
  href: string;
  image: CaseImage;
}
