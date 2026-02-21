import { useState, useCallback, useRef, useEffect } from 'react';

interface UseDebouncedInputResult<T> {
  localValue: T;
  handleChange: (newValue: T) => void;
}

/**
 * Generic hook for debounced input: maintains local state for instant
 * visual feedback while delaying the `onChange` callback until the user
 * stops typing for `delayMs` milliseconds.
 *
 * - Syncs local state when the external `value` changes.
 * - Clears any pending timeout on each new change and on unmount.
 */
export function useDebouncedInput<T>(
  value: T,
  onChange: (value: T) => void,
  delayMs: number,
): UseDebouncedInputResult<T> {
  const [localValue, setLocalValue] = useState<T>(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Sync local state when the external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Cleanup pending timeout on unmount
  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const handleChange = useCallback(
    (newValue: T) => {
      setLocalValue(newValue);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onChange(newValue);
      }, delayMs);
    },
    [onChange, delayMs],
  );

  return { localValue, handleChange };
}
