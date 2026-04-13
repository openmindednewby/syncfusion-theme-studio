import { FM } from '@/localization/utils/helpers';
import type { SelectConfig } from '@/stores/theme/types';

import { ColorPicker } from '../../../components/ColorPicker';

interface Props {
  config: SelectConfig;
  onUpdate: (updates: Partial<SelectConfig>) => void;
}

export const SelectBorderSection = ({ config, onUpdate }: Props): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.select.borderSection')}
    </p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <ColorPicker
        label={FM('themeSettings.components.select.borderDefault')}
        value={config.borderDefault}
        onChange={(value) => onUpdate({ borderDefault: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.select.borderHover')}
        value={config.borderHover}
        onChange={(value) => onUpdate({ borderHover: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.select.borderFocus')}
        value={config.borderFocus}
        onChange={(value) => onUpdate({ borderFocus: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.select.borderError')}
        value={config.borderError}
        onChange={(value) => onUpdate({ borderError: value })}
      />
    </div>
  </div>
);
