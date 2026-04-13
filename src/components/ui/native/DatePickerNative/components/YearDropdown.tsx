import { memo, useRef, useEffect, useCallback, useMemo } from 'react';

import { useClickOutside } from '@/components/ui/native/SelectNative/hooks/useClickOutside';

import { YEAR_RANGE_OFFSET } from '../constants';

interface YearDropdownProps {
  currentYear: number;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (year: number) => void;
}

function buildYearList(currentYear: number): number[] {
  const startYear = currentYear - YEAR_RANGE_OFFSET;
  const count = YEAR_RANGE_OFFSET * 2 + 1;
  return Array.from({ length: count }, (_, i) => startYear + i);
}

const YearDropdown = memo(({ currentYear, isOpen, onClose, onSelect }: YearDropdownProps): JSX.Element | null => {
  const listRef = useRef<HTMLDivElement>(null);
  const years = useMemo(() => buildYearList(new Date().getFullYear()), []);
  useClickOutside(listRef, onClose, isOpen);

  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const selectedEl = listRef.current.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!selectedEl) return;
    const list = listRef.current;
    list.scrollTop = selectedEl.offsetTop - list.clientHeight / 2 + selectedEl.offsetHeight / 2;
  }, [isOpen, currentYear]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={listRef}
      aria-label="Select year"
      className="native-datepicker-year-dropdown"
      role="listbox"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {years.map((year) => (
        <button
          key={year}
          aria-selected={year === currentYear}
          className="native-datepicker-year-option"
          data-selected={year === currentYear || undefined}
          role="option"
          type="button"
          onClick={() => onSelect(year)}
        >
          {year}
        </button>
      ))}
    </div>
  );
});

YearDropdown.displayName = 'YearDropdown';

export default YearDropdown;
