import { createElement, memo, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from 'react';

import { FlexGapSize } from '@/stores/theme/types/flexGapSize';
import { isValueDefined } from '@/utils/is';

const SMALL_GAP = 8;
const MIDDLE_GAP = 16;
const LARGE_GAP = 24;

const GAP_MAP: Record<FlexGapSize, number> = {
  [FlexGapSize.Small]: SMALL_GAP,
  [FlexGapSize.Middle]: MIDDLE_GAP,
  [FlexGapSize.Large]: LARGE_GAP,
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- CSS var() not assignable to FlexDirection literal union
const CSS_VAR_DIRECTION = 'var(--component-flexbox-direction)' as CSSProperties['flexDirection'];
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- CSS var() not assignable to FlexWrap literal union
const CSS_VAR_WRAP = 'var(--component-flexbox-wrap)' as CSSProperties['flexWrap'];
const CSS_VAR_JUSTIFY: CSSProperties['justifyContent'] = 'var(--component-flexbox-justify)';
const CSS_VAR_ALIGN: CSSProperties['alignItems'] = 'var(--component-flexbox-align)';
const CSS_VAR_GAP: CSSProperties['gap'] = 'var(--component-flexbox-gap)';

interface FlexProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  vertical?: boolean;
  wrap?: boolean | CSSProperties['flexWrap'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  flex?: CSSProperties['flex'];
  gap?: FlexGapSize | CSSProperties['gap'];
  component?: ElementType;
  children?: ReactNode;
  testId?: string;
}

function resolveWrap(wrap: FlexProps['wrap']): CSSProperties['flexWrap'] {
  if (wrap === true) return 'wrap';
  if (wrap === false) return 'nowrap';
  return wrap ?? CSS_VAR_WRAP;
}

function isFlexGapSize(value: string | number): value is FlexGapSize {
  return typeof value === 'string' && value in GAP_MAP;
}

function resolveGap(gap: FlexProps['gap']): CSSProperties['gap'] {
  if (!isValueDefined(gap)) return CSS_VAR_GAP;
  if (isFlexGapSize(gap)) return `${GAP_MAP[gap]}px`;
  return String(gap);
}

const BASE_FLEX_STYLE: CSSProperties = {
  display: 'flex',
  background: 'var(--component-flexbox-container-bg)',
  border: '1px solid var(--component-flexbox-container-border)',
  borderRadius: 'var(--component-flexbox-container-radius)',
  padding: 'var(--component-flexbox-container-padding)',
};

const FlexBox = memo(({
  vertical, wrap, justify, align, flex: flexProp, gap,
  component = 'div', children, testId, style, ...rest
}: FlexProps): JSX.Element => {
  const flexStyle: CSSProperties = {
    ...BASE_FLEX_STYLE,
    flexDirection: vertical === true ? 'column' : CSS_VAR_DIRECTION,
    flexWrap: isValueDefined(wrap) ? resolveWrap(wrap) : CSS_VAR_WRAP,
    justifyContent: justify ?? CSS_VAR_JUSTIFY,
    alignItems: align ?? (vertical === true ? 'stretch' : CSS_VAR_ALIGN),
    flex: flexProp,
    gap: resolveGap(gap),
    ...style,
  };
  return createElement(component, { 'data-testid': testId, style: flexStyle, ...rest }, children);
});

FlexBox.displayName = 'FlexBox';

export { FlexBox, FlexGapSize };
export type { FlexProps };
