// Local font loader — uses self-hosted fontsource packages, no external requests.

const SYSTEM_FONT_PREFIXES = ['ui-', 'system-ui', 'sans-serif', 'serif', 'monospace', 'inherit'];

const loadedFonts = new Set<string>();

function importFontCss(fontFamily: string): Promise<unknown> | undefined {
  switch (fontFamily) {
    case 'Fira Sans':
      return import('@fontsource/fira-sans/400.css');
    case 'Fira Sans Condensed':
      return import('@fontsource/fira-sans-condensed/500.css');
    default:
      return undefined;
  }
}

export function loadLocalFont(fontFamily: string, weight = '400'): void {
  if (SYSTEM_FONT_PREFIXES.some((p) => fontFamily.startsWith(p))) return;

  const key = `${fontFamily}:${weight}`;
  if (loadedFonts.has(key)) return;
  loadedFonts.add(key);

  importFontCss(fontFamily)?.catch(() => undefined);
}
