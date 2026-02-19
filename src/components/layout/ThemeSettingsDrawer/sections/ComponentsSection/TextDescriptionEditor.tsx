import { FM } from '@/localization/helpers';
import type { TextDescriptionConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface TextDescriptionEditorProps {
  config: TextDescriptionConfig;
  onUpdate: (updates: Partial<TextDescriptionConfig>) => void;
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

export const TextDescriptionEditor = ({ config, onUpdate }: TextDescriptionEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.textDescription.title')}>
    <div className="space-y-3">
      <ColorPicker
        label={FM('themeSettings.components.textDescription.textColor')}
        value={config.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
      />
      <div className="grid grid-cols-2 gap-2">
        <Field
          label={FM('themeSettings.components.textDescription.fontFamily')}
          value={config.fontFamily}
          onChange={(v) => onUpdate({ fontFamily: v })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.fontSize')}
          value={config.fontSize}
          onChange={(v) => onUpdate({ fontSize: v })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.fontWeight')}
          value={config.fontWeight}
          onChange={(v) => onUpdate({ fontWeight: v })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.lineHeight')}
          value={config.lineHeight}
          onChange={(v) => onUpdate({ lineHeight: v })}
        />
        <Field
          label={FM('themeSettings.components.textDescription.letterSpacing')}
          value={config.letterSpacing}
          onChange={(v) => onUpdate({ letterSpacing: v })}
        />
      </div>
    </div>
  </CollapsibleSection>
);
