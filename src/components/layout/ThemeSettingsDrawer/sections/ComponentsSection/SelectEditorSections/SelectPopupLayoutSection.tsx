import { FM } from '@/localization/utils/helpers';
import type { SelectConfig } from '@/stores/theme/types';

import { TextInputRow } from '../../../components/TextInputRow';

interface Props {
  config: SelectConfig;
  onUpdate: (updates: Partial<SelectConfig>) => void;
}

export const SelectPopupLayoutSection = ({ config, onUpdate }: Props): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.select.popupLayoutSection')}
    </p>
    <TextInputRow
      label={FM('themeSettings.components.select.popupShadow')}
      value={config.popupShadow}
      onChange={(value) => onUpdate({ popupShadow: value })}
    />
    <TextInputRow
      label={FM('themeSettings.components.select.popupMaxHeight')}
      value={config.popupMaxHeight}
      onChange={(value) => onUpdate({ popupMaxHeight: value })}
    />
    <TextInputRow
      label={FM('themeSettings.components.select.popupBorderRadius')}
      value={config.popupBorderRadius}
      onChange={(value) => onUpdate({ popupBorderRadius: value })}
    />
  </div>
);
