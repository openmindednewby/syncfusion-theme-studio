/**
 * BasicSection demonstrates the ToggleNative component
 * in its default on and off states.
 */
import { memo, useCallback, useState } from 'react';

import { ToggleNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

export const BasicSection = memo((): JSX.Element => {
  const [isOn, setIsOn] = useState(true);
  const [isOff, setIsOff] = useState(false);

  const handleOnChange = useCallback((checked: boolean) => {
    setIsOn(checked);
  }, []);

  const handleOffChange = useCallback((checked: boolean) => {
    setIsOff(checked);
  }, []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.toggleShowcase.sections.basic')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.toggleShowcase.sections.basicDesc')}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-8">
        <div className="flex items-center gap-3">
          <ToggleNative
            checked={isOn}
            label={FM('components.toggleShowcase.labels.enabledOn')}
            testId={TestIds.NATIVE_TOGGLE_BASIC_ON}
            onChange={handleOnChange}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.toggleShowcase.labels.enabledOn')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ToggleNative
            checked={isOff}
            label={FM('components.toggleShowcase.labels.enabledOff')}
            testId={TestIds.NATIVE_TOGGLE_BASIC_OFF}
            onChange={handleOffChange}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.toggleShowcase.labels.enabledOff')}
          </span>
        </div>
      </div>
    </section>
  );
});

BasicSection.displayName = 'BasicSection';
