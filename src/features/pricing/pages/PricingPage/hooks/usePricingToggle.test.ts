import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BillingCycle } from '@/features/pricing/BillingCycle';
import { PlanTier } from '@/features/pricing/PlanTier';
import type { PricingPlan } from '@/features/pricing/types';

import { usePricingToggle } from './usePricingToggle';

const MOCK_MONTHLY_PRICE = 29;
const MOCK_YEARLY_PRICE = 23;

const mockPlan: PricingPlan = {
  id: PlanTier.Pro,
  nameKey: 'pricing.plans.pro.name',
  descriptionKey: 'pricing.plans.pro.description',
  monthlyPrice: MOCK_MONTHLY_PRICE,
  yearlyPrice: MOCK_YEARLY_PRICE,
  ctaKey: 'pricing.plans.pro.cta',
  highlighted: true,
  features: [],
};

describe('usePricingToggle', () => {
  it('defaults to monthly billing cycle', () => {
    const { result } = renderHook(() => usePricingToggle());
    expect(result.current.billingCycle).toBe(BillingCycle.Monthly);
    expect(result.current.isYearly).toBe(false);
  });

  it('toggles to yearly billing cycle', () => {
    const { result } = renderHook(() => usePricingToggle());

    act(() => {
      result.current.toggleBillingCycle();
    });

    expect(result.current.billingCycle).toBe(BillingCycle.Yearly);
    expect(result.current.isYearly).toBe(true);
  });

  it('toggles back to monthly from yearly', () => {
    const { result } = renderHook(() => usePricingToggle());

    act(() => {
      result.current.toggleBillingCycle();
    });
    act(() => {
      result.current.toggleBillingCycle();
    });

    expect(result.current.billingCycle).toBe(BillingCycle.Monthly);
    expect(result.current.isYearly).toBe(false);
  });

  it('returns monthly price when billing cycle is monthly', () => {
    const { result } = renderHook(() => usePricingToggle());
    expect(result.current.getPrice(mockPlan)).toBe(MOCK_MONTHLY_PRICE);
  });

  it('returns yearly price when billing cycle is yearly', () => {
    const { result } = renderHook(() => usePricingToggle());

    act(() => {
      result.current.toggleBillingCycle();
    });

    expect(result.current.getPrice(mockPlan)).toBe(MOCK_YEARLY_PRICE);
  });
});
