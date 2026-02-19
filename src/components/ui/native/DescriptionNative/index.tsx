import { createElement, forwardRef, memo, type CSSProperties, type ElementType, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface DescriptionNativeProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  testId?: string;
  style?: CSSProperties;
}

export type { DescriptionNativeProps };

const descriptionStyle: CSSProperties = {
  fontSize: 'var(--component-text-description-font-size)',
  fontWeight: 'var(--component-text-description-font-weight)',
  fontFamily: 'var(--component-text-description-font-family)',
  lineHeight: 'var(--component-text-description-line-height)',
  letterSpacing: 'var(--component-text-description-letter-spacing)',
  color: 'var(--component-text-description-color)',
};

const DescriptionNative = memo(forwardRef<HTMLElement, DescriptionNativeProps>(({
  children,
  as: tag = 'p',
  className = '',
  testId = 'description-native',
  style,
}, ref) => createElement(
  tag,
  {
    ref,
    className: cn(className),
    'data-testid': testId,
    style: { ...descriptionStyle, ...style },
  },
  children,
)));

DescriptionNative.displayName = 'DescriptionNative';

export default DescriptionNative;
