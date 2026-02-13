import { FM } from '@/localization/helpers';
import type { SelectConfig } from '@/stores/theme/types';

import { ColorPicker } from '../../../ColorPicker';
import { TextInputRow } from '../../../TextInputRow';

interface Props {
  config: SelectConfig;
  onUpdate: (updates: Partial<SelectConfig>) => void;
}

export const SelectInteractionSection = ({ config, onUpdate }: Props): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.select.interactionSection')}
    </p>
    <ColorPicker
      label={FM('themeSettings.components.select.focusRingColor')}
      value={config.focusRingColor}
      onChange={(value) => onUpdate({ focusRingColor: value })}
    />
    <TextInputRow
      label={FM('themeSettings.components.select.focusRingWidth')}
      value={config.focusRingWidth}
      onChange={(value) => onUpdate({ focusRingWidth: value })}
    />
    <TextInputRow
      label={FM('themeSettings.components.select.transitionDuration')}
      value={config.transitionDuration}
      onChange={(value) => onUpdate({ transitionDuration: value })}
    />
    <TextInputRow
      label={FM('themeSettings.components.select.disabledOpacity')}
      value={config.disabledOpacity}
      onChange={(value) => onUpdate({ disabledOpacity: value })}
    />
  </div>
);
