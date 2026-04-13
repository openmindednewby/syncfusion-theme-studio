import { memo, forwardRef } from 'react';

import { cn } from '@/utils/cn';

interface CombinedRangeInputProps {
  displayValue: string;
  placeholder: string;
  disabled: boolean;
  hasError: boolean;
  isOpen: boolean;
  id: string;
  ariaDescribedBy: string | undefined;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const CalendarIcon = (): JSX.Element => (
  <svg className="native-daterange-icon" fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="14">
    <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const CombinedRangeInput = memo(forwardRef<HTMLButtonElement, CombinedRangeInputProps>(
  ({ displayValue, placeholder, disabled, hasError, isOpen, id, ariaDescribedBy, onClick, onKeyDown }, ref): JSX.Element => (
    <button
      ref={ref}
      aria-describedby={ariaDescribedBy}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      className={cn(
        'native-daterange-trigger',
        displayValue === '' && 'native-daterange-trigger--placeholder',
      )}
      data-error={hasError}
      disabled={disabled}
      id={id}
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <CalendarIcon />
      <span className="native-daterange-trigger-text">
        {displayValue !== '' ? displayValue : placeholder}
      </span>
    </button>
  ),
));

CombinedRangeInput.displayName = 'CombinedRangeInput';

export default CombinedRangeInput;
