/** Hook for managing billing cycle toggle state. */
import { useCallback, useState } from 'react';

import { BillingCycle } from '@/features/pricing/BillingCycle';
import type { PricingPlan } from '@/features/pricing/types';

interface UsePricingToggleResult {
  billingCycle: BillingCycle;
  isYearly: boolean;
  toggleBillingCycle: () => void;
  getPrice: (plan: PricingPlan) => number;
}

export function usePricingToggle(): UsePricingToggleResult {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(BillingCycle.Monthly);

  const isYearly = billingCycle === BillingCycle.Yearly;

  const toggleBillingCycle = useCallback(() => {
    setBillingCycle((prev) =>
      prev === BillingCycle.Monthly ? BillingCycle.Yearly : BillingCycle.Monthly,
    );
  }, []);

  const getPrice = useCallback(
    (plan: PricingPlan): number => (isYearly ? plan.yearlyPrice : plan.monthlyPrice),
    [isYearly],
  );

  return { billingCycle, isYearly, toggleBillingCycle, getPrice };
}
