import { FM } from '@/localization/utils/helpers';
import { GridButtonVariant } from '@/stores/theme/types';
import type { GridButtonsConfig, GridButtonStateColors, GridButtonTypography } from '@/stores/theme/types';

import { AnimationSubsection } from './AnimationSubsection';
import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';
import { EditorTextInput } from '../../../components/EditorTextInput';

interface GridButtonsEditorProps {
  config: GridButtonsConfig;
  onUpdateConfig: (updates: Partial<GridButtonsConfig>) => void;
  onUpdateVariant: (variant: GridButtonVariant, updates: Partial<GridButtonStateColors>) => void;
}

const L = (key: string): string => FM(`themeSettings.components.gridButtons.${key}`);

interface VariantEditorProps {
  config: GridButtonStateColors;
  label: string;
  onUpdate: (updates: Partial<GridButtonStateColors>) => void;
}

const VariantEditor = ({ config, label, onUpdate }: VariantEditorProps): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium capitalize text-text-secondary">{label}</p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <ColorPicker label={L('background')} value={config.background} onChange={(v) => onUpdate({ background: v })} />
      <ColorPicker label={L('backgroundHover')} value={config.backgroundHover} onChange={(v) => onUpdate({ backgroundHover: v })} />
      <ColorPicker label={L('textColor')} value={config.textColor} onChange={(v) => onUpdate({ textColor: v })} />
      <ColorPicker label={L('borderColor')} value={config.borderColor} onChange={(v) => onUpdate({ borderColor: v })} />
      <EditorTextInput label={L('disabledOpacity')} value={config.disabledOpacity} onChange={(v) => onUpdate({ disabledOpacity: v })} />
    </div>
  </div>
);

const GRID_BUTTON_VARIANTS: GridButtonVariant[] = [
  GridButtonVariant.Default,
  GridButtonVariant.Save,
  GridButtonVariant.Delete,
  GridButtonVariant.View,
  GridButtonVariant.Export,
  GridButtonVariant.Archive,
];

const GRID_BUTTON_PROPERTY_COUNT = 39;

export const GridButtonsEditor = ({ config, onUpdateConfig, onUpdateVariant }: GridButtonsEditorProps): JSX.Element => {
  const handleTypographyUpdate = (updates: Partial<GridButtonTypography>): void => {
    onUpdateConfig({ typography: { ...config.typography, ...updates } });
  };

  return (
    <CollapsibleSection propertyCount={GRID_BUTTON_PROPERTY_COUNT} title={L('title')}>
      <div className="space-y-4">
        {GRID_BUTTON_VARIANTS.map((variant) => (
          <VariantEditor
            key={variant}
            config={config[variant]}
            label={variant}
            onUpdate={(updates) => onUpdateVariant(variant, updates)}
          />
        ))}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">{L('typography')}</p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <EditorTextInput label={L('fontFamily')} value={config.typography.fontFamily} onChange={(v) => handleTypographyUpdate({ fontFamily: v })} />
            <EditorTextInput label={L('fontSize')} value={config.typography.fontSize} onChange={(v) => handleTypographyUpdate({ fontSize: v })} />
            <EditorTextInput label={L('fontWeight')} value={config.typography.fontWeight} onChange={(v) => handleTypographyUpdate({ fontWeight: v })} />
            <EditorTextInput label={L('lineHeight')} value={config.typography.lineHeight} onChange={(v) => handleTypographyUpdate({ lineHeight: v })} />
            <EditorTextInput
              label={L('letterSpacing')}
              value={config.typography.letterSpacing}
              onChange={(v) => handleTypographyUpdate({ letterSpacing: v })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">{L('layout')}</p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <EditorTextInput label={L('paddingV')} value={config.paddingV} onChange={(v) => onUpdateConfig({ paddingV: v })} />
            <EditorTextInput label={L('paddingH')} value={config.paddingH} onChange={(v) => onUpdateConfig({ paddingH: v })} />
            <EditorTextInput label={L('borderRadius')} value={config.borderRadius} onChange={(v) => onUpdateConfig({ borderRadius: v })} />
          </div>
        </div>
        <AnimationSubsection
          animationDuration={config.transitionDuration}
          showEffectSelector={false}
          onDurationChange={(duration) => onUpdateConfig({ transitionDuration: duration })}
        />
      </div>
    </CollapsibleSection>
  );
};
