import { FM } from '@/localization/utils/helpers';
import type { SelectConfig } from '@/stores/theme/types';

import { ColorPicker } from '../../../components/ColorPicker';

interface Props {
  config: SelectConfig;
  onUpdate: (updates: Partial<SelectConfig>) => void;
}

export const SelectPopupSection = ({ config, onUpdate }: Props): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.select.popupSection')}
    </p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <ColorPicker
        label={FM('themeSettings.components.select.popupBackground')}
        value={config.popupBackground}
        onChange={(value) => onUpdate({ popupBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.select.popupBorderColor')}
        value={config.popupBorderColor}
        onChange={(value) => onUpdate({ popupBorderColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.select.itemHoverBackground')}
        value={config.itemHoverBackground}
        onChange={(value) => onUpdate({ itemHoverBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.select.itemSelectedBackground')}
        value={config.itemSelectedBackground}
        onChange={(value) => onUpdate({ itemSelectedBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.select.itemSelectedTextColor')}
        value={config.itemSelectedTextColor}
        onChange={(value) => onUpdate({ itemSelectedTextColor: value })}
      />
    </div>
  </div>
);
