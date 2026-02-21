import type { ReactNode } from 'react';

const ItemLabel = ({ children }: { children: ReactNode }): JSX.Element => (
  <span className="text-sm font-medium text-text-primary">{children}</span>
);

const SectionLabel = ({ text }: { text: string }): JSX.Element => (
  <span className="mb-1 block text-xs text-text-muted">{text}</span>
);

const BASIC_ITEM_COUNT = 4;
const WRAP_ITEM_COUNT = 10;

const BASIC_ITEMS = Array.from({ length: BASIC_ITEM_COUNT }, (_, i) => i + 1);
const WRAP_ITEMS = Array.from({ length: WRAP_ITEM_COUNT }, (_, i) => i + 1);

const JUSTIFY_VALUES = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const;
const ALIGN_VALUES = ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] as const;

export { BASIC_ITEMS, WRAP_ITEMS, JUSTIFY_VALUES, ALIGN_VALUES, ItemLabel, SectionLabel };
