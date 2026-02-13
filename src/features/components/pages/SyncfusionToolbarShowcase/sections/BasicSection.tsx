/**
 * BasicSection demonstrates a basic Syncfusion ToolbarComponent with
 * text-formatting buttons and alignment actions separated by dividers.
 */
import { memo } from 'react';

import {
  ToolbarComponent,
  ItemsDirective,
  ItemDirective,
} from '@syncfusion/ej2-react-navigations';

import { FM } from '@/localization/helpers';

export const BasicSection = memo((): JSX.Element => {
  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.toolbarShowcase.sections.basic')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.toolbarShowcase.sections.basicDesc')}
        </p>
      </div>
      <ToolbarComponent>
        <ItemsDirective>
          <ItemDirective prefixIcon="e-icons e-bold" text={FM('components.nativeToolbar.bold')} tooltipText={FM('components.nativeToolbar.bold')} />
          <ItemDirective prefixIcon="e-icons e-italic" text={FM('components.nativeToolbar.italic')} tooltipText={FM('components.nativeToolbar.italic')} />
          <ItemDirective prefixIcon="e-icons e-underline" text={FM('components.nativeToolbar.underline')} tooltipText={FM('components.nativeToolbar.underline')} />
          <ItemDirective type="Separator" />
          <ItemDirective prefixIcon="e-icons e-align-left" text={FM('components.toolbarShowcase.items.alignLeft')} tooltipText={FM('components.toolbarShowcase.items.alignLeft')} />
          <ItemDirective prefixIcon="e-icons e-align-center" text={FM('components.toolbarShowcase.items.alignCenter')} tooltipText={FM('components.toolbarShowcase.items.alignCenter')} />
          <ItemDirective prefixIcon="e-icons e-align-right" text={FM('components.toolbarShowcase.items.alignRight')} tooltipText={FM('components.toolbarShowcase.items.alignRight')} />
        </ItemsDirective>
      </ToolbarComponent>
    </section>
  );
});

BasicSection.displayName = 'BasicSection';
