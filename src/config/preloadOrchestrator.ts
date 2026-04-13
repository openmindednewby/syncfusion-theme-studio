/**
 * Phased preloading orchestrator.
 *
 * Splits preloading into priority phases so that heavy Syncfusion
 * chunks never compete with the initial render on the critical path:
 *
 *   Phase 1 (idle):  MainLayout + DashboardPage — the user's next destination
 *   Phase 2a (+gap): Core route pages (products, components overview, forms)
 *   Phase 2b (+gap): Component showcase pages (Native variants)
 *   Phase 2c (+gap): Component showcase pages (Syncfusion + standalone variants)
 *   Phase 2d (+gap): Trading feature pages (all sub-pages)
 *   Phase 2e (+gap): Admin hub pages
 *   Phase 3 (+gap):  Heavy Syncfusion vendor modules (~415 KiB+)
 *
 * Each phase waits for the previous one to settle before starting the next,
 * ensuring the browser has breathing room between bursts of network activity.
 */

import { startFontPreload } from './fontPreloader';

// Phase 1 – Critical routes the user navigates to right after login
const preloadCriticalRoutes = async (): Promise<unknown[]> =>
  Promise.all([
    import('@/components/layout/MainLayout').catch(() => undefined),
    import('@/features/dashboard/pages/DashboardPage').catch(() => undefined),
  ]);

// Phase 2a – Core route pages (products, components overview, forms, dashboard sub-pages)
const preloadCoreRoutes = async (): Promise<unknown[]> =>
  Promise.all([
    import('@/features/auth/pages/LoginPage').catch(() => undefined),
    import('@/features/dashboard/pages/DashboardMetricsPage').catch(() => undefined),
    import('@/features/dashboard/pages/DashboardKpisPage').catch(() => undefined),
    import('@/features/products/pages/NativeProductsPage').catch(() => undefined),
    import('@/features/products/pages/ProductsListPage').catch(() => undefined),
    import('@/features/components/pages/NativeComponentsPage').catch(() => undefined),
    import('@/features/components/pages/SyncfusionComponentsPage').catch(() => undefined),
    import('@/features/components/pages/NativeGridShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionGridShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionGridPlayground').catch(() => undefined),
    import('@/features/forms/pages/SyncfusionFormsPage').catch(() => undefined),
    import('@/features/forms/pages/NativeFormsPage').catch(() => undefined),
  ]);

// Phase 2b – Component showcase pages (Native variants)
// eslint-disable-next-line smart-max-lines/smart-max-lines
const preloadShowcasePagesNative = async (): Promise<unknown[]> =>
  Promise.all([
    import('@/features/components/pages/NativeButtonShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeInputShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeSelectShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeDatePickerShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeDialogShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeAlertShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeCheckboxShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeToastShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeToggleShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeToolbarShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeMenuShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeAccordionShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeBreadcrumbShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeTabsShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeTimelineShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeTagShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeBadgeShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeAvatarShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeCardShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeChipShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeProgressBarShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeTooltipShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeTextDescriptionShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeTypographyShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeLoaderShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeSliderShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeSkeletonLoaderShowcase').catch(() => undefined),
    import('@/features/components/pages/NativeThemeToggleShowcase').catch(() => undefined),
  ]);

// Phase 2c – Component showcase pages (Syncfusion + standalone variants)
// eslint-disable-next-line smart-max-lines/smart-max-lines
const preloadShowcasePagesSyncfusion = async (): Promise<unknown[]> =>
  Promise.all([
    import('@/features/components/pages/SyncfusionButtonShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionInputShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionSelectShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionDatePickerShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionDialogShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionAlertShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionCheckboxShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionToastShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionToggleShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionToolbarShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionMenuShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionAccordionShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionBreadcrumbShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionTabsShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionTimelineShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionTagShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionBadgeShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionAvatarShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionCardShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionChipShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionProgressBarShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionTooltipShowcase').catch(() => undefined),
    import('@/features/components/pages/SyncfusionTextDescriptionShowcase').catch(() => undefined),
    import('@/features/components/pages/AlertBadgeShowcase').catch(() => undefined),
    import('@/features/components/pages/PaginationShowcase').catch(() => undefined),
    import('@/features/components/pages/SearchPanelShowcase').catch(() => undefined),
    import('@/features/components/pages/FlexBoxShowcase').catch(() => undefined),
    import('@/features/components/pages/ColorsShowcase').catch(() => undefined),
    import('@/features/components/pages/IconsShowcase').catch(() => undefined),
    import('@/features/components/pages/NavMenuShowcase').catch(() => undefined),
    import('@/features/components/pages/SidebarShowcase').catch(() => undefined),
    import('@/features/components/pages/ExternalLinkShowcase').catch(() => undefined),
    import('@/features/components/pages/ImageShowcase').catch(() => undefined),
  ]);

// Phase 2d – SIEM feature pages (all main + sub-pages)
const preloadSiemPages = async (): Promise<unknown[]> =>
  Promise.all([
    import('@/features/alerts-incidents/AlertsIncidentsPage').catch(() => undefined),
    import('@/features/alerts-incidents/pages/AlertsManagementPage').catch(() => undefined),
    import('@/features/alerts-incidents/pages/IncidentsManagementPage').catch(() => undefined),
    import('@/features/marketplace/MarketplacePage').catch(() => undefined),
    import('@/features/dashboard/pages/NotImplementedPage').catch(() => undefined),
  ]);

// Phase 2e – Admin hub pages
const preloadAdminPages = async (): Promise<unknown[]> =>
  Promise.all([
    import('@/features/admin/pages/UserManagementPage').catch(() => undefined),
    import('@/features/admin/pages/AdminRoleManagementPage').catch(() => undefined),
    import('@/features/admin/pages/AdminThemeEditorPage').catch(() => undefined),
    import('@/features/admin/pages/AdminSystemSettingsPage').catch(() => undefined),
    import('@/features/admin/pages/AdminIntegrationsPage').catch(() => undefined),
    import('@/features/admin/pages/AdminPluginsPage').catch(() => undefined),
    import('@/features/admin/pages/AdminDocumentationPage').catch(() => undefined),
    import('@/features/admin/pages/AdminSupportPage').catch(() => undefined),
  ]);

// Phase 3 – Heavy Syncfusion vendor modules
const preloadSyncfusionModules = async (): Promise<unknown[]> =>
  Promise.all([
    import('@syncfusion/ej2-react-grids').catch(() => undefined),
    import('@syncfusion/ej2-react-calendars').catch(() => undefined),
    import('@syncfusion/ej2-react-dropdowns').catch(() => undefined),
    import('@syncfusion/ej2-react-buttons').catch(() => undefined),
    import('@syncfusion/ej2-react-inputs').catch(() => undefined),
    import('@syncfusion/ej2-react-layouts').catch(() => undefined),
    import('@syncfusion/ej2-react-navigations').catch(() => undefined),
    import('@syncfusion/ej2-react-notifications').catch(() => undefined),
    import('@syncfusion/ej2-react-popups').catch(() => undefined),
  ]);

const delay = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const IDLE_TIMEOUT_MS = 3000;
const FALLBACK_DELAY_MS = 100;
const PHASE_GAP_MS = 500;

/**
 * Runs the phased preload pipeline sequentially, with a
 * {@link PHASE_GAP_MS} pause between each phase.
 */
async function runPhases(): Promise<void> {
  startFontPreload();

  await preloadCriticalRoutes();

  await delay(PHASE_GAP_MS);
  await preloadCoreRoutes();

  await delay(PHASE_GAP_MS);
  await preloadShowcasePagesNative();

  await delay(PHASE_GAP_MS);
  await preloadShowcasePagesSyncfusion();

  await delay(PHASE_GAP_MS);
  await preloadSiemPages();

  await delay(PHASE_GAP_MS);
  await preloadAdminPages();

  await delay(PHASE_GAP_MS);
  await preloadSyncfusionModules();
}

/**
 * Starts the phased preloading pipeline.
 *
 * Uses `requestIdleCallback` (with a 3 s forced-timeout) to begin Phase 1.
 * Each subsequent phase waits for the previous one to complete, then pauses
 * for {@link PHASE_GAP_MS} before kicking off the next batch of imports.
 */
export function startPhasedPreload(): void {
  // Skip prefetching during Lighthouse audits (URL param: ?no-prefetch)
  if (window.location.search.includes('no-prefetch')) return;

  const kick = (): void => {
    runPhases().catch(() => undefined);
  };

  if ('requestIdleCallback' in window)
    window.requestIdleCallback(kick, { timeout: IDLE_TIMEOUT_MS });
  else setTimeout(kick, FALLBACK_DELAY_MS);
}
