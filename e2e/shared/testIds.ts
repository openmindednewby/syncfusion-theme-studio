/**
 * Shared test IDs between frontend and E2E tests.
 * MUST be kept in sync with src/shared/testIds.ts
 */
export const TestIds = {
  // Navigation
  NAV_HOME: 'nav-home',
  NAV_DASHBOARD_EXPAND: 'nav-dashboard-expand',
  NAV_PRODUCTS: 'nav-products',
  NAV_COMPONENTS: 'nav-components',
  NAV_THEME_EDITOR: 'nav-theme-editor',
  NAV_LOGIN: 'nav-login',
  SIDEBAR: 'sidebar',
  SIDEBAR_TOGGLE: 'sidebar-toggle',
  THEME_TOGGLE: 'theme-toggle',
  THEME_SETTINGS_BUTTON: 'theme-settings-button',

  // Header Breadcrumb
  HEADER_BREADCRUMB_NAV: 'header-breadcrumb-nav',
  HEADER_BREADCRUMB_HOME: 'header-breadcrumb-home',

  // Dashboard
  DASHBOARD_HEADING: 'dashboard-heading',
  STAT_TOTAL_USERS: 'stat-total-users',
  STAT_ACTIVE_SESSIONS: 'stat-active-sessions',
  STAT_REVENUE: 'stat-revenue',
  STAT_GROWTH: 'stat-growth',
  CHART_REVENUE: 'chart-revenue',
  CHART_USER_ACTIVITY: 'chart-user-activity',
  CHART_USERS: 'chart-users',
  BTN_EXPLORE_COMPONENTS: 'btn-explore-components',
  BTN_THEME_EDITOR: 'btn-theme-editor',

  // Login
  LOGIN_USERNAME: 'login-username',
  LOGIN_PASSWORD: 'login-password',
  LOGIN_SUBMIT: 'login-submit',
  LOGIN_ERROR: 'login-error',
  LOGIN_FORGOT_PASSWORD: 'login-forgot-password',
  LOGIN_ANIMATE_GRADIENT: 'login-animate-gradient',

  // Products
  PRODUCTS_GRID: 'products-grid',
  PRODUCTS_CATEGORY_FILTER: 'products-category-filter',
  PRODUCTS_ADD: 'products-add',
  BTN_RETRY: 'btn-retry',
  NATIVE_PRODUCTS_PAGE: 'native-products-page',
  NATIVE_PRODUCTS_GRID: 'native-products-grid',

  // Theme Settings Drawer
  THEME_SETTINGS_DRAWER: 'theme-settings-drawer',
  THEME_EXPORT_BTN: 'theme-export-btn',
  THEME_RESET_BTN: 'theme-reset-btn',
  THEME_IMPORT_BTN: 'theme-import-btn',
  THEME_IMPORT_TOGGLE_BTN: 'theme-import-toggle-btn',
  THEME_IMPORT_TEXTAREA: 'theme-import-textarea',
  THEME_IMPORT_ERROR: 'theme-import-error',
  THEME_TAB_COLORS: 'theme-tab-colors',
  THEME_TAB_TYPOGRAPHY: 'theme-tab-typography',
  THEME_TAB_LAYOUT: 'theme-tab-layout',
  THEME_TAB_LIGHT: 'theme-tab-lightTheme',
  THEME_TAB_DARK: 'theme-tab-darkTheme',
  THEME_TAB_COMPONENTS: 'theme-tab-components',
  THEME_TAB_PRESETS: 'theme-tab-presets',
  THEME_PRESET_CARD: 'theme-preset-card',
  THEME_CLOSE_BTN: 'theme-close-btn',
  THEME_BACKDROP: 'theme-backdrop',
  THEME_EDITOR_PANEL: 'theme-editor-panel',
  THEME_SPLITTER: 'theme-splitter',

  // Showcase
  SHOWCASE_GRID: 'showcase-grid',
  BTN_PRIMARY: 'btn-primary',
  BTN_SECONDARY: 'btn-secondary',
  BTN_OUTLINE: 'btn-outline',
  BTN_GHOST: 'btn-ghost',
  BTN_DANGER: 'btn-danger',
  BTN_DISABLED: 'btn-disabled',
  INPUT_NAME: 'input-name',
  INPUT_EMAIL: 'input-email',
  INPUT_DISABLED: 'input-disabled',
  INPUT_ERROR: 'input-error',
  SELECT_BASIC: 'select-basic',
  SELECT_ERROR: 'select-error',
  DATA_GRID_USERS: 'data-grid-users',
  BTN_TOGGLE_LOADING: 'btn-toggle-loading',

  // DataGrid Page
  DATA_GRID_PAGE: 'data-grid-page',
  DATA_GRID_SHOWCASE: 'data-grid-showcase',
  DATA_GRID_BACK_LINK: 'data-grid-back-link',
  DATA_GRID_LINK_CARD: 'data-grid-link-card',
  DATA_GRID_VIEW_LINK: 'data-grid-view-link',

  // Grid showcase pages
  SYNCFUSION_GRID_SHOWCASE: 'syncfusion-grid-showcase',
  NATIVE_GRID_SHOWCASE: 'native-grid-showcase',
  NAV_GRID_SYNCFUSION: 'nav-grid-syncfusion',
  NAV_GRID_NATIVE: 'nav-grid-native',
  GRID_SHOWCASE_SECTION: 'grid-showcase-section',
  GRID_ALERT_MANAGEMENT: 'grid-alert-management',
  GRID_ALERT_MANAGEMENT_TABLE: 'grid-alert-management-table',

  // Component Showcase Pages
  NATIVE_BUTTON_SHOWCASE: 'native-button-showcase',
  SYNCFUSION_BUTTON_SHOWCASE: 'syncfusion-button-showcase',
  NATIVE_INPUT_SHOWCASE: 'native-input-showcase',
  SYNCFUSION_INPUT_SHOWCASE: 'syncfusion-input-showcase',
  NATIVE_SELECT_SHOWCASE: 'native-select-showcase',
  SYNCFUSION_SELECT_SHOWCASE: 'syncfusion-select-showcase',
  NATIVE_DATEPICKER_SHOWCASE: 'native-datepicker-showcase',
  SYNCFUSION_DATEPICKER_SHOWCASE: 'syncfusion-datepicker-showcase',
  NATIVE_DIALOG_SHOWCASE: 'native-dialog-showcase',
  SYNCFUSION_DIALOG_SHOWCASE: 'syncfusion-dialog-showcase',
  NATIVE_ALERT_SHOWCASE: 'native-alert-showcase',
  SYNCFUSION_ALERT_SHOWCASE: 'syncfusion-alert-showcase',
  NATIVE_CHECKBOX_SHOWCASE: 'native-checkbox-showcase',
  SYNCFUSION_CHECKBOX_SHOWCASE: 'syncfusion-checkbox-showcase',
  NATIVE_TOAST_SHOWCASE: 'native-toast-showcase',
  SYNCFUSION_TOAST_SHOWCASE: 'syncfusion-toast-showcase',
  NATIVE_TOAST_VARIANTS_SECTION: 'native-toast-variants-section',
  NATIVE_TOAST_INTERACTIVE_SECTION: 'native-toast-interactive-section',
  NATIVE_TOGGLE_SHOWCASE: 'native-toggle-showcase',
  SYNCFUSION_TOGGLE_SHOWCASE: 'syncfusion-toggle-showcase',
  NATIVE_TOOLBAR_SHOWCASE: 'native-toolbar-showcase',
  SYNCFUSION_TOOLBAR_SHOWCASE: 'syncfusion-toolbar-showcase',
  NATIVE_MENU_SHOWCASE: 'native-menu-showcase',
  SYNCFUSION_MENU_SHOWCASE: 'syncfusion-menu-showcase',
  NATIVE_MENU_BASIC: 'native-menu-basic',
  NATIVE_MENU_NESTED: 'native-menu-nested',
  NATIVE_MENU_INTERACTIVE: 'native-menu-interactive',
  NATIVE_MENU_SELECTED: 'native-menu-selected',
  NATIVE_ACCORDION_SHOWCASE: 'native-accordion-showcase',
  SYNCFUSION_ACCORDION_SHOWCASE: 'syncfusion-accordion-showcase',
  NATIVE_ACCORDION_BASIC: 'native-accordion-basic',
  NATIVE_ACCORDION_SINGLE: 'native-accordion-single',
  NATIVE_ACCORDION_MULTI: 'native-accordion-multi',
  NATIVE_ACCORDION_INTERACTIVE: 'native-accordion-interactive',
  NATIVE_ACCORDION_OPEN_PANELS: 'native-accordion-open-panels',
  NATIVE_BREADCRUMB_SHOWCASE: 'native-breadcrumb-showcase',
  SYNCFUSION_BREADCRUMB_SHOWCASE: 'syncfusion-breadcrumb-showcase',
  SYNCFUSION_ACCORDION_EXPAND_ALL: 'syncfusion-accordion-expand-all',
  SYNCFUSION_ACCORDION_COLLAPSE_ALL: 'syncfusion-accordion-collapse-all',
  NATIVE_BREADCRUMB_BASIC: 'native-breadcrumb-basic',
  NATIVE_BREADCRUMB_CUSTOM: 'native-breadcrumb-custom',
  NATIVE_BREADCRUMB_INTERACTIVE: 'native-breadcrumb-interactive',
  NATIVE_BREADCRUMB_NAV_STATUS: 'native-breadcrumb-nav-status',

  // Native Components Page
  NATIVE_COMPONENTS_PAGE: 'native-components-page',

  // Syncfusion Components Page
  SYNCFUSION_COMPONENTS_PAGE: 'syncfusion-components-page',

  // Products Sidebar Sub-menu
  NAV_PRODUCTS_NATIVE: 'nav-products-native',
  NAV_PRODUCTS_SYNCFUSION: 'nav-products-syncfusion',
  NAV_PRODUCTS_EXPAND: 'nav-products-expand',

  // Components Sidebar Sub-menu
  NAV_COMPONENTS_NATIVE: 'nav-components-native',
  NAV_COMPONENTS_SYNCFUSION: 'nav-components-syncfusion',
  NAV_COMPONENTS_EXPAND: 'nav-components-expand',
  NAV_COMPONENTS_SYNCFUSION_EXPAND: 'nav-components-syncfusion-expand',
  NAV_COMPONENTS_NATIVE_EXPAND: 'nav-components-native-expand',

  // Component Showcase Navigation
  NAV_BUTTON_NATIVE: 'nav-button-native',
  NAV_BUTTON_SYNCFUSION: 'nav-button-syncfusion',
  NAV_INPUT_NATIVE: 'nav-input-native',
  NAV_INPUT_SYNCFUSION: 'nav-input-syncfusion',
  NAV_SELECT_NATIVE: 'nav-select-native',
  NAV_SELECT_SYNCFUSION: 'nav-select-syncfusion',
  NAV_DATEPICKER_NATIVE: 'nav-datepicker-native',
  NAV_DATEPICKER_SYNCFUSION: 'nav-datepicker-syncfusion',
  NAV_DIALOG_NATIVE: 'nav-dialog-native',
  NAV_DIALOG_SYNCFUSION: 'nav-dialog-syncfusion',
  NAV_ALERT_NATIVE: 'nav-alert-native',
  NAV_ALERT_SYNCFUSION: 'nav-alert-syncfusion',
  NAV_CHECKBOX_NATIVE: 'nav-checkbox-native',
  NAV_TOAST_NATIVE: 'nav-toast-native',
  NAV_TOGGLE_NATIVE: 'nav-toggle-native',
  NAV_TOOLBAR_NATIVE: 'nav-toolbar-native',
  NAV_MENU_NATIVE: 'nav-menu-native',
  NAV_ACCORDION_NATIVE: 'nav-accordion-native',
  NAV_BREADCRUMB_NATIVE: 'nav-breadcrumb-native',
  NAV_CHECKBOX_SYNCFUSION: 'nav-checkbox-syncfusion',
  NAV_TOAST_SYNCFUSION: 'nav-toast-syncfusion',
  NAV_TOGGLE_SYNCFUSION: 'nav-toggle-syncfusion',
  NAV_TOOLBAR_SYNCFUSION: 'nav-toolbar-syncfusion',
  NAV_MENU_SYNCFUSION: 'nav-menu-syncfusion',
  NAV_ACCORDION_SYNCFUSION: 'nav-accordion-syncfusion',
  NAV_BREADCRUMB_SYNCFUSION: 'nav-breadcrumb-syncfusion',
  NAV_TABS_NATIVE: 'nav-tabs-native',
  NAV_TABS_SYNCFUSION: 'nav-tabs-syncfusion',
  NAV_TIMELINE_NATIVE: 'nav-timeline-native',
  NAV_TIMELINE_SYNCFUSION: 'nav-timeline-syncfusion',
  NAV_TAG_NATIVE: 'nav-tag-native',
  NAV_TAG_SYNCFUSION: 'nav-tag-syncfusion',
  NAV_BADGE_NATIVE: 'nav-badge-native',
  NAV_BADGE_SYNCFUSION: 'nav-badge-syncfusion',
  NAV_AVATAR_NATIVE: 'nav-avatar-native',
  NAV_AVATAR_SYNCFUSION: 'nav-avatar-syncfusion',
  NAV_CARD_NATIVE: 'nav-card-native',
  NAV_CARD_SYNCFUSION: 'nav-card-syncfusion',
  NAV_PROGRESSBAR_NATIVE: 'nav-progressbar-native',
  NAV_PROGRESSBAR_SYNCFUSION: 'nav-progressbar-syncfusion',
  NAV_TOOLTIP_NATIVE: 'nav-tooltip-native',
  NAV_TOOLTIP_SYNCFUSION: 'nav-tooltip-syncfusion',
  NAV_THEMETOGGLE_NATIVE: 'nav-themetoggle-native',

  // Component SubNavGroup test IDs
  NAV_OVERVIEW_GROUP: 'nav-overview-group',
  NAV_OVERVIEW_GROUP_EXPAND: 'nav-overview-group-expand',
  NAV_ACCORDION_GROUP: 'nav-accordion-group',
  NAV_ACCORDION_GROUP_EXPAND: 'nav-accordion-group-expand',
  NAV_ALERT_GROUP: 'nav-alert-group',
  NAV_ALERT_GROUP_EXPAND: 'nav-alert-group-expand',
  NAV_AVATAR_GROUP: 'nav-avatar-group',
  NAV_AVATAR_GROUP_EXPAND: 'nav-avatar-group-expand',
  NAV_BADGE_GROUP: 'nav-badge-group',
  NAV_BADGE_GROUP_EXPAND: 'nav-badge-group-expand',
  NAV_BREADCRUMB_GROUP: 'nav-breadcrumb-group',
  NAV_BREADCRUMB_GROUP_EXPAND: 'nav-breadcrumb-group-expand',
  NAV_BUTTON_GROUP: 'nav-button-group',
  NAV_BUTTON_GROUP_EXPAND: 'nav-button-group-expand',
  NAV_CARD_GROUP: 'nav-card-group',
  NAV_CARD_GROUP_EXPAND: 'nav-card-group-expand',
  NAV_CHECKBOX_GROUP: 'nav-checkbox-group',
  NAV_CHECKBOX_GROUP_EXPAND: 'nav-checkbox-group-expand',
  NAV_DATEPICKER_GROUP: 'nav-datepicker-group',
  NAV_DATEPICKER_GROUP_EXPAND: 'nav-datepicker-group-expand',
  NAV_DIALOG_GROUP: 'nav-dialog-group',
  NAV_DIALOG_GROUP_EXPAND: 'nav-dialog-group-expand',
  NAV_GRID_GROUP: 'nav-grid-group',
  NAV_GRID_GROUP_EXPAND: 'nav-grid-group-expand',
  NAV_INPUT_GROUP: 'nav-input-group',
  NAV_INPUT_GROUP_EXPAND: 'nav-input-group-expand',
  NAV_MENU_GROUP: 'nav-menu-group',
  NAV_MENU_GROUP_EXPAND: 'nav-menu-group-expand',
  NAV_PROGRESSBAR_GROUP: 'nav-progressbar-group',
  NAV_PROGRESSBAR_GROUP_EXPAND: 'nav-progressbar-group-expand',
  NAV_SELECT_GROUP: 'nav-select-group',
  NAV_SELECT_GROUP_EXPAND: 'nav-select-group-expand',
  NAV_TABS_GROUP: 'nav-tabs-group',
  NAV_TABS_GROUP_EXPAND: 'nav-tabs-group-expand',
  NAV_TAG_GROUP: 'nav-tag-group',
  NAV_TAG_GROUP_EXPAND: 'nav-tag-group-expand',
  NAV_TIMELINE_GROUP: 'nav-timeline-group',
  NAV_TIMELINE_GROUP_EXPAND: 'nav-timeline-group-expand',
  NAV_TOAST_GROUP: 'nav-toast-group',
  NAV_TOAST_GROUP_EXPAND: 'nav-toast-group-expand',
  NAV_TOGGLE_GROUP: 'nav-toggle-group',
  NAV_TOGGLE_GROUP_EXPAND: 'nav-toggle-group-expand',
  NAV_TOOLBAR_GROUP: 'nav-toolbar-group',
  NAV_TOOLBAR_GROUP_EXPAND: 'nav-toolbar-group-expand',
  NAV_TOOLTIP_GROUP: 'nav-tooltip-group',
  NAV_TOOLTIP_GROUP_EXPAND: 'nav-tooltip-group-expand',

  // Sidebar Navigation (ThemeStudio)
  SIDEBAR_SEARCH: 'sidebar-search',
  SIDEBAR_BACK_MAIN: 'sidebar-back-main',
  NAV_SAMPLE_MANAGER: 'nav-sample-manager',
  NAV_ALERTS_INCIDENTS: 'nav-alerts-incidents',
  NAV_NOTIFICATIONS: 'nav-notifications',
  NAV_ACTIVITY_LOG: 'nav-activity-log',
  NAV_USER_PROFILE: 'nav-user-profile',
  NAV_ADMIN_HUB: 'nav-admin-hub',
  NAV_MARKETPLACE: 'nav-marketplace',

  // Notifications Page
  NOTIFICATIONS_PAGE: 'notifications-page',
  NOTIFICATIONS_TOOLBAR: 'notifications-toolbar',
  NOTIFICATIONS_LIST: 'notifications-list',
  NOTIFICATIONS_EMPTY: 'notifications-empty',
  NOTIFICATIONS_MARK_ALL_READ: 'notifications-mark-all-read',

  // Profile Page
  PROFILE_PAGE: 'profile-page',
  PROFILE_FORM: 'profile-form',
  PROFILE_SAVE: 'profile-save',

  // Activity Log Page
  ACTIVITY_LOG_PAGE: 'activity-log-page',
  ACTIVITY_LOG_FILTERS: 'activity-log-filters',
  ACTIVITY_LOG_GRID: 'activity-log-grid',

  // Error Pages
  ERROR_GO_HOME: 'error-go-home',
  ERROR_401_GO_HOME: 'error-401-go-home',
  ERROR_403_GO_HOME: 'error-403-go-home',
  ERROR_404_GO_HOME: 'error-404-go-home',
  ERROR_500_GO_HOME: 'error-500-go-home',

  // Customers Page
  CUSTOMERS_PAGE: 'customers-page',
  CUSTOMERS_TABLE: 'customers-table',
  CUSTOMERS_ADD_BTN: 'customers-add-btn',
  CUSTOMERS_DIALOG: 'customers-dialog',

  // Invoices Page
  INVOICES_PAGE: 'invoices-page',
  INVOICES_TABLE: 'invoices-table',
  INVOICES_ADD_BTN: 'invoices-add-btn',
  INVOICES_DIALOG: 'invoices-dialog',

  // Inventory Page
  INVENTORY_PAGE: 'inventory-page',
  INVENTORY_TABLE: 'inventory-table',
  INVENTORY_ADD_BTN: 'inventory-add-btn',
  INVENTORY_DIALOG: 'inventory-dialog',

  // Settings Page
  SETTINGS_PAGE: 'settings-page',
  SETTINGS_TAB_ACCOUNT: 'settings-tab-account',
  SETTINGS_TAB_APPEARANCE: 'settings-tab-appearance',
  SETTINGS_TAB_NOTIFICATIONS: 'settings-tab-notifications',
  SETTINGS_SAVE_ACCOUNT: 'settings-save-account',
  SETTINGS_SAVE_APPEARANCE: 'settings-save-appearance',
  SETTINGS_SAVE_NOTIFICATIONS: 'settings-save-notifications',

  // Business Nav
  NAV_BUSINESS: 'nav-business',
  NAV_BUSINESS_EXPAND: 'nav-business-expand',
  NAV_CUSTOMERS: 'nav-customers',
  NAV_INVOICES: 'nav-invoices',
  NAV_INVENTORY: 'nav-inventory',
  NAV_SETTINGS: 'nav-settings',

  // Notifications Badge
  NAV_NOTIFICATIONS_BADGE: 'nav-notifications-badge',

  // Alert Management
  ALERT_TOOLBAR: 'alert-toolbar',
  ALERT_TOOLBAR_SEARCH: 'alert-toolbar-search',
  ALERT_TOOLBAR_FILTER: 'alert-toolbar-filter',
  ALERT_TOOLBAR_REFRESH: 'alert-toolbar-refresh',
  ALERT_TOOLBAR_EXPORT: 'alert-toolbar-export',
  ALERT_TOOLBAR_SETTINGS: 'alert-toolbar-settings',
  GRID_SHOWCASE_ALERT_MANAGEMENT: 'grid-showcase-alert-management',

  // Forms Section
  NAV_FORMS: 'nav-forms',
  NAV_FORMS_EXPAND: 'nav-forms-expand',
  NAV_FORMS_SYNCFUSION: 'nav-forms-syncfusion',
  NAV_FORMS_NATIVE: 'nav-forms-native',
  FORMS_SHOWCASE_PAGE: 'forms-showcase-page',
  NATIVE_FORMS_PAGE: 'native-forms-page',

  // Cards
  CARDS_NATIVE_SECTION: 'cards-native-section',
  CARDS_SYNCFUSION_SECTION: 'cards-syncfusion-section',
  CARDS_NATIVE_PAGE_SECTION: 'cards-native-page-section',

  // Notifications showcase
  TOAST_SUCCESS_BTN: 'toast-success-btn',
  TOAST_WARNING_BTN: 'toast-warning-btn',
  TOAST_ERROR_BTN: 'toast-error-btn',
  TOAST_INFO_BTN: 'toast-info-btn',
  MESSAGE_SUCCESS: 'message-success',
  MESSAGE_WARNING: 'message-warning',
  MESSAGE_ERROR: 'message-error',
  MESSAGE_INFO: 'message-info',
  MESSAGE_NORMAL: 'message-normal',
  NOTIFICATIONS_SECTION: 'notifications-section',
  NATIVE_NOTIFICATIONS_SECTION: 'native-notifications-section',

  // Alerts (Syncfusion)
  ALERT_SUCCESS: 'alert-success',
  ALERT_WARNING: 'alert-warning',
  ALERT_ERROR: 'alert-error',
  ALERT_INFO: 'alert-info',
  ALERT_DISMISSIBLE: 'alert-dismissible',

  // Alerts (Native)
  NATIVE_ALERT_SUCCESS: 'native-alert-success',
  NATIVE_ALERT_WARNING: 'native-alert-warning',
  NATIVE_ALERT_ERROR: 'native-alert-error',
  NATIVE_ALERT_INFO: 'native-alert-info',
  NATIVE_ALERT_DISMISSIBLE: 'native-alert-dismissible',
  NATIVE_ALERT_NO_ICON: 'native-alert-no-icon',

  // Toggle
  TOGGLE_NATIVE: 'toggle-native',
  NATIVE_TOGGLE_BASIC_ON: 'native-toggle-basic-on',
  NATIVE_TOGGLE_BASIC_OFF: 'native-toggle-basic-off',
  NATIVE_TOGGLE_LABELED: 'native-toggle-labeled',
  NATIVE_TOGGLE_DISABLED_ON: 'native-toggle-disabled-on',
  NATIVE_TOGGLE_DISABLED_OFF: 'native-toggle-disabled-off',
  NATIVE_TOGGLE_INTERACTIVE: 'native-toggle-interactive',
  NATIVE_TOGGLE_STATE_LABEL: 'native-toggle-state-label',
  NATIVE_TOGGLE_NOTIFICATIONS: 'native-toggle-notifications',
  NATIVE_TOGGLE_DARK_MODE: 'native-toggle-dark-mode',
  NATIVE_TOGGLE_AUTO_SAVE: 'native-toggle-auto-save',

  // Native Grid Showcase sections
  NATIVE_GRID_BASIC: 'native-grid-basic',
  NATIVE_GRID_PAGINATION: 'native-grid-pagination',
  NATIVE_GRID_GROUPING: 'native-grid-grouping',
  NATIVE_GRID_AGGREGATES: 'native-grid-aggregates',
  NATIVE_GRID_EDIT_INLINE: 'native-grid-edit-inline',
  NATIVE_GRID_EDIT_DIALOG: 'native-grid-edit-dialog',
  NATIVE_GRID_EDIT_BATCH: 'native-grid-edit-batch',
  NATIVE_GRID_EDIT_TABS: 'native-grid-edit-tabs',
  NATIVE_GRID_SELECT_SINGLE: 'native-grid-select-single',
  NATIVE_GRID_SELECT_MULTI: 'native-grid-select-multi',
  NATIVE_GRID_SELECT_CHECKBOX: 'native-grid-select-checkbox',
  NATIVE_GRID_SELECT_TABS: 'native-grid-select-tabs',
  NATIVE_GRID_SELECTED_COUNT: 'native-grid-selected-count',
  NATIVE_GRID_ALERT_MANAGEMENT: 'native-grid-alert-management',

  // Product Search Section
  PRODUCT_SEARCH_SECTION: 'product-search-section',
  PRODUCT_SEARCH_GRID: 'product-search-grid',

  // Calendar Page
  NAV_CALENDAR: 'nav-calendar',
  CALENDAR_PAGE: 'calendar-page',

  // Kanban Page
  NAV_KANBAN: 'nav-kanban',
  KANBAN_PAGE: 'kanban-page',
  KANBAN_BOARD: 'kanban-board',
  KANBAN_SEARCH: 'kanban-search',
  KANBAN_ADD_BTN: 'kanban-add-btn',
  KANBAN_DIALOG: 'kanban-dialog',
  KANBAN_SAVE_BTN: 'kanban-save-btn',

  // Chat Page
  NAV_CHAT: 'nav-chat',
  CHAT_PAGE: 'chat-page',
  CHAT_CHANNEL_LIST: 'chat-channel-list',
  CHAT_CHANNEL_ITEM: 'chat-channel-item',
  CHAT_CHANNEL_HEADER: 'chat-channel-header',
  CHAT_MESSAGE_LIST: 'chat-message-list',
  CHAT_MESSAGE_INPUT: 'chat-message-input',
  CHAT_SEND_BTN: 'chat-send-btn',
  CHAT_MESSAGE_BUBBLE: 'chat-message-bubble',

  // Admin System Settings
  ADMIN_SETTINGS_PAGE: 'admin-settings-page',
  ADMIN_SETTINGS_TABS: 'admin-settings-tabs',
  ADMIN_SETTINGS_TAB_GENERAL_BTN: 'admin-settings-tab-general-btn',
  ADMIN_SETTINGS_TAB_SECURITY_BTN: 'admin-settings-tab-security-btn',
  ADMIN_SETTINGS_TAB_EMAIL_BTN: 'admin-settings-tab-email-btn',
  ADMIN_SETTINGS_TAB_NOTIFICATIONS_BTN: 'admin-settings-tab-notifications-btn',
  ADMIN_SETTINGS_TAB_MAINTENANCE_BTN: 'admin-settings-tab-maintenance-btn',

  // Org Switcher
  ORG_SWITCHER: 'org-switcher',
  ORG_SWITCHER_MENU: 'org-switcher-menu',
  ORG_SWITCHER_ITEM: 'org-switcher-item',

  // PWA
  PWA_UPDATE_PROMPT: 'pwa-update-prompt',
  PWA_UPDATE_BUTTON: 'pwa-update-button',
  PWA_DISMISS_BUTTON: 'pwa-dismiss-button',
  PWA_INSTALL_PROMPT: 'pwa-install-prompt',
  PWA_INSTALL_BUTTON: 'pwa-install-button',
  PWA_INSTALL_DISMISS: 'pwa-install-dismiss',
  OFFLINE_INDICATOR: 'offline-indicator',

  // Orders Page
  ORDERS_PAGE: 'orders-page',
  ORDERS_TABLE: 'orders-table',
  ORDERS_ADD_BTN: 'orders-add-btn',
  ORDERS_DIALOG: 'orders-dialog',

  // Admin User Management Page
  ADMIN_USERS_PAGE: 'admin-users-page',
  ADMIN_USERS_TABLE: 'admin-users-table',
  ADMIN_USERS_ADD_BTN: 'admin-users-add-btn',
  ADMIN_USERS_SEARCH: 'admin-users-search',
  ADMIN_USERS_DIALOG: 'admin-users-dialog',

  // Admin Role Management Page
  ROLE_MANAGEMENT_PAGE: 'role-management-page',
  ROLE_MANAGEMENT_TABLE: 'role-management-table',
  ROLE_MANAGEMENT_CREATE_BTN: 'role-management-create-btn',
  PERMISSIONS_MATRIX_CONTAINER: 'permissions-matrix-container',

  // Landing Page
  LANDING_PAGE: 'landing-page',
  LANDING_HERO: 'landing-hero',
  LANDING_GET_STARTED: 'landing-get-started',
  LANDING_VIEW_DEMO: 'landing-view-demo',
  LANDING_STATS: 'landing-stats',
  LANDING_FEATURES: 'landing-features',
  LANDING_TESTIMONIALS: 'landing-testimonials',
  LANDING_CTA: 'landing-cta',
  LANDING_CTA_BUTTON: 'landing-cta-button',
  LANDING_FOOTER: 'landing-footer',
  LANDING_FOOTER_PRICING: 'landing-footer-pricing',
  LANDING_FOOTER_LOGIN: 'landing-footer-login',

  // Login Demo Credentials
  LOGIN_DEMO_CREDENTIALS: 'login-demo-credentials',

  // Sidebar Admin Nav
  NAV_ADMIN_MANAGEMENT_EXPAND: 'nav-admin-management-expand',
  NAV_ADMIN_USER_MGMT: 'nav-admin-user-mgmt',
  NAV_ADMIN_ROLE_MGMT: 'nav-admin-role-mgmt',
  NAV_ADMIN_CONFIG_EXPAND: 'nav-admin-config-expand',

  // Business Nav
  NAV_ORDERS: 'nav-orders',


  // Diagram Page
  DIAGRAM_PAGE: 'diagram-page',

  // Admin Integrations Page
  ADMIN_INTEGRATIONS_PAGE: 'admin-integrations-page',

  // Admin Plugins Page
  ADMIN_PLUGINS_PAGE: 'admin-plugins-page',

  // Grid Playground
  SYNCFUSION_GRID_PLAYGROUND: 'syncfusion-grid-playground',
} as const;

export type TestId = (typeof TestIds)[keyof typeof TestIds];
