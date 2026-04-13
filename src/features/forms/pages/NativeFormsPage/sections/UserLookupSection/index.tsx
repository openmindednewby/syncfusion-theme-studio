/**
 * UserLookupSection - Wraps LoginForm with user search API integration.
 *
 * On form submit, searches for users by email via the MockServer Users Search API
 * and displays the found user's details below the form.
 */
import { useState, useCallback, useMemo } from 'react';

import type { UserDto } from '@/api/generated/mockserver/models';
import { useMockServerWebUsersSearch } from '@/api/generated/mockserver/users/users';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import { LoginForm } from '../../forms/LoginForm';

import type { LoginFormData } from '../../forms/LoginForm/schema';

interface UserDetailFieldProps {
  label: string;
  value: string | undefined;
}

const UserDetailField = ({ label, value }: UserDetailFieldProps): JSX.Element => (
  <div className="flex gap-2">
    <dt className="text-sm font-medium text-text-secondary">{label}:</dt>
    <dd className="text-sm text-text-primary">{value ?? ''}</dd>
  </div>
);

const UserDetailsCard = ({ user }: { user: UserDto }): JSX.Element => (
  <div className="rounded-lg border border-border-primary bg-surface-secondary p-4">
    <h4 className="font-medium text-text-primary">{FM('forms.native.userFound')}</h4>
    <dl className="mt-2 space-y-1">
      <UserDetailField label={FM('common.firstName')} value={user.firstName} />
      <UserDetailField label={FM('common.lastName')} value={user.lastName} />
      <UserDetailField label={FM('common.email')} value={user.email} />
      <UserDetailField label={FM('common.phone')} value={user.phone} />
      <UserDetailField label={FM('common.username')} value={user.username} />
    </dl>
  </div>
);

const NotFoundMessage = (): JSX.Element => (
  <div className="rounded-lg border border-border-primary bg-surface-secondary p-4">
    <p className="text-sm text-text-secondary">{FM('forms.native.userNotFound')}</p>
  </div>
);

const LoadingMessage = (): JSX.Element => (
  <div className="rounded-lg border border-border-primary bg-surface-secondary p-4">
    <p className="text-sm text-text-secondary">{FM('forms.native.searching')}</p>
  </div>
);

export const UserLookupSection = (): JSX.Element => {
  const [searchEmail, setSearchEmail] = useState<string | null>(null);

  const isEnabled = isValueDefined(searchEmail);
  const searchParams = useMemo(() => ({ q: searchEmail ?? '' }), [searchEmail]);
  const searchOptions = useMemo(() => ({ query: { enabled: isEnabled } }), [isEnabled]);
  const { data: searchResponse, isLoading, isFetched } = useMockServerWebUsersSearch(
    searchParams,
    searchOptions,
  );

  const users: UserDto[] | undefined = searchResponse?.data;
  const firstUser = users?.[0];
  const hasResults = isFetched && isValueDefined(users) && users.length > 0;
  const hasNoResults = isFetched && isValueDefined(users) && users.length === 0;

  const handleSubmit = useCallback(
    (data: LoginFormData) => {
      setSearchEmail(data.email);
    },
    [],
  );

  return (
    <div className="space-y-4">
      <LoginForm
        isSearching={isLoading}
        submitLabel={FM('forms.actions.searchUser')}
        onSubmit={handleSubmit}
      />

      {isLoading ? <LoadingMessage /> : null}
      {hasResults && isValueDefined(firstUser) ? <UserDetailsCard user={firstUser} /> : null}
      {hasNoResults ? <NotFoundMessage /> : null}
    </div>
  );
};
