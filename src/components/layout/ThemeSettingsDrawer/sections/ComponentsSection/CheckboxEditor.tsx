import { FM } from '@/localization/helpers';
import type { CheckboxConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface CheckboxEditorProps {
  config: CheckboxConfig;
  onUpdate: (updates: Partial<CheckboxConfig>) => void;
}

export const CheckboxEditor = ({ config, onUpdate }: CheckboxEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.checkbox.title')}>
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.checkbox.uncheckedSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.checkbox.background')}
            value={config.uncheckedBackground}
            onChange={(value) => onUpdate({ uncheckedBackground: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.checkbox.borderColor')}
            value={config.uncheckedBorderColor}
            onChange={(value) => onUpdate({ uncheckedBorderColor: value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.checkbox.checkedSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.checkbox.background')}
            value={config.checkedBackground}
            onChange={(value) => onUpdate({ checkedBackground: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.checkbox.borderColor')}
            value={config.checkedBorderColor}
            onChange={(value) => onUpdate({ checkedBorderColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.checkbox.checkmark')}
            value={config.checkmarkColor}
            onChange={(value) => onUpdate({ checkmarkColor: value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.checkbox.statesSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.checkbox.hoverBorder')}
            value={config.hoverBorderColor}
            onChange={(value) => onUpdate({ hoverBorderColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.checkbox.focusRing')}
            value={config.focusRingColor}
            onChange={(value) => onUpdate({ focusRingColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.checkbox.indeterminate')}
            value={config.indeterminateBackground}
            onChange={(value) => onUpdate({ indeterminateBackground: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.checkbox.labelColor')}
            value={config.labelColor}
            onChange={(value) => onUpdate({ labelColor: value })}
          />
        </div>
      </div>
    </div>
  </CollapsibleSection>
);
