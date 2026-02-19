/**
 * BasicSection demonstrates a simple Syncfusion BreadcrumbComponent
 * with a Home > Products > Electronics > Phones trail.
 */
import { memo } from 'react';

import {
  BreadcrumbComponent,
  BreadcrumbItemDirective,
  BreadcrumbItemsDirective,
} from '@syncfusion/ej2-react-navigations';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';

export const BasicSection = memo((): JSX.Element => (
  <section className="card space-y-4" data-testid="sf-breadcrumb-basic">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.breadcrumbShowcase.sections.basic')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.breadcrumbShowcase.sections.basicDesc')}
      </p>
    </div>
    <div className="space-y-4">
      <BreadcrumbComponent enableNavigation={false}>
        <BreadcrumbItemsDirective>
          <BreadcrumbItemDirective text={FM('components.nativeBreadcrumb.home')} url="/" />
          <BreadcrumbItemDirective text={FM('components.nativeBreadcrumb.products')} url="/products" />
          <BreadcrumbItemDirective text={FM('components.breadcrumbShowcase.electronics')} url="/electronics" />
          <BreadcrumbItemDirective text={FM('components.breadcrumbShowcase.phones')} />
        </BreadcrumbItemsDirective>
      </BreadcrumbComponent>
    </div>
    <CopyableCodeSnippet code='<BreadcrumbComponent><BreadcrumbItemsDirective><BreadcrumbItemDirective text="Home" url="/" /><BreadcrumbItemDirective text="Page" /></BreadcrumbItemsDirective></BreadcrumbComponent>' />
  </section>
));

BasicSection.displayName = 'BasicSection';
