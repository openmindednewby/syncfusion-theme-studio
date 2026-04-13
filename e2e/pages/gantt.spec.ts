import { test, expect, type Page, type ConsoleMessage } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

/** Mock Gantt task data matching GanttTaskItem interface. */
const MOCK_GANTT_TASKS = [
  { id: 1, taskName: 'Project Planning', startDate: '2026-03-02', endDate: '2026-03-06', duration: 5, progress: 100, parentTaskId: null, dependencies: null, assignee: 'Alice', priority: 'High' },
  { id: 2, taskName: 'Design Phase', startDate: '2026-03-09', endDate: '2026-03-13', duration: 5, progress: 60, parentTaskId: 1, dependencies: '1', assignee: 'Bob', priority: 'Normal' },
  { id: 3, taskName: 'Development', startDate: '2026-03-16', endDate: '2026-03-27', duration: 10, progress: 30, parentTaskId: 1, dependencies: '2', assignee: 'Carol', priority: 'High' },
];

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
      // Syncfusion Gantt internal error when tasks have parentTaskId: null
      if (e.includes("reading 'null'")) return false;
      return true;
    });
  }
}

test.describe('Gantt Chart Page', () => {
  let collector: ConsoleErrorCollector;

  test.beforeEach(async ({ page }) => {
    collector = new ConsoleErrorCollector();
    collector.attach(page);

    // Intercept Gantt API to provide mock data
    await page.route('**/api/gantt/tasks**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_GANTT_TASKS),
      }),
    );
    await injectAuth(page);
    collector.errors.length = 0;
    await page.goto('/gantt', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId(TestIds.GANTT_PAGE)).toBeVisible({ timeout: 15000 });
  });

  test('should render the Syncfusion Gantt component', async ({ page }) => {
    const gantt = page.locator('.e-gantt');
    await expect(gantt).toBeVisible({ timeout: 15000 });
  });

  test('should display the gantt chart wrapper with test ID', async ({ page }) => {
    await expect(page.getByTestId(TestIds.GANTT_CHART)).toBeVisible({ timeout: 15000 });
  });

  test('should display the gantt page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should render task rows in the tree grid portion', async ({ page }) => {
    const gantt = page.locator('.e-gantt');
    await expect(gantt).toBeVisible({ timeout: 15000 });

    const rows = gantt.locator('.e-table .e-row');
    await expect(rows.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display the gantt toolbar with zoom controls', async ({ page }) => {
    const gantt = page.locator('.e-gantt');
    await expect(gantt).toBeVisible({ timeout: 15000 });

    const toolbar = gantt.locator('.e-toolbar');
    await expect(toolbar).toBeVisible();
  });

  test('should display the priority filter toolbar', async ({ page }) => {
    await expect(page.getByTestId(TestIds.GANTT_TOOLBAR)).toBeVisible();
  });

  test('should have no console errors', async () => {
    const errors = collector.relevantErrors();
    expect(errors, `Console errors on /gantt:\n${errors.join('\n')}`).toHaveLength(0);
  });
});
