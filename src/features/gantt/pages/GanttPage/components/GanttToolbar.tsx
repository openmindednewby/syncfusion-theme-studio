import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { PRIORITY_COLORS } from '../../../constants';

interface GanttToolbarProps {
  filterPriority: string;
  onFilterChange: (priority: string) => void;
}

const ALL_PRIORITY = '';

/** Filter toolbar for Gantt page priority filtering. */
export const GanttToolbar = memo(
  ({ filterPriority, onFilterChange }: GanttToolbarProps): JSX.Element => {
    const priorityKeys = Object.keys(PRIORITY_COLORS);

    return (
      <div className="flex items-center gap-3" data-testid={TestIds.GANTT_TOOLBAR}>
        <span className="text-sm font-medium text-text-secondary">
          {FM('gantt.filterByPriority')}
        </span>
        <button
          className={`rounded-md px-3 py-1 text-sm transition-colors ${
            filterPriority === ALL_PRIORITY
              ? 'bg-primary text-white'
              : 'bg-surface-alt text-text-secondary hover:bg-surface-hover'
          }`}
          data-testid={TestIds.GANTT_FILTER_ALL}
          type="button"
          onClick={() => onFilterChange(ALL_PRIORITY)}
        >
          {FM('common.all')}
        </button>
        {priorityKeys.map((priority) => (
          <button
            key={priority}
            className={`rounded-md px-3 py-1 text-sm transition-colors ${
              filterPriority === priority
                ? 'bg-primary text-white'
                : 'bg-surface-alt text-text-secondary hover:bg-surface-hover'
            }`}
            type="button"
            onClick={() => onFilterChange(priority)}
          >
            {priority}
          </button>
        ))}
      </div>
    );
  },
);

GanttToolbar.displayName = 'GanttToolbar';
