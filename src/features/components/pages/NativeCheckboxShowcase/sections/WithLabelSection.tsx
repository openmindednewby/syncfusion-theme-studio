/**
 * WithLabelSection - Demonstrates checkboxes with labels, helper text,
 * descriptions, and required indicators.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { CheckboxNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

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
      {/* Simple label */}
      <CheckboxNative
        label={FM('components.checkboxShowcase.labels.withLabel')}
        testId="native-cb-showcase-label"
      />

      {/* Label with helper text */}
      <CheckboxNative
        helperText={FM('components.checkboxShowcase.labels.helperText')}
        label={FM('components.checkboxShowcase.labels.withHelper')}
        testId="native-cb-showcase-helper"
      />

      {/* Label with description */}
      <CheckboxNative
        helperText={FM('components.checkboxShowcase.labels.descriptionText')}
        label={FM('components.checkboxShowcase.labels.withDescription')}
        testId="native-cb-showcase-description"
      />

      {/* Required indicator */}
      <CheckboxNative
        required
        label={FM('components.checkboxShowcase.labels.withRequired')}
        testId="native-cb-showcase-required"
      />
    </div>
    <CopyableCodeSnippet code='<CheckboxNative helperText="Additional info" label="With helper" />' />
  </section>
));

WithLabelSection.displayName = 'WithLabelSection';
