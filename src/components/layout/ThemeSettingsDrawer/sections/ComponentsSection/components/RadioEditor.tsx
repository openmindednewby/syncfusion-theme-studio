import { FM } from '@/localization/utils/helpers';
import type { RadioConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface RadioEditorProps {
  config: RadioConfig;
  onUpdate: (updates: Partial<RadioConfig>) => void;
}

export const RadioEditor = ({ config, onUpdate }: RadioEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.radio.title')}>
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.radio.uncheckedSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.radio.background')}
            value={config.uncheckedBackground}
            onChange={(value) => onUpdate({ uncheckedBackground: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.radio.borderColor')}
            value={config.uncheckedBorderColor}
            onChange={(value) => onUpdate({ uncheckedBorderColor: value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.radio.selectedSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.radio.background')}
            value={config.selectedBackground}
            onChange={(value) => onUpdate({ selectedBackground: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.radio.borderColor')}
            value={config.selectedBorderColor}
            onChange={(value) => onUpdate({ selectedBorderColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.radio.dotColor')}
            value={config.dotColor}
            onChange={(value) => onUpdate({ dotColor: value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.radio.statesSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.radio.hoverBorder')}
            value={config.hoverBorderColor}
            onChange={(value) => onUpdate({ hoverBorderColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.radio.focusRing')}
            value={config.focusRingColor}
            onChange={(value) => onUpdate({ focusRingColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.radio.labelColor')}
            value={config.labelColor}
            onChange={(value) => onUpdate({ labelColor: value })}
          />
        </div>
      </div>
    </div>
  </CollapsibleSection>
);
