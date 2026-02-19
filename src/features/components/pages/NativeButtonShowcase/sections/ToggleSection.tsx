/**
 * ToggleSection - Demonstrates ToggleNative with themed CSS variables.
 */
import { memo, useState, useCallback } from 'react';

import { ToggleNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

export const ToggleSection = memo((): JSX.Element => {
  const [toggleOn, setToggleOn] = useState(true);
  const [toggleOff, setToggleOff] = useState(false);

  const handleOnChange = useCallback((val: boolean) => setToggleOn(val), []);
  const handleOffChange = useCallback((val: boolean) => setToggleOff(val), []);

  return (
    <section className="card space-y-4" data-testid={TestIds.NATIVE_TOGGLE_SECTION}>
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.buttonShowcase.sections.toggle')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.buttonShowcase.sections.toggleDesc')}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <ToggleNative
            checked={toggleOn}
            label={FM('components.buttonShowcase.toggleOn')}
            testId="toggle-showcase-on"
            onChange={handleOnChange}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.buttonShowcase.toggleOn')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ToggleNative
            checked={toggleOff}
            label={FM('components.buttonShowcase.toggleOff')}
            testId="toggle-showcase-off"
            onChange={handleOffChange}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.buttonShowcase.toggleOff')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ToggleNative
            checked
            disabled
            label={FM('components.buttonShowcase.toggleDisabledOn')}
            testId="toggle-showcase-disabled-on"
            onChange={() => {}}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.buttonShowcase.toggleDisabledOn')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ToggleNative
            disabled
            checked={false}
            label={FM('components.buttonShowcase.toggleDisabledOff')}
            testId="toggle-showcase-disabled-off"
            onChange={() => {}}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.buttonShowcase.toggleDisabledOff')}
          </span>
        </div>
      </div>
    </section>
  );
});

ToggleSection.displayName = 'ToggleSection';
