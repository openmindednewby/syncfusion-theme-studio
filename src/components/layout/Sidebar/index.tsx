import { NavLink } from 'react-router-dom';

import { RoutePath, RoutePrefix } from '@/app/routePaths';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';

import { NavExpandableItem } from './NavExpandableItem';

import type { NavChild, SubNavItem } from './NavExpandableItem';

const ICON_PALETTE = '\uD83C\uDFA8';
const ICON_LOCK = '\uD83D\uDD10';

interface NavItem {
  path: string;
  labelKey: string;
  icon: string;
  testId: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: RoutePath.Dashboard, labelKey: 'menu.dashboard', icon: '🏠', testId: TestIds.NAV_HOME },
];

const PRODUCTS_CHILDREN: SubNavItem[] = [
  { path: RoutePath.ProductsNative, labelKey: 'menu.productsNative', testId: TestIds.NAV_PRODUCTS_NATIVE },
  { path: RoutePath.ProductsSyncfusion, labelKey: 'menu.productsSyncfusion', testId: TestIds.NAV_PRODUCTS_SYNCFUSION },
];

const COMPONENTS_CHILDREN: NavChild[] = [
  {
    labelKey: 'menu.componentsSyncfusion',
    testId: TestIds.NAV_COMPONENTS_SYNCFUSION,
    expandTestId: TestIds.NAV_COMPONENTS_SYNCFUSION_EXPAND,
    path: RoutePath.ComponentsSyncfusion,
    items: [
      { path: RoutePath.ComponentsGridSyncfusion, labelKey: 'menu.gridSyncfusion', testId: TestIds.NAV_GRID_SYNCFUSION },
      { path: RoutePath.ComponentsButtonSyncfusion, labelKey: 'menu.buttonSyncfusion', testId: TestIds.NAV_BUTTON_SYNCFUSION },
      { path: RoutePath.ComponentsInputSyncfusion, labelKey: 'menu.inputSyncfusion', testId: TestIds.NAV_INPUT_SYNCFUSION },
      { path: RoutePath.ComponentsSelectSyncfusion, labelKey: 'menu.selectSyncfusion', testId: TestIds.NAV_SELECT_SYNCFUSION },
      { path: RoutePath.ComponentsDatePickerSyncfusion, labelKey: 'menu.datepickerSyncfusion', testId: TestIds.NAV_DATEPICKER_SYNCFUSION },
      { path: RoutePath.ComponentsDialogSyncfusion, labelKey: 'menu.dialogSyncfusion', testId: TestIds.NAV_DIALOG_SYNCFUSION },
      { path: RoutePath.ComponentsAlertSyncfusion, labelKey: 'menu.alertSyncfusion', testId: TestIds.NAV_ALERT_SYNCFUSION },
      { path: RoutePath.ComponentsCheckboxSyncfusion, labelKey: 'menu.checkboxSyncfusion', testId: TestIds.NAV_CHECKBOX_SYNCFUSION },
      { path: RoutePath.ComponentsToastSyncfusion, labelKey: 'menu.toastSyncfusion', testId: TestIds.NAV_TOAST_SYNCFUSION },
      { path: RoutePath.ComponentsToggleSyncfusion, labelKey: 'menu.toggleSyncfusion', testId: TestIds.NAV_TOGGLE_SYNCFUSION },
      { path: RoutePath.ComponentsToolbarSyncfusion, labelKey: 'menu.toolbarSyncfusion', testId: TestIds.NAV_TOOLBAR_SYNCFUSION },
      { path: RoutePath.ComponentsMenuSyncfusion, labelKey: 'menu.menuSyncfusion', testId: TestIds.NAV_MENU_SYNCFUSION },
      { path: RoutePath.ComponentsAccordionSyncfusion, labelKey: 'menu.accordionSyncfusion', testId: TestIds.NAV_ACCORDION_SYNCFUSION },
      { path: RoutePath.ComponentsBreadcrumbSyncfusion, labelKey: 'menu.breadcrumbSyncfusion', testId: TestIds.NAV_BREADCRUMB_SYNCFUSION },
      { path: RoutePath.ComponentsTabsSyncfusion, labelKey: 'menu.tabsSyncfusion', testId: TestIds.NAV_TABS_SYNCFUSION },
      { path: RoutePath.ComponentsTimelineSyncfusion, labelKey: 'menu.timelineSyncfusion', testId: TestIds.NAV_TIMELINE_SYNCFUSION },
      { path: RoutePath.ComponentsTagSyncfusion, labelKey: 'menu.tagSyncfusion', testId: TestIds.NAV_TAG_SYNCFUSION },
      { path: RoutePath.ComponentsBadgeSyncfusion, labelKey: 'menu.badgeSyncfusion', testId: TestIds.NAV_BADGE_SYNCFUSION },
      { path: RoutePath.ComponentsAvatarSyncfusion, labelKey: 'menu.avatarSyncfusion', testId: TestIds.NAV_AVATAR_SYNCFUSION },
      { path: RoutePath.ComponentsCardSyncfusion, labelKey: 'menu.cardSyncfusion', testId: TestIds.NAV_CARD_SYNCFUSION },
      { path: RoutePath.ComponentsProgressBarSyncfusion, labelKey: 'menu.progressbarSyncfusion', testId: TestIds.NAV_PROGRESSBAR_SYNCFUSION },
      { path: RoutePath.ComponentsTooltipSyncfusion, labelKey: 'menu.tooltipSyncfusion', testId: TestIds.NAV_TOOLTIP_SYNCFUSION },
    ],
  },
  {
    labelKey: 'menu.componentsNative',
    testId: TestIds.NAV_COMPONENTS_NATIVE,
    expandTestId: TestIds.NAV_COMPONENTS_NATIVE_EXPAND,
    path: RoutePath.ComponentsNative,
    items: [
      { path: RoutePath.ComponentsGridNative, labelKey: 'menu.gridNative', testId: TestIds.NAV_GRID_NATIVE },
      { path: RoutePath.ComponentsButtonNative, labelKey: 'menu.buttonNative', testId: TestIds.NAV_BUTTON_NATIVE },
      { path: RoutePath.ComponentsInputNative, labelKey: 'menu.inputNative', testId: TestIds.NAV_INPUT_NATIVE },
      { path: RoutePath.ComponentsSelectNative, labelKey: 'menu.selectNative', testId: TestIds.NAV_SELECT_NATIVE },
      { path: RoutePath.ComponentsCheckboxNative, labelKey: 'menu.checkboxNative', testId: TestIds.NAV_CHECKBOX_NATIVE },
      { path: RoutePath.ComponentsDatePickerNative, labelKey: 'menu.datepickerNative', testId: TestIds.NAV_DATEPICKER_NATIVE },
      { path: RoutePath.ComponentsDialogNative, labelKey: 'menu.dialogNative', testId: TestIds.NAV_DIALOG_NATIVE },
      { path: RoutePath.ComponentsAlertNative, labelKey: 'menu.alertNative', testId: TestIds.NAV_ALERT_NATIVE },
      { path: RoutePath.ComponentsToastNative, labelKey: 'menu.toastNative', testId: TestIds.NAV_TOAST_NATIVE },
      { path: RoutePath.ComponentsToggleNative, labelKey: 'menu.toggleNative', testId: TestIds.NAV_TOGGLE_NATIVE },
      { path: RoutePath.ComponentsToolbarNative, labelKey: 'menu.toolbarNative', testId: TestIds.NAV_TOOLBAR_NATIVE },
      { path: RoutePath.ComponentsMenuNative, labelKey: 'menu.menuNative', testId: TestIds.NAV_MENU_NATIVE },
      { path: RoutePath.ComponentsAccordionNative, labelKey: 'menu.accordionNative', testId: TestIds.NAV_ACCORDION_NATIVE },
      { path: RoutePath.ComponentsBreadcrumbNative, labelKey: 'menu.breadcrumbNative', testId: TestIds.NAV_BREADCRUMB_NATIVE },
      { path: RoutePath.ComponentsTabsNative, labelKey: 'menu.tabsNative', testId: TestIds.NAV_TABS_NATIVE },
      { path: RoutePath.ComponentsTimelineNative, labelKey: 'menu.timelineNative', testId: TestIds.NAV_TIMELINE_NATIVE },
      { path: RoutePath.ComponentsTagNative, labelKey: 'menu.tagNative', testId: TestIds.NAV_TAG_NATIVE },
      { path: RoutePath.ComponentsBadgeNative, labelKey: 'menu.badgeNative', testId: TestIds.NAV_BADGE_NATIVE },
      { path: RoutePath.ComponentsAvatarNative, labelKey: 'menu.avatarNative', testId: TestIds.NAV_AVATAR_NATIVE },
      { path: RoutePath.ComponentsCardNative, labelKey: 'menu.cardNative', testId: TestIds.NAV_CARD_NATIVE },
      { path: RoutePath.ComponentsProgressBarNative, labelKey: 'menu.progressbarNative', testId: TestIds.NAV_PROGRESSBAR_NATIVE },
      { path: RoutePath.ComponentsTooltipNative, labelKey: 'menu.tooltipNative', testId: TestIds.NAV_TOOLTIP_NATIVE },
      { path: RoutePath.ComponentsThemeToggleNative, labelKey: 'menu.themeToggleNative', testId: TestIds.NAV_THEMETOGGLE_NATIVE },
    ],
  },
];

const FORMS_CHILDREN: SubNavItem[] = [
  { path: RoutePath.FormsSyncfusion, labelKey: 'menu.formsSyncfusion', testId: TestIds.NAV_FORMS_SYNCFUSION },
  { path: RoutePath.FormsNative, labelKey: 'menu.formsNative', testId: TestIds.NAV_FORMS_NATIVE },
];

export const Sidebar = (): JSX.Element => {
  const { isCollapsed, toggle } = useSidebarStore();
  const { open: openThemeSettings } = useThemeSettingsDrawerStore();

  const collapsedClass = isCollapsed ? 'collapsed' : '';
  const toggleLabel = isCollapsed ? FM('sidebar.expand') : FM('sidebar.collapse');

  return (
    <aside
      className={`sidebar ${collapsedClass} flex flex-col transition-all duration-normal`}
      data-collapsed={isCollapsed ? 'true' : 'false'}
      data-testid={TestIds.SIDEBAR}
    >
      {/* Logo */}
      <div className="flex h-header items-center justify-between border-b border-border px-4">
        {!isCollapsed && <span className="text-lg font-bold text-primary-600">{FM('app.title')}</span>}
        <button
          aria-label={toggleLabel}
          className="sidebar-item rounded p-2"
          data-testid={TestIds.SIDEBAR_TOGGLE}
          type="button"
          onClick={toggle}
        >
          <span aria-hidden="true">{isCollapsed ? '→' : '←'}</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                aria-label={FM(item.labelKey)}
                className={({ isActive }) =>
                  `sidebar-item flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                    isActive ? 'active' : ''
                  }`
                }
                data-testid={item.testId}
                to={item.path}
              >
                <span aria-hidden="true" className="text-lg">{item.icon}</span>
                {!isCollapsed && <span>{FM(item.labelKey)}</span>}
              </NavLink>
            </li>
          ))}

          {/* Products - expandable sub-menu */}
          <NavExpandableItem
            expandTestId={TestIds.NAV_PRODUCTS_EXPAND}
            icon="📦"
            isCollapsed={isCollapsed}
            labelKey="menu.products"
            pathPrefix={RoutePrefix.Products}
          >
            {PRODUCTS_CHILDREN}
          </NavExpandableItem>

          {/* Components - expandable sub-menu */}
          <NavExpandableItem
            expandTestId={TestIds.NAV_COMPONENTS_EXPAND}
            icon="🧩"
            isCollapsed={isCollapsed}
            labelKey="menu.components"
            pathPrefix={RoutePrefix.Components}
          >
            {COMPONENTS_CHILDREN}
          </NavExpandableItem>

          {/* Forms - expandable sub-menu */}
          <NavExpandableItem
            expandTestId={TestIds.NAV_FORMS_EXPAND}
            icon="📝"
            isCollapsed={isCollapsed}
            labelKey="menu.forms"
            pathPrefix={RoutePrefix.Forms}
          >
            {FORMS_CHILDREN}
          </NavExpandableItem>

          {/* Theme Editor - opens drawer */}
          <li>
            <button
              aria-label={FM('menu.themeEditorLabel')}
              className="sidebar-item flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors"
              data-testid={TestIds.NAV_THEME_EDITOR}
              type="button"
              onClick={openThemeSettings}
            >
              <span aria-hidden="true" className="text-lg">{ICON_PALETTE}</span>
              {!isCollapsed && <span>{FM('menu.themeEditor')}</span>}
            </button>
          </li>
        </ul>
      </nav>

      {/* Login link at bottom */}
      <div className="border-t border-border p-2">
        <NavLink
          aria-label={FM('menu.loginLabel')}
          className="sidebar-item flex items-center gap-3 rounded-md px-3 py-2"
          data-testid={TestIds.NAV_LOGIN}
          to={RoutePath.Root}
        >
          <span aria-hidden="true" className="text-lg">{ICON_LOCK}</span>
          {!isCollapsed && <span>{FM('menu.login')}</span>}
        </NavLink>
      </div>
    </aside>
  );
};
