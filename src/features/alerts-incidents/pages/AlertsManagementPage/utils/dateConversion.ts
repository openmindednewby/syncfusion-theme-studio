/**
 * Converts a YYYY-MM-DD date string to ISO 8601 with local timezone offset.
 * Used to build fromDate/toDate for the ListAlerts API request.
 */

const PAD_WIDTH = 2;
const MINUTES_PER_HOUR = 60;
const END_OF_DAY_HOUR = 23;
const END_OF_DAY_MINUTE = 59;

function padTwo(n: number): string {
  return String(Math.abs(n)).padStart(PAD_WIDTH, '0');
}

function getTimezoneOffsetString(date: Date): string {
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const hours = Math.floor(Math.abs(offset) / MINUTES_PER_HOUR);
  const minutes = Math.abs(offset) % MINUTES_PER_HOUR;
  return `${sign}${padTwo(hours)}:${padTwo(minutes)}`;
}

export function toIsoWithOffset(dateStr: string, endOfDay = false): string {
  const parts = dateStr.split('-').map(Number);
  const year = parts[0] ?? 0;
  const month = parts[1] ?? 1;
  const day = parts[2] ?? 1;
  const date = endOfDay
    ? new Date(year, month - 1, day, END_OF_DAY_HOUR, END_OF_DAY_MINUTE, 0, 0)
    : new Date(year, month - 1, day, 0, 0, 0, 0);

  const yyyy = String(date.getFullYear());
  const mm = padTwo(date.getMonth() + 1);
  const dd = padTwo(date.getDate());
  const hh = padTwo(date.getHours());
  const min = padTwo(date.getMinutes());
  const ss = padTwo(date.getSeconds());
  const offset = getTimezoneOffsetString(date);

  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}.000${offset}`;
}
