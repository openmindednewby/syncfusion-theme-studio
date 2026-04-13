import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils';

import { PriorityBadge } from './PriorityBadge';

import type { KanbanTaskItem } from '../../../types';

interface TaskCardProps {
  task: KanbanTaskItem;
  onEdit: (task: KanbanTaskItem) => void;
  onDelete: (id: number) => void;
}

function formatDueDate(dueDate: string | null): string {
  if (!isValueDefined(dueDate)) return '';
  const date = new Date(dueDate);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function parseTags(tags: string): string[] {
  if (tags === '') return [];
  return tags.split(',').map((tag) => tag.trim());
}

/** Custom card template for kanban tasks showing title, assignee, priority, tags, and due date. */
export const TaskCard = memo(({ task, onEdit, onDelete }: TaskCardProps): JSX.Element => {
  const tagList = parseTags(task.tags);
  const dueLabel = formatDueDate(task.dueDate);

  return (
    <div
      className="rounded-lg border border-border bg-surface p-3 shadow-sm transition-shadow hover:shadow-md"
      data-testid={`kanban-card-${String(task.id)}`}
    >
      <div className="mb-2 flex items-start justify-between">
        <h2 className="text-sm font-semibold text-text-primary">{task.title}</h2>
        <div className="flex gap-1">
          <button
            aria-label={FM('kanban.editTask')}
            className="rounded p-1 text-text-muted hover:bg-surface-hover hover:text-text-primary"
            title={FM('kanban.editTask')}
            type="button"
            onClick={() => onEdit(task)}
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
              <path
                d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
          <button
            aria-label={FM('kanban.deleteTask')}
            className="rounded p-1 text-text-muted hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
            title={FM('kanban.deleteTask')}
            type="button"
            onClick={() => onDelete(task.id)}
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
        </div>
      </div>

      <p className="mb-2 line-clamp-2 text-xs text-text-muted">{task.summary}</p>

      <div className="mb-2 flex flex-wrap gap-1">
        {tagList.map((tag) => (
          <span
            key={tag}
            className="rounded bg-surface-hover px-1.5 py-0.5 text-[10px] text-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <PriorityBadge priority={task.priority} />
        <div className="flex items-center gap-2">
          {dueLabel !== '' ? (
            <span className="text-[10px] text-text-muted">{dueLabel}</span>
          ) : null}
          <span
            className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-[10px] font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-200"
            title={task.assignee}
          >
            {task.assignee
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
});

TaskCard.displayName = 'TaskCard';
