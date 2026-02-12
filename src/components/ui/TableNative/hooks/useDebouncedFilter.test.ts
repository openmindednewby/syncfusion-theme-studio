import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import useDebouncedFilter, { FILTER_DEBOUNCE_MS } from './useDebouncedFilter';

describe('useDebouncedFilter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the external value as localValue initially', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedFilter('name', 'initial', onChange),
    );

    expect(result.current.localValue).toBe('initial');
  });

  it('updates localValue immediately on handleChange', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedFilter('name', '', onChange),
    );

    act(() => {
      result.current.handleChange('typed');
    });

    expect(result.current.localValue).toBe('typed');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onChange after debounce delay', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedFilter('name', '', onChange),
    );

    act(() => {
      result.current.handleChange('hello');
    });

    expect(onChange).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(FILTER_DEBOUNCE_MS);
    });

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('name', 'hello');
  });

  it('resets the timer on rapid changes and only fires once', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedFilter('price', '', onChange),
    );

    act(() => {
      result.current.handleChange('1');
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      result.current.handleChange('12');
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      result.current.handleChange('123');
    });

    expect(onChange).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(FILTER_DEBOUNCE_MS);
    });

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('price', '123');
  });

  it('does not call onChange when localValue matches externalValue', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedFilter('name', 'same', onChange),
    );

    act(() => {
      result.current.handleChange('same');
    });

    act(() => {
      vi.advanceTimersByTime(FILTER_DEBOUNCE_MS);
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('syncs localValue when external value prop changes', () => {
    const onChange = vi.fn();
    let externalValue = 'old';

    const { result, rerender } = renderHook(() =>
      useDebouncedFilter('name', externalValue, onChange),
    );

    expect(result.current.localValue).toBe('old');

    externalValue = 'new';
    rerender();

    expect(result.current.localValue).toBe('new');
  });

  it('cleans up timer on unmount', () => {
    const onChange = vi.fn();
    const { result, unmount } = renderHook(() =>
      useDebouncedFilter('name', '', onChange),
    );

    act(() => {
      result.current.handleChange('typing');
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(FILTER_DEBOUNCE_MS);
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('uses the correct field name in callback', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedFilter('email', '', onChange),
    );

    act(() => {
      result.current.handleChange('test@example.com');
    });

    act(() => {
      vi.advanceTimersByTime(FILTER_DEBOUNCE_MS);
    });

    expect(onChange).toHaveBeenCalledWith('email', 'test@example.com');
  });
});
