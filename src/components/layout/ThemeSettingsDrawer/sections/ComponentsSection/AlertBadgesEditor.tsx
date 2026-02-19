import { FM } from '@/localization/helpers';
import type { AlertBadgesConfig, BadgePadding, BadgeTypography, BadgeVariant } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface AlertBadgesEditorProps {
  config: AlertBadgesConfig;
  onUpdate: (updates: Partial<AlertBadgesConfig>) => void;
}

const inputClasses = 'w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary';

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const Field = ({ label, value, onChange }: FieldProps): JSX.Element => (
  <div className="space-y-1">
    <span className="text-[10px] text-text-muted">{label}</span>
    <input
      className={inputClasses}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const enum VariantKey {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

const VARIANT_KEYS: VariantKey[] = [VariantKey.Success, VariantKey.Warning, VariantKey.Error, VariantKey.Info];

interface VariantEditorProps {
  config: BadgeVariant;
  variant: VariantKey;
  onUpdate: (updates: Partial<BadgeVariant>) => void;
}

const VariantEditor = ({ config, onUpdate, variant }: VariantEditorProps): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium capitalize text-text-secondary">{variant}</p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      <ColorPicker
        label={FM('themeSettings.components.badges.background')}
        value={config.background}
        onChange={(value) => onUpdate({ background: value })}
      />
      <ColorPicker
        label={FM('themeSettings.components.badges.textColor')}
        value={config.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
      />
    </div>
  </div>
);

export const AlertBadgesEditor = ({ config, onUpdate }: AlertBadgesEditorProps): JSX.Element => {
  const handleTypographyUpdate = (field: keyof BadgeTypography, value: string): void => {
    onUpdate({ typography: { ...config.typography, [field]: value } });
  };

  const handlePaddingUpdate = (field: keyof BadgePadding, value: string): void => {
    onUpdate({ padding: { ...config.padding, [field]: value } });
  };

  const handleVariantUpdate = (variant: VariantKey, updates: Partial<BadgeVariant>): void => {
    onUpdate({ [variant]: { ...config[variant], ...updates } });
  };

  return (
    <CollapsibleSection title={FM('themeSettings.components.alertBadges.title')}>
      <div className="space-y-4">
        <p className="text-xs text-text-muted">
          {FM('themeSettings.components.alertBadges.description')}
        </p>
        {VARIANT_KEYS.map((variant) => (
          <VariantEditor
            key={variant}
            config={config[variant]}
            variant={variant}
            onUpdate={(updates) => handleVariantUpdate(variant, updates)}
          />
        ))}
        <div>
          <p className="mb-2 text-xs font-medium text-text-secondary">{FM('themeSettings.components.alertBadges.padding')}</p>
          <div className="grid grid-cols-4 gap-2 pl-2">
            <Field label="Top" value={config.padding.paddingTop} onChange={(v) => handlePaddingUpdate('paddingTop', v)} />
            <Field label="Right" value={config.padding.paddingRight} onChange={(v) => handlePaddingUpdate('paddingRight', v)} />
            <Field label="Bottom" value={config.padding.paddingBottom} onChange={(v) => handlePaddingUpdate('paddingBottom', v)} />
            <Field label="Left" value={config.padding.paddingLeft} onChange={(v) => handlePaddingUpdate('paddingLeft', v)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field
            label={FM('themeSettings.components.alertBadges.fontFamily')}
            value={config.typography.fontFamily}
            onChange={(v) => handleTypographyUpdate('fontFamily', v)}
          />
          <Field
            label={FM('themeSettings.components.alertBadges.fontSize')}
            value={config.typography.fontSize}
            onChange={(v) => handleTypographyUpdate('fontSize', v)}
          />
          <Field
            label={FM('themeSettings.components.alertBadges.fontWeight')}
            value={config.typography.fontWeight}
            onChange={(v) => handleTypographyUpdate('fontWeight', v)}
          />
          <Field
            label={FM('themeSettings.components.alertBadges.lineHeight')}
            value={config.typography.lineHeight}
            onChange={(v) => handleTypographyUpdate('lineHeight', v)}
          />
          <Field
            label={FM('themeSettings.components.alertBadges.letterSpacing')}
            value={config.typography.letterSpacing}
            onChange={(v) => handleTypographyUpdate('letterSpacing', v)}
          />
          <Field
            label={FM('themeSettings.components.alertBadges.textTransform')}
            value={config.typography.textTransform}
            onChange={(v) => handleTypographyUpdate('textTransform', v)}
          />
        </div>
      </div>
    </CollapsibleSection>
  );
};
