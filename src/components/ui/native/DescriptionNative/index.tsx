import {
  createElement,
  forwardRef,
  memo,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';

import { FM } from '@/localization/utils/helpers';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import SeeMoreButton from '../SeeMoreButton';

const clampStyles = (lines: number): CSSProperties => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

interface DescriptionNativeProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  testId?: string;
  style?: CSSProperties;
  maxLines?: number;
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

const clampWrapperStyle: CSSProperties = { position: 'relative' };

const seeMoreOverlayStyle: CSSProperties = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  display: 'inline-flex',
  alignItems: 'baseline',
  background: 'var(--component-card-background)',
};

const ellipsisStyle: CSSProperties = {
  color: 'var(--component-text-description-color)',
  fontSize: 'var(--component-text-description-font-size)',
  lineHeight: 'var(--component-text-description-line-height)',
};

const DescriptionNative = memo(forwardRef<HTMLElement, DescriptionNativeProps>(({
  children,
  as: tag = 'p',
  className = '',
  testId = 'description-native',
  style,
  maxLines,
}, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const internalRef = useRef<HTMLElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const setRefs = useCallback((node: HTMLElement | null) => {
    internalRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref && 'current' in ref) ref.current = node; // eslint-disable-line no-param-reassign -- ref forwarding requires mutation
  }, [ref]);

  useLayoutEffect(() => {
    if (!isValueDefined(maxLines) || isExpanded) return;
    const el = internalRef.current;
    if (el) setIsOverflowing(el.scrollHeight > el.clientHeight);
  }, [children, maxLines, isExpanded]);

  const handleToggle = useCallback(() => setIsExpanded((prev) => !prev), []);

  if (!isValueDefined(maxLines)) 
    return createElement(tag, {
      ref: setRefs,
      className: cn(className),
      'data-testid': testId,
      style: { ...descriptionStyle, ...style },
    }, children);
  

  const mergedStyle = isExpanded
    ? { ...descriptionStyle, ...style }
    : { ...descriptionStyle, ...clampStyles(maxLines), ...style };

  const textElement = createElement(tag, {
    ref: setRefs,
    className: cn(className),
    'data-testid': testId,
    style: mergedStyle,
  }, children);

  if (isExpanded) 
    return (
      <>
        {textElement}
        <SeeMoreButton isExpanded onToggle={handleToggle} />
      </>
    );
  

  return (
    <div style={clampWrapperStyle}>
      {textElement}
      {isOverflowing ? (
        <span style={seeMoreOverlayStyle}>
          <span style={ellipsisStyle}>{FM('components.textDescriptionShowcase.ellipsis')}</span>
          <SeeMoreButton isExpanded={false} onToggle={handleToggle} />
        </span>
      ) : null}
    </div>
  );
}));

DescriptionNative.displayName = 'DescriptionNative';

export default DescriptionNative;
