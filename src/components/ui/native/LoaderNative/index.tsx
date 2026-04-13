import { memo, type ReactNode } from 'react';

import { isValueDefined } from '@/utils/is';

import { LoaderSize } from './loaderSize';

export { LoaderSize } from './loaderSize';

const SIZE_PX_SM = '24px';
const SIZE_PX_MD = '40px';
const SIZE_PX_LG = '64px';

const SIZE_MAP: Record<LoaderSize, string> = {
  [LoaderSize.Sm]: SIZE_PX_SM,
  [LoaderSize.Md]: SIZE_PX_MD,
  [LoaderSize.Lg]: SIZE_PX_LG,
};

export interface LoaderNativeProps {
  size?: LoaderSize;
  icon?: ReactNode;
  className?: string;
  testId?: string;
}

const LoaderNative = memo(({
  size,
  icon,
  className = '',
  testId = 'loader-native',
}: LoaderNativeProps): JSX.Element => {
  const sizeStyle = isValueDefined(size) ? { width: SIZE_MAP[size], height: SIZE_MAP[size] } : undefined;

  return (
    <div
      aria-label="Loading"
      className={`native-loader ${className}`}
      data-testid={testId}
      role="status"
      style={sizeStyle}
    >
      <div className="native-loader-track" />
      <div className="native-loader-spinner" />
      {isValueDefined(icon) ? <span className="native-loader-icon">{icon}</span> : null}
    </div>
  );
});

LoaderNative.displayName = 'LoaderNative';
export default LoaderNative;
