import { memo, useState, useCallback } from 'react';

import { AvatarSize } from '@/components/ui/shared/avatarTypes';
import type { BaseAvatarProps } from '@/components/ui/shared/avatarTypes';
import { isNotEmptyString, isValueDefined } from '@/utils/is';

export type AvatarNativeProps = BaseAvatarProps;

export { AvatarSize };

const SIZE_MAP: Record<AvatarSize, { container: string; text: string; status: string }> = {
  [AvatarSize.Xs]: { container: 'h-6 w-6', text: 'text-xs', status: 'h-1.5 w-1.5' },
  [AvatarSize.Sm]: { container: 'h-8 w-8', text: 'text-xs', status: 'h-2 w-2' },
  [AvatarSize.Md]: { container: 'h-10 w-10', text: 'text-sm', status: 'h-2.5 w-2.5' },
  [AvatarSize.Lg]: { container: 'h-12 w-12', text: 'text-base', status: 'h-3 w-3' },
  [AvatarSize.Xl]: { container: 'h-16 w-16', text: 'text-lg', status: 'h-4 w-4' },
};

interface AvatarContentProps {
  showImage: boolean;
  src: string | undefined;
  alt: string;
  onImgError: () => void;
  icon: React.ReactNode | undefined;
  initials: string | undefined;
  sizeStyles: { container: string; text: string; status: string };
}

function renderAvatarContent(props: AvatarContentProps): JSX.Element {
  const { showImage, src, alt, onImgError, icon, initials, sizeStyles } = props;

  if (showImage)
    return (
      <img
        alt={alt}
        className="h-full w-full object-cover"
        role="presentation"
        src={src}
        onError={onImgError}
      />
    );

  if (isValueDefined(icon)) return <span className="flex items-center justify-center">{icon}</span>;

  if (isNotEmptyString(initials))
    return <span className={sizeStyles.text}>{initials}</span>;

  return (
    <span
      className={`${sizeStyles.container} flex items-center justify-center rounded-full`}
      style={{ backgroundColor: 'var(--component-avatar-fallback-bg)' }}
    >
      <svg className="h-1/2 w-1/2" fill="currentColor" viewBox="0 0 20 20">
        <path clipRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" fillRule="evenodd" />
      </svg>
    </span>
  );
}

const AvatarNative = memo(({
  src,
  alt = '',
  initials,
  size = AvatarSize.Md,
  showStatus = false,
  statusColor,
  icon,
  testId = 'avatar-native',
}: AvatarNativeProps): JSX.Element => {
  const [imgError, setImgError] = useState(false);
  const sizeStyles = SIZE_MAP[size];

  const handleImgError = useCallback(() => {
    setImgError(true);
  }, []);

  const showImage = isNotEmptyString(src) && !imgError;

  return (
    <span className="relative inline-flex" data-testid={testId}>
      <span
        className={`${sizeStyles.container} inline-flex items-center justify-center overflow-hidden rounded-full border-2 font-medium`}
        style={{
          backgroundColor: showImage ? 'transparent' : 'var(--component-avatar-bg)',
          color: 'var(--component-avatar-text)',
          borderColor: 'var(--component-avatar-border)',
        }}
      >
        {renderAvatarContent({ showImage, src, alt, onImgError: handleImgError, icon, initials, sizeStyles })}
      </span>
      {showStatus ? <span
          className={`absolute bottom-0 right-0 ${sizeStyles.status} rounded-full border-2`}
          style={{
            backgroundColor: statusColor ?? 'var(--component-avatar-status)',
            borderColor: 'var(--component-avatar-border)',
          }}
        /> : null}
    </span>
  );
});

AvatarNative.displayName = 'AvatarNative';

export default AvatarNative;
