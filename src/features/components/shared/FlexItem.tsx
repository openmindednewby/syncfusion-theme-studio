import { createElement, memo, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from 'react';

interface FlexItemProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  flex?: CSSProperties['flex'];
  alignSelf?: CSSProperties['alignSelf'];
  order?: CSSProperties['order'];
  component?: ElementType;
  children?: ReactNode;
  testId?: string;
}

const FlexItem = memo(({
  flex: flexProp,
  alignSelf,
  order,
  component = 'div',
  children,
  testId,
  style,
  ...rest
}: FlexItemProps): JSX.Element => {
  const itemStyle: CSSProperties = {
    flex: flexProp,
    alignSelf,
    order,
    background: 'var(--component-flexbox-item-bg)',
    border: '1px solid var(--component-flexbox-item-border)',
    borderRadius: 'var(--component-flexbox-item-radius)',
    padding: 'var(--component-flexbox-item-padding)',
    ...style,
  };

  return createElement(component, { 'data-testid': testId, style: itemStyle, ...rest }, children);
});

FlexItem.displayName = 'FlexItem';

export { FlexItem };
export type { FlexItemProps };
