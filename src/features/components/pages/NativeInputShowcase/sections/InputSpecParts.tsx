/**
 * Sub-components for the input spec section.
 * Static visual representations matching exact design measurements.
 */
import { ChevronDirection } from '@/components/icons/chevronDirection';
import { SpecChevron, SpecCloseIcon, SpecSearchIcon } from '@/components/icons/SpecIcons';
import { FM } from '@/localization/utils/helpers';
import { Mode } from '@/stores/mode';
import { isValueDefined } from '@/utils/is';

/* Spec colors - exported for reuse in InputSpecSection */
export const FIGMA_BG_LIGHT = '#FFFFFF';
export const FIGMA_BG_DARK = '#1B2029';
export const FIGMA_BORDER_LIGHT = '#DFDFDF';
export const FIGMA_BORDER_DARK = '#39404B';
export const FIGMA_TEXT_LIGHT = '#1B2029';
export const FIGMA_TEXT_DARK = '#F3F3F3';
export const FIGMA_PLACEHOLDER = '#7B7B7B';

/* Input spec dimensions - exported for reuse in InputSpecVariants */
export const INPUT_WIDTH = 257;
export const INPUT_HEIGHT = 30;
export const BORDER_RADIUS = 4;
export const FONT_SIZE = 12;
export const LINE_HEIGHT = '14px';
export const FONT_FAMILY = "'Fira Sans', sans-serif";
export const PADDING = '8px 10px';

interface TextInputProps {
  variant: Mode;
  placeholder?: string;
  value?: string;
  showClear?: boolean;
}

/** Text input matching design spec "Input" component */
export const SpecTextInput = ({ variant, placeholder, value, showClear }: TextInputProps): JSX.Element => {
  const isLight = variant === Mode.Light;
  const bg = isLight ? FIGMA_BG_LIGHT : FIGMA_BG_DARK;
  const border = isLight ? FIGMA_BORDER_LIGHT : FIGMA_BORDER_DARK;
  const textColor = isLight ? FIGMA_TEXT_LIGHT : FIGMA_TEXT_DARK;
  const displayText = value ?? placeholder;
  const isPlaceholder = !isLight || !isValueDefined(value);

  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        width: INPUT_WIDTH,
        height: INPUT_HEIGHT,
        padding: PADDING,
        gap: 10,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: BORDER_RADIUS,
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SIZE,
        fontWeight: 400,
        lineHeight: LINE_HEIGHT,
        color: isPlaceholder ? FIGMA_PLACEHOLDER : textColor,
      }}
    >
      <span className="flex-1 truncate">{displayText}</span>
      {showClear === true ? (
        <span className="flex shrink-0 items-center" style={{ cursor: 'pointer' }}>
          <SpecCloseIcon color={FIGMA_PLACEHOLDER} />
        </span>
      ) : null}
    </div>
  );
};

/** Search input matching design spec search variant */
export const SpecSearchInput = ({ variant }: { variant: Mode }): JSX.Element => {
  const isLight = variant === Mode.Light;
  const bg = isLight ? FIGMA_BG_LIGHT : FIGMA_BG_DARK;
  const border = isLight ? FIGMA_BORDER_LIGHT : FIGMA_BORDER_DARK;

  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        width: INPUT_WIDTH,
        height: INPUT_HEIGHT,
        padding: '8px 5px 8px 8px',
        gap: 6,
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
      <SpecSearchIcon color={FIGMA_PLACEHOLDER} />
      <span className="flex-1 truncate">{FM('components.inputs.searchPlaceholder')}</span>
    </div>
  );
};

/** Spinner input matching design spec numeric spinner variant */
export const SpecSpinnerInput = ({ variant }: { variant: Mode }): JSX.Element => {
  const isLight = variant === Mode.Light;
  const bg = isLight ? FIGMA_BG_LIGHT : FIGMA_BG_DARK;
  const border = isLight ? FIGMA_BORDER_LIGHT : FIGMA_BORDER_DARK;
  const textColor = isLight ? FIGMA_TEXT_LIGHT : FIGMA_TEXT_DARK;
  const SPINNER_WIDTH = 24;
  const SPINNER_DEFAULT_VALUE = '0';

  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        width: INPUT_WIDTH,
        height: INPUT_HEIGHT,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          padding: PADDING,
          fontFamily: FONT_FAMILY,
          fontSize: FONT_SIZE,
          fontWeight: 400,
          lineHeight: LINE_HEIGHT,
          color: textColor,
        }}
      >
        {SPINNER_DEFAULT_VALUE}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: SPINNER_WIDTH,
          borderLeft: `1px solid ${border}`,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <SpecChevron color={textColor} direction={ChevronDirection.Up} />
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: `1px solid ${border}`,
            cursor: 'pointer',
          }}
        >
          <SpecChevron color={textColor} direction={ChevronDirection.Down} />
        </div>
      </div>
    </div>
  );
};

