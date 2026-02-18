import { FM } from '@/localization/helpers';
import type { AlertBadgesConfig, BadgeTypography } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';

interface AlertBadgesEditorProps {
  config: AlertBadgesConfig;
  onUpdate: (updates: Partial<AlertBadgesConfig>) => void;
}

const inputClasses = 'w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary';

interface TypographyFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TypographyField = ({ label, value, onChange }: TypographyFieldProps): JSX.Element => (
  <div className="space-y-1">
    <span className="text-[10px] text-text-muted">{label}</span>
    <input
      className={inputClasses}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const AlertBadgesEditor = ({ config, onUpdate }: AlertBadgesEditorProps): JSX.Element => {
  const handleTypographyUpdate = (field: keyof BadgeTypography, value: string): void => {
    onUpdate({ typography: { ...config.typography, [field]: value } });
  };

  return (
    <CollapsibleSection title={FM('themeSettings.components.alertBadges.title')}>
      <div className="space-y-2">
        <p className="text-xs text-text-muted">
          {FM('themeSettings.components.alertBadges.description')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <TypographyField
            label={FM('themeSettings.components.alertBadges.fontFamily')}
            value={config.typography.fontFamily}
            onChange={(v) => handleTypographyUpdate('fontFamily', v)}
          />
          <TypographyField
            label={FM('themeSettings.components.alertBadges.fontSize')}
            value={config.typography.fontSize}
            onChange={(v) => handleTypographyUpdate('fontSize', v)}
          />
          <TypographyField
            label={FM('themeSettings.components.alertBadges.fontWeight')}
            value={config.typography.fontWeight}
            onChange={(v) => handleTypographyUpdate('fontWeight', v)}
          />
          <TypographyField
            label={FM('themeSettings.components.alertBadges.lineHeight')}
            value={config.typography.lineHeight}
            onChange={(v) => handleTypographyUpdate('lineHeight', v)}
          />
          <TypographyField
            label={FM('themeSettings.components.alertBadges.letterSpacing')}
            value={config.typography.letterSpacing}
            onChange={(v) => handleTypographyUpdate('letterSpacing', v)}
          />
        </div>
      </div>
    </CollapsibleSection>
  );
};
