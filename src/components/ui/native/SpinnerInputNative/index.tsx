/**
 * SpinnerInputNative - Numeric input with up/down or left/right chevron buttons.
 *
 * Uses .native-spinner-* CSS classes with --component-input-* CSS variables.
 * Supports `SpinnerVariant.Vertical` (default) and `SpinnerVariant.Horizontal`.
 */
import { memo, forwardRef, useId, useCallback, type InputHTMLAttributes, type Ref } from 'react';

import { IconChevronDown, IconChevronLeft, IconChevronRight, IconChevronUp } from '@/components/icons/FeatherIconsC1';
import type { BaseInputProps } from '@/components/ui/shared/inputTypes';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import { SpinnerVariant } from './spinnerVariant';

const ICON_CLASS = 'h-3 w-3';

interface Props extends Omit<BaseInputProps, 'className'>,
  Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  variant?: SpinnerVariant;
  onValueChange?: (value: number) => void;
}

interface SpinnerBodyProps {
  inputRef: Ref<HTMLInputElement>;
  hasHelperOrError: boolean;
  helperId: string;
  hasError: boolean;
  disabled: boolean | undefined;
  id: string;
  label: string | undefined;
  min: number | undefined;
  max: number | undefined;
  step: number;
  value: number | undefined;
  onValueChange: ((value: number) => void) | undefined;
  increment: () => void;
  decrement: () => void;
  rest: Record<string, unknown>;
}

const HorizontalBody = (p: SpinnerBodyProps): JSX.Element => (
  <>
    <button
      aria-label="Decrease value"
      className="native-spinner-btn-side"
      disabled={p.disabled}
      tabIndex={-1}
      type="button"
      onClick={p.decrement}
    >
      <IconChevronLeft className={ICON_CLASS} />
    </button>
    <input
      ref={p.inputRef}
      aria-describedby={p.hasHelperOrError ? p.helperId : undefined}
      aria-invalid={p.hasError}
      aria-label={p.label}
      className="native-spinner-input"
      disabled={p.disabled}
      id={p.id}
      max={p.max}
      min={p.min}
      step={p.step}
      type="number"
      value={p.value}
      onChange={(e) => p.onValueChange?.(Number(e.target.value))}
      {...p.rest}
    />
    <button
      aria-label="Increase value"
      className="native-spinner-btn-side"
      disabled={p.disabled}
      tabIndex={-1}
      type="button"
      onClick={p.increment}
    >
      <IconChevronRight className={ICON_CLASS} />
    </button>
  </>
);

const VerticalBody = (p: SpinnerBodyProps): JSX.Element => (
  <>
    <input
      ref={p.inputRef}
      aria-describedby={p.hasHelperOrError ? p.helperId : undefined}
      aria-invalid={p.hasError}
      aria-label={p.label}
      className="native-spinner-input"
      disabled={p.disabled}
      id={p.id}
      max={p.max}
      min={p.min}
      step={p.step}
      type="number"
      value={p.value}
      onChange={(e) => p.onValueChange?.(Number(e.target.value))}
      {...p.rest}
    />
    <div className="native-spinner-buttons">
      <button
        aria-label="Increase value"
        className="native-spinner-btn"
        disabled={p.disabled}
        tabIndex={-1}
        type="button"
        onClick={p.increment}
      >
        <IconChevronUp className={ICON_CLASS} />
      </button>
      <button
        aria-label="Decrease value"
        className="native-spinner-btn"
        disabled={p.disabled}
        tabIndex={-1}
        type="button"
        onClick={p.decrement}
      >
        <IconChevronDown className={ICON_CLASS} />
      </button>
    </div>
  </>
);

const SpinnerInputNative = forwardRef<HTMLInputElement, Props>(
  (
    {
      label, helperText, error, testId, fullWidth = false, required = false,
      min, max, step = 1, value, onValueChange, disabled,
      variant = SpinnerVariant.Vertical, ...rest
    },
    ref,
  ): JSX.Element => {
    const id = useId();
    const hasError = isValueDefined(error);
    const helperId = `${id}-helper`;
    const hasHelperOrError = isValueDefined(helperText) || hasError;

    const increment = useCallback(() => {
      if (disabled === true) return;
      const next = (value ?? 0) + step;
      if (isValueDefined(max) && next > max) return;
      onValueChange?.(next);
    }, [disabled, value, step, max, onValueChange]);

    const decrement = useCallback(() => {
      if (disabled === true) return;
      const next = (value ?? 0) - step;
      if (isValueDefined(min) && next < min) return;
      onValueChange?.(next);
    }, [disabled, value, step, min, onValueChange]);

    const isHorizontal = variant === SpinnerVariant.Horizontal;
    const Body = isHorizontal ? HorizontalBody : VerticalBody;
    const bodyProps: SpinnerBodyProps = {
      inputRef: ref, hasHelperOrError, helperId, hasError, disabled,
      id, label, min, max, step, value, onValueChange, increment, decrement, rest,
    };

    return (
      <div
        className={cn('flex flex-col gap-1', fullWidth && 'w-full')}
        data-testid={testId}
      >
        {isValueDefined(label) && (
          <label className="native-input-label" htmlFor={id}>
            {label}
            {required ? <span className="ml-0.5 text-error-500">*</span> : null}
          </label>
        )}
        <div className={cn(
          isHorizontal ? 'native-spinner-wrapper--horizontal' : 'native-spinner-wrapper',
          fullWidth && 'w-full',
        )}>
          <Body {...bodyProps} />
        </div>
        {hasHelperOrError ? (
          <span className={hasError ? 'native-input-error' : 'native-input-helper'} id={helperId}>
            {hasError ? error : helperText}
          </span>
        ) : null}
      </div>
    );
  },
);

SpinnerInputNative.displayName = 'SpinnerInputNative';

export default memo(SpinnerInputNative);
export type { Props as SpinnerInputNativeProps };
