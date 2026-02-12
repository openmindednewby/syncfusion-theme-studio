/**
 * Test IDs for E2E testing.
 * MUST be kept in sync with e2e/shared/testIds.ts
 */
export const TestIds = {
  // Navigation
  NAV_HOME: 'nav-home',
  NAV_PRODUCTS: 'nav-products',
  NAV_COMPONENTS: 'nav-components',
  NAV_THEME_EDITOR: 'nav-theme-editor',
  NAV_LOGIN: 'nav-login',
  SIDEBAR: 'sidebar',
  SIDEBAR_TOGGLE: 'sidebar-toggle',
  THEME_TOGGLE: 'theme-toggle',
  THEME_SETTINGS_BUTTON: 'theme-settings-button',

  // Dashboard
  DASHBOARD_HEADING: 'dashboard-heading',
  STAT_TOTAL_USERS: 'stat-total-users',
  STAT_ACTIVE_SESSIONS: 'stat-active-sessions',
  STAT_REVENUE: 'stat-revenue',
  STAT_GROWTH: 'stat-growth',
  CHART_REVENUE: 'chart-revenue',
  CHART_USERS: 'chart-users',
  BTN_EXPLORE_COMPONENTS: 'btn-explore-components',
  BTN_THEME_EDITOR: 'btn-theme-editor',

  // Login
  LOGIN_USERNAME: 'login-username',
  LOGIN_PASSWORD: 'login-password',
  LOGIN_SUBMIT: 'login-submit',
  LOGIN_ERROR: 'login-error',

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

  // PWA
  PWA_UPDATE_PROMPT: 'pwa-update-prompt',
  PWA_UPDATE_BUTTON: 'pwa-update-button',
  PWA_DISMISS_BUTTON: 'pwa-dismiss-button',
  PWA_INSTALL_PROMPT: 'pwa-install-prompt',
  PWA_INSTALL_BUTTON: 'pwa-install-button',
  PWA_INSTALL_DISMISS: 'pwa-install-dismiss',
  OFFLINE_INDICATOR: 'offline-indicator',
} as const;

export type TestId = (typeof TestIds)[keyof typeof TestIds];
