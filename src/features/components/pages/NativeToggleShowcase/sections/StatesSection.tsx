/**
 * StatesSection demonstrates disabled toggle states
 * (both checked and unchecked) and a toggle with a label.
 */
import { memo, useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { ToggleNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const NOOP = (): void => {};

export const StatesSection = memo((): JSX.Element => {
  const [labeled, setLabeled] = useState(false);

  const handleLabeledChange = useCallback((checked: boolean) => {
    setLabeled(checked);
  }, []);

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
          <ToggleNative
            checked
            disabled
            label={FM('components.toggleShowcase.labels.disabledOn')}
            testId={TestIds.NATIVE_TOGGLE_DISABLED_ON}
            onChange={NOOP}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.toggleShowcase.labels.disabledOn')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ToggleNative
            disabled
            checked={false}
            label={FM('components.toggleShowcase.labels.disabledOff')}
            testId={TestIds.NATIVE_TOGGLE_DISABLED_OFF}
            onChange={NOOP}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.toggleShowcase.labels.disabledOff')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ToggleNative
            checked={labeled}
            label={FM('components.toggleShowcase.labels.withLabel')}
            testId={TestIds.NATIVE_TOGGLE_LABELED}
            onChange={handleLabeledChange}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.toggleShowcase.labels.withLabel')}
          </span>
        </div>
      </div>
      <CopyableCodeSnippet code={'<ToggleNative\n  checked\n  disabled\n  label="Disabled on"\n  onChange={() => {}}\n/>\n<ToggleNative\n  disabled\n  checked={false}\n  label="Disabled off"\n  onChange={() => {}}\n/>'} />
    </section>
  );
});

StatesSection.displayName = 'StatesSection';
