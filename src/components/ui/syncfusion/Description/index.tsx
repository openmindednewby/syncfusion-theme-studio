import { createElement, forwardRef, memo, type CSSProperties, type ElementType, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface SyncfusionDescriptionProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  testId?: string;
  style?: CSSProperties;
}

export type { SyncfusionDescriptionProps };

const descriptionStyle: CSSProperties = {
  fontSize: 'var(--component-text-description-font-size)',
  fontWeight: 'var(--component-text-description-font-weight)',
  fontFamily: 'var(--component-text-description-font-family)',
  lineHeight: 'var(--component-text-description-line-height)',
  letterSpacing: 'var(--component-text-description-letter-spacing)',
  color: 'var(--component-text-description-color)',
};

const SyncfusionDescription = memo(forwardRef<HTMLElement, SyncfusionDescriptionProps>(({
  children,
  as: tag = 'p',
  className = '',
  testId = 'syncfusion-description',
  style,
}, ref) => createElement(
  tag,
  {
    ref,
    className: cn('e-control', className),
    'data-testid': testId,
    style: { ...descriptionStyle, ...style },
  },
  children,
)));

SyncfusionDescription.displayName = 'SyncfusionDescription';

export default SyncfusionDescription;
