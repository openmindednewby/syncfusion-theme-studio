// Full absolute paths used for navigation (navigate(), NavLink, etc.)

export const enum RoutePath {
  // Auth
  Root = '/',
  Login = '/login',

  // Dashboard
  Dashboard = '/dashboard',
  DashboardOverview = '/dashboard/home/overview',
  DashboardMetrics = '/dashboard/home/metrics',
  DashboardKpis = '/dashboard/home/kpis',

  // Products
  Products = '/products',
  ProductsNative = '/products/native',
  ProductsSyncfusion = '/products/syncfusion',

  // Components
  Components = '/components',
  ComponentsNative = '/components/native',
  ComponentsSyncfusion = '/components/syncfusion',
  ComponentsGrid = '/components/grid',
  ComponentsGridNative = '/components/grid/native',
  ComponentsGridSyncfusion = '/components/grid/syncfusion',
  ComponentsGridPlayground = '/components/grid/playground',

  // Button
  ComponentsButton = '/components/button',
  ComponentsButtonNative = '/components/button/native',
  ComponentsButtonSyncfusion = '/components/button/syncfusion',

  // Input
  ComponentsInput = '/components/input',
  ComponentsInputNative = '/components/input/native',
  ComponentsInputSyncfusion = '/components/input/syncfusion',

  // Select
  ComponentsSelect = '/components/select',
  ComponentsSelectNative = '/components/select/native',
  ComponentsSelectSyncfusion = '/components/select/syncfusion',

  // DatePicker
  ComponentsDatePicker = '/components/datepicker',
  ComponentsDatePickerNative = '/components/datepicker/native',
  ComponentsDatePickerSyncfusion = '/components/datepicker/syncfusion',

  // Dialog
  ComponentsDialog = '/components/dialog',
  ComponentsDialogNative = '/components/dialog/native',
  ComponentsDialogSyncfusion = '/components/dialog/syncfusion',

  // Alert
  ComponentsAlert = '/components/alert',
  ComponentsAlertNative = '/components/alert/native',
  ComponentsAlertSyncfusion = '/components/alert/syncfusion',

  // AlertBadge
  ComponentsAlertBadge = '/components/alertbadge',
  ComponentsAlertBadgeNative = '/components/alertbadge/native',

  // PillBadge
  ComponentsPillBadge = '/components/pillbadge',
  ComponentsPillBadgeNative = '/components/pillbadge/native',

  // Pagination
  ComponentsPagination = '/components/pagination',
  ComponentsPaginationNative = '/components/pagination/native',

  // SearchPanel
  ComponentsSearchPanel = '/components/searchpanel',
  ComponentsSearchPanelNative = '/components/searchpanel/native',

  // FlexBox
  ComponentsFlexBox = '/components/flexbox',
  ComponentsFlexBoxNative = '/components/flexbox/native',

  // Checkbox
  ComponentsCheckbox = '/components/checkbox',
  ComponentsCheckboxNative = '/components/checkbox/native',
  ComponentsCheckboxSyncfusion = '/components/checkbox/syncfusion',

  // Toast
  ComponentsToast = '/components/toast',
  ComponentsToastNative = '/components/toast/native',
  ComponentsToastSyncfusion = '/components/toast/syncfusion',

  // Toggle
  ComponentsToggle = '/components/toggle',
  ComponentsToggleNative = '/components/toggle/native',
  ComponentsToggleSyncfusion = '/components/toggle/syncfusion',

  // Toolbar
  ComponentsToolbar = '/components/toolbar',
  ComponentsToolbarNative = '/components/toolbar/native',
  ComponentsToolbarSyncfusion = '/components/toolbar/syncfusion',

  // Menu
  ComponentsMenu = '/components/menu',
  ComponentsMenuNative = '/components/menu/native',
  ComponentsMenuSyncfusion = '/components/menu/syncfusion',

  // Accordion
  ComponentsAccordion = '/components/accordion',
  ComponentsAccordionNative = '/components/accordion/native',
  ComponentsAccordionSyncfusion = '/components/accordion/syncfusion',

  // Breadcrumb
  ComponentsBreadcrumb = '/components/breadcrumb',
  ComponentsBreadcrumbNative = '/components/breadcrumb/native',
  ComponentsBreadcrumbSyncfusion = '/components/breadcrumb/syncfusion',

  // Tabs
  ComponentsTabs = '/components/tabs',
  ComponentsTabsNative = '/components/tabs/native',
  ComponentsTabsSyncfusion = '/components/tabs/syncfusion',

  // Timeline
  ComponentsTimeline = '/components/timeline',
  ComponentsTimelineNative = '/components/timeline/native',
  ComponentsTimelineSyncfusion = '/components/timeline/syncfusion',

  // Tag
  ComponentsTag = '/components/tag',
  ComponentsTagNative = '/components/tag/native',
  ComponentsTagSyncfusion = '/components/tag/syncfusion',

  // Badge
  ComponentsBadge = '/components/badge',
  ComponentsBadgeNative = '/components/badge/native',
  ComponentsBadgeSyncfusion = '/components/badge/syncfusion',

  // Avatar
  ComponentsAvatar = '/components/avatar',
  ComponentsAvatarNative = '/components/avatar/native',
  ComponentsAvatarSyncfusion = '/components/avatar/syncfusion',

  // Card
  ComponentsCard = '/components/card',
  ComponentsCardNative = '/components/card/native',
  ComponentsCardSyncfusion = '/components/card/syncfusion',

  // Chip
  ComponentsChip = '/components/chip',
  ComponentsChipNative = '/components/chip/native',
  ComponentsChipSyncfusion = '/components/chip/syncfusion',

  // ProgressBar
  ComponentsProgressBar = '/components/progressbar',
  ComponentsProgressBarNative = '/components/progressbar/native',
  ComponentsProgressBarSyncfusion = '/components/progressbar/syncfusion',

  // Tooltip
  ComponentsTooltip = '/components/tooltip',
  ComponentsTooltipNative = '/components/tooltip/native',
  ComponentsTooltipSyncfusion = '/components/tooltip/syncfusion',

  // Colors
  ComponentsColors = '/components/colors',
  ComponentsColorsNative = '/components/colors/native',

  // Icons
  ComponentsIcons = '/components/icons',
  ComponentsIconsNative = '/components/icons/native',

  // TextDescription
  ComponentsTextDescription = '/components/textdescription',
  ComponentsTextDescriptionNative = '/components/textdescription/native',
  ComponentsTextDescriptionSyncfusion = '/components/textdescription/syncfusion',

  // Typography
  ComponentsTypography = '/components/typography',
  ComponentsTypographyNative = '/components/typography/native',

  // NavMenu
  ComponentsNavMenu = '/components/navmenu',
  ComponentsNavMenuNative = '/components/navmenu/native',

  // ExternalLink
  ComponentsExternalLink = '/components/externallink',
  ComponentsExternalLinkNative = '/components/externallink/native',

  // Image
  ComponentsImage = '/components/image',
  ComponentsImageNative = '/components/image/native',

  // Loader
  ComponentsLoader = '/components/loader',
  ComponentsLoaderNative = '/components/loader/native',

  // SkeletonLoader
  ComponentsSkeletonLoader = '/components/skeletonloader',
  ComponentsSkeletonLoaderNative = '/components/skeletonloader/native',

  // Slider
  ComponentsSlider = '/components/slider',
  ComponentsSliderNative = '/components/slider/native',

  // Sidebar
  ComponentsSidebar = '/components/sidebar',
  ComponentsSidebarNative = '/components/sidebar/native',

  // ThemeToggle
  ComponentsThemeToggle = '/components/themetoggle',
  ComponentsThemeToggleNative = '/components/themetoggle/native',

  // Forms
  Forms = '/forms',
  FormsSyncfusion = '/forms/syncfusion',
  FormsNative = '/forms/native',

  // Placeholder
  NotImplemented = '/not-implemented',

  // Admin Hub
  AdminUserManagement = '/admin/user-management',
  AdminRoleManagement = '/admin/role-management',
  AdminThemeEditor = '/admin/theme-editor',
  AdminSystemSettings = '/admin/system-settings',
  AdminIntegrations = '/admin/integrations',
  AdminPlugins = '/admin/plugins',
  AdminDocumentation = '/admin/documentation',
  AdminSupport = '/admin/support',

  // SIEM Features
  AlertsIncidents = '/alerts-incidents',
  AlertsManagement = '/alerts-incidents/alerts-management',
  IncidentsManagement = '/alerts-incidents/incidents-management',
  Marketplace = '/marketplace',

  // App Pages
  Notifications = '/notifications',
  UserProfile = '/profile',
  ActivityLog = '/activity-log',

  // Error Pages
  Unauthorized = '/errors/401',
  Forbidden = '/errors/403',
  ServerError = '/errors/500',

  // Business Pages
  Customers = '/customers',
  Invoices = '/invoices',
  Orders = '/orders',
  Inventory = '/inventory',
  Settings = '/settings',

  // Calendar
  Calendar = '/calendar',

  // Kanban
  Kanban = '/kanban',

  // Gantt
  Gantt = '/gantt',

  // Maps
  Maps = '/maps',

  // Chat
  Chat = '/chat',


  // Diagram
  Diagram = '/diagram',

  // Pricing (public)
  Pricing = '/pricing',

}
