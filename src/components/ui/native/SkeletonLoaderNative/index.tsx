import { memo } from 'react';

import { SkeletonVariant } from './skeletonVariant';

export { SkeletonVariant } from './skeletonVariant';

const PARAGRAPH_LINE_COUNT = 4;
const PARAGRAPH_LAST_LINE_WIDTH = '60%';

export interface SkeletonLoaderNativeProps {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
  className?: string;
  testId?: string;
}

const SkeletonLoaderNative = memo(({
  variant = SkeletonVariant.Text,
  width,
  height,
  className = '',
  testId = 'skeleton-loader-native',
}: SkeletonLoaderNativeProps): JSX.Element => {
  const style = { width, height };

  if (variant === SkeletonVariant.Paragraph) 
    return (
      <div className={`native-skeleton-paragraph ${className}`} data-testid={testId}>
        {Array.from({ length: PARAGRAPH_LINE_COUNT }, (_, i) => (
          <div
            key={i}
            className="native-skeleton native-skeleton-text"
            style={i === PARAGRAPH_LINE_COUNT - 1 ? { width: PARAGRAPH_LAST_LINE_WIDTH } : undefined}
          />
        ))}
      </div>
    );
  

  const variantClass = `native-skeleton-${variant}`;

  return (
    <div
      className={`native-skeleton ${variantClass} ${className}`}
      data-testid={testId}
      style={style}
    />
  );
});

SkeletonLoaderNative.displayName = 'SkeletonLoaderNative';
export default SkeletonLoaderNative;
