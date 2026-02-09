import { expect, type Locator, type Page } from '@playwright/test';

import { TestIds } from '../shared/testIds';

import { BasePage } from './BasePage';

type TabId = 'colors' | 'typography' | 'layout' | 'lightTheme' | 'darkTheme' | 'components' | 'presets';

const TAB_TEST_IDS: Record<TabId, string> = {
  colors: TestIds.THEME_TAB_COLORS,
  typography: TestIds.THEME_TAB_TYPOGRAPHY,
  layout: TestIds.THEME_TAB_LAYOUT,
  lightTheme: TestIds.THEME_TAB_LIGHT,
  darkTheme: TestIds.THEME_TAB_DARK,
  components: TestIds.THEME_TAB_COMPONENTS,
  presets: TestIds.THEME_TAB_PRESETS,
};

export class ThemeSettingsPage extends BasePage {
  readonly drawer: Locator;
  readonly closeButton: Locator;
  readonly exportButton: Locator;
  readonly resetButton: Locator;
  readonly importToggleButton: Locator;
  readonly importTextarea: Locator;
  readonly importButton: Locator;
  readonly importError: Locator;

  constructor(page: Page) {
    super(page);
    this.drawer = page.getByTestId(TestIds.THEME_SETTINGS_DRAWER);
    this.closeButton = page.getByTestId(TestIds.THEME_CLOSE_BTN);
    this.exportButton = page.getByTestId(TestIds.THEME_EXPORT_BTN);
    this.resetButton = page.getByTestId(TestIds.THEME_RESET_BTN);
    this.importToggleButton = page.getByTestId(TestIds.THEME_IMPORT_TOGGLE_BTN);
    this.importTextarea = page.getByTestId(TestIds.THEME_IMPORT_TEXTAREA);
    this.importButton = page.getByTestId(TestIds.THEME_IMPORT_BTN);
    this.importError = page.getByTestId(TestIds.THEME_IMPORT_ERROR);
  }

  async goto(): Promise<void> {
    // Navigate to login page
    await super.goto('/');

    // Submit login form (credentials are pre-filled)
    await this.page.getByTestId(TestIds.LOGIN_SUBMIT).click();

    // Wait for dashboard to load
    await this.page.waitForURL('/dashboard');
  }

  /**
   * Open the theme settings drawer (expand it).
   * The drawer is always present but can be collapsed.
   */
  async openDrawer(): Promise<void> {
    const toggleBtn = this.page.getByTestId(TestIds.THEME_CLOSE_BTN);
    const isExpanded = await toggleBtn.getAttribute('aria-expanded');
    if (isExpanded !== 'true') {
      await toggleBtn.click();
      await this.page.waitForTimeout(350); // Wait for animation
    }
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
  }

  /**
   * Collapse the theme settings drawer.
   */
  async closeDrawer(): Promise<void> {
    const toggleBtn = this.page.getByTestId(TestIds.THEME_CLOSE_BTN);
    const isExpanded = await toggleBtn.getAttribute('aria-expanded');
    if (isExpanded === 'true') {
      await toggleBtn.click();
      await this.page.waitForTimeout(350); // Wait for animation
    }
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  }

  /**
   * Note: The drawer doesn't have a backdrop - it's a side panel.
   * This just closes the drawer for compatibility.
   */
  async closeDrawerByBackdrop(): Promise<void> {
    await this.closeDrawer();
  }

  /**
   * Note: Escape key doesn't close this panel style drawer.
   * This just closes the drawer for compatibility.
   */
  async closeDrawerByEscape(): Promise<void> {
    await this.closeDrawer();
  }

  async expectDrawerVisible(): Promise<void> {
    const toggleBtn = this.page.getByTestId(TestIds.THEME_CLOSE_BTN);
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
  }

  async expectDrawerHidden(): Promise<void> {
    const toggleBtn = this.page.getByTestId(TestIds.THEME_CLOSE_BTN);
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  }

  async selectTab(tabId: TabId): Promise<void> {
    const testId = TAB_TEST_IDS[tabId];
    await this.page.getByTestId(testId).click();
  }

  async expectTabActive(tabId: TabId): Promise<void> {
    const testId = TAB_TEST_IDS[tabId];
    await expect(this.page.getByTestId(testId)).toHaveAttribute('aria-current', 'page');
  }

  async expectTabInactive(tabId: TabId): Promise<void> {
    const testId = TAB_TEST_IDS[tabId];
    await expect(this.page.getByTestId(testId)).not.toHaveAttribute('aria-current', 'page');
  }

  async applyPreset(presetId: string): Promise<void> {
    const presetCard = this.page.getByTestId(TestIds.THEME_PRESET_CARD).filter({
      has: this.page.locator(`[data-preset-id="${presetId}"]`),
    });
    // Use the data-preset-id attribute to find the specific preset
    await this.page.locator(`[data-preset-id="${presetId}"]`).click();
  }

  async expectPresetActive(presetId: string): Promise<void> {
    const presetCard = this.page.locator(`[data-preset-id="${presetId}"]`);
    await expect(presetCard).toHaveAttribute('aria-pressed', 'true');
  }

  async expectPresetInactive(presetId: string): Promise<void> {
    const presetCard = this.page.locator(`[data-preset-id="${presetId}"]`);
    await expect(presetCard).toHaveAttribute('aria-pressed', 'false');
  }

  async toggleDarkMode(): Promise<void> {
    await this.page.getByTestId(TestIds.THEME_TOGGLE).click();
  }

  async expectDarkMode(): Promise<void> {
    await expect(this.page.locator('html')).toHaveClass(/dark/);
  }

  async expectLightMode(): Promise<void> {
    await expect(this.page.locator('html')).not.toHaveClass(/dark/);
  }

  async clickExport(): Promise<void> {
    await this.exportButton.click();
  }

  async showImportPanel(): Promise<void> {
    await this.importToggleButton.click();
    await expect(this.importTextarea).toBeVisible();
  }

  async hideImportPanel(): Promise<void> {
    await this.importToggleButton.click();
    await expect(this.importTextarea).not.toBeVisible();
  }

  async importTheme(json: string): Promise<void> {
    await this.importTextarea.fill(json);
    await this.importButton.click();
  }

  async expectImportError(): Promise<void> {
    await expect(this.importError).toBeVisible();
  }

  async expectImportPanelHidden(): Promise<void> {
    await expect(this.importTextarea).not.toBeVisible();
  }

  async resetTheme(): Promise<void> {
    await this.resetButton.click();
  }

  async getCssVariableValue(variableName: string): Promise<string> {
    return await this.page.evaluate((name) => {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }, variableName);
  }
}
