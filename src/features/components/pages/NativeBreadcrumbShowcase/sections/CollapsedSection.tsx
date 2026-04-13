/**
 * CollapsedSection demonstrates breadcrumbs with the maxItems prop,
 * which collapses middle items into an ellipsis.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { HomeIcon } from '@/components/icons';
import { BreadcrumbNative } from '@/components/ui/native';
import type { BreadcrumbItem } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

function buildLongTrail(): BreadcrumbItem[] {
  return [
    { text: FM('components.nativeBreadcrumb.home'), url: '/', icon: <HomeIcon /> },
    { text: FM('components.breadcrumbShowcase.dashboard'), url: '/dashboard' },
    { text: FM('components.breadcrumbShowcase.analytics'), url: '/analytics' },
    { text: FM('components.breadcrumbShowcase.reports'), url: '/reports' },
    { text: FM('components.breadcrumbShowcase.endpoints'), url: '/endpoints' },
    { text: FM('components.breadcrumbShowcase.monthly') },
  ];
}

const MAX_THREE = 3;
const MAX_FOUR = 4;

export const CollapsedSection = memo((): JSX.Element => (
  <section className="card space-y-4" data-testid={TestIds.NATIVE_BREADCRUMB_COLLAPSED}>
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.breadcrumbShowcase.sections.collapsed')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.breadcrumbShowcase.sections.collapsedDesc')}
      </p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium text-text-secondary">
          {FM('components.breadcrumbShowcase.maxThreeItems')}
        </h4>
        <BreadcrumbNative
          ariaLabel={FM('components.breadcrumbShowcase.ariaLabel')}
          items={buildLongTrail()}
          maxItems={MAX_THREE}
          testId="breadcrumb-collapsed-three"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-text-secondary">
          {FM('components.breadcrumbShowcase.maxFourItems')}
        </h4>
        <BreadcrumbNative
          ariaLabel={FM('components.breadcrumbShowcase.ariaLabel')}
          items={buildLongTrail()}
          maxItems={MAX_FOUR}
          testId="breadcrumb-collapsed-four"
        />
      </div>
    </div>
    <CopyableCodeSnippet code='<BreadcrumbNative items={items} maxItems={3} />' />
  </section>
));

CollapsedSection.displayName = 'CollapsedSection';
