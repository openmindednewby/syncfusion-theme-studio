import { memo, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import type { UserDto } from '@/api/generated/mockserver/models';
import {
  getMockServerWebUsersListQueryKey,
  useMockServerWebUsersCreate,
  useMockServerWebUsersDelete,
  useMockServerWebUsersList,
  useMockServerWebUsersUpdate,
} from '@/api/generated/mockserver/users/users';
import { FM } from '@/localization/utils/helpers';
import { Role } from '@/shared/permissions';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils/is';

import { UserDialog, UsersTable } from './sections';

import type { UserFormData, UserWithId } from './types';

/**
 * Assigns mock role and isActive fields to raw UserDto items
 * because the API does not include these fields natively.
 */
export function assignMockMetadata(
  items: UserDto[],
  roles: readonly string[],
): UserWithId[] {
  const INACTIVE_MODULO = 3;
  return items
    .filter((u): u is UserDto & { id: number } => typeof u.id === 'number')
    .map((u, i) => ({
      ...u,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- roles array always has 4 entries
      role: roles[i % roles.length]!,
      isActive: i % INACTIVE_MODULO !== 0,
    }));
}

/** Filters users by first name, last name, or email. */
export function filterUsers(users: UserWithId[], search: string): UserWithId[] {
  if (search.trim() === '') return users;
  const q = search.toLowerCase();
  return users.filter(
    (u) =>
      (u.firstName ?? '').toLowerCase().includes(q) ||
      (u.lastName ?? '').toLowerCase().includes(q) ||
      (u.email ?? '').toLowerCase().includes(q),
  );
}

const QUERY_PARAMS = { skip: 0, limit: 50 };
const MOCK_ROLES: readonly string[] = [Role.Admin, Role.Manager, Role.Viewer, Role.Analyst];

const INPUT_CLASS =
  'rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';

const UserManagementPage = memo((): JSX.Element => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<UserWithId | null>(null);

  const { data: response, isLoading } = useMockServerWebUsersList(QUERY_PARAMS);
  const createMutation = useMockServerWebUsersCreate();
  const updateMutation = useMockServerWebUsersUpdate();
  const deleteMutation = useMockServerWebUsersDelete();

  const allUsers = useMemo(
    () => assignMockMetadata(response?.data.items ?? [], MOCK_ROLES),
    [response?.data.items],
  );
  const filtered = useMemo(() => filterUsers(allUsers, search), [allUsers, search]);

  const invalidate = (): void => {
    queryClient
      .invalidateQueries({
        queryKey: getMockServerWebUsersListQueryKey(QUERY_PARAMS),
      })
      .catch(() => undefined);
  };

  const closeDialog = (): void => {
    setShowDialog(false);
    setEditingUser(null);
  };

  const handleSave = (data: UserFormData): void => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    };
    const onSuccess = (): void => {
      invalidate();
      closeDialog();
    };

    if (isValueDefined(editingUser))
      updateMutation.mutate({ id: editingUser.id, data: payload }, { onSuccess });
    else createMutation.mutate({ data: payload }, { onSuccess });
  };

  const handleEdit = (user: UserWithId): void => {
    setEditingUser(user);
    setShowDialog(true);
  };

  const handleDelete = (id: number): void => {
    deleteMutation.mutate({ id }, { onSuccess: invalidate });
  };

  const handleAdd = (): void => {
    setEditingUser(null);
    setShowDialog(true);
  };

  return (
    <div className="space-y-4" data-testid={TestIds.ADMIN_USERS_PAGE}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">{FM('users.title')}</h1>
        <button
          className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700"
          data-testid={TestIds.ADMIN_USERS_ADD_BTN}
          type="button"
          onClick={handleAdd}
        >
          {FM('users.add')}
        </button>
      </div>
      <div className="flex items-center gap-3">
        <input
          aria-label={FM('users.search')}
          className={INPUT_CLASS}
          data-testid={TestIds.ADMIN_USERS_SEARCH}
          placeholder={FM('users.search')}
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div className="py-12 text-center text-text-muted">{FM('common.loading')}</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <UsersTable users={filtered} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      )}
      {showDialog ? (
        <UserDialog user={editingUser} onClose={closeDialog} onSave={handleSave} />
      ) : null}
    </div>
  );
});

UserManagementPage.displayName = 'UserManagementPage';

export default UserManagementPage;
