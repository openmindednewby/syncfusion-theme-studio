/**
 * WithLabelSection - Demonstrates Syncfusion CheckBox label positioning
 * options (Before and After).
 */
import { memo } from 'react';

import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/utils/helpers';

/** Syncfusion CheckBoxComponent labelPosition string values */
const LABEL_POSITION_BEFORE = 'Before';
const LABEL_POSITION_AFTER = 'After';

export const WithLabelSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.checkboxShowcase.sections.withLabel')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.checkboxShowcase.sections.withLabelDesc')}
      </p>
    </div>
    <div className="flex flex-col gap-3">
      <CheckBoxComponent
        checked
        label={FM('components.checkboxShowcase.labels.withLabel')}
        labelPosition={LABEL_POSITION_AFTER}
      />
      <CheckBoxComponent
        checked
        label={FM('components.checkboxShowcase.labels.withHelper')}
        labelPosition={LABEL_POSITION_BEFORE}
      />
    </div>
    <CopyableCodeSnippet code='<CheckBoxComponent checked label="Label" labelPosition="Before" />' />
  </section>
));

WithLabelSection.displayName = 'WithLabelSection';
