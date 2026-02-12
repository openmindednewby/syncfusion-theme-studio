import { FM } from '@/localization/helpers';
import type { MenuConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface MenuEditorProps {
  config: MenuConfig;
  onUpdate: (updates: Partial<MenuConfig>) => void;
}

export const MenuEditor = ({ config, onUpdate }: MenuEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.menu.title')}>
      <ColorPicker
        label={FM('themeSettings.components.menu.background')}
        value={config.background}
        onChange={(value) => onUpdate({ background: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.menu.textColor')}
        value={config.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.menu.hoverBackground')}
        value={config.hoverBackground}
        onChange={(value) => onUpdate({ hoverBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.menu.hoverTextColor')}
        value={config.hoverTextColor}
        onChange={(value) => onUpdate({ hoverTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.menu.activeBackground')}
        value={config.activeBackground}
        onChange={(value) => onUpdate({ activeBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.menu.borderColor')}
        value={config.borderColor}
        onChange={(value) => onUpdate({ borderColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.menu.iconColor')}
        value={config.iconColor}
        onChange={(value) => onUpdate({ iconColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.menu.popupBackground')}
        value={config.popupBackground}
        onChange={(value) => onUpdate({ popupBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.menu.popupBorderColor')}
        value={config.popupBorderColor}
        onChange={(value) => onUpdate({ popupBorderColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.menu.popupTextColor')}
        value={config.popupTextColor}
        onChange={(value) => onUpdate({ popupTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.menu.separatorColor')}
        value={config.separatorColor}
        onChange={(value) => onUpdate({ separatorColor: value })}
      />
    </CollapsibleSection>
  );
};
