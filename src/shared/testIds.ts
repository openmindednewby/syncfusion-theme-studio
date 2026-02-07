/**
 * Test IDs for E2E testing.
 * MUST be kept in sync with e2e/shared/testIds.ts
 */
export const TestIds = {
  // Navigation
  NAV_HOME: 'nav-home',
  NAV_PETS: 'nav-pets',
  NAV_COMPONENTS: 'nav-components',
  NAV_LOGIN: 'nav-login',
  NAV_THEME_EDITOR: 'nav-theme-editor',
  SIDEBAR: 'sidebar',
  SIDEBAR_TOGGLE: 'sidebar-toggle',
  THEME_TOGGLE: 'theme-toggle',

  // Dashboard
  DASHBOARD_HEADING: 'dashboard-heading',

  // Login
  LOGIN_USERNAME: 'login-username',
  LOGIN_PASSWORD: 'login-password',
  LOGIN_SUBMIT: 'login-submit',
  LOGIN_ERROR: 'login-error',

  // Pets
  PETS_GRID: 'pets-grid',
  PETS_STATUS_FILTER: 'pets-status-filter',
  PETS_ADD: 'pets-add',

  // Theme Editor
  THEME_EDITOR_HEADING: 'theme-editor-heading',
  THEME_EXPORT_BTN: 'theme-export-btn',
  THEME_RESET_BTN: 'theme-reset-btn',

  // Showcase
  SHOWCASE_GRID: 'showcase-grid',
} as const;

export type TestId = (typeof TestIds)[keyof typeof TestIds];
