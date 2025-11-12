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
  icon?: string;
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

export interface NewsArticle {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: string;
  summary: string;
  content: string; // Markdown本文
}
