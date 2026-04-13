import { useCallback, useMemo, useState } from 'react';

import { FM } from '@/localization/utils/helpers';

import { PERMISSION_CATEGORIES } from '../constants';

import type { RoleDto, UpdateRolePayload } from '../types';

const TEST_ID_PREFIX = 'permissions-matrix';

interface CategoryRowsProps {
  category: string;
  permissions: string[];
  roles: RoleDto[];
  getPermissionsForRole: (role: RoleDto) => Set<string>;
  onToggle: (role: RoleDto, permission: string) => void;
}

const CategoryRows = ({
  category,
  permissions,
  roles,
  getPermissionsForRole,
  onToggle,
}: CategoryRowsProps): JSX.Element => (
  <>
    <tr className="bg-surface-secondary/30">
      <td
        className="sticky left-0 z-10 bg-surface-secondary/30 px-4 py-2 text-xs font-bold uppercase text-text-secondary"
        colSpan={roles.length + 1}
      >
        {category}
      </td>
    </tr>
    {permissions.map((perm) => (
      <tr key={perm} className="hover:bg-surface-secondary/20">
        <td className="sticky left-0 z-10 bg-surface-primary px-4 py-2 text-sm text-text-primary">
          {perm}
        </td>
        {roles.map((role) => {
          const rolePerms = getPermissionsForRole(role);
          const isChecked = rolePerms.has(perm);
          return (
            <td key={role.id} className="px-4 py-2 text-center">
              <input
                aria-label={FM('roleManagement.permissionToggle', perm, role.name)}
                checked={isChecked}
                className="h-4 w-4 rounded border-border-primary text-brand-primary focus:ring-brand-primary disabled:opacity-50"
                data-testid={`${TEST_ID_PREFIX}-${perm}-${String(role.id)}`}
                disabled={role.isBuiltIn}
                type="checkbox"
                onChange={() => onToggle(role, perm)}
              />
            </td>
          );
        })}
      </tr>
    ))}
  </>
);

interface PermissionsMatrixProps {
  roles: RoleDto[];
  onUpdateRole: (id: number, payload: UpdateRolePayload) => Promise<boolean>;
}

/**
 * Renders a grid of roles (columns) vs permission categories (rows).
 * Built-in roles show read-only checkboxes; custom roles are editable.
 */
export const PermissionsMatrix = ({
  roles,
  onUpdateRole,
}: PermissionsMatrixProps): JSX.Element => {
  const [pendingChanges, setPendingChanges] = useState<
    Record<number, Set<string>>
  >({});
  const [isSaving, setIsSaving] = useState(false);

  const editableRoles = useMemo(
    () => roles.filter((r) => !r.isBuiltIn),
    [roles],
  );

  const hasChanges = Object.keys(pendingChanges).length > 0;

  const getPermissionsForRole = useCallback(
    (role: RoleDto): Set<string> => {
      const pending = pendingChanges[role.id];
      if (pending) return pending;
      return new Set(role.permissions);
    },
    [pendingChanges],
  );

  const handleToggle = useCallback(
    (role: RoleDto, permission: string) => {
      if (role.isBuiltIn) return;

      setPendingChanges((prev) => {
        const current = prev[role.id] ?? new Set(role.permissions);
        const next = new Set(current);
        if (next.has(permission)) next.delete(permission);
        else next.add(permission);
        return { ...prev, [role.id]: next };
      });
    },
    [],
  );

  const handleSave = useCallback(async (): Promise<void> => {
    setIsSaving(true);
    const entries = Object.entries(pendingChanges);

    for (const [idStr, permSet] of entries) {
      const id = Number(idStr);
      const role = editableRoles.find((r) => r.id === id);
      if (!role) continue;
      await onUpdateRole(id, {
        name: role.name,
        description: role.description,
        permissions: [...permSet],
      });
    }

    setPendingChanges({});
    setIsSaving(false);
  }, [pendingChanges, editableRoles, onUpdateRole]);

  const handleDiscard = useCallback(() => {
    setPendingChanges({});
  }, []);

  const handleSaveClick = useCallback(() => {
    handleSave().catch(() => undefined);
  }, [handleSave]);

  return (
    <div
      className="card overflow-hidden"
      data-testid={`${TEST_ID_PREFIX}-container`}
    >
      <div className="flex items-center justify-between border-b border-border-primary p-4">
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('roleManagement.permissionsMatrix')}
        </h3>
        {hasChanges ? (
          <div className="flex gap-2">
            <button
              className="rounded-md border border-border-primary px-3 py-1.5 text-sm text-text-secondary hover:bg-surface-secondary"
              data-testid={`${TEST_ID_PREFIX}-discard`}
              disabled={isSaving}
              type="button"
              onClick={handleDiscard}
            >
              {FM('roleManagement.discardChanges')}
            </button>
            <button
              className="rounded-md bg-brand-primary px-3 py-1.5 text-sm text-white hover:bg-brand-primary-hover disabled:opacity-50"
              data-testid={`${TEST_ID_PREFIX}-save`}
              disabled={isSaving}
              type="button"
              onClick={handleSaveClick}
            >
              {isSaving
                ? FM('common.loading')
                : FM('roleManagement.saveChanges')}
            </button>
          </div>
        ) : null}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border-primary">
          <thead className="bg-surface-secondary">
            <tr>
              <th className="sticky left-0 z-10 bg-surface-secondary px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary">
                {FM('roleManagement.permission')}
              </th>
              {roles.map((role) => (
                <th
                  key={role.id}
                  className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-text-secondary"
                >
                  {role.name}
                  {role.isBuiltIn ? (
                    <span className="ml-1 text-text-tertiary">
                      ({FM('roleManagement.readOnly')})
                    </span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-primary bg-surface-primary">
            {Object.entries(PERMISSION_CATEGORIES).map(
              ([category, permissions]) => (
                <CategoryRows
                  key={category}
                  category={category}
                  getPermissionsForRole={getPermissionsForRole}
                  permissions={permissions}
                  roles={roles}
                  onToggle={handleToggle}
                />
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
