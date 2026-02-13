/**
 * InteractiveSection demonstrates a controlled Syncfusion SwitchComponent
 * with live state display.
 */
import { memo, useCallback, useId, useState } from 'react';

import { type ChangeEventArgs, SwitchComponent } from '@syncfusion/ej2-react-buttons';

import { FM } from '@/localization/helpers';

export const InteractiveSection = memo((): JSX.Element => {
  const [isActive, setIsActive] = useState(false);
  const switchId = useId();

  const handleChange = useCallback((args: ChangeEventArgs) => {
    setIsActive(args.checked ?? false);
  }, []);

  const stateLabel = isActive
    ? FM('components.toggleShowcase.labels.on')
    : FM('components.toggleShowcase.labels.off');

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.toggleShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.toggleShowcase.sections.interactiveDesc')}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <SwitchComponent
          change={handleChange}
          checked={isActive}
          id={switchId}
          name="interactive"
        />
        <label className="text-sm text-text-secondary" htmlFor={switchId}>
          {FM('components.toggleShowcase.sections.interactive')}
        </label>
        <span className="text-sm font-medium text-text-primary">
          {FM('components.toggleShowcase.labels.currentState', stateLabel)}
        </span>
      </div>
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
