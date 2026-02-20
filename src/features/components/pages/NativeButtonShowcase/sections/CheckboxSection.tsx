/**
 * CheckboxSection - Demonstrates CheckboxNative with themed CSS variables.
 */
import { memo, useState } from 'react';

import { CheckboxNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

export const CheckboxSection = memo((): JSX.Element => {
  const [checked, setChecked] = useState(false);

  return (
    <section className="card space-y-4" data-testid={TestIds.NATIVE_CHECKBOX_SECTION}>
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.buttonShowcase.sections.checkbox')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.buttonShowcase.sections.checkboxDesc')}
        </p>
      </div>
      <div className="flex flex-wrap gap-6">
        <CheckboxNative
          checked={checked}
          label={FM('components.buttonShowcase.checkboxDefault')}
          testId="checkbox-showcase-default"
          onChange={() => setChecked(!checked)}
        />
        <CheckboxNative
          checked
          readOnly
          label={FM('components.buttonShowcase.checkboxChecked')}
          testId="checkbox-showcase-checked"
        />
        <CheckboxNative
          indeterminate
          readOnly
          label={FM('components.buttonShowcase.checkboxIndeterminate')}
          testId="checkbox-showcase-indeterminate"
        />
        <CheckboxNative
          disabled
          label={FM('components.buttonShowcase.checkboxDisabled')}
          testId="checkbox-showcase-disabled"
        />
        <CheckboxNative
          checked
          disabled
          label={FM('components.buttonShowcase.checkboxCheckedDisabled')}
          testId="checkbox-showcase-checked-disabled"
        />
        <CheckboxNative
          error={FM('components.buttonShowcase.checkboxError')}
          label={FM('components.buttonShowcase.checkboxWithError')}
          testId="checkbox-showcase-error"
        />
      </div>
    </section>
  );
});

CheckboxSection.displayName = 'CheckboxSection';
