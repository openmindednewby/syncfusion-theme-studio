import { useCallback } from 'react';

import { isValueDefined } from '@/utils/is';

import { DAYS_IN_WEEK, KEYS } from '../constants';

import type { CalendarDay } from '../types';

interface UseCalendarKeyboardParams {
  days: CalendarDay[];
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  onSelect: (day: CalendarDay) => void;
  onClose: () => void;
}

const ARROW_OFFSETS: Record<string, number> = {
  [KEYS.ARROW_LEFT]: -1,
  [KEYS.ARROW_RIGHT]: 1,
  [KEYS.ARROW_UP]: -DAYS_IN_WEEK,
  [KEYS.ARROW_DOWN]: DAYS_IN_WEEK,
};

function getArrowOffset(key: string): number | undefined {
  return ARROW_OFFSETS[key];
}

export function useCalendarKeyboard({
  days,
  focusedIndex,
  setFocusedIndex,
  onSelect,
  onClose,
}: UseCalendarKeyboardParams): (e: KeyboardEvent) => void {
  return useCallback(
    (e: KeyboardEvent) => {
      const offset = getArrowOffset(e.key);
      if (isValueDefined(offset)) {
        e.preventDefault();
        setFocusedIndex(Math.max(0, Math.min(days.length - 1, focusedIndex + offset)));
      } else if (e.key === KEYS.ENTER || e.key === KEYS.SPACE) {
        e.preventDefault();
        const day = days[focusedIndex];
        if (day) onSelect(day);
      } else if (e.key === KEYS.ESCAPE) {
        e.preventDefault();
        onClose();
      }
    },
    [days, focusedIndex, setFocusedIndex, onSelect, onClose],
  );
}
