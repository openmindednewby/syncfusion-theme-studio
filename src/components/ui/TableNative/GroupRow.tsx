/**
 * GroupRow renders a collapsible group header row within the table.
 *
 * Shows the group field name, value, item count, and a toggle button
 * for expanding/collapsing the group's child rows.
 */
import { memo, useCallback } from 'react';

import { FM } from '@/localization/helpers';
import { cn } from '@/utils/cn';

const COLLAPSE_ICON = '\u25B6';
const EXPAND_ICON = '\u25BC';

interface Props {
  groupKey: string;
  field: string;
  value: unknown;
  count: number;
  isCollapsed: boolean;
  level: number;
  colSpan: number;
  onToggle: (groupKey: string) => void;
}

const INDENT_PER_LEVEL = 24;

const GroupRow = ({
  groupKey,
  field,
  value,
  count,
  isCollapsed,
  level,
  colSpan,
  onToggle,
}: Props): JSX.Element => {
  const handleToggle = useCallback(() => {
    onToggle(groupKey);
  }, [groupKey, onToggle]);

  const indentPx = level * INDENT_PER_LEVEL;
  const icon = isCollapsed ? COLLAPSE_ICON : EXPAND_ICON;

  return (
    <tr
      className="border-b"
      data-testid={`group-row-${groupKey}`}
      style={{
        backgroundColor: 'var(--component-datagrid-group-header-bg)',
        borderColor: 'var(--component-datagrid-cell-border)',
      }}
    >
      <td className="px-4 py-2" colSpan={colSpan}>
        <button
          aria-expanded={!isCollapsed}
          aria-label={FM('table.toggleGroup', String(value))}
          className={cn(
            'flex items-center gap-2 text-left',
            'hover:text-primary-500 transition-colors',
          )}
          data-testid={`group-toggle-${groupKey}`}
          style={{ paddingLeft: `${String(indentPx)}px` }}
          type="button"
          onClick={handleToggle}
        >
          <span aria-hidden="true" className="text-xs">
            {icon}
          </span>
          <span
            className="font-medium"
            style={{ color: 'var(--component-datagrid-group-header-text)' }}
          >
            {field}:
            {' '}
            {String(value)}
          </span>
          <span className="text-text-muted text-sm">
            ({FM('table.groupItemCount', String(count))})
          </span>
        </button>
      </td>
    </tr>
  );
};

export default memo(GroupRow);
