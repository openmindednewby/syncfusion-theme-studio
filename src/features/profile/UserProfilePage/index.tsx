import { memo } from 'react';

import { useMockServerWebUsersList } from '@/api/generated/mockserver/users/users';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { ProfileForm, ProfileHeader } from './sections';

const DEMO_USER_INDEX = 0;

const UserProfilePage = memo((): JSX.Element => {
  const { data: response, isLoading } = useMockServerWebUsersList({ skip: 0, limit: 1 });
  const user = response?.data.items?.[DEMO_USER_INDEX];

  return (
    <div className="space-y-6" data-testid={TestIds.PROFILE_PAGE}>
      <h1 className="text-2xl font-bold text-text-primary">
        {FM('profile.title')}
      </h1>
      <ProfileHeader user={user} />
      <ProfileForm isLoading={isLoading} user={user} />
    </div>
  );
});

UserProfilePage.displayName = 'UserProfilePage';

export default UserProfilePage;
