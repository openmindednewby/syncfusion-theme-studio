/**
 * SearchInputNative - Themed search input with magnifying glass icon and clear button.
 *
 * Wraps a native input with a search icon prefix and an IconX clear button suffix.
 * Uses .native-search-input CSS class with --component-input-* CSS variables.
 */
import { memo, forwardRef, useId, useState, useCallback, useRef, type InputHTMLAttributes, type ChangeEvent, type ForwardedRef } from 'react';

import { IconX } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

function getNativeInputSetter(): ((v: string) => void) | undefined {
  return Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
}

function assignRef(fwdRef: ForwardedRef<HTMLInputElement>, node: HTMLInputElement | null): void {
  if (typeof fwdRef === 'function') fwdRef(node);
  else if (isValueDefined(fwdRef)) fwdRef.current = node; // eslint-disable-line no-param-reassign -- merging forwarded ref
}

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  testId?: string;
  fullWidth?: boolean;
  label?: string;
}

const SEARCH_ICON = (
  <svg
    aria-hidden="true"
    className="native-search-icon"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx={11} cy={11} r={8} />
    <path d="m21 21-4.3-4.3" strokeLinecap="round" />
  </svg>
);

const SearchInputNative = forwardRef<HTMLInputElement, Props>(
  ({ testId, fullWidth = false, label, onChange, value, ...rest }, ref): JSX.Element => {
    const id = useId();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [internalValue, setInternalValue] = useState('');
    const displayValue = value ?? internalValue;
    const hasValue = String(displayValue).length > 0;

    const mergedRef = useCallback((node: HTMLInputElement | null) => {
      inputRef.current = node;
      assignRef(ref, node);
    }, [ref]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    }, [onChange]);

    const handleClear = useCallback(() => {
      setInternalValue('');
      const input = inputRef.current;
      if (isValueDefined(input)) {
        getNativeInputSetter()?.call(input, '');
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, []);

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')} data-testid={testId}>
        {isValueDefined(label) && (
          <label className="native-input-label" htmlFor={id}>{label}</label>
        )}
        <div className="relative">
          {SEARCH_ICON}
          <input
            ref={mergedRef}
            className={cn('native-search-input', fullWidth && 'w-full')}
            id={id}
            type="search"
            value={displayValue}
            onChange={handleChange}
            {...rest}
          />
          {hasValue ? (
            <button
              aria-label={FM('components.inputs.clearAriaLabel')}
              className="native-search-clear"
              tabIndex={-1}
              type="button"
              onClick={handleClear}
            >
              <IconX className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </div>
    );
  },
);

SearchInputNative.displayName = 'SearchInputNative';

export default memo(SearchInputNative);
export type { Props as SearchInputNativeProps };
