import { describe, it, expect, vi } from 'vitest';

import { preloadSyncfusionModules } from './syncfusionLazy';

describe('syncfusionLazy', () => {
  describe('preloadSyncfusionModules', () => {
    const FALLBACK_DELAY_MS = 100;

    describe('when requestIdleCallback is available', () => {
      it('calls requestIdleCallback with preload function', () => {
        const mockRequestIdleCallback = vi.fn();
        window.requestIdleCallback = mockRequestIdleCallback;

        preloadSyncfusionModules();

        expect(mockRequestIdleCallback).toHaveBeenCalledTimes(1);
        expect(mockRequestIdleCallback).toHaveBeenCalledWith(expect.any(Function), {
          timeout: 2000,
        });
      });
    });

    describe('when requestIdleCallback is not available', () => {
      it('falls back to setTimeout', () => {
        const originalRequestIdleCallback = window.requestIdleCallback;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).requestIdleCallback;

        vi.useFakeTimers();

        preloadSyncfusionModules();

        vi.advanceTimersByTime(FALLBACK_DELAY_MS);

        vi.useRealTimers();

        window.requestIdleCallback = originalRequestIdleCallback;
      });

      it('executes preload callback after fallback delay', () => {
        const originalRequestIdleCallback = window.requestIdleCallback;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).requestIdleCallback;

        const setTimeoutSpy = vi.spyOn(window, 'setTimeout');

        preloadSyncfusionModules();

        expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), FALLBACK_DELAY_MS);

        setTimeoutSpy.mockRestore();
        window.requestIdleCallback = originalRequestIdleCallback;
      });
    });
  });
});
