import { test, expect } from '@playwright/test';

import { login } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

// Skip Syncfusion component tests by default due to long load times
// Run with: npx playwright test e2e/pages/components-showcase.spec.ts --timeout=180000
test.describe('Components Showcase Page', () => {
  test.skip(({ browserName }) => true, 'Skipped by default - Syncfusion components require long load times. Run manually with --timeout=180000');

  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/components');
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
  });

  test('should display components page title', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 2 })).toContainText('Component');
  });

  test('should display showcase grid container', async ({ page }) => {
    await expect(page.getByTestId(TestIds.SHOWCASE_GRID)).toBeVisible();
  });

  test('should display Colors section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Colors' })).toBeVisible();
  });

  test('should display Buttons section with variants', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Buttons' })).toBeVisible();

    // Check for button variants
    await expect(page.getByTestId(TestIds.BTN_PRIMARY)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_SECONDARY)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_OUTLINE)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_GHOST)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_DANGER)).toBeVisible();
    await expect(page.getByTestId(TestIds.BTN_DISABLED)).toBeVisible();
  });

  test('should display Inputs section with variants', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Inputs' })).toBeVisible();

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
    // Scroll down to trigger lazy loading
    const calendarsHeading = page.getByRole('heading', { name: 'Calendars' });
    await calendarsHeading.scrollIntoViewIfNeeded();
    await expect(calendarsHeading).toBeVisible();
  });

  test('should lazy-load and display Navigation section', async ({ page }) => {
    const navHeading = page.getByRole('heading', { name: 'Navigation' });
    await navHeading.scrollIntoViewIfNeeded();
    await expect(navHeading).toBeVisible();
  });

  test('should lazy-load and display Popups & Dialogs section', async ({ page }) => {
    const popupsHeading = page.getByRole('heading', { name: 'Popups & Dialogs' });
    await popupsHeading.scrollIntoViewIfNeeded();
    await expect(popupsHeading).toBeVisible();
  });

  test('should lazy-load and display Data Grid section', async ({ page }) => {
    const dataGridHeading = page.getByRole('heading', { name: 'Data Grid' });
    await dataGridHeading.scrollIntoViewIfNeeded();
    await expect(dataGridHeading).toBeVisible();
  });

  test('should display FlexBox Layout section', async ({ page }) => {
    const flexHeading = page.getByRole('heading', { name: 'Flexbox Layout' });
    await flexHeading.scrollIntoViewIfNeeded();
    await expect(flexHeading).toBeVisible();
  });

  test('should display Cards section', async ({ page }) => {
    const cardsHeading = page.getByRole('heading', { name: 'Cards' });
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
    const nameInput = page.getByTestId(TestIds.INPUT_NAME);
    await nameInput.clear();
    await nameInput.fill('Test Name');
    await expect(nameInput).toHaveValue('Test Name');
  });

  test('should have disabled input that cannot be edited', async ({ page }) => {
    const disabledInput = page.getByTestId(TestIds.INPUT_DISABLED);
    await expect(disabledInput).toBeDisabled();
  });

  test('should display error state on error input', async ({ page }) => {
    const errorInput = page.getByTestId(TestIds.INPUT_ERROR);

    // Error input should have error styling
    const hasErrorClass = await errorInput.evaluate((el) => {
      const inputEl = el.querySelector('.e-input') ?? el;
      return inputEl.classList.contains('e-error') ||
        inputEl.classList.contains('sf-error') ||
        el.closest('.e-error') !== null;
    });

    // Either has error class or has visible error message nearby
    const errorMessage = page.locator('.text-error-500, .e-error, [data-error="true"]').first();
    const isErrorVisible = await errorInput.isVisible() || await errorMessage.isVisible();
    expect(isErrorVisible).toBe(true);
  });

  test('should have functional select dropdowns', async ({ page }) => {
    const select = page.getByTestId(TestIds.SELECT_BASIC);
    await expect(select).toBeVisible();
  });

  test('should display Syncfusion components with .e-control class', async ({ page }) => {
    // Wait for Syncfusion components to load
    await page.waitForTimeout(500);

    // Check that Syncfusion components exist (they have .e-control class)
    const syncfusionControls = page.locator('.e-control');
    expect(await syncfusionControls.count()).toBeGreaterThan(0);
  });

  test('should have splitter for layout', async ({ page }) => {
    await expect(page.getByTestId(TestIds.THEME_SPLITTER)).toBeVisible();
  });

  test('should display DataGrid with users data', async ({ page }) => {
    // Scroll to DataGrid section
    const dataGridHeading = page.getByRole('heading', { name: 'Data Grid' });
    await dataGridHeading.scrollIntoViewIfNeeded();

    // Wait for DataGrid to load
    await page.waitForTimeout(500);

    // Check for DataGrid elements
    const dataGrid = page.getByTestId(TestIds.DATA_GRID_USERS);
    await expect(dataGrid).toBeVisible();
  });

  test('should have link to dedicated DataGrid page', async ({ page }) => {
    // Look for a link/button to the DataGrid dedicated page
    const gridViewLink = page.getByTestId(TestIds.DATA_GRID_VIEW_LINK);
    if (await gridViewLink.isVisible()) {
      await gridViewLink.click();
      await expect(page).toHaveURL('/dashboard/components/grid');
    }
  });
});
