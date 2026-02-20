import { useId } from 'react';

import {
  CheckBoxComponent,
  RadioButtonComponent,
  SwitchComponent,
  ChipListComponent,
  ChipsDirective,
  ChipDirective,
} from '@syncfusion/ej2-react-buttons';

import { FM } from '@/localization/utils/helpers';

export const SelectionSection = (): JSX.Element => {
  const enabledSwitchId = useId();
  const disabledSwitchId = useId();
  const lockedSwitchId = useId();

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-semibold text-text-primary">{FM('components.selection')}</h3>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Checkboxes */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-secondary">{FM('components.checkboxes')}</h4>
          <div className="flex flex-col gap-3">
            <CheckBoxComponent checked label="Checked" />
            <CheckBoxComponent label="Unchecked" />
            <CheckBoxComponent disabled label="Disabled" />
            <CheckBoxComponent checked indeterminate label="Indeterminate" />
          </div>
        </div>

        {/* Radio Buttons */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-secondary">{FM('components.radioButtons')}</h4>
          <div className="flex flex-col gap-3">
            <RadioButtonComponent checked label="Option A" name="radio-group" value="a" />
            <RadioButtonComponent label="Option B" name="radio-group" value="b" />
            <RadioButtonComponent label="Option C" name="radio-group" value="c" />
            <RadioButtonComponent disabled label="Disabled" name="radio-group" value="d" />
          </div>
        </div>

        {/* Switches */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-secondary">{FM('components.switches')}</h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <SwitchComponent checked id={enabledSwitchId} name="enabledSwitch" />
              <label className="text-text-primary" htmlFor={enabledSwitchId}>{FM('components.switchEnabled')}</label>
            </div>
            <div className="flex items-center gap-3">
              <SwitchComponent id={disabledSwitchId} name="disabledSwitch" />
              <label className="text-text-primary" htmlFor={disabledSwitchId}>{FM('components.switchDisabled')}</label>
            </div>
            <div className="flex items-center gap-3">
              <SwitchComponent checked disabled id={lockedSwitchId} name="lockedSwitch" />
              <label className="text-text-muted" htmlFor={lockedSwitchId}>{FM('components.switchLockedOn')}</label>
            </div>
          </div>
        </div>
      </div>

      {/* Chips */}
      <div className="space-y-4">
        <h4 className="font-medium text-text-secondary">{FM('components.chips')}</h4>
        <ChipListComponent aria-label="Technology tags">
          <ChipsDirective>
            <ChipDirective text="React" />
            <ChipDirective text="TypeScript" />
            <ChipDirective text="Syncfusion" />
            <ChipDirective text="Tailwind" />
            <ChipDirective cssClass="e-primary" text="Primary" />
            <ChipDirective cssClass="e-success" text="Success" />
            <ChipDirective cssClass="e-warning" text="Warning" />
            <ChipDirective cssClass="e-danger" text="Danger" />
          </ChipsDirective>
        </ChipListComponent>
      </div>
    </section>
  );
};
