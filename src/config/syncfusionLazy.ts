import { initializeSyncfusion } from './syncfusion';

let isInitialized = false;

const REQUEST_IDLE_TIMEOUT_MS = 2000;
const FALLBACK_DELAY_MS = 100;

/**
 * Initializes Syncfusion license lazily (only when needed)
 * Should be called when entering protected routes that use Syncfusion components
 */
export const initializeSyncfusionLazy = (): void => {
  if (isInitialized) return;
  isInitialized = true;
  initializeSyncfusion();
};

/**
 * Resets the initialization state (for testing purposes only)
 */
export const resetSyncfusionInitState = (): void => {
  isInitialized = false;
};

/**
 * Returns whether Syncfusion has been initialized
 */
export const isSyncfusionInitialized = (): boolean => isInitialized;

/**
 * Preloads Syncfusion modules in the background using requestIdleCallback
 * Call after login to prepare dashboard load for faster navigation
 */
export const preloadSyncfusionModules = (): void => {
  const preload = (): void => {
    // Preload heavy Syncfusion modules in background
    // These are lazy-loaded chunks that will be needed on the dashboard
    import('@syncfusion/ej2-react-grids').catch(() => undefined);
    import('@syncfusion/ej2-react-calendars').catch(() => undefined);
    import('@syncfusion/ej2-react-dropdowns').catch(() => undefined);
  };

  if ('requestIdleCallback' in window)
    window.requestIdleCallback(preload, { timeout: REQUEST_IDLE_TIMEOUT_MS });
  else setTimeout(preload, FALLBACK_DELAY_MS);
};
