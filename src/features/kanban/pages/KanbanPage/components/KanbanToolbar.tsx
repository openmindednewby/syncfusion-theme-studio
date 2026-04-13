import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface KanbanToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddTask: () => void;
}

/** Toolbar with search input and add task button. */
export const KanbanToolbar = memo(
  ({ searchQuery, onSearchChange, onAddTask }: KanbanToolbarProps): JSX.Element => (
    <div className="flex items-center justify-between gap-4">
      <div className="relative max-w-xs flex-1">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
        <input
          aria-label={FM('kanban.searchPlaceholder')}
          className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          data-testid={TestIds.KANBAN_SEARCH}
          placeholder={FM('kanban.searchPlaceholder')}
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <button
        className="flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        data-testid={TestIds.KANBAN_ADD_BTN}
        type="button"
        onClick={onAddTask}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 5v14m-7-7h14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
        {FM('kanban.addTask')}
      </button>
    </div>
  ),
);

KanbanToolbar.displayName = 'KanbanToolbar';
