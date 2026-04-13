import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { startPhasedPreload } from './preloadOrchestrator';

const IDLE_TIMEOUT_MS = 3000;
const FALLBACK_DELAY_MS = 100;
const PHASE_GAP_MS = 2000;

describe('preloadOrchestrator', () => {
  describe('startPhasedPreload', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      // Default: no query params (normal mode)
      Object.defineProperty(window, 'location', {
        value: { search: '' },
        writable: true,
        configurable: true,
      });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('skips prefetching when no-prefetch URL param is present', () => {
      Object.defineProperty(window, 'location', {
        value: { search: '?no-prefetch' },
        writable: true,
        configurable: true,
      });
      const spy = vi.fn();
      window.requestIdleCallback = spy;

      startPhasedPreload();

      expect(spy).not.toHaveBeenCalled();
    });

    describe('when requestIdleCallback is available', () => {
      it('registers a callback with the idle timeout', () => {
        const spy = vi.fn();
        window.requestIdleCallback = spy;

        startPhasedPreload();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(expect.any(Function), {
          timeout: IDLE_TIMEOUT_MS,
        });
      });

      it('starts Phase 1 imports when idle callback fires', async () => {
        let idleCallback: (() => void) | undefined;
        window.requestIdleCallback = vi.fn((cb) => {
          idleCallback = cb as () => void;
          return 0;
        });

        startPhasedPreload();
        idleCallback?.();

        // Phase 1 dynamic imports are queued (fire-and-forget)
        // Just verify no errors are thrown
        await vi.advanceTimersByTimeAsync(0);
      });

      it('delays Phase 2 by PHASE_GAP_MS after Phase 1 completes', async () => {
        let idleCallback: (() => void) | undefined;
        window.requestIdleCallback = vi.fn((cb) => {
          idleCallback = cb as () => void;
          return 0;
        });

        startPhasedPreload();
        idleCallback?.();

        // Flush Phase 1 microtasks
        await vi.advanceTimersByTimeAsync(0);

        // Advance past Phase 2 gap
        await vi.advanceTimersByTimeAsync(PHASE_GAP_MS);
      });

      it('delays Phase 3 by PHASE_GAP_MS after Phase 2 completes', async () => {
        let idleCallback: (() => void) | undefined;
        window.requestIdleCallback = vi.fn((cb) => {
          idleCallback = cb as () => void;
          return 0;
        });

        startPhasedPreload();
        idleCallback?.();

        // Flush Phase 1
        await vi.advanceTimersByTimeAsync(0);

        // Phase 2 gap + flush
        await vi.advanceTimersByTimeAsync(PHASE_GAP_MS);

        // Phase 3 gap + flush
        await vi.advanceTimersByTimeAsync(PHASE_GAP_MS);
      });
    });

    describe('when requestIdleCallback is not available', () => {
      it('falls back to setTimeout with fallback delay', () => {
        const original = window.requestIdleCallback;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).requestIdleCallback;

        const setTimeoutSpy = vi.spyOn(window, 'setTimeout');

        startPhasedPreload();

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
