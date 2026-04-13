import { memo } from 'react';

import { HomeIcon } from '@/components/icons';
import { BreadcrumbNative } from '@/components/ui/native';
import type { BreadcrumbItem } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

const buildBreadcrumbItems = (): BreadcrumbItem[] => [
  {
    text: FM('components.nativeBreadcrumb.home'),
    url: '/',
    icon: <HomeIcon />,
  },
  {
    text: FM('components.nativeBreadcrumb.products'),
    url: '/products',
  },
  {
    text: FM('components.nativeBreadcrumb.components'),
    url: '/components',
  },
  {
    text: FM('components.nativeBreadcrumb.navigation'),
  },
];

const buildChevronBreadcrumbItems = (): BreadcrumbItem[] => [
  {
    text: FM('components.nativeBreadcrumb.home'),
    url: '/',
    icon: <HomeIcon />,
  },
  {
    text: FM('components.nativeBreadcrumb.settings'),
    url: '/settings',
  },
  {
    text: FM('components.nativeBreadcrumb.profile'),
  },
];

export const NativeBreadcrumbSection = memo((): JSX.Element => (
  <section className="card">
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('components.sections.nativeBreadcrumb')}
    </h3>
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium text-text-secondary">
          {FM('components.nativeBreadcrumb.slashSeparator')}
        </h4>
        <BreadcrumbNative items={buildBreadcrumbItems()} separator="/" testId="native-breadcrumb-slash" />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-text-secondary">
          {FM('components.nativeBreadcrumb.chevronSeparator')}
        </h4>
        <BreadcrumbNative
          items={buildChevronBreadcrumbItems()}
          testId="native-breadcrumb-chevron"
        />
      </div>
    </div>
  </section>
));

NativeBreadcrumbSection.displayName = 'NativeBreadcrumbSection';
