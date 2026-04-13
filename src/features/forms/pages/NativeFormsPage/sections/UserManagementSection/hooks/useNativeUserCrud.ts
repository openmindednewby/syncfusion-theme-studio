/**
 * useNativeUserCrud - Manages CRUD operations for users (native version).
 *
 * Orchestrates create/update/delete mutations with query invalidation.
 * Same logic as Syncfusion's useUserCrud but imports from NativeUserForm schema.
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

import type { NativeUserFormData } from '../../../forms/NativeUserForm/schema';

export interface NativeUserCrudResult {
  users: UserDto[];
  totalUsers: number;
  editingUser: UserDto | null;
  isLoadingUsers: boolean;
  isMutating: boolean;
  setEditingUser: (user: UserDto | null) => void;
  handleFormSubmit: (data: NativeUserFormData) => void;
  handleDelete: (id: number) => void;
}

/** Convert form data to API payload */
function toPayload(data: NativeUserFormData): CreateUserRequest {
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

const USERS_PAGE_SIZE = 10;
const INITIAL_SKIP = 0;

/** Encapsulates all mutation instances and their callbacks */
function useUserMutationCallbacks(
  editingUser: UserDto | null,
  clearEditing: () => void,
  invalidateList: () => void,
): Pick<NativeUserCrudResult, 'isMutating' | 'handleFormSubmit' | 'handleDelete'> {
  const createMut = useMockServerWebUsersCreate();
  const updateMut = useMockServerWebUsersUpdate();
  const deleteMut = useMockServerWebUsersDelete();

  const handleFormSubmit = useCallback((data: NativeUserFormData): void => {
    const payload = toPayload(data);
    const onDone = (): void => { clearEditing(); invalidateList(); };
    if (isValueDefined(editingUser?.id))
      updateMut.mutate({ id: editingUser.id, data: payload }, { onSuccess: onDone });
    else createMut.mutate({ data: payload }, { onSuccess: invalidateList });
  }, [editingUser, createMut, updateMut, invalidateList, clearEditing]);

  const handleDelete = useCallback((id: number): void => {
    deleteMut.mutate({ id }, {
      onSuccess: (): void => {
        if (editingUser?.id === id) clearEditing();
        invalidateList();
      },
    });
  }, [deleteMut, editingUser, invalidateList, clearEditing]);

  return {
    isMutating: createMut.isPending || updateMut.isPending || deleteMut.isPending,
    handleFormSubmit,
    handleDelete,
  };
}

export function useNativeUserCrud(): NativeUserCrudResult {
  const [editingUser, setEditingUser] = useState<UserDto | null>(null);
  const invalidateList = useInvalidateUsers();
  const clearEditing = useCallback((): void => setEditingUser(null), []);
  const queryParams = useMemo(() => ({ skip: INITIAL_SKIP, limit: USERS_PAGE_SIZE }), []);
  const { data: usersData, isLoading: isLoadingUsers } = useMockServerWebUsersList(queryParams);
  const { isMutating, handleFormSubmit, handleDelete } =
    useUserMutationCallbacks(editingUser, clearEditing, invalidateList);

  const responseData = usersData?.data;

  return {
    users: responseData?.items ?? [],
    totalUsers: responseData?.total ?? 0,
    editingUser,
    isLoadingUsers,
    isMutating,
    setEditingUser,
    handleFormSubmit,
    handleDelete,
  };
}
