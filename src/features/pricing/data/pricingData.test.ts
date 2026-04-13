import { describe, expect, it } from 'vitest';

import {
  ENTERPRISE_MONTHLY_PRICE,
  ENTERPRISE_YEARLY_PRICE,
  FREE_PLAN_PRICE,
  PLAN_COUNT,
  PRO_MONTHLY_PRICE,
  PRO_YEARLY_PRICE,
} from '../constants';
import { PlanTier } from '../PlanTier';
import { COMPARISON_FEATURES, FAQ_ITEMS, PRICING_PLANS } from './pricingData';

describe('PRICING_PLANS', () => {
  it('contains the expected number of plans', () => {
    expect(PRICING_PLANS.length).toBe(PLAN_COUNT);
  });

  it('has unique plan IDs', () => {
    const ids = PRICING_PLANS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has yearly prices less than or equal to monthly prices', () => {
    for (const plan of PRICING_PLANS) 
      expect(plan.yearlyPrice).toBeLessThanOrEqual(plan.monthlyPrice);
    
  });

  it('maps correct prices to the Free plan', () => {
    const free = PRICING_PLANS.find((p) => p.id === PlanTier.Free);
    expect(free).toBeDefined();
    expect(free!.monthlyPrice).toBe(FREE_PLAN_PRICE);
    expect(free!.yearlyPrice).toBe(FREE_PLAN_PRICE);
  });

  it('maps correct prices to the Pro plan', () => {
    const pro = PRICING_PLANS.find((p) => p.id === PlanTier.Pro);
    expect(pro).toBeDefined();
    expect(pro!.monthlyPrice).toBe(PRO_MONTHLY_PRICE);
    expect(pro!.yearlyPrice).toBe(PRO_YEARLY_PRICE);
  });

  it('maps correct prices to the Enterprise plan', () => {
    const enterprise = PRICING_PLANS.find((p) => p.id === PlanTier.Enterprise);
    expect(enterprise).toBeDefined();
    expect(enterprise!.monthlyPrice).toBe(ENTERPRISE_MONTHLY_PRICE);
    expect(enterprise!.yearlyPrice).toBe(ENTERPRISE_YEARLY_PRICE);
  });

  it('marks exactly one plan as highlighted', () => {
    const highlighted = PRICING_PLANS.filter((p) => p.highlighted);
    expect(highlighted.length).toBe(1);
    expect(highlighted[0]!.id).toBe(PlanTier.Pro);
  });

  it('has at least one feature per plan', () => {
    for (const plan of PRICING_PLANS) 
      expect(plan.features.length).toBeGreaterThan(0);
    
  });
});

describe('COMPARISON_FEATURES', () => {
  it('contains at least one feature', () => {
    expect(COMPARISON_FEATURES.length).toBeGreaterThan(0);
  });

  it('has non-empty values for all three tiers per feature', () => {
    for (const feature of COMPARISON_FEATURES) {
      expect(feature.free).not.toBe('');
      expect(feature.pro).not.toBe('');
      expect(feature.enterprise).not.toBe('');
    }
  });
});

describe('FAQ_ITEMS', () => {
  it('contains at least one FAQ item', () => {
    expect(FAQ_ITEMS.length).toBeGreaterThan(0);
  });

  it('has non-empty question and answer keys', () => {
    for (const item of FAQ_ITEMS) {
      expect(item.questionKey).not.toBe('');
      expect(item.answerKey).not.toBe('');
    }
  });
});
