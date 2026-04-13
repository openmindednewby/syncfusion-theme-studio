import { memo } from 'react';

import { cn } from '@/utils/cn';

import type { CalendarDay } from '../types';

interface DayCellProps {
  day: CalendarDay;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isFocused: boolean;
  isDisabled: boolean;
  onClick: (day: CalendarDay) => void;
}

const DayCell = memo(({
  day,
  isSelected,
  isRangeStart,
  isRangeEnd,
  isInRange,
  isFocused,
  isDisabled,
  onClick,
}: DayCellProps): JSX.Element => {
  const handleClick = (): void => {
    if (!isDisabled) onClick(day);
  };

  return (
    <button
      aria-disabled={isDisabled}
      aria-label={day.dateString}
      aria-selected={isSelected}
      className={cn(
        'native-datepicker-day',
        !day.isCurrentMonth && 'native-datepicker-day--other-month',
        day.isToday && 'native-datepicker-day--today',
        isSelected && 'native-datepicker-day--selected',
        isRangeStart && 'native-datepicker-day--range-start',
        isRangeEnd && 'native-datepicker-day--range-end',
        isInRange && 'native-datepicker-day--in-range',
        isDisabled && 'native-datepicker-day--disabled',
        isFocused && 'native-datepicker-day--focused',
      )}
      data-date={day.dateString}
      role="gridcell"
      tabIndex={isFocused ? 0 : -1}
      type="button"
      onClick={handleClick}
    >
      {day.date}
    </button>
  );
});

DayCell.displayName = 'DayCell';

export default DayCell;
