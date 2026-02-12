/**
 * Boolean select filter for native table columns.
 * Options: All / True / False
 */
import { useCallback } from 'react';

import { FM } from '@/localization/helpers';

interface Props {
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
}

const BooleanFilter = ({ field, value, onChange }: Props): JSX.Element => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(field, e.target.value);
    },
    [field, onChange],
  );

  return (
    <select
      aria-label={FM('table.filterColumn', field)}
      className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary focus:border-primary-500 focus:outline-none"
      data-testid={`filter-boolean-${field}`}
      value={value}
      onChange={handleChange}
    >
      <option value="">{FM('table.filterAll')}</option>
      <option value="true">{FM('common.yes')}</option>
      <option value="false">{FM('common.no')}</option>
    </select>
  );
};

export default BooleanFilter;
