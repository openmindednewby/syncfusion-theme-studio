const REQUEST_IDLE_TIMEOUT_MS = 2000;
const FALLBACK_DELAY_MS = 100;

/**
 * Preloads Syncfusion modules in the background using requestIdleCallback.
 * Call after login to prepare dashboard load for faster navigation.
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
