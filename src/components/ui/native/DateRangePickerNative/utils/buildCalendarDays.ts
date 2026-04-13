import { TOTAL_CELLS } from '../../DatePickerNative/constants';

import type { CalendarDay } from '../../DatePickerNative/types';

function toDateString(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function getTodayString(): string {
  const today = new Date();
  return toDateString(today.getFullYear(), today.getMonth(), today.getDate());
}

const PAD_THRESHOLD = 10;
const DECEMBER = 11;
const JANUARY = 0;

function pad(n: number): string {
  return n < PAD_THRESHOLD ? `0${n}` : String(n);
}

interface DayEntryParams {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  todayStr: string;
}

function makeDayEntry({ date, month, year, isCurrentMonth, todayStr }: DayEntryParams): CalendarDay {
  const dateString = toDateString(year, month, date);
  return { date, month, year, isCurrentMonth, isToday: dateString === todayStr, dateString };
}

/** Builds a 42-cell calendar grid for the given month. */
export function buildCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = getTodayString();
  const days: CalendarDay[] = [];

  const prevMonth = month === JANUARY ? DECEMBER : month - 1;
  const prevYear = month === JANUARY ? year - 1 : year;
  const daysInPrev = new Date(prevYear, prevMonth + 1, 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--)
    days.push(makeDayEntry({ date: daysInPrev - i, month: prevMonth, year: prevYear, isCurrentMonth: false, todayStr }));

  for (let d = 1; d <= daysInMonth; d++)
    days.push(makeDayEntry({ date: d, month, year, isCurrentMonth: true, todayStr }));

  const nextMonth = month === DECEMBER ? JANUARY : month + 1;
  const nextYear = month === DECEMBER ? year + 1 : year;
  let nd = 1;
  while (days.length < TOTAL_CELLS)
    days.push(makeDayEntry({ date: nd++, month: nextMonth, year: nextYear, isCurrentMonth: false, todayStr }));

  return days;
}
