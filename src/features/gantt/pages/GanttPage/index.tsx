import { memo, useCallback, useMemo, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { GanttToolbar } from './components/GanttToolbar';
import { GanttView } from './components/GanttView';
import { useGanttTasks } from './hooks/useGanttTasks';

import type { GanttTaskItem } from '../../types';

const GanttPage = memo((): JSX.Element => {
  const { tasks, isLoading, updateTask } = useGanttTasks();
  const [filterPriority, setFilterPriority] = useState('');

  const filteredTasks = useMemo(() => {
    if (filterPriority === '') return tasks;
    return tasks.filter((t) => t.priority === filterPriority);
  }, [tasks, filterPriority]);

  const handleTaskUpdate = useCallback(
    (task: GanttTaskItem) => {
      updateTask.mutate({
        id: task.id,
        taskName: task.taskName,
        startDate: task.startDate,
        endDate: task.endDate,
        duration: task.duration,
        progress: task.progress,
        parentTaskId: task.parentTaskId,
        dependencies: task.dependencies,
        assignee: task.assignee,
        priority: task.priority,
      });
    },
    [updateTask],
  );

  return (
    <div className="space-y-4" data-testid={TestIds.GANTT_PAGE}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">{FM('gantt.title')}</h1>
      </div>
      <GanttToolbar filterPriority={filterPriority} onFilterChange={setFilterPriority} />
      {isLoading && filteredTasks.length === 0 ? (
        <div className="py-12 text-center text-text-muted">{FM('common.loading')}</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <GanttView tasks={filteredTasks} onTaskUpdate={handleTaskUpdate} />
        </div>
      )}
    </div>
  );
});

GanttPage.displayName = 'GanttPage';

export default GanttPage;
