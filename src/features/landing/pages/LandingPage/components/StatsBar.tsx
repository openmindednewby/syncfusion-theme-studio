/** Stats bar showing key numbers (users, uptime, integrations, support). */
import { memo } from 'react';

import { LANDING_STATS } from '@/features/landing/data/landingData';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const StatsBar = memo((): JSX.Element => (
  <section
    className="border-y border-border bg-surface px-4 py-12 sm:px-6 lg:px-8"
    data-testid={TestIds.LANDING_STATS}
  >
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
      {LANDING_STATS.map((stat) => (
        <div key={stat.labelKey} className="text-center">
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 sm:text-4xl">
            {FM(stat.valueKey)}
          </p>
          <p className="mt-1 text-sm font-medium text-text-secondary">
            {FM(stat.labelKey)}
          </p>
        </div>
      ))}
    </div>
  </section>
));

StatsBar.displayName = 'StatsBar';

export default StatsBar;
