import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/api/axiosInstance';

import { CALENDAR_API_URL, CALENDAR_EVENTS_QUERY_KEY } from '../../../constants';

import type { CalendarEventDto, CalendarEventRequest } from '../../../types';
import type { AxiosResponse } from 'axios';

async function fetchCalendarEvents(): Promise<CalendarEventDto[]> {
  const response: AxiosResponse<CalendarEventDto[]> = await apiClient.get(CALENDAR_API_URL);
  return response.data;
}

async function createCalendarEvent(data: CalendarEventRequest): Promise<CalendarEventDto> {
  const response: AxiosResponse<CalendarEventDto> = await apiClient.post(CALENDAR_API_URL, data);
  return response.data;
}

async function updateCalendarEvent(vars: { id: number; data: CalendarEventRequest }): Promise<CalendarEventDto> {
  const response: AxiosResponse<CalendarEventDto> = await apiClient.put(
    `${CALENDAR_API_URL}/${vars.id}`,
    vars.data,
  );
  return response.data;
}

async function deleteCalendarEvent(id: number): Promise<void> {
  await apiClient.delete(`${CALENDAR_API_URL}/${id}`);
}

export interface UseCalendarEventsReturn {
  events: CalendarEventDto[];
  isLoading: boolean;
  isError: boolean;
  createEvent: (data: CalendarEventRequest) => void;
  updateEvent: (id: number, data: CalendarEventRequest) => void;
  deleteEvent: (id: number) => void;
}

export function useCalendarEvents(): UseCalendarEventsReturn {
  const queryClient = useQueryClient();
  const invalidate = (): void => {
    queryClient.invalidateQueries({ queryKey: CALENDAR_EVENTS_QUERY_KEY }).catch(() => undefined);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: CALENDAR_EVENTS_QUERY_KEY,
    queryFn: fetchCalendarEvents,
  });

  const createMutation = useMutation({ mutationFn: createCalendarEvent, onSuccess: invalidate });
  const updateMutation = useMutation({ mutationFn: updateCalendarEvent, onSuccess: invalidate });
  const deleteMutation = useMutation({ mutationFn: deleteCalendarEvent, onSuccess: invalidate });

  return {
    events: data ?? [],
    isLoading,
    isError,
    createEvent: (d: CalendarEventRequest) => createMutation.mutate(d),
    updateEvent: (id: number, d: CalendarEventRequest) => updateMutation.mutate({ id, data: d }),
    deleteEvent: (id: number) => deleteMutation.mutate(id),
  };
}
