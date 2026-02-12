/**
 * GroupDropArea provides a drag-and-drop target zone for grouping columns.
 *
 * Users can drag column headers to this area to add them as group-by fields.
 * Displays active group chips with remove buttons.
 */
import { memo, useCallback, useState } from 'react';

import { FM } from '@/localization/helpers';
import { cn } from '@/utils/cn';

const DROP_AREA_ACTIVE_BG = 'bg-primary-500/10';
const REMOVE_ICON = '\u2715';

interface Props {
  groupColumns: string[];
  onRemoveGroup: (field: string) => void;
  onAddGroup: (field: string) => void;
}

const GroupDropArea = ({ groupColumns, onRemoveGroup, onAddGroup }: Props): JSX.Element => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const field = e.dataTransfer.getData('text/plain');
      if (field !== '') onAddGroup(field);
    },
    [onAddGroup],
  );

  const hasGroups = groupColumns.length > 0;

  return (
    <div
      aria-label={FM('table.groupDropHint')}
      className={cn(
        'flex min-h-[40px] flex-wrap items-center gap-2 border-b px-4 py-2',
        'transition-colors',
        isDragOver && DROP_AREA_ACTIVE_BG,
        !hasGroups && 'text-text-muted text-sm',
      )}
      data-testid="group-drop-area"
      role="listbox"
      style={{ borderColor: 'var(--component-datagrid-cell-border)' }}
      tabIndex={0}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {hasGroups ? (
        groupColumns.map((field) => (
          <span
            key={field}
            className="inline-flex items-center gap-1 rounded-full bg-primary-500/20 px-3 py-1 text-xs font-medium text-primary-700"
            data-testid={`group-chip-${field}`}
          >
            {field}
            <button
              aria-label={FM('table.removeGroup', field)}
              className="ml-1 rounded-full hover:bg-primary-500/30 p-0.5 transition-colors"
              data-testid={`group-remove-${field}`}
              type="button"
              onClick={() => onRemoveGroup(field)}
            >
              {REMOVE_ICON}
            </button>
          </span>
        ))
      ) : (
        <span>{FM('table.groupDropHint')}</span>
      )}
    </div>
  );
};

export default memo(GroupDropArea);
