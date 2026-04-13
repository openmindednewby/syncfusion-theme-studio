/* eslint-disable @typescript-eslint/consistent-type-assertions -- Required for Syncfusion Schedule SDK interop */
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';

import {
  Agenda,
  Day,
  DragAndDrop,
  Inject,
  Month,
  Resize,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Week,
  WorkWeek,
} from '@syncfusion/ej2-react-schedule';
import type {
  ActionEventArgs,
  EventRenderedArgs,
  ScheduleComponent as ScheduleRef,
} from '@syncfusion/ej2-react-schedule';

import { FM } from '@/localization/utils/helpers';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';
import { isValueDefined } from '@/utils/is';

import { CATEGORY_COLORS, DEFAULT_EVENT_COLOR } from '../../../constants';

import type { CalendarEventDto, CalendarEventRequest, ScheduleEventData } from '../../../types';

interface ScheduleViewProps {
  events: CalendarEventDto[];
  onCreateEvent: (data: CalendarEventRequest) => void;
  onUpdateEvent: (id: number, data: CalendarEventRequest) => void;
  onDeleteEvent: (id: number) => void;
}

function toScheduleData(dto: CalendarEventDto): ScheduleEventData {
  return {
    Id: dto.id,
    Subject: dto.title,
    Description: dto.description,
    StartTime: new Date(dto.startTime),
    EndTime: new Date(dto.endTime),
    Location: dto.location,
    IsAllDay: dto.isAllDay,
    RecurrenceRule: dto.recurrenceRule ?? undefined,
    CategoryColor: dto.color !== '' ? dto.color : (CATEGORY_COLORS[dto.category] ?? DEFAULT_EVENT_COLOR),
    Category: dto.category,
    CreatedBy: dto.createdBy,
  };
}

function toApiRequest(data: Record<string, unknown>): CalendarEventRequest {
  const subject = String(data['Subject'] ?? '');
  const description = String(data['Description'] ?? '');
  const location = String(data['Location'] ?? '');
  const category = String(data['Category'] ?? 'Meeting');
  const createdBy = String(data['CreatedBy'] ?? 'Current User');
  const startTime = data['StartTime'] as Date;
  const endTime = data['EndTime'] as Date;
  const isAllDay = Boolean(data['IsAllDay']);
  const recurrenceRule = data['RecurrenceRule'] as string | undefined;
  const color = String(data['CategoryColor'] ?? CATEGORY_COLORS[category] ?? DEFAULT_EVENT_COLOR);

  return {
    title: subject,
    description,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    location,
    isAllDay,
    recurrenceRule: recurrenceRule ?? null,
    category,
    color,
    createdBy,
  };
}

function processRecords(records: Array<Record<string, unknown>>, handler: (data: Record<string, unknown>) => void): void {
  for (const record of records) handler(record);
}

/** Labels Syncfusion schedule nav buttons that lack accessible names */
function labelScheduleNavButtons(container: HTMLElement): void {
  const prevBtn = container.querySelector<HTMLElement>('.e-prev');
  const nextBtn = container.querySelector<HTMLElement>('.e-next');
  if (isValueDefined(prevBtn) && !isValueDefined(prevBtn.getAttribute('aria-label')))
    prevBtn.setAttribute('aria-label', FM('calendar.previousPeriod'));
  if (isValueDefined(nextBtn) && !isValueDefined(nextBtn.getAttribute('aria-label')))
    nextBtn.setAttribute('aria-label', FM('calendar.nextPeriod'));
}

export const ScheduleView = forwardRef<ScheduleRef, ScheduleViewProps>(({
  events,
  onCreateEvent,
  onUpdateEvent,
  onDeleteEvent,
}, ref): JSX.Element => {
  const scheduleRef = useRef<ScheduleRef>(null);

  useImperativeHandle(ref, () => scheduleRef.current as ScheduleRef);

  useEffect(() => {
    Promise.all([
      loadSyncfusionCss(SyncfusionCssModule.Schedule),
      loadSyncfusionCss(SyncfusionCssModule.Navigations),
      loadSyncfusionCss(SyncfusionCssModule.Popups),
      loadSyncfusionCss(SyncfusionCssModule.Calendars),
      loadSyncfusionCss(SyncfusionCssModule.Dropdowns),
      loadSyncfusionCss(SyncfusionCssModule.Buttons),
    ]).then(() => {
      scheduleRef.current?.refresh();
    }).catch(() => {});
  }, []);

  const handleCreated = useCallback(() => {
    const el = scheduleRef.current?.element;
    if (el) labelScheduleNavButtons(el);
  }, []);

  const scheduleData = useMemo(() => events.map(toScheduleData), [events]);

  const handleActionComplete = (args: ActionEventArgs): void => {
    if (args.requestType === 'eventCreated' && args.addedRecords)
      processRecords(args.addedRecords as Array<Record<string, unknown>>, (data) => onCreateEvent(toApiRequest(data)));

    if (args.requestType === 'eventChanged' && args.changedRecords)
      processRecords(args.changedRecords as Array<Record<string, unknown>>, (data) =>
        onUpdateEvent(data['Id'] as number, toApiRequest(data)),
      );

    if (args.requestType === 'eventRemoved' && args.deletedRecords)
      processRecords(args.deletedRecords as Array<Record<string, unknown>>, (data) =>
        onDeleteEvent(data['Id'] as number),
      );
  };

  const handleEventRendered = (args: EventRenderedArgs): void => {
    const data = args.data as Record<string, unknown>;
    const color = String(data['CategoryColor'] ?? DEFAULT_EVENT_COLOR);
    const { element } = args;
    element.style.backgroundColor = color;
    element.style.borderColor = color;
  };

  const eventSettings = useMemo(
    () => ({
      dataSource: scheduleData,
      fields: {
        id: 'Id',
        subject: { name: 'Subject' },
        description: { name: 'Description' },
        startTime: { name: 'StartTime' },
        endTime: { name: 'EndTime' },
        location: { name: 'Location' },
        isAllDay: { name: 'IsAllDay' },
        recurrenceRule: { name: 'RecurrenceRule' },
      },
    }),
    [scheduleData],
  );

  return (
    <ScheduleComponent
      ref={scheduleRef}
      rowAutoHeight
      actionComplete={handleActionComplete}
      created={handleCreated}
      currentView="Month"
      eventRendered={handleEventRendered}
      eventSettings={eventSettings}
      height="calc(100vh - 180px)"
      selectedDate={new Date()}
      showHeaderBar={false}
    >
      <ViewsDirective>
        <ViewDirective option="Day" />
        <ViewDirective option="Week" />
        <ViewDirective option="WorkWeek" />
        <ViewDirective option="Month" />
        <ViewDirective option="Agenda" />
      </ViewsDirective>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]} />
    </ScheduleComponent>
  );
});

ScheduleView.displayName = 'ScheduleView';
