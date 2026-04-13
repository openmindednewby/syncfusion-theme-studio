/** Public pricing page with tier cards, comparison table, and FAQ. */
import { memo } from 'react';

import { Link } from 'react-router-dom';

import { RoutePath } from '@/app/routePaths';
import { FM } from '@/localization/utils/helpers';

import FeatureComparison from './components/FeatureComparison';
import PricingCards from './components/PricingCards';
import PricingFaq from './components/PricingFaq';
import PricingToggle from './components/PricingToggle';
import { usePricingToggle } from './hooks/usePricingToggle';

const PricingPage = memo((): JSX.Element => {
  const { isYearly, toggleBillingCycle, getPrice } = usePricingToggle();

  return (
    <div className="min-h-screen max-w-[100vw] overflow-hidden bg-background" data-testid="pricing-page">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back to home link */}
        <div className="mb-8">
          <Link
            className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
            data-testid="pricing-back-to-home"
            to={RoutePath.Root}
          >
            {FM('pricing.backToHome')}
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            {FM('pricing.hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            {FM('pricing.hero.subtitle')}
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mb-12">
          <PricingToggle isYearly={isYearly} onToggle={toggleBillingCycle} />
        </div>

        {/* Pricing Cards */}
        <div className="mb-24">
          <PricingCards getPrice={getPrice} isYearly={isYearly} />
        </div>

        {/* Feature Comparison */}
        <div className="mb-24">
          <FeatureComparison />
        </div>

        {/* FAQ */}
        <PricingFaq />
      </div>
    </div>
  );
});

PricingPage.displayName = 'PricingPage';

export default PricingPage;
