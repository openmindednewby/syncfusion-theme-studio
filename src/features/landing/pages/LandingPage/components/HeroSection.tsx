/** Hero section with headline, description, and CTA buttons. */
import { memo } from 'react';

import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@/app/routePaths';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const HeroSection = memo((): JSX.Element => {
  const navigate = useNavigate();

  const handleGetStarted = (): void => {
    Promise.resolve(navigate(RoutePath.Login)).catch(() => undefined);
  };

  const handleViewDemo = (): void => {
    Promise.resolve(navigate(RoutePath.Login)).catch(() => undefined);
  };

  return (
    <section
      className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-32 lg:px-8"
      data-testid={TestIds.LANDING_HERO}
    >
      {/* Background gradient orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-primary-400/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="mb-4 inline-block rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
          {FM('landing.hero.badge')}
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          {FM('landing.hero.title')}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
          {FM('landing.hero.subtitle')}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            aria-label={FM('landing.hero.getStarted')}
            className="rounded-lg border-2 border-transparent bg-primary-600 px-8 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-primary-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background"
            data-testid={TestIds.LANDING_GET_STARTED}
            type="button"
            onClick={handleGetStarted}
          >
            {FM('landing.hero.getStarted')}
          </button>
          <button
            aria-label={FM('landing.hero.viewDemo')}
            className="rounded-lg border-2 border-border bg-surface px-8 py-3 text-base font-semibold text-text-primary transition-all hover:bg-surface-elevated hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background"
            data-testid={TestIds.LANDING_VIEW_DEMO}
            type="button"
            onClick={handleViewDemo}
          >
            {FM('landing.hero.viewDemo')}
          </button>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
