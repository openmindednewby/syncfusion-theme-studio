import { FM } from '@/localization/utils/helpers';
import type {
  ButtonsComponentConfig,
  ButtonStateColors,
  ButtonVariant,
  CheckboxConfig,
  FabConfig,
  GridButtonsConfig,
  GridButtonStateColors,
  GridButtonVariant,
  GridDropdownConfig,
  IconButtonConfig,
  RadioConfig,
  SplitButtonConfig,
  ToggleConfig,
} from '@/stores/theme/types';

import { ButtonsEditor } from './ButtonsEditor';
import { CheckboxEditor } from './CheckboxEditor';
import { CollapsibleSection } from './CollapsibleSection';
import { FabEditor } from './FabEditor';
import { GridButtonsEditor } from './GridButtonsEditor';
import { GridDropdownEditor } from './GridDropdownEditor';
import { IconButtonsEditor } from './IconButtonsEditor';
import { RadioEditor } from './RadioEditor';
import { SplitButtonEditor } from './SplitButtonEditor';
import { ToggleEditor } from './ToggleEditor';

interface ButtonsGroupEditorProps {
  buttonsConfig: ButtonsComponentConfig;
  checkboxConfig: CheckboxConfig;
  fabConfig: FabConfig;
  gridButtonsConfig: GridButtonsConfig;
  gridDropdownConfig: GridDropdownConfig;
  iconButtonsConfig: IconButtonConfig;
  onUpdateButtonConfig: (variant: ButtonVariant, updates: Partial<ButtonStateColors>) => void;
  onUpdateButtonsConfig: (updates: Partial<ButtonsComponentConfig>) => void;
  onUpdateCheckboxConfig: (updates: Partial<CheckboxConfig>) => void;
  onUpdateFabConfig: (updates: Partial<FabConfig>) => void;
  onUpdateGridButtonsConfig: (updates: Partial<GridButtonsConfig>) => void;
  onUpdateGridButtonVariant: (variant: GridButtonVariant, updates: Partial<GridButtonStateColors>) => void;
  onUpdateGridDropdownConfig: (updates: Partial<GridDropdownConfig>) => void;
  onUpdateIconButtonConfig: (updates: Partial<IconButtonConfig>) => void;
  onUpdateRadioConfig: (updates: Partial<RadioConfig>) => void;
  onUpdateSplitButtonConfig: (updates: Partial<SplitButtonConfig>) => void;
  onUpdateToggleConfig: (updates: Partial<ToggleConfig>) => void;
  radioConfig: RadioConfig;
  splitButtonConfig: SplitButtonConfig;
  toggleConfig: ToggleConfig;
}

export const ButtonsGroupEditor = ({
  buttonsConfig,
  checkboxConfig,
  fabConfig,
  gridButtonsConfig,
  gridDropdownConfig,
  iconButtonsConfig,
  onUpdateButtonConfig,
  onUpdateButtonsConfig,
  onUpdateCheckboxConfig,
  onUpdateFabConfig,
  onUpdateGridButtonsConfig,
  onUpdateGridButtonVariant,
  onUpdateGridDropdownConfig,
  onUpdateIconButtonConfig,
  onUpdateRadioConfig,
  onUpdateSplitButtonConfig,
  onUpdateToggleConfig,
  radioConfig,
  splitButtonConfig,
  toggleConfig,
}: ButtonsGroupEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.buttonsGroup.title')}>
    <div className="space-y-2">
      <ButtonsEditor config={buttonsConfig} onUpdate={onUpdateButtonConfig} onUpdateConfig={onUpdateButtonsConfig} />
      <IconButtonsEditor config={iconButtonsConfig} onUpdate={onUpdateIconButtonConfig} />
      <FabEditor config={fabConfig} onUpdate={onUpdateFabConfig} />
      <SplitButtonEditor config={splitButtonConfig} onUpdate={onUpdateSplitButtonConfig} />
      <GridButtonsEditor config={gridButtonsConfig} onUpdateConfig={onUpdateGridButtonsConfig} onUpdateVariant={onUpdateGridButtonVariant} />
      <GridDropdownEditor config={gridDropdownConfig} onUpdate={onUpdateGridDropdownConfig} />
      <CheckboxEditor config={checkboxConfig} onUpdate={onUpdateCheckboxConfig} />
      <RadioEditor config={radioConfig} onUpdate={onUpdateRadioConfig} />
      <ToggleEditor config={toggleConfig} onUpdate={onUpdateToggleConfig} />
    </div>
  </CollapsibleSection>
);
