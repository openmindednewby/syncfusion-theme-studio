/** Monthly/Yearly billing cycle toggle with discount badge. */
import { memo } from 'react';

import { YEARLY_DISCOUNT_PERCENT } from '@/features/pricing/constants';
import { FM } from '@/localization/utils/helpers';

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: () => void;
}

const PricingToggle = memo(({ isYearly, onToggle }: PricingToggleProps): JSX.Element => (
  <div className="flex items-center justify-center gap-4" data-testid="pricing-toggle">
    <span
      className={`text-sm font-medium ${isYearly ? 'text-text-muted' : 'text-text-primary'}`}
    >
      {FM('pricing.toggle.monthly')}
    </span>
    <button
      aria-checked={isYearly}
      aria-label={FM('pricing.toggle.ariaLabel')}
      className="relative inline-flex h-7 w-14 items-center rounded-full bg-primary-600 transition-colors"
      data-testid="pricing-toggle-button"
      role="switch"
      type="button"
      onClick={onToggle}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
          isYearly ? 'translate-x-8' : 'translate-x-1'
        }`}
      />
    </button>
    <span
      className={`text-sm font-medium ${isYearly ? 'text-text-primary' : 'text-text-muted'}`}
    >
      {FM('pricing.toggle.yearly')}
    </span>
    <span className="rounded-full bg-success-50 px-3 py-1 text-xs font-semibold text-success-700">
      {FM('pricing.toggle.save', String(YEARLY_DISCOUNT_PERCENT))}
    </span>
  </div>
));

PricingToggle.displayName = 'PricingToggle';

export default PricingToggle;
