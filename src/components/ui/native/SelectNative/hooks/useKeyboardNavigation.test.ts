import type { KeyboardEvent } from 'react';

import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { KEYS } from '../constants';
import { useKeyboardNavigation } from './useKeyboardNavigation';

import type { SelectOption } from '../types';

const MOCK_OPTIONS: SelectOption[] = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Bravo' },
  { value: 'c', label: 'Charlie' },
  { value: 'd', label: 'Delta' },
];

const LAST_INDEX = MOCK_OPTIONS.length - 1;

function createKeyEvent(key: string): KeyboardEvent {
  return { key, preventDefault: vi.fn() } as unknown as KeyboardEvent;
}

function createParams(overrides: Partial<Parameters<typeof useKeyboardNavigation>[0]> = {}): Parameters<typeof useKeyboardNavigation>[0] {
  return {
    isOpen: false,
    filteredOptions: MOCK_OPTIONS,
    highlightedIndex: -1,
    setHighlightedIndex: vi.fn(),
    select: vi.fn(),
    close: vi.fn(),
    open: vi.fn(),
    ...overrides,
  };
}

describe('useKeyboardNavigation', () => {
  describe('ArrowDown', () => {
    it('opens dropdown when closed', () => {
      const params = createParams({ isOpen: false });
      const { result } = renderHook(() => useKeyboardNavigation(params));
      const event = createKeyEvent(KEYS.ARROW_DOWN);

      result.current(event);

      expect(params.open).toHaveBeenCalledOnce();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('increments highlighted index when open', () => {
      const params = createParams({ isOpen: true, highlightedIndex: 0 });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.ARROW_DOWN));

      expect(params.setHighlightedIndex).toHaveBeenCalledWith(1);
    });

    it('clamps at last index (does not wrap)', () => {
      const params = createParams({ isOpen: true, highlightedIndex: LAST_INDEX });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.ARROW_DOWN));

      expect(params.setHighlightedIndex).toHaveBeenCalledWith(LAST_INDEX);
    });
  });

  describe('ArrowUp', () => {
    it('decrements highlighted index when open', () => {
      const params = createParams({ isOpen: true, highlightedIndex: 2 });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.ARROW_UP));

      expect(params.setHighlightedIndex).toHaveBeenCalledWith(1);
    });

    it('clamps at zero (does not wrap)', () => {
      const params = createParams({ isOpen: true, highlightedIndex: 0 });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.ARROW_UP));

      expect(params.setHighlightedIndex).toHaveBeenCalledWith(0);
    });

    it('opens dropdown when closed', () => {
      const params = createParams({ isOpen: false });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.ARROW_UP));

      expect(params.open).toHaveBeenCalled();
    });
  });

  describe('Enter', () => {
    it('opens dropdown when closed', () => {
      const params = createParams({ isOpen: false });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.ENTER));

      expect(params.open).toHaveBeenCalledOnce();
    });

    it('selects highlighted option when open', () => {
      const highlightedIndex = 2;
      const params = createParams({ isOpen: true, highlightedIndex });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.ENTER));

      expect(params.select).toHaveBeenCalledWith(MOCK_OPTIONS[highlightedIndex]);
    });

    it('does not select when highlighted index is negative', () => {
      const params = createParams({ isOpen: true, highlightedIndex: -1 });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.ENTER));

      expect(params.select).not.toHaveBeenCalled();
    });
  });

  describe('Space', () => {
    it('opens dropdown when closed', () => {
      const params = createParams({ isOpen: false });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.SPACE));

      expect(params.open).toHaveBeenCalledOnce();
    });

    it('selects highlighted option when open', () => {
      const params = createParams({ isOpen: true, highlightedIndex: 1 });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.SPACE));

      expect(params.select).toHaveBeenCalledWith(MOCK_OPTIONS[1]);
    });
  });

  describe('Escape', () => {
    it('closes dropdown when open', () => {
      const params = createParams({ isOpen: true });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.ESCAPE));

      expect(params.close).toHaveBeenCalledOnce();
    });

    it('calls preventDefault', () => {
      const params = createParams({ isOpen: true });
      const { result } = renderHook(() => useKeyboardNavigation(params));
      const event = createKeyEvent(KEYS.ESCAPE);

      result.current(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('Home', () => {
    it('sets highlighted index to 0 when open', () => {
      const params = createParams({ isOpen: true, highlightedIndex: 2 });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.HOME));

      expect(params.setHighlightedIndex).toHaveBeenCalledWith(0);
    });

    it('does nothing when closed', () => {
      const params = createParams({ isOpen: false });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.HOME));

      expect(params.setHighlightedIndex).not.toHaveBeenCalled();
    });
  });

  describe('End', () => {
    it('sets highlighted index to last index when open', () => {
      const params = createParams({ isOpen: true, highlightedIndex: 0 });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.END));

      expect(params.setHighlightedIndex).toHaveBeenCalledWith(LAST_INDEX);
    });

    it('does nothing when closed', () => {
      const params = createParams({ isOpen: false });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.END));

      expect(params.setHighlightedIndex).not.toHaveBeenCalled();
    });
  });

  describe('Tab', () => {
    it('closes dropdown when open', () => {
      const params = createParams({ isOpen: true });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.TAB));

      expect(params.close).toHaveBeenCalledOnce();
    });

    it('does nothing when closed', () => {
      const params = createParams({ isOpen: false });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent(KEYS.TAB));

      expect(params.close).not.toHaveBeenCalled();
    });
  });

  describe('unhandled keys', () => {
    it('does not call any handler for unrecognized keys', () => {
      const params = createParams({ isOpen: true });
      const { result } = renderHook(() => useKeyboardNavigation(params));

      result.current(createKeyEvent('a'));

      expect(params.open).not.toHaveBeenCalled();
      expect(params.close).not.toHaveBeenCalled();
      expect(params.select).not.toHaveBeenCalled();
      expect(params.setHighlightedIndex).not.toHaveBeenCalled();
    });
  });
});
