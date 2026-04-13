import { useState, useCallback } from 'react';

import type { ComboboxOption } from '../types';

type ValueArray = ReadonlyArray<string | number>;
type OnChange = ((values: ValueArray) => void) | undefined;

interface MultiSelectState {
  isOpen: boolean;
  highlightedIndex: number;
  toggle: () => void;
  open: () => void;
  close: () => void;
  toggleOption: (option: ComboboxOption) => void;
  removeValue: (val: string | number) => void;
  clearAll: () => void;
  setHighlightedIndex: (index: number) => void;
}

const INITIAL_HIGHLIGHT = -1;

interface OpenState {
  isOpen: boolean;
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/** Manages open/close and highlight index state. */
function useOpenState(): OpenState {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(INITIAL_HIGHLIGHT);

  const open = useCallback(() => {
    setIsOpen(true);
    setHighlightedIndex(INITIAL_HIGHLIGHT);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(INITIAL_HIGHLIGHT);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) setHighlightedIndex(INITIAL_HIGHLIGHT);
      return !prev;
    });
  }, []);

  return { isOpen, highlightedIndex, setHighlightedIndex, open, close, toggle };
}

interface ValueActions {
  toggleOption: (option: ComboboxOption) => void;
  removeValue: (val: string | number) => void;
  clearAll: () => void;
}

/** Manages multi-value selection callbacks. */
function useValueActions(value: ValueArray | undefined, onChange: OnChange): ValueActions {
  const toggleOption = useCallback(
    (option: ComboboxOption) => {
      const current = value ?? [];
      const exists = current.includes(option.value);
      const next = exists ? current.filter((v) => v !== option.value) : [...current, option.value];
      onChange?.(next);
    },
    [value, onChange],
  );

  const removeValue = useCallback(
    (val: string | number) => {
      const next = (value ?? []).filter((v) => v !== val);
      onChange?.(next);
    },
    [value, onChange],
  );

  const clearAll = useCallback(() => {
    onChange?.([]);
  }, [onChange]);

  return { toggleOption, removeValue, clearAll };
}

/**
 * Manages open/close state, multi-select toggling, and highlighted index.
 * Unlike useDropdownState, selecting an option does NOT close the popup.
 */
export function useMultiSelectState(value: ValueArray | undefined, onChange: OnChange): MultiSelectState {
  const { isOpen, highlightedIndex, setHighlightedIndex, open, close, toggle } = useOpenState();
  const { toggleOption, removeValue, clearAll } = useValueActions(value, onChange);

  return { isOpen, highlightedIndex, toggle, open, close, toggleOption, removeValue, clearAll, setHighlightedIndex };
}
