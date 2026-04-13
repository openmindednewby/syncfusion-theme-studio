/**
 * Filter row container that renders the appropriate filter input
 * per column based on auto-detected or overridden column types.
 */
import { memo } from 'react';

import { ColumnType } from '@/lib/grid/types';

import BooleanFilter from './BooleanFilter';
import DateFilter from './DateFilter';
import NumberFilter from './NumberFilter';
import TextFilter from './TextFilter';

const CELL_PADDING_STYLE: React.CSSProperties = { padding: 'var(--component-datagrid-cell-padding)' };

interface Props {
  fields: string[];
  columnTypes: Record<string, ColumnType>;
  filterValues: Record<string, string>;
  onFilterChange: (field: string, value: string) => void;
  cellPadding: string;
}

const FilterRow = ({
  fields,
  columnTypes,
  filterValues,
  onFilterChange,
  cellPadding,
}: Props): JSX.Element => (
  <tr
    className="border-b"
    data-testid="filter-row"
    style={{ backgroundColor: 'var(--component-datagrid-filter-bg)', borderColor: 'var(--component-datagrid-filter-border)' }}
  >
    {fields.map((field) => {
      const type = columnTypes[field] ?? ColumnType.String;
      const value = filterValues[field] ?? '';

      return (
        <td key={field} className={cellPadding} style={CELL_PADDING_STYLE}>
          {type === ColumnType.Boolean && (
            <BooleanFilter field={field} value={value} onChange={onFilterChange} />
          )}
          {type === ColumnType.Number && (
            <NumberFilter field={field} value={value} onChange={onFilterChange} />
          )}
          {type === ColumnType.Date && (
            <DateFilter field={field} value={value} onChange={onFilterChange} />
          )}
          {type === ColumnType.String && (
            <TextFilter field={field} value={value} onChange={onFilterChange} />
          )}
        </td>
      );
    })}
  </tr>
);

export default memo(FilterRow);
