import { type ComponentType, Suspense } from 'react';

import { Navigate, type RouteObject } from 'react-router-dom';


import { LoadingSpinner } from '@/components/common/LoadingSpinner';

import {
  NativeAlertShowcase,
  NativeButtonShowcase,
  NativeCheckboxShowcase,
  NativeDatePickerShowcase,
  NativeDialogShowcase,
  NativeInputShowcase,
  NativeSelectShowcase,
  NativeToastShowcase,
  NativeToggleShowcase,
  NativeToolbarShowcase,
  NativeMenuShowcase,
  NativeAccordionShowcase,
  NativeBreadcrumbShowcase,
  NativeTabsShowcase,
  SyncfusionTabsShowcase,
  NativeTimelineShowcase,
  SyncfusionTimelineShowcase,
  NativeTagShowcase,
  SyncfusionTagShowcase,
  NativeBadgeShowcase,
  SyncfusionBadgeShowcase,
  NativeAvatarShowcase,
  SyncfusionAvatarShowcase,
  NativeCardShowcase,
  SyncfusionCardShowcase,
  NativeProgressBarShowcase,
  SyncfusionProgressBarShowcase,
  NativeThemeToggleShowcase,
  NativeTooltipShowcase,
  SyncfusionTooltipShowcase,
  SyncfusionAccordionShowcase,
  SyncfusionAlertShowcase,
  SyncfusionBreadcrumbShowcase,
  SyncfusionButtonShowcase,
  SyncfusionCheckboxShowcase,
  SyncfusionDatePickerShowcase,
  SyncfusionDialogShowcase,
  SyncfusionInputShowcase,
  SyncfusionMenuShowcase,
  SyncfusionSelectShowcase,
  SyncfusionToastShowcase,
  SyncfusionToggleShowcase,
  SyncfusionToolbarShowcase,
} from './lazyPages';

import { RouteRedirectTarget, RouteSegment } from './index';

interface LazyPageProps {
  component: ComponentType;
}

const LazyShowcase = ({ component }: LazyPageProps): JSX.Element => {
  const Component = component;
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
};

/** Route definitions for all component showcase pages. */
export const componentShowcaseRoutes: RouteObject[] = [
  // Button
  { path: RouteSegment.ComponentsButton, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsButtonNative, element: <LazyShowcase component={NativeButtonShowcase} /> },
  { path: RouteSegment.ComponentsButtonSyncfusion, element: <LazyShowcase component={SyncfusionButtonShowcase} /> },
  // Input
  { path: RouteSegment.ComponentsInput, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsInputNative, element: <LazyShowcase component={NativeInputShowcase} /> },
  { path: RouteSegment.ComponentsInputSyncfusion, element: <LazyShowcase component={SyncfusionInputShowcase} /> },
  // Select
  { path: RouteSegment.ComponentsSelect, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsSelectNative, element: <LazyShowcase component={NativeSelectShowcase} /> },
  { path: RouteSegment.ComponentsSelectSyncfusion, element: <LazyShowcase component={SyncfusionSelectShowcase} /> },
  // DatePicker
  { path: RouteSegment.ComponentsDatePicker, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsDatePickerNative, element: <LazyShowcase component={NativeDatePickerShowcase} /> },
  { path: RouteSegment.ComponentsDatePickerSyncfusion, element: <LazyShowcase component={SyncfusionDatePickerShowcase} /> },
  // Dialog
  { path: RouteSegment.ComponentsDialog, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsDialogNative, element: <LazyShowcase component={NativeDialogShowcase} /> },
  { path: RouteSegment.ComponentsDialogSyncfusion, element: <LazyShowcase component={SyncfusionDialogShowcase} /> },
  // Alert
  { path: RouteSegment.ComponentsAlert, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsAlertNative, element: <LazyShowcase component={NativeAlertShowcase} /> },
  { path: RouteSegment.ComponentsAlertSyncfusion, element: <LazyShowcase component={SyncfusionAlertShowcase} /> },
  // Checkbox
  { path: RouteSegment.ComponentsCheckbox, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsCheckboxNative, element: <LazyShowcase component={NativeCheckboxShowcase} /> },
  { path: RouteSegment.ComponentsCheckboxSyncfusion, element: <LazyShowcase component={SyncfusionCheckboxShowcase} /> },
  // Toast
  { path: RouteSegment.ComponentsToast, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsToastNative, element: <LazyShowcase component={NativeToastShowcase} /> },
  { path: RouteSegment.ComponentsToastSyncfusion, element: <LazyShowcase component={SyncfusionToastShowcase} /> },
  // Toggle
  { path: RouteSegment.ComponentsToggle, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsToggleNative, element: <LazyShowcase component={NativeToggleShowcase} /> },
  { path: RouteSegment.ComponentsToggleSyncfusion, element: <LazyShowcase component={SyncfusionToggleShowcase} /> },
  // Toolbar
  { path: RouteSegment.ComponentsToolbar, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsToolbarNative, element: <LazyShowcase component={NativeToolbarShowcase} /> },
  { path: RouteSegment.ComponentsToolbarSyncfusion, element: <LazyShowcase component={SyncfusionToolbarShowcase} /> },
  // Menu
  { path: RouteSegment.ComponentsMenu, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsMenuNative, element: <LazyShowcase component={NativeMenuShowcase} /> },
  { path: RouteSegment.ComponentsMenuSyncfusion, element: <LazyShowcase component={SyncfusionMenuShowcase} /> },
  // Accordion
  { path: RouteSegment.ComponentsAccordion, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsAccordionNative, element: <LazyShowcase component={NativeAccordionShowcase} /> },
  { path: RouteSegment.ComponentsAccordionSyncfusion, element: <LazyShowcase component={SyncfusionAccordionShowcase} /> },
  // Breadcrumb
  { path: RouteSegment.ComponentsBreadcrumb, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsBreadcrumbNative, element: <LazyShowcase component={NativeBreadcrumbShowcase} /> },
  { path: RouteSegment.ComponentsBreadcrumbSyncfusion, element: <LazyShowcase component={SyncfusionBreadcrumbShowcase} /> },
  // Tabs
  { path: RouteSegment.ComponentsTabs, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsTabsNative, element: <LazyShowcase component={NativeTabsShowcase} /> },
  { path: RouteSegment.ComponentsTabsSyncfusion, element: <LazyShowcase component={SyncfusionTabsShowcase} /> },
  // Timeline
  { path: RouteSegment.ComponentsTimeline, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsTimelineNative, element: <LazyShowcase component={NativeTimelineShowcase} /> },
  { path: RouteSegment.ComponentsTimelineSyncfusion, element: <LazyShowcase component={SyncfusionTimelineShowcase} /> },
  // Tag
  { path: RouteSegment.ComponentsTag, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsTagNative, element: <LazyShowcase component={NativeTagShowcase} /> },
  { path: RouteSegment.ComponentsTagSyncfusion, element: <LazyShowcase component={SyncfusionTagShowcase} /> },
  // Badge
  { path: RouteSegment.ComponentsBadge, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsBadgeNative, element: <LazyShowcase component={NativeBadgeShowcase} /> },
  { path: RouteSegment.ComponentsBadgeSyncfusion, element: <LazyShowcase component={SyncfusionBadgeShowcase} /> },
  // Avatar
  { path: RouteSegment.ComponentsAvatar, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsAvatarNative, element: <LazyShowcase component={NativeAvatarShowcase} /> },
  { path: RouteSegment.ComponentsAvatarSyncfusion, element: <LazyShowcase component={SyncfusionAvatarShowcase} /> },
  // Card
  { path: RouteSegment.ComponentsCard, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsCardNative, element: <LazyShowcase component={NativeCardShowcase} /> },
  { path: RouteSegment.ComponentsCardSyncfusion, element: <LazyShowcase component={SyncfusionCardShowcase} /> },
  // ProgressBar
  { path: RouteSegment.ComponentsProgressBar, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsProgressBarNative, element: <LazyShowcase component={NativeProgressBarShowcase} /> },
  { path: RouteSegment.ComponentsProgressBarSyncfusion, element: <LazyShowcase component={SyncfusionProgressBarShowcase} /> },
  // Tooltip
  { path: RouteSegment.ComponentsTooltip, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsTooltipNative, element: <LazyShowcase component={NativeTooltipShowcase} /> },
  { path: RouteSegment.ComponentsTooltipSyncfusion, element: <LazyShowcase component={SyncfusionTooltipShowcase} /> },
  // ThemeToggle
  { path: RouteSegment.ComponentsThemeToggle, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
  { path: RouteSegment.ComponentsThemeToggleNative, element: <LazyShowcase component={NativeThemeToggleShowcase} /> },
];
