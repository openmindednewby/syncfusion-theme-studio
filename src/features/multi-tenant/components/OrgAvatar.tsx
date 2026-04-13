/**
 * Displays an organization avatar with logo image or initials fallback.
 */
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const INITIALS_LENGTH = 2;

interface OrgAvatarProps {
  name: string;
  logoUrl: string;
  size?: 'sm' | 'md';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, INITIALS_LENGTH);
}

const SIZE_CLASSES = {
  sm: 'size-7 text-xs',
  md: 'size-9 text-sm',
} as const;

export const OrgAvatar = ({
  name,
  logoUrl,
  size = 'md',
}: OrgAvatarProps): JSX.Element => {
  const sizeClass = SIZE_CLASSES[size];
  const hasLogo = logoUrl !== '';

  return (
    <div
      aria-label={FM('orgSwitcher.currentOrg')}
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-lg bg-primary-100 font-semibold text-primary-700 overflow-hidden`}
      data-testid={TestIds.ORG_AVATAR}
    >
      {hasLogo ? (
        <img
          alt={name}
          className="size-full object-cover"
          src={logoUrl}
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
};
