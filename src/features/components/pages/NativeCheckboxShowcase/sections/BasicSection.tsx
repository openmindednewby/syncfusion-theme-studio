/**
 * BasicSection - Demonstrates standard checked and unchecked checkbox states.
 */
import { memo, useCallback, useState } from 'react';

import { CheckboxNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const BasicSection = memo((): JSX.Element => {
  const [isChecked, setIsChecked] = useState(true);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  }, []);

  return (
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
        <CheckboxNative
          checked={isChecked}
          label={FM('components.checkboxShowcase.labels.checked')}
          testId="native-cb-showcase-checked"
          onChange={handleChange}
        />
        <CheckboxNative
          label={FM('components.checkboxShowcase.labels.unchecked')}
          testId="native-cb-showcase-unchecked"
        />
      </div>
    </section>
  );
});

BasicSection.displayName = 'BasicSection';
