import { GanttPriority } from './ganttPriority';

/** Priority options for the Gantt toolbar filter. */
export const PRIORITY_OPTIONS = [
  GanttPriority.Low,
  GanttPriority.Normal,
  GanttPriority.High,
  GanttPriority.Critical,
] as const;

/** Priority badge CSS classes per level. */
export const PRIORITY_COLORS: Record<string, string> = {
  [GanttPriority.Low]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [GanttPriority.Normal]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [GanttPriority.High]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  [GanttPriority.Critical]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

/** API base path for gantt tasks. */
export const GANTT_API_BASE = '/mockapi/api/gantt/tasks';
