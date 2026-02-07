import { type Page, type Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  protected async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  async expectToBeVisible(testId: string): Promise<void> {
    await expect(this.getByTestId(testId)).toBeVisible();
  }

  async expectToHaveText(testId: string, text: string): Promise<void> {
    await expect(this.getByTestId(testId)).toHaveText(text);
  }

  async clickByTestId(testId: string): Promise<void> {
    await this.getByTestId(testId).click();
  }
}
