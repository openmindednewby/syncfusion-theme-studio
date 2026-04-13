/**
 * UserManagementSection (Native) - Full CRUD interface for users.
 *
 * Renders a native user form (create/edit) above a TableNative that shows
 * all users from the MockServer API. Supports edit and delete actions.
 */
import { useMemo, useCallback } from 'react';

import type { UserDto } from '@/api/generated/mockserver/models';
import { LoadingSpinner } from '@/components/common/components/LoadingSpinner';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import { getNativeUserColumns } from './columns';
import { UsersTable } from './components/UsersTable';
import { useNativeUserCrud } from './hooks/useNativeUserCrud';
import { FormSection } from '../../../SyncfusionFormsPage/components/FormSection';
import { NativeUserForm } from '../../forms/NativeUserForm';

import type { NativeUserFormData } from '../../forms/NativeUserForm/schema';

export const NativeUserManagementSection = (): JSX.Element => {
  const {
    users,
    editingUser,
    isLoadingUsers,
    isMutating,
    setEditingUser,
    handleFormSubmit,
    handleDelete,
  } = useNativeUserCrud();

  const formDefaults = useMemo(
    () => (isValueDefined(editingUser) ? toFormDefaults(editingUser) : undefined),
    [editingUser],
  );

  const columns = useMemo(() => getNativeUserColumns(), []);

  const handleEdit = useCallback(
    (user: UserDto) => {
      setEditingUser(user);
    },
    [setEditingUser],
  );

  const handleCancelEdit = useCallback(() => {
    setEditingUser(null);
  }, [setEditingUser]);

  const isEditing = isValueDefined(editingUser);
  const formTitle = isEditing ? FM('forms.user.editTitle') : FM('forms.user.title');
  const formDescription = isEditing
    ? FM('forms.user.editDescription')
    : FM('forms.user.description');

  return (
    <div className="space-y-6">
      <FormSection description={formDescription} title={formTitle}>
        {isEditing ? (
          <div className="mb-4 flex items-center justify-between rounded-md bg-primary-50 px-4 py-2 dark:bg-primary-900/20">
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              {FM('forms.user.editingBanner', editingUser.username ?? '')}
            </span>
            <ButtonNative
              testId="native-user-form-cancel-edit"
              variant={ButtonVariant.Ghost}
              onClick={handleCancelEdit}
            >
              {FM('common.cancel')}
            </ButtonNative>
          </div>
        ) : null}

        <NativeUserForm
          isEditing={isEditing}
          isSubmitting={isMutating}
          onSubmit={handleFormSubmit}
          {...(isValueDefined(formDefaults) ? { defaultValues: formDefaults } : {})}
        />
      </FormSection>

      <div className="card p-0">
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-lg font-semibold text-text-primary">
            {FM('forms.user.gridTitle')}
          </h2>
        </div>
        {isLoadingUsers ? (
          <LoadingSpinner />
        ) : (
          <UsersTable
            columns={columns}
            users={users}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

/** Map a UserDto to form default values */
function toFormDefaults(user: UserDto): Partial<NativeUserFormData> {
  return {
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '',
    username: user.username ?? '',
  };
}
