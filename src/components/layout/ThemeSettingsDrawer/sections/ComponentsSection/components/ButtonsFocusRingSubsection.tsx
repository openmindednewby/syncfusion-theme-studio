import { FM } from '@/localization/utils/helpers';
import type { ButtonFocusRing } from '@/stores/theme/types';

import { ColorPicker } from '../../../components/ColorPicker';


interface Props {
  focusRing: ButtonFocusRing;
  onUpdate: (updates: Partial<ButtonFocusRing>) => void;
}

export const ButtonsFocusRingSubsection = ({ focusRing, onUpdate }: Props): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.components.buttons.focusRing')}
    </p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <ColorPicker
        label={FM('themeSettings.components.buttons.focusRingColor')}
        value={focusRing.color}
        onChange={(value) => onUpdate({ color: value })}
      />
      <div className="space-y-1">
        <label className="text-xs text-text-muted">{FM('themeSettings.components.buttons.focusRingWidth')}</label>
        <input
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          value={focusRing.width}
          onChange={(e) => onUpdate({ width: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-text-muted">{FM('themeSettings.components.buttons.focusRingOffset')}</label>
        <input
          className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
          value={focusRing.offset}
          onChange={(e) => onUpdate({ offset: e.target.value })}
        />
      </div>
    </div>
  </div>
);
