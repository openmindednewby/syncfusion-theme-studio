/** Shape of a Gantt task returned from the API. */
export interface GanttTaskItem {
  id: number;
  taskName: string;
  startDate: string;
  endDate: string;
  duration: number;
  progress: number;
  parentTaskId: number | null;
  dependencies: string | null;
  assignee: string;
  priority: string;
}
