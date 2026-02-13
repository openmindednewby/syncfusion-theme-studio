/**
 * VariantsSection demonstrates different Syncfusion Toolbar overflow modes:
 * Scrollable and Popup.
 */
import { memo } from 'react';

import {
  ToolbarComponent,
  ItemsDirective,
  ItemDirective,
} from '@syncfusion/ej2-react-navigations';

import { FM } from '@/localization/helpers';

export const VariantsSection = memo((): JSX.Element => {
  return (
    <section className="card space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.toolbarShowcase.sections.overflowModes')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.toolbarShowcase.sections.overflowModesDesc')}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="mb-2 text-sm font-medium text-text-secondary">
            {FM('components.toolbarShowcase.sections.scrollable')}
          </h4>
          <ToolbarComponent overflowMode="Scrollable" width="300px">
            <ItemsDirective>
              <ItemDirective prefixIcon="e-icons e-cut" text={FM('components.nativeToolbar.cut')} tooltipText={FM('components.nativeToolbar.cut')} />
              <ItemDirective prefixIcon="e-icons e-copy" text={FM('components.nativeToolbar.copy')} tooltipText={FM('components.nativeToolbar.copy')} />
              <ItemDirective prefixIcon="e-icons e-paste" text={FM('components.nativeToolbar.paste')} tooltipText={FM('components.nativeToolbar.paste')} />
              <ItemDirective type="Separator" />
              <ItemDirective prefixIcon="e-icons e-bold" text={FM('components.nativeToolbar.bold')} tooltipText={FM('components.nativeToolbar.bold')} />
              <ItemDirective prefixIcon="e-icons e-italic" text={FM('components.nativeToolbar.italic')} tooltipText={FM('components.nativeToolbar.italic')} />
              <ItemDirective prefixIcon="e-icons e-underline" text={FM('components.nativeToolbar.underline')} tooltipText={FM('components.nativeToolbar.underline')} />
            </ItemsDirective>
          </ToolbarComponent>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-medium text-text-secondary">
            {FM('components.toolbarShowcase.sections.popup')}
          </h4>
          <ToolbarComponent overflowMode="Popup" width="300px">
            <ItemsDirective>
              <ItemDirective prefixIcon="e-icons e-cut" text={FM('components.nativeToolbar.cut')} tooltipText={FM('components.nativeToolbar.cut')} />
              <ItemDirective prefixIcon="e-icons e-copy" text={FM('components.nativeToolbar.copy')} tooltipText={FM('components.nativeToolbar.copy')} />
              <ItemDirective prefixIcon="e-icons e-paste" text={FM('components.nativeToolbar.paste')} tooltipText={FM('components.nativeToolbar.paste')} />
              <ItemDirective type="Separator" />
              <ItemDirective prefixIcon="e-icons e-bold" text={FM('components.nativeToolbar.bold')} tooltipText={FM('components.nativeToolbar.bold')} />
              <ItemDirective prefixIcon="e-icons e-italic" text={FM('components.nativeToolbar.italic')} tooltipText={FM('components.nativeToolbar.italic')} />
              <ItemDirective prefixIcon="e-icons e-underline" text={FM('components.nativeToolbar.underline')} tooltipText={FM('components.nativeToolbar.underline')} />
            </ItemsDirective>
          </ToolbarComponent>
        </div>
      </div>
    </section>
  );
});

VariantsSection.displayName = 'VariantsSection';
