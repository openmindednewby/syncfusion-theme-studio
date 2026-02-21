/**
 * UserCreationSection - Wires the native ContactForm to the MockServer Users API.
 *
 * Maps contact form fields to CreateUserRequest, shows created user details,
 * and displays a table of recent users that refreshes after each creation.
 */
import { useState, useCallback, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import type { UserDto } from '@/api/generated/mockserver/models';
import {
  useMockServerWebUsersCreate,
  useMockServerWebUsersList,
  getMockServerWebUsersListQueryKey,
} from '@/api/generated/mockserver/users/users';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import { FormSection } from '../../../SyncfusionFormsPage/components/FormSection';
import { ContactForm } from '../../forms/ContactForm';

import type { ContactFormData } from '../../forms/ContactForm/schema';

const CreatedUserCard = ({ user }: CreatedUserCardProps): JSX.Element => {
  const notProvided = FM('forms.userCreation.notProvided');

  return (
    <div className="card border-success-200 bg-success-50 dark:border-success-800 dark:bg-success-900/20">
      <h4 className="mb-3 text-base font-semibold text-success-700 dark:text-success-300">
        {FM('forms.userCreation.createdUser')}
      </h4>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="font-medium text-text-secondary">{FM('forms.userCreation.firstName')}</dt>
        <dd className="text-text-primary">{user.firstName ?? notProvided}</dd>

        <dt className="font-medium text-text-secondary">{FM('forms.userCreation.lastName')}</dt>
        <dd className="text-text-primary">{user.lastName ?? notProvided}</dd>

        <dt className="font-medium text-text-secondary">{FM('common.email')}</dt>
        <dd className="text-text-primary">{user.email ?? notProvided}</dd>

        <dt className="font-medium text-text-secondary">{FM('forms.userCreation.username')}</dt>
        <dd className="text-text-primary">{user.username ?? notProvided}</dd>
      </dl>
    </div>
  );
};

/** Shell wrapper for the recent users card with a header */
const RecentUsersShell = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <div className="card p-0">
    <div className="border-b border-border px-4 py-3">
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('forms.userCreation.recentUsers')}
      </h3>
    </div>
    {children}
  </div>
);

// --- Sub-components (defined before usage to satisfy no-use-before-define) ---

interface CreatedUserCardProps {
  user: UserDto;
}

const RecentUsersTable = ({ users, isLoading }: RecentUsersTableProps): JSX.Element => {
  const notProvided = FM('forms.userCreation.notProvided');

  if (isLoading)
    return (
      <RecentUsersShell>
        <p className="px-4 py-6 text-center text-sm text-text-secondary">
          {FM('common.loading')}
        </p>
      </RecentUsersShell>
    );

  if (users.length === 0)
    return (
      <RecentUsersShell>
        <p className="px-4 py-6 text-center text-sm text-text-secondary">
          {FM('forms.userCreation.noRecentUsers')}
        </p>
      </RecentUsersShell>
    );

  return (
    <RecentUsersShell>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface text-text-secondary">
            <tr>
              <th className="px-4 py-2 font-medium">{FM('common.name')}</th>
              <th className="px-4 py-2 font-medium">{FM('common.email')}</th>
              <th className="px-4 py-2 font-medium">{FM('forms.userCreation.phone')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => {
              const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
              const displayName = fullName !== '' ? fullName : notProvided;

              return (
                <tr key={user.id ?? user.email} className="hover:bg-surface-hover">
                  <td className="px-4 py-2 text-text-primary">{displayName}</td>
                  <td className="px-4 py-2 text-text-primary">{user.email ?? notProvided}</td>
                  <td className="px-4 py-2 text-text-primary">{user.phone ?? notProvided}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </RecentUsersShell>
  );
};

const RECENT_USERS_LIMIT = 5;

interface RecentUsersTableProps {
  users: UserDto[];
  isLoading: boolean;
}
const INITIAL_SKIP = 0;

// --- Main section component ---

export const UserCreationSection = (): JSX.Element => {
  const queryClient = useQueryClient();
  const [createdUser, setCreatedUser] = useState<UserDto | null>(null);

  const createMutation = useMockServerWebUsersCreate();

  const listParams = useMemo(
    () => ({ skip: INITIAL_SKIP, limit: RECENT_USERS_LIMIT }),
    [],
  );
  const { data: usersData, isLoading: isLoadingUsers } = useMockServerWebUsersList(listParams);

  // Orval 8.x wraps response: { data: <actual>, status, headers }
  const recentUsers = usersData?.data.items ?? [];

  const invalidateUsersList = useCallback(() => {
    queryClient
      .invalidateQueries({ queryKey: getMockServerWebUsersListQueryKey() })
      .catch(() => undefined);
  }, [queryClient]);

  const handleFormSubmit = useCallback(
    (data: ContactFormData) => {
      const nameParts = data.name.trim().split(' ');
      const firstName = nameParts[0] ?? '';
      const lastName = nameParts.slice(1).join(' ');
      const resolvedLastName = lastName !== '' ? lastName : firstName;

      createMutation.mutate(
        {
          data: {
            firstName,
            lastName: resolvedLastName,
            email: data.email,
            username: data.email.split('@')[0] ?? data.email,
          },
        },
        {
          onSuccess: (response) => {
            setCreatedUser(response.data);
            invalidateUsersList();
          },
        },
      );
    },
    [createMutation, invalidateUsersList],
  );

  return (
    <div className="space-y-6">
      <FormSection
        description={FM('forms.userCreation.description')}
        title={FM('forms.userCreation.title')}
      >
        <ContactForm
          isSubmitting={createMutation.isPending}
          onSubmit={handleFormSubmit}
        />

        {createMutation.isError ? (
          <p className="mt-3 text-sm text-error-600">
            {FM('forms.userCreation.errorCreating')}
          </p>
        ) : null}
      </FormSection>

      {isValueDefined(createdUser) ? (
        <CreatedUserCard user={createdUser} />
      ) : null}

      <RecentUsersTable isLoading={isLoadingUsers} users={recentUsers} />
    </div>
  );
};
