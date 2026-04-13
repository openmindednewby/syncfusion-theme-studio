// Centralized environment variable configuration
// All VITE_* env vars should be accessed through this module

export const ENV = {
  defaultPreset: String(import.meta.env['VITE_DEFAULT_PRESET'] ?? ''),
  enableThemeStudio: import.meta.env['VITE_ENABLE_THEME_STUDIO'] !== 'false',
  enableComponents: import.meta.env['VITE_ENABLE_COMPONENTS'] !== 'false',
  enableForms: import.meta.env['VITE_ENABLE_FORMS'] !== 'false',
  enableProducts: import.meta.env['VITE_ENABLE_PRODUCTS'] !== 'false',
} as const;
