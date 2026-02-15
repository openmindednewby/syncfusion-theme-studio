import { FM } from '@/localization/helpers';
import { ButtonVariant } from '@/stores/theme/types';
import type { ButtonsComponentConfig, ButtonStateColors } from '@/stores/theme/types';

import { AnimationSubsection } from './AnimationSubsection';
import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface ButtonsEditorProps {
  config: ButtonsComponentConfig;
  onUpdate: (variant: ButtonVariant, updates: Partial<ButtonStateColors>) => void;
  onUpdateConfig: (updates: Partial<ButtonsComponentConfig>) => void;
}

const BUTTON_VARIANTS: ButtonVariant[] = [
  ButtonVariant.Primary,
  ButtonVariant.Secondary,
  ButtonVariant.Outline,
  ButtonVariant.Ghost,
  ButtonVariant.Danger,
];

interface VariantEditorProps {
  config: ButtonStateColors;
  variant: ButtonVariant;
  onUpdate: (updates: Partial<ButtonStateColors>) => void;
}

const VariantEditor = ({ config, onUpdate, variant }: VariantEditorProps): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium capitalize text-text-secondary">{variant}</p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <ColorPicker
        label={FM('themeSettings.components.buttons.background')}
        value={config.background}
        onChange={(value) => onUpdate({ background: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.buttons.backgroundHover')}
        value={config.backgroundHover}
        onChange={(value) => onUpdate({ backgroundHover: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.buttons.textColor')}
        value={config.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
      />
    </div>
  </div>
);

export const ButtonsEditor = ({ config, onUpdate, onUpdateConfig }: ButtonsEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.buttons.title')}>
      <div className="space-y-4">
        {BUTTON_VARIANTS.map((variant) => (
          <VariantEditor
            key={variant}
            config={config[variant]}
            variant={variant}
            onUpdate={(updates) => onUpdate(variant, updates)}
          />
        ))}
        <AnimationSubsection
          animationDuration={config.transitionDuration}
          showEffectSelector={false}
          onDurationChange={(duration) => onUpdateConfig({ transitionDuration: duration })}
        />
      </div>
    </CollapsibleSection>
  );
};
