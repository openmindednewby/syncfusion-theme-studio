import { isValueDefined } from '@/utils/is';

import hexToLuminance from '../utils/hexToLuminance';

import type { ColorCard as ColorCardData } from '../data/colorSectionsData';

function getBackgroundColor(card: ColorCardData): string | undefined {
  if (isValueDefined(card.gradient)) return undefined;
  if (isValueDefined(card.alpha)) return `rgba(0, 0, 0, ${card.alpha})`;
  return card.hex;
}

const LUMINANCE_THRESHOLD = 0.5;
const CARD_WIDTH = 303;
const CARD_HEIGHT = 137;
const TITLE_FONT_SIZE = 16;
const HEX_FONT_SIZE = 14;
const RGB_FONT_SIZE = 12;
const FONT_WEIGHT_BOLD = 700;
const FONT_WEIGHT_REGULAR = 400;
const LABEL_OPACITY = 0.8;
const TEXT_COLOR_DARK = '#2B2C2C';
const TEXT_COLOR_LIGHT = '#FFFFFF';
const BORDER_COLOR_LIGHT = '#E5E5E5';
const FONT_FAMILY = "'DM Sans', sans-serif";

interface ColorCardProps {
  card: ColorCardData;
}

const ColorCard = ({ card }: ColorCardProps): JSX.Element => {
  const hasAlpha = isValueDefined(card.alpha);
  const isLight = isValueDefined(card.alpha)
    ? card.alpha < LUMINANCE_THRESHOLD
    : hexToLuminance(card.hex) > LUMINANCE_THRESHOLD;
  const textColor = isLight ? TEXT_COLOR_DARK : TEXT_COLOR_LIGHT;
  const backgroundColor = getBackgroundColor(card);
  const backgroundImage = card.gradient ?? undefined;

  return (
    <div
      className="flex flex-col justify-between rounded-lg"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor,
        backgroundImage,
        boxShadow: card.shadow,
        color: textColor,
        padding: '16px 20px',
        border: isLight ? `1px solid ${BORDER_COLOR_LIGHT}` : undefined,
        fontFamily: FONT_FAMILY,
      }}
    >
      <span style={{ fontSize: TITLE_FONT_SIZE, fontWeight: FONT_WEIGHT_BOLD, letterSpacing: '-0.015em' }}>
        {card.title}
      </span>
      <div className="flex items-end justify-between">
        <span style={{ fontSize: HEX_FONT_SIZE, fontWeight: FONT_WEIGHT_BOLD }}>{card.hex}</span>
        <span style={{ fontSize: RGB_FONT_SIZE, fontWeight: FONT_WEIGHT_REGULAR, opacity: LABEL_OPACITY }}>
          {hasAlpha ? `alpha: ${card.alpha}` : card.rgb}
        </span>
      </div>
    </div>
  );
};

export default ColorCard;
