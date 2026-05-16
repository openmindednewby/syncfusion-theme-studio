/**
 * Maps each Role to its set of granted Permissions.
 * This is the client-side source of truth for permission checks.
 */
import { Permission } from './Permission';
import { Role } from './Role';

const ADMIN_PERMISSIONS: Permission[] = [
  Permission.ViewDashboard,
  Permission.ManageUsers,
  Permission.ManageRoles,
  Permission.EditProducts,
  Permission.ViewProducts,
  Permission.ManageSettings,
  Permission.ViewAlerts,
  Permission.ManageAlerts,
  Permission.ViewOrders,
  Permission.ManageOrders,
  Permission.ViewReports,
  Permission.ManageReports,
  Permission.ViewCalendar,
  Permission.ManageCalendar,
  Permission.ViewKanban,
  Permission.ManageKanban,
  Permission.ViewNotifications,
  Permission.ViewActivityLog,
  Permission.ViewForms,
  Permission.ViewComponents,
  Permission.ViewMarketplace,
  Permission.ViewChat,
  Permission.ViewMaps,

  Permission.ViewDiagram,
  Permission.AdminAccess,
];

const MANAGER_PERMISSIONS: Permission[] = [
  Permission.ViewDashboard,
  Permission.EditProducts,
  Permission.ViewProducts,
  Permission.ViewAlerts,
  Permission.ManageAlerts,
  Permission.ViewOrders,
  Permission.ManageOrders,
  Permission.ViewReports,
  Permission.ViewCalendar,
  Permission.ManageCalendar,
  Permission.ViewKanban,
  Permission.ManageKanban,
  Permission.ViewNotifications,
  Permission.ViewActivityLog,
  Permission.ViewForms,
  Permission.ViewComponents,
  Permission.ViewChat,
  Permission.ViewMaps,

  Permission.ViewDiagram,
];

const VIEWER_PERMISSIONS: Permission[] = [
  Permission.ViewDashboard,
  Permission.ViewProducts,
  Permission.ViewAlerts,
  Permission.ViewOrders,
  Permission.ViewReports,
  Permission.ViewCalendar,
  Permission.ViewKanban,
  Permission.ViewNotifications,
  Permission.ViewActivityLog,
  Permission.ViewForms,
  Permission.ViewComponents,
  Permission.ViewChat,
  Permission.ViewMaps,

  Permission.ViewDiagram,
];

const ANALYST_PERMISSIONS: Permission[] = [
  Permission.ViewDashboard,
  Permission.ViewProducts,
  Permission.ViewAlerts,
  Permission.ViewOrders,
  Permission.ViewReports,
  Permission.ViewCalendar,
  Permission.ViewNotifications,
  Permission.ViewActivityLog,
  Permission.ViewChat,
  Permission.ViewMaps,

  Permission.ViewDiagram,
];

/** Role-to-permissions mapping. Returns a Set for O(1) lookups. */
export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  [Role.Admin]: ADMIN_PERMISSIONS,
  [Role.Manager]: MANAGER_PERMISSIONS,
  [Role.Viewer]: VIEWER_PERMISSIONS,
  [Role.Analyst]: ANALYST_PERMISSIONS,
};

/** Resolves the permission set for a given role string. */
export function getPermissionsForRole(role: string): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}
