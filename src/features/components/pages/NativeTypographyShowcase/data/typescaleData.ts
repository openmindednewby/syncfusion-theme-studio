export interface TypescaleRow {
  label: string;
  sizePx: string;
  sizeRem: string;
  cssVar: string;
  fontSize: number;
  lineHeight: string;
  sizeEnum: string;
}

export const TYPESCALE_ROWS: TypescaleRow[] = [
  { label: 'SM (12)', sizePx: '12px', sizeRem: '0.75rem', cssVar: '--font-xs', fontSize: 12, lineHeight: '14px', sizeEnum: 'Sm' },
  { label: 'MD (14)', sizePx: '14px', sizeRem: '0.875rem', cssVar: '--font-sm', fontSize: 14, lineHeight: '17px', sizeEnum: 'Md' },
  { label: 'LG (16)', sizePx: '16px', sizeRem: '1rem', cssVar: '--font-base', fontSize: 16, lineHeight: '19px', sizeEnum: 'Lg' },
  { label: 'XL (18)', sizePx: '18px', sizeRem: '1.125rem', cssVar: '--font-lg', fontSize: 18, lineHeight: '22px', sizeEnum: 'Xl' },
  { label: '2XL (20)', sizePx: '20px', sizeRem: '1.25rem', cssVar: '--font-xl', fontSize: 20, lineHeight: '24px', sizeEnum: 'Xl2' },
  { label: '4XL (24)', sizePx: '24px', sizeRem: '1.5rem', cssVar: '--font-2xl', fontSize: 24, lineHeight: '29px', sizeEnum: 'Xl4' },
  { label: '5XL (32)', sizePx: '32px', sizeRem: '2rem', cssVar: '--font-3xl', fontSize: 32, lineHeight: '38px', sizeEnum: 'Xl5' },
];
