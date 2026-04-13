import { useCallback, useMemo, useState } from 'react';

import { buildCalendarDays } from '../utils/buildCalendarDays';

import type { CalendarDay } from '../../DatePickerNative/types';

const DECEMBER = 11;
const JANUARY = 0;

export interface CalendarNavigation {
  leftYear: number;
  leftMonth: number;
  leftDays: CalendarDay[];
  rightYear: number;
  rightMonth: number;
  rightDays: CalendarDay[];
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
}

function nextMonth(year: number, month: number): { year: number; month: number } {
  return month === DECEMBER ? { year: year + 1, month: JANUARY } : { year, month: month + 1 };
}

export function useCalendarNavigation(): CalendarNavigation {
  const now = new Date();
  const [leftYear, setLeftYear] = useState(now.getFullYear());
  const [leftMonth, setLeftMonth] = useState(now.getMonth());

  const leftDays = useMemo(() => buildCalendarDays(leftYear, leftMonth), [leftYear, leftMonth]);
  const right = nextMonth(leftYear, leftMonth);
  const rightDays = useMemo(() => buildCalendarDays(right.year, right.month), [right.year, right.month]);

  const goToPrevMonth = useCallback(() => {
    setLeftMonth((m) => {
      if (m === JANUARY) { setLeftYear((y) => y - 1); return DECEMBER; }
      return m - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setLeftMonth((m) => {
      if (m === DECEMBER) { setLeftYear((y) => y + 1); return JANUARY; }
      return m + 1;
    });
  }, []);

  return {
    leftYear, leftMonth, leftDays,
    rightYear: right.year, rightMonth: right.month, rightDays,
    goToPrevMonth, goToNextMonth,
  };
}
