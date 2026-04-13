import { type RefObject, useCallback, useMemo, useRef, useState } from 'react';

import { useClickOutside } from '@/components/ui/native/SelectNative/hooks/useClickOutside';

import { useCalendarKeyboard } from './useCalendarKeyboard';
import { useCalendarState } from './useCalendarState';
import { MIN_SPACE_BELOW_PX } from '../constants';
import { DatePickerMode } from '../utils/datePickerMode';
import { PanelPosition } from '../utils/panelPosition';
import { RangeSelectingPhase } from '../utils/rangeSelectingPhase';

import type { CalendarDay } from '../types';

interface DatePickerInteractionProps {
  disabled: boolean;
  mode: DatePickerMode;
  value: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  placeholder: string | undefined;
  onChange: ((date: string) => void) | undefined;
  onRangeChange: ((start: string, end: string) => void) | undefined;
}

export interface DatePickerInteraction {
  containerRef: RefObject<HTMLDivElement>;
  triggerRef: RefObject<HTMLButtonElement>;
  isOpen: boolean;
  position: PanelPosition;
  focusedIndex: number;
  viewYear: number;
  viewMonth: number;
  days: CalendarDay[];
  displayValue: string;
  startValue: string;
  endValue: string;
  resolvedPlaceholder: string;
  rangeEnd: string | undefined;
  rangeStart: string | undefined;
  selectedDate: string | undefined;
  toggleOpen: () => void;
  handleSelectDay: (day: CalendarDay) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleTriggerKeyDown: (e: React.KeyboardEvent) => void;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  goToYear: (year: number) => void;
}

interface DaySelectionCtx {
  mode: DatePickerMode;
  rangeSelecting: RangeSelectingPhase;
  startDate: string | undefined;
  endDate: string | undefined;
  onChange: ((date: string) => void) | undefined;
  onRangeChange: ((start: string, end: string) => void) | undefined;
  close: () => void;
  setRangeSelecting: (phase: RangeSelectingPhase) => void;
}

function performDaySelection(day: CalendarDay, ctx: DaySelectionCtx): void {
  if (ctx.mode === DatePickerMode.Single) {
    ctx.onChange?.(day.dateString);
    ctx.close();
  } else if (ctx.rangeSelecting === RangeSelectingPhase.Start) {
    ctx.onRangeChange?.(day.dateString, ctx.endDate ?? '');
    ctx.setRangeSelecting(RangeSelectingPhase.End);
  } else {
    const start = ctx.startDate ?? '';
    if (day.dateString < start) ctx.onRangeChange?.(day.dateString, start);
    else ctx.onRangeChange?.(start, day.dateString);
    ctx.setRangeSelecting(RangeSelectingPhase.Start);
    ctx.close();
  }
}

function computePosition(ref: RefObject<HTMLButtonElement>): PanelPosition {
  if (!ref.current) return PanelPosition.Below;
  const spaceBelow = window.innerHeight - ref.current.getBoundingClientRect().bottom;
  return spaceBelow < MIN_SPACE_BELOW_PX ? PanelPosition.Above : PanelPosition.Below;
}

interface DatePickerOpenState {
  containerRef: RefObject<HTMLDivElement>;
  triggerRef: RefObject<HTMLButtonElement>;
  isOpen: boolean;
  position: PanelPosition;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  close: () => void;
  toggleOpen: () => void;
}

function useDatePickerOpen(disabled: boolean): DatePickerOpenState {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<PanelPosition>(PanelPosition.Below);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const close = useCallback((): void => { setIsOpen(false); setFocusedIndex(-1); }, []);
  useClickOutside(containerRef, close, isOpen);
  const toggleOpen = useCallback(() => {
    if (disabled) return;
    setIsOpen((prev) => { if (!prev) setPosition(computePosition(triggerRef)); return !prev; });
  }, [disabled]);
  return { containerRef, triggerRef, isOpen, position, focusedIndex, setFocusedIndex, close, toggleOpen };
}

export function useDatePickerInteraction({
  disabled, mode, value, startDate, endDate, placeholder, onChange, onRangeChange,
}: DatePickerInteractionProps): DatePickerInteraction {
  const { containerRef, triggerRef, isOpen, position, focusedIndex, setFocusedIndex, close, toggleOpen } = useDatePickerOpen(disabled);
  const [rangeSelecting, setRangeSelecting] = useState<RangeSelectingPhase>(RangeSelectingPhase.Start);
  const calendar = useCalendarState(mode === DatePickerMode.Single ? value : startDate);
  const handleSelectDay = useCallback((day: CalendarDay) => {
    performDaySelection(day, { mode, rangeSelecting, startDate, endDate, onChange, onRangeChange, close, setRangeSelecting });
  }, [mode, rangeSelecting, startDate, endDate, onChange, onRangeChange, close]);
  const kbParams = useMemo(() => ({
    days: calendar.days, focusedIndex, setFocusedIndex, onSelect: handleSelectDay, onClose: close,
  }), [calendar.days, focusedIndex, setFocusedIndex, handleSelectDay, close]);
  const handleKeyDown = useCalendarKeyboard(kbParams);
  const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleOpen(); } else if (e.key === 'Escape') close();
  }, [toggleOpen, close]);
  return {
    containerRef, triggerRef, isOpen, position, focusedIndex, toggleOpen, ...calendar,
    handleSelectDay, handleKeyDown, handleTriggerKeyDown,
    displayValue: mode === DatePickerMode.Single ? (value ?? '') : '',
    startValue: startDate ?? '', endValue: endDate ?? '', resolvedPlaceholder: placeholder ?? 'Select date',
    rangeEnd: mode === DatePickerMode.Range ? endDate : undefined,
    rangeStart: mode === DatePickerMode.Range ? startDate : undefined,
    selectedDate: mode === DatePickerMode.Single ? value : undefined,
  };
}
