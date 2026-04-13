import { useState, useCallback } from 'react';

import type { SelectOption } from '../types';

interface DropdownState {
  isOpen: boolean;
  highlightedIndex: number;
  toggle: () => void;
  open: () => void;
  close: () => void;
  select: (option: SelectOption) => void;
  setHighlightedIndex: (index: number) => void;
}

const INITIAL_HIGHLIGHT = -1;

/**
 * Manages open/close state, selected value tracking, and highlighted index.
 */
export function useDropdownState(
  onChange: ((value: string | number) => void) | undefined,
): DropdownState {
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

  const select = useCallback(
    (option: SelectOption) => {
      onChange?.(option.value);
      setIsOpen(false);
      setHighlightedIndex(INITIAL_HIGHLIGHT);
    },
    [onChange],
  );

  return { isOpen, highlightedIndex, toggle, open, close, select, setHighlightedIndex };
}
