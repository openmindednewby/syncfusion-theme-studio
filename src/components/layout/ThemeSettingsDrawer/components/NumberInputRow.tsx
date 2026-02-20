import { useState, useCallback, useRef, type ChangeEvent } from 'react';

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
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      setLocalValue(newValue);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onChange(newValue);
      }, DEBOUNCE_MS);
    },
    [onChange]
  );

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
          onChange={handleChange}
        />
        {isValueDefined(suffix) && suffix !== '' && (
          <span className="text-xs text-text-muted">{suffix}</span>
        )}
      </div>
    </div>
  );
};
