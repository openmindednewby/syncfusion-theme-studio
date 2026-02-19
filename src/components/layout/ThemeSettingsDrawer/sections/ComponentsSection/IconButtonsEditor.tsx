import { FM } from '@/localization/helpers';
import type { IconButtonConfig, IconButtonVariantColors } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';
import { EditorTextInput } from '../../EditorTextInput';

interface IconButtonsEditorProps {
  config: IconButtonConfig;
  onUpdate: (updates: Partial<IconButtonConfig>) => void;
}

const enum VariantKey {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

const VARIANTS: VariantKey[] = [VariantKey.Primary, VariantKey.Secondary, VariantKey.Tertiary];

const L = (key: string): string => FM(`themeSettings.components.iconButtons.${key}`);

interface VariantEditorProps {
  config: IconButtonVariantColors;
  variant: VariantKey;
  onUpdate: (updates: Partial<IconButtonVariantColors>) => void;
}

const VariantEditor = ({ config, onUpdate, variant }: VariantEditorProps): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium capitalize text-text-secondary">{variant}</p>
    <div className="grid grid-cols-2 gap-2 pl-2">
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
      <ColorPicker label={L('iconColor')} value={config.iconColor} onChange={(v) => onUpdate({ iconColor: v })} />
      <ColorPicker
        label={L('iconColorHover')}
        value={config.iconColorHover}
        onChange={(v) => onUpdate({ iconColorHover: v })}
      />
      <ColorPicker label={L('borderColor')} value={config.borderColor} onChange={(v) => onUpdate({ borderColor: v })} />
    </div>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <EditorTextInput label={L('borderWidth')} value={config.borderWidth} onChange={(v) => onUpdate({ borderWidth: v })} />
      <ColorPicker
        label={L('disabledBackground')}
        value={config.disabledBackground}
        onChange={(v) => onUpdate({ disabledBackground: v })}
      />
      <ColorPicker
        label={L('disabledIconColor')}
        value={config.disabledIconColor}
        onChange={(v) => onUpdate({ disabledIconColor: v })}
      />
      <EditorTextInput
        label={L('disabledOpacity')}
        value={config.disabledOpacity}
        onChange={(v) => onUpdate({ disabledOpacity: v })}
      />
    </div>
  </div>
);

export const IconButtonsEditor = ({ config, onUpdate }: IconButtonsEditorProps): JSX.Element => {
  const handleVariantUpdate = (variant: VariantKey, updates: Partial<IconButtonVariantColors>): void => {
    onUpdate({ [variant]: { ...config[variant], ...updates } });
  };

  return (
    <CollapsibleSection title={L('title')}>
      <div className="space-y-4">
        {VARIANTS.map((variant) => (
          <VariantEditor
            key={variant}
            config={config[variant]}
            variant={variant}
            onUpdate={(updates) => handleVariantUpdate(variant, updates)}
          />
        ))}

        {/* Shared fields */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">{FM('common.settings')}</p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <EditorTextInput label={L('borderRadius')} value={config.borderRadius} onChange={(v) => onUpdate({ borderRadius: v })} />
            <EditorTextInput label={L('size')} value={config.size} onChange={(v) => onUpdate({ size: v })} />
            <EditorTextInput label={L('iconSize')} value={config.iconSize} onChange={(v) => onUpdate({ iconSize: v })} />
            <ColorPicker
              label={L('focusRingColor')}
              value={config.focusRingColor}
              onChange={(v) => onUpdate({ focusRingColor: v })}
            />
            <EditorTextInput
              label={L('transitionDuration')}
              value={config.transitionDuration}
              onChange={(v) => onUpdate({ transitionDuration: v })}
            />
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};
