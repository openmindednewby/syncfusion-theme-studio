/** Shape of a kanban task returned from the API. */
export interface KanbanTaskItem {
  id: number;
  title: string;
  summary: string;
  status: string;
  priority: string;
  assignee: string;
  tags: string;
  color: string;
  createdAt: string;
  dueDate: string | null;
}
