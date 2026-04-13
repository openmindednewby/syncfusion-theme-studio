import { useCallback, type KeyboardEvent } from 'react';

import { KEYS } from '../constants';

import type { SelectOption } from '../types';

interface KeyboardNavParams {
  isOpen: boolean;
  filteredOptions: SelectOption[];
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  select: (option: SelectOption) => void;
  close: () => void;
  open: () => void;
}

type KeyHandler = (e: KeyboardEvent) => void;

/**
 * Handles keyboard navigation within the dropdown.
 * Arrow keys navigate, Enter/Space select, Escape closes, Home/End jump.
 */
export function useKeyboardNavigation(p: KeyboardNavParams): KeyHandler {
  const { isOpen, filteredOptions, highlightedIndex } = p;
  const { setHighlightedIndex, select, close, open } = p;

  return useCallback(
    (e: KeyboardEvent) => {
      const ctx = { isOpen, filteredOptions, highlightedIndex, setHighlightedIndex, select, close, open };

      if (e.key === KEYS.ARROW_DOWN || e.key === KEYS.ARROW_UP) handleVerticalNav(ctx, e);
      else if (e.key === KEYS.ENTER || e.key === KEYS.SPACE) handleSelectKey(ctx, e);
      else if (e.key === KEYS.ESCAPE) { e.preventDefault(); close(); }
      else if (e.key === KEYS.HOME || e.key === KEYS.END) handleJumpKey(ctx, e);
      else if (e.key === KEYS.TAB && isOpen) close();
    },
    [isOpen, filteredOptions, highlightedIndex, setHighlightedIndex, select, close, open],
  );
}

function handleVerticalNav(p: KeyboardNavParams, e: KeyboardEvent): void {
  const lastIndex = p.filteredOptions.length - 1;

  if (e.key === KEYS.ARROW_DOWN) {
    e.preventDefault();
    if (!p.isOpen) p.open();
    else p.setHighlightedIndex(Math.min(p.highlightedIndex + 1, lastIndex));
  } else {
    e.preventDefault();
    if (!p.isOpen) p.open();
    else p.setHighlightedIndex(Math.max(p.highlightedIndex - 1, 0));
  }
}

function handleSelectKey(p: KeyboardNavParams, e: KeyboardEvent): void {
  e.preventDefault();
  if (!p.isOpen) p.open();
  else if (p.highlightedIndex >= 0) {
    const option = p.filteredOptions[p.highlightedIndex];
    if (option) p.select(option);
  }
}

function handleJumpKey(p: KeyboardNavParams, e: KeyboardEvent): void {
  e.preventDefault();
  if (!p.isOpen) return;

  const lastIndex = p.filteredOptions.length - 1;
  p.setHighlightedIndex(e.key === KEYS.HOME ? 0 : lastIndex);
}
