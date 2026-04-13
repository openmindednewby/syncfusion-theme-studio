import { FM } from '@/localization/utils/helpers';
import type { ExternalLinkConfig, ExternalLinkTypography } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface ExternalLinkEditorProps {
  config: ExternalLinkConfig;
  onUpdate: (updates: Partial<ExternalLinkConfig>) => void;
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

export const ExternalLinkEditor = ({ config, onUpdate }: ExternalLinkEditorProps): JSX.Element => {
  const handleTypographyUpdate = (field: keyof ExternalLinkTypography, value: string): void => {
    onUpdate({ typography: { ...config.typography, [field]: value } });
  };

  return (
    <CollapsibleSection title={FM('themeSettings.components.externalLink.title')}>
      <div className="space-y-4">
        <p className="text-xs text-text-muted">
          {FM('themeSettings.components.externalLink.description')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <ColorPicker
            label={FM('themeSettings.components.externalLink.textColor')}
            value={config.textColor}
            onChange={(value) => onUpdate({ textColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.externalLink.iconColor')}
            value={config.iconColor}
            onChange={(value) => onUpdate({ iconColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.externalLink.hoverTextColor')}
            value={config.hoverTextColor}
            onChange={(value) => onUpdate({ hoverTextColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.externalLink.hoverIconColor')}
            value={config.hoverIconColor}
            onChange={(value) => onUpdate({ hoverIconColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.externalLink.disabledTextColor')}
            value={config.disabledTextColor}
            onChange={(value) => onUpdate({ disabledTextColor: value })}
          />
          <ColorPicker
            label={FM('themeSettings.components.externalLink.disabledIconColor')}
            value={config.disabledIconColor}
            onChange={(value) => onUpdate({ disabledIconColor: value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field
            label={FM('themeSettings.components.externalLink.fontFamily')}
            value={config.typography.fontFamily}
            onChange={(v) => handleTypographyUpdate('fontFamily', v)}
          />
          <Field
            label={FM('themeSettings.components.externalLink.fontSize')}
            value={config.typography.fontSize}
            onChange={(v) => handleTypographyUpdate('fontSize', v)}
          />
          <Field
            label={FM('themeSettings.components.externalLink.fontWeight')}
            value={config.typography.fontWeight}
            onChange={(v) => handleTypographyUpdate('fontWeight', v)}
          />
          <Field
            label={FM('themeSettings.components.externalLink.lineHeight')}
            value={config.typography.lineHeight}
            onChange={(v) => handleTypographyUpdate('lineHeight', v)}
          />
          <Field
            label={FM('themeSettings.components.externalLink.letterSpacing')}
            value={config.typography.letterSpacing}
            onChange={(v) => handleTypographyUpdate('letterSpacing', v)}
          />
          <Field
            label={FM('themeSettings.components.externalLink.textDecoration')}
            value={config.textDecoration}
            onChange={(v) => onUpdate({ textDecoration: v })}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Field
            label={FM('themeSettings.components.externalLink.gap')}
            value={config.gap}
            onChange={(v) => onUpdate({ gap: v })}
          />
          <Field
            label={FM('themeSettings.components.externalLink.iconSize')}
            value={config.iconSize}
            onChange={(v) => onUpdate({ iconSize: v })}
          />
          <Field
            label={FM('themeSettings.components.externalLink.transitionDuration')}
            value={config.transitionDuration}
            onChange={(v) => onUpdate({ transitionDuration: v })}
          />
        </div>
      </div>
    </CollapsibleSection>
  );
};
