// src/pages/Landing/Landing.types.ts

export interface StatItem {
  value: string;
  label: string;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
  iconType: 'truck' | 'currency' | 'users' | 'shield';
}

export interface BenefitItem {
  role: string;
  colorType: 'primary' | 'secondary' | 'accent';
  benefits: string[];
}

export interface PartnerItem {
  name: string;
  logo: string;
  url: string;
}
