import { type RefObject, useCallback, useMemo, useRef, useState } from 'react';

import { useClickOutside } from '@/components/ui/native/SelectNative/hooks/useClickOutside';

import { MIN_SPACE_BELOW_PX } from '../../DatePickerNative/constants';
import { PanelPosition } from '../../DatePickerNative/utils/panelPosition';
import { formatRangeDisplay } from '../constants';
import { useCalendarNavigation } from './useCalendarNavigation';
import { useRangeSelection } from './useRangeSelection';

import type { CalendarDay } from '../../DatePickerNative/types';
import type { PresetRange } from '../types';
import type { CalendarNavigation } from './useCalendarNavigation';

interface UseDateRangeProps {
  disabled: boolean;
  startDate: string | undefined;
  endDate: string | undefined;
  placeholder: string | undefined;
  onRangeChange: ((start: string, end: string) => void) | undefined;
}

export interface DateRangeInteraction extends CalendarNavigation {
  containerRef: RefObject<HTMLDivElement>;
  triggerRef: RefObject<HTMLButtonElement>;
  isOpen: boolean;
  position: PanelPosition;
  displayValue: string;
  activePreset: string;
  rangeStart: string;
  rangeEnd: string;
  resolvedPlaceholder: string;
  toggleOpen: () => void;
  handleSelectDay: (day: CalendarDay) => void;
  handleSelectPreset: (preset: PresetRange) => void;
  handleCustomRange: () => void;
  handleTriggerKeyDown: (e: React.KeyboardEvent) => void;
}

function computePosition(ref: RefObject<HTMLButtonElement>): PanelPosition {
  if (!ref.current) return PanelPosition.Below;
  const spaceBelow = window.innerHeight - ref.current.getBoundingClientRect().bottom;
  return spaceBelow < MIN_SPACE_BELOW_PX ? PanelPosition.Above : PanelPosition.Below;
}

export function useDateRangeInteraction({
  disabled, startDate, endDate, placeholder, onRangeChange,
}: UseDateRangeProps): DateRangeInteraction {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<PanelPosition>(PanelPosition.Below);
  const calendar = useCalendarNavigation();
  const rangeArgs = useMemo(() => ({ startDate, endDate, onRangeChange }), [startDate, endDate, onRangeChange]);
  const { activePreset, rangeStart, rangeEnd, handleSelectDay: selectDay, handleSelectPreset: selectPreset, handleCustomRange, resetPhase } = useRangeSelection(rangeArgs);

  const close = useCallback((): void => { setIsOpen(false); resetPhase(); }, [resetPhase]);
  useClickOutside(containerRef, close, isOpen);
  const toggleOpen = useCallback(() => {
    if (disabled) return;
    setIsOpen((prev) => { if (!prev) setPosition(computePosition(triggerRef)); return !prev; });
  }, [disabled]);
  const handleSelectDay = useCallback((day: CalendarDay) => selectDay(day, close), [selectDay, close]);
  const handleSelectPreset = useCallback((preset: PresetRange) => selectPreset(preset, close), [selectPreset, close]);
  const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleOpen(); }
    else if (e.key === 'Escape') close();
  }, [toggleOpen, close]);
  return {
    containerRef, triggerRef, isOpen, position, activePreset, rangeStart, rangeEnd,
    displayValue: formatRangeDisplay(startDate ?? '', endDate ?? ''), resolvedPlaceholder: placeholder ?? 'Select date range',
    toggleOpen, handleTriggerKeyDown, handleSelectDay, handleSelectPreset, handleCustomRange, ...calendar,
  };
}
