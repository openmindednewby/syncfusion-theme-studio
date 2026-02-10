import { type Page, expect } from '@playwright/test';

import { BasePage } from './BasePage';
import { TestIds } from '../shared/testIds';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Login and go to dashboard - the login page is at `/` and dashboard at `/dashboard`
   */
  async goto(): Promise<void> {
    // Navigate to login page
    await super.goto('/');

    // Submit login form (credentials are pre-filled)
    await this.page.getByTestId(TestIds.LOGIN_SUBMIT).click();

    // Wait for dashboard to load
    await this.page.waitForURL('/dashboard');
  }

  async expectDashboardVisible(): Promise<void> {
    await expect(this.getByTestId(TestIds.DASHBOARD_HEADING)).toBeVisible();
  }

  async toggleTheme(): Promise<void> {
    await this.clickByTestId(TestIds.THEME_TOGGLE);
  }

  async toggleSidebar(): Promise<void> {
    await this.clickByTestId(TestIds.SIDEBAR_TOGGLE);
  }

  async openThemeSettings(): Promise<void> {
    await this.clickByTestId(TestIds.THEME_SETTINGS_BUTTON);
  }

  /**
   * Note: The theme drawer is always visible (collapsed or expanded).
   * This checks if it's in the expanded state.
   */
  async expectThemeDrawerExpanded(): Promise<void> {
    const toggleBtn = this.page.getByTestId(TestIds.THEME_CLOSE_BTN);
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
  }

  /**
   * Note: The theme drawer is always visible but can be collapsed.
   * This checks if it's in the collapsed state.
   */
  async expectThemeDrawerCollapsed(): Promise<void> {
    const toggleBtn = this.page.getByTestId(TestIds.THEME_CLOSE_BTN);
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  }

  async expectDarkMode(): Promise<void> {
    await expect(this.page.locator('html')).toHaveClass(/dark/);
  }

  async expectLightMode(): Promise<void> {
    await expect(this.page.locator('html')).not.toHaveClass(/dark/);
  }

  async expectSidebarCollapsed(): Promise<void> {
    const sidebar = this.getByTestId(TestIds.SIDEBAR);
    await expect(sidebar).toHaveAttribute('data-collapsed', 'true');
  }

  async expectSidebarExpanded(): Promise<void> {
    const sidebar = this.getByTestId(TestIds.SIDEBAR);
    await expect(sidebar).toHaveAttribute('data-collapsed', 'false');
  }

  async navigateToProducts(): Promise<void> {
    await this.clickByTestId(TestIds.NAV_PRODUCTS);
  }

  async navigateToComponents(): Promise<void> {
    // Components is now an expandable sub-menu - expand it first
    await this.clickByTestId(TestIds.NAV_COMPONENTS_EXPAND);
    // Click on Native components (first sub-item)
    await this.clickByTestId(TestIds.NAV_COMPONENTS_NATIVE);
  }

  async expandFormsSection(): Promise<void> {
    await this.clickByTestId(TestIds.NAV_FORMS_EXPAND);
  }

  async navigateToSyncfusionForms(): Promise<void> {
    await this.expandFormsSection();
    await this.clickByTestId(TestIds.NAV_FORMS_SYNCFUSION);
  }

  async navigateToNativeForms(): Promise<void> {
    await this.expandFormsSection();
    await this.clickByTestId(TestIds.NAV_FORMS_NATIVE);
  }

  async expectFormsExpanded(): Promise<void> {
    const expandBtn = this.page.getByTestId(TestIds.NAV_FORMS_EXPAND);
    await expect(expandBtn).toHaveAttribute('aria-expanded', 'true');
  }

  async expectFormsCollapsed(): Promise<void> {
    const expandBtn = this.page.getByTestId(TestIds.NAV_FORMS_EXPAND);
    await expect(expandBtn).toHaveAttribute('aria-expanded', 'false');
  }
}
