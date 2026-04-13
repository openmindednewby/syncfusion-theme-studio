/** Pricing feature types. */

import type { PlanTier } from './PlanTier';

export interface PricingPlan {
  id: PlanTier;
  nameKey: string;
  descriptionKey: string;
  monthlyPrice: number;
  yearlyPrice: number;
  ctaKey: string;
  highlighted: boolean;
  features: PlanFeature[];
}

export interface PlanFeature {
  labelKey: string;
  included: boolean;
}

export interface FaqItem {
  questionKey: string;
  answerKey: string;
}

export interface ComparisonFeature {
  labelKey: string;
  free: string;
  pro: string;
  enterprise: string;
}
