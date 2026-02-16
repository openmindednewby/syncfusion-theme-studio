/**
 * SubNavGroup children for the "Components" expandable sidebar group.
 * Each component type maps to a SubNavGroup with Native/Syncfusion children,
 * mirroring the features/components/pages directory structure.
 */
import { RoutePath } from '@/app/routePaths';
import { TestIds } from '@/shared/testIds';
import { ComponentTestIds } from '@/shared/testIds.components';

import type { NavChild } from './NavExpandableItem';

export const COMPONENTS_CHILDREN: NavChild[] = [
  {
    labelKey: 'menu.componentsOverview', testId: ComponentTestIds.NAV_OVERVIEW_GROUP,
    expandTestId: ComponentTestIds.NAV_OVERVIEW_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsNative, labelKey: 'menu.native', testId: TestIds.NAV_COMPONENTS_NATIVE },
      { path: RoutePath.ComponentsSyncfusion, labelKey: 'menu.syncfusion', testId: TestIds.NAV_COMPONENTS_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.accordion', testId: ComponentTestIds.NAV_ACCORDION_GROUP,
    expandTestId: ComponentTestIds.NAV_ACCORDION_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsAccordionNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_ACCORDION_NATIVE },
      { path: RoutePath.ComponentsAccordionSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_ACCORDION_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.alert', testId: ComponentTestIds.NAV_ALERT_GROUP,
    expandTestId: ComponentTestIds.NAV_ALERT_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsAlertNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_ALERT_NATIVE },
      { path: RoutePath.ComponentsAlertSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_ALERT_SYNCFUSION },
    ],
  },
  { path: RoutePath.ComponentsAlertBadgeNative, labelKey: 'menu.alertBadge', testId: ComponentTestIds.NAV_ALERTBADGE_GROUP },
  {
    labelKey: 'menu.avatar', testId: ComponentTestIds.NAV_AVATAR_GROUP,
    expandTestId: ComponentTestIds.NAV_AVATAR_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsAvatarNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_AVATAR_NATIVE },
      { path: RoutePath.ComponentsAvatarSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_AVATAR_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.badge', testId: ComponentTestIds.NAV_BADGE_GROUP,
    expandTestId: ComponentTestIds.NAV_BADGE_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsBadgeNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_BADGE_NATIVE },
      { path: RoutePath.ComponentsBadgeSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_BADGE_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.breadcrumb', testId: ComponentTestIds.NAV_BREADCRUMB_GROUP,
    expandTestId: ComponentTestIds.NAV_BREADCRUMB_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsBreadcrumbNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_BREADCRUMB_NATIVE },
      { path: RoutePath.ComponentsBreadcrumbSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_BREADCRUMB_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.button', testId: ComponentTestIds.NAV_BUTTON_GROUP,
    expandTestId: ComponentTestIds.NAV_BUTTON_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsButtonNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_BUTTON_NATIVE },
      { path: RoutePath.ComponentsButtonSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_BUTTON_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.card', testId: ComponentTestIds.NAV_CARD_GROUP,
    expandTestId: ComponentTestIds.NAV_CARD_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsCardNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_CARD_NATIVE },
      { path: RoutePath.ComponentsCardSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_CARD_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.checkbox', testId: ComponentTestIds.NAV_CHECKBOX_GROUP,
    expandTestId: ComponentTestIds.NAV_CHECKBOX_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsCheckboxNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_CHECKBOX_NATIVE },
      { path: RoutePath.ComponentsCheckboxSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_CHECKBOX_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.chip', testId: ComponentTestIds.NAV_CHIP_GROUP,
    expandTestId: ComponentTestIds.NAV_CHIP_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsChipNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_CHIP_NATIVE },
      { path: RoutePath.ComponentsChipSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_CHIP_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.datepicker', testId: ComponentTestIds.NAV_DATEPICKER_GROUP,
    expandTestId: ComponentTestIds.NAV_DATEPICKER_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsDatePickerNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_DATEPICKER_NATIVE },
      { path: RoutePath.ComponentsDatePickerSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_DATEPICKER_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.dialog', testId: ComponentTestIds.NAV_DIALOG_GROUP,
    expandTestId: ComponentTestIds.NAV_DIALOG_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsDialogNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_DIALOG_NATIVE },
      { path: RoutePath.ComponentsDialogSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_DIALOG_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.grid', testId: ComponentTestIds.NAV_GRID_GROUP,
    expandTestId: ComponentTestIds.NAV_GRID_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsGridNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_GRID_NATIVE },
      { path: RoutePath.ComponentsGridSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_GRID_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.input', testId: ComponentTestIds.NAV_INPUT_GROUP,
    expandTestId: ComponentTestIds.NAV_INPUT_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsInputNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_INPUT_NATIVE },
      { path: RoutePath.ComponentsInputSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_INPUT_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.menu', testId: ComponentTestIds.NAV_MENU_GROUP,
    expandTestId: ComponentTestIds.NAV_MENU_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsMenuNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_MENU_NATIVE },
      { path: RoutePath.ComponentsMenuSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_MENU_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.progressbar', testId: ComponentTestIds.NAV_PROGRESSBAR_GROUP,
    expandTestId: ComponentTestIds.NAV_PROGRESSBAR_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsProgressBarNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_PROGRESSBAR_NATIVE },
      { path: RoutePath.ComponentsProgressBarSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_PROGRESSBAR_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.select', testId: ComponentTestIds.NAV_SELECT_GROUP,
    expandTestId: ComponentTestIds.NAV_SELECT_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsSelectNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_SELECT_NATIVE },
      { path: RoutePath.ComponentsSelectSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_SELECT_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.tabs', testId: ComponentTestIds.NAV_TABS_GROUP,
    expandTestId: ComponentTestIds.NAV_TABS_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsTabsNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_TABS_NATIVE },
      { path: RoutePath.ComponentsTabsSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_TABS_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.tag', testId: ComponentTestIds.NAV_TAG_GROUP,
    expandTestId: ComponentTestIds.NAV_TAG_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsTagNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_TAG_NATIVE },
      { path: RoutePath.ComponentsTagSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_TAG_SYNCFUSION },
    ],
  },
  { path: RoutePath.ComponentsThemeToggleNative, labelKey: 'menu.themeToggleNative', testId: ComponentTestIds.NAV_THEMETOGGLE_NATIVE },
  {
    labelKey: 'menu.timeline', testId: ComponentTestIds.NAV_TIMELINE_GROUP,
    expandTestId: ComponentTestIds.NAV_TIMELINE_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsTimelineNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_TIMELINE_NATIVE },
      { path: RoutePath.ComponentsTimelineSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_TIMELINE_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.toast', testId: ComponentTestIds.NAV_TOAST_GROUP,
    expandTestId: ComponentTestIds.NAV_TOAST_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsToastNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_TOAST_NATIVE },
      { path: RoutePath.ComponentsToastSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_TOAST_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.toggle', testId: ComponentTestIds.NAV_TOGGLE_GROUP,
    expandTestId: ComponentTestIds.NAV_TOGGLE_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsToggleNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_TOGGLE_NATIVE },
      { path: RoutePath.ComponentsToggleSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_TOGGLE_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.toolbar', testId: ComponentTestIds.NAV_TOOLBAR_GROUP,
    expandTestId: ComponentTestIds.NAV_TOOLBAR_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsToolbarNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_TOOLBAR_NATIVE },
      { path: RoutePath.ComponentsToolbarSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_TOOLBAR_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.tooltip', testId: ComponentTestIds.NAV_TOOLTIP_GROUP,
    expandTestId: ComponentTestIds.NAV_TOOLTIP_GROUP_EXPAND, items: [
      { path: RoutePath.ComponentsTooltipNative, labelKey: 'menu.native', testId: ComponentTestIds.NAV_TOOLTIP_NATIVE },
      { path: RoutePath.ComponentsTooltipSyncfusion, labelKey: 'menu.syncfusion', testId: ComponentTestIds.NAV_TOOLTIP_SYNCFUSION },
    ],
  },
];
