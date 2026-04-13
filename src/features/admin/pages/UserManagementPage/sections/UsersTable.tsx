import BusinessTableShell from '@/components/ui/native/BusinessTableShell';
import TableActionButtons from '@/components/ui/native/TableActionButtons';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import UserRoleBadge from './UserRoleBadge';
import UserStatusBadge from './UserStatusBadge';

import type { UserWithId } from '../types';

interface UsersTableProps {
  users: UserWithId[];
  onEdit: (user: UserWithId) => void;
  onDelete: (id: number) => void;
}

const COLUMN_KEYS = [
  'users.column.name',
  'users.column.email',
  'users.column.phone',
  'users.column.role',
  'users.column.status',
  'users.column.actions',
] as const;

const HEADER_CLASSES = 'sticky top-0 z-10 bg-surface-hover';

const UsersTable = ({ users, onEdit, onDelete }: UsersTableProps): JSX.Element => {
  if (users.length === 0)
    return (
      <div className="py-12 text-center text-text-secondary">{FM('users.empty')}</div>
    );

  return (
    <BusinessTableShell resultCount={users.length} testId={TestIds.ADMIN_USERS_TABLE}>
      <table className="w-full min-w-[700px] text-sm">
        <thead className={HEADER_CLASSES}>
          <tr className="border-b border-border bg-surface-hover">
            {COLUMN_KEYS.map((key) => (
              <th
                key={key}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-muted"
              >
                {FM(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {users.map((u, idx) => (
            <tr
              key={u.id}
              className={`transition-colors duration-150 hover:bg-surface-hover ${idx % 2 === 1 ? 'bg-surface/50' : ''}`}
            >
              <td className="px-4 py-3 font-medium text-text-primary">
                {u.firstName} {u.lastName}
              </td>
              <td className="px-4 py-3 text-text-secondary">{u.email ?? '\u2014'}</td>
              <td className="px-4 py-3 text-text-muted">{u.phone ?? '\u2014'}</td>
              <td className="px-4 py-3">
                <UserRoleBadge role={u.role} />
              </td>
              <td className="px-4 py-3">
                <UserStatusBadge isActive={u.isActive === true} />
              </td>
              <td className="px-4 py-3">
                <TableActionButtons
                  testIdPrefix={`user-${String(u.id)}`}
                  onDelete={() => onDelete(u.id)}
                  onEdit={() => onEdit(u)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </BusinessTableShell>
  );
};

export default UsersTable;
