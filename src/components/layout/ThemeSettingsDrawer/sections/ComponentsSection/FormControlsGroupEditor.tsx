import { FM } from '@/localization/helpers';
import type { CheckboxConfig, RadioConfig, ToggleConfig } from '@/stores/theme/types';

import { CheckboxEditor } from './CheckboxEditor';
import { CollapsibleSection } from './CollapsibleSection';
import { RadioEditor } from './RadioEditor';
import { ToggleEditor } from './ToggleEditor';

interface FormControlsGroupEditorProps {
  checkboxConfig: CheckboxConfig;
  onUpdateCheckboxConfig: (updates: Partial<CheckboxConfig>) => void;
  radioConfig: RadioConfig;
  onUpdateRadioConfig: (updates: Partial<RadioConfig>) => void;
  toggleConfig: ToggleConfig;
  onUpdateToggleConfig: (updates: Partial<ToggleConfig>) => void;
}

export const FormControlsGroupEditor = ({
  checkboxConfig,
  onUpdateCheckboxConfig,
  radioConfig,
  onUpdateRadioConfig,
  toggleConfig,
  onUpdateToggleConfig,
}: FormControlsGroupEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.formControlsGroup.title')}>
    <div className="space-y-2">
      <CheckboxEditor config={checkboxConfig} onUpdate={onUpdateCheckboxConfig} />
      <RadioEditor config={radioConfig} onUpdate={onUpdateRadioConfig} />
      <ToggleEditor config={toggleConfig} onUpdate={onUpdateToggleConfig} />
    </div>
  </CollapsibleSection>
);
