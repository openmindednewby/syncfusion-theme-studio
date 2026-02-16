// Typography component configuration types

import type { FontSizeScale, FontWeightScale, LetterSpacingScale, LineHeightScale } from './layoutTypes';
import type { TypographyTextColor } from './typographyTextColor';

export interface TypographyLevelConfig {
  fontSize: keyof FontSizeScale;
  fontWeight: keyof FontWeightScale;
  lineHeight: keyof LineHeightScale;
  letterSpacing: keyof LetterSpacingScale;
  color: TypographyTextColor;
}

export interface TypographyComponentsConfig {
  h1: TypographyLevelConfig;
  h2: TypographyLevelConfig;
  h3: TypographyLevelConfig;
  h4: TypographyLevelConfig;
  body: TypographyLevelConfig;
  bodySmall: TypographyLevelConfig;
  secondary: TypographyLevelConfig;
  muted: TypographyLevelConfig;
  caption: TypographyLevelConfig;
  label: TypographyLevelConfig;
}
