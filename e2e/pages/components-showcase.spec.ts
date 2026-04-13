import { test, expect } from '@playwright/test';

import { injectAuth } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Run with: npx playwright test e2e/pages/components-showcase.spec.ts
test.describe('Components Showcase Page', () => {
  test.setTimeout(180000);

  test.beforeEach(async ({ page }) => {
    await injectAuth(page);
    await page.goto('/components/syncfusion', { waitUntil: 'domcontentloaded' });
    // Wait for Syncfusion Splitter to render content pane
    await expect(page.getByTestId(TestIds.SHOWCASE_GRID)).toBeVisible({ timeout: 30000 });
  });

  test('should display components page title', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 2 }).first()).toContainText('Component');
  });

  test('should display showcase grid container', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SHOWCASE_GRID)).toBeVisible();
  });

  test('should display Colors section', async ({ page }) => {
    const grid = page.getByTestId(TestIds.SHOWCASE_GRID);
    await expect(grid.getByRole('heading', { name: 'Primary Colors' })).toBeVisible();
  });

  test('should display Buttons section with variants', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Syncfusion Buttons' })).toBeVisible();

    // Check for button variants
    await expect(page.getByTestId(TestIds.BTN_PRIMARY)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_SECONDARY)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_OUTLINE)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_GHOST)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_DANGER)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_DISABLED)).toBeVisible();
  });

  test('should display Inputs section with variants', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Syncfusion Inputs' })).toBeVisible();

    // Check for input variants
    await expect(page.getByTestId(TestIds.INPUT_NAME)).toBeVisible();
    await expect(page.getByTestId(TestIds.INPUT_EMAIL)).toBeVisible();
    await expect(page.getByTestId(TestIds.INPUT_DISABLED)).toBeVisible();
    await expect(page.getByTestId(TestIds.INPUT_ERROR)).toBeVisible();
  });

  test('should display Selection Controls section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Selection Controls' })).toBeVisible();

    // Check for select elements
    await expect(page.getByTestId(TestIds.SELECT_BASIC)).toBeVisible();
    await expect(page.getByTestId(TestIds.SELECT_ERROR)).toBeVisible();
  });

  test('should display Advanced Inputs section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Advanced Inputs' })).toBeVisible();
  });

  test('should display Advanced Dropdowns section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Advanced Dropdowns' })).toBeVisible();
  });

  test('should lazy-load and display Calendars section', async ({ page }) => {
    // Scroll down to trigger lazy loading - section heading is "Date & Time Pickers"
    const calendarsHeading = page.getByRole('heading', { name: /Date|Calendar|Time/i }).first();
    await expect(calendarsHeading).toBeVisible({ timeout: 15000 });
  });

  test('should lazy-load and display Navigation section', async ({ page }) => {
    const navHeading = page.getByRole('heading', { name: 'Navigation Components' }).first();
    await navHeading.waitFor({ state: 'attached', timeout: 15000 });
    await navHeading.scrollIntoViewIfNeeded();
    await expect(navHeading).toBeVisible();
  });

  test('should lazy-load and display Popups & Dialogs section', async ({ page }) => {
    // Use retry-safe pattern: element may detach during lazy-load re-renders
    await expect(async () => {
      const popupsHeading = page.getByRole('heading', { name: 'Popups & Dialogs' }).first();
      await popupsHeading.scrollIntoViewIfNeeded();
      await expect(popupsHeading).toBeVisible();
    }).toPass({ timeout: 30000 });
  });

  test('should lazy-load and display Data Grid section', async ({ page }) => {
    const dataGridHeading = page.getByRole('heading', { name: 'Syncfusion DataGrid' }).first();
    await dataGridHeading.waitFor({ state: 'attached', timeout: 15000 });
    await dataGridHeading.scrollIntoViewIfNeeded();
    await expect(dataGridHeading).toBeVisible({ timeout: 30000 });
  });

  test('should display Cards section', async ({ page }) => {
    const cardsHeading = page.getByRole('heading', { name: 'Cards' }).first();
    await cardsHeading.waitFor({ state: 'attached', timeout: 15000 });
    await cardsHeading.scrollIntoViewIfNeeded();
    await expect(cardsHeading).toBeVisible();
  });

  test('should have functional primary button', async ({ page }) => {
    const primaryBtn = page.getByTestId(TestIds.BTN_PRIMARY);
    await expect(primaryBtn).toBeEnabled();

    // Should be clickable
    await primaryBtn.click();
  });

  test('should have disabled button that cannot be clicked', async ({ page }) => {
    const disabledBtn = page.getByTestId(TestIds.BTN_DISABLED);
    await expect(disabledBtn).toBeDisabled();
  });

  test('should have functional text inputs', async ({ page }) => {
    const nameWrapper = page.getByTestId(TestIds.INPUT_NAME);
    const nameInput = nameWrapper.locator('input').first();
    await nameInput.clear();
    await nameInput.fill('Test Name');
    await expect(nameInput).toHaveValue('Test Name');
  });

  test('should have disabled input that cannot be edited', async ({ page }) => {
    const disabledWrapper = page.getByTestId(TestIds.INPUT_DISABLED);
    const disabledInput = disabledWrapper.locator('input').first();
    await expect(disabledInput).toBeDisabled();
  });

  test('should display error state on error input', async ({ page }) => {
    const errorWrapper = page.getByTestId(TestIds.INPUT_ERROR);
    await expect(errorWrapper).toBeVisible();

    // The testId is on the wrapper div; check for error classes on inner elements
    const hasErrorStyling = await errorWrapper.evaluate((el) =>
      el.querySelector('.e-error') !== null ||
      el.querySelector('.sf-input-error') !== null ||
      el.querySelector('[aria-invalid="true"]') !== null
    );

    // Either has error class or has visible error message nearby
    const errorMessage = page.locator('.text-error-500, .e-error, [data-error="true"]').first();
    const isErrorVisible = hasErrorStyling || await errorMessage.isVisible();
    expect(isErrorVisible).toBe(true);
  });

  test('should have functional select dropdowns', async ({ page }) => {
    const select = page.getByTestId(TestIds.SELECT_BASIC);
    await expect(select).toBeVisible();
  });

  test('should display Syncfusion components with .e-control class', async ({ page }) => {
    // Check that Syncfusion components exist (they have .e-control class)
    const syncfusionControls = page.locator('.e-control');
    await expect(syncfusionControls.first()).toBeVisible();
    expect(await syncfusionControls.count()).toBeGreaterThan(0);
  });

  test('should have Syncfusion page wrapper', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SYNCFUSION_COMPONENTS_PAGE)).toBeVisible();
  });

  test('should display DataGrid with users data', async ({ page }) => {
    // Scroll to DataGrid section
    const dataGridHeading = page.getByRole('heading', { name: 'Syncfusion DataGrid' });
    await dataGridHeading.scrollIntoViewIfNeeded();

    // Wait for DataGrid to load
    const dataGrid = page.getByTestId(TestIds.DATA_GRID_USERS);
    await expect(dataGrid).toBeVisible({ timeout: 30000 });
  });
});
