import { FM } from '@/localization/utils/helpers';
import type { ToggleConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface ToggleEditorProps {
  config: ToggleConfig;
  onUpdate: (updates: Partial<ToggleConfig>) => void;
}

export const ToggleEditor = ({ config, onUpdate }: ToggleEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.toggle.title')}>
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.toggle.trackSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.toggle.trackActive')}
            value={config.trackActiveBackground}
            onChange={(value) => onUpdate({ trackActiveBackground: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.toggle.trackInactive')}
            value={config.trackInactiveBackground}
            onChange={(value) => onUpdate({ trackInactiveBackground: value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.toggle.thumbSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.toggle.thumbBackground')}
            value={config.thumbBackground}
            onChange={(value) => onUpdate({ thumbBackground: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.toggle.focusRing')}
            value={config.focusRingColor}
            onChange={(value) => onUpdate({ focusRingColor: value })}
          />
        </div>
      </div>
    </div>
  </CollapsibleSection>
);
