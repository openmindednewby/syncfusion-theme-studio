import { useState, useCallback, useRef, type ChangeEvent } from 'react';

import { useThemeStore } from '@/stores/useThemeStore';
import { isValueDefined } from '@/utils/is';

const DEBOUNCE_MS = 50;
const HEX_RADIX = 16;
const DEFAULT_RGB = '0 0 0';
const DEFAULT_HEX = '#000000';
const DARK_SHADE_THRESHOLD = 500;
const COLOR_SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;

// Convert RGB string "R G B" to hex "#RRGGBB"
function rgbToHex(rgb: string): string {
  const parts = rgb.split(' ').map(Number);
  const r = parts[0];
  const g = parts[1];
  const b = parts[2];
  const isValid = isValueDefined(r) && isValueDefined(g) && isValueDefined(b);
  if (!isValid) return DEFAULT_HEX;
  return `#${[r, g, b].map((x) => x.toString(HEX_RADIX).padStart(2, '0')).join('')}`;
}

// Convert hex "#RRGGBB" to RGB string "R G B"
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rPart = result?.[1];
  const gPart = result?.[2];
  const bPart = result?.[3];
  const hasValidParts = isValueDefined(rPart) && isValueDefined(gPart) && isValueDefined(bPart);
  if (!hasValidParts) return DEFAULT_RGB;
  return `${parseInt(rPart, HEX_RADIX)} ${parseInt(gPart, HEX_RADIX)} ${parseInt(bPart, HEX_RADIX)}`;
}

interface ColorPickerProps {
  label: string;
  value: string; // RGB string "R G B"
  onChange: (rgb: string) => void;
}

const ColorPicker = ({ label, onChange, value }: ColorPickerProps): JSX.Element => {
  const [hexValue, setHexValue] = useState(rgbToHex(value));
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newHex = e.target.value;
      setHexValue(newHex);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onChange(hexToRgb(newHex));
      }, DEBOUNCE_MS);
    },
    [onChange]
  );

  return (
    <div className="flex items-center gap-3">
      <input
        aria-label={`Pick color for ${label}`}
        className="h-8 w-8 cursor-pointer rounded border border-border"
        type="color"
        value={hexValue}
        onChange={handleChange}
      />
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  );
}

const ThemeEditorPage = (): JSX.Element => {
  const { theme, updatePrimaryColor, resetTheme, exportTheme, importTheme } = useThemeStore();
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState('');

  const handleExport = (): void => {
    const json = exportTheme();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${theme.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (): void => {
    setImportError('');
    const success = importTheme(importJson);
    if (success) setImportJson('');
    else setImportError('Invalid theme JSON');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Theme Editor</h2>
        <div className="flex gap-2">
          <button className="btn btn-secondary" type="button" onClick={resetTheme}>
            Reset to Default
          </button>
          <button className="btn btn-primary" type="button" onClick={handleExport}>
            Export Theme
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Primary Colors */}
        <div className="card">
          <h3 className="mb-4 text-lg font-semibold text-text-primary">Primary Colors</h3>
          <div className="grid grid-cols-2 gap-4">
            {COLOR_SHADES.map((shade) => (
              <ColorPicker
                key={shade}
                label={shade}
                value={theme.primary[shade]}
                onChange={(rgb) => updatePrimaryColor(shade, rgb)}
              />
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="card">
          <h3 className="mb-4 text-lg font-semibold text-text-primary">Live Preview</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <button className="btn btn-primary" type="button">
                Primary Button
              </button>
              <button className="btn btn-secondary" type="button">
                Secondary
              </button>
            </div>
            <div className="flex gap-2">
              {['50', '500', '900'].map((shade) => (
                <div
                  key={shade}
                  className={`flex h-12 w-12 items-center justify-center rounded bg-primary-${shade} text-xs font-bold ${
                    Number(shade) >= DARK_SHADE_THRESHOLD ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {shade}
                </div>
              ))}
            </div>
            <div className="rounded border border-border bg-surface p-4">
              <p className="text-text-primary">Primary text on surface</p>
              <p className="text-text-secondary">Secondary text</p>
              <p className="text-text-muted">Muted text</p>
            </div>
          </div>
        </div>

        {/* Import Theme */}
        <div className="card lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold text-text-primary">Import Theme</h3>
          <div className="space-y-4">
            <textarea
              className="input min-h-32 font-mono text-sm"
              placeholder="Paste theme JSON here..."
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
            />
            {importError !== '' && <p className="text-sm text-error-500">{importError}</p>}
            <button
              className="btn btn-secondary"
              disabled={importJson.trim() === ''}
              type="button"
              onClick={handleImport}
            >
              Import Theme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeEditorPage;
