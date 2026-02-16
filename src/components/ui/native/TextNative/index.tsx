import { createElement, forwardRef, memo, type CSSProperties, type ElementType, type ReactNode } from 'react';

import { TextVariant } from '@/components/ui/shared/textVariant';
import { cn } from '@/utils/cn';

export { TextVariant };

interface TextNativeProps {
  children: ReactNode;
  variant?: TextVariant;
  as?: ElementType;
  className?: string;
  testId?: string;
  style?: CSSProperties;
}

export type { TextNativeProps };

const PREFIX_MAP = {
  [TextVariant.Body]: 'body',
  [TextVariant.BodySmall]: 'body-small',
  [TextVariant.Secondary]: 'secondary',
  [TextVariant.Muted]: 'muted',
  [TextVariant.Caption]: 'caption',
  [TextVariant.Label]: 'label',
} as const;

const TextNative = memo(forwardRef<HTMLElement, TextNativeProps>(({
  children,
  variant = TextVariant.Body,
  as: tag = 'p',
  className = '',
  testId = 'text-native',
  style,
}, ref) => {
  const prefix = PREFIX_MAP[variant];

  const typoStyle: CSSProperties = {
    fontSize: `var(--typo-${prefix}-size)`,
    fontWeight: `var(--typo-${prefix}-weight)`,
    lineHeight: `var(--typo-${prefix}-line-height)`,
    letterSpacing: `var(--typo-${prefix}-letter-spacing)`,
    color: `var(--typo-${prefix}-color)`,
    ...style,
  };

  return createElement(
    tag,
    {
      ref,
      className: cn(className),
      'data-testid': testId,
      style: typoStyle,
    },
    children,
  );
}));

TextNative.displayName = 'TextNative';

export default TextNative;
