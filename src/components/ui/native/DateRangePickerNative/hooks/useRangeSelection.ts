import { useCallback, useState } from 'react';

import { RangeSelectingPhase } from '../../DatePickerNative/utils/rangeSelectingPhase';
import { CUSTOM_RANGE_ID } from '../constants';

import type { CalendarDay } from '../../DatePickerNative/types';
import type { PresetRange } from '../types';

interface UseRangeSelectionProps {
  startDate: string | undefined;
  endDate: string | undefined;
  onRangeChange: ((start: string, end: string) => void) | undefined;
}

export interface RangeSelection {
  activePreset: string;
  rangeStart: string;
  rangeEnd: string;
  handleSelectDay: (day: CalendarDay, close: () => void) => void;
  handleSelectPreset: (preset: PresetRange, close: () => void) => void;
  handleCustomRange: () => void;
  resetPhase: () => void;
}

function sortRange(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a];
}

export function useRangeSelection({ startDate, endDate, onRangeChange }: UseRangeSelectionProps): RangeSelection {
  const [activePreset, setActivePreset] = useState<string>(CUSTOM_RANGE_ID);
  const [rangePhase, setRangePhase] = useState<RangeSelectingPhase>(RangeSelectingPhase.Start);
  const [pendingStart, setPendingStart] = useState('');

  const resetPhase = useCallback(() => { setRangePhase(RangeSelectingPhase.Start); setPendingStart(''); }, []);
  const handleCustomRange = useCallback(() => { setActivePreset(CUSTOM_RANGE_ID); }, []);

  const handleSelectPreset = useCallback((preset: PresetRange, close: () => void) => {
    const { start, end } = preset.getRange();
    setActivePreset(preset.id); onRangeChange?.(start, end); close();
  }, [onRangeChange]);

  const handleSelectDay = useCallback((day: CalendarDay, close: () => void) => {
    setActivePreset(CUSTOM_RANGE_ID);
    if (rangePhase === RangeSelectingPhase.Start) {
      setPendingStart(day.dateString);
      onRangeChange?.(day.dateString, endDate ?? '');
      setRangePhase(RangeSelectingPhase.End);
    } else {
      const s = pendingStart !== '' ? pendingStart : (startDate ?? '');
      const [sorted0, sorted1] = sortRange(s, day.dateString);
      onRangeChange?.(sorted0, sorted1);
      resetPhase();
      close();
    }
  }, [rangePhase, pendingStart, startDate, endDate, onRangeChange, resetPhase]);

  return {
    activePreset, rangeStart: pendingStart !== '' ? pendingStart : (startDate ?? ''), rangeEnd: endDate ?? '',
    handleSelectDay, handleSelectPreset, handleCustomRange, resetPhase,
  };
}
