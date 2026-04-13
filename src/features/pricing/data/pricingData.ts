/** Pricing plans, comparison features, and FAQ data. */
import {
  ENTERPRISE_MONTHLY_PRICE,
  ENTERPRISE_YEARLY_PRICE,
  FREE_PLAN_PRICE,
  PRO_MONTHLY_PRICE,
  PRO_YEARLY_PRICE,
} from '../constants';
import { PlanTier } from '../PlanTier';

import type { ComparisonFeature, FaqItem, PricingPlan } from '../types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: PlanTier.Free,
    nameKey: 'pricing.plans.free.name',
    descriptionKey: 'pricing.plans.free.description',
    monthlyPrice: FREE_PLAN_PRICE,
    yearlyPrice: FREE_PLAN_PRICE,
    ctaKey: 'pricing.plans.free.cta',
    highlighted: false,
    features: [
      { labelKey: 'pricing.features.basicThemes', included: true },
      { labelKey: 'pricing.features.singleUser', included: true },
      { labelKey: 'pricing.features.storage1gb', included: true },
      { labelKey: 'pricing.features.communitySupport', included: true },
      { labelKey: 'pricing.features.prioritySupport', included: false },
      { labelKey: 'pricing.features.sso', included: false },
    ],
  },
  {
    id: PlanTier.Pro,
    nameKey: 'pricing.plans.pro.name',
    descriptionKey: 'pricing.plans.pro.description',
    monthlyPrice: PRO_MONTHLY_PRICE,
    yearlyPrice: PRO_YEARLY_PRICE,
    ctaKey: 'pricing.plans.pro.cta',
    highlighted: true,
    features: [
      { labelKey: 'pricing.features.allThemes', included: true },
      { labelKey: 'pricing.features.tenUsers', included: true },
      { labelKey: 'pricing.features.storage100gb', included: true },
      { labelKey: 'pricing.features.prioritySupport', included: true },
      { labelKey: 'pricing.features.apiAccess', included: true },
      { labelKey: 'pricing.features.sso', included: false },
    ],
  },
  {
    id: PlanTier.Enterprise,
    nameKey: 'pricing.plans.enterprise.name',
    descriptionKey: 'pricing.plans.enterprise.description',
    monthlyPrice: ENTERPRISE_MONTHLY_PRICE,
    yearlyPrice: ENTERPRISE_YEARLY_PRICE,
    ctaKey: 'pricing.plans.enterprise.cta',
    highlighted: false,
    features: [
      { labelKey: 'pricing.features.allThemes', included: true },
      { labelKey: 'pricing.features.unlimitedUsers', included: true },
      { labelKey: 'pricing.features.unlimitedStorage', included: true },
      { labelKey: 'pricing.features.prioritySupport', included: true },
      { labelKey: 'pricing.features.apiAccess', included: true },
      { labelKey: 'pricing.features.sso', included: true },
    ],
  },
];

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    labelKey: 'pricing.comparison.themes',
    free: 'pricing.comparison.basic',
    pro: 'pricing.comparison.all',
    enterprise: 'pricing.comparison.allPlusCustom',
  },
  {
    labelKey: 'pricing.comparison.users',
    free: '1',
    pro: '10',
    enterprise: 'pricing.comparison.unlimited',
  },
  {
    labelKey: 'pricing.comparison.storage',
    free: '1 GB',
    pro: '100 GB',
    enterprise: 'pricing.comparison.unlimited',
  },
  {
    labelKey: 'pricing.comparison.support',
    free: 'pricing.comparison.community',
    pro: 'pricing.comparison.priority',
    enterprise: 'pricing.comparison.dedicatedSla',
  },
  {
    labelKey: 'pricing.comparison.apiAccess',
    free: '\u2014',
    pro: '\u2713',
    enterprise: '\u2713',
  },
  {
    labelKey: 'pricing.comparison.ssoLabel',
    free: '\u2014',
    pro: '\u2014',
    enterprise: '\u2713',
  },
  {
    labelKey: 'pricing.comparison.auditLogs',
    free: '\u2014',
    pro: '\u2014',
    enterprise: '\u2713',
  },
  {
    labelKey: 'pricing.comparison.customBranding',
    free: '\u2014',
    pro: '\u2014',
    enterprise: '\u2713',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    questionKey: 'pricing.faq.trialQuestion',
    answerKey: 'pricing.faq.trialAnswer',
  },
  {
    questionKey: 'pricing.faq.cancelQuestion',
    answerKey: 'pricing.faq.cancelAnswer',
  },
  {
    questionKey: 'pricing.faq.upgradeQuestion',
    answerKey: 'pricing.faq.upgradeAnswer',
  },
  {
    questionKey: 'pricing.faq.paymentQuestion',
    answerKey: 'pricing.faq.paymentAnswer',
  },
  {
    questionKey: 'pricing.faq.enterpriseQuestion',
    answerKey: 'pricing.faq.enterpriseAnswer',
  },
];
