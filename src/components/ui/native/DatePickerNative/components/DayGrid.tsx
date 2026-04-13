import { memo } from 'react';

import { isValueDefined } from '@/utils/is';

import { DAYS_IN_WEEK } from '../constants';
import DayCell from './DayCell';

import type { CalendarDay } from '../types';

interface DayGridProps {
  days: CalendarDay[];
  selectedDate: string | undefined;
  rangeStart: string | undefined;
  rangeEnd: string | undefined;
  focusedIndex: number;
  minDate: string | undefined;
  maxDate: string | undefined;
  onSelect: (day: CalendarDay) => void;
}

function isInDateRange(dateStr: string, start?: string, end?: string): boolean {
  if (!isValueDefined(start) || !isValueDefined(end)) return false;
  return dateStr > start && dateStr < end;
}

function isDateDisabled(dateStr: string, minDate?: string, maxDate?: string): boolean {
  if (isValueDefined(minDate) && dateStr < minDate) return true;
  if (isValueDefined(maxDate) && dateStr > maxDate) return true;
  return false;
}

const DayGrid = memo(({
  days,
  selectedDate,
  rangeStart,
  rangeEnd,
  focusedIndex,
  minDate,
  maxDate,
  onSelect,
}: DayGridProps): JSX.Element => {
  const rows: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += DAYS_IN_WEEK) 
    rows.push(days.slice(i, i + DAYS_IN_WEEK));
  

  return (
    <div className="native-datepicker-grid" role="grid">
      {rows.map((row, rowIdx) => (
        <div key={row[0]?.dateString} className="native-datepicker-row" role="row">
          {row.map((day, colIdx) => {
            const globalIdx = rowIdx * DAYS_IN_WEEK + colIdx;
            const isSelected = day.dateString === selectedDate || day.dateString === rangeStart || day.dateString === rangeEnd;
            return (
              <DayCell
                key={day.dateString}
                day={day}
                isDisabled={isDateDisabled(day.dateString, minDate, maxDate)}
                isFocused={globalIdx === focusedIndex}
                isInRange={isInDateRange(day.dateString, rangeStart, rangeEnd)}
                isRangeEnd={day.dateString === rangeEnd}
                isRangeStart={day.dateString === rangeStart}
                isSelected={isSelected}
                onClick={onSelect}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
});

DayGrid.displayName = 'DayGrid';

export default DayGrid;
