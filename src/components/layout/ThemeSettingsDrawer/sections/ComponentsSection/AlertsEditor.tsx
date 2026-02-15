import { FM } from '@/localization/helpers';
import type { AlertsConfig, AlertVariantConfig } from '@/stores/theme/types';

import { AnimationSubsection } from './AnimationSubsection';
import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface AlertsEditorProps {
  config: AlertsConfig;
  onUpdate: (updates: Partial<AlertsConfig>) => void;
}

const enum AlertKey {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

const ALERT_VARIANTS: AlertKey[] = [AlertKey.Success, AlertKey.Warning, AlertKey.Error, AlertKey.Info];

interface AlertVariantEditorProps {
  config: AlertVariantConfig;
  variant: AlertKey;
  onUpdate: (updates: Partial<AlertVariantConfig>) => void;
}

const AlertVariantEditor = ({ config, onUpdate, variant }: AlertVariantEditorProps): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium capitalize text-text-secondary">{variant}</p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <ColorPicker
        label={FM('themeSettings.components.alerts.background')}
        value={config.background}
        onChange={(value) => onUpdate({ background: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.alerts.textColor')}
        value={config.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.alerts.borderColor')}
        value={config.borderColor}
        onChange={(value) => onUpdate({ borderColor: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.alerts.iconColor')}
        value={config.iconColor}
        onChange={(value) => onUpdate({ iconColor: value })}
      />
    </div>
  </div>
);

export const AlertsEditor = ({ config, onUpdate }: AlertsEditorProps): JSX.Element => {
  const handleVariantUpdate = (variant: AlertKey, updates: Partial<AlertVariantConfig>): void => {
    onUpdate({
      [variant]: { ...config[variant], ...updates },
    });
  };

  return (
    <CollapsibleSection title={FM('themeSettings.components.alerts.title')}>
      <div className="space-y-4">
        {ALERT_VARIANTS.map((variant) => (
          <AlertVariantEditor
            key={variant}
            config={config[variant]}
            variant={variant}
            onUpdate={(updates) => handleVariantUpdate(variant, updates)}
          />
        ))}

        {/* Animation Settings */}
        <AnimationSubsection
          animationDuration={config.animationDuration}
          animationEffect={config.animationEffect}
          onDurationChange={(duration) => onUpdate({ animationDuration: duration })}
          onEffectChange={(effect) => onUpdate({ animationEffect: effect })}
        />
      </div>
    </CollapsibleSection>
  );
};
