import { FM } from '@/localization/utils/helpers';
import { ButtonVariant } from '@/stores/theme/types';
import type { ButtonFocusRing, ButtonPadding, ButtonsComponentConfig, ButtonStateColors, ButtonTypography, ShadowScale } from '@/stores/theme/types';

import { AnimationSubsection } from './AnimationSubsection';
import { ButtonsFocusRingSubsection } from './ButtonsFocusRingSubsection';
import { ButtonsPaddingSubsection } from './ButtonsPaddingSubsection';
import { ButtonsTypographySubsection } from './ButtonsTypographySubsection';
import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';
import { EditorTextInput } from '../../../components/EditorTextInput';

interface ButtonsEditorProps {
  config: ButtonsComponentConfig;
  onUpdate: (variant: ButtonVariant, updates: Partial<ButtonStateColors>) => void;
  onUpdateConfig: (updates: Partial<ButtonsComponentConfig>) => void;
}

const L = (key: string): string => FM(`themeSettings.components.buttons.${key}`);

interface VariantEditorProps {
  config: ButtonStateColors;
  variant: ButtonVariant;
  onUpdate: (updates: Partial<ButtonStateColors>) => void;
}

const VariantEditor = ({ config, onUpdate, variant }: VariantEditorProps): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium capitalize text-text-secondary">{variant}</p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <ColorPicker label={L('background')} value={config.background} onChange={(v) => onUpdate({ background: v })} />
      <ColorPicker label={L('backgroundHover')} value={config.backgroundHover} onChange={(v) => onUpdate({ backgroundHover: v })} />
      <ColorPicker label={L('backgroundActive')} value={config.backgroundActive} onChange={(v) => onUpdate({ backgroundActive: v })} />
      <ColorPicker label={L('textColor')} value={config.textColor} onChange={(v) => onUpdate({ textColor: v })} />
      <ColorPicker label={L('textColorHover')} value={config.textColorHover} onChange={(v) => onUpdate({ textColorHover: v })} />
      <ColorPicker label={L('borderColor')} value={config.borderColor} onChange={(v) => onUpdate({ borderColor: v })} />
      <EditorTextInput label={L('borderWidth')} value={config.borderWidth} onChange={(v) => onUpdate({ borderWidth: v })} />
      <EditorTextInput label={L('borderRadius')} value={config.borderRadius} onChange={(v) => onUpdate({ borderRadius: v })} />
      {/* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- ShadowScale const enum is a string at runtime */}
      <EditorTextInput label={L('shadow')} value={config.shadow} onChange={(v) => onUpdate({ shadow: v as ShadowScale })} />
      <ColorPicker label={L('disabledBg')} value={config.disabledBackground} onChange={(v) => onUpdate({ disabledBackground: v })} />
      <ColorPicker label={L('disabledText')} value={config.disabledTextColor} onChange={(v) => onUpdate({ disabledTextColor: v })} />
      <ColorPicker
        label={L('disabledBorderColor')}
        value={config.disabledBorderColor}
        onChange={(v) => onUpdate({ disabledBorderColor: v })}
      />
      <EditorTextInput label={L('disabledOpacity')} value={config.disabledOpacity} onChange={(v) => onUpdate({ disabledOpacity: v })} />
    </div>
  </div>
);

const BUTTON_VARIANTS: ButtonVariant[] = [
  ButtonVariant.Primary,
  ButtonVariant.Secondary,
  ButtonVariant.Outline,
  ButtonVariant.Ghost,
  ButtonVariant.Danger,
];

export const ButtonsEditor = ({ config, onUpdate, onUpdateConfig }: ButtonsEditorProps): JSX.Element => {
  const handleTypographyUpdate = (updates: Partial<ButtonTypography>): void => {
    onUpdateConfig({ typography: { ...config.typography, ...updates } });
  };

  const handlePaddingUpdate = (updates: Partial<ButtonPadding>): void => {
    onUpdateConfig({ padding: { ...config.padding, ...updates } });
  };

  const handleFocusRingUpdate = (updates: Partial<ButtonFocusRing>): void => {
    onUpdateConfig({ focusRing: { ...config.focusRing, ...updates } });
  };

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
        <ButtonsTypographySubsection typography={config.typography} onUpdate={handleTypographyUpdate} />
        <ButtonsPaddingSubsection
          gap={config.gap}
          padding={config.padding}
          onUpdateGap={(gap) => onUpdateConfig({ gap })}
          onUpdatePadding={handlePaddingUpdate}
        />
        <ButtonsFocusRingSubsection focusRing={config.focusRing} onUpdate={handleFocusRingUpdate} />
        <AnimationSubsection
          animationDuration={config.transitionDuration}
          showEffectSelector={false}
          onDurationChange={(duration) => onUpdateConfig({ transitionDuration: duration })}
        />
      </div>
    </CollapsibleSection>
  );
};
