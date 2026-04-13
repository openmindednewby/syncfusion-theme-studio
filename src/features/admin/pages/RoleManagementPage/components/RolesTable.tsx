import { FM } from '@/localization/utils/helpers';

import { RoleBadge } from './RoleBadge';

import type { RoleDto } from '../types';


interface RolesTableProps {
  roles: RoleDto[];
  onEditPermissions: (role: RoleDto) => void;
  onDelete: (role: RoleDto) => void;
}

const TEST_ID_PREFIX = 'role-management';

/** Table listing all roles with their type and available actions. */
export const RolesTable = ({
  roles,
  onEditPermissions,
  onDelete,
}: RolesTableProps): JSX.Element => {
  return (
    <div
      className="card overflow-hidden"
      data-testid={`${TEST_ID_PREFIX}-table`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border-primary">
          <thead className="bg-surface-secondary">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary">
                {FM('roleManagement.columns.name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary">
                {FM('roleManagement.columns.description')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary">
                {FM('roleManagement.columns.type')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-secondary">
                {FM('roleManagement.columns.permissions')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-secondary">
                {FM('roleManagement.columns.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-primary bg-surface-primary">
            {roles.map((role) => (
              <tr
                key={role.id}
                className="hover:bg-surface-secondary/50 transition-colors"
                data-testid={`${TEST_ID_PREFIX}-row-${String(role.id)}`}
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-text-primary">
                  {role.name}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {role.description}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <RoleBadge isBuiltIn={role.isBuiltIn} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">
                  {String(role.permissions.length)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <button
                    className="text-brand-primary hover:text-brand-primary-hover mr-3 font-medium"
                    data-testid={`${TEST_ID_PREFIX}-edit-${String(role.id)}`}
                    type="button"
                    onClick={() => onEditPermissions(role)}
                  >
                    {FM('roleManagement.editPermissions')}
                  </button>
                  {!role.isBuiltIn && (
                    <button
                      className="text-error-500 hover:text-error-700 font-medium"
                      data-testid={`${TEST_ID_PREFIX}-delete-${String(role.id)}`}
                      type="button"
                      onClick={() => onDelete(role)}
                    >
                      {FM('common.delete')}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
