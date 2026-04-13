/** Permission categories for the permissions matrix display. */
export const PERMISSION_CATEGORIES: Record<string, string[]> = {
  Dashboard: ['ViewDashboard'],
  Products: ['ViewProducts', 'EditProducts'],
  Orders: ['ViewOrders', 'ManageOrders'],
  Users: ['ManageUsers', 'ManageRoles'],
  Alerts: ['ViewAlerts', 'ManageAlerts'],
  Reports: ['ViewReports', 'ManageReports'],
  Calendar: ['ViewCalendar', 'ManageCalendar'],
  Kanban: ['ViewKanban', 'ManageKanban'],
  Settings: ['ManageSettings'],
  Admin: ['AdminAccess'],
  Other: [
    'ViewEditor',
    'ViewNotifications',
    'ViewActivityLog',
    'ViewForms',
    'ViewComponents',
    'ViewMarketplace',
  ],
};

/** Flat list of all permission keys derived from the categories. */
export const ALL_PERMISSIONS: string[] = Object.values(
  PERMISSION_CATEGORIES,
).flat();

/** API base path for roles endpoints. */
export const ROLES_API_BASE = '/mockapi/api/roles';
