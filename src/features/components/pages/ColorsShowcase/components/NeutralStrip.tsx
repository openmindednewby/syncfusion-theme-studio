import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/utils/helpers';

import { NEUTRAL_CODE_SNIPPET, NEUTRAL_STRIP_COLORS } from '../data/colorSectionsData';
import hexToLuminance from '../utils/hexToLuminance';

const LUMINANCE_THRESHOLD = 0.5;
const STRIP_WIDTH = 81;
const STRIP_HEIGHT = 137;
const TITLE_FONT_SIZE = 11;
const HEX_FONT_SIZE = 10;
const FONT_WEIGHT_BOLD = 700;
const FONT_WEIGHT_REGULAR = 400;
const LABEL_OPACITY = 0.8;
const TEXT_COLOR_DARK = '#2B2C2C';
const TEXT_COLOR_LIGHT = '#FFFFFF';
const BORDER_COLOR_LIGHT = '#E5E5E5';
const FONT_FAMILY = "'DM Sans', sans-serif";
const MAX_DEMO_COLORS = 3;

const NeutralDemo = (): JSX.Element => (
  <div className="flex flex-col gap-1 rounded-lg border border-border-subtle p-4">
    {NEUTRAL_STRIP_COLORS.slice(0, MAX_DEMO_COLORS).map((color) => (
      <span key={color.hex} className="text-sm" style={{ color: color.hex }}>
        {color.title} {FM('components.colorsShowcase.demo.sampleText')}
      </span>
    ))}
  </div>
);

const NeutralStrip = (): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.colorsShowcase.neutralTitle')}
    </h3>
    <div className="flex flex-wrap gap-2">
      {NEUTRAL_STRIP_COLORS.map((color) => {
        const isLight = hexToLuminance(color.hex) > LUMINANCE_THRESHOLD;
        const textColor = isLight ? TEXT_COLOR_DARK : TEXT_COLOR_LIGHT;
        return (
          <div
            key={color.hex}
            className="flex flex-col justify-between rounded-md"
            style={{
              width: STRIP_WIDTH,
              height: STRIP_HEIGHT,
              backgroundColor: color.hex,
              color: textColor,
              padding: '10px 8px',
              border: isLight ? `1px solid ${BORDER_COLOR_LIGHT}` : undefined,
              fontFamily: FONT_FAMILY,
            }}
          >
            <span style={{ fontSize: TITLE_FONT_SIZE, fontWeight: FONT_WEIGHT_BOLD }}>{color.title}</span>
            <span style={{ fontSize: HEX_FONT_SIZE, fontWeight: FONT_WEIGHT_REGULAR, opacity: LABEL_OPACITY }}>{color.hex}</span>
          </div>
        );
      })}
    </div>
    <NeutralDemo />
    <CopyableCodeSnippet code={NEUTRAL_CODE_SNIPPET} />
  </section>
);

export default NeutralStrip;
