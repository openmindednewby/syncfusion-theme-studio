import { FM } from '@/localization/utils/helpers';
import type { ChipConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface ChipsEditorProps {
  config: ChipConfig;
  onUpdate: (updates: Partial<ChipConfig>) => void;
}

export const ChipsEditor = ({ config, onUpdate }: ChipsEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.chips.title')}>
      <div className="space-y-4">
        {/* Base Styling */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.chips.baseSection')}
          </p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <ColorPicker
              label={FM('themeSettings.components.chips.background')}
              value={config.background}
              onChange={(value) => onUpdate({ background: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.chips.textColor')}
              value={config.textColor}
              onChange={(value) => onUpdate({ textColor: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.chips.borderColor')}
              value={config.borderColor}
              onChange={(value) => onUpdate({ borderColor: value })}
            />
          </div>
        </div>

        {/* Hover State */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.chips.hoverSection')}
          </p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <ColorPicker
              label={FM('themeSettings.components.chips.hoverBackground')}
              value={config.hoverBackground}
              onChange={(value) => onUpdate({ hoverBackground: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.chips.hoverTextColor')}
              value={config.hoverTextColor}
              onChange={(value) => onUpdate({ hoverTextColor: value })}
            />
          </div>
        </div>

        {/* Primary Variant */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.chips.primarySection')}
          </p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <ColorPicker
              label={FM('themeSettings.components.chips.background')}
              value={config.primaryBackground}
              onChange={(value) => onUpdate({ primaryBackground: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.chips.textColor')}
              value={config.primaryTextColor}
              onChange={(value) => onUpdate({ primaryTextColor: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.chips.borderColor')}
              value={config.primaryBorderColor}
              onChange={(value) => onUpdate({ primaryBorderColor: value })}
            />
          </div>
        </div>

        {/* Success Variant */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.chips.successSection')}
          </p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <ColorPicker
              label={FM('themeSettings.components.chips.background')}
              value={config.successBackground}
              onChange={(value) => onUpdate({ successBackground: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.chips.textColor')}
              value={config.successTextColor}
              onChange={(value) => onUpdate({ successTextColor: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.chips.borderColor')}
              value={config.successBorderColor}
              onChange={(value) => onUpdate({ successBorderColor: value })}
            />
          </div>
        </div>

        {/* Warning Variant */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.chips.warningSection')}
          </p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <ColorPicker
              label={FM('themeSettings.components.chips.background')}
              value={config.warningBackground}
              onChange={(value) => onUpdate({ warningBackground: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.chips.textColor')}
              value={config.warningTextColor}
              onChange={(value) => onUpdate({ warningTextColor: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.chips.borderColor')}
              value={config.warningBorderColor}
              onChange={(value) => onUpdate({ warningBorderColor: value })}
            />
          </div>
        </div>

        {/* Danger Variant */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.chips.dangerSection')}
          </p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <ColorPicker
              label={FM('themeSettings.components.chips.background')}
              value={config.dangerBackground}
              onChange={(value) => onUpdate({ dangerBackground: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.chips.textColor')}
              value={config.dangerTextColor}
              onChange={(value) => onUpdate({ dangerTextColor: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.chips.borderColor')}
              value={config.dangerBorderColor}
              onChange={(value) => onUpdate({ dangerBorderColor: value })}
            />
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};
