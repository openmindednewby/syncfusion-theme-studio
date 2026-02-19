/**
 * BasicSection - Demonstrates Syncfusion CheckBoxComponent in checked,
 * unchecked, and indeterminate states.
 */
import { memo } from 'react';

import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';

export const BasicSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.checkboxShowcase.sections.basic')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.checkboxShowcase.sections.basicDesc')}
      </p>
    </div>
    <div className="flex flex-col gap-3">
      <CheckBoxComponent
        checked
        label={FM('components.checkboxShowcase.labels.checked')}
      />
      <CheckBoxComponent
        label={FM('components.checkboxShowcase.labels.unchecked')}
      />
      <CheckBoxComponent
        checked
        indeterminate
        label={FM('components.checkboxShowcase.labels.indeterminate')}
      />
    </div>
    <CopyableCodeSnippet code='<CheckBoxComponent checked label="Option" />' />
  </section>
));

BasicSection.displayName = 'BasicSection';
