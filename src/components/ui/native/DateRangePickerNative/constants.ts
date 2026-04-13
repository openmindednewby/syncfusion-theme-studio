import type { PresetRange } from './types';

export const CUSTOM_RANGE_ID = 'custom-range';

/** Format a YYYY-MM-DD string as "Wed, May 14" */
export function formatShortDate(dateStr: string): string {
  if (dateStr === '') return '';
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function formatRangeDisplay(start: string, end: string): string {
  if (start === '' && end === '') return '';
  if (start !== '' && end === '') return formatShortDate(start);
  if (start === '' && end !== '') return formatShortDate(end);
  return `${formatShortDate(start)} - ${formatShortDate(end)}`;
}

function toIsoDate(date: Date): string {
  return date.toISOString().split('T')[0] ?? '';
}

const MS_PER_DAY = 86_400_000;
const DAYS_IN_WEEK_COUNT = 7;
const DAYS_TO_SUNDAY = 6;

function daysAgo(n: number): string {
  return toIsoDate(new Date(Date.now() - n * MS_PER_DAY));
}

function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? DAYS_TO_SUNDAY : day - 1;
  d.setDate(d.getDate() - diff);
  return d;
}

function getSundayOfWeek(monday: Date): Date {
  const d = new Date(monday);
  d.setDate(d.getDate() + DAYS_TO_SUNDAY);
  return d;
}

const PRESET_KEY_PREFIX = 'components.datepickerShowcase.presets';

export const PRESET_RANGES: readonly PresetRange[] = [
  { id: 'this-hour', labelKey: `${PRESET_KEY_PREFIX}.thisHour`, getRange: () => ({ start: daysAgo(0), end: daysAgo(0) }) },
  { id: 'today', labelKey: `${PRESET_KEY_PREFIX}.today`, getRange: () => ({ start: daysAgo(0), end: daysAgo(0) }) },
  { id: 'yesterday', labelKey: `${PRESET_KEY_PREFIX}.yesterday`, getRange: () => ({ start: daysAgo(1), end: daysAgo(1) }) },
  {
    id: 'day-before-yesterday',
    labelKey: `${PRESET_KEY_PREFIX}.dayBeforeYesterday`,
    getRange: () => ({ start: daysAgo(2), end: daysAgo(2) }),
  },
  {
    id: 'this-day-last-week',
    labelKey: `${PRESET_KEY_PREFIX}.thisDayLastWeek`,
    getRange: () => ({ start: daysAgo(DAYS_IN_WEEK_COUNT), end: daysAgo(DAYS_IN_WEEK_COUNT) }),
  },
  {
    id: 'this-week',
    labelKey: `${PRESET_KEY_PREFIX}.thisWeek`,
    getRange: () => ({ start: toIsoDate(getMondayOfWeek(new Date())), end: daysAgo(0) }),
  },
  {
    id: 'previous-week',
    labelKey: `${PRESET_KEY_PREFIX}.previousWeek`,
    getRange: () => {
      const lastMonday = getMondayOfWeek(new Date(Date.now() - DAYS_IN_WEEK_COUNT * MS_PER_DAY));
      return { start: toIsoDate(lastMonday), end: toIsoDate(getSundayOfWeek(lastMonday)) };
    },
  },
  {
    id: 'previous-two-weeks',
    labelKey: `${PRESET_KEY_PREFIX}.previousTwoWeeks`,
    getRange: () => {
      const twoWeeksAgo = new Date(Date.now() - 2 * DAYS_IN_WEEK_COUNT * MS_PER_DAY);
      const monday = getMondayOfWeek(twoWeeksAgo);
      const lastSunday = getSundayOfWeek(getMondayOfWeek(new Date(Date.now() - DAYS_IN_WEEK_COUNT * MS_PER_DAY)));
      return { start: toIsoDate(monday), end: toIsoDate(lastSunday) };
    },
  },
] as const;
