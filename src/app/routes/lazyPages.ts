import { lazy } from 'react';

// Auth & Dashboard
export const LoginPage = lazy(async () => import('@/features/auth/pages/LoginPage'));
export const DashboardPage = lazy(async () => import('@/features/dashboard/pages/DashboardPage'));

// Products
export const NativeProductsPage = lazy(
  async () => import('@/features/products/pages/NativeProductsPage'),
);
export const ProductsListPage = lazy(
  async () => import('@/features/products/pages/ProductsListPage'),
);

// Components overview
export const NativeComponentsPage = lazy(
  async () => import('@/features/components/pages/NativeComponentsPage'),
);
export const SyncfusionComponentsPage = lazy(
  async () => import('@/features/components/pages/SyncfusionComponentsPage'),
);

// Grid showcase
export const NativeGridShowcase = lazy(
  async () => import('@/features/components/pages/NativeGridShowcase'),
);
export const SyncfusionGridShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionGridShowcase'),
);

// Button showcase
export const NativeButtonShowcase = lazy(
  async () => import('@/features/components/pages/NativeButtonShowcase'),
);
export const SyncfusionButtonShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionButtonShowcase'),
);

// Input showcase
export const NativeInputShowcase = lazy(
  async () => import('@/features/components/pages/NativeInputShowcase'),
);
export const SyncfusionInputShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionInputShowcase'),
);

// Select showcase
export const NativeSelectShowcase = lazy(
  async () => import('@/features/components/pages/NativeSelectShowcase'),
);
export const SyncfusionSelectShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionSelectShowcase'),
);

// DatePicker showcase
export const NativeDatePickerShowcase = lazy(
  async () => import('@/features/components/pages/NativeDatePickerShowcase'),
);
export const SyncfusionDatePickerShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionDatePickerShowcase'),
);

// Dialog showcase
export const NativeDialogShowcase = lazy(
  async () => import('@/features/components/pages/NativeDialogShowcase'),
);
export const SyncfusionDialogShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionDialogShowcase'),
);

// Alert showcase
export const NativeAlertShowcase = lazy(
  async () => import('@/features/components/pages/NativeAlertShowcase'),
);
export const SyncfusionAlertShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionAlertShowcase'),
);

// AlertBadge showcase
export const AlertBadgeShowcase = lazy(
  async () => import('@/features/components/pages/AlertBadgeShowcase'),
);

// Checkbox showcase
export const NativeCheckboxShowcase = lazy(
  async () => import('@/features/components/pages/NativeCheckboxShowcase'),
);
export const SyncfusionCheckboxShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionCheckboxShowcase'),
);

// Toast showcase
export const NativeToastShowcase = lazy(
  async () => import('@/features/components/pages/NativeToastShowcase'),
);
export const SyncfusionToastShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionToastShowcase'),
);

// Toggle showcase
export const NativeToggleShowcase = lazy(
  async () => import('@/features/components/pages/NativeToggleShowcase'),
);
export const SyncfusionToggleShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionToggleShowcase'),
);

// Toolbar showcase
export const NativeToolbarShowcase = lazy(
  async () => import('@/features/components/pages/NativeToolbarShowcase'),
);
export const SyncfusionToolbarShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionToolbarShowcase'),
);

// Menu showcase
export const NativeMenuShowcase = lazy(
  async () => import('@/features/components/pages/NativeMenuShowcase'),
);
export const SyncfusionMenuShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionMenuShowcase'),
);

// Accordion showcase
export const NativeAccordionShowcase = lazy(
  async () => import('@/features/components/pages/NativeAccordionShowcase'),
);
export const SyncfusionAccordionShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionAccordionShowcase'),
);

// Breadcrumb showcase
export const NativeBreadcrumbShowcase = lazy(
  async () => import('@/features/components/pages/NativeBreadcrumbShowcase'),
);
export const SyncfusionBreadcrumbShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionBreadcrumbShowcase'),
);

// Tabs showcase
export const NativeTabsShowcase = lazy(
  async () => import('@/features/components/pages/NativeTabsShowcase'),
);
export const SyncfusionTabsShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionTabsShowcase'),
);

// Timeline showcase
export const NativeTimelineShowcase = lazy(
  async () => import('@/features/components/pages/NativeTimelineShowcase'),
);
export const SyncfusionTimelineShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionTimelineShowcase'),
);

// Tag showcase
export const NativeTagShowcase = lazy(
  async () => import('@/features/components/pages/NativeTagShowcase'),
);
export const SyncfusionTagShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionTagShowcase'),
);

// Badge showcase
export const NativeBadgeShowcase = lazy(
  async () => import('@/features/components/pages/NativeBadgeShowcase'),
);
export const SyncfusionBadgeShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionBadgeShowcase'),
);

// Avatar showcase
export const NativeAvatarShowcase = lazy(
  async () => import('@/features/components/pages/NativeAvatarShowcase'),
);
export const SyncfusionAvatarShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionAvatarShowcase'),
);

// Card showcase
export const NativeCardShowcase = lazy(
  async () => import('@/features/components/pages/NativeCardShowcase'),
);
export const SyncfusionCardShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionCardShowcase'),
);

// Chip showcase
export const NativeChipShowcase = lazy(
  async () => import('@/features/components/pages/NativeChipShowcase'),
);
export const SyncfusionChipShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionChipShowcase'),
);

// ProgressBar showcase
export const NativeProgressBarShowcase = lazy(
  async () => import('@/features/components/pages/NativeProgressBarShowcase'),
);
export const SyncfusionProgressBarShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionProgressBarShowcase'),
);

// Tooltip showcase
export const NativeTooltipShowcase = lazy(
  async () => import('@/features/components/pages/NativeTooltipShowcase'),
);
export const SyncfusionTooltipShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionTooltipShowcase'),
);

// Icons showcase
export const IconsShowcase = lazy(
  async () => import('@/features/components/pages/IconsShowcase'),
);

// ThemeToggle showcase
export const NativeThemeToggleShowcase = lazy(
  async () => import('@/features/components/pages/NativeThemeToggleShowcase'),
);

// Not Implemented placeholder
export const NotImplementedPage = lazy(
  async () => import('@/features/dashboard/pages/NotImplementedPage'),
);

// Forms
export const SyncfusionFormsPage = lazy(
  async () => import('@/features/forms/pages/SyncfusionFormsPage'),
);
export const NativeFormsPage = lazy(async () => import('@/features/forms/pages/NativeFormsPage'));
