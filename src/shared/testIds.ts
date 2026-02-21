/**
 * Test IDs for E2E testing.
 * MUST be kept in sync with e2e/shared/testIds.ts
 */

import { ComponentTestIds } from './testIds.components';
import { NativeTestIds } from './testIds.native';

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

  // Alert Management
  ALERT_TOOLBAR: 'alert-toolbar',
  ALERT_TOOLBAR_SEARCH: 'alert-toolbar-search',
  ALERT_TOOLBAR_FILTER: 'alert-toolbar-filter',
  ALERT_TOOLBAR_REFRESH: 'alert-toolbar-refresh',
  ALERT_TOOLBAR_EXPORT: 'alert-toolbar-export',
  ALERT_TOOLBAR_SETTINGS: 'alert-toolbar-settings',
  GRID_SHOWCASE_ALERT_MANAGEMENT: 'grid-showcase-alert-management',

  // Sidebar Navigation (CyberWatch)
  SIDEBAR_SEARCH: 'sidebar-search',
  SIDEBAR_BACK_MAIN: 'sidebar-back-main',
  NAV_SAMPLE_MANAGER: 'nav-sample-manager',
  NAV_USER_RANK: 'nav-user-rank',
  NAV_REAL_TIME_ANALYSIS: 'nav-real-time-analysis',
  NAV_THREAT_DETECTION: 'nav-threat-detection',
  NAV_THREAT_DETECTION_EXPAND: 'nav-threat-detection-expand',
  NAV_ALERTS_INCIDENTS: 'nav-alerts-incidents',
  NAV_ALERTS_EXPAND: 'nav-alerts-expand',
  NAV_ATTACK_SURFACE: 'nav-attack-surface',
  NAV_ATTACK_SURFACE_EXPAND: 'nav-attack-surface-expand',
  NAV_THREAT_INTEL: 'nav-threat-intel',
  NAV_THREAT_INTEL_EXPAND: 'nav-threat-intel-expand',
  NAV_PERFORMANCE: 'nav-performance',
  NAV_PERFORMANCE_EXPAND: 'nav-performance-expand',
  NAV_COMPLIANCE: 'nav-compliance',
  NAV_COMPLIANCE_EXPAND: 'nav-compliance-expand',
  NAV_ANALYTICS: 'nav-analytics',
  NAV_SOAR: 'nav-soar',
  NAV_ADMIN_HUB: 'nav-admin-hub',
  NAV_MARKETPLACE: 'nav-marketplace',
  NAV_ADMIN_MANAGEMENT: 'nav-admin-management',
  NAV_ADMIN_MANAGEMENT_EXPAND: 'nav-admin-management-expand',
  NAV_ADMIN_USER_MGMT: 'nav-admin-user-mgmt',
  NAV_ADMIN_ROLE_MGMT: 'nav-admin-role-mgmt',
  NAV_ADMIN_CONFIG: 'nav-admin-config',
  NAV_ADMIN_CONFIG_EXPAND: 'nav-admin-config-expand',
  NAV_ADMIN_THEME: 'nav-admin-theme',
  NAV_ADMIN_SYSTEM: 'nav-admin-system',
  NAV_ADMIN_MARKETPLACE: 'nav-admin-marketplace',
  NAV_ADMIN_MARKETPLACE_EXPAND: 'nav-admin-marketplace-expand',
  NAV_ADMIN_INTEGRATIONS: 'nav-admin-integrations',
  NAV_ADMIN_PLUGINS: 'nav-admin-plugins',
  NAV_ADMIN_RESOURCES: 'nav-admin-resources',
  NAV_ADMIN_RESOURCES_EXPAND: 'nav-admin-resources-expand',
  NAV_ADMIN_DOCS: 'nav-admin-docs',
  NAV_ADMIN_SUPPORT: 'nav-admin-support',

  // Sidebar Sub-menus
  NAV_PRODUCTS_NATIVE: 'nav-products-native',
  NAV_PRODUCTS_SYNCFUSION: 'nav-products-syncfusion',
  NAV_PRODUCTS_EXPAND: 'nav-products-expand',
  NAV_COMPONENTS_NATIVE: 'nav-components-native',
  NAV_COMPONENTS_SYNCFUSION: 'nav-components-syncfusion',
  NAV_COMPONENTS_EXPAND: 'nav-components-expand',
  NAV_COMPONENTS_SYNCFUSION_EXPAND: 'nav-components-syncfusion-expand',
  NAV_COMPONENTS_NATIVE_EXPAND: 'nav-components-native-expand',
  NAV_FORMS: 'nav-forms',
  NAV_FORMS_EXPAND: 'nav-forms-expand',
  NAV_FORMS_SYNCFUSION: 'nav-forms-syncfusion',
  NAV_FORMS_NATIVE: 'nav-forms-native',

  // Pages
  NATIVE_COMPONENTS_PAGE: 'native-components-page',
  SYNCFUSION_COMPONENTS_PAGE: 'syncfusion-components-page',
  FORMS_SHOWCASE_PAGE: 'forms-showcase-page',
  NATIVE_FORMS_PAGE: 'native-forms-page',

  // Cards
  CARDS_NATIVE_SECTION: 'cards-native-section',
  CARDS_SYNCFUSION_SECTION: 'cards-syncfusion-section',
  CARDS_NATIVE_PAGE_SECTION: 'cards-native-page-section',

  // Product Search Section
  PRODUCT_SEARCH_SECTION: 'product-search-section',
  PRODUCT_SEARCH_GRID: 'product-search-grid',

  // PWA
  PWA_UPDATE_PROMPT: 'pwa-update-prompt',
  PWA_UPDATE_BUTTON: 'pwa-update-button',
  PWA_DISMISS_BUTTON: 'pwa-dismiss-button',
  PWA_INSTALL_PROMPT: 'pwa-install-prompt',
  PWA_INSTALL_BUTTON: 'pwa-install-button',
  PWA_INSTALL_DISMISS: 'pwa-install-dismiss',
  OFFLINE_INDICATOR: 'offline-indicator',

  // Spread component & native IDs from separate files
  ...ComponentTestIds,
  ...NativeTestIds,
} as const;

export type TestId = (typeof TestIds)[keyof typeof TestIds];
