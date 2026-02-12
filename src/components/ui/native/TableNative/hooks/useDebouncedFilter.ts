/**
 * Hook that debounces filter value changes.
 * Maintains local state for instant visual feedback while delaying
 * the actual onFilterChange callback until the user stops typing.
 */
import { useState, useEffect, useCallback } from 'react';

const FILTER_DEBOUNCE_MS = 300;

interface UseDebouncedFilterResult {
  localValue: string;
  handleChange: (nextValue: string) => void;
}

const useDebouncedFilter = (
  field: string,
  externalValue: string,
  onChange: (field: string, value: string) => void,
): UseDebouncedFilterResult => {
  const [localValue, setLocalValue] = useState(externalValue);

  // Sync local state when the external value changes (e.g. filters cleared)
  useEffect(() => {
    setLocalValue(externalValue);
  }, [externalValue]);

  // Debounce the onChange callback
  useEffect(() => {
    if (localValue === externalValue) return undefined;

    const timer = window.setTimeout(() => {
      onChange(field, localValue);
    }, FILTER_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [localValue, field, externalValue, onChange]);

  const handleChange = useCallback((nextValue: string) => {
    setLocalValue(nextValue);
  }, []);

  return { localValue, handleChange };
};

export default useDebouncedFilter;
export { FILTER_DEBOUNCE_MS };
