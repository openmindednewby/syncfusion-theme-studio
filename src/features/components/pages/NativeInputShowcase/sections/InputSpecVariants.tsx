/**
 * Input spec components for the spec section.
 * Textarea component extracted to keep InputSpecParts under 200 lines.
 */
import { FM } from '@/localization/utils/helpers';
import { Mode } from '@/stores/mode';

import {
  BORDER_RADIUS,
  FIGMA_BG_DARK,
  FIGMA_BG_LIGHT,
  FIGMA_BORDER_DARK,
  FIGMA_BORDER_LIGHT,
  FIGMA_PLACEHOLDER,
  FONT_FAMILY,
  FONT_SIZE,
  INPUT_WIDTH,
  LINE_HEIGHT,
  PADDING,
} from './InputSpecParts';

const TEXTAREA_HEIGHT = 90;

/** Textarea matching design spec multiline input */
export const SpecTextarea = ({ variant }: { variant: Mode }): JSX.Element => {
  const isLight = variant === Mode.Light;
  const bg = isLight ? FIGMA_BG_LIGHT : FIGMA_BG_DARK;
  const border = isLight ? FIGMA_BORDER_LIGHT : FIGMA_BORDER_DARK;

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: INPUT_WIDTH,
        height: TEXTAREA_HEIGHT,
        padding: PADDING,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: BORDER_RADIUS,
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SIZE,
        fontWeight: 400,
        lineHeight: LINE_HEIGHT,
        color: FIGMA_PLACEHOLDER,
      }}
    >
      {FM('components.inputs.textareaPlaceholder')}
    </div>
  );
};
