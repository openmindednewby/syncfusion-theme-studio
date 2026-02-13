/**
 * InteractiveSection demonstrates Syncfusion BreadcrumbComponent
 * with navigation tracking via itemClick event.
 */
import { memo, useCallback, useState } from 'react';

import type { BreadcrumbClickEventArgs } from '@syncfusion/ej2-react-navigations';
import {
  BreadcrumbComponent,
  BreadcrumbItemDirective,
  BreadcrumbItemsDirective,
} from '@syncfusion/ej2-react-navigations';

import { FM } from '@/localization/helpers';
import { isValueDefined } from '@/utils/is';

const InteractiveBreadcrumb = memo((): JSX.Element => {
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  const handleItemClick = useCallback((args: BreadcrumbClickEventArgs) => {
    args.cancel = true; // eslint-disable-line no-param-reassign -- Syncfusion event pattern: cancel prevents default navigation
    const label = args.item.text;
    if (isValueDefined(label)) setClickedItem(label);
  }, []);

  const statusText = isValueDefined(clickedItem)
    ? FM('components.breadcrumbShowcase.navigatedTo', clickedItem)
    : FM('components.breadcrumbShowcase.noneNavigated');

  return (
    <div className="space-y-4">
      <BreadcrumbComponent enableNavigation={false} itemClick={handleItemClick}>
        <BreadcrumbItemsDirective>
          <BreadcrumbItemDirective text={FM('components.nativeBreadcrumb.home')} url="/" />
          <BreadcrumbItemDirective text={FM('components.nativeBreadcrumb.products')} url="/products" />
          <BreadcrumbItemDirective text={FM('components.breadcrumbShowcase.electronics')} url="/electronics" />
          <BreadcrumbItemDirective text={FM('components.breadcrumbShowcase.phones')} />
        </BreadcrumbItemsDirective>
      </BreadcrumbComponent>
      <div
        className="rounded-md border border-border bg-surface-variant px-4 py-2.5 text-sm"
        data-testid="sf-breadcrumb-nav-status"
      >
        {statusText}
      </div>
    </div>
  );
});

InteractiveBreadcrumb.displayName = 'InteractiveBreadcrumb';

export const InteractiveSection = memo((): JSX.Element => (
  <section className="card space-y-4" data-testid="sf-breadcrumb-interactive">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.breadcrumbShowcase.sections.interactive')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.breadcrumbShowcase.sections.interactiveDesc')}
      </p>
    </div>
    <InteractiveBreadcrumb />
  </section>
));

InteractiveSection.displayName = 'InteractiveSection';
