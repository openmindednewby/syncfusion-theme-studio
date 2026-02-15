import { FM } from '@/localization/helpers';
import type { SidebarComponentConfig } from '@/stores/theme/types';


import { AnimationSubsection } from './AnimationSubsection';
import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface SidebarEditorProps {
  config: SidebarComponentConfig;
  onUpdate: (updates: Partial<SidebarComponentConfig>) => void;
}

export const SidebarEditor = ({ config, onUpdate }: SidebarEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.sidebar.title')}>
      <ColorPicker
        label={FM('themeSettings.components.sidebar.background')}
        value={config.background}
        onChange={(value) => onUpdate({ background: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.sidebar.textColor')}
        value={config.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.sidebar.activeItemBg')}
        value={config.activeItemBackground}
        onChange={(value) => onUpdate({ activeItemBackground: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.sidebar.activeItemText')}
        value={config.activeItemTextColor}
        onChange={(value) => onUpdate({ activeItemTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.sidebar.hoverItemBg')}
        value={config.hoverItemBackground}
        onChange={(value) => onUpdate({ hoverItemBackground: value })}
      />
      <AnimationSubsection
        animationDuration={config.transitionDuration}
        showEffectSelector={false}
        onDurationChange={(duration) => onUpdate({ transitionDuration: duration })}
      />
    </CollapsibleSection>
  );
};
