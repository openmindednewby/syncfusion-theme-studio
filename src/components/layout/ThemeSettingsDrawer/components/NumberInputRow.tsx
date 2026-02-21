import { type ChangeEvent } from 'react';

import { useDebouncedInput } from '@/hooks/useDebouncedInput';
import { isValueDefined } from '@/utils/is';

const DEBOUNCE_MS = 300;

interface NumberInputRowProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}

export const NumberInputRow = ({
  label,
  max,
  min,
  onChange,
  step = 1,
  suffix,
  value,
}: NumberInputRowProps): JSX.Element => {
  const { localValue, handleChange } = useDebouncedInput(value, onChange, DEBOUNCE_MS);

  return (
    <div className="flex items-center justify-between gap-2 rounded bg-surface-sunken px-3 py-2">
      <span className="text-xs font-medium text-text-secondary">{label}</span>
      <div className="flex items-center gap-1">
        <input
          aria-label={`Edit ${label}`}
          className="w-16 rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary focus:border-primary-500 focus:outline-none"
          max={max}
          min={min}
          step={step}
          type="number"
          value={localValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(Number(e.target.value))}
        />
        {isValueDefined(suffix) && suffix !== '' && (
          <span className="text-xs text-text-muted">{suffix}</span>
        )}
      </div>
    </div>
  );
};
