import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { startFontPreload } from './fontPreloader';

const IDLE_TIMEOUT_MS = 1000;
const FALLBACK_DELAY_MS = 50;

describe('fontPreloader', () => {
  describe('startFontPreload', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    describe('when requestIdleCallback is available', () => {
      it('registers a callback with the idle timeout', () => {
        const spy = vi.fn();
        window.requestIdleCallback = spy;

        startFontPreload();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(expect.any(Function), {
          timeout: IDLE_TIMEOUT_MS,
        });
      });

      it('starts font imports when idle callback fires', async () => {
        let idleCallback: (() => void) | undefined;
        window.requestIdleCallback = vi.fn((cb) => {
          idleCallback = cb as () => void;
          return 0;
        });

        startFontPreload();
        idleCallback?.();

        await vi.advanceTimersByTimeAsync(0);
      });
    });

    describe('when requestIdleCallback is not available', () => {
      it('falls back to setTimeout with fallback delay', () => {
        const original = window.requestIdleCallback;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).requestIdleCallback;

        const setTimeoutSpy = vi.spyOn(window, 'setTimeout');

        startFontPreload();

        expect(setTimeoutSpy).toHaveBeenCalledWith(
          expect.any(Function),
          FALLBACK_DELAY_MS,
        );

        setTimeoutSpy.mockRestore();
        window.requestIdleCallback = original;
      });
    });
  });
});
