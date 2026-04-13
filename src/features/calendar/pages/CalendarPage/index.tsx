import { memo, useCallback, useRef, useState } from 'react';

import type { ScheduleComponent as ScheduleRef } from '@syncfusion/ej2-react-schedule';

import { CalendarView } from '@/features/calendar/calendarView';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { CalendarToolbar } from './components/CalendarToolbar';
import { ScheduleView } from './components/ScheduleView';
import { useCalendarEvents } from './hooks/useCalendarEvents';

import type { CalendarEventDto, CalendarEventRequest } from '../../types';

const DAYS_IN_WEEK = 7;

interface CalendarContentProps {
  events: CalendarEventDto[];
  isLoading: boolean;
  isError: boolean;
  createEvent: (data: CalendarEventRequest) => void;
  updateEvent: (id: number, data: CalendarEventRequest) => void;
  deleteEvent: (id: number) => void;
  scheduleRef: React.RefObject<ScheduleRef>;
}

const CalendarContent = ({
  events,
  isLoading,
  isError,
  createEvent,
  updateEvent,
  deleteEvent,
  scheduleRef,
}: CalendarContentProps): JSX.Element => {
  if (isLoading === true) return <div className="py-12 text-center text-text-muted">{FM('common.loading')}</div>;
  if (isError === true) return <div className="py-12 text-center text-error-500">{FM('common.error')}</div>;

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <ScheduleView
        ref={scheduleRef}
        events={events}
        onCreateEvent={createEvent}
        onDeleteEvent={deleteEvent}
        onUpdateEvent={updateEvent}
      />
    </div>
  );
};

const CalendarPage = memo((): JSX.Element => {
  const { events, isLoading, isError, createEvent, updateEvent, deleteEvent } = useCalendarEvents();
   
  const scheduleRef = useRef<ScheduleRef>(null);
  const [currentView, setCurrentView] = useState<CalendarView>(CalendarView.Month);

  const handlePrev = useCallback(() => {
    const scheduler = scheduleRef.current;
    if (scheduler) {
      const date = scheduler.getCurrentViewDates();
      const current = date[0] ?? new Date();
      const prev = new Date(current);
      if (currentView === CalendarView.Month) prev.setMonth(prev.getMonth() - 1);
      else if (currentView === CalendarView.Week) prev.setDate(prev.getDate() - DAYS_IN_WEEK);
      else prev.setDate(prev.getDate() - 1);
      scheduler.selectedDate = prev;
    }
  }, [currentView]);

  const handleNext = useCallback(() => {
    const scheduler = scheduleRef.current;
    if (scheduler) {
      const date = scheduler.getCurrentViewDates();
      const current = date[0] ?? new Date();
      const next = new Date(current);
      if (currentView === CalendarView.Month) next.setMonth(next.getMonth() + 1);
      else if (currentView === CalendarView.Week) next.setDate(next.getDate() + DAYS_IN_WEEK);
      else next.setDate(next.getDate() + 1);
      scheduler.selectedDate = next;
    }
  }, [currentView]);

  const handleToday = useCallback(() => {
    const scheduler = scheduleRef.current;
    if (scheduler) scheduler.selectedDate = new Date();
  }, []);

  const handleViewChange = useCallback((view: CalendarView) => {
    setCurrentView(view);
    const scheduler = scheduleRef.current;
    if (scheduler) scheduler.currentView = view;
  }, []);

  return (
    <div className="space-y-4" data-testid={TestIds.CALENDAR_PAGE}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">{FM('calendar.title')}</h1>
      </div>
      <CalendarToolbar
        currentView={currentView}
        onNext={handleNext}
        onPrev={handlePrev}
        onToday={handleToday}
        onViewChange={handleViewChange}
      />
      <CalendarContent
        createEvent={createEvent}
        deleteEvent={deleteEvent}
        events={events}
        isError={isError}
        isLoading={isLoading}
        scheduleRef={scheduleRef}
        updateEvent={updateEvent}
      />
    </div>
  );
});

CalendarPage.displayName = 'CalendarPage';

export default CalendarPage;
