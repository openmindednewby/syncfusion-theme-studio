/**
 * Native date input filter for table columns.
 */
import { useCallback } from 'react';

import { FM } from '@/localization/utils/helpers';

interface Props {
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
}

const DateFilter = ({ field, value, onChange }: Props): JSX.Element => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(field, e.target.value);
    },
    [field, onChange],
  );

  return (
    <input
      aria-label={FM('table.filterColumn', field)}
      className="native-grid-filter-input w-full rounded border px-2 py-1 text-xs text-text-primary focus:outline-none"
      data-testid={`filter-date-${field}`}
      style={{ backgroundColor: 'var(--component-datagrid-filter-input-bg)', borderColor: 'var(--component-datagrid-filter-border)' }}
      type="date"
      value={value}
      onChange={handleChange}
    />
  );
};

export default DateFilter;
