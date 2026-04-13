const HEX_RADIX = 16;
const MAX_CHANNEL_VALUE = 255;
const GREEN_START = 2;
const GREEN_END = 4;
const BLUE_START = 4;
const BLUE_END = 6;
const RED_WEIGHT = 0.299;
const GREEN_WEIGHT = 0.587;
const BLUE_WEIGHT = 0.114;

export default function hexToLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, GREEN_START), HEX_RADIX) / MAX_CHANNEL_VALUE;
  const g = parseInt(clean.substring(GREEN_START, GREEN_END), HEX_RADIX) / MAX_CHANNEL_VALUE;
  const b = parseInt(clean.substring(BLUE_START, BLUE_END), HEX_RADIX) / MAX_CHANNEL_VALUE;
  return RED_WEIGHT * r + GREEN_WEIGHT * g + BLUE_WEIGHT * b;
}
