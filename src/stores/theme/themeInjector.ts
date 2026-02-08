import type {
  BorderRadiusConfig,
  ColorScale,
  Mode,
  ShadowConfig,
  SpacingConfig,
  StatusColors,
  ThemeConfig,
  ThemeModeConfig,
} from './types';

type ColorShade = keyof ColorScale;

const COLOR_SHADES: ColorShade[] = [
  '50', '100', '200', '300', '400', '500', '600', '700', '800', '900',
];
const STATUS_KEYS = ['success', 'warning', 'error', 'info'] as const;
const STATUS_SHADES = ['50', '100', '200', '500', '700'] as const;
const RADIUS_KEYS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;
const SHADOW_KEYS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

// Spacing multipliers for generating CSS custom properties (--space-0, --space-1, etc.)
// These values are multiplied by the base unit (default 4px) to create the spacing scale
const SPACE_MULTIPLIER_3 = 3;
const SPACE_MULTIPLIER_4 = 4;
const SPACE_MULTIPLIER_5 = 5;
const SPACE_MULTIPLIER_6 = 6;
const SPACE_MULTIPLIER_8 = 8;
const SPACE_MULTIPLIER_10 = 10;
const SPACE_MULTIPLIER_12 = 12;
const SPACE_MULTIPLIER_16 = 16;
const SPACE_MULTIPLIER_20 = 20;
const SPACE_MULTIPLIER_24 = 24;
const SPACE_MULTIPLIER_32 = 32;
const SPACE_MULTIPLIER_40 = 40;
const SPACE_MULTIPLIER_48 = 48;
const SPACE_MULTIPLIER_64 = 64;

const SPACING_MULTIPLIERS = [
  0, 1, 2,
  SPACE_MULTIPLIER_3, SPACE_MULTIPLIER_4, SPACE_MULTIPLIER_5, SPACE_MULTIPLIER_6,
  SPACE_MULTIPLIER_8, SPACE_MULTIPLIER_10, SPACE_MULTIPLIER_12, SPACE_MULTIPLIER_16,
  SPACE_MULTIPLIER_20, SPACE_MULTIPLIER_24, SPACE_MULTIPLIER_32, SPACE_MULTIPLIER_40,
  SPACE_MULTIPLIER_48, SPACE_MULTIPLIER_64,
] as const;

function injectColorScale(root: HTMLElement, prefix: string, scale: ColorScale): void {
  COLOR_SHADES.forEach((shade) => {
    root.style.setProperty(`--color-${prefix}-${shade}`, scale[shade]);
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
  // Backgrounds
  root.style.setProperty('--color-background', modeConfig.backgrounds.page);
  root.style.setProperty('--color-surface', modeConfig.backgrounds.surface);
  root.style.setProperty('--color-surface-elevated', modeConfig.backgrounds.surfaceElevated);
  root.style.setProperty('--color-surface-sunken', modeConfig.backgrounds.surfaceSunken);
  root.style.setProperty('--color-overlay', modeConfig.backgrounds.overlay);

  // Text
  root.style.setProperty('--color-text-primary', modeConfig.text.primary);
  root.style.setProperty('--color-text-secondary', modeConfig.text.secondary);
  root.style.setProperty('--color-text-muted', modeConfig.text.muted);
  root.style.setProperty('--color-text-disabled', modeConfig.text.disabled);
  root.style.setProperty('--color-text-inverse', modeConfig.text.inverse);
  root.style.setProperty('--color-link', modeConfig.text.link);
  root.style.setProperty('--color-link-hover', modeConfig.text.linkHover);

  // Borders
  root.style.setProperty('--color-border', modeConfig.borders.default);
  root.style.setProperty('--color-border-strong', modeConfig.borders.strong);
  root.style.setProperty('--color-border-subtle', modeConfig.borders.subtle);
  root.style.setProperty('--color-border-focus', modeConfig.borders.focus);
  root.style.setProperty('--color-divider', modeConfig.borders.divider);
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
  root.style.setProperty('--transition-easing', theme.transitions.easing);
}

function injectSpacingVariables(root: HTMLElement, spacing: SpacingConfig): void {
  SPACING_MULTIPLIERS.forEach((multiplier) => {
    const value = spacing.baseUnit * multiplier;
    root.style.setProperty(`--space-${multiplier}`, `${value}px`);
  });
  root.style.setProperty('--spacing-base-unit', `${spacing.baseUnit}px`);
}

function injectShadowVariables(root: HTMLElement, shadows: ShadowConfig): void {
  SHADOW_KEYS.forEach((key) => {
    root.style.setProperty(`--shadow-${key}`, shadows[key]);
  });
}

export function injectThemeVariables(theme: ThemeConfig, mode: Mode): void {
  const root = document.documentElement;

  requestAnimationFrame(() => {
    injectColorScale(root, 'primary', theme.primary);
    injectColorScale(root, 'secondary', theme.secondary);
    injectColorScale(root, 'neutral', theme.neutral);
    injectStatusColors(root, theme.status);
    injectBorderRadius(root, theme.borderRadius);
    injectSpacingVariables(root, theme.spacing);
    injectShadowVariables(root, theme.shadows);
    injectLayoutVariables(root, theme);
    injectTypographyVariables(root, theme);
    injectTransitionVariables(root, theme);

    const modeConfig = mode === 'dark' ? theme.dark : theme.light;
    injectModeColors(root, modeConfig);

    if (mode === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  });
}
