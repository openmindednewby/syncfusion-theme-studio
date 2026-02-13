/**
 * CustomSection demonstrates breadcrumbs with different separator characters
 * (chevron, arrow, pipe) and breadcrumbs with leading icons.
 */
import { memo } from 'react';

import { BreadcrumbNative } from '@/components/ui/native';
import type { BreadcrumbItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const CHEVRON_SEPARATOR = '\u203A';
const ARROW_SEPARATOR = '\u2192';
const PIPE_SEPARATOR = '|';

const HomeIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FolderIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChartIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const buildChevronItems = (): BreadcrumbItem[] => [
  { text: FM('components.nativeBreadcrumb.home'), url: '/' },
  { text: FM('components.nativeBreadcrumb.settings'), url: '/settings' },
  { text: FM('components.nativeBreadcrumb.profile') },
];

const buildArrowItems = (): BreadcrumbItem[] => [
  { text: FM('components.nativeBreadcrumb.home'), url: '/' },
  { text: FM('components.nativeBreadcrumb.products'), url: '/products' },
  { text: FM('components.nativeBreadcrumb.components') },
];

const buildPipeItems = (): BreadcrumbItem[] => [
  { text: FM('components.breadcrumbShowcase.dashboard'), url: '/dashboard' },
  { text: FM('components.breadcrumbShowcase.analytics'), url: '/analytics' },
  { text: FM('components.breadcrumbShowcase.reports') },
];

const buildIconItems = (): BreadcrumbItem[] => [
  { text: FM('components.nativeBreadcrumb.home'), url: '/', icon: <HomeIcon /> },
  { text: FM('components.nativeBreadcrumb.products'), url: '/products', icon: <FolderIcon /> },
  { text: FM('components.breadcrumbShowcase.analytics'), icon: <ChartIcon /> },
];

export const CustomSection = memo((): JSX.Element => (
  <section className="card space-y-4" data-testid={TestIds.NATIVE_BREADCRUMB_CUSTOM}>
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.breadcrumbShowcase.sections.custom')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.breadcrumbShowcase.sections.customDesc')}
      </p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium text-text-secondary">
          {FM('components.breadcrumbShowcase.chevronSeparator')}
        </h4>
        <BreadcrumbNative
          ariaLabel={FM('components.breadcrumbShowcase.ariaLabel')}
          items={buildChevronItems()}
          separator={CHEVRON_SEPARATOR}
          testId="breadcrumb-custom-chevron"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-text-secondary">
          {FM('components.breadcrumbShowcase.arrowSeparator')}
        </h4>
        <BreadcrumbNative
          ariaLabel={FM('components.breadcrumbShowcase.ariaLabel')}
          items={buildArrowItems()}
          separator={ARROW_SEPARATOR}
          testId="breadcrumb-custom-arrow"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-text-secondary">
          {FM('components.breadcrumbShowcase.pipeSeparator')}
        </h4>
        <BreadcrumbNative
          ariaLabel={FM('components.breadcrumbShowcase.ariaLabel')}
          items={buildPipeItems()}
          separator={PIPE_SEPARATOR}
          testId="breadcrumb-custom-pipe"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-text-secondary">
          {FM('components.breadcrumbShowcase.withIcons')}
        </h4>
        <BreadcrumbNative
          ariaLabel={FM('components.breadcrumbShowcase.ariaLabel')}
          items={buildIconItems()}
          testId="breadcrumb-custom-icons"
        />
      </div>
    </div>
  </section>
));

CustomSection.displayName = 'CustomSection';
