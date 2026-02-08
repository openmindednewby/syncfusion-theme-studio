import { useState, useCallback, useRef, type ChangeEvent } from 'react';

import { FM } from '@/localization/helpers';
import type { ShadowConfig } from '@/stores/theme/types';

const SHADOW_KEYS: Array<keyof ShadowConfig> = [
  'none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl',
];

const DEBOUNCE_MS = 300;

interface ShadowInputRowProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ShadowInputRow = ({ label, onChange, value }: ShadowInputRowProps): JSX.Element => {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onChange(newValue);
      }, DEBOUNCE_MS);
    },
    [onChange]
  );

  return (
    <div className="space-y-1 rounded bg-surface-sunken p-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary">{label}</span>
        <div
          aria-label={`Shadow preview for ${label}`}
          className="h-4 w-12 rounded border border-border bg-surface"
          style={{ boxShadow: localValue }}
        />
      </div>
      <textarea
        aria-label={`Edit shadow ${label}`}
        className="w-full resize-none rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary focus:border-primary-500 focus:outline-none"
        placeholder="e.g., 0 1px 2px rgba(0,0,0,0.1)"
        rows={2}
        value={localValue}
        onChange={handleChange}
      />
    </div>
  );
};

interface ShadowsEditorProps {
  shadows: ShadowConfig;
  onChange: (key: keyof ShadowConfig, value: string) => void;
}

export const ShadowsEditor = ({ onChange, shadows }: ShadowsEditorProps): JSX.Element => {
  return (
    <div className="space-y-2">
      <h5 className="text-xs font-medium text-text-secondary">
        {FM('themeSettings.layout.shadows')}
      </h5>
      <div className="space-y-2">
        {SHADOW_KEYS.map((key) => (
          <ShadowInputRow
            key={key}
            label={key}
            value={shadows[key]}
            onChange={(value) => onChange(key, value)}
          />
        ))}
      </div>
    </div>
  );
};
