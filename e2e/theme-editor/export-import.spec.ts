import { test, expect } from '@playwright/test';

import { login, openThemeDrawer, getCSSVariable, clearThemeStorage } from '../fixtures/auth';
import { TestIds } from '../shared/testIds';

test.describe('Theme Export/Import', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clearThemeStorage(page);
    await login(page);
    await openThemeDrawer(page);
  });

  test.describe('Export Functionality', () => {
    test('should trigger file download when clicking export', async ({ page }) => {
      // Listen for download event
      const downloadPromise = page.waitForEvent('download');

      // Scroll to and click export button
      const exportBtn = page.getByTestId(TestIds.THEME_EXPORT_BTN);
      await exportBtn.scrollIntoViewIfNeeded();
      await exportBtn.click();

      // Wait for download
      const download = await downloadPromise;

      // Verify filename pattern
      expect(download.suggestedFilename()).toMatch(/theme-.*\.json$/);
    });

    test('should export valid JSON content', async ({ page }) => {
      // Listen for download event
      const downloadPromise = page.waitForEvent('download');

      const exportBtn = page.getByTestId(TestIds.THEME_EXPORT_BTN);
      await exportBtn.scrollIntoViewIfNeeded();
      await exportBtn.click();

      const download = await downloadPromise;

      // Save and read the file content
      const path = await download.path();
      if (path) {
        const fs = await import('fs');
        const content = fs.readFileSync(path, 'utf-8');
        const themeData = JSON.parse(content);

        // Verify theme structure
        expect(themeData).toHaveProperty('id');
        expect(themeData).toHaveProperty('primary');
        expect(themeData).toHaveProperty('secondary');
        expect(themeData).toHaveProperty('status');
      }
    });
  });

  test.describe('Import Functionality', () => {
    test('should show import panel when clicking import toggle', async ({ page }) => {
      // Scroll to import toggle button
      const importToggleBtn = page.getByTestId(TestIds.THEME_IMPORT_TOGGLE_BTN);
      await importToggleBtn.scrollIntoViewIfNeeded();

      // Click to show import panel
      await importToggleBtn.click();

      // Verify import textarea is visible
      await expect(page.getByTestId(TestIds.THEME_IMPORT_TEXTAREA)).toBeVisible();
      await expect(page.getByTestId(TestIds.THEME_IMPORT_BTN)).toBeVisible();
    });

    test('should hide import panel when clicking toggle again', async ({ page }) => {
      const importToggleBtn = page.getByTestId(TestIds.THEME_IMPORT_TOGGLE_BTN);
      await importToggleBtn.scrollIntoViewIfNeeded();

      // Open import panel
      await importToggleBtn.click();
      await expect(page.getByTestId(TestIds.THEME_IMPORT_TEXTAREA)).toBeVisible();

      // Close import panel
      await importToggleBtn.click();
      await expect(page.getByTestId(TestIds.THEME_IMPORT_TEXTAREA)).not.toBeVisible();
    });

    test('should disable import button when textarea is empty', async ({ page }) => {
      const importToggleBtn = page.getByTestId(TestIds.THEME_IMPORT_TOGGLE_BTN);
      await importToggleBtn.scrollIntoViewIfNeeded();
      await importToggleBtn.click();

      const importBtn = page.getByTestId(TestIds.THEME_IMPORT_BTN);

      // Import button should be disabled when empty
      await expect(importBtn).toBeDisabled();
    });

    test('should enable import button when textarea has content', async ({ page }) => {
      const importToggleBtn = page.getByTestId(TestIds.THEME_IMPORT_TOGGLE_BTN);
      await importToggleBtn.scrollIntoViewIfNeeded();
      await importToggleBtn.click();

      const textarea = page.getByTestId(TestIds.THEME_IMPORT_TEXTAREA);
      const importBtn = page.getByTestId(TestIds.THEME_IMPORT_BTN);

      // Add content to textarea
      await textarea.fill('{"id": "test"}');

      // Import button should be enabled
      await expect(importBtn).not.toBeDisabled();
    });

    test('should show error for invalid JSON', async ({ page }) => {
      const importToggleBtn = page.getByTestId(TestIds.THEME_IMPORT_TOGGLE_BTN);
      await importToggleBtn.scrollIntoViewIfNeeded();
      await importToggleBtn.click();

      const textarea = page.getByTestId(TestIds.THEME_IMPORT_TEXTAREA);
      const importBtn = page.getByTestId(TestIds.THEME_IMPORT_BTN);

      // Enter invalid JSON
      await textarea.fill('not valid json');
      await importBtn.click();

      // Should show error message
      await expect(page.getByTestId(TestIds.THEME_IMPORT_ERROR)).toBeVisible();
    });

    test('should import valid theme JSON and apply it', async ({ page }) => {
      // Get current primary color
      const initialColor = await getCSSVariable(page, '--color-primary-500');

      const importToggleBtn = page.getByTestId(TestIds.THEME_IMPORT_TOGGLE_BTN);
      await importToggleBtn.scrollIntoViewIfNeeded();
      await importToggleBtn.click();

      const textarea = page.getByTestId(TestIds.THEME_IMPORT_TEXTAREA);
      const importBtn = page.getByTestId(TestIds.THEME_IMPORT_BTN);

      // Create a valid theme JSON with different primary color
      const testTheme = {
        id: 'test-import',
        primary: {
          '50': '254 242 242',
          '100': '254 226 226',
          '200': '254 202 202',
          '300': '252 165 165',
          '400': '248 113 113',
          '500': '239 68 68', // Red primary color
          '600': '220 38 38',
          '700': '185 28 28',
          '800': '153 27 27',
          '900': '127 29 29',
          '950': '69 10 10',
        },
        secondary: {
          '50': '240 253 244',
          '100': '220 252 231',
          '200': '187 247 208',
          '300': '134 239 172',
          '400': '74 222 128',
          '500': '34 197 94',
          '600': '22 163 74',
          '700': '21 128 61',
          '800': '22 101 52',
          '900': '20 83 45',
          '950': '5 46 22',
        },
        neutral: {
          '50': '249 250 251',
          '100': '243 244 246',
          '200': '229 231 235',
          '300': '209 213 219',
          '400': '156 163 175',
          '500': '107 114 128',
          '600': '75 85 99',
          '700': '55 65 81',
          '800': '31 41 55',
          '900': '17 24 39',
          '950': '3 7 18',
        },
        status: {
          success: '34 197 94',
          warning: '234 179 8',
          error: '239 68 68',
          info: '59 130 246',
        },
      };

      await textarea.fill(JSON.stringify(testTheme));
      await importBtn.click();

      // Wait for theme to apply
      await page.waitForTimeout(200);

      // Verify import panel closed
      await expect(textarea).not.toBeVisible();

      // Verify color changed
      const newColor = await getCSSVariable(page, '--color-primary-500');
      expect(newColor).toBe('239 68 68');
    });

    test('should clear textarea and close panel on successful import', async ({ page }) => {
      const importToggleBtn = page.getByTestId(TestIds.THEME_IMPORT_TOGGLE_BTN);
      await importToggleBtn.scrollIntoViewIfNeeded();
      await importToggleBtn.click();

      const textarea = page.getByTestId(TestIds.THEME_IMPORT_TEXTAREA);
      const importBtn = page.getByTestId(TestIds.THEME_IMPORT_BTN);

      // Enter valid theme JSON
      const validTheme = {
        id: 'valid-test',
        primary: { '500': '100 100 200' },
        secondary: { '500': '200 100 100' },
        neutral: { '500': '100 100 100' },
        status: {
          success: '34 197 94',
          warning: '234 179 8',
          error: '239 68 68',
          info: '59 130 246',
        },
      };

      await textarea.fill(JSON.stringify(validTheme));
      await importBtn.click();

      // Panel should close and textarea should not be visible
      await expect(textarea).not.toBeVisible();
    });
  });

  test.describe('Round-trip Export/Import', () => {
    test('should be able to export and re-import same theme', async ({ page }) => {
      // Apply a specific preset first
      await page.getByTestId(TestIds.THEME_TAB_PRESETS).click();
      const emeraldPreset = page.locator(`[data-testid="${TestIds.THEME_PRESET_CARD}"]`).filter({
        hasText: 'Emerald'
      });
      await emeraldPreset.click();
      await page.waitForTimeout(100);

      // Get current color
      const colorBefore = await getCSSVariable(page, '--color-primary-500');

      // Export the theme
      const downloadPromise = page.waitForEvent('download');
      const exportBtn = page.getByTestId(TestIds.THEME_EXPORT_BTN);
      await exportBtn.scrollIntoViewIfNeeded();
      await exportBtn.click();
      const download = await downloadPromise;

      // Read exported content
      const path = await download.path();
      const fs = await import('fs');
      const exportedContent = fs.readFileSync(path!, 'utf-8');

      // Reset to different theme
      const resetBtn = page.getByTestId(TestIds.THEME_RESET_BTN);
      await resetBtn.scrollIntoViewIfNeeded();
      await resetBtn.click();
      await page.waitForTimeout(100);

      // Verify color changed from export
      const colorAfterReset = await getCSSVariable(page, '--color-primary-500');
      expect(colorAfterReset).not.toBe(colorBefore);

      // Import the exported theme
      const importToggleBtn = page.getByTestId(TestIds.THEME_IMPORT_TOGGLE_BTN);
      await importToggleBtn.scrollIntoViewIfNeeded();
      await importToggleBtn.click();

      const textarea = page.getByTestId(TestIds.THEME_IMPORT_TEXTAREA);
      const importBtn = page.getByTestId(TestIds.THEME_IMPORT_BTN);

      await textarea.fill(exportedContent);
      await importBtn.click();
      await page.waitForTimeout(200);

      // Verify color is back to original
      const colorAfterImport = await getCSSVariable(page, '--color-primary-500');
      expect(colorAfterImport).toBe(colorBefore);
    });
  });
});
