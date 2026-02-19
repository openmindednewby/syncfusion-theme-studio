/**
 * CustomSection demonstrates Syncfusion BreadcrumbComponent with
 * custom separators and icon breadcrumbs using iconCss.
 */
import { memo } from 'react';

import {
  BreadcrumbComponent,
  BreadcrumbItemDirective,
  BreadcrumbItemsDirective,
} from '@syncfusion/ej2-react-navigations';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';

const dotSeparator = (): JSX.Element => <span className="mx-1 text-text-secondary">.</span>;

export const CustomSection = memo((): JSX.Element => (
  <section className="card space-y-4" data-testid="sf-breadcrumb-custom">
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
        <BreadcrumbComponent enableNavigation={false} separatorTemplate="&gt;">
          <BreadcrumbItemsDirective>
            <BreadcrumbItemDirective text={FM('components.nativeBreadcrumb.home')} url="/" />
            <BreadcrumbItemDirective text={FM('components.nativeBreadcrumb.settings')} url="/settings" />
            <BreadcrumbItemDirective text={FM('components.nativeBreadcrumb.profile')} />
          </BreadcrumbItemsDirective>
        </BreadcrumbComponent>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-text-secondary">
          {FM('components.breadcrumbShowcase.dotSeparator')}
        </h4>
        <BreadcrumbComponent enableNavigation={false} separatorTemplate={dotSeparator}>
          <BreadcrumbItemsDirective>
            <BreadcrumbItemDirective text={FM('components.breadcrumbShowcase.dashboard')} url="/dashboard" />
            <BreadcrumbItemDirective text={FM('components.breadcrumbShowcase.analytics')} url="/analytics" />
            <BreadcrumbItemDirective text={FM('components.breadcrumbShowcase.reports')} />
          </BreadcrumbItemsDirective>
        </BreadcrumbComponent>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-text-secondary">
          {FM('components.breadcrumbShowcase.homeIcon')}
        </h4>
        <BreadcrumbComponent enableNavigation={false}>
          <BreadcrumbItemsDirective>
            <BreadcrumbItemDirective iconCss="e-icons e-home" text={FM('components.nativeBreadcrumb.home')} url="/" />
            <BreadcrumbItemDirective text={FM('components.nativeBreadcrumb.products')} url="/products" />
            <BreadcrumbItemDirective text={FM('components.breadcrumbShowcase.electronics')} />
          </BreadcrumbItemsDirective>
        </BreadcrumbComponent>
      </div>
    </div>
    <CopyableCodeSnippet code='<BreadcrumbComponent separatorTemplate=">" enableNavigation={false}>...</BreadcrumbComponent>' />
  </section>
));

CustomSection.displayName = 'CustomSection';
