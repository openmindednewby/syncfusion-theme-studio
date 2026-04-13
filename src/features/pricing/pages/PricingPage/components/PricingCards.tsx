/** Three-tier pricing cards (Free, Pro, Enterprise). */
import { memo, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@/app/routePaths';
import { PRICING_PLANS } from '@/features/pricing/data/pricingData';
import type { PricingPlan } from '@/features/pricing/types';
import { FM } from '@/localization/utils/helpers';

interface PricingCardsProps {
  isYearly: boolean;
  getPrice: (plan: PricingPlan) => number;
}

const CheckIcon = (): JSX.Element => (
  <svg className="h-5 w-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const CrossIcon = (): JSX.Element => (
  <svg className="h-5 w-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const PricingCards = memo(({ isYearly, getPrice }: PricingCardsProps): JSX.Element => {
  const navigate = useNavigate();

  const handleCtaClick = useCallback(() => {
    Promise.resolve(navigate(RoutePath.Login)).catch(() => undefined);
  }, [navigate]);

  return (
    <div
      className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3"
      data-testid="pricing-cards"
    >
      {PRICING_PLANS.map((plan) => {
        const price = getPrice(plan);

        return (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-2xl border p-8 transition-shadow hover:shadow-lg ${
              plan.highlighted
                ? 'border-primary-500 bg-surface shadow-md'
                : 'border-border bg-surface'
            }`}
            data-testid={`pricing-card-${plan.id}`}
          >
            {plan.highlighted ? (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white"
                data-testid="pricing-badge-popular"
              >
                {FM('pricing.badge.popular')}
              </span>
            ) : null}
            <h2 className="text-lg font-semibold text-text-primary">{FM(plan.nameKey)}</h2>
            <p className="mt-2 text-sm text-text-secondary">{FM(plan.descriptionKey)}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-text-primary" data-testid={`pricing-price-${plan.id}`}>
                ${price}
              </span>
              <span className="text-sm text-text-muted">
                {FM(isYearly ? 'pricing.perMonth.yearly' : 'pricing.perMonth.monthly')}
              </span>
            </div>
            <button
              aria-label={FM(plan.ctaKey)}
              className={`mt-8 w-full rounded-lg py-3 text-sm font-semibold transition-colors ${
                plan.highlighted
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'border border-primary-600 text-primary-600 hover:bg-primary-50'
              }`}
              data-testid={`pricing-cta-${plan.id}`}
              type="button"
              onClick={handleCtaClick}
            >
              {FM(plan.ctaKey)}
            </button>
            <ul className="mt-8 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature.labelKey} className="flex items-center gap-3">
                  {feature.included ? <CheckIcon /> : <CrossIcon />}
                  <span
                    className={`text-sm ${
                      feature.included ? 'text-text-primary' : 'text-text-muted'
                    }`}
                  >
                    {FM(feature.labelKey)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
});

PricingCards.displayName = 'PricingCards';

export default PricingCards;
