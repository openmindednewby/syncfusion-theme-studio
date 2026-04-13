/** Bottom CTA section with sign-up prompt. */
import { memo } from 'react';

import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@/app/routePaths';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const CtaSection = memo((): JSX.Element => {
  const navigate = useNavigate();

  const handleSignUp = (): void => {
    Promise.resolve(navigate(RoutePath.Login)).catch(() => undefined);
  };

  return (
    <section
      className="px-4 py-20 sm:px-6 lg:px-8"
      data-testid={TestIds.LANDING_CTA}
    >
      <div className="mx-auto max-w-4xl rounded-2xl bg-primary-600 px-8 py-16 text-center shadow-xl dark:bg-primary-700 sm:px-16">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          {FM('landing.cta.title')}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
          {FM('landing.cta.subtitle')}
        </p>
        <button
          aria-label={FM('landing.cta.button')}
          className="mt-8 rounded-lg bg-white px-8 py-3 text-base font-semibold text-primary-700 shadow-md transition-all hover:bg-primary-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
          data-testid={TestIds.LANDING_CTA_BUTTON}
          type="button"
          onClick={handleSignUp}
        >
          {FM('landing.cta.button')}
        </button>
      </div>
    </section>
  );
});

CtaSection.displayName = 'CtaSection';

export default CtaSection;
