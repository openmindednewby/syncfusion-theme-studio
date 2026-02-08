/**
 * Lazy CSS loader for Syncfusion components.
 *
 * This utility enables CSS code splitting by dynamically loading
 * Syncfusion component styles only when they are needed. This reduces
 * the initial CSS bundle size significantly.
 *
 * Usage:
 * ```typescript
 * useEffect(() => {
 *   loadSyncfusionCss('grids');
 * }, []);
 * ```
 */

import { isValueDefined } from './is';

/** Syncfusion component CSS module types */
export type SyncfusionCssModule =
  | 'grids'
  | 'calendars'
  | 'navigations'
  | 'popups'
  | 'dropdowns'
  | 'layouts';

/** Set to track already-loaded CSS modules */
const loadedCss = new Set<SyncfusionCssModule>();

/** Promises for in-progress CSS loads to prevent duplicate requests */
const loadingPromises = new Map<SyncfusionCssModule, Promise<void>>();

/**
 * Dynamically loads Syncfusion CSS for a specific component module.
 * CSS is only loaded once per module - subsequent calls are no-ops.
 *
 * @param module - The Syncfusion component module to load CSS for
 * @returns Promise that resolves when CSS is loaded
 */
export async function loadSyncfusionCss(module: SyncfusionCssModule): Promise<void> {
  // Already loaded - immediate return
  if (loadedCss.has(module)) return;

  // Currently loading - return existing promise
  const existingPromise = loadingPromises.get(module);
  if (isValueDefined(existingPromise)) return existingPromise;

  // Create new loading promise
  const loadPromise = loadCssModule(module);
  loadingPromises.set(module, loadPromise);

  try {
    await loadPromise;
    loadedCss.add(module);
  } finally {
    loadingPromises.delete(module);
  }
}

/**
 * Internal function to load CSS module based on type.
 * Uses dynamic imports for CSS code splitting.
 */
async function loadCssModule(module: SyncfusionCssModule): Promise<void> {
  switch (module) {
    case 'grids':
      await import('@syncfusion/ej2-react-grids/styles/tailwind.css');
      break;
    case 'calendars':
      await import('@syncfusion/ej2-react-calendars/styles/tailwind.css');
      break;
    case 'navigations':
      await import('@syncfusion/ej2-react-navigations/styles/tailwind.css');
      break;
    case 'popups':
      await import('@syncfusion/ej2-react-popups/styles/tailwind.css');
      break;
    case 'dropdowns':
      await import('@syncfusion/ej2-react-dropdowns/styles/tailwind.css');
      break;
    case 'layouts':
      await import('@syncfusion/ej2-react-layouts/styles/tailwind.css');
      break;
    default:
      // Exhaustive check - all cases should be handled above
      break;
  }
}

/**
 * Preloads CSS for multiple Syncfusion modules in parallel.
 * Useful for preloading when user is likely to view certain sections.
 *
 * @param modules - Array of modules to preload
 * @returns Promise that resolves when all CSS is loaded
 */
export async function preloadSyncfusionCss(modules: SyncfusionCssModule[]): Promise<void> {
  await Promise.all(modules.map(async (m) => loadSyncfusionCss(m)));
}

/**
 * Checks if CSS for a module has been loaded.
 *
 * @param module - The module to check
 * @returns true if CSS is already loaded
 */
export function isSyncfusionCssLoaded(module: SyncfusionCssModule): boolean {
  return loadedCss.has(module);
}
