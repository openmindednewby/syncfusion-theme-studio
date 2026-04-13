import { memo } from 'react';
import type { CSSProperties } from 'react';

import { ComponentTestIds } from '@/shared/testIds.components';
import { isValueDefined } from '@/utils';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  width?: string;
  height?: string;
  testId?: string;
}

const DEFAULT_SIZE = '160px';

const PLACEHOLDER_ICON_STYLE: CSSProperties = {
  color: 'var(--component-image-placeholder-icon)',
};

const PlaceholderIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    fill="none"
    height="48"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    style={PLACEHOLDER_ICON_STYLE}
    viewBox="0 0 24 24"
    width="48"
  >
    <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const IMG_STYLE: CSSProperties = {
  width: '100%',
  height: '100%',
};

const ImagePlaceholder = memo(({
  src,
  alt,
  width,
  height,
  testId,
}: ImagePlaceholderProps): JSX.Element => {
  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: width ?? DEFAULT_SIZE,
    height: height ?? DEFAULT_SIZE,
  };

  return (
    <div
      className="image-placeholder"
      data-testid={testId ?? ComponentTestIds.IMAGE_PLACEHOLDER}
      style={containerStyle}
    >
      {isValueDefined(src)
        ? <img alt={alt} src={src} style={IMG_STYLE} />
        : <PlaceholderIcon />}
    </div>
  );
});

ImagePlaceholder.displayName = 'ImagePlaceholder';

export { ImagePlaceholder };
