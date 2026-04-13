import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/api/axiosInstance';

import { KANBAN_API_BASE } from '../../../constants';

import type { KanbanTaskItem } from '../../../types';

interface CreateTaskPayload {
  title: string;
  summary: string;
  status: string;
  priority: string;
  assignee: string;
  tags: string;
  color: string;
  dueDate: string | null;
}

interface UpdateTaskPayload extends CreateTaskPayload {
  id: number;
}

async function fetchKanbanTasks(): Promise<KanbanTaskItem[]> {
  const response = await apiClient.get<KanbanTaskItem[]>(KANBAN_API_BASE);
  return response.data;
}

async function createKanbanTask(payload: CreateTaskPayload): Promise<KanbanTaskItem> {
  const response = await apiClient.post<KanbanTaskItem>(KANBAN_API_BASE, payload);
  return response.data;
}

async function updateKanbanTask(payload: UpdateTaskPayload): Promise<KanbanTaskItem> {
  const url = `${KANBAN_API_BASE}/${String(payload.id)}`;
  const response = await apiClient.put<KanbanTaskItem>(url, payload);
  return response.data;
}

async function deleteKanbanTask(id: number): Promise<void> {
  await apiClient.delete(`${KANBAN_API_BASE}/${String(id)}`);
}

const KANBAN_QUERY_KEY = ['kanban-tasks'] as const;

function useInvalidateKanban(): () => void {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: KANBAN_QUERY_KEY }).catch(() => undefined);
  };
}

interface UseKanbanTasksResult {
  tasks: KanbanTaskItem[];
  isLoading: boolean;
  createTask: ReturnType<typeof useMutation<KanbanTaskItem, Error, CreateTaskPayload>>;
  updateTask: ReturnType<typeof useMutation<KanbanTaskItem, Error, UpdateTaskPayload>>;
  removeTask: ReturnType<typeof useMutation<void, Error, number>>;
  invalidate: () => void;
}

/** Hook providing kanban task CRUD operations with cache invalidation. */
export function useKanbanTasks(): UseKanbanTasksResult {
  const invalidate = useInvalidateKanban();

  const { data, isLoading } = useQuery({
    queryKey: KANBAN_QUERY_KEY,
    queryFn: fetchKanbanTasks,
  });

  const createTask = useMutation({ mutationFn: createKanbanTask, onSuccess: invalidate });
  const updateTask = useMutation({ mutationFn: updateKanbanTask, onSuccess: invalidate });
  const removeTask = useMutation({ mutationFn: deleteKanbanTask, onSuccess: invalidate });

  return { tasks: data ?? [], isLoading, createTask, updateTask, removeTask, invalidate };
}
