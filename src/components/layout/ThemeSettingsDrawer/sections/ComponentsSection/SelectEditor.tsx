import { FM } from '@/localization/helpers';
import type { SelectConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface SelectEditorProps {
  config: SelectConfig;
  onUpdate: (updates: Partial<SelectConfig>) => void;
}

export const SelectEditor = ({ config, onUpdate }: SelectEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.select.title')}>
      <div className="space-y-4">
        {/* Base Input Styling */}
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

        {/* Border States */}
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

        {/* Popup Styling */}
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
      </div>
    </CollapsibleSection>
  );
};
