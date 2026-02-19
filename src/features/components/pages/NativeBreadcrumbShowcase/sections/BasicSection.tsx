/**
 * BasicSection demonstrates simple breadcrumb trails with different depths
 * (2, 3, and 5 items) using the default slash separator.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { BreadcrumbNative } from '@/components/ui/native';
import type { BreadcrumbItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const TWO_ITEM_TRAIL: BreadcrumbItem[] = [
  { text: FM('components.nativeBreadcrumb.home'), url: '/' },
  { text: FM('components.breadcrumbShowcase.dashboard') },
];

const THREE_ITEM_TRAIL: BreadcrumbItem[] = [
  { text: FM('components.nativeBreadcrumb.home'), url: '/' },
  { text: FM('components.nativeBreadcrumb.products'), url: '/products' },
  { text: FM('components.breadcrumbShowcase.detail') },
];

const FIVE_ITEM_TRAIL: BreadcrumbItem[] = [
  { text: FM('components.nativeBreadcrumb.home'), url: '/' },
  { text: FM('components.breadcrumbShowcase.docs'), url: '/docs' },
  { text: FM('components.breadcrumbShowcase.apiReference'), url: '/docs/api' },
  { text: FM('components.breadcrumbShowcase.endpoints'), url: '/docs/api/endpoints' },
  { text: FM('components.breadcrumbShowcase.getUsers') },
];

export const BasicSection = memo((): JSX.Element => (
  <section className="card space-y-4" data-testid={TestIds.NATIVE_BREADCRUMB_BASIC}>
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.breadcrumbShowcase.sections.basic')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.breadcrumbShowcase.sections.basicDesc')}
      </p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium text-text-secondary">
          {FM('components.breadcrumbShowcase.twoItems')}
        </h4>
        <BreadcrumbNative
          ariaLabel={FM('components.breadcrumbShowcase.ariaLabel')}
          items={TWO_ITEM_TRAIL}
          testId="breadcrumb-basic-two"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-text-secondary">
          {FM('components.breadcrumbShowcase.threeItems')}
        </h4>
        <BreadcrumbNative
          ariaLabel={FM('components.breadcrumbShowcase.ariaLabel')}
          items={THREE_ITEM_TRAIL}
          testId="breadcrumb-basic-three"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-text-secondary">
          {FM('components.breadcrumbShowcase.fiveItems')}
        </h4>
        <BreadcrumbNative
          ariaLabel={FM('components.breadcrumbShowcase.ariaLabel')}
          items={FIVE_ITEM_TRAIL}
          testId="breadcrumb-basic-five"
        />
      </div>
    </div>
    <CopyableCodeSnippet code='<BreadcrumbNative ariaLabel="Breadcrumb" items={items} />' />
  </section>
));

BasicSection.displayName = 'BasicSection';
