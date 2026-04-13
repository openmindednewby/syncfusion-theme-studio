import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { DAYS_IN_WEEK, TOTAL_CELLS, KEYS } from '../constants';
import { useCalendarKeyboard } from './useCalendarKeyboard';

import type { CalendarDay } from '../types';

const FIRST_INDEX = 0;
const LAST_INDEX = TOTAL_CELLS - 1;
const MID_INDEX = 20;
const TOP_ROW_INDEX = 3;
const BOTTOM_ROW_INDEX = TOTAL_CELLS - 3;

function createMockDay(index: number): CalendarDay {
  return {
    date: (index % 28) + 1,
    month: 5,
    year: 2024,
    isCurrentMonth: true,
    isToday: false,
    dateString: `2024-06-${String((index % 28) + 1).padStart(2, '0')}`,
  };
}

const MOCK_DAYS: CalendarDay[] = Array.from({ length: TOTAL_CELLS }, (_, i) => createMockDay(i));

function createKeyEvent(key: string): KeyboardEvent {
  return { key, preventDefault: vi.fn() } as unknown as KeyboardEvent;
}

function createParams(
  overrides: Partial<Parameters<typeof useCalendarKeyboard>[0]> = {},
): Parameters<typeof useCalendarKeyboard>[0] {
  return {
    days: MOCK_DAYS,
    focusedIndex: MID_INDEX,
    setFocusedIndex: vi.fn(),
    onSelect: vi.fn(),
    onClose: vi.fn(),
    ...overrides,
  };
}

describe('useCalendarKeyboard', () => {
  describe('ArrowLeft', () => {
    it('moves focus one cell to the left', () => {
      const params = createParams({ focusedIndex: MID_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));
      const event = createKeyEvent(KEYS.ARROW_LEFT);

      result.current(event);

      expect(params.setFocusedIndex).toHaveBeenCalledWith(MID_INDEX - 1);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('clamps at zero when already at first cell', () => {
      const params = createParams({ focusedIndex: FIRST_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ARROW_LEFT));

      expect(params.setFocusedIndex).toHaveBeenCalledWith(FIRST_INDEX);
    });
  });

  describe('ArrowRight', () => {
    it('moves focus one cell to the right', () => {
      const params = createParams({ focusedIndex: MID_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ARROW_RIGHT));

      expect(params.setFocusedIndex).toHaveBeenCalledWith(MID_INDEX + 1);
    });

    it('clamps at last index when already at last cell', () => {
      const params = createParams({ focusedIndex: LAST_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ARROW_RIGHT));

      expect(params.setFocusedIndex).toHaveBeenCalledWith(LAST_INDEX);
    });
  });

  describe('ArrowUp', () => {
    it('moves focus up one week (7 cells)', () => {
      const params = createParams({ focusedIndex: MID_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ARROW_UP));

      expect(params.setFocusedIndex).toHaveBeenCalledWith(MID_INDEX - DAYS_IN_WEEK);
    });

    it('clamps at zero when moving up from the top row', () => {
      const params = createParams({ focusedIndex: TOP_ROW_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ARROW_UP));

      expect(params.setFocusedIndex).toHaveBeenCalledWith(FIRST_INDEX);
    });

    it('calls preventDefault', () => {
      const params = createParams({ focusedIndex: MID_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));
      const event = createKeyEvent(KEYS.ARROW_UP);

      result.current(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('ArrowDown', () => {
    it('moves focus down one week (7 cells)', () => {
      const params = createParams({ focusedIndex: MID_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ARROW_DOWN));

      expect(params.setFocusedIndex).toHaveBeenCalledWith(MID_INDEX + DAYS_IN_WEEK);
    });

    it('clamps at last index when moving down from the bottom row', () => {
      const params = createParams({ focusedIndex: BOTTOM_ROW_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ARROW_DOWN));

      expect(params.setFocusedIndex).toHaveBeenCalledWith(LAST_INDEX);
    });

    it('calls preventDefault', () => {
      const params = createParams({ focusedIndex: MID_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));
      const event = createKeyEvent(KEYS.ARROW_DOWN);

      result.current(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('Enter', () => {
    it('calls onSelect with the focused day', () => {
      const focusedIndex = MID_INDEX;
      const params = createParams({ focusedIndex });
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ENTER));

      expect(params.onSelect).toHaveBeenCalledOnce();
      expect(params.onSelect).toHaveBeenCalledWith(MOCK_DAYS[focusedIndex]);
    });

    it('calls preventDefault', () => {
      const params = createParams();
      const { result } = renderHook(() => useCalendarKeyboard(params));
      const event = createKeyEvent(KEYS.ENTER);

      result.current(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('does not call onSelect when day at index is undefined', () => {
      const emptyDays: CalendarDay[] = [];
      const params = createParams({ days: emptyDays, focusedIndex: FIRST_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ENTER));

      expect(params.onSelect).not.toHaveBeenCalled();
    });

    it('does not move focus', () => {
      const params = createParams();
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ENTER));

      expect(params.setFocusedIndex).not.toHaveBeenCalled();
    });
  });

  describe('Space', () => {
    it('calls onSelect with the focused day', () => {
      const focusedIndex = MID_INDEX;
      const params = createParams({ focusedIndex });
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.SPACE));

      expect(params.onSelect).toHaveBeenCalledOnce();
      expect(params.onSelect).toHaveBeenCalledWith(MOCK_DAYS[focusedIndex]);
    });

    it('calls preventDefault', () => {
      const params = createParams();
      const { result } = renderHook(() => useCalendarKeyboard(params));
      const event = createKeyEvent(KEYS.SPACE);

      result.current(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('Escape', () => {
    it('calls onClose', () => {
      const params = createParams();
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ESCAPE));

      expect(params.onClose).toHaveBeenCalledOnce();
    });

    it('calls preventDefault', () => {
      const params = createParams();
      const { result } = renderHook(() => useCalendarKeyboard(params));
      const event = createKeyEvent(KEYS.ESCAPE);

      result.current(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('does not call onSelect or move focus', () => {
      const params = createParams();
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ESCAPE));

      expect(params.onSelect).not.toHaveBeenCalled();
      expect(params.setFocusedIndex).not.toHaveBeenCalled();
    });
  });

  describe('unhandled keys', () => {
    it('does not call any handler for unrecognized keys', () => {
      const params = createParams();
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent('a'));

      expect(params.setFocusedIndex).not.toHaveBeenCalled();
      expect(params.onSelect).not.toHaveBeenCalled();
      expect(params.onClose).not.toHaveBeenCalled();
    });

    it('does not call preventDefault for unrecognized keys', () => {
      const params = createParams();
      const { result } = renderHook(() => useCalendarKeyboard(params));
      const event = createKeyEvent('Tab');

      result.current(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('handles focus at first index with ArrowLeft correctly (clamps to 0)', () => {
      const params = createParams({ focusedIndex: FIRST_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ARROW_LEFT));

      expect(params.setFocusedIndex).toHaveBeenCalledWith(FIRST_INDEX);
    });

    it('handles focus at last index with ArrowRight correctly (clamps to last)', () => {
      const params = createParams({ focusedIndex: LAST_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ARROW_RIGHT));

      expect(params.setFocusedIndex).toHaveBeenCalledWith(LAST_INDEX);
    });

    it('selects first day with Enter when focusedIndex is 0', () => {
      const params = createParams({ focusedIndex: FIRST_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ENTER));

      expect(params.onSelect).toHaveBeenCalledWith(MOCK_DAYS[FIRST_INDEX]);
    });

    it('selects last day with Enter when focusedIndex is at last position', () => {
      const params = createParams({ focusedIndex: LAST_INDEX });
      const { result } = renderHook(() => useCalendarKeyboard(params));

      result.current(createKeyEvent(KEYS.ENTER));

      expect(params.onSelect).toHaveBeenCalledWith(MOCK_DAYS[LAST_INDEX]);
    });
  });
});
