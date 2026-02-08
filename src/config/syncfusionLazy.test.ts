import { describe, it, expect, vi, beforeEach } from 'vitest';

import { initializeSyncfusion } from './syncfusion';
import {
  initializeSyncfusionLazy,
  resetSyncfusionInitState,
  isSyncfusionInitialized,
  preloadSyncfusionModules,
} from './syncfusionLazy';

// Import the mocked function for assertions

// Mock the syncfusion module
vi.mock('./syncfusion', () => ({
  initializeSyncfusion: vi.fn(),
}));

describe('syncfusionLazy', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetSyncfusionInitState();
  });

  describe('initializeSyncfusionLazy', () => {
    it('initializes Syncfusion on first call', () => {
      initializeSyncfusionLazy();

      expect(initializeSyncfusion).toHaveBeenCalledTimes(1);
    });

    it('does not re-initialize on subsequent calls', () => {
      initializeSyncfusionLazy();
      initializeSyncfusionLazy();
      initializeSyncfusionLazy();

      expect(initializeSyncfusion).toHaveBeenCalledTimes(1);
    });

    it('sets isInitialized to true after first call', () => {
      expect(isSyncfusionInitialized()).toBe(false);

      initializeSyncfusionLazy();

      expect(isSyncfusionInitialized()).toBe(true);
    });
  });

  describe('resetSyncfusionInitState', () => {
    it('resets initialization state to false', () => {
      initializeSyncfusionLazy();
      expect(isSyncfusionInitialized()).toBe(true);

      resetSyncfusionInitState();

      expect(isSyncfusionInitialized()).toBe(false);
    });

    it('allows re-initialization after reset', () => {
      initializeSyncfusionLazy();
      resetSyncfusionInitState();
      initializeSyncfusionLazy();

      expect(initializeSyncfusion).toHaveBeenCalledTimes(2);
    });
  });

  describe('isSyncfusionInitialized', () => {
    it('returns false before initialization', () => {
      expect(isSyncfusionInitialized()).toBe(false);
    });

    it('returns true after initialization', () => {
      initializeSyncfusionLazy();

      expect(isSyncfusionInitialized()).toBe(true);
    });
  });

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
        // Remove requestIdleCallback to simulate unsupported environment
        const originalRequestIdleCallback = window.requestIdleCallback;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).requestIdleCallback;

        vi.useFakeTimers();

        preloadSyncfusionModules();

        // Verify setTimeout was called with correct delay
        vi.advanceTimersByTime(FALLBACK_DELAY_MS);

        vi.useRealTimers();

        // Restore requestIdleCallback
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
