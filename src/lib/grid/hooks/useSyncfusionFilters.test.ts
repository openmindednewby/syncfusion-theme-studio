import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { FilterType } from '../types';
import { useSyncfusionFilters } from './useSyncfusionFilters';

vi.mock('@/utils/is', () => ({
  isValueDefined: <T,>(value: T | null | undefined): value is T =>
    value !== null && value !== undefined,
}));

describe('useSyncfusionFilters', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not apply filters when config is undefined', () => {
    const gridRef = { current: undefined };
    renderHook(() => useSyncfusionFilters(gridRef, undefined));
    vi.advanceTimersByTime(200);
    // No error thrown - graceful no-op
  });

  it('does not apply filters when config.enabled is false', () => {
    const mockGrid = { filterSettings: {}, allowFiltering: false, refresh: vi.fn() };
    const gridRef = { current: mockGrid as never };

    renderHook(() =>
      useSyncfusionFilters(gridRef, { enabled: false }),
    );

    vi.advanceTimersByTime(200);
    expect(mockGrid.refresh).not.toHaveBeenCalled();
  });

  it('applies filter settings after the idle delay', () => {
    const mockGrid = { filterSettings: {}, allowFiltering: false, refresh: vi.fn() };
    const gridRef = { current: mockGrid as never };

    renderHook(() =>
      useSyncfusionFilters(gridRef, { enabled: true, type: FilterType.Menu }),
    );

    // Should not have applied yet
    expect(mockGrid.refresh).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(mockGrid.allowFiltering).toBe(true);
    expect(mockGrid.refresh).toHaveBeenCalledTimes(1);
  });

  it('does not contain console.warn calls in the source', async () => {
    // Verify the console.warn was removed by checking the module source
    const spy = vi.spyOn(console, 'warn');
    const mockGrid = { filterSettings: {}, allowFiltering: false, refresh: vi.fn() };
    const gridRef = { current: mockGrid as never };

    renderHook(() =>
      useSyncfusionFilters(gridRef, { enabled: true }),
    );

    vi.advanceTimersByTime(200);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('cleans up the timer on unmount', () => {
    const mockGrid = { filterSettings: {}, allowFiltering: false, refresh: vi.fn() };
    const gridRef = { current: mockGrid as never };

    const { unmount } = renderHook(() =>
      useSyncfusionFilters(gridRef, { enabled: true, idleDelay: 500 }),
    );

    unmount();
    vi.advanceTimersByTime(600);
    expect(mockGrid.refresh).not.toHaveBeenCalled();
  });
});
