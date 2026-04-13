import { memo, forwardRef } from 'react';

import { cn } from '@/utils/cn';

interface DateInputProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  isOpen?: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  id?: string;
  ariaDescribedBy: string | undefined;
}

const DateInput = memo(forwardRef<HTMLButtonElement, DateInputProps>(
  ({ value, placeholder = 'Select date', disabled, hasError, isOpen, onClick, onKeyDown, id, ariaDescribedBy }, ref): JSX.Element => (
    <button
      ref={ref}
      aria-describedby={ariaDescribedBy}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      className={cn(
        'native-datepicker-trigger',
        value === '' && 'native-datepicker-trigger--placeholder',
      )}
      data-error={hasError}
      disabled={disabled}
      id={id}
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <span className="native-datepicker-trigger-text">
        {value !== '' ? value : placeholder}
      </span>
      <svg className="native-datepicker-trigger-icon" fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="14">
        <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
    </button>
  ),
));

DateInput.displayName = 'DateInput';

export default DateInput;
