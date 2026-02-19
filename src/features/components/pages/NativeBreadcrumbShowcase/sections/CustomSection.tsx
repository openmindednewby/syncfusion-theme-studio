/**
 * CustomSection demonstrates breadcrumbs with different separator characters
 * (chevron, arrow, pipe) and breadcrumbs with leading icons.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { HomeIcon, FolderDemoIcon, ChartIcon } from '@/components/icons';
import { BreadcrumbNative } from '@/components/ui/native';
import type { BreadcrumbItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const CHEVRON_SEPARATOR = '\u203A';
const ARROW_SEPARATOR = '\u2192';
const PIPE_SEPARATOR = '|';

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
  { text: FM('components.nativeBreadcrumb.products'), url: '/products', icon: <FolderDemoIcon /> },
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
    <CopyableCodeSnippet code='<BreadcrumbNative ariaLabel="Breadcrumb" items={items} separator="›" />' />
  </section>
));

CustomSection.displayName = 'CustomSection';
