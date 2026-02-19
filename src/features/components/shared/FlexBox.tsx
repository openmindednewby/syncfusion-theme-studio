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

/* eslint-disable @typescript-eslint/consistent-type-assertions -- CSS custom properties require casting to CSSProperties subtypes */
const CSS_VAR_DIRECTION = 'var(--component-flexbox-direction)' as CSSProperties['flexDirection'];
const CSS_VAR_WRAP = 'var(--component-flexbox-wrap)' as CSSProperties['flexWrap'];
const CSS_VAR_JUSTIFY = 'var(--component-flexbox-justify)' as CSSProperties['justifyContent'];
const CSS_VAR_ALIGN = 'var(--component-flexbox-align)' as CSSProperties['alignItems'];
const CSS_VAR_GAP = 'var(--component-flexbox-gap)' as CSSProperties['gap'];
/* eslint-enable @typescript-eslint/consistent-type-assertions */

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

function resolveGap(gap: FlexProps['gap']): CSSProperties['gap'] {
  if (!isValueDefined(gap)) return CSS_VAR_GAP;
  const mapped = GAP_MAP[gap as FlexGapSize]; // eslint-disable-line @typescript-eslint/consistent-type-assertions -- enum lookup requires cast
  if (isValueDefined(mapped)) return `${mapped}px`;
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
