import { test, expect, type Page, type ConsoleMessage } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

class ConsoleErrorCollector {
  readonly errors: string[] = [];

  attach(page: Page): void {
    page.on('console', (msg: ConsoleMessage) => {
      if (msg.type() === 'error')
        this.errors.push(msg.text());
    });

    page.on('pageerror', (err: Error) => {
      this.errors.push(`[PAGE ERROR] ${err.message}`);
    });
  }

  relevantErrors(): string[] {
    return this.errors.filter((e) => {
      if (e.includes('favicon')) return false;
      if (e.includes('[vite]') || e.includes('[hmr]')) return false;
      if (e.includes('Failed to load resource') && e.includes('/mockapi/')) return false;
      if (e.includes('ERR_CONNECTION_REFUSED')) return false;
      if (e.includes('net::ERR_FAILED')) return false;
      return true;
    });
  }
}

test.describe('Kanban Board Page', () => {
  test.describe.configure({ timeout: 120000 });
  let collector: ConsoleErrorCollector;

  test.beforeEach(async ({ page }) => {
    collector = new ConsoleErrorCollector();
    collector.attach(page);
    await injectAuth(page);
    collector.errors.length = 0;
    await page.goto('/kanban', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.KANBAN_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should render the Syncfusion Kanban component', async ({ page }) => {
    const kanban = page.locator('.e-kanban');
    await expect(kanban).toBeVisible({ timeout: 15000 });
  });

  test('should display the kanban board wrapper with test ID', async ({ page }) => {
    await expect(page.getByTestId(TestIds.KANBAN_BOARD)).toBeVisible({ timeout: 15000 });
  });

  test('should display all four kanban columns', async ({ page }) => {
    const kanban = page.locator('.e-kanban');
    await expect(kanban).toBeVisible({ timeout: 15000 });

    const headers = kanban.locator('.e-header-cells');
    await expect(headers).toHaveCount(4, { timeout: 10000 });
  });

  test('should render task cards within the board', async ({ page }) => {
    const kanban = page.locator('.e-kanban');
    await expect(kanban).toBeVisible({ timeout: 15000 });

    const cards = kanban.locator('.e-card');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display search input in the toolbar', async ({ page }) => {
    await expect(page.getByTestId(TestIds.KANBAN_SEARCH)).toBeVisible();
  });

  test('should display add task button in the toolbar', async ({ page }) => {
    await expect(page.getByTestId(TestIds.KANBAN_ADD_BTN)).toBeVisible();
  });

  test('should render cards distributed across columns', async ({ page }) => {
    const kanban = page.locator('.e-kanban');
    await expect(kanban).toBeVisible({ timeout: 15000 });

    // Wait for cards to render
    const firstCard = kanban.locator('.e-card').first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });

    // Verify cards exist in the board content area
    const totalCards = await kanban.locator('.e-card').count();
    expect(totalCards).toBeGreaterThan(0);

    // Verify column content cells exist for all 4 columns
    const columns = kanban.locator('.e-content-cells');
    await expect(columns).toHaveCount(4, { timeout: 10000 });
  });

  test('should have no console errors', async () => {
    const errors = collector.relevantErrors();
    expect(errors, `Console errors on /kanban:\n${errors.join('\n')}`).toHaveLength(0);
  });
});
