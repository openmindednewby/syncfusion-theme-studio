import { Link } from 'react-router-dom';

import { RoutePath } from '@/app/routePaths';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

interface NotImplementedPageProps {
  contextKey?: string;
}

const BlueprintIllustration = (): JSX.Element => (
  <svg
    aria-hidden
    className="h-32 w-32 text-primary-500/40"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={0.8}
    viewBox="0 0 100 100"
  >
    <rect height="60" rx="4" width="70" x="15" y="20" />
    <line x1="25" x2="75" y1="35" y2="35" />
    <line x1="25" x2="55" y1="45" y2="45" />
    <line x1="25" x2="65" y1="55" y2="55" />
    <line x1="25" x2="45" y1="65" y2="65" />
    <circle className="animate-pulse" cx="70" cy="60" r="6" />
    <path d="M67 60 L70 63 L74 57" />
  </svg>
);

const PulsingDot = (): JSX.Element => (
  <span className="relative ml-2 inline-flex h-2.5 w-2.5">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-500" />
  </span>
);

const NotImplementedPage = ({
  contextKey,
}: NotImplementedPageProps): JSX.Element => {
  const hasContext = isValueDefined(contextKey) && contextKey !== '';
  const description = hasContext
    ? FM(`dashboard.comingSoonContext.${contextKey}`)
    : FM('dashboard.notImplementedDesc');

  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center gap-6 overflow-hidden" data-testid={TestIds.NOT_IMPLEMENTED_PAGE}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-primary-700/5" />
      <BlueprintIllustration />
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-text-primary">
          {FM('dashboard.comingSoon')}
        </h1>
        <PulsingDot />
      </div>
      <p className="max-w-md text-center text-sm text-text-secondary">
        {description}
      </p>
      <Link
        className="rounded-md bg-primary-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        data-testid={TestIds.NOT_IMPLEMENTED_DASHBOARD_LINK}
        to={RoutePath.Dashboard}
      >
        {FM('dashboard.goToDashboard')}
      </Link>
    </div>
  );
};

export default NotImplementedPage;
