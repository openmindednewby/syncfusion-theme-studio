/**
 * DatePickerNative - Custom themed calendar date picker.
 *
 * Renders a fully custom calendar dropdown with single and range mode,
 * month/year navigation, week-day headers, and a 6-row day grid.
 * Uses `--component-datepicker-*` CSS variables for theming.
 * No Syncfusion dependency for minimal bundle size.
 */
import { memo, useId } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import CalendarPanel from './components/CalendarPanel';
import DatePickerInputs from './components/DatePickerInputs';
import { useDatePickerInteraction } from './hooks/useDatePickerInteraction';
import { DatePickerMode } from './utils/datePickerMode';

import type { DatePickerNativeProps } from './types';

const DatePickerNative = memo((
  {
    label,
    helperText,
    error,
    className,
    testId,
    fullWidth = false,
    required = false,
    mode = DatePickerMode.Single,
    value,
    startDate,
    endDate,
    minDate,
    maxDate,
    disabled = false,
    placeholder,
    onChange,
    onRangeChange,
  }: DatePickerNativeProps,
): JSX.Element => {
  const id = useId();
  const hasError = isValueDefined(error);
  const helperId = `${id}-helper`;
  const hasHelperOrError = isValueDefined(helperText) || hasError;
  const ariaDescribedBy = hasHelperOrError ? helperId : undefined;

  const {
    containerRef, triggerRef, isOpen, position, focusedIndex,
    viewYear, viewMonth, days, displayValue, startValue, endValue, resolvedPlaceholder,
    rangeEnd, rangeStart, selectedDate,
    toggleOpen, handleSelectDay, handleKeyDown, handleTriggerKeyDown,
    goToPrevMonth, goToNextMonth, goToYear,
  } = useDatePickerInteraction({
    disabled, mode, value, startDate, endDate, placeholder, onChange, onRangeChange,
  });

  return (
    <div
      ref={containerRef}
      className={cn('native-datepicker-container', fullWidth && 'w-full', className)}
      data-testid={testId}
    >
      {isValueDefined(label) && (
        <label className="native-datepicker-label" htmlFor={id}>
          {label}
          {required ? <span className="ml-0.5 text-error-500">*</span> : null}
        </label>
      )}
      <div className="native-datepicker-input-wrapper">
        <DatePickerInputs
          ariaDescribedBy={ariaDescribedBy}
          disabled={disabled}
          displayValue={displayValue}
          endValue={endValue}
          hasError={hasError}
          id={id}
          isOpen={isOpen}
          mode={mode}
          resolvedPlaceholder={resolvedPlaceholder}
          startValue={startValue}
          triggerRef={triggerRef}
          onKeyDown={handleTriggerKeyDown}
          onToggle={toggleOpen}
        />
        <CalendarPanel
          days={days}
          focusedIndex={focusedIndex}
          isOpen={isOpen}
          maxDate={maxDate}
          minDate={minDate}
          month={viewMonth}
          position={position}
          rangeEnd={rangeEnd}
          rangeStart={rangeStart}
          selectedDate={selectedDate}
          year={viewYear}
          onKeyDown={handleKeyDown}
          onNextMonth={goToNextMonth}
          onPrevMonth={goToPrevMonth}
          onSelectDay={handleSelectDay}
          onYearChange={goToYear}
        />
      </div>
      {hasHelperOrError ? (
        <span
          className={hasError ? 'native-datepicker-error' : 'native-datepicker-helper'}
          id={helperId}
        >
          {hasError ? error : helperText}
        </span>
      ) : null}
    </div>
  );
});

DatePickerNative.displayName = 'DatePickerNative';

export default DatePickerNative;
export { DatePickerMode } from './utils/datePickerMode';
export type { DatePickerNativeProps };
