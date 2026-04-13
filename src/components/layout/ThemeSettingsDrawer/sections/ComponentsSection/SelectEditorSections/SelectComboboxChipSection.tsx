import { FM } from '@/localization/utils/helpers';
import type { SelectConfig } from '@/stores/theme/types';

import { ColorPicker } from '../../../components/ColorPicker';
import { TextInputRow } from '../../../components/TextInputRow';

interface Props {
  config: SelectConfig;
  onUpdate: (updates: Partial<SelectConfig>) => void;
}

export const SelectComboboxChipSection = ({ config, onUpdate }: Props): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.select.comboboxChipSection')}
    </p>
    <ColorPicker
      label={FM('themeSettings.components.select.comboboxChipBackground')}
      value={config.comboboxChipBackground}
      onChange={(value) => onUpdate({ comboboxChipBackground: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.select.comboboxChipTextColor')}
      value={config.comboboxChipTextColor}
      onChange={(value) => onUpdate({ comboboxChipTextColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.select.comboboxChipCloseIconColor')}
      value={config.comboboxChipCloseIconColor}
      onChange={(value) => onUpdate({ comboboxChipCloseIconColor: value })}
    />
    <TextInputRow
      label={FM('themeSettings.components.select.comboboxChipCloseIconSize')}
      value={config.comboboxChipCloseIconSize}
      onChange={(value) => onUpdate({ comboboxChipCloseIconSize: value })}
    />
    <TextInputRow
      label={FM('themeSettings.components.select.comboboxChipBorderRadius')}
      value={config.comboboxChipBorderRadius}
      onChange={(value) => onUpdate({ comboboxChipBorderRadius: value })}
    />
    <TextInputRow
      label={FM('themeSettings.components.select.comboboxChipFontSize')}
      value={config.comboboxChipFontSize}
      onChange={(value) => onUpdate({ comboboxChipFontSize: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.select.comboboxClearBackground')}
      value={config.comboboxClearBackground}
      onChange={(value) => onUpdate({ comboboxClearBackground: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.select.comboboxClearIconColor')}
      value={config.comboboxClearIconColor}
      onChange={(value) => onUpdate({ comboboxClearIconColor: value })}
    />
    <TextInputRow
      label={FM('themeSettings.components.select.comboboxClearSize')}
      value={config.comboboxClearSize}
      onChange={(value) => onUpdate({ comboboxClearSize: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.select.comboboxSelectedRowBackground')}
      value={config.comboboxSelectedRowBackground}
      onChange={(value) => onUpdate({ comboboxSelectedRowBackground: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.select.comboboxCheckboxCheckedBackground')}
      value={config.comboboxCheckboxCheckedBackground}
      onChange={(value) => onUpdate({ comboboxCheckboxCheckedBackground: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.select.comboboxCheckboxBorderColor')}
      value={config.comboboxCheckboxBorderColor}
      onChange={(value) => onUpdate({ comboboxCheckboxBorderColor: value })}
    />
  </div>
);
