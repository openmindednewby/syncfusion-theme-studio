import { FM } from '@/localization/utils/helpers';
import type { InputMessageConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';

interface InputMessageEditorProps {
  config: InputMessageConfig;
  onUpdate: (updates: Partial<InputMessageConfig>) => void;
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

export const InputMessageEditor = ({ config, onUpdate }: InputMessageEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.inputMessage.title')}>
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <ColorPicker
          label={FM('themeSettings.components.inputMessage.textColor')}
          value={config.textColor}
          onChange={(value) => onUpdate({ textColor: value })}
        />
        <ColorPicker
          label={FM('themeSettings.components.inputMessage.idleIconColor')}
          value={config.idleIconColor}
          onChange={(value) => onUpdate({ idleIconColor: value })}
        />
        <ColorPicker
          label={FM('themeSettings.components.inputMessage.validIconColor')}
          value={config.validIconColor}
          onChange={(value) => onUpdate({ validIconColor: value })}
        />
        <ColorPicker
          label={FM('themeSettings.components.inputMessage.invalidIconColor')}
          value={config.invalidIconColor}
          onChange={(value) => onUpdate({ invalidIconColor: value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Field
          label={FM('themeSettings.components.inputMessage.fontFamily')}
          value={config.fontFamily}
          onChange={(v) => onUpdate({ fontFamily: v })}
        />
        <Field
          label={FM('themeSettings.components.inputMessage.fontWeight')}
          value={config.fontWeight}
          onChange={(v) => onUpdate({ fontWeight: v })}
        />
        <Field
          label={FM('themeSettings.components.inputMessage.fontSizeS')}
          value={config.fontSizeS}
          onChange={(v) => onUpdate({ fontSizeS: v })}
        />
        <Field
          label={FM('themeSettings.components.inputMessage.lineHeightS')}
          value={config.lineHeightS}
          onChange={(v) => onUpdate({ lineHeightS: v })}
        />
        <Field
          label={FM('themeSettings.components.inputMessage.fontSizeM')}
          value={config.fontSizeM}
          onChange={(v) => onUpdate({ fontSizeM: v })}
        />
        <Field
          label={FM('themeSettings.components.inputMessage.lineHeightM')}
          value={config.lineHeightM}
          onChange={(v) => onUpdate({ lineHeightM: v })}
        />
        <Field
          label={FM('themeSettings.components.inputMessage.fontSizeL')}
          value={config.fontSizeL}
          onChange={(v) => onUpdate({ fontSizeL: v })}
        />
        <Field
          label={FM('themeSettings.components.inputMessage.lineHeightL')}
          value={config.lineHeightL}
          onChange={(v) => onUpdate({ lineHeightL: v })}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Field
          label={FM('themeSettings.components.inputMessage.gap')}
          value={config.gap}
          onChange={(v) => onUpdate({ gap: v })}
        />
        <Field
          label={FM('themeSettings.components.inputMessage.spacingTop')}
          value={config.spacingTop}
          onChange={(v) => onUpdate({ spacingTop: v })}
        />
        <Field
          label={FM('themeSettings.components.inputMessage.iconSize')}
          value={config.iconSize}
          onChange={(v) => onUpdate({ iconSize: v })}
        />
      </div>
    </div>
  </CollapsibleSection>
);
