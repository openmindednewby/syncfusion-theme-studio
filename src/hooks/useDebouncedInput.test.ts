import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { useDebouncedInput } from './useDebouncedInput';

const DELAY_MS = 300;

describe('useDebouncedInput', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the initial value', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedInput<string>('hello', onChange, DELAY_MS),
    );

    expect(result.current.localValue).toBe('hello');
  });

  it('updates local value immediately on handleChange', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedInput<string>('initial', onChange, DELAY_MS),
    );

    act(() => {
      result.current.handleChange('updated');
    });

    expect(result.current.localValue).toBe('updated');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onChange after the delay', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedInput<string>('initial', onChange, DELAY_MS),
    );

    act(() => {
      result.current.handleChange('updated');
    });

    act(() => {
      vi.advanceTimersByTime(DELAY_MS);
    });

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('updated');
  });

  it('resets timer on rapid changes and only fires the last value', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedInput<string>('initial', onChange, DELAY_MS),
    );

    act(() => {
      result.current.handleChange('first');
    });

    act(() => {
      vi.advanceTimersByTime(DELAY_MS / 2);
    });

    act(() => {
      result.current.handleChange('second');
    });

    act(() => {
      vi.advanceTimersByTime(DELAY_MS / 2);
    });

    act(() => {
      result.current.handleChange('third');
    });

    act(() => {
      vi.advanceTimersByTime(DELAY_MS);
    });

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('third');
  });

  it('cleans up timeout on unmount', () => {
    const onChange = vi.fn();
    const { result, unmount } = renderHook(() =>
      useDebouncedInput<string>('initial', onChange, DELAY_MS),
    );

    act(() => {
      result.current.handleChange('updated');
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(DELAY_MS);
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('syncs local value when external value changes', () => {
    const onChange = vi.fn();
    let externalValue = 'initial';

    const { result, rerender } = renderHook(() =>
      useDebouncedInput<string>(externalValue, onChange, DELAY_MS),
    );

    expect(result.current.localValue).toBe('initial');

    externalValue = 'externally-updated';
    rerender();

    expect(result.current.localValue).toBe('externally-updated');
  });

  it('works with number values', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedInput<number>(42, onChange, DELAY_MS),
    );

    expect(result.current.localValue).toBe(42);

    act(() => {
      result.current.handleChange(99);
    });

    expect(result.current.localValue).toBe(99);

    act(() => {
      vi.advanceTimersByTime(DELAY_MS);
    });

    expect(onChange).toHaveBeenCalledWith(99);
  });
});
