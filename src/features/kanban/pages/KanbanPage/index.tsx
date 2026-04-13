import { memo, useCallback, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

import { KanbanBoard } from './components/KanbanBoard';
import { KanbanToolbar } from './components/KanbanToolbar';
import { TaskDialog } from './components/TaskDialog';
import { useKanbanTasks } from './hooks/useKanbanTasks';

import type { TaskFormData } from './components/TaskDialog';
import type { KanbanTaskItem } from '../../types';

const KanbanPage = memo((): JSX.Element => {
  const { tasks, isLoading, createTask, updateTask, removeTask } = useKanbanTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState<KanbanTaskItem | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleAddTask = useCallback(() => {
    setEditingTask(null);
    setShowDialog(true);
  }, []);

  const handleEditTask = useCallback((task: KanbanTaskItem) => {
    setEditingTask(task);
    setShowDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setShowDialog(false);
    setEditingTask(null);
  }, []);

  const handleSave = useCallback(
    (data: TaskFormData) => {
      if (isValueDefined(editingTask)) 
        updateTask.mutate({ id: editingTask.id, ...data }, { onSuccess: handleCloseDialog });
       else 
        createTask.mutate(data, { onSuccess: handleCloseDialog });
      
    },
    [editingTask, updateTask, createTask, handleCloseDialog],
  );

  const handleDelete = useCallback(
    (id: number) => {
      removeTask.mutate(id);
    },
    [removeTask],
  );

  const handleStatusChange = useCallback(
    (taskId: number, newStatus: string) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!isValueDefined(task)) return;
      updateTask.mutate({
        id: task.id,
        title: task.title,
        summary: task.summary,
        status: newStatus,
        priority: task.priority,
        assignee: task.assignee,
        tags: task.tags,
        color: task.color,
        dueDate: task.dueDate,
      });
    },
    [tasks, updateTask],
  );

  return (
    <div className="space-y-4" data-testid={TestIds.KANBAN_PAGE}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">{FM('kanban.title')}</h1>
      </div>
      <KanbanToolbar
        searchQuery={searchQuery}
        onAddTask={handleAddTask}
        onSearchChange={setSearchQuery}
      />
      {isLoading ? (
        <div className="py-12 text-center text-text-muted">{FM('common.loading')}</div>
      ) : (
        <KanbanBoard
          searchQuery={searchQuery}
          tasks={tasks}
          onDelete={handleDelete}
          onEdit={handleEditTask}
          onStatusChange={handleStatusChange}
        />
      )}
      {showDialog ? (
        <TaskDialog task={editingTask} onClose={handleCloseDialog} onSave={handleSave} />
      ) : null}
    </div>
  );
});

KanbanPage.displayName = 'KanbanPage';

export default KanbanPage;
