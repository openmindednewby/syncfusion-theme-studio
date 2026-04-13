import { memo, useEffect, useRef } from 'react';

import CalendarHeader from './CalendarHeader';
import DayGrid from './DayGrid';
import WeekHeader from './WeekHeader';

import type { CalendarDay } from '../types';
import type { PanelPosition } from '../utils/panelPosition';

interface CalendarPanelProps {
  year: number;
  month: number;
  days: CalendarDay[];
  selectedDate: string | undefined;
  rangeStart: string | undefined;
  rangeEnd: string | undefined;
  focusedIndex: number;
  minDate: string | undefined;
  maxDate: string | undefined;
  isOpen: boolean;
  position: PanelPosition;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onYearChange: (year: number) => void;
  onSelectDay: (day: CalendarDay) => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

const CalendarPanel = memo(({
  year,
  month,
  days,
  selectedDate,
  rangeStart,
  rangeEnd,
  focusedIndex,
  minDate,
  maxDate,
  isOpen,
  position,
  onPrevMonth,
  onNextMonth,
  onYearChange,
  onSelectDay,
  onKeyDown,
}: CalendarPanelProps): JSX.Element => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.addEventListener('keydown', onKeyDown);
    return (): void => panel.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={panelRef}
      aria-label="Calendar"
      className="native-datepicker-panel"
      data-open={isOpen}
      data-position={position}
      role="dialog"
      tabIndex={-1}
    >
      <CalendarHeader
        month={month}
        year={year}
        onNext={onNextMonth}
        onPrev={onPrevMonth}
        onYearChange={onYearChange}
      />
      <WeekHeader />
      <DayGrid
        days={days}
        focusedIndex={focusedIndex}
        maxDate={maxDate}
        minDate={minDate}
        rangeEnd={rangeEnd}
        rangeStart={rangeStart}
        selectedDate={selectedDate}
        onSelect={onSelectDay}
      />
    </div>
  );
});

CalendarPanel.displayName = 'CalendarPanel';

export default CalendarPanel;
