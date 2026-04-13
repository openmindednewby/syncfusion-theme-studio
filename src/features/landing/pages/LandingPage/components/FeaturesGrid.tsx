/** Feature grid with 8 feature cards and SVG icons. */
import { memo } from 'react';

import { LANDING_FEATURES, type LandingFeature } from '@/features/landing/data/landingData';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const ICON_PATHS: Record<LandingFeature['icon'], string> = {
  dashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4',
  analytics: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m6 0h6m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v10m6-6v6m0 0h-3m3 0V9',
  team: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  realtime: 'M13 10V3L4 14h7v7l9-11h-7z',
  security: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  integrations: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
  customize: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
  responsive: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
};

const FeatureIcon = memo(({ icon }: { icon: LandingFeature['icon'] }): JSX.Element => (
  <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d={ICON_PATHS[icon]} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
));

FeatureIcon.displayName = 'FeatureIcon';

const FeatureCard = memo(({ feature }: { feature: LandingFeature }): JSX.Element => (
  <div className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary-300 hover:shadow-lg dark:hover:border-primary-700">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-900/40 dark:text-primary-400 dark:group-hover:bg-primary-600">
      <FeatureIcon icon={feature.icon} />
    </div>
    <h3 className="mb-2 text-lg font-semibold text-text-primary">
      {FM(feature.titleKey)}
    </h3>
    <p className="text-sm leading-relaxed text-text-secondary">
      {FM(feature.descriptionKey)}
    </p>
  </div>
));

FeatureCard.displayName = 'FeatureCard';

const FeaturesGrid = memo((): JSX.Element => (
  <section
    className="px-4 py-20 sm:px-6 lg:px-8"
    data-testid={TestIds.LANDING_FEATURES}
  >
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
          {FM('landing.features.title')}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
          {FM('landing.features.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {LANDING_FEATURES.map((feature) => (
          <FeatureCard key={feature.titleKey} feature={feature} />
        ))}
      </div>
    </div>
  </section>
));

FeaturesGrid.displayName = 'FeaturesGrid';

export default FeaturesGrid;
