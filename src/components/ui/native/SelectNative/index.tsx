/**
 * SelectNative - Custom themed dropdown select using native HTML.
 *
 * Provides a fully custom dropdown matching Syncfusion's visual design,
 * using `--component-select-*` CSS variables. Supports search/filter,
 * keyboard navigation (WAI-ARIA listbox pattern), and form compatibility
 * via a hidden input.
 * No Syncfusion dependency for minimal bundle size.
 */
import { memo, forwardRef, useId, useRef, useCallback, useMemo, useEffect } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import DropdownPopup from './components/DropdownPopup';
import DropdownTrigger from './components/DropdownTrigger';
import { useClickOutside } from './hooks/useClickOutside';
import { useDropdownState } from './hooks/useDropdownState';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { usePopupPosition } from './hooks/usePopupPosition';
import { useSearchFilter } from './hooks/useSearchFilter';

import type { SelectNativeProps, SelectOption } from './types';

interface SelectIds {
  helperId: string;
  triggerId: string;
  listboxId: string;
  optionIdPrefix: string;
}

/** Builds stable ID strings from a base ID */
function buildIds(baseId: string): SelectIds {
  return {
    helperId: `${baseId}-helper`,
    triggerId: `${baseId}-trigger`,
    listboxId: `${baseId}-listbox`,
    optionIdPrefix: `${baseId}-option`,
  };
}

/** Returns the helper/error text element or null */
function renderFooter(hasError: boolean, error: string | undefined, helperText: string | undefined, helperId: string): JSX.Element | null {
  const hasContent = isValueDefined(helperText) || hasError;
  if (!hasContent) return null;

  const textClass = cn('text-sm', hasError ? 'text-error-500' : 'text-text-secondary');
  return <span className={textClass} id={helperId}>{hasError ? error : helperText}</span>;
}

const SelectNative = forwardRef<HTMLDivElement, SelectNativeProps>(
  (
    {
      options,
      label,
      helperText,
      error,
      placeholder = 'Select an option',
      className,
      testId,
      fullWidth = false,
      required = false,
      disabled = false,
      value,
      onChange,
      searchable = false,
      name,
    },
    ref,
  ): JSX.Element => {
    const id = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const hasError = isValueDefined(error);
    const { helperId, triggerId, listboxId, optionIdPrefix } = buildIds(id);

    const { isOpen, highlightedIndex, toggle, open, close, select, setHighlightedIndex } =
      useDropdownState(onChange);

    const { filteredOptions, searchValue, setSearchValue, searchInputRef } =
      useSearchFilter(options, isOpen);

    const position = usePopupPosition(triggerRef, isOpen);
    useClickOutside(containerRef, close, isOpen);

    const handleKeyDown = useKeyboardNavigation({
      isOpen, filteredOptions, highlightedIndex, setHighlightedIndex, select, close, open,
    });

    const handleToggle = useCallback(() => {
      if (!disabled) toggle();
    }, [disabled, toggle]);

    const selectedLabel = useMemo(
      () => options.find((opt) => opt.value === value)?.label,
      [options, value],
    );

    const activeDescendantId =
      isOpen && highlightedIndex >= 0 ? `${optionIdPrefix}-${highlightedIndex}` : undefined;

    useEffect(() => {
      if (isOpen && searchable) searchInputRef.current?.focus();
    }, [isOpen, searchable, searchInputRef]);

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-1', fullWidth && 'w-full', className)}
        data-testid={testId}
      >
        {isValueDefined(label) ? (
          <label className="text-sm font-medium text-text-primary" htmlFor={triggerId}>
            {label}
            {required ? <span className="ml-0.5 text-error-500">*</span> : null}
          </label>
        ) : null}
        <div ref={containerRef} className="relative">
          <DropdownTrigger
            ref={triggerRef}
            activeDescendantId={activeDescendantId}
            disabled={disabled}
            hasError={hasError}
            isOpen={isOpen}
            listboxId={listboxId}
            placeholder={placeholder}
            selectedLabel={selectedLabel}
            triggerId={triggerId}
            onKeyDown={handleKeyDown}
            onToggle={handleToggle}
          />
          <DropdownPopup
            highlightedIndex={highlightedIndex}
            isOpen={isOpen}
            listboxId={listboxId}
            optionIdPrefix={optionIdPrefix}
            options={filteredOptions}
            position={position}
            searchable={searchable}
            searchInputRef={searchInputRef}
            searchValue={searchValue}
            selectedValue={value}
            onHighlight={setHighlightedIndex}
            onSearchChange={setSearchValue}
            onSelect={select}
          />
          <input name={name} type="hidden" value={String(value ?? '')} />
        </div>
        {renderFooter(hasError, error, helperText, helperId)}
      </div>
    );
  },
);

SelectNative.displayName = 'SelectNative';

export default memo(SelectNative);
export type { SelectNativeProps, SelectOption as SelectNativeOption };
