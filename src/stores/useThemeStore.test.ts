import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import { useThemeStore } from './useThemeStore';
import { createCustomTheme, createIncompleteTheme } from '../test/fixtures/themeFixtures';

import type { ColorShade, StatusKey, StatusShade } from './theme/types';


describe('useThemeStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useThemeStore());
    act(() => {
      result.current.setMode('light');
      result.current.resetTheme();
    });
  });

  describe('mode management', () => {
    it('has default mode as light', () => {
      const { result } = renderHook(() => useThemeStore());
      expect(result.current.mode).toBe('light');
    });

    it('sets mode to dark', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.setMode('dark'));
      expect(result.current.mode).toBe('dark');
    });

    it('sets mode to light from dark', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.setMode('dark'));
      act(() => result.current.setMode('light'));
      expect(result.current.mode).toBe('light');
    });

    it('toggles from light to dark', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.toggleMode());
      expect(result.current.mode).toBe('dark');
    });

    it('toggles from dark to light', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.setMode('dark'));
      act(() => result.current.toggleMode());
      expect(result.current.mode).toBe('light');
    });

    it('toggles multiple times correctly', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.toggleMode());
      expect(result.current.mode).toBe('dark');
      act(() => result.current.toggleMode());
      expect(result.current.mode).toBe('light');
      act(() => result.current.toggleMode());
      expect(result.current.mode).toBe('dark');
    });

    it('preserves mode after theme update', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.setMode('dark'));
      act(() => result.current.updateTheme({ name: 'Custom Theme' }));
      expect(result.current.mode).toBe('dark');
    });
  });

  describe('theme management', () => {
    it('has default theme with id "default"', () => {
      const { result } = renderHook(() => useThemeStore());
      expect(result.current.theme.id).toBe('default');
      expect(result.current.theme.name).toBe('Default Blue');
    });

    it('updates theme properties', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateTheme({ name: 'Custom Theme' }));
      expect(result.current.theme.name).toBe('Custom Theme');
      expect(result.current.theme.id).toBe('default');
    });

    it('updates primary color shade', () => {
      const { result } = renderHook(() => useThemeStore());
      const newColor = '100 200 50';
      act(() => result.current.updatePrimaryColor('500', newColor));
      expect(result.current.theme.primary['500']).toBe(newColor);
    });

    it('resets theme to default', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateTheme({ name: 'Modified Theme' }));
      expect(result.current.theme.name).toBe('Modified Theme');
      act(() => result.current.resetTheme());
      expect(result.current.theme.name).toBe('Default Blue');
      expect(result.current.theme.id).toBe('default');
    });

    it('updates multiple theme properties at once', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateTheme({
        name: 'Multi Update Theme',
        id: 'multi-update',
      }));
      expect(result.current.theme.name).toBe('Multi Update Theme');
      expect(result.current.theme.id).toBe('multi-update');
    });

    it('preserves unmodified properties when updating theme', () => {
      const { result } = renderHook(() => useThemeStore());
      const originalPrimary = result.current.theme.primary['500'];
      act(() => result.current.updateTheme({ name: 'New Name' }));
      expect(result.current.theme.primary['500']).toBe(originalPrimary);
    });
  });

  describe('color update actions', () => {
    describe('updatePrimaryColor', () => {
      const colorShades: ColorShade[] = [
        '50', '100', '200', '300', '400', '500', '600', '700', '800', '900',
      ];

      colorShades.forEach((shade) => {
        it(`updates primary color shade ${shade}`, () => {
          const { result } = renderHook(() => useThemeStore());
          const newColor = `${shade} 128 255`;
          act(() => result.current.updatePrimaryColor(shade, newColor));
          expect(result.current.theme.primary[shade]).toBe(newColor);
        });
      });

      it('preserves other shades when updating one shade', () => {
        const { result } = renderHook(() => useThemeStore());
        const original100 = result.current.theme.primary['100'];
        act(() => result.current.updatePrimaryColor('500', '255 0 0'));
        expect(result.current.theme.primary['100']).toBe(original100);
        expect(result.current.theme.primary['500']).toBe('255 0 0');
      });

      it('handles empty string color value', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updatePrimaryColor('500', ''));
        expect(result.current.theme.primary['500']).toBe('');
      });
    });

    describe('updateSecondaryColor', () => {
      const colorShades: ColorShade[] = [
        '50', '100', '200', '300', '400', '500', '600', '700', '800', '900',
      ];

      colorShades.forEach((shade) => {
        it(`updates secondary color shade ${shade}`, () => {
          const { result } = renderHook(() => useThemeStore());
          const newColor = `${shade} 64 192`;
          act(() => result.current.updateSecondaryColor(shade, newColor));
          expect(result.current.theme.secondary[shade]).toBe(newColor);
        });
      });

      it('does not affect primary colors when updating secondary', () => {
        const { result } = renderHook(() => useThemeStore());
        const originalPrimary = result.current.theme.primary['500'];
        act(() => result.current.updateSecondaryColor('500', '128 128 128'));
        expect(result.current.theme.primary['500']).toBe(originalPrimary);
      });
    });

    describe('updateNeutralColor', () => {
      const colorShades: ColorShade[] = [
        '50', '100', '200', '300', '400', '500', '600', '700', '800', '900',
      ];

      colorShades.forEach((shade) => {
        it(`updates neutral color shade ${shade}`, () => {
          const { result } = renderHook(() => useThemeStore());
          const newColor = `${shade} ${shade} ${shade}`;
          act(() => result.current.updateNeutralColor(shade, newColor));
          expect(result.current.theme.neutral[shade]).toBe(newColor);
        });
      });

      it('does not affect primary or secondary colors', () => {
        const { result } = renderHook(() => useThemeStore());
        const originalPrimary = result.current.theme.primary['500'];
        const originalSecondary = result.current.theme.secondary['500'];
        act(() => result.current.updateNeutralColor('500', '100 100 100'));
        expect(result.current.theme.primary['500']).toBe(originalPrimary);
        expect(result.current.theme.secondary['500']).toBe(originalSecondary);
      });
    });

    describe('updateStatusColor', () => {
      const statusKeys: StatusKey[] = ['success', 'warning', 'error', 'info'];
      const statusShades: StatusShade[] = ['50', '100', '200', '500', '700'];

      statusKeys.forEach((status) => {
        statusShades.forEach((shade) => {
          it(`updates ${status} status color shade ${shade}`, () => {
            const { result } = renderHook(() => useThemeStore());
            const newColor = `${status}-${shade}`;
            act(() => result.current.updateStatusColor(status, shade, newColor));
            expect(result.current.theme.status[status][shade]).toBe(newColor);
          });
        });
      });

      it('preserves other status colors when updating one', () => {
        const { result } = renderHook(() => useThemeStore());
        const originalWarning = result.current.theme.status.warning['500'];
        act(() => result.current.updateStatusColor('success', '500', '0 255 0'));
        expect(result.current.theme.status.warning['500']).toBe(originalWarning);
      });

      it('preserves other shades when updating one shade', () => {
        const { result } = renderHook(() => useThemeStore());
        const originalShade50 = result.current.theme.status.error['50'];
        act(() => result.current.updateStatusColor('error', '500', '255 0 0'));
        expect(result.current.theme.status.error['50']).toBe(originalShade50);
      });
    });
  });

  describe('mode config actions', () => {
    describe('updateModeConfig for light mode', () => {
      it('updates light mode background page color', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateModeConfig('light', {
          backgrounds: { page: '240 240 240' },
        }));
        expect(result.current.theme.light.backgrounds.page).toBe('240 240 240');
      });

      it('updates light mode surface colors', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateModeConfig('light', {
          backgrounds: {
            surface: '245 245 245',
            surfaceElevated: '250 250 250',
          },
        }));
        expect(result.current.theme.light.backgrounds.surface).toBe('245 245 245');
        expect(result.current.theme.light.backgrounds.surfaceElevated).toBe('250 250 250');
      });

      it('updates light mode text colors', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateModeConfig('light', {
          text: {
            primary: '0 0 0',
            secondary: '50 50 50',
          },
        }));
        expect(result.current.theme.light.text.primary).toBe('0 0 0');
        expect(result.current.theme.light.text.secondary).toBe('50 50 50');
      });

      it('updates light mode border colors', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateModeConfig('light', {
          borders: {
            default: '200 200 200',
            strong: '100 100 100',
          },
        }));
        expect(result.current.theme.light.borders.default).toBe('200 200 200');
        expect(result.current.theme.light.borders.strong).toBe('100 100 100');
      });

      it('does not affect dark mode when updating light mode', () => {
        const { result } = renderHook(() => useThemeStore());
        const originalDarkPage = result.current.theme.dark.backgrounds.page;
        act(() => result.current.updateModeConfig('light', {
          backgrounds: { page: '255 255 255' },
        }));
        expect(result.current.theme.dark.backgrounds.page).toBe(originalDarkPage);
      });
    });

    describe('updateModeConfig for dark mode', () => {
      it('updates dark mode background page color', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateModeConfig('dark', {
          backgrounds: { page: '20 20 20' },
        }));
        expect(result.current.theme.dark.backgrounds.page).toBe('20 20 20');
      });

      it('updates dark mode text colors', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateModeConfig('dark', {
          text: {
            primary: '255 255 255',
            muted: '150 150 150',
          },
        }));
        expect(result.current.theme.dark.text.primary).toBe('255 255 255');
        expect(result.current.theme.dark.text.muted).toBe('150 150 150');
      });

      it('does not affect light mode when updating dark mode', () => {
        const { result } = renderHook(() => useThemeStore());
        const originalLightPage = result.current.theme.light.backgrounds.page;
        act(() => result.current.updateModeConfig('dark', {
          backgrounds: { page: '0 0 0' },
        }));
        expect(result.current.theme.light.backgrounds.page).toBe(originalLightPage);
      });
    });
  });

  describe('component config actions', () => {
    describe('updateHeaderConfig', () => {
      it('updates header background color', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateHeaderConfig({ background: '240 240 240' }));
        expect(result.current.theme.components.header.background).toBe('240 240 240');
      });

      it('updates header text color', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateHeaderConfig({ textColor: '30 30 30' }));
        expect(result.current.theme.components.header.textColor).toBe('30 30 30');
      });

      it('updates header height', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateHeaderConfig({ height: '80px' }));
        expect(result.current.theme.components.header.height).toBe('80px');
      });

      it('updates header shadow', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateHeaderConfig({ shadow: 'lg' }));
        expect(result.current.theme.components.header.shadow).toBe('lg');
      });

      it('updates multiple header properties at once', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateHeaderConfig({
          background: '255 255 255',
          textColor: '0 0 0',
          height: '72px',
        }));
        expect(result.current.theme.components.header.background).toBe('255 255 255');
        expect(result.current.theme.components.header.textColor).toBe('0 0 0');
        expect(result.current.theme.components.header.height).toBe('72px');
      });

      it('preserves other header properties when updating one', () => {
        const { result } = renderHook(() => useThemeStore());
        const originalHeight = result.current.theme.components.header.height;
        act(() => result.current.updateHeaderConfig({ background: '200 200 200' }));
        expect(result.current.theme.components.header.height).toBe(originalHeight);
      });
    });

    describe('updateSidebarConfig', () => {
      it('updates sidebar background color', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateSidebarConfig({ background: '245 245 245' }));
        expect(result.current.theme.components.sidebar.background).toBe('245 245 245');
      });

      it('updates sidebar text color', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateSidebarConfig({ textColor: '50 50 50' }));
        expect(result.current.theme.components.sidebar.textColor).toBe('50 50 50');
      });

      it('updates sidebar active item colors', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateSidebarConfig({
          activeItemBackground: '230 240 255',
          activeItemTextColor: '59 130 246',
        }));
        expect(result.current.theme.components.sidebar.activeItemBackground).toBe('230 240 255');
        expect(result.current.theme.components.sidebar.activeItemTextColor).toBe('59 130 246');
      });

      it('updates sidebar widths', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateSidebarConfig({
          widthExpanded: '300px',
          widthCollapsed: '80px',
        }));
        expect(result.current.theme.components.sidebar.widthExpanded).toBe('300px');
        expect(result.current.theme.components.sidebar.widthCollapsed).toBe('80px');
      });

      it('does not affect header config when updating sidebar', () => {
        const { result } = renderHook(() => useThemeStore());
        const originalHeaderBg = result.current.theme.components.header.background;
        act(() => result.current.updateSidebarConfig({ background: '220 220 220' }));
        expect(result.current.theme.components.header.background).toBe(originalHeaderBg);
      });
    });

    describe('updateButtonConfig', () => {
      it('updates primary button background', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateButtonConfig('primary', { background: '100 150 200' }));
        expect(result.current.theme.components.buttons.primary.background).toBe('100 150 200');
      });

      it('updates primary button hover state', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateButtonConfig('primary', {
          backgroundHover: '80 130 180',
          textColorHover: '255 255 255',
        }));
        expect(result.current.theme.components.buttons.primary.backgroundHover).toBe('80 130 180');
        expect(result.current.theme.components.buttons.primary.textColorHover).toBe('255 255 255');
      });

      it('updates secondary button colors', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateButtonConfig('secondary', {
          background: '230 230 230',
          textColor: '50 50 50',
        }));
        expect(result.current.theme.components.buttons.secondary.background).toBe('230 230 230');
        expect(result.current.theme.components.buttons.secondary.textColor).toBe('50 50 50');
      });

      it('updates outline button border', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateButtonConfig('outline', {
          borderColor: '59 130 246',
          borderWidth: '2px',
        }));
        expect(result.current.theme.components.buttons.outline.borderColor).toBe('59 130 246');
        expect(result.current.theme.components.buttons.outline.borderWidth).toBe('2px');
      });

      it('updates ghost button transparency', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateButtonConfig('ghost', {
          background: 'transparent',
          backgroundHover: '243 244 246',
        }));
        expect(result.current.theme.components.buttons.ghost.background).toBe('transparent');
        expect(result.current.theme.components.buttons.ghost.backgroundHover).toBe('243 244 246');
      });

      it('updates danger button colors', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateButtonConfig('danger', {
          background: '220 38 38',
          backgroundHover: '185 28 28',
        }));
        expect(result.current.theme.components.buttons.danger.background).toBe('220 38 38');
        expect(result.current.theme.components.buttons.danger.backgroundHover).toBe('185 28 28');
      });

      it('does not affect other button variants when updating one', () => {
        const { result } = renderHook(() => useThemeStore());
        const originalSecondary = result.current.theme.components.buttons.secondary.background;
        act(() => result.current.updateButtonConfig('primary', { background: '100 100 100' }));
        expect(result.current.theme.components.buttons.secondary.background).toBe(originalSecondary);
      });

      it('updates button border radius', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateButtonConfig('primary', { borderRadius: 'lg' }));
        expect(result.current.theme.components.buttons.primary.borderRadius).toBe('lg');
      });

      it('updates button shadow', () => {
        const { result } = renderHook(() => useThemeStore());
        act(() => result.current.updateButtonConfig('primary', { shadow: 'md' }));
        expect(result.current.theme.components.buttons.primary.shadow).toBe('md');
      });
    });
  });

  describe('theme export/import', () => {
    it('exports theme as JSON string', () => {
      const { result } = renderHook(() => useThemeStore());
      const exported = result.current.exportTheme();
      expect(typeof exported).toBe('string');
      const parsed = JSON.parse(exported) as { id: string; name: string };
      expect(parsed.id).toBe('default');
      expect(parsed.name).toBe('Default Blue');
    });

    it('imports valid theme JSON successfully', () => {
      const { result } = renderHook(() => useThemeStore());
      const customTheme = createCustomTheme();
      let importResult = false;
      act(() => {
        importResult = result.current.importTheme(JSON.stringify(customTheme));
      });
      expect(importResult).toBe(true);
      expect(result.current.theme.id).toBe('custom');
      expect(result.current.theme.name).toBe('Custom Imported');
    });

    it('returns false for invalid JSON', () => {
      const { result } = renderHook(() => useThemeStore());
      let importResult = true;
      act(() => {
        importResult = result.current.importTheme('invalid json');
      });
      expect(importResult).toBe(false);
      expect(result.current.theme.id).toBe('default');
    });

    it('returns false for JSON missing required fields', () => {
      const { result } = renderHook(() => useThemeStore());
      const incompleteTheme = createIncompleteTheme();
      let importResult = true;
      act(() => {
        importResult = result.current.importTheme(JSON.stringify(incompleteTheme));
      });
      expect(importResult).toBe(false);
      expect(result.current.theme.id).toBe('default');
    });

    it('returns false for JSON with empty id', () => {
      const { result } = renderHook(() => useThemeStore());
      const themeWithEmptyId = { id: '', primary: {} };
      let importResult = true;
      act(() => {
        importResult = result.current.importTheme(JSON.stringify(themeWithEmptyId));
      });
      expect(importResult).toBe(false);
    });

    it('returns false for JSON where id is not a string', () => {
      const { result } = renderHook(() => useThemeStore());
      const themeWithNumberId = { id: 123, primary: {} };
      let importResult = true;
      act(() => {
        importResult = result.current.importTheme(JSON.stringify(themeWithNumberId));
      });
      expect(importResult).toBe(false);
    });

    it('returns false for JSON where primary is not an object', () => {
      const { result } = renderHook(() => useThemeStore());
      const themeWithArrayPrimary = { id: 'test', primary: [] };
      let importResult = true;
      act(() => {
        importResult = result.current.importTheme(JSON.stringify(themeWithArrayPrimary));
      });
      expect(importResult).toBe(false);
    });

    it('returns false for null value', () => {
      const { result } = renderHook(() => useThemeStore());
      let importResult = true;
      act(() => {
        importResult = result.current.importTheme('null');
      });
      expect(importResult).toBe(false);
    });

    it('returns false for array instead of object', () => {
      const { result } = renderHook(() => useThemeStore());
      let importResult = true;
      act(() => {
        importResult = result.current.importTheme('[1, 2, 3]');
      });
      expect(importResult).toBe(false);
    });

    it('exports formatted JSON with indentation', () => {
      const { result } = renderHook(() => useThemeStore());
      const exported = result.current.exportTheme();
      expect(exported).toContain('\n');
      expect(exported).toContain('  ');
    });
  });

  describe('theme roundtrip', () => {
    it('can export and re-import theme without data loss', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => {
        result.current.updateTheme({ name: 'Modified for Export' });
        result.current.updatePrimaryColor('500', '123 45 67');
      });
      const exported = result.current.exportTheme();
      act(() => result.current.resetTheme());
      expect(result.current.theme.name).toBe('Default Blue');
      let importResult = false;
      act(() => {
        importResult = result.current.importTheme(exported);
      });
      expect(importResult).toBe(true);
      expect(result.current.theme.name).toBe('Modified for Export');
      expect(result.current.theme.primary['500']).toBe('123 45 67');
    });

    it('preserves all color scales during roundtrip', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => {
        result.current.updatePrimaryColor('500', '100 100 100');
        result.current.updateSecondaryColor('500', '200 200 200');
        result.current.updateNeutralColor('500', '150 150 150');
        result.current.updateStatusColor('success', '500', '0 255 0');
      });
      const exported = result.current.exportTheme();
      act(() => result.current.resetTheme());
      act(() => {
        result.current.importTheme(exported);
      });
      expect(result.current.theme.primary['500']).toBe('100 100 100');
      expect(result.current.theme.secondary['500']).toBe('200 200 200');
      expect(result.current.theme.neutral['500']).toBe('150 150 150');
      expect(result.current.theme.status.success['500']).toBe('0 255 0');
    });

    it('preserves mode config during roundtrip', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => {
        result.current.updateModeConfig('light', {
          backgrounds: { page: '240 240 240' },
        });
        result.current.updateModeConfig('dark', {
          backgrounds: { page: '20 20 20' },
        });
      });
      const exported = result.current.exportTheme();
      act(() => result.current.resetTheme());
      act(() => {
        result.current.importTheme(exported);
      });
      expect(result.current.theme.light.backgrounds.page).toBe('240 240 240');
      expect(result.current.theme.dark.backgrounds.page).toBe('20 20 20');
    });

    it('preserves component config during roundtrip', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => {
        result.current.updateHeaderConfig({ height: '80px' });
        result.current.updateSidebarConfig({ widthExpanded: '320px' });
        result.current.updateButtonConfig('primary', { borderRadius: 'xl' });
      });
      const exported = result.current.exportTheme();
      act(() => result.current.resetTheme());
      act(() => {
        result.current.importTheme(exported);
      });
      expect(result.current.theme.components.header.height).toBe('80px');
      expect(result.current.theme.components.sidebar.widthExpanded).toBe('320px');
      expect(result.current.theme.components.buttons.primary.borderRadius).toBe('xl');
    });
  });

  describe('reset behavior', () => {
    it('resets all color scales to default', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => {
        result.current.updatePrimaryColor('500', '255 0 0');
        result.current.updateSecondaryColor('500', '0 255 0');
        result.current.updateNeutralColor('500', '0 0 255');
        result.current.updateStatusColor('error', '500', '100 100 100');
      });
      act(() => result.current.resetTheme());
      expect(result.current.theme.id).toBe('default');
      expect(result.current.theme.name).toBe('Default Blue');
    });

    it('resets mode config to default', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => {
        result.current.updateModeConfig('light', {
          backgrounds: { page: '100 100 100' },
        });
      });
      act(() => result.current.resetTheme());
      expect(result.current.theme.light.backgrounds.page).not.toBe('100 100 100');
    });

    it('resets component config to default', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => {
        result.current.updateHeaderConfig({ height: '100px' });
      });
      act(() => result.current.resetTheme());
      expect(result.current.theme.components.header.height).not.toBe('100px');
    });

    it('does not reset mode when resetting theme', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.setMode('dark'));
      act(() => result.current.resetTheme());
      expect(result.current.mode).toBe('dark');
    });
  });

  describe('state persistence across operations', () => {
    it('maintains state consistency after multiple operations', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => {
        result.current.updateTheme({ name: 'Step 1' });
        result.current.updatePrimaryColor('500', '100 100 100');
        result.current.setMode('dark');
        result.current.updateModeConfig('dark', {
          backgrounds: { page: '10 10 10' },
        });
        result.current.updateHeaderConfig({ height: '72px' });
      });
      expect(result.current.theme.name).toBe('Step 1');
      expect(result.current.theme.primary['500']).toBe('100 100 100');
      expect(result.current.mode).toBe('dark');
      expect(result.current.theme.dark.backgrounds.page).toBe('10 10 10');
      expect(result.current.theme.components.header.height).toBe('72px');
    });

    it('allows sequential updates without data loss', () => {
      const { result } = renderHook(() => useThemeStore());
      const allShades: ColorShade[] = [
        '50', '100', '200', '300', '400', '500', '600', '700', '800', '900',
      ];
      allShades.forEach((shade, index) => {
        act(() => result.current.updatePrimaryColor(shade, `${index} ${index} ${index}`));
      });
      allShades.forEach((shade, index) => {
        expect(result.current.theme.primary[shade]).toBe(`${index} ${index} ${index}`);
      });
    });
  });

  describe('typography actions', () => {
    it('updates font family for sans', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateFontFamily('sans', 'Arial, sans-serif'));
      expect(result.current.theme.typography.fontSans).toBe('Arial, sans-serif');
    });

    it('updates font family for mono', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateFontFamily('mono', 'Consolas, monospace'));
      expect(result.current.theme.typography.fontMono).toBe('Consolas, monospace');
    });

    it('updates transition fast', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateTransition('fast', '100ms'));
      expect(result.current.theme.transitions.fast).toBe('100ms');
    });

    it('updates transition normal', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateTransition('normal', '200ms'));
      expect(result.current.theme.transitions.normal).toBe('200ms');
    });

    it('updates transition slow', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateTransition('slow', '400ms'));
      expect(result.current.theme.transitions.slow).toBe('400ms');
    });

    it('updates transition easing', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateTransition('easing', 'ease-in-out'));
      expect(result.current.theme.transitions.easing).toBe('ease-in-out');
    });
  });

  describe('layout actions', () => {
    it('updates sidebar width', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateLayoutDimension('sidebarWidth', '300px'));
      expect(result.current.theme.layout.sidebarWidth).toBe('300px');
    });

    it('updates sidebar collapsed width', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateLayoutDimension('sidebarCollapsedWidth', '80px'));
      expect(result.current.theme.layout.sidebarCollapsedWidth).toBe('80px');
    });

    it('updates header height', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateLayoutDimension('headerHeight', '72px'));
      expect(result.current.theme.layout.headerHeight).toBe('72px');
    });

    it('updates spacing base unit', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateSpacingBaseUnit(8));
      expect(result.current.theme.spacing.baseUnit).toBe(8);
    });

    it('updates border radius', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateBorderRadius('md', '0.5rem'));
      expect(result.current.theme.borderRadius.md).toBe('0.5rem');
    });

    it('updates shadow', () => {
      const { result } = renderHook(() => useThemeStore());
      const newShadow = '0 4px 6px rgba(0,0,0,0.1)';
      act(() => result.current.updateShadow('md', newShadow));
      expect(result.current.theme.shadows.md).toBe(newShadow);
    });
  });
});
