/**
 * Navigation data configuration for the sidebar.
 * Matches the Figma mainSideBar.png design with themed menu items.
 * Each item can optionally require a Permission for visibility.
 */
import { RoutePath, RoutePrefix } from '@/app/routePaths';
import { Permission } from '@/shared/permissions';
import { TestIds } from '@/shared/testIds';

import { IconName } from './utils/iconName';
import { COMPONENTS_CHILDREN } from './utils/sidebarComponentGroups';
import {
  ALERTS_INCIDENTS_CHILDREN,
  BUSINESS_CHILDREN,
  DASHBOARD_CHILDREN,
  FORMS_CHILDREN,
  PRODUCTS_CHILDREN,
} from './utils/sidebarNavChildren';
import { SubNavId } from './utils/subNavId';

import type { SidebarNavEntry, SidebarNavItem } from './sidebarNavTypes';

// Re-export types for backward compatibility
export type { SidebarNavItem, SidebarExpandableItem, SidebarNavEntry } from './sidebarNavTypes';
export { isExpandableEntry } from './sidebarNavTypes';

export const MAIN_NAV_ITEMS: SidebarNavEntry[] = [
  {
    id: 'dashboard',
    labelKey: 'sidebar.nav.dashboard',
    testId: TestIds.NAV_HOME,
    expandTestId: TestIds.NAV_DASHBOARD_EXPAND,
    pathPrefix: RoutePrefix.DashboardHome,
    iconName: IconName.ChartBar,
    children: DASHBOARD_CHILDREN,
    requiredPermission: Permission.ViewDashboard,
  },
  {
    id: 'products',
    labelKey: 'sidebar.nav.products',
    testId: TestIds.NAV_PRODUCTS,
    expandTestId: TestIds.NAV_PRODUCTS_EXPAND,
    pathPrefix: RoutePrefix.Products,
    iconName: IconName.Folder,
    children: PRODUCTS_CHILDREN,
    requiredPermission: Permission.ViewProducts,
  },
  {
    id: 'forms',
    labelKey: 'sidebar.nav.forms',
    testId: TestIds.NAV_FORMS,
    expandTestId: TestIds.NAV_FORMS_EXPAND,
    pathPrefix: RoutePrefix.Forms,
    iconName: IconName.FormInput,
    children: FORMS_CHILDREN,
    requiredPermission: Permission.ViewForms,
  },
  {
    id: 'components',
    labelKey: 'sidebar.nav.components',
    testId: TestIds.NAV_COMPONENTS,
    expandTestId: TestIds.NAV_COMPONENTS_EXPAND,
    pathPrefix: RoutePrefix.Components,
    iconName: IconName.Layout,
    children: COMPONENTS_CHILDREN,
    requiredPermission: Permission.ViewComponents,
  },
  {
    id: 'alerts-incidents',
    labelKey: 'sidebar.nav.alertsIncidents',
    testId: TestIds.NAV_ALERTS_INCIDENTS,
    expandTestId: TestIds.NAV_ALERTS_INCIDENTS_EXPAND,
    pathPrefix: RoutePrefix.AlertsIncidents,
    iconName: IconName.Bell,
    children: ALERTS_INCIDENTS_CHILDREN,
    requiredPermission: Permission.ViewAlerts,
  },
  {
    id: 'business',
    labelKey: 'sidebar.nav.business',
    testId: TestIds.NAV_BUSINESS,
    expandTestId: TestIds.NAV_BUSINESS_EXPAND,
    pathPrefix: RoutePrefix.Customers,
    iconName: IconName.Briefcase,
    children: BUSINESS_CHILDREN,
    requiredPermission: Permission.ViewOrders,
  },
  { id: 'calendar', labelKey: 'sidebar.nav.calendar', testId: TestIds.NAV_CALENDAR, path: RoutePath.Calendar, iconName: IconName.Calendar, requiredPermission: Permission.ViewCalendar },
  { id: 'kanban', labelKey: 'sidebar.nav.kanban', testId: TestIds.NAV_KANBAN, path: RoutePath.Kanban, iconName: IconName.Kanban, requiredPermission: Permission.ViewKanban },
  { id: 'chat', labelKey: 'sidebar.nav.chat', testId: TestIds.NAV_CHAT, path: RoutePath.Chat, iconName: IconName.MessageCircle, requiredPermission: Permission.ViewChat },
  { id: 'maps', labelKey: 'sidebar.nav.maps', testId: TestIds.NAV_MAPS, path: RoutePath.Maps, iconName: IconName.MapPin, requiredPermission: Permission.ViewMaps },

  { id: 'diagram', labelKey: 'sidebar.nav.diagram', testId: TestIds.NAV_DIAGRAM, path: RoutePath.Diagram, iconName: IconName.GitBranch, requiredPermission: Permission.ViewDiagram },
  { id: 'notifications', labelKey: 'sidebar.nav.notifications', testId: TestIds.NAV_NOTIFICATIONS, path: RoutePath.Notifications, iconName: IconName.MessageSquare, requiredPermission: Permission.ViewNotifications },
  { id: 'activity-log', labelKey: 'sidebar.nav.activityLog', testId: TestIds.NAV_ACTIVITY_LOG, path: RoutePath.ActivityLog, iconName: IconName.List, requiredPermission: Permission.ViewActivityLog },
];

export const BOTTOM_NAV_ITEMS: SidebarNavItem[] = [
  { id: 'user-profile', labelKey: 'sidebar.nav.userProfile', testId: TestIds.NAV_USER_PROFILE, path: RoutePath.UserProfile, iconName: IconName.User },
  { id: 'settings', labelKey: 'sidebar.nav.settings', testId: TestIds.NAV_SETTINGS, path: RoutePath.Settings, iconName: IconName.Settings, requiredPermission: Permission.ManageSettings },
  { id: 'admin-hub', labelKey: 'sidebar.nav.adminHub', testId: TestIds.NAV_ADMIN_HUB, iconName: IconName.Settings, subNavId: SubNavId.AdminHub, requiredPermission: Permission.AdminAccess },
  { id: 'marketplace', labelKey: 'sidebar.nav.marketplace', testId: TestIds.NAV_MARKETPLACE, path: RoutePath.Marketplace, iconName: IconName.Store, requiredPermission: Permission.ViewMarketplace },
];
