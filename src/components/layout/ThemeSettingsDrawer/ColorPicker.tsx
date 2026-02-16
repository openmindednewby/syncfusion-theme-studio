import { useState, useCallback, useRef, type ChangeEvent } from 'react';

import { isValueDefined } from '@/utils/is';

const DEBOUNCE_MS = 50;
const HEX_RADIX = 16;
const DEFAULT_RGB = '0 0 0';
const DEFAULT_HEX = '#000000';

function rgbToHex(rgb: string): string {
  if (rgb === '') return DEFAULT_HEX;
  const parts = rgb.split(' ').map(Number);
  const r = parts[0];
  const g = parts[1];
  const b = parts[2];
  const isValid = isValueDefined(r) && isValueDefined(g) && isValueDefined(b);
  if (!isValid) return DEFAULT_HEX;
  return `#${[r, g, b].map((x) => x.toString(HEX_RADIX).padStart(2, '0')).join('')}`;
}

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
  value: string;
  onChange: (rgb: string) => void;
  compact?: boolean;
}

export const ColorPicker = ({ compact = false, label, onChange, value }: ColorPickerProps): JSX.Element => {
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

  if (compact) 
    return (
      <div className="color-picker-compact group flex flex-col items-center gap-1.5">
        <div className="relative">
          <input
            aria-label={`Pick color for ${label}`}
            className="color-input h-10 w-10 min-h-[40px] min-w-[40px] cursor-pointer rounded-lg border-2 border-border transition-all duration-200 hover:border-primary-400 hover:shadow-md"
            type="color"
            value={hexValue}
            onChange={handleChange}
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              boxShadow: `0 0 0 3px ${hexValue}20`,
            }}
          />
        </div>
        <span className="text-[10px] font-semibold tabular-nums text-text-muted">{label}</span>
      </div>
    );
  

  return (
    <div className="color-picker group flex items-center gap-3 rounded-lg border border-transparent bg-surface-elevated/50 p-2 transition-all duration-200 hover:border-border hover:bg-surface-elevated">
      <div className="relative">
        <input
          aria-label={`Pick color for ${label}`}
          className="color-input h-10 w-10 min-h-[40px] min-w-[40px] cursor-pointer rounded-lg border-2 border-border transition-all duration-200 hover:border-primary-400"
          type="color"
          value={hexValue}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-text-primary">{label}</span>
        <span className="font-mono text-[10px] uppercase text-text-muted">{hexValue}</span>
      </div>
    </div>
  );
};
