/** Category-to-color mapping for calendar events */
export const CATEGORY_COLORS: Record<string, string> = {
  Meeting: '#1e88e5',
  Task: '#43a047',
  Reminder: '#fb8c00',
  Holiday: '#8e24aa',
};

/** Default color for events with unknown category */
export const DEFAULT_EVENT_COLOR = '#546e7a';

/** MockServer calendar events base URL (proxied via Vite) */
export const CALENDAR_API_URL = '/mockapi/api/calendar/events';

/** Query key for TanStack Query */
export const CALENDAR_EVENTS_QUERY_KEY = ['calendar-events'] as const;
