import type {
  BorderRadiusConfig,
  ColorScale,
  Mode,
  StatusColors,
  ThemeConfig,
  ThemeModeConfig,
} from './types';

type ColorShade = keyof ColorScale;

const COLOR_SHADES: ColorShade[] = [
  '50', '100', '200', '300', '400', '500', '600', '700', '800', '900',
];
const STATUS_KEYS = ['success', 'warning', 'error', 'info'] as const;
const STATUS_SHADES = ['50', '500', '700'] as const;
const RADIUS_KEYS = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;

function injectPrimaryColors(root: HTMLElement, primary: ColorScale): void {
  COLOR_SHADES.forEach((shade) => {
    root.style.setProperty(`--color-primary-${shade}`, primary[shade]);
  });
}

function injectStatusColors(root: HTMLElement, status: StatusColors): void {
  STATUS_KEYS.forEach((statusKey) => {
    const colors = status[statusKey];
    STATUS_SHADES.forEach((shade) => {
      root.style.setProperty(`--color-${statusKey}-${shade}`, colors[shade]);
    });
  });
}

function injectBorderRadius(root: HTMLElement, radius: BorderRadiusConfig): void {
  RADIUS_KEYS.forEach((key) => {
    root.style.setProperty(`--radius-${key}`, radius[key]);
  });
}

function injectModeColors(root: HTMLElement, modeConfig: ThemeModeConfig): void {
  root.style.setProperty('--color-background', modeConfig.background);
  root.style.setProperty('--color-surface', modeConfig.surface);
  root.style.setProperty('--color-surface-elevated', modeConfig.surfaceElevated);
  root.style.setProperty('--color-border', modeConfig.border);
  root.style.setProperty('--color-text-primary', modeConfig.textPrimary);
  root.style.setProperty('--color-text-secondary', modeConfig.textSecondary);
  root.style.setProperty('--color-text-muted', modeConfig.textMuted);
}

function injectLayoutVariables(root: HTMLElement, theme: ThemeConfig): void {
  root.style.setProperty('--sidebar-width', theme.layout.sidebarWidth);
  root.style.setProperty('--sidebar-collapsed-width', theme.layout.sidebarCollapsedWidth);
  root.style.setProperty('--header-height', theme.layout.headerHeight);
}

function injectTypographyVariables(root: HTMLElement, theme: ThemeConfig): void {
  root.style.setProperty('--font-sans', theme.typography.fontSans);
  root.style.setProperty('--font-mono', theme.typography.fontMono);
}

function injectTransitionVariables(root: HTMLElement, theme: ThemeConfig): void {
  root.style.setProperty('--transition-fast', theme.transitions.fast);
  root.style.setProperty('--transition-normal', theme.transitions.normal);
  root.style.setProperty('--transition-slow', theme.transitions.slow);
}

export function injectThemeVariables(theme: ThemeConfig, mode: Mode): void {
  const root = document.documentElement;

  requestAnimationFrame(() => {
    injectPrimaryColors(root, theme.primary);
    injectStatusColors(root, theme.status);
    injectBorderRadius(root, theme.borderRadius);
    injectLayoutVariables(root, theme);
    injectTypographyVariables(root, theme);
    injectTransitionVariables(root, theme);

    const modeConfig = mode === 'dark' ? theme.dark : theme.light;
    injectModeColors(root, modeConfig);

    if (mode === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  });
}
