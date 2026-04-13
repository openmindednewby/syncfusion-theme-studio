import { type ChangeEvent } from 'react';

import { useDebouncedInput } from '@/hooks/useDebouncedInput';

const DEBOUNCE_MS = 300;

interface TextInputRowProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TextInputRow = ({
  label,
  onChange,
  placeholder,
  value,
}: TextInputRowProps): JSX.Element => {
  const { localValue, handleChange } = useDebouncedInput(value, onChange, DEBOUNCE_MS);

  return (
    <div className="flex items-center justify-between gap-2 rounded bg-surface-sunken px-3 py-2">
      <span className="text-xs font-medium text-text-secondary">{label}</span>
      <input
        aria-label={`Edit ${label}`}
        className="w-32 rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary focus:border-primary-500 focus:outline-none"
        placeholder={placeholder}
        type="text"
        value={localValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
      />
    </div>
  );
};
