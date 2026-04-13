import { useState, useCallback, useMemo } from 'react';

import { isValueDefined } from '@/utils/is';

import { TOTAL_CELLS } from '../constants';

import type { CalendarDay } from '../types';

function pad(n: number): string {
  const PAD_THRESHOLD = 10;
  return n < PAD_THRESHOLD ? `0${n}` : String(n);
}

function toDateString(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function getTodayString(): string {
  const today = new Date();
  return toDateString(today.getFullYear(), today.getMonth(), today.getDate());
}

const DECEMBER = 11;
const JANUARY = 0;

interface GridContext {
  days: CalendarDay[];
  todayStr: string;
}

function addPrevMonthDays(ctx: GridContext, year: number, month: number, firstDay: number): void {
  const prevMonth = month === JANUARY ? DECEMBER : month - 1;
  const prevYear = month === JANUARY ? year - 1 : year;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--) {
    const date = daysInPrevMonth - i;
    const dateString = toDateString(prevYear, prevMonth, date);
    ctx.days.push({ date, month: prevMonth, year: prevYear, isCurrentMonth: false, isToday: dateString === ctx.todayStr, dateString });
  }
}

function addNextMonthDays(ctx: GridContext, year: number, month: number): void {
  const nextMonth = month === DECEMBER ? JANUARY : month + 1;
  const nextYear = month === DECEMBER ? year + 1 : year;
  let nextDate = 1;
  while (ctx.days.length < TOTAL_CELLS) {
    const dateString = toDateString(nextYear, nextMonth, nextDate);
    ctx.days.push({ date: nextDate, month: nextMonth, year: nextYear, isCurrentMonth: false, isToday: dateString === ctx.todayStr, dateString });
    nextDate++;
  }
}

function buildDayGrid(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const ctx: GridContext = { days: [], todayStr: getTodayString() };

  addPrevMonthDays(ctx, year, month, firstDay);
  for (let date = 1; date <= daysInMonth; date++) {
    const dateString = toDateString(year, month, date);
    ctx.days.push({ date, month, year, isCurrentMonth: true, isToday: dateString === ctx.todayStr, dateString });
  }
  addNextMonthDays(ctx, year, month);

  return ctx.days;
}

interface CalendarState {
  viewYear: number;
  viewMonth: number;
  days: CalendarDay[];
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  goToYear: (year: number) => void;
}

export function useCalendarState(initialDate?: string): CalendarState {
  const parsed = isValueDefined(initialDate) && initialDate !== '' ? new Date(initialDate) : new Date();
  const [viewYear, setViewYear] = useState(parsed.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed.getMonth());

  const days = useMemo(() => buildDayGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const goToPrevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === JANUARY) {
        setViewYear((y) => y - 1);
        return DECEMBER;
      }
      return m - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === DECEMBER) {
        setViewYear((y) => y + 1);
        return JANUARY;
      }
      return m + 1;
    });
  }, []);

  const goToYear = useCallback((year: number) => {
    setViewYear(year);
  }, []);

  return { viewYear, viewMonth, days, goToPrevMonth, goToNextMonth, goToYear };
}

