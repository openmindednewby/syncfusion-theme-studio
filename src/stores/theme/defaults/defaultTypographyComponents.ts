// Default typography component configuration

import { TypographyTextColor } from '../types/typographyTextColor';

import type { TypographyComponentsConfig } from '../types/typographyComponentTypes';

export const DEFAULT_TYPOGRAPHY_COMPONENTS: TypographyComponentsConfig = {
  h1: { fontSize: '3xl', fontWeight: 'bold', lineHeight: 'tight', letterSpacing: 'tight', color: TypographyTextColor.Primary },
  h2: { fontSize: '2xl', fontWeight: 'bold', lineHeight: 'tight', letterSpacing: 'tight', color: TypographyTextColor.Primary },
  h3: { fontSize: 'lg', fontWeight: 'semibold', lineHeight: 'normal', letterSpacing: 'normal', color: TypographyTextColor.Primary },
  h4: { fontSize: 'base', fontWeight: 'semibold', lineHeight: 'normal', letterSpacing: 'normal', color: TypographyTextColor.Primary },
  body: { fontSize: 'base', fontWeight: 'normal', lineHeight: 'normal', letterSpacing: 'normal', color: TypographyTextColor.Primary },
  bodySmall: { fontSize: 'sm', fontWeight: 'normal', lineHeight: 'normal', letterSpacing: 'normal', color: TypographyTextColor.Primary },
  secondary: { fontSize: 'base', fontWeight: 'normal', lineHeight: 'normal', letterSpacing: 'normal', color: TypographyTextColor.Secondary },
  muted: { fontSize: 'sm', fontWeight: 'normal', lineHeight: 'normal', letterSpacing: 'normal', color: TypographyTextColor.Muted },
  caption: { fontSize: 'xs', fontWeight: 'normal', lineHeight: 'normal', letterSpacing: 'normal', color: TypographyTextColor.Muted },
  label: { fontSize: 'sm', fontWeight: 'medium', lineHeight: 'normal', letterSpacing: 'normal', color: TypographyTextColor.Primary },
};
