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
 *   loadSyncfusionCss(SyncfusionCssModule.Grids);
 * }, []);
 * ```
 */

import { isValueDefined } from './is';

/** Syncfusion component CSS module types */
export const enum SyncfusionCssModule {
  Buttons = 'buttons',
  Grids = 'grids',
  Calendars = 'calendars',
  Navigations = 'navigations',
  Popups = 'popups',
  Dropdowns = 'dropdowns',
  Layouts = 'layouts',
  Notifications = 'notifications',

  Diagrams = 'diagrams',
  Schedule = 'schedule',
  Gantt = 'gantt',
  Kanban = 'kanban',
}

/** Map of module to dynamic CSS import function. */
const CSS_LOADERS: Record<SyncfusionCssModule, () => Promise<unknown>> = {
  [SyncfusionCssModule.Buttons]: async () => import('@syncfusion/ej2-react-buttons/styles/tailwind.css'),
  [SyncfusionCssModule.Grids]: async () => import('@syncfusion/ej2-react-grids/styles/tailwind.css'),
  [SyncfusionCssModule.Calendars]: async () => import('@syncfusion/ej2-react-calendars/styles/tailwind.css'),
  [SyncfusionCssModule.Navigations]: async () => import('@syncfusion/ej2-react-navigations/styles/tailwind.css'),
  [SyncfusionCssModule.Popups]: async () => import('@syncfusion/ej2-react-popups/styles/tailwind.css'),
  [SyncfusionCssModule.Dropdowns]: async () => import('@syncfusion/ej2-react-dropdowns/styles/tailwind.css'),
  [SyncfusionCssModule.Layouts]: async () => import('@syncfusion/ej2-react-layouts/styles/tailwind.css'),
  [SyncfusionCssModule.Notifications]: async () => import('@syncfusion/ej2-react-notifications/styles/tailwind.css'),

  [SyncfusionCssModule.Diagrams]: async () => import('@syncfusion/ej2-diagrams/styles/tailwind.css'),
  [SyncfusionCssModule.Schedule]: async () => import('@syncfusion/ej2-react-schedule/styles/tailwind.css'),
  [SyncfusionCssModule.Gantt]: async () => import('@syncfusion/ej2-react-gantt/styles/tailwind.css'),
  [SyncfusionCssModule.Kanban]: async () => import('@syncfusion/ej2-react-kanban/styles/tailwind.css'),
};

/**
 * Internal function to load CSS module based on type.
 * Uses dynamic imports for CSS code splitting.
 */
async function loadCssModule(module: SyncfusionCssModule): Promise<void> {
  const loader = CSS_LOADERS[module];
  await loader();
}

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
