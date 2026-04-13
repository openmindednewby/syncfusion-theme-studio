/**
 * DateRangePickerNative - Date range picker with preset ranges and dual calendars.
 *
 * Renders a combined range input that opens a panel with:
 * - Preset range sidebar (Today, Yesterday, This week, etc.)
 * - Two side-by-side calendar panels for visual range selection
 *
 * Matches the Figma datepicker component design.
 */
import { memo, useId } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import CombinedRangeInput from './components/CombinedRangeInput';
import RangeCalendarPanel from './components/RangeCalendarPanel';
import { useDateRangeInteraction } from './hooks/useDateRangeInteraction';
import { PanelAlign } from './types';

import type { DateRangePickerNativeProps } from './types';

const DateRangePickerNative = memo(({
  label,
  helperText,
  error,
  className,
  testId,
  fullWidth = false,
  required = false,
  align = PanelAlign.Left,
  startDate,
  endDate,
  minDate,
  maxDate,
  disabled = false,
  placeholder,
  onRangeChange,
}: DateRangePickerNativeProps): JSX.Element => {
  const id = useId();
  const hasError = isValueDefined(error);
  const helperId = `${id}-helper`;
  const hasHelperOrError = isValueDefined(helperText) || hasError;
  const ariaDescribedBy = hasHelperOrError ? helperId : undefined;

  const {
    containerRef, triggerRef, isOpen, position, displayValue, activePreset,
    leftYear, leftMonth, leftDays, rightYear, rightMonth, rightDays,
    rangeStart, rangeEnd, resolvedPlaceholder,
    toggleOpen, goToPrevMonth, goToNextMonth,
    handleSelectDay, handleSelectPreset, handleCustomRange, handleTriggerKeyDown,
  } = useDateRangeInteraction({ disabled, startDate, endDate, placeholder, onRangeChange });

  return (
    <div
      ref={containerRef}
      className={cn('native-datepicker-container', fullWidth && 'w-full', className)}
      data-testid={testId}
    >
      {isValueDefined(label) ? (
        <label className="native-datepicker-label" htmlFor={id}>
          {label}
          {required ? <span className="ml-0.5 text-error-500">*</span> : null}
        </label>
      ) : null}
      <div className="native-datepicker-input-wrapper">
        <CombinedRangeInput
          ref={triggerRef}
          ariaDescribedBy={ariaDescribedBy}
          disabled={disabled}
          displayValue={displayValue}
          hasError={hasError}
          id={id}
          isOpen={isOpen}
          placeholder={resolvedPlaceholder}
          onClick={toggleOpen}
          onKeyDown={handleTriggerKeyDown}
        />
        {isOpen ? (
          <RangeCalendarPanel
            activePreset={activePreset}
            align={align}
            isOpen={isOpen}
            leftDays={leftDays}
            leftMonth={leftMonth}
            leftYear={leftYear}
            maxDate={maxDate}
            minDate={minDate}
            position={position}
            rangeEnd={rangeEnd}
            rangeStart={rangeStart}
            rightDays={rightDays}
            rightMonth={rightMonth}
            rightYear={rightYear}
            onCustomRange={handleCustomRange}
            onNextMonth={goToNextMonth}
            onPrevMonth={goToPrevMonth}
            onSelectDay={handleSelectDay}
            onSelectPreset={handleSelectPreset}
          />
        ) : null}
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

DateRangePickerNative.displayName = 'DateRangePickerNative';

export default DateRangePickerNative;
export type { DateRangePickerNativeProps };
