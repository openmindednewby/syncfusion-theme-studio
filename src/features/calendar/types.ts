/** Calendar event data from the MockServer API */
export interface CalendarEventDto {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  isAllDay: boolean;
  recurrenceRule: string | null;
  category: string;
  color: string;
  createdBy: string;
  createdAt: string;
}

/** Shape used by the Syncfusion Schedule component */
export interface ScheduleEventData {
  Id: number;
  Subject: string;
  Description: string;
  StartTime: Date;
  EndTime: Date;
  Location: string;
  IsAllDay: boolean;
  RecurrenceRule: string | undefined;
  CategoryColor: string;
  Category: string;
  CreatedBy: string;
}

/** Request body for creating/updating a calendar event */
export interface CalendarEventRequest {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  isAllDay: boolean;
  recurrenceRule: string | null;
  category: string;
  color: string;
  createdBy: string;
}
