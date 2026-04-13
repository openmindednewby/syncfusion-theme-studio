/**
 * Debounced number input filter for native table columns.
 */
import { useCallback } from 'react';

import { FM } from '@/localization/utils/helpers';

import useDebouncedFilter from '../hooks/useDebouncedFilter';

interface Props {
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
}

const NumberFilter = ({ field, value, onChange }: Props): JSX.Element => {
  const { localValue, handleChange } = useDebouncedFilter(field, value, onChange);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value);
    },
    [handleChange],
  );

  return (
    <input
      aria-label={FM('table.filterColumn', field)}
      className="native-grid-filter-input w-full rounded border px-2 py-1 text-xs text-text-primary placeholder:text-text-muted focus:outline-none"
      data-testid={`filter-number-${field}`}
      placeholder={FM('table.filterPlaceholder')}
      style={{ backgroundColor: 'var(--component-datagrid-filter-input-bg)', borderColor: 'var(--component-datagrid-filter-border)' }}
      type="number"
      value={localValue}
      onChange={onInputChange}
    />
  );
};

export default NumberFilter;
