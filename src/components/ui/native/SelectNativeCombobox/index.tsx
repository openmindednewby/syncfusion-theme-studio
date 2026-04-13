/**
 * SelectNativeCombobox - Multi-select combobox with chip pills.
 *
 * Uses `--component-select-combo-*` CSS variables for chip/clear styling
 * and inherits `--component-select-*` variables for trigger/popup.
 * Reuses hooks from SelectNative for positioning, click-outside, search, and keyboard.
 */
import { memo, forwardRef, useId, useRef, useCallback, useMemo, useEffect } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import ComboboxPopup from './components/ComboboxPopup';
import ComboboxTrigger from './components/ComboboxTrigger';
import { useMultiSelectState } from './hooks/useMultiSelectState';
import { useClickOutside } from '../SelectNative/hooks/useClickOutside';
import { useKeyboardNavigation } from '../SelectNative/hooks/useKeyboardNavigation';
import { usePopupPosition } from '../SelectNative/hooks/usePopupPosition';
import { useSearchFilter } from '../SelectNative/hooks/useSearchFilter';

import type { SelectNativeComboboxProps, ComboboxOption } from './types';

interface ComboboxIds {
  helperId: string;
  triggerId: string;
  listboxId: string;
  optionIdPrefix: string;
}

function buildIds(baseId: string): ComboboxIds {
  return {
    helperId: `${baseId}-helper`,
    triggerId: `${baseId}-trigger`,
    listboxId: `${baseId}-listbox`,
    optionIdPrefix: `${baseId}-option`,
  };
}

function renderFooter(hasError: boolean, error: string | undefined, helperText: string | undefined, helperId: string): JSX.Element | null {
  const hasContent = isValueDefined(helperText) || hasError;
  if (!hasContent) return null;

  const textClass = cn('text-sm', hasError ? 'text-error-500' : 'text-text-secondary');
  return <span className={textClass} id={helperId}>{hasError ? error : helperText}</span>;
}

const SelectNativeCombobox = forwardRef<HTMLDivElement, SelectNativeComboboxProps>(
  (
    {
      options,
      label,
      helperText,
      error,
      placeholder = 'Select options...',
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
    const triggerRef = useRef<HTMLDivElement>(null);
    const hasError = isValueDefined(error);
    const { helperId, triggerId, listboxId, optionIdPrefix } = buildIds(id);

    const { isOpen, highlightedIndex, toggle, open, close, toggleOption, removeValue, clearAll, setHighlightedIndex } =
      useMultiSelectState(value, onChange);

    const { filteredOptions, searchValue, setSearchValue, searchInputRef } =
      useSearchFilter(options, isOpen);

    const position = usePopupPosition(triggerRef, isOpen);
    useClickOutside(containerRef, close, isOpen);

    // Wrap toggleOption as the `select` param for keyboard navigation
    const handleKeyboardSelect = useCallback(
      (option: ComboboxOption) => toggleOption(option),
      [toggleOption],
    );

    const handleKeyDown = useKeyboardNavigation({
      isOpen, filteredOptions, highlightedIndex, setHighlightedIndex,
      select: handleKeyboardSelect, close, open,
    });

    const handleToggle = useCallback(() => {
      if (!disabled) toggle();
    }, [disabled, toggle]);

    const selectedOptions = useMemo(
      () => options.filter((opt) => isValueDefined(value) && value.includes(opt.value)),
      [options, value],
    );

    const activeDescendantId =
      isOpen && highlightedIndex >= 0 ? `${optionIdPrefix}-${highlightedIndex}` : undefined;

    useEffect(() => {
      if (isOpen && searchable) searchInputRef.current?.focus();
    }, [isOpen, searchable, searchInputRef]);

    const hiddenValue = value ? value.join(',') : '';

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-1', fullWidth && 'w-full', className)}
        data-testid={testId}
      >
        {isValueDefined(label) ? (
          <label className="native-input-label" htmlFor={triggerId}>
            {label}
            {required ? <span className="ml-0.5 text-error-500">*</span> : null}
          </label>
        ) : null}
        <div ref={containerRef} className="relative">
          <ComboboxTrigger
            ref={triggerRef}
            activeDescendantId={activeDescendantId}
            ariaLabel={label ?? placeholder}
            disabled={disabled}
            hasError={hasError}
            isOpen={isOpen}
            listboxId={listboxId}
            placeholder={placeholder}
            selectedOptions={selectedOptions}
            triggerId={triggerId}
            onClearAll={clearAll}
            onKeyDown={handleKeyDown}
            onRemove={removeValue}
            onToggle={handleToggle}
          />
          <ComboboxPopup
            highlightedIndex={highlightedIndex}
            isOpen={isOpen}
            listboxId={listboxId}
            optionIdPrefix={optionIdPrefix}
            options={filteredOptions}
            position={position}
            searchable={searchable}
            searchInputRef={searchInputRef}
            searchValue={searchValue}
            selectedValues={value ?? []}
            onHighlight={setHighlightedIndex}
            onSearchChange={setSearchValue}
            onToggle={toggleOption}
          />
          <input name={name} type="hidden" value={hiddenValue} />
        </div>
        {renderFooter(hasError, error, helperText, helperId)}
      </div>
    );
  },
);

SelectNativeCombobox.displayName = 'SelectNativeCombobox';

export default memo(SelectNativeCombobox);
export type { SelectNativeComboboxProps, ComboboxOption };
