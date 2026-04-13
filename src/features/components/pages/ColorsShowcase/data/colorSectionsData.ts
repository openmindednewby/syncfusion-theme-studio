interface ColorCard {
  title: string;
  hex: string;
  rgb: string;
  alpha?: number;
  gradient?: string;
  shadow?: string;
  themeField?: string;
}

interface ColorSection {
  titleKey: string;
  cards: ColorCard[];
  codeSnippet: string;
}

export const NEUTRAL_CODE_SNIPPET = `<span className="text-neutral-900">Primary</span>
<span className="text-neutral-500">Secondary</span>
<span className="text-neutral-300">Muted</span>`;

const LIGHT_THEME_SECTION: ColorSection = {
  titleKey: 'components.colorsShowcase.sections.lightTheme',
  cards: [
    { title: 'Accordion', hex: '#FFFFFF', rgb: '255, 255, 255', themeField: 'light.backgrounds.surfaceElevated' },
    { title: 'Grid Header', hex: '#F6F6F6', rgb: '246, 246, 246', themeField: 'light.backgrounds.surfaceSunken' },
    { title: 'Side Menu', hex: '#FAFBFC', rgb: '250, 251, 252', themeField: 'light.backgrounds.surface' },
    { title: 'Selection', hex: '#438191', rgb: '67, 129, 145' },
    { title: 'Border Stroke', hex: '#DFDFDF', rgb: '223, 223, 223', themeField: 'light.borders.default' },
    { title: 'Background', hex: '#FFFFFF', rgb: '255, 255, 255', themeField: 'light.backgrounds.page' },
  ],
  codeSnippet: `<div className="bg-page">
  <aside className="bg-surface" />
  <main className="bg-surface-elevated" />
</div>`,
};

const DARK_THEME_SECTION: ColorSection = {
  titleKey: 'components.colorsShowcase.sections.darkTheme',
  cards: [
    { title: 'Accordion', hex: '#262C39', rgb: '38, 44, 57', themeField: 'dark.backgrounds.surface' },
    { title: 'Grid Header', hex: '#39404B', rgb: '57, 64, 75', themeField: 'dark.backgrounds.surfaceElevated' },
    { title: 'Side Menu', hex: '#111319', rgb: '17, 19, 25', themeField: 'dark.backgrounds.surfaceSunken' },
    { title: 'Selection', hex: '#00A1C9', rgb: '0, 161, 201' },
    { title: 'Border Stroke', hex: '#DFDFDF', rgb: '223, 223, 223', themeField: 'dark.borders.default' },
    { title: 'Background', hex: '#1B2029', rgb: '27, 32, 41', themeField: 'dark.backgrounds.page' },
  ],
  codeSnippet: `<div className="dark bg-page">
  <aside className="bg-surface-sunken" />
  <main className="bg-surface" />
</div>`,
};

const TRANSPARENCIES_SECTION: ColorSection = {
  titleKey: 'components.colorsShowcase.sections.transparencies',
  cards: [
    { title: 'Alpha 05', hex: '#000000', rgb: '0, 0, 0', alpha: 0.05 },
    { title: 'Alpha 10', hex: '#000000', rgb: '0, 0, 0', alpha: 0.1 },
    { title: 'Alpha 20', hex: '#000000', rgb: '0, 0, 0', alpha: 0.2 },
    { title: 'Alpha 40', hex: '#000000', rgb: '0, 0, 0', alpha: 0.4 },
    { title: 'Alpha 50', hex: '#000000', rgb: '0, 0, 0', alpha: 0.5 },
    { title: 'Alpha 60', hex: '#000000', rgb: '0, 0, 0', alpha: 0.6 },
    { title: 'Alpha 80', hex: '#000000', rgb: '0, 0, 0', alpha: 0.8 },
    { title: 'Alpha 90', hex: '#000000', rgb: '0, 0, 0', alpha: 0.9 },
    { title: 'Alpha 95', hex: '#000000', rgb: '0, 0, 0', alpha: 0.95 },
  ],
  codeSnippet: `<div className="bg-black/5" />
<div className="bg-black/20" />
<div className="bg-black/60" />`,
};

const ELEVATION_SECTION: ColorSection = {
  titleKey: 'components.colorsShowcase.sections.elevation',
  cards: [
    { title: 'Shadow MD', hex: '#FFFFFF', rgb: '255, 255, 255', shadow: '0px 5px 15px rgba(0, 0, 0, 0.15)' },
    { title: 'Shadow LG', hex: '#FFFFFF', rgb: '255, 255, 255', shadow: '0px 5px 25px rgba(0, 0, 0, 0.2)' },
  ],
  codeSnippet: `<div className="shadow-md" />
<div className="shadow-lg" />`,
};

const SCRIM_SECTION: ColorSection = {
  titleKey: 'components.colorsShowcase.sections.scrim',
  cards: [
    { title: 'Scrim', hex: '#000000', rgb: '0, 0, 0', gradient: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)' },
  ],
  codeSnippet: `<div style={{
  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)'
}} />`,
};

const PRIMARY_SECTION: ColorSection = {
  titleKey: 'components.colorsShowcase.sections.primary',
  cards: [
    { title: 'Solid 05', hex: '#F3F3F3', rgb: '243, 243, 243' },
    { title: 'Solid 10', hex: '#E7E7E7', rgb: '231, 231, 231' },
    { title: 'Solid 20', hex: '#D0D0D0', rgb: '208, 208, 208' },
    { title: 'Solid 40', hex: '#A1A1A1', rgb: '161, 161, 161' },
  ],
  codeSnippet: `<div className="bg-neutral-50" />
<div className="bg-neutral-100" />
<div className="bg-neutral-200" />`,
};

const NEUTRAL_COLORS = [
  { title: 'Neutral 1', hex: '#211E20', rgb: '33, 30, 32' },
  { title: 'Neutral 2', hex: '#ECEDEE', rgb: '236, 237, 238' },
  { title: 'Neutral 3', hex: '#DFE2E4', rgb: '223, 226, 228' },
  { title: 'Neutral 4', hex: '#C1C4C5', rgb: '193, 196, 197' },
  { title: 'Neutral 5', hex: '#878A8B', rgb: '135, 138, 139' },
  { title: 'Neutral 6', hex: '#6A6F71', rgb: '106, 111, 113' },
  { title: 'Neutral 7', hex: '#4E5254', rgb: '78, 82, 84' },
];

const BRAND_SECTION: ColorSection = {
  titleKey: 'components.colorsShowcase.sections.brand',
  cards: [
    { title: 'Highlight', hex: '#00B5E2', rgb: '0, 181, 226' },
    { title: 'Dark BG 1', hex: '#1B2029', rgb: '27, 32, 41' },
    { title: 'Dark BG 2', hex: '#262C39', rgb: '38, 44, 57' },
    { title: 'Dark BG 3', hex: '#39404B', rgb: '57, 64, 75' },
  ],
  codeSnippet: `<span style={{ color: '#00B5E2' }}>Highlight</span>`,
};

export const COLOR_SECTIONS: ColorSection[] = [
  LIGHT_THEME_SECTION,
  DARK_THEME_SECTION,
  TRANSPARENCIES_SECTION,
  ELEVATION_SECTION,
  SCRIM_SECTION,
  PRIMARY_SECTION,
  BRAND_SECTION,
];

export const NEUTRAL_STRIP_COLORS = NEUTRAL_COLORS;

export type { ColorCard, ColorSection };
