import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/api/axiosInstance';

import { GANTT_API_BASE } from '../../../constants';
import { SAMPLE_GANTT_TASKS } from '../../../data/sampleGanttTasks';

import type { GanttTaskItem } from '../../../types';

interface UpdateTaskPayload {
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

async function fetchGanttTasks(): Promise<GanttTaskItem[]> {
  const response = await apiClient.get<GanttTaskItem[]>(GANTT_API_BASE);
  return response.data;
}

async function updateGanttTask(payload: UpdateTaskPayload): Promise<GanttTaskItem> {
  const url = `${GANTT_API_BASE}/${String(payload.id)}`;
  const response = await apiClient.put<GanttTaskItem>(url, payload);
  return response.data;
}

const GANTT_QUERY_KEY = ['gantt-tasks'] as const;

function useInvalidateGantt(): () => void {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: GANTT_QUERY_KEY }).catch(() => undefined);
  };
}

interface UseGanttTasksResult {
  tasks: GanttTaskItem[];
  isLoading: boolean;
  isError: boolean;
  updateTask: ReturnType<typeof useMutation<GanttTaskItem, Error, UpdateTaskPayload>>;
}

/** Hook providing Gantt task query and update mutation with cache invalidation. */
export function useGanttTasks(): UseGanttTasksResult {
  const invalidate = useInvalidateGantt();

  const { data, isLoading, isError } = useQuery({
    queryKey: GANTT_QUERY_KEY,
    queryFn: fetchGanttTasks,
    placeholderData: SAMPLE_GANTT_TASKS,
    retry: 1,
  });

  const updateTask = useMutation({ mutationFn: updateGanttTask, onSuccess: invalidate });

  return { tasks: data ?? SAMPLE_GANTT_TASKS, isLoading, isError, updateTask };
}
