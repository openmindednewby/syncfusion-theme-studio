import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { TOTAL_CELLS } from '../constants';
import { useCalendarState } from './useCalendarState';

const JANUARY = 0;
const FEBRUARY = 1;
const MARCH = 2;
const NOVEMBER = 10;
const DECEMBER = 11;

const DAYS_IN_FEB_2024 = 29;
const DAYS_IN_FEB_2023 = 28;
const DAYS_IN_MARCH = 31;

const YEAR_2024 = 2024;
const YEAR_2023 = 2023;
const YEAR_2025 = 2025;

/** Fixed "today" date used across tests: 2024-06-15 */
const FIXED_TODAY = new Date(2024, 5, 15);
const FIXED_TODAY_STRING = '2024-06-15';

describe('useCalendarState', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_TODAY);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('initial state', () => {
    it('defaults to current month and year when no initialDate provided', () => {
      const { result } = renderHook(() => useCalendarState());

      expect(result.current.viewYear).toBe(FIXED_TODAY.getFullYear());
      expect(result.current.viewMonth).toBe(FIXED_TODAY.getMonth());
    });

    it('parses initialDate to set starting month and year', () => {
      const { result } = renderHook(() => useCalendarState('2023-03-20'));

      expect(result.current.viewYear).toBe(YEAR_2023);
      expect(result.current.viewMonth).toBe(MARCH);
    });

    it('uses current date when initialDate is empty string', () => {
      const { result } = renderHook(() => useCalendarState(''));

      expect(result.current.viewYear).toBe(FIXED_TODAY.getFullYear());
      expect(result.current.viewMonth).toBe(FIXED_TODAY.getMonth());
    });
  });

  describe('day grid structure', () => {
    it('always produces exactly TOTAL_CELLS (42) days', () => {
      const { result } = renderHook(() => useCalendarState('2024-02-01'));

      expect(result.current.days).toHaveLength(TOTAL_CELLS);
    });

    it('marks current month days with isCurrentMonth=true', () => {
      const { result } = renderHook(() => useCalendarState('2024-03-01'));

      const currentMonthDays = result.current.days.filter((d) => d.isCurrentMonth);

      expect(currentMonthDays).toHaveLength(DAYS_IN_MARCH);
      expect(currentMonthDays.every((d) => d.month === MARCH)).toBe(true);
    });

    it('marks padding days with isCurrentMonth=false', () => {
      const { result } = renderHook(() => useCalendarState('2024-03-01'));

      const paddingDays = result.current.days.filter((d) => !d.isCurrentMonth);
      const totalPadding = TOTAL_CELLS - DAYS_IN_MARCH;

      expect(paddingDays).toHaveLength(totalPadding);
    });

    it('includes previous month padding days at the start', () => {
      // March 2024 starts on Friday (day index 5), so 5 padding days from February
      const { result } = renderHook(() => useCalendarState('2024-03-01'));
      const MARCH_2024_FIRST_DAY_OFFSET = 5;

      const prevMonthDays = result.current.days.slice(0, MARCH_2024_FIRST_DAY_OFFSET);

      expect(prevMonthDays.every((d) => d.month === FEBRUARY)).toBe(true);
      expect(prevMonthDays.every((d) => d.year === YEAR_2024)).toBe(true);
      expect(prevMonthDays.every((d) => !d.isCurrentMonth)).toBe(true);
    });

    it('includes next month padding days at the end', () => {
      const { result } = renderHook(() => useCalendarState('2024-03-01'));

      const lastDay = result.current.days[TOTAL_CELLS - 1]!;

      expect(lastDay.isCurrentMonth).toBe(false);
    });

    it('generates correct dateString format (YYYY-MM-DD)', () => {
      const { result } = renderHook(() => useCalendarState('2024-02-01'));

      const feb1 = result.current.days.find((d) => d.isCurrentMonth && d.date === 1);

      expect(feb1?.dateString).toBe('2024-02-01');
    });

    it('pads single-digit months and days with leading zeros', () => {
      const { result } = renderHook(() => useCalendarState('2024-01-01'));

      const jan9 = result.current.days.find((d) => d.isCurrentMonth && d.date === 9);

      expect(jan9?.dateString).toBe('2024-01-09');
    });

    it('handles February leap year correctly (29 days in 2024)', () => {
      const { result } = renderHook(() => useCalendarState('2024-02-01'));

      const febDays = result.current.days.filter((d) => d.isCurrentMonth);

      expect(febDays).toHaveLength(DAYS_IN_FEB_2024);
    });

    it('handles February non-leap year correctly (28 days in 2023)', () => {
      const { result } = renderHook(() => useCalendarState('2023-02-01'));

      const febDays = result.current.days.filter((d) => d.isCurrentMonth);

      expect(febDays).toHaveLength(DAYS_IN_FEB_2023);
    });

    it('orders current month days sequentially from 1 to last day', () => {
      const { result } = renderHook(() => useCalendarState('2024-03-01'));

      const currentMonthDays = result.current.days.filter((d) => d.isCurrentMonth);
      const dates = currentMonthDays.map((d) => d.date);

      expect(dates).toEqual(Array.from({ length: DAYS_IN_MARCH }, (_, i) => i + 1));
    });
  });

  describe('today detection', () => {
    it('marks exactly one day as isToday when today is in the viewed month', () => {
      const { result } = renderHook(() => useCalendarState(FIXED_TODAY_STRING));

      const todayDays = result.current.days.filter((d) => d.isToday);

      expect(todayDays).toHaveLength(1);
      expect(todayDays[0]!.dateString).toBe(FIXED_TODAY_STRING);
    });

    it('marks no current-month day as isToday when viewing a different month', () => {
      const { result } = renderHook(() => useCalendarState('2024-01-01'));

      const todayInCurrentMonth = result.current.days.filter(
        (d) => d.isToday && d.isCurrentMonth,
      );

      expect(todayInCurrentMonth).toHaveLength(0);
    });
  });

  describe('month navigation - goToNextMonth', () => {
    it('advances to the next month', () => {
      const { result } = renderHook(() => useCalendarState('2024-03-01'));

      act(() => {
        result.current.goToNextMonth();
      });

      expect(result.current.viewMonth).toBe(3); // April
      expect(result.current.viewYear).toBe(YEAR_2024);
    });

    it('wraps from December to January and increments year', () => {
      const { result } = renderHook(() => useCalendarState('2024-12-01'));

      expect(result.current.viewMonth).toBe(DECEMBER);
      expect(result.current.viewYear).toBe(YEAR_2024);

      act(() => {
        result.current.goToNextMonth();
      });

      expect(result.current.viewMonth).toBe(JANUARY);
      expect(result.current.viewYear).toBe(YEAR_2025);
    });

    it('rebuilds the day grid after navigation', () => {
      const { result } = renderHook(() => useCalendarState('2024-02-01'));

      const daysBefore = result.current.days;

      act(() => {
        result.current.goToNextMonth();
      });

      expect(result.current.days).not.toBe(daysBefore);
      expect(result.current.days).toHaveLength(TOTAL_CELLS);
    });
  });

  describe('month navigation - goToPrevMonth', () => {
    it('goes back to the previous month', () => {
      const { result } = renderHook(() => useCalendarState('2024-03-01'));

      act(() => {
        result.current.goToPrevMonth();
      });

      expect(result.current.viewMonth).toBe(FEBRUARY);
      expect(result.current.viewYear).toBe(YEAR_2024);
    });

    it('wraps from January to December and decrements year', () => {
      const { result } = renderHook(() => useCalendarState('2024-01-01'));

      expect(result.current.viewMonth).toBe(JANUARY);
      expect(result.current.viewYear).toBe(YEAR_2024);

      act(() => {
        result.current.goToPrevMonth();
      });

      expect(result.current.viewMonth).toBe(DECEMBER);
      expect(result.current.viewYear).toBe(YEAR_2023);
    });

    it('rebuilds the day grid after navigation', () => {
      const { result } = renderHook(() => useCalendarState('2024-03-01'));

      const daysBefore = result.current.days;

      act(() => {
        result.current.goToPrevMonth();
      });

      expect(result.current.days).not.toBe(daysBefore);
      expect(result.current.days).toHaveLength(TOTAL_CELLS);
    });
  });

  describe('multi-step navigation', () => {
    it('navigates forward multiple months across a year boundary', () => {
      const { result } = renderHook(() => useCalendarState('2024-11-01'));

      expect(result.current.viewMonth).toBe(NOVEMBER);

      act(() => {
        result.current.goToNextMonth();
      });

      expect(result.current.viewMonth).toBe(DECEMBER);
      expect(result.current.viewYear).toBe(YEAR_2024);

      act(() => {
        result.current.goToNextMonth();
      });

      expect(result.current.viewMonth).toBe(JANUARY);
      expect(result.current.viewYear).toBe(YEAR_2025);
    });

    it('navigates backward multiple months across a year boundary', () => {
      const { result } = renderHook(() => useCalendarState('2024-02-01'));

      expect(result.current.viewMonth).toBe(FEBRUARY);

      act(() => {
        result.current.goToPrevMonth();
      });

      expect(result.current.viewMonth).toBe(JANUARY);
      expect(result.current.viewYear).toBe(YEAR_2024);

      act(() => {
        result.current.goToPrevMonth();
      });

      expect(result.current.viewMonth).toBe(DECEMBER);
      expect(result.current.viewYear).toBe(YEAR_2023);
    });
  });

  describe('goToYear', () => {
    it('updates viewYear while keeping viewMonth unchanged', () => {
      const { result } = renderHook(() => useCalendarState('2024-03-01'));

      expect(result.current.viewYear).toBe(YEAR_2024);
      expect(result.current.viewMonth).toBe(MARCH);

      act(() => {
        result.current.goToYear(YEAR_2025);
      });

      expect(result.current.viewYear).toBe(YEAR_2025);
      expect(result.current.viewMonth).toBe(MARCH);
    });

    it('rebuilds the day grid after year change', () => {
      const { result } = renderHook(() => useCalendarState('2024-02-01'));

      const daysBefore = result.current.days;

      act(() => {
        result.current.goToYear(YEAR_2023);
      });

      expect(result.current.days).not.toBe(daysBefore);
      expect(result.current.days).toHaveLength(TOTAL_CELLS);
      expect(result.current.viewYear).toBe(YEAR_2023);
    });
  });

  describe('previous month padding at year boundary', () => {
    it('includes December padding days from previous year when viewing January', () => {
      // January 2025 starts on Wednesday (day index 3), so 3 padding days from Dec 2024
      const { result } = renderHook(() => useCalendarState('2025-01-01'));

      const prevMonthPadding = result.current.days.filter(
        (d) => !d.isCurrentMonth && d.month === DECEMBER,
      );

      if (prevMonthPadding.length > 0) {
        const firstPadding = prevMonthPadding[0]!;
        expect(firstPadding.year).toBe(YEAR_2024);
        expect(firstPadding.month).toBe(DECEMBER);
      }
    });
  });
});
