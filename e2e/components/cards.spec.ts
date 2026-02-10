import { test, expect } from '@playwright/test';

import { login, getCSSVariable } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Cards Section - Components Page', () => {
  test.skip(
    () => true,
    'Skipped by default - Syncfusion components require long load times. Run manually with --timeout=180000',
  );

  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/components');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should display Native Cards heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Cards' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  test('should display native cards section with test ID', async ({ page }) => {
    const section = page.getByTestId(TestIds.CARDS_NATIVE_SECTION);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  });

  test('should display native card variants', async ({ page }) => {
    const section = page.getByTestId(TestIds.CARDS_NATIVE_SECTION);
    await section.scrollIntoViewIfNeeded();

    // At least 4 card variants should be visible (nth is 0-indexed)
    await expect(section.locator('.card').nth(3)).toBeVisible();
  });

  test('should display card with header and content sections', async ({ page }) => {
    const section = page.getByTestId(TestIds.CARDS_NATIVE_SECTION);
    await section.scrollIntoViewIfNeeded();

    const header = section.locator('.card-header').first();
    await expect(header).toBeVisible();

    const content = section.locator('.card-content').first();
    await expect(content).toBeVisible();
  });

  test('should display card with footer and action links', async ({ page }) => {
    const section = page.getByTestId(TestIds.CARDS_NATIVE_SECTION);
    await section.scrollIntoViewIfNeeded();

    const footer = section.locator('.card-footer').first();
    await expect(footer).toBeVisible();

    // At least 2 action links should be visible
    await expect(section.locator('.card-action').nth(1)).toBeVisible();
  });

  test('should display Syncfusion Cards heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Syncfusion Cards' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  test('should display Syncfusion cards section with test ID', async ({ page }) => {
    const section = page.getByTestId(TestIds.CARDS_SYNCFUSION_SECTION);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  });

  test('should display Syncfusion e-card elements', async ({ page }) => {
    const section = page.getByTestId(TestIds.CARDS_SYNCFUSION_SECTION);
    await section.scrollIntoViewIfNeeded();

    // At least 3 Syncfusion cards should be visible
    await expect(section.locator('.e-card').nth(2)).toBeVisible();
  });

  test('should display Syncfusion card header and content', async ({ page }) => {
    const section = page.getByTestId(TestIds.CARDS_SYNCFUSION_SECTION);
    await section.scrollIntoViewIfNeeded();

    const headerTitle = section.locator('.e-card-header-title').first();
    await expect(headerTitle).toBeVisible();

    const content = section.locator('.e-card-content').first();
    await expect(content).toBeVisible();
  });

  test('should display Syncfusion card with action buttons', async ({ page }) => {
    const section = page.getByTestId(TestIds.CARDS_SYNCFUSION_SECTION);
    await section.scrollIntoViewIfNeeded();

    const actions = section.locator('.e-card-actions').first();
    await expect(actions).toBeVisible();

    // At least 1 action button should be visible
    await expect(actions.locator('button').first()).toBeVisible();
  });

  test('should display horizontal Syncfusion card', async ({ page }) => {
    const section = page.getByTestId(TestIds.CARDS_SYNCFUSION_SECTION);
    await section.scrollIntoViewIfNeeded();

    const horizontalCard = section.locator('.e-card-horizontal');
    await expect(horizontalCard.first()).toBeVisible();
  });

  test('should inject card CSS variables', async ({ page }) => {
    const cardBg = await getCSSVariable(page, '--component-card-background');
    expect(cardBg).not.toBe('');

    const cardBorder = await getCSSVariable(page, '--component-card-border');
    expect(cardBorder).not.toBe('');

    const cardText = await getCSSVariable(page, '--component-card-text');
    expect(cardText).not.toBe('');

    const cardTitle = await getCSSVariable(page, '--component-card-title');
    expect(cardTitle).not.toBe('');

    const cardHoverBorder = await getCSSVariable(page, '--component-card-hover-border');
    expect(cardHoverBorder).not.toBe('');

    const cardActionText = await getCSSVariable(page, '--component-card-action-text');
    expect(cardActionText).not.toBe('');
  });
});

test.describe('Cards Section - Native Components Page', () => {
  test.skip(
    () => true,
    'Skipped by default - Syncfusion components require long load times. Run manually with --timeout=180000',
  );

  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/native-components');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should display Native Cards heading on native page', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Native Cards' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  test('should display native cards section with test ID', async ({ page }) => {
    const section = page.getByTestId(TestIds.CARDS_NATIVE_PAGE_SECTION);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  });

  test('should display native card variants on native page', async ({ page }) => {
    const section = page.getByTestId(TestIds.CARDS_NATIVE_PAGE_SECTION);
    await section.scrollIntoViewIfNeeded();

    // At least 4 card variants should be visible
    await expect(section.locator('.card').nth(3)).toBeVisible();
  });

  test('should display card sub-elements on native page', async ({ page }) => {
    const section = page.getByTestId(TestIds.CARDS_NATIVE_PAGE_SECTION);
    await section.scrollIntoViewIfNeeded();

    await expect(section.locator('.card-title').first()).toBeVisible();
    await expect(section.locator('.card-header').first()).toBeVisible();
    await expect(section.locator('.card-content').first()).toBeVisible();
    await expect(section.locator('.card-footer').first()).toBeVisible();
    await expect(section.locator('.card-action').first()).toBeVisible();
  });
});
