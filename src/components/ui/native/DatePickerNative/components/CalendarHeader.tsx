import { memo, useState, useCallback } from 'react';

import { MONTH_NAMES } from '../constants';
import YearDropdown from './YearDropdown';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onYearChange: (year: number) => void;
}

const CalendarHeader = memo(({ year, month, onPrev, onNext, onYearChange }: CalendarHeaderProps): JSX.Element => {
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const toggleYearDropdown = useCallback(() => {
    setIsYearDropdownOpen((prev) => !prev);
  }, []);

  const closeYearDropdown = useCallback(() => {
    setIsYearDropdownOpen(false);
  }, []);

  const handleYearSelect = useCallback((selectedYear: number) => {
    onYearChange(selectedYear);
    setIsYearDropdownOpen(false);
  }, [onYearChange]);

  return (
    <div className="native-datepicker-header">
      <button
        aria-label="Previous month"
        className="native-datepicker-nav-btn"
        type="button"
        onClick={onPrev}
      >
        <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="14">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <span className="native-datepicker-header-title">
        {MONTH_NAMES[month]}{' '}
        <button
          aria-expanded={isYearDropdownOpen}
          aria-haspopup="listbox"
          aria-label="Select year"
          className="native-datepicker-year-btn"
          type="button"
          onClick={toggleYearDropdown}
        >
          {year}
        </button>
        <YearDropdown
          currentYear={year}
          isOpen={isYearDropdownOpen}
          onClose={closeYearDropdown}
          onSelect={handleYearSelect}
        />
      </span>
      <button
        aria-label="Next month"
        className="native-datepicker-nav-btn"
        type="button"
        onClick={onNext}
      >
        <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="14">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
});

CalendarHeader.displayName = 'CalendarHeader';

export default CalendarHeader;
