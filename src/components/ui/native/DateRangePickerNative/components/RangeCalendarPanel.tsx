import { memo, useEffect, useRef } from 'react';

import PresetSidebar from './PresetSidebar';
import DayGrid from '../../DatePickerNative/components/DayGrid';
import WeekHeader from '../../DatePickerNative/components/WeekHeader';
import { MONTH_NAMES } from '../../DatePickerNative/constants';

import type { CalendarDay } from '../../DatePickerNative/types';
import type { PanelPosition } from '../../DatePickerNative/utils/panelPosition';
import type { PanelAlign, PresetRange } from '../types';

interface RangeCalendarPanelProps {
  isOpen: boolean;
  align: PanelAlign;
  position: PanelPosition;
  activePreset: string;
  leftYear: number;
  leftMonth: number;
  leftDays: CalendarDay[];
  rightYear: number;
  rightMonth: number;
  rightDays: CalendarDay[];
  rangeStart: string;
  rangeEnd: string;
  minDate: string | undefined;
  maxDate: string | undefined;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDay: (day: CalendarDay) => void;
  onSelectPreset: (preset: PresetRange) => void;
  onCustomRange: () => void;
}

const ChevronLeft = (): JSX.Element => (
  <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="14">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = (): JSX.Element => (
  <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="14">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const RangeCalendarPanel = memo(({
  isOpen, align, position, activePreset,
  leftYear, leftMonth, leftDays,
  rightYear, rightMonth, rightDays,
  rangeStart, rangeEnd, minDate, maxDate,
  onPrevMonth, onNextMonth, onSelectDay,
  onSelectPreset, onCustomRange,
}: RangeCalendarPanelProps): JSX.Element => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    panelRef.current.focus();
  }, [isOpen]);

  return (
    <div
      ref={panelRef}
      aria-label="Date range picker"
      className="native-daterange-panel"
      data-align={align}
      data-open={isOpen}
      data-position={position}
      role="dialog"
      tabIndex={-1}
    >
      <PresetSidebar
        activePreset={activePreset}
        onCustomRange={onCustomRange}
        onSelectPreset={onSelectPreset}
      />
      <div className="native-daterange-calendars">
        {/* Left calendar */}
        <div className="native-daterange-calendar">
          <div className="native-daterange-cal-header">
            <button aria-label="Previous month" className="native-datepicker-nav-btn" type="button" onClick={onPrevMonth}>
              <ChevronLeft />
            </button>
            <span className="native-daterange-cal-title">
              {MONTH_NAMES[leftMonth]} {leftYear}
            </span>
            <span className="native-daterange-cal-spacer" />
          </div>
          <WeekHeader />
          <DayGrid
            days={leftDays}
            focusedIndex={-1}
            maxDate={maxDate}
            minDate={minDate}
            rangeEnd={rangeEnd !== '' ? rangeEnd : undefined}
            rangeStart={rangeStart !== '' ? rangeStart : undefined}
            selectedDate={undefined}
            onSelect={onSelectDay}
          />
        </div>
        {/* Right calendar */}
        <div className="native-daterange-calendar">
          <div className="native-daterange-cal-header">
            <span className="native-daterange-cal-spacer" />
            <span className="native-daterange-cal-title">
              {MONTH_NAMES[rightMonth]} {rightYear}
            </span>
            <button aria-label="Next month" className="native-datepicker-nav-btn" type="button" onClick={onNextMonth}>
              <ChevronRight />
            </button>
          </div>
          <WeekHeader />
          <DayGrid
            days={rightDays}
            focusedIndex={-1}
            maxDate={maxDate}
            minDate={minDate}
            rangeEnd={rangeEnd !== '' ? rangeEnd : undefined}
            rangeStart={rangeStart !== '' ? rangeStart : undefined}
            selectedDate={undefined}
            onSelect={onSelectDay}
          />
        </div>
      </div>
    </div>
  );
});

RangeCalendarPanel.displayName = 'RangeCalendarPanel';

export default RangeCalendarPanel;
