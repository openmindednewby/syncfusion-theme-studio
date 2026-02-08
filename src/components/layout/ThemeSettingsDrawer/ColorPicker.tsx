import { useState, useCallback, useRef, type ChangeEvent } from 'react';

import { isValueDefined } from '@/utils/is';

const DEBOUNCE_MS = 50;
const HEX_RADIX = 16;
const DEFAULT_RGB = '0 0 0';
const DEFAULT_HEX = '#000000';

function rgbToHex(rgb: string): string {
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
}

export const ColorPicker = ({ label, onChange, value }: ColorPickerProps): JSX.Element => {
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
    <div className="flex items-center gap-2">
      <input
        aria-label={`Pick color for ${label}`}
        className="h-11 w-11 min-h-[44px] min-w-[44px] cursor-pointer rounded border border-border"
        type="color"
        value={hexValue}
        onChange={handleChange}
      />
      <span className="text-xs text-text-secondary">{label}</span>
    </div>
  );
};
