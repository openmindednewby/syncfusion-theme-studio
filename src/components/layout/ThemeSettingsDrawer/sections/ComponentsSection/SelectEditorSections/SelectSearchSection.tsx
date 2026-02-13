import { FM } from '@/localization/helpers';
import type { SelectConfig } from '@/stores/theme/types';

import { ColorPicker } from '../../../ColorPicker';

interface Props {
  config: SelectConfig;
  onUpdate: (updates: Partial<SelectConfig>) => void;
}

export const SelectSearchSection = ({ config, onUpdate }: Props): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.select.searchSection')}
    </p>
    <ColorPicker
      label={FM('themeSettings.components.select.searchInputBackground')}
      value={config.searchInputBackground}
      onChange={(value) => onUpdate({ searchInputBackground: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.select.searchInputBorderColor')}
      value={config.searchInputBorderColor}
      onChange={(value) => onUpdate({ searchInputBorderColor: value })}
    />
  </div>
);
