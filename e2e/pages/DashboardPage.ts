import { type Page, expect } from '@playwright/test';

import { BasePage } from './BasePage';
import { TestIds } from '../shared/testIds';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await super.goto('/');
  }

  async expectDashboardVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  }

  async toggleTheme(): Promise<void> {
    await this.clickByTestId(TestIds.THEME_TOGGLE);
  }

  async toggleSidebar(): Promise<void> {
    await this.clickByTestId(TestIds.SIDEBAR_TOGGLE);
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

  async navigateToPets(): Promise<void> {
    await this.clickByTestId(TestIds.NAV_PETS);
  }

  async navigateToComponents(): Promise<void> {
    await this.clickByTestId(TestIds.NAV_COMPONENTS);
  }

  async navigateToThemeEditor(): Promise<void> {
    await this.clickByTestId(TestIds.NAV_THEME_EDITOR);
  }
}
