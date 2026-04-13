import { KanbanPriority } from './kanbanPriority';
import { KanbanStatus } from './kanbanStatus';

/** Column configuration for the kanban board. */
export const KANBAN_COLUMNS = [
  { headerText: 'kanban.columns.backlog', keyField: KanbanStatus.Backlog },
  { headerText: 'kanban.columns.inProgress', keyField: KanbanStatus.InProgress },
  { headerText: 'kanban.columns.review', keyField: KanbanStatus.Review },
  { headerText: 'kanban.columns.done', keyField: KanbanStatus.Done },
] as const;

/** WIP limits per column (0 = unlimited). */
export const WIP_LIMITS: Record<string, number> = {
  [KanbanStatus.Backlog]: 0,
  [KanbanStatus.InProgress]: 5,
  [KanbanStatus.Review]: 3,
  [KanbanStatus.Done]: 0,
};

/** Priority options for the task dialog. */
export const PRIORITY_OPTIONS = [
  KanbanPriority.Low,
  KanbanPriority.Normal,
  KanbanPriority.High,
  KanbanPriority.Critical,
] as const;

/** Status options for the task dialog. */
export const STATUS_OPTIONS = [
  KanbanStatus.Backlog,
  KanbanStatus.InProgress,
  KanbanStatus.Review,
  KanbanStatus.Done,
] as const;

/** Colors associated with each priority level. */
export const PRIORITY_COLORS: Record<string, string> = {
  [KanbanPriority.Low]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [KanbanPriority.Normal]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [KanbanPriority.High]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  [KanbanPriority.Critical]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

/** API base path for kanban tasks. */
export const KANBAN_API_BASE = '/mockapi/api/kanban/tasks';
