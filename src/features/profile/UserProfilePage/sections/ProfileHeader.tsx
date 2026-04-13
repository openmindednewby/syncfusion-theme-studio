import type { UserDto } from '@/api/generated/mockserver/models';
import { IconCamera, IconUser } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface ProfileHeaderProps {
  user: UserDto | undefined;
}

const AvatarOverlay = (): JSX.Element => (
  <div
    className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
    data-testid={TestIds.PROFILE_AVATAR_OVERLAY}
  >
    <IconCamera className="h-6 w-6 text-white opacity-80" />
  </div>
);

const AVATAR_SIZE = 96;

const ProfileHeader = ({ user }: ProfileHeaderProps): JSX.Element => {
  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';
  const joined = [firstName, lastName].filter((s) => s !== '').join(' ');
  const fullName = joined !== '' ? joined : FM('profile.unknownUser');
  const imageUrl = user?.image ?? '';
  const email = user?.email ?? '';
  const username = user?.username ?? '';

  return (
    <div className="mx-auto flex max-w-2xl items-center gap-6 rounded-lg border border-border bg-surface p-6">
      <button
        aria-label={FM('profile.changeAvatar')}
        className="group relative cursor-pointer"
        type="button"
      >
        {imageUrl !== '' ? (
          <img
            alt={fullName}
            className="rounded-full object-cover ring-2 ring-primary-200"
            height={AVATAR_SIZE}
            src={imageUrl}
            width={AVATAR_SIZE}
          />
        ) : (
          <div
            className="flex items-center justify-center rounded-full bg-primary-100 text-primary-600 ring-2 ring-primary-200"
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
          >
            <span className="scale-[2]">
              <IconUser />
            </span>
          </div>
        )}
        <AvatarOverlay />
      </button>
      <div>
        <h2 className="text-xl font-bold text-text-primary">{fullName}</h2>
        {email !== '' ? (
          <p className="text-sm text-text-secondary">{email}</p>
        ) : null}
        {username !== '' ? (
          <p className="mt-0.5 text-xs text-text-muted">@{username}</p>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileHeader;
