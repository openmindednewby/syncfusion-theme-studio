import { describe, it, expect } from 'vitest';

import { PRICING_PLANS } from '@/features/pricing/data/pricingData';
import type { PricingPlan } from '@/features/pricing/types';
import { render, screen } from '@/test/utils';

import PricingCards from './PricingCards';

const MOCK_PRICE = 10;

const mockGetPrice = (_plan: PricingPlan): number => MOCK_PRICE;

describe('PricingCards accessibility', () => {
  it('renders each CTA button with aria-label matching its ctaKey', () => {
    render(<PricingCards getPrice={mockGetPrice} isYearly={false} />);

    for (const plan of PRICING_PLANS) {
      const button = screen.getByTestId(`pricing-cta-${plan.id}`);
      expect(button.getAttribute('aria-label')).toBe(plan.ctaKey);
    }
  });
});
