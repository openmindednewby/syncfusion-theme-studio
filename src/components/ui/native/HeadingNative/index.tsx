import { forwardRef, memo, type CSSProperties, type ReactNode } from 'react';

import { HeadingLevel } from '@/components/ui/shared/headingLevel';
import { cn } from '@/utils/cn';

export { HeadingLevel };

interface HeadingNativeProps {
  children: ReactNode;
  level?: HeadingLevel;
  className?: string;
  testId?: string;
  style?: CSSProperties;
}

export type { HeadingNativeProps };

const TAG_MAP = {
  [HeadingLevel.H1]: 'h1',
  [HeadingLevel.H2]: 'h2',
  [HeadingLevel.H3]: 'h3',
  [HeadingLevel.H4]: 'h4',
} as const;

const PREFIX_MAP = {
  [HeadingLevel.H1]: 'h1',
  [HeadingLevel.H2]: 'h2',
  [HeadingLevel.H3]: 'h3',
  [HeadingLevel.H4]: 'h4',
} as const;

const HeadingNative = memo(forwardRef<HTMLHeadingElement, HeadingNativeProps>(({
  children,
  level = HeadingLevel.H2,
  className = '',
  testId = 'heading-native',
  style,
}, ref) => {
  const Tag = TAG_MAP[level];
  const prefix = PREFIX_MAP[level];

  const typoStyle: CSSProperties = {
    fontSize: `var(--typo-${prefix}-size)`,
    fontWeight: `var(--typo-${prefix}-weight)`,
    lineHeight: `var(--typo-${prefix}-line-height)`,
    letterSpacing: `var(--typo-${prefix}-letter-spacing)`,
    color: `var(--typo-${prefix}-color)`,
    ...style,
  };

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      data-testid={testId}
      style={typoStyle}
    >
      {children}
    </Tag>
  );
}));

HeadingNative.displayName = 'HeadingNative';

export default HeadingNative;
