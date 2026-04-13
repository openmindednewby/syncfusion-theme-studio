import { type RefObject } from 'react';

import DateInput from './DateInput';
import RangeSeparator from './RangeSeparator';
import { DatePickerMode } from '../utils/datePickerMode';

interface DatePickerInputsProps {
  mode: DatePickerMode;
  triggerRef: RefObject<HTMLButtonElement>;
  ariaDescribedBy: string | undefined;
  disabled: boolean;
  hasError: boolean;
  id: string;
  isOpen: boolean;
  startValue: string;
  endValue: string;
  displayValue: string;
  resolvedPlaceholder: string;
  onToggle: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const DatePickerInputs = ({
  mode, triggerRef, ariaDescribedBy, disabled, hasError, id, isOpen,
  startValue, endValue, displayValue, resolvedPlaceholder, onToggle, onKeyDown,
}: DatePickerInputsProps): JSX.Element => {
  if (mode === DatePickerMode.Range)
    return (
      <div className="native-datepicker-range-row">
        <DateInput
          ref={triggerRef}
          ariaDescribedBy={ariaDescribedBy}
          disabled={disabled}
          hasError={hasError}
          id={id}
          isOpen={isOpen}
          placeholder="Start date"
          value={startValue}
          onClick={onToggle}
          onKeyDown={onKeyDown}
        />
        <RangeSeparator />
        <DateInput
          ariaDescribedBy={ariaDescribedBy}
          disabled={disabled}
          hasError={hasError}
          isOpen={isOpen}
          placeholder="End date"
          value={endValue}
          onClick={onToggle}
          onKeyDown={onKeyDown}
        />
      </div>
    );

  return (
    <DateInput
      ref={triggerRef}
      ariaDescribedBy={ariaDescribedBy}
      disabled={disabled}
      hasError={hasError}
      id={id}
      isOpen={isOpen}
      placeholder={resolvedPlaceholder}
      value={displayValue}
      onClick={onToggle}
      onKeyDown={onKeyDown}
    />
  );
};

export default DatePickerInputs;
