/**
 * BasicSection demonstrates the Syncfusion SwitchComponent
 * in its default on and off states.
 */
import { memo, useId } from 'react';

import { SwitchComponent } from '@syncfusion/ej2-react-buttons';

import { FM } from '@/localization/helpers';

export const BasicSection = memo((): JSX.Element => {
  const onSwitchId = useId();
  const offSwitchId = useId();

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
          <SwitchComponent checked id={onSwitchId} name="basicOn" />
          <label className="text-sm text-text-secondary" htmlFor={onSwitchId}>
            {FM('components.toggleShowcase.labels.enabledOn')}
          </label>
        </div>
        <div className="flex items-center gap-3">
          <SwitchComponent id={offSwitchId} name="basicOff" />
          <label className="text-sm text-text-secondary" htmlFor={offSwitchId}>
            {FM('components.toggleShowcase.labels.enabledOff')}
          </label>
        </div>
      </div>
    </section>
  );
});

BasicSection.displayName = 'BasicSection';
