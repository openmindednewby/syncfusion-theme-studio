import { FM } from '@/localization/helpers';
import type { SelectConfig } from '@/stores/theme/types';

import { ColorPicker } from '../../../ColorPicker';
import { TextInputRow } from '../../../TextInputRow';

interface Props {
  config: SelectConfig;
  onUpdate: (updates: Partial<SelectConfig>) => void;
}

export const SelectItemSection = ({ config, onUpdate }: Props): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.select.itemSection')}
    </p>
    <ColorPicker
      label={FM('themeSettings.components.select.itemTextColor')}
      value={config.itemTextColor}
      onChange={(value) => onUpdate({ itemTextColor: value })}
    />
    <TextInputRow
      label={FM('themeSettings.components.select.itemFontSize')}
      value={config.itemFontSize}
      onChange={(value) => onUpdate({ itemFontSize: value })}
    />
    <TextInputRow
      label={FM('themeSettings.components.select.itemPadding')}
      value={config.itemPadding}
      onChange={(value) => onUpdate({ itemPadding: value })}
    />
  </div>
);
