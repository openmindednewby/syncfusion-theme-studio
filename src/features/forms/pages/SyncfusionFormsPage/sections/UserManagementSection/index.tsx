/**
 * UserManagementSection - Full CRUD interface for users.
 *
 * Renders a user form (create/edit) above a DataGrid that shows
 * all users from the MockServer API. Supports edit and delete actions.
 */
import { useMemo, useCallback } from 'react';

import type { UserDto } from '@/api/generated/mockserver/models';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { DataGrid } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';
import { isValueDefined } from '@/utils/is';

import { getUserColumns } from './columns';
import { useUserCrud } from './useUserCrud';
import { FormSection } from '../../components/FormSection';
import { UserForm } from '../../forms/UserForm';

import type { UserFormData } from '../../forms/UserForm/schema';

/** Transform UserDto for grid display */
function transformForGrid(user: UserDto): Record<string, unknown> {
  return {
    id: user.id,
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '-',
    username: user.username ?? '',
  };
}

/** Map a UserDto to form default values */
function toFormDefaults(user: UserDto): Partial<UserFormData> {
  return {
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '',
    username: user.username ?? '',
  };
}

// --- Extracted sub-component to stay under 200 lines ---

const GRID_HEIGHT = '400';

interface UsersGridProps {
  gridData: Array<Record<string, unknown>>;
  columns: ReturnType<typeof getUserColumns>;
  users: UserDto[];
  onEdit: (user: UserDto) => void;
  onDelete: (id: number) => void;
}

const UsersGrid = ({
  gridData,
  columns,
  users,
  onEdit,
  onDelete,
}: UsersGridProps): JSX.Element => {
  /** Render action buttons for each row */
  const actionsTemplate = useCallback(
    (rowData: Record<string, unknown>) => {
      const userId = Number(rowData['id']);
      const user = users.find((u) => u.id === userId);

      return (
        <div className="flex gap-1">
          <ButtonNative
            testId={`user-edit-${String(userId)}`}
            variant={ButtonVariant.Ghost}
            onClick={() => {
              if (isValueDefined(user)) onEdit(user);
            }}
          >
            {FM('common.edit')}
          </ButtonNative>
          <ButtonNative
            testId={`user-delete-${String(userId)}`}
            variant={ButtonVariant.Danger}
            onClick={() => onDelete(userId)}
          >
            {FM('common.delete')}
          </ButtonNative>
        </div>
      );
    },
    [users, onEdit, onDelete],
  );

  // Add template to actions column
  const columnsWithActions = useMemo(
    () =>
      columns.map((col) =>
        col.field === 'actions' ? { ...col, template: actionsTemplate } : col,
      ),
    [columns, actionsTemplate],
  );

  return (
    <DataGrid
      columns={columnsWithActions}
      data={gridData}
      emptyText={FM('forms.user.noUsersFound')}
      height={GRID_HEIGHT}
      testId="user-crud-grid"
    />
  );
};

// --- Main section component ---

export const UserManagementSection = (): JSX.Element => {
  const {
    users,
    editingUser,
    isLoadingUsers,
    isMutating,
    setEditingUser,
    handleFormSubmit,
    handleDelete,
  } = useUserCrud();

  const formDefaults = useMemo(
    () => (isValueDefined(editingUser) ? toFormDefaults(editingUser) : undefined),
    [editingUser],
  );

  const columns = useMemo(() => getUserColumns(), []);
  const gridData = useMemo(() => users.map(transformForGrid), [users]);

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
      {/* Form Section */}
      <FormSection description={formDescription} title={formTitle}>
        {isEditing ? (
          <div className="mb-4 flex items-center justify-between rounded-md bg-primary-50 px-4 py-2 dark:bg-primary-900/20">
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              {FM('forms.user.editingBanner', editingUser.username ?? '')}
            </span>
            <ButtonNative
              testId="user-form-cancel-edit"
              variant={ButtonVariant.Ghost}
              onClick={handleCancelEdit}
            >
              {FM('common.cancel')}
            </ButtonNative>
          </div>
        ) : null}

        <UserForm
          defaultValues={formDefaults}
          isEditing={isEditing}
          isSubmitting={isMutating}
          onSubmit={handleFormSubmit}
        />
      </FormSection>

      {/* Users DataGrid */}
      <div className="card p-0">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-lg font-semibold text-text-primary">
            {FM('forms.user.gridTitle')}
          </h3>
        </div>
        {isLoadingUsers ? (
          <LoadingSpinner />
        ) : (
          <UsersGrid
            columns={columns}
            gridData={gridData}
            users={users}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};
