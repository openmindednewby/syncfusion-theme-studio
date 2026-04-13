import { useCallback, useState } from 'react';

import { LoadingSpinner } from '@/components/common/components/LoadingSpinner';
import { FM } from '@/localization/utils/helpers';
import { useHasPermission } from '@/shared/hooks/useHasPermission';
import { Permission } from '@/shared/permissions';
import { isValueDefined } from '@/utils/is';

import { PermissionsMatrix } from './components/PermissionsMatrix';
import { RoleDialog } from './components/RoleDialog';
import { RolesTable } from './components/RolesTable';
import { useRoleManagement } from './hooks/useRoleManagement';

import type { RoleDto } from './types';

const TEST_ID_PREFIX = 'role-management';

const RoleManagementPage = (): JSX.Element => {
  const hasManageRoles = useHasPermission(Permission.ManageRoles);
  const { roles, isLoading, error, createRole, updateRole, deleteRole } =
    useRoleManagement();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleDto | null>(null);

  const handleOpenDialog = useCallback(() => setIsDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setIsDialogOpen(false), []);

  const handleEditPermissions = useCallback((role: RoleDto) => {
    setSelectedRole(role);
  }, []);

  const handleDelete = useCallback(
    (role: RoleDto) => {
      deleteRole(role.id).catch(() => undefined);
    },
    [deleteRole],
  );

  if (!hasManageRoles)
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-text-secondary">
          {FM('roleManagement.noAccess')}
        </p>
      </div>
    );

  if (isLoading) return <LoadingSpinner />;

  if (isValueDefined(error))
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2">
        <p className="text-error-500">{error}</p>
      </div>
    );

  return (
    <div className="space-y-6" data-testid={`${TEST_ID_PREFIX}-page`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            {FM('roleManagement.title')}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {FM('roleManagement.subtitle')}
          </p>
        </div>
        <button
          className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover"
          data-testid={`${TEST_ID_PREFIX}-create-btn`}
          type="button"
          onClick={handleOpenDialog}
        >
          {FM('roleManagement.createRole')}
        </button>
      </div>

      <RolesTable
        roles={roles}
        onDelete={handleDelete}
        onEditPermissions={handleEditPermissions}
      />

      <PermissionsMatrix
        key={selectedRole?.id ?? 'all'}
        roles={roles}
        onUpdateRole={updateRole}
      />

      <RoleDialog
        isOpen={isDialogOpen}
        roles={roles}
        onClose={handleCloseDialog}
        onCreate={createRole}
      />
    </div>
  );
};

export default RoleManagementPage;
