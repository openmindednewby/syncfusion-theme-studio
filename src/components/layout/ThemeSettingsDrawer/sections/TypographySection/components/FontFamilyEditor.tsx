import { type ChangeEvent } from 'react';

import { useDebouncedInput } from '@/hooks/useDebouncedInput';
import { FM } from '@/localization/utils/helpers';
import { FontFamilyType } from '@/stores/theme/types';

const DEBOUNCE_MS = 300;

interface FontOption {
  label: string;
  value: string;
}

const SANS_FONT_OPTIONS: FontOption[] = [
  { label: 'System Default', value: "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'" },
  { label: 'Inter', value: "'Inter', sans-serif" },
  { label: 'Roboto', value: "'Roboto', sans-serif" },
  { label: 'Open Sans', value: "'Open Sans', sans-serif" },
  { label: 'Lato', value: "'Lato', sans-serif" },
  { label: 'Poppins', value: "'Poppins', sans-serif" },
  { label: 'Nunito', value: "'Nunito', sans-serif" },
  { label: 'Montserrat', value: "'Montserrat', sans-serif" },
  { label: 'Source Sans 3', value: "'Source Sans 3', sans-serif" },
  { label: 'Raleway', value: "'Raleway', sans-serif" },
  { label: 'PT Sans', value: "'PT Sans', sans-serif" },
  { label: 'Noto Sans', value: "'Noto Sans', sans-serif" },
  { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Georgia', value: "Georgia, 'Times New Roman', serif" },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
];

const MONO_FONT_OPTIONS: FontOption[] = [
  { label: 'System Monospace', value: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' },
  { label: 'JetBrains Mono', value: "'JetBrains Mono', monospace" },
  { label: 'Fira Code', value: "'Fira Code', monospace" },
  { label: 'Source Code Pro', value: "'Source Code Pro', monospace" },
  { label: 'IBM Plex Mono', value: "'IBM Plex Mono', monospace" },
  { label: 'Courier New', value: "'Courier New', Courier, monospace" },
];

interface FontFamilySelectProps {
  label: string;
  onChange: (value: string) => void;
  options: FontOption[];
  value: string;
}

const FontFamilySelect = ({
  label,
  onChange,
  options,
  value,
}: FontFamilySelectProps): JSX.Element => {
  const { localValue, handleChange } = useDebouncedInput(value, onChange, DEBOUNCE_MS);

  const isCustomValue = !options.some((opt) => opt.value === localValue);

  return (
    <div className="flex items-center justify-between gap-2 rounded bg-surface-sunken px-3 py-2">
      <span className="text-xs font-medium text-text-secondary">{label}</span>
      <select
        aria-label={`Edit ${label}`}
        className="w-40 rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary focus:border-primary-500 focus:outline-none"
        value={isCustomValue ? '' : localValue}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(e.target.value)}
      >
        {isCustomValue ? <option style={{ fontFamily: localValue }} value="">
            {FM('themeSettings.typography.customFont')}
          </option> : null}
        {options.map((opt) => (
          <option key={opt.label} style={{ fontFamily: opt.value }} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

interface FontFamilyEditorProps {
  fontMono: string;
  fontSans: string;
  onUpdateFontFamily: (type: FontFamilyType, value: string) => void;
}

export const FontFamilyEditor = ({
  fontMono,
  fontSans,
  onUpdateFontFamily,
}: FontFamilyEditorProps): JSX.Element => (
  <div className="space-y-2">
    <h5 className="text-xs font-medium text-text-secondary">
      {FM('themeSettings.typography.fontFamily')}
    </h5>
    <div className="space-y-2">
      <FontFamilySelect
        label={FM('themeSettings.typography.fontFamilySans')}
        options={SANS_FONT_OPTIONS}
        value={fontSans}
        onChange={(value) => onUpdateFontFamily(FontFamilyType.Sans, value)}
      />
      <FontFamilySelect
        label={FM('themeSettings.typography.fontFamilyMono')}
        options={MONO_FONT_OPTIONS}
        value={fontMono}
        onChange={(value) => onUpdateFontFamily(FontFamilyType.Mono, value)}
      />
    </div>
  </div>
);
