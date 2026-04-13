import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';

import type { ColorCard } from '../data/colorSectionsData';

const DEMO_HEIGHT = 120;
const SIDEBAR_WIDTH = 48;
const PANEL_GAP = 2;
const GRID_HEADER_HEIGHT = 28;
const CHECKERBOARD_SIZE = 10;
const CHECKERBOARD_COLOR = '#d1d5db';
const FALLBACK_COLOR = '#888';
const CARD_ELEVATION_MD = '0px 5px 15px rgba(0,0,0,0.15)';
const CARD_ELEVATION_LG = '0px 5px 25px rgba(0,0,0,0.2)';
const PILL_PADDING_X = 16;
const PILL_PADDING_Y = 6;
const PILL_RADIUS = 9999;
const MAX_TRANSPARENCY_CARDS = 5;

interface ColorSectionDemoProps {
  titleKey: string;
  cards: ColorCard[];
}

function findCardHex(cards: ColorCard[], title: string): string {
  return cards.find((c) => c.title === title)?.hex ?? FALLBACK_COLOR;
}

const LightThemeDemo = ({ cards }: { cards: ColorCard[] }): JSX.Element => (
  <div className="flex overflow-hidden rounded-md" style={{ height: DEMO_HEIGHT }}>
    <div style={{ width: SIDEBAR_WIDTH, backgroundColor: findCardHex(cards, 'Side Menu') }} />
    <div className="flex flex-1 flex-col" style={{ gap: PANEL_GAP }}>
      <div className="flex-1" style={{ backgroundColor: findCardHex(cards, 'Background') }} />
      <div style={{ height: GRID_HEADER_HEIGHT, backgroundColor: findCardHex(cards, 'Grid Header') }} />
      <div className="flex-1 border-t" style={{ borderColor: findCardHex(cards, 'Border Stroke'), backgroundColor: findCardHex(cards, 'Accordion') }}>
        <div className="mx-3 mt-2 h-3 w-20 rounded-sm" style={{ backgroundColor: findCardHex(cards, 'Selection') }} />
      </div>
    </div>
  </div>
);

const DarkThemeDemo = ({ cards }: { cards: ColorCard[] }): JSX.Element => (
  <div className="flex overflow-hidden rounded-md" style={{ height: DEMO_HEIGHT }}>
    <div style={{ width: SIDEBAR_WIDTH, backgroundColor: findCardHex(cards, 'Side Menu') }} />
    <div className="flex flex-1 flex-col" style={{ gap: PANEL_GAP }}>
      <div className="flex-1" style={{ backgroundColor: findCardHex(cards, 'Background') }} />
      <div style={{ height: GRID_HEADER_HEIGHT, backgroundColor: findCardHex(cards, 'Grid Header') }} />
      <div className="flex-1 border-t" style={{ borderColor: findCardHex(cards, 'Border Stroke'), backgroundColor: findCardHex(cards, 'Accordion') }}>
        <div className="mx-3 mt-2 h-3 w-20 rounded-sm" style={{ backgroundColor: findCardHex(cards, 'Selection') }} />
      </div>
    </div>
  </div>
);

const TransparenciesDemo = ({ cards }: { cards: ColorCard[] }): JSX.Element => (
  <div
    className="relative flex items-center gap-3 overflow-hidden rounded-md p-4"
    style={{
      height: DEMO_HEIGHT,
      backgroundImage: `repeating-conic-gradient(${CHECKERBOARD_COLOR} 0% 25%, transparent 0% 50%)`,
      backgroundSize: `${CHECKERBOARD_SIZE * 2}px ${CHECKERBOARD_SIZE * 2}px`,
    }}
  >
    {cards.slice(0, MAX_TRANSPARENCY_CARDS).map((card) => (
      <div
        key={card.title}
        className="h-16 w-16 rounded-md"
        style={{ backgroundColor: `rgba(0,0,0,${card.alpha ?? 0})` }}
      />
    ))}
  </div>
);

const ElevationDemo = (): JSX.Element => (
  <div className="flex items-center gap-6 rounded-md bg-gray-50 p-4" style={{ height: DEMO_HEIGHT }}>
    <div className="h-20 w-32 rounded-lg bg-white" style={{ boxShadow: CARD_ELEVATION_MD }} />
    <div className="h-20 w-32 rounded-lg bg-white" style={{ boxShadow: CARD_ELEVATION_LG }} />
  </div>
);

const ScrimDemo = (): JSX.Element => (
  <div className="relative overflow-hidden rounded-md bg-sky-200" style={{ height: DEMO_HEIGHT }}>
    <div className="flex h-full items-center justify-center text-sm font-medium text-sky-900">{FM('components.colorsShowcase.demo.contentBehindScrim')}</div>
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)' }}
    />
  </div>
);

const PrimaryDemo = ({ cards }: { cards: ColorCard[] }): JSX.Element => (
  <div className="flex flex-wrap items-center gap-3 rounded-md bg-white p-4" style={{ height: DEMO_HEIGHT }}>
    {cards.map((card) => (
      <span
        key={card.title}
        className="text-xs font-medium"
        style={{
          backgroundColor: card.hex,
          padding: `${PILL_PADDING_Y}px ${PILL_PADDING_X}px`,
          borderRadius: PILL_RADIUS,
        }}
      >
        {card.title}
      </span>
    ))}
  </div>
);

const BrandDemo = ({ cards }: { cards: ColorCard[] }): JSX.Element => {
  const highlight = findCardHex(cards, 'Highlight');
  return (
    <div className="flex items-center gap-3 overflow-hidden rounded-md" style={{ height: DEMO_HEIGHT }}>
      <div className="h-full w-2" style={{ backgroundColor: highlight }} />
      {cards.filter((c) => c.title.startsWith('Dark')).map((card) => (
        <div
          key={card.title}
          className="flex h-20 w-28 items-center justify-center rounded-md text-xs font-medium"
          style={{ backgroundColor: card.hex, color: highlight }}
        >
          {card.title}
        </div>
      ))}
    </div>
  );
};

const SECTION_KEY_PREFIX = 'components.colorsShowcase.sections.';

const DEMO_RENDERERS: Record<string, (cards: ColorCard[]) => JSX.Element> = {
  lightTheme: (cards) => <LightThemeDemo cards={cards} />,
  darkTheme: (cards) => <DarkThemeDemo cards={cards} />,
  transparencies: (cards) => <TransparenciesDemo cards={cards} />,
  elevation: () => <ElevationDemo />,
  scrim: () => <ScrimDemo />,
  primary: (cards) => <PrimaryDemo cards={cards} />,
  brand: (cards) => <BrandDemo cards={cards} />,
};

const ColorSectionDemoComponent = ({ titleKey, cards }: ColorSectionDemoProps): JSX.Element | null => {
  const sectionId = titleKey.replace(SECTION_KEY_PREFIX, '');
  const renderer = DEMO_RENDERERS[sectionId];
  if (!renderer) return null;

  return (
    <div className="rounded-lg border border-border-subtle p-4">
      {renderer(cards)}
    </div>
  );
};

export const ColorSectionDemo = memo(ColorSectionDemoComponent);
