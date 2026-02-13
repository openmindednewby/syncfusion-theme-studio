import { FM } from '@/localization/helpers';
import type { SelectConfig } from '@/stores/theme/types';

import { ColorPicker } from '../../../ColorPicker';

interface Props {
  config: SelectConfig;
  onUpdate: (updates: Partial<SelectConfig>) => void;
}

export const SelectInputSection = ({ config, onUpdate }: Props): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.select.inputSection')}
    </p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <ColorPicker
        label={FM('themeSettings.components.select.background')}
        value={config.background}
        onChange={(value) => onUpdate({ background: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.select.textColor')}
        value={config.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.select.iconColor')}
        value={config.iconColor}
        onChange={(value) => onUpdate({ iconColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.select.placeholderColor')}
        value={config.placeholderColor}
        onChange={(value) => onUpdate({ placeholderColor: value })}
      />
    </div>
  </div>
);
