/** Feature comparison table across all pricing tiers. */
import { memo } from 'react';

import { COMPARISON_FEATURES } from '@/features/pricing/data/pricingData';
import { FM } from '@/localization/utils/helpers';

const FeatureComparison = memo((): JSX.Element => (
  <div className="mx-auto max-w-4xl" data-testid="pricing-comparison">
    <h2 className="mb-8 text-center text-2xl font-bold text-text-primary">
      {FM('pricing.comparison.title')}
    </h2>
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-elevated">
            <th className="px-6 py-4 text-left font-semibold text-text-primary">
              {FM('pricing.comparison.feature')}
            </th>
            <th className="px-6 py-4 text-center font-semibold text-text-primary">
              {FM('pricing.plans.free.name')}
            </th>
            <th className="px-6 py-4 text-center font-semibold text-primary-600">
              {FM('pricing.plans.pro.name')}
            </th>
            <th className="px-6 py-4 text-center font-semibold text-text-primary">
              {FM('pricing.plans.enterprise.name')}
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_FEATURES.map((feature, index) => (
            <tr
              key={feature.labelKey}
              className={`border-b border-border ${
                index % 2 === 0 ? 'bg-surface' : 'bg-background'
              }`}
            >
              <td className="px-6 py-4 font-medium text-text-primary">
                {FM(feature.labelKey)}
              </td>
              <td className="px-6 py-4 text-center text-text-secondary">
                {FM(feature.free)}
              </td>
              <td className="px-6 py-4 text-center text-text-secondary">
                {FM(feature.pro)}
              </td>
              <td className="px-6 py-4 text-center text-text-secondary">
                {FM(feature.enterprise)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
));

FeatureComparison.displayName = 'FeatureComparison';

export default FeatureComparison;
