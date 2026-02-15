import { test, expect } from '@playwright/test';

import { ThemeSettingsPage } from '../page-objects/ThemeSettingsPage';
import { TestIds } from '../shared/testIds';

test.describe('Theme Editor', () => {
  let themeSettingsPage: ThemeSettingsPage;

  test.beforeEach(async ({ page }) => {
    themeSettingsPage = new ThemeSettingsPage(page);
    await themeSettingsPage.goto();
  });

  test.describe('Opening and Closing Drawer', () => {
    test('opens theme settings drawer when clicking settings button', async ({ page }) => {
      await page.getByTestId(TestIds.THEME_SETTINGS_BUTTON).click();
      await expect(page.getByTestId(TestIds.THEME_SETTINGS_DRAWER)).toBeVisible();
    });

    test('closes drawer when clicking close button', async () => {
      await themeSettingsPage.openDrawer();
      await themeSettingsPage.closeDrawer();
      await themeSettingsPage.expectDrawerHidden();
    });

    test('closes drawer when clicking backdrop', async () => {
      await themeSettingsPage.openDrawer();
      await themeSettingsPage.closeDrawerByBackdrop();
      await themeSettingsPage.expectDrawerHidden();
    });

    test('closes drawer when pressing Escape key', async () => {
      await themeSettingsPage.openDrawer();
      await themeSettingsPage.closeDrawerByEscape();
      await themeSettingsPage.expectDrawerHidden();
    });
  });

  test.describe('Tab Navigation', () => {
    test.beforeEach(async () => {
      await themeSettingsPage.openDrawer();
    });

    test('shows Colors tab as active by default', async () => {
      await themeSettingsPage.expectTabActive('colors');
    });

    test('navigates to Typography tab', async () => {
      await themeSettingsPage.selectTab('typography');
      await themeSettingsPage.expectTabActive('typography');
      await themeSettingsPage.expectTabInactive('colors');
    });

    test('navigates to Layout tab', async () => {
      await themeSettingsPage.selectTab('layout');
      await themeSettingsPage.expectTabActive('layout');
    });

    test('navigates to Light Theme tab', async () => {
      await themeSettingsPage.selectTab('lightTheme');
      await themeSettingsPage.expectTabActive('lightTheme');
    });

    test('navigates to Dark Theme tab', async () => {
      await themeSettingsPage.selectTab('darkTheme');
      await themeSettingsPage.expectTabActive('darkTheme');
    });

    test('navigates to Components tab', async () => {
      await themeSettingsPage.selectTab('components');
      await themeSettingsPage.expectTabActive('components');
    });

    test('navigates to Presets tab', async () => {
      await themeSettingsPage.selectTab('presets');
      await themeSettingsPage.expectTabActive('presets');
    });

    test('can navigate between all tabs in sequence', async () => {
      const tabs = [
        'colors',
        'typography',
        'layout',
        'lightTheme',
        'darkTheme',
        'components',
        'presets',
      ] as const;

      for (const tab of tabs) {
        await themeSettingsPage.selectTab(tab);
        await themeSettingsPage.expectTabActive(tab);
      }
    });
  });

  test.describe('Preset Application', () => {
    test.beforeEach(async () => {
      await themeSettingsPage.openDrawer();
      await themeSettingsPage.selectTab('presets');
    });

    test('displays preset cards in presets tab', async ({ page }) => {
      const presetCards = page.getByTestId(TestIds.THEME_PRESET_CARD);
      // There are 17 presets defined in presets.ts
      await expect(presetCards).toHaveCount(17);
    });

    test('default preset is active initially', async () => {
      await themeSettingsPage.expectPresetActive('default');
      await themeSettingsPage.expectPresetInactive('voyager');
    });

    test('applies Voyager preset when clicked', async () => {
      await themeSettingsPage.applyPreset('voyager');
      await themeSettingsPage.expectPresetActive('voyager');
      await themeSettingsPage.expectPresetInactive('default');
    });

    test('theme colors change when applying preset', async () => {
      // Get initial primary color
      const initialPrimary = await themeSettingsPage.getCssVariableValue('--color-primary-500');

      // Apply Voyager preset
      await themeSettingsPage.applyPreset('voyager');

      // Verify color changed
      const newPrimary = await themeSettingsPage.getCssVariableValue('--color-primary-500');
      expect(newPrimary).not.toBe(initialPrimary);
    });

    test('can switch back to default preset', async () => {
      await themeSettingsPage.applyPreset('voyager');
      await themeSettingsPage.expectPresetActive('voyager');

      await themeSettingsPage.applyPreset('default');
      await themeSettingsPage.expectPresetActive('default');
      await themeSettingsPage.expectPresetInactive('voyager');
    });
  });

  test.describe('Light/Dark Mode Toggle', () => {
    test('starts in light mode by default', async () => {
      await themeSettingsPage.expectLightMode();
    });

    test('toggles from light to dark mode', async () => {
      await themeSettingsPage.toggleDarkMode();
      await themeSettingsPage.expectDarkMode();
    });

    test('toggles from dark back to light mode', async () => {
      await themeSettingsPage.toggleDarkMode();
      await themeSettingsPage.expectDarkMode();

      await themeSettingsPage.toggleDarkMode();
      await themeSettingsPage.expectLightMode();
    });

    test('theme toggle persists when drawer is opened', async () => {
      await themeSettingsPage.toggleDarkMode();
      await themeSettingsPage.expectDarkMode();

      await themeSettingsPage.openDrawer();
      await themeSettingsPage.expectDarkMode();
    });
  });

  test.describe('Export Functionality', () => {
    test.beforeEach(async () => {
      await themeSettingsPage.openDrawer();
    });

    test('export button is visible', async () => {
      await expect(themeSettingsPage.exportButton).toBeVisible();
    });

    test('clicking export triggers download', async ({ page }) => {
      // Set up download listener before clicking
      const downloadPromise = page.waitForEvent('download');

      await themeSettingsPage.clickExport();

      const download = await downloadPromise;
      expect(download.suggestedFilename()).toMatch(/^theme-.*\.json$/);
    });
  });

  test.describe('Import Functionality', () => {
    test.beforeEach(async () => {
      await themeSettingsPage.openDrawer();
    });

    test('import toggle button is visible', async () => {
      await expect(themeSettingsPage.importToggleButton).toBeVisible();
    });

    test('shows import panel when clicking import button', async () => {
      await themeSettingsPage.showImportPanel();
      await expect(themeSettingsPage.importTextarea).toBeVisible();
      await expect(themeSettingsPage.importButton).toBeVisible();
    });

    test('hides import panel when clicking cancel', async () => {
      await themeSettingsPage.showImportPanel();
      await themeSettingsPage.hideImportPanel();
      await expect(themeSettingsPage.importTextarea).not.toBeVisible();
    });

    test('import button is disabled when textarea is empty', async () => {
      await themeSettingsPage.showImportPanel();
      await expect(themeSettingsPage.importButton).toBeDisabled();
    });

    test('import button is enabled when textarea has content', async () => {
      await themeSettingsPage.showImportPanel();
      await themeSettingsPage.importTextarea.fill('{"test": "value"}');
      await expect(themeSettingsPage.importButton).toBeEnabled();
    });

    test('shows error for invalid JSON import', async () => {
      await themeSettingsPage.showImportPanel();
      await themeSettingsPage.importTheme('invalid json');
      await themeSettingsPage.expectImportError();
    });

    test('shows error for valid JSON with invalid theme structure', async () => {
      await themeSettingsPage.showImportPanel();
      await themeSettingsPage.importTheme('{"not": "a theme"}');
      await themeSettingsPage.expectImportError();
    });
  });

  test.describe('Reset to Defaults', () => {
    test.beforeEach(async () => {
      await themeSettingsPage.openDrawer();
    });

    test('reset button is visible', async () => {
      await expect(themeSettingsPage.resetButton).toBeVisible();
    });

    test('resets theme after applying a preset', async () => {
      // Navigate to presets and apply Voyager
      await themeSettingsPage.selectTab('presets');
      await themeSettingsPage.applyPreset('voyager');
      await themeSettingsPage.expectPresetActive('voyager');

      // Get the Voyager primary color
      const voyagerPrimary = await themeSettingsPage.getCssVariableValue('--color-primary-500');

      // Reset to defaults
      await themeSettingsPage.resetTheme();

      // Verify preset changed back to default
      await themeSettingsPage.expectPresetActive('default');

      // Verify color changed
      const defaultPrimary = await themeSettingsPage.getCssVariableValue('--color-primary-500');
      expect(defaultPrimary).not.toBe(voyagerPrimary);
    });
  });

  test.describe('Persistence', () => {
    test('preset selection persists after page reload', async ({ page }) => {
      await themeSettingsPage.openDrawer();
      await themeSettingsPage.selectTab('presets');

      // Apply Voyager preset
      await themeSettingsPage.applyPreset('voyager');
      await themeSettingsPage.expectPresetActive('voyager');

      // Reload page
      await page.reload();

      // Re-open drawer and check preset is still active
      await themeSettingsPage.openDrawer();
      await themeSettingsPage.selectTab('presets');
      await themeSettingsPage.expectPresetActive('voyager');
    });

    test('dark mode persists after page reload', async ({ page }) => {
      await themeSettingsPage.toggleDarkMode();
      await themeSettingsPage.expectDarkMode();

      await page.reload();

      await themeSettingsPage.expectDarkMode();
    });
  });
});
