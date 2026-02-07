import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';

// ===== TYPES =====

type Mode = 'light' | 'dark';

interface ColorScale {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
}

interface StatusColor {
  '50': string;
  '500': string;
  '700': string;
}

interface StatusColors {
  success: StatusColor;
  warning: StatusColor;
  error: StatusColor;
  info: StatusColor;
}

interface LayoutConfig {
  sidebarWidth: string;
  sidebarCollapsedWidth: string;
  headerHeight: string;
}

interface BorderRadiusConfig {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

interface TypographyConfig {
  fontSans: string;
  fontMono: string;
}

interface TransitionConfig {
  fast: string;
  normal: string;
  slow: string;
}

interface ThemeModeConfig {
  background: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
}

interface ThemeConfig {
  id: string;
  name: string;
  primary: ColorScale;
  status: StatusColors;
  layout: LayoutConfig;
  borderRadius: BorderRadiusConfig;
  typography: TypographyConfig;
  transitions: TransitionConfig;
  light: ThemeModeConfig;
  dark: ThemeModeConfig;
}

interface ThemeState {
  mode: Mode;
  theme: ThemeConfig;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  updatePrimaryColor: (shade: keyof ColorScale, value: string) => void;
  resetTheme: () => void;
  exportTheme: () => string;
  importTheme: (json: string) => boolean;
}

// ===== DEFAULT THEME =====

const DEFAULT_THEME: ThemeConfig = {
  id: 'default',
  name: 'Default Blue',
  primary: {
    '50': '239 246 255',
    '100': '219 234 254',
    '200': '191 219 254',
    '300': '147 197 253',
    '400': '96 165 250',
    '500': '59 130 246',
    '600': '37 99 235',
    '700': '29 78 216',
    '800': '30 64 175',
    '900': '30 58 138',
  },
  status: {
    success: { '50': '240 253 244', '500': '34 197 94', '700': '21 128 61' },
    warning: { '50': '254 252 232', '500': '234 179 8', '700': '161 98 7' },
    error: { '50': '254 242 242', '500': '239 68 68', '700': '185 28 28' },
    info: { '50': '239 246 255', '500': '59 130 246', '700': '29 78 216' },
  },
  layout: {
    sidebarWidth: '280px',
    sidebarCollapsedWidth: '64px',
    headerHeight: '64px',
  },
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  typography: {
    fontSans: "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
    fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  transitions: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  light: {
    background: '255 255 255',
    surface: '249 250 251',
    surfaceElevated: '255 255 255',
    border: '229 231 235',
    textPrimary: '17 24 39',
    textSecondary: '107 114 128',
    textMuted: '156 163 175',
  },
  dark: {
    background: '17 24 39',
    surface: '31 41 55',
    surfaceElevated: '55 65 81',
    border: '75 85 99',
    textPrimary: '249 250 251',
    textSecondary: '156 163 175',
    textMuted: '107 114 128',
  },
};

// ===== CSS VARIABLE INJECTION =====

function injectThemeVariables(theme: ThemeConfig, mode: Mode): void {
  const root = document.documentElement;

  requestAnimationFrame(() => {
    // Primary colors
    Object.entries(theme.primary).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, value);
    });

    // Status colors
    Object.entries(theme.status).forEach(([status, colors]) => {
      Object.entries(colors).forEach(([shade, value]) => {
        root.style.setProperty(`--color-${status}-${shade}`, value);
      });
    });

    // Layout
    root.style.setProperty('--sidebar-width', theme.layout.sidebarWidth);
    root.style.setProperty('--sidebar-collapsed-width', theme.layout.sidebarCollapsedWidth);
    root.style.setProperty('--header-height', theme.layout.headerHeight);

    // Border radius
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });

    // Typography
    root.style.setProperty('--font-sans', theme.typography.fontSans);
    root.style.setProperty('--font-mono', theme.typography.fontMono);

    // Transitions
    root.style.setProperty('--transition-fast', theme.transitions.fast);
    root.style.setProperty('--transition-normal', theme.transitions.normal);
    root.style.setProperty('--transition-slow', theme.transitions.slow);

    // Mode-specific colors
    const modeConfig = mode === 'dark' ? theme.dark : theme.light;
    root.style.setProperty('--color-background', modeConfig.background);
    root.style.setProperty('--color-surface', modeConfig.surface);
    root.style.setProperty('--color-surface-elevated', modeConfig.surfaceElevated);
    root.style.setProperty('--color-border', modeConfig.border);
    root.style.setProperty('--color-text-primary', modeConfig.textPrimary);
    root.style.setProperty('--color-text-secondary', modeConfig.textSecondary);
    root.style.setProperty('--color-text-muted', modeConfig.textMuted);

    // Toggle dark class
    if (mode === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  });
}

// ===== STORE =====

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'light',
      theme: DEFAULT_THEME,

      setMode: (mode) => {
        set({ mode });
        injectThemeVariables(get().theme, mode);
      },

      toggleMode: () => {
        const newMode = get().mode === 'light' ? 'dark' : 'light';
        set({ mode: newMode });
        injectThemeVariables(get().theme, newMode);
      },

      updateTheme: (updates) => {
        const newTheme = { ...get().theme, ...updates };
        set({ theme: newTheme });
        injectThemeVariables(newTheme, get().mode);
      },

      updatePrimaryColor: (shade, value) => {
        const newTheme = {
          ...get().theme,
          primary: { ...get().theme.primary, [shade]: value },
        };
        set({ theme: newTheme });
        injectThemeVariables(newTheme, get().mode);
      },

      resetTheme: () => {
        set({ theme: DEFAULT_THEME });
        injectThemeVariables(DEFAULT_THEME, get().mode);
      },

      exportTheme: () => {
        return JSON.stringify(get().theme, null, 2);
      },

      importTheme: (json) => {
        try {
          const imported = JSON.parse(json) as ThemeConfig;
          if (!imported.id || !imported.primary) return false;
          set({ theme: imported });
          injectThemeVariables(imported, get().mode);
          return true;
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ mode: state.mode, theme: state.theme }),
    }
  )
);

// ===== INITIALIZER HOOK =====

export function useThemeInitializer(): void {
  const { theme, mode } = useThemeStore();

  useEffect(() => {
    injectThemeVariables(theme, mode);
  }, [theme, mode]);
}
