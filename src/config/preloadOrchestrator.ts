/**
 * Phased preloading orchestrator.
 *
 * Splits preloading into three priority phases so that heavy Syncfusion
 * chunks never compete with the initial render on the critical path:
 *
 *   Phase 1 (idle):  MainLayout + DashboardPage — the user's next destination
 *   Phase 2 (+gap):  Remaining route pages
 *   Phase 3 (+gap):  Heavy Syncfusion vendor modules (~415 KiB+)
 *
 * Each phase waits for the previous one to settle before starting the next,
 * ensuring the browser has breathing room between bursts of network activity.
 */

const IDLE_TIMEOUT_MS = 3000;
const FALLBACK_DELAY_MS = 100;
const PHASE_GAP_MS = 2000;

// Phase 1 – Critical routes the user navigates to right after login
const preloadCriticalRoutes = async (): Promise<unknown[]> =>
  Promise.all([
    import('@/components/layout/MainLayout').catch(() => undefined),
    import('@/features/dashboard/pages/DashboardPage').catch(() => undefined),
  ]);

// Phase 2 – Remaining route pages (lighter native pages + Syncfusion pages)
const preloadRemainingRoutes = async (): Promise<unknown[]> =>
  Promise.all([
    import('@/features/auth/pages/LoginPage').catch(() => undefined),
    import('@/features/products/pages/NativeProductsPage').catch(() => undefined),
    import('@/features/products/pages/ProductsListPage').catch(() => undefined),
    import('@/features/components/pages/NativeComponentsPage').catch(() => undefined),
    import('@/features/components/pages/SyncfusionComponentsPage').catch(() => undefined),
    import('@/features/components/pages/NativeGridShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionGridShowcase').catch(() => undefined),
    import('@/features/forms/pages/SyncfusionFormsPage').catch(() => undefined),
    import('@/features/forms/pages/NativeFormsPage').catch(() => undefined),
  ]);

// Phase 3 – Heavy Syncfusion vendor modules
const preloadSyncfusionModules = async (): Promise<unknown[]> =>
  Promise.all([
    import('@syncfusion/ej2-react-grids').catch(() => undefined),
    import('@syncfusion/ej2-react-calendars').catch(() => undefined),
    import('@syncfusion/ej2-react-dropdowns').catch(() => undefined),
  ]);

const delay = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * Runs the three-phase preload pipeline sequentially, with a
 * {@link PHASE_GAP_MS} pause between each phase.
 */
const runPhases = async (): Promise<void> => {
  await preloadCriticalRoutes();

  await delay(PHASE_GAP_MS);
  await preloadRemainingRoutes();

  await delay(PHASE_GAP_MS);
  await preloadSyncfusionModules();
};

/**
 * Starts the phased preloading pipeline.
 *
 * Uses `requestIdleCallback` (with a 3 s forced-timeout) to begin Phase 1.
 * Each subsequent phase waits for the previous one to complete, then pauses
 * for {@link PHASE_GAP_MS} before kicking off the next batch of imports.
 */
export const startPhasedPreload = (): void => {
  const kick = (): void => {
    runPhases().catch(() => undefined);
  };

  if ('requestIdleCallback' in window)
    window.requestIdleCallback(kick, { timeout: IDLE_TIMEOUT_MS });
  else setTimeout(kick, FALLBACK_DELAY_MS);
};
