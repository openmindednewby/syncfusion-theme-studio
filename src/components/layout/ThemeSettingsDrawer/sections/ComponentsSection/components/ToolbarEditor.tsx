import { FM } from '@/localization/utils/helpers';
import type { ToolbarConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface ToolbarEditorProps {
  config: ToolbarConfig;
  onUpdate: (updates: Partial<ToolbarConfig>) => void;
}

export const ToolbarEditor = ({ config, onUpdate }: ToolbarEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.toolbar.title')}>
      <ColorPicker
        label={FM('themeSettings.components.toolbar.background')}
        value={config.background}
        onChange={(value) => onUpdate({ background: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.toolbar.textColor')}
        value={config.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.toolbar.hoverBackground')}
        value={config.hoverBackground}
        onChange={(value) => onUpdate({ hoverBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.toolbar.hoverTextColor')}
        value={config.hoverTextColor}
        onChange={(value) => onUpdate({ hoverTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.toolbar.activeBackground')}
        value={config.activeBackground}
        onChange={(value) => onUpdate({ activeBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.toolbar.borderColor')}
        value={config.borderColor}
        onChange={(value) => onUpdate({ borderColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.toolbar.separatorColor')}
        value={config.separatorColor}
        onChange={(value) => onUpdate({ separatorColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.toolbar.iconColor')}
        value={config.iconColor}
        onChange={(value) => onUpdate({ iconColor: value })}
      />
    </CollapsibleSection>
  );
};
