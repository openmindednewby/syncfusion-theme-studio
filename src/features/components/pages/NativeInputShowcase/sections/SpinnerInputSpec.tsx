/**
 * SpinnerInputSpec - Static visual representation of the horizontal spinner
 * matching exact design spec measurements.
 */
import { ChevronDirection } from '@/components/icons/chevronDirection';
import { SpecChevron } from '@/components/icons/SpecIcons';
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
  INPUT_HEIGHT,
  LINE_HEIGHT,
} from './InputSpecParts';

const SPINNER2_WIDTH = 250;
const SPINNER2_LEFT_BTN_WIDTH = 30;
const SPINNER2_RIGHT_BTN_WIDTH = 33;
const SPINNER2_DEFAULT_VALUE = '0';

/** Horizontal spinner matching design spec "spinner2" variant */
export const SpinnerInputSpec = ({ variant }: { variant: Mode }): JSX.Element => {
  const isLight = variant === Mode.Light;
  const bg = isLight ? FIGMA_BG_LIGHT : FIGMA_BG_DARK;
  const border = isLight ? FIGMA_BORDER_LIGHT : FIGMA_BORDER_DARK;
  const chevronColor = FIGMA_PLACEHOLDER;

  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        width: SPINNER2_WIDTH,
        height: INPUT_HEIGHT,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: SPINNER2_LEFT_BTN_WIDTH,
          borderRight: `1px solid ${border}`,
          cursor: 'pointer',
        }}
      >
        <SpecChevron color={chevronColor} direction={ChevronDirection.Left} />
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT_FAMILY,
          fontSize: FONT_SIZE,
          fontWeight: 400,
          lineHeight: LINE_HEIGHT,
          color: chevronColor,
        }}
      >
        {SPINNER2_DEFAULT_VALUE}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: SPINNER2_RIGHT_BTN_WIDTH,
          borderLeft: `1px solid ${border}`,
          cursor: 'pointer',
        }}
      >
        <SpecChevron color={chevronColor} direction={ChevronDirection.Right} />
      </div>
    </div>
  );
};
