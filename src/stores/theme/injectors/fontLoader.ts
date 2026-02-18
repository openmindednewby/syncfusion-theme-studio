// Dynamic Google Font loader for theme-injected font families

const SYSTEM_FONT_PREFIXES = ['ui-', 'system-ui', 'sans-serif', 'serif', 'monospace', 'inherit'];

const loadedFonts = new Set<string>();

export function loadGoogleFont(fontFamily: string, weight = '400'): void {
  if (SYSTEM_FONT_PREFIXES.some((p) => fontFamily.startsWith(p))) return;

  const key = `${fontFamily}:${weight}`;
  if (loadedFonts.has(key)) return;
  loadedFonts.add(key);

  const encodedFamily = encodeURIComponent(fontFamily);
  const url = `https://fonts.googleapis.com/css2?family=${encodedFamily}:wght@${weight}&display=swap`;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}
