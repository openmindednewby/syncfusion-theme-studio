/**
 * StatesSection - Demonstrates disabled and readonly Syncfusion CheckBox states.
 */
import { memo } from 'react';

import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';

export const StatesSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.checkboxShowcase.sections.states')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.checkboxShowcase.sections.statesDesc')}
      </p>
    </div>
    <div className="flex flex-col gap-3">
      <CheckBoxComponent
        disabled
        label={FM('components.checkboxShowcase.labels.disabledUnchecked')}
      />
      <CheckBoxComponent
        checked
        disabled
        label={FM('components.checkboxShowcase.labels.disabledChecked')}
      />
    </div>
    <CopyableCodeSnippet code='<CheckBoxComponent disabled checked label="Disabled checked" />' />
  </section>
));

StatesSection.displayName = 'StatesSection';
