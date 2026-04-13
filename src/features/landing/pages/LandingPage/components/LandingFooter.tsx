/** Landing page footer with links and copyright. */
import { memo } from 'react';

import { Link } from 'react-router-dom';

import { RoutePath } from '@/app/routePaths';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const CURRENT_YEAR = new Date().getFullYear();

const LandingFooter = memo((): JSX.Element => (
  <footer
    className="border-t border-border bg-surface px-4 py-12 sm:px-6 lg:px-8"
    data-testid={TestIds.LANDING_FOOTER}
  >
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Brand */}
        <div className="text-center sm:text-left">
          <p className="text-lg font-bold text-text-primary">
            {FM('app.title')}
          </p>
          <p className="mt-1 text-sm text-text-muted">
            {FM('app.description')}
          </p>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          <Link
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-sm text-text-secondary transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            data-testid={TestIds.LANDING_FOOTER_PRICING}
            to={RoutePath.Pricing}
          >
            {FM('landing.footer.pricing')}
          </Link>
          <Link
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-sm text-text-secondary transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            data-testid={TestIds.LANDING_FOOTER_LOGIN}
            to={RoutePath.Login}
          >
            {FM('landing.footer.login')}
          </Link>
        </nav>
      </div>

      <div className="mt-8 border-t border-border pt-6 text-center">
        <p className="text-xs text-text-muted">
          {FM('landing.footer.copyright', String(CURRENT_YEAR))}
        </p>
      </div>
    </div>
  </footer>
));

LandingFooter.displayName = 'LandingFooter';

export default LandingFooter;
