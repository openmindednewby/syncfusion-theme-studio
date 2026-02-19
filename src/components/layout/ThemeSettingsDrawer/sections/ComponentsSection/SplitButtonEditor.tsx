import { FM } from '@/localization/helpers';
import type { SplitButtonConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';
import { EditorTextInput } from '../../EditorTextInput';

interface SplitButtonEditorProps {
  config: SplitButtonConfig;
  onUpdate: (updates: Partial<SplitButtonConfig>) => void;
}

const L = (key: string): string => FM(`themeSettings.components.splitButton.${key}`);

export const SplitButtonEditor = ({ config, onUpdate }: SplitButtonEditorProps): JSX.Element => (
  <CollapsibleSection title={L('title')}>
    <div className="space-y-4">
      {/* Button Colors */}
      <div className="grid grid-cols-2 gap-2">
        <ColorPicker label={L('background')} value={config.background} onChange={(v) => onUpdate({ background: v })} />
        <ColorPicker
          label={L('backgroundHover')}
          value={config.backgroundHover}
          onChange={(v) => onUpdate({ backgroundHover: v })}
        />
        <ColorPicker
          label={L('backgroundActive')}
          value={config.backgroundActive}
          onChange={(v) => onUpdate({ backgroundActive: v })}
        />
        <ColorPicker label={L('textColor')} value={config.textColor} onChange={(v) => onUpdate({ textColor: v })} />
        <ColorPicker
          label={L('textColorHover')}
          value={config.textColorHover}
          onChange={(v) => onUpdate({ textColorHover: v })}
        />
        <ColorPicker label={L('borderColor')} value={config.borderColor} onChange={(v) => onUpdate({ borderColor: v })} />
        <ColorPicker label={L('dividerColor')} value={config.dividerColor} onChange={(v) => onUpdate({ dividerColor: v })} />
      </div>

      {/* Dropdown */}
      <div className="grid grid-cols-2 gap-2">
        <ColorPicker
          label={L('dropdownBackground')}
          value={config.dropdownBackground}
          onChange={(v) => onUpdate({ dropdownBackground: v })}
        />
        <ColorPicker
          label={L('dropdownBorderColor')}
          value={config.dropdownBorderColor}
          onChange={(v) => onUpdate({ dropdownBorderColor: v })}
        />
        <ColorPicker
          label={L('dropdownItemHover')}
          value={config.dropdownItemHover}
          onChange={(v) => onUpdate({ dropdownItemHover: v })}
        />
        <ColorPicker
          label={L('dropdownItemTextColor')}
          value={config.dropdownItemTextColor}
          onChange={(v) => onUpdate({ dropdownItemTextColor: v })}
        />
      </div>

      {/* Disabled & Sizing */}
      <div className="grid grid-cols-2 gap-2">
        <ColorPicker
          label={L('disabledBackground')}
          value={config.disabledBackground}
          onChange={(v) => onUpdate({ disabledBackground: v })}
        />
        <ColorPicker
          label={L('disabledTextColor')}
          value={config.disabledTextColor}
          onChange={(v) => onUpdate({ disabledTextColor: v })}
        />
        <EditorTextInput label={L('borderWidth')} value={config.borderWidth} onChange={(v) => onUpdate({ borderWidth: v })} />
        <EditorTextInput label={L('borderRadius')} value={config.borderRadius} onChange={(v) => onUpdate({ borderRadius: v })} />
        <EditorTextInput
          label={L('dropdownShadow')}
          value={config.dropdownShadow}
          onChange={(v) => onUpdate({ dropdownShadow: v })}
        />
        <EditorTextInput
          label={L('disabledOpacity')}
          value={config.disabledOpacity}
          onChange={(v) => onUpdate({ disabledOpacity: v })}
        />
        <EditorTextInput
          label={L('transitionDuration')}
          value={config.transitionDuration}
          onChange={(v) => onUpdate({ transitionDuration: v })}
        />
      </div>
    </div>
  </CollapsibleSection>
);
