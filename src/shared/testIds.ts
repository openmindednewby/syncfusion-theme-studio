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
  LOGIN_LICENSE_KEY: 'login-license-key',
  LOGIN_SUBMIT: 'login-submit',
  LOGIN_ERROR: 'login-error',

  // Products
  PRODUCTS_GRID: 'products-grid',
  PRODUCTS_CATEGORY_FILTER: 'products-category-filter',
  PRODUCTS_ADD: 'products-add',
  BTN_RETRY: 'btn-retry',

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

  // Native Components Page
  NATIVE_COMPONENTS_PAGE: 'native-components-page',

  // Syncfusion Components Page
  SYNCFUSION_COMPONENTS_PAGE: 'syncfusion-components-page',

  // Sidebar Sub-menu
  NAV_COMPONENTS_NATIVE: 'nav-components-native',
  NAV_COMPONENTS_SYNCFUSION: 'nav-components-syncfusion',
  NAV_COMPONENTS_EXPAND: 'nav-components-expand',

  // Forms Showcase
  NAV_SHOWCASE_FORMS: 'nav-showcase-forms',
  FORMS_SHOWCASE_PAGE: 'forms-showcase-page',
} as const;

export type TestId = (typeof TestIds)[keyof typeof TestIds];
