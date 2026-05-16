/**
 * Test IDs for E2E testing.
 * MUST be kept in sync with e2e/shared/testIds.ts
 */

import { BusinessTestIds } from './testIds.business';
import { ComponentTestIds } from './testIds.components';
import { FeatureTestIds } from './testIds.features';
import { LandingTestIds } from './testIds.landing';
import { NativeTestIds } from './testIds.native';
import { OrgTestIds } from './testIds.org';
import { SidebarTestIds } from './testIds.sidebar';

export const TestIds = {
  // Navigation
  NAV_HOME: 'nav-home',
  NAV_DASHBOARD_EXPAND: 'nav-dashboard-expand',
  NAV_DASHBOARD_OVERVIEW: 'nav-dashboard-overview',
  NAV_DASHBOARD_METRICS: 'nav-dashboard-metrics',
  NAV_DASHBOARD_KPIS: 'nav-dashboard-kpis',
  NAV_PRODUCTS: 'nav-products',
  NAV_COMPONENTS: 'nav-components',
  NAV_THEME_EDITOR: 'nav-theme-editor',
  NAV_LOGIN: 'nav-login',
  SIDEBAR: 'sidebar',
  SIDEBAR_TOGGLE: 'sidebar-toggle',
  SIDEBAR_BACKDROP: 'sidebar-backdrop',
  MOBILE_MENU_BUTTON: 'mobile-menu-button',
  THEME_TOGGLE: 'theme-toggle',
  THEME_SETTINGS_BUTTON: 'theme-settings-button',
  LANGUAGE_SWITCHER: 'language-switcher',
  LANGUAGE_OPTION: 'language-option',

  // Header Auth
  HEADER_USER_MENU: 'header-user-menu',
  HEADER_LOGOUT: 'header-logout',

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
  LOGIN_FORGOT_PASSWORD: 'login-forgot-password',
  LOGIN_ANIMATE_GRADIENT: 'login-animate-gradient',
  LOGIN_DEMO_CREDENTIALS: 'login-demo-credentials',

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
  ALERT_TOOLBAR_DATE_RANGE: 'alert-toolbar-date-range',
  ALERT_TOOLBAR_EXPORT: 'alert-toolbar-export',
  ALERT_TOOLBAR_SETTINGS: 'alert-toolbar-settings',
  GRID_SHOWCASE_ALERT_MANAGEMENT: 'grid-showcase-alert-management',

  // Calendar Page
  NAV_CALENDAR: 'nav-calendar',
  CALENDAR_PAGE: 'calendar-page',
  CALENDAR_NAV_PREV: 'calendar-nav-prev',
  CALENDAR_NAV_TODAY: 'calendar-nav-today',
  CALENDAR_NAV_NEXT: 'calendar-nav-next',
  CALENDAR_VIEW_DAY: 'calendar-view-day',
  CALENDAR_VIEW_WEEK: 'calendar-view-week',
  CALENDAR_VIEW_MONTH: 'calendar-view-month',

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

  // Maps Page
  NAV_MAPS: 'nav-maps',
  MAPS_PAGE: 'maps-page',
  MAPS_VIEW: 'maps-view',
  MAPS_TOOLBAR: 'maps-toolbar',
  MAPS_BUBBLE_TOGGLE: 'maps-bubble-toggle',
  MAPS_LOCATION_LIST: 'maps-location-list',
  MAPS_LOCATION_ITEM: 'maps-location-item',
  MAPS_LOCATION_PANEL: 'maps-location-panel',
  MAPS_PANEL_CLOSE: 'maps-panel-close',

  // Pricing Page
  PRICING_FAQ: 'pricing-faq',
  PRICING_FAQ_ACCORDION: 'pricing-faq-accordion',

  // Not Implemented Page
  NOT_IMPLEMENTED_PAGE: 'not-implemented-page',
  NOT_IMPLEMENTED_DASHBOARD_LINK: 'not-implemented-dashboard-link',

  // Notifications Page
  NOTIFICATIONS_PAGE: 'notifications-page',
  NOTIFICATIONS_TOOLBAR: 'notifications-toolbar',
  NOTIFICATIONS_LIST: 'notifications-list',
  NOTIFICATIONS_EMPTY: 'notifications-empty',
  NOTIFICATIONS_MARK_ALL_READ: 'notifications-mark-all-read',
  NOTIFICATIONS_MARK_READ: 'notification-mark-read',

  // Profile Page
  PROFILE_PAGE: 'profile-page',
  PROFILE_FORM: 'profile-form',
  PROFILE_SAVE: 'profile-save',
  PROFILE_DISCARD: 'profile-discard',
  PROFILE_AVATAR_OVERLAY: 'profile-avatar-overlay',

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

  // Notifications Badge
  NAV_NOTIFICATIONS_BADGE: 'nav-notifications-badge',

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

  // Native Forms - Product Search
  NATIVE_PRODUCT_SEARCH_SECTION: 'native-product-search-section',
  NATIVE_PRODUCT_SEARCH_TABLE: 'native-product-search-table',

  // Native Forms - All Components Section
  ALL_COMPONENTS_SECTION: 'all-components-section',

  // Spread IDs from separate files
  ...BusinessTestIds,
  ...ComponentTestIds,
  ...FeatureTestIds,
  ...LandingTestIds,
  ...NativeTestIds,
  ...OrgTestIds,
  ...SidebarTestIds,
} as const;

export type TestId = (typeof TestIds)[keyof typeof TestIds];
