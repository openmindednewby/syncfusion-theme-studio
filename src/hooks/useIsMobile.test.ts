import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useIsMobile } from './useIsMobile';

describe('useIsMobile', () => {
  let listeners: Array<(e: MediaQueryListEvent) => void>;
  let currentMatches: boolean;

  beforeEach(() => {
    listeners = [];
    currentMatches = false;

    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: currentMatches,
      media: query,
      addEventListener: (_event: string, cb: (e: MediaQueryListEvent) => void) => {
        listeners.push(cb);
      },
      removeEventListener: (_event: string, cb: (e: MediaQueryListEvent) => void) => {
        listeners = listeners.filter((l) => l !== cb);
      },
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns false when viewport is wider than 768px', () => {
    currentMatches = false;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('returns true when viewport is at or below 768px', () => {
    currentMatches = true;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('updates when the media query changes', () => {
    currentMatches = false;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      for (const listener of listeners)
        listener({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });

  it('cleans up the event listener on unmount', () => {
    currentMatches = false;
    const { unmount } = renderHook(() => useIsMobile());
    expect(listeners).toHaveLength(1);

    unmount();
    expect(listeners).toHaveLength(0);
  });
});
