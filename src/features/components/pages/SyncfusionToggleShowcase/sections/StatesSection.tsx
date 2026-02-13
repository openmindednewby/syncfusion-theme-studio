/**
 * StatesSection demonstrates disabled toggle states
 * (both checked and unchecked) using Syncfusion SwitchComponent.
 */
import { memo, useId } from 'react';

import { SwitchComponent } from '@syncfusion/ej2-react-buttons';

import { FM } from '@/localization/helpers';

export const StatesSection = memo((): JSX.Element => {
  const disabledOnId = useId();
  const disabledOffId = useId();

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.toggleShowcase.sections.states')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.toggleShowcase.sections.statesDesc')}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-8">
        <div className="flex items-center gap-3">
          <SwitchComponent checked disabled id={disabledOnId} name="disabledOn" />
          <label className="text-sm text-text-secondary" htmlFor={disabledOnId}>
            {FM('components.toggleShowcase.labels.disabledOn')}
          </label>
        </div>
        <div className="flex items-center gap-3">
          <SwitchComponent disabled id={disabledOffId} name="disabledOff" />
          <label className="text-sm text-text-secondary" htmlFor={disabledOffId}>
            {FM('components.toggleShowcase.labels.disabledOff')}
          </label>
        </div>
      </div>
    </section>
  );
});

StatesSection.displayName = 'StatesSection';
