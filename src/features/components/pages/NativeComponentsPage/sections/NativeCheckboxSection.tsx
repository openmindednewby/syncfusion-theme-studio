import { memo, useState, useCallback } from 'react';

import { CheckboxNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const NativeCheckboxSection = memo((): JSX.Element => {
  const [checkboxChecked, setCheckboxChecked] = useState(true);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxChecked(e.target.checked);
  }, []);

  return (
    <section className="card">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('components.sections.nativeCheckboxes')}
      </h3>
      <div className="flex flex-col gap-3">
        <CheckboxNative
          checked={checkboxChecked}
          label="Checked"
          testId="native-checkbox-checked"
          onChange={handleCheckboxChange}
        />
        <CheckboxNative label="Unchecked" testId="native-checkbox-unchecked" />
        <CheckboxNative disabled label="Disabled" testId="native-checkbox-disabled" />
        <CheckboxNative
          checked
          indeterminate
          readOnly
          label="Indeterminate"
          testId="native-checkbox-indeterminate"
        />
      </div>
    </section>
  );
});

NativeCheckboxSection.displayName = 'NativeCheckboxSection';
