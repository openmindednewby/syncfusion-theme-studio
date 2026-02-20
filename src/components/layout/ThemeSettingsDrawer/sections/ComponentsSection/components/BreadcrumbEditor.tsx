import { FM } from '@/localization/utils/helpers';
import type { BreadcrumbConfig } from '@/stores/theme/types';

import { AnimationSubsection } from './AnimationSubsection';
import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface BreadcrumbEditorProps {
  config: BreadcrumbConfig;
  onUpdate: (updates: Partial<BreadcrumbConfig>) => void;
}

export const BreadcrumbEditor = ({ config, onUpdate }: BreadcrumbEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.breadcrumb.title')}>
      <ColorPicker
        label={FM('themeSettings.components.breadcrumb.background')}
        value={config.background}
        onChange={(value) => onUpdate({ background: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.breadcrumb.textColor')}
        value={config.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.breadcrumb.hoverTextColor')}
        value={config.hoverTextColor}
        onChange={(value) => onUpdate({ hoverTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.breadcrumb.activeTextColor')}
        value={config.activeTextColor}
        onChange={(value) => onUpdate({ activeTextColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.breadcrumb.separatorColor')}
        value={config.separatorColor}
        onChange={(value) => onUpdate({ separatorColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.breadcrumb.iconColor')}
        value={config.iconColor}
        onChange={(value) => onUpdate({ iconColor: value })}
      />
      <AnimationSubsection
        animationDuration={config.transitionDuration}
        showEffectSelector={false}
        onDurationChange={(duration) => onUpdate({ transitionDuration: duration })}
      />
    </CollapsibleSection>
  );
};
