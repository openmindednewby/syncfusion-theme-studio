/**
 * useUserCrud - Manages CRUD operations for users.
 *
 * Orchestrates create/update/delete mutations with query invalidation.
 * Keeps the component focused on rendering.
 */
import { useState, useCallback, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import type { UserDto, CreateUserRequest } from '@/api/generated/mockserver/models';
import {
  useMockServerWebUsersList,
  useMockServerWebUsersCreate,
  useMockServerWebUsersUpdate,
  useMockServerWebUsersDelete,
  getMockServerWebUsersListQueryKey,
} from '@/api/generated/mockserver/users/users';
import { isValueDefined } from '@/utils/is';

import type { UserFormData } from '../../forms/UserForm/schema';

/** Convert form data to API payload */
function toPayload(data: UserFormData): CreateUserRequest {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    username: data.username,
    ...(isValueDefined(data.phone) ? { phone: data.phone } : {}),
  };
}

function useInvalidateUsers(): () => void {
  const queryClient = useQueryClient();

  return useCallback((): void => {
    queryClient
      .invalidateQueries({ queryKey: getMockServerWebUsersListQueryKey() })
      .catch(() => undefined);
  }, [queryClient]);
}

interface UserCrudResult {
  users: UserDto[];
  totalUsers: number;
  editingUser: UserDto | null;
  isLoadingUsers: boolean;
  isMutating: boolean;
  setEditingUser: (user: UserDto | null) => void;
  handleFormSubmit: (data: UserFormData) => void;
  handleDelete: (id: number) => void;
}

function useUserSubmit(
  editingUser: UserDto | null,
  invalidateList: () => void,
  clearEditing: () => void,
): { handleFormSubmit: (data: UserFormData) => void; isSubmitting: boolean } {
  const createMut = useMockServerWebUsersCreate();
  const updateMut = useMockServerWebUsersUpdate();

  const handleFormSubmit = useCallback(
    (data: UserFormData): void => {
      const payload = toPayload(data);
      const editId = editingUser?.id;
      const onDone = (): void => { clearEditing(); invalidateList(); };

      if (isValueDefined(editId))
        updateMut.mutate({ id: editId, data: payload }, { onSuccess: onDone });
      else
        createMut.mutate({ data: payload }, { onSuccess: invalidateList });
    },
    [editingUser, createMut, updateMut, invalidateList, clearEditing],
  );

  return { handleFormSubmit, isSubmitting: createMut.isPending || updateMut.isPending };
}

function useUserDelete(
  editingUser: UserDto | null,
  invalidateList: () => void,
  clearEditing: () => void,
): { handleDelete: (id: number) => void; isDeleting: boolean } {
  const deleteMut = useMockServerWebUsersDelete();

  const handleDelete = useCallback(
    (id: number): void => {
      deleteMut.mutate({ id }, {
        onSuccess: (): void => {
          if (editingUser?.id === id) clearEditing();
          invalidateList();
        },
      });
    },
    [deleteMut, editingUser, invalidateList, clearEditing],
  );

  return { handleDelete, isDeleting: deleteMut.isPending };
}

const USERS_PAGE_SIZE = 10;
const INITIAL_SKIP = 0;

export function useUserCrud(): UserCrudResult {
  const [editingUser, setEditingUser] = useState<UserDto | null>(null);
  const invalidateList = useInvalidateUsers();
  const clearEditing = useCallback((): void => setEditingUser(null), []);

  const queryParams = useMemo(() => ({ skip: INITIAL_SKIP, limit: USERS_PAGE_SIZE }), []);
  const { data: usersData, isLoading: isLoadingUsers } = useMockServerWebUsersList(queryParams);

  const { handleFormSubmit, isSubmitting } = useUserSubmit(editingUser, invalidateList, clearEditing);
  const { handleDelete, isDeleting } = useUserDelete(editingUser, invalidateList, clearEditing);

  const responseData = usersData?.data;
  const users = responseData?.items ?? [];
  const totalUsers = responseData?.total ?? 0;

  return {
    users, totalUsers, editingUser, isLoadingUsers,
    isMutating: isSubmitting || isDeleting,
    setEditingUser, handleFormSubmit, handleDelete,
  };
}
