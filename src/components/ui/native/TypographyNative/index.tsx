import { createElement, forwardRef, memo, type CSSProperties, type ElementType, type ReactNode } from 'react';

import { TypographySize } from '@/components/ui/shared/typographySize';
import { TypographyWeight } from '@/components/ui/shared/typographyWeight';
import { cn } from '@/utils/cn';

export { TypographySize };
export { TypographyWeight };

interface TypographyNativeProps {
  children: ReactNode;
  weight?: TypographyWeight;
  size?: TypographySize;
  as?: ElementType;
  className?: string;
  testId?: string;
  style?: CSSProperties;
}

export type { TypographyNativeProps };

type TypoWrapperProps = Omit<TypographyNativeProps, 'weight'>;

const FONT_FAMILY = "'Fira Sans', sans-serif";

const WEIGHT_CSS_MAP = {
  [TypographyWeight.Regular]: 'normal',
  [TypographyWeight.Medium]: 'medium',
  [TypographyWeight.Bold]: 'bold',
  [TypographyWeight.Italic]: 'normal',
} as const;

const TypographyNative = memo(forwardRef<HTMLElement, TypographyNativeProps>(({
  children,
  weight = TypographyWeight.Regular,
  size = TypographySize.Lg,
  as: tag = 'span',
  className = '',
  testId = 'typography-native',
  style,
}, ref) => {
  const isItalic = weight === TypographyWeight.Italic;
  const weightSuffix = WEIGHT_CSS_MAP[weight];

  const typoStyle: CSSProperties = {
    fontSize: `var(--font-size-${size})`,
    fontWeight: `var(--font-weight-${weightSuffix})`,
    fontStyle: isItalic ? 'italic' : 'normal',
    fontFamily: FONT_FAMILY,
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

TypographyNative.displayName = 'TypographyNative';

export default TypographyNative;

export const TypoRegular = memo(forwardRef<HTMLElement, TypoWrapperProps>((props, ref) => (
  <TypographyNative {...props} ref={ref} weight={TypographyWeight.Regular} />
)));
TypoRegular.displayName = 'TypoRegular';

export const TypoMedium = memo(forwardRef<HTMLElement, TypoWrapperProps>((props, ref) => (
  <TypographyNative {...props} ref={ref} weight={TypographyWeight.Medium} />
)));
TypoMedium.displayName = 'TypoMedium';

export const TypoItalic = memo(forwardRef<HTMLElement, TypoWrapperProps>((props, ref) => (
  <TypographyNative {...props} ref={ref} weight={TypographyWeight.Italic} />
)));
TypoItalic.displayName = 'TypoItalic';

export const TypoBold = memo(forwardRef<HTMLElement, TypoWrapperProps>((props, ref) => (
  <TypographyNative {...props} ref={ref} weight={TypographyWeight.Bold} />
)));
TypoBold.displayName = 'TypoBold';
