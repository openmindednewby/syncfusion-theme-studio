/**
 * UsersTable - Native table sub-component for user CRUD.
 *
 * Renders the user list with edit/delete action buttons per row
 * using TableNative instead of Syncfusion DataGrid.
 */
import { useMemo, useCallback } from 'react';

import type { UserDto } from '@/api/generated/mockserver/models';
import { ButtonNative, ButtonVariant, TableNative } from '@/components/ui/native';
import type { TableColumn } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

interface Props {
  columns: TableColumn[];
  users: UserDto[];
  onEdit: (user: UserDto) => void;
  onDelete: (id: number) => void;
}

/** Transform UserDto for table display */
function transformForTable(user: UserDto): Record<string, unknown> {
  return {
    id: user.id,
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '-',
    username: user.username ?? '',
  };
}

export const UsersTable = ({ columns, users, onEdit, onDelete }: Props): JSX.Element => {
  const actionsTemplate = useCallback(
    (rowData: Record<string, unknown>) => {
      const userId = Number(rowData['id']);
      const user = users.find((u) => u.id === userId);

      return (
        <div className="flex gap-1">
          <ButtonNative
            testId={`native-user-edit-${String(userId)}`}
            variant={ButtonVariant.Ghost}
            onClick={() => {
              if (isValueDefined(user)) onEdit(user);
            }}
          >
            {FM('common.edit')}
          </ButtonNative>
          <ButtonNative
            testId={`native-user-delete-${String(userId)}`}
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

  const columnsWithActions = useMemo(
    () =>
      columns.map((col) =>
        col.field === 'actions' ? { ...col, template: actionsTemplate } : col,
      ),
    [columns, actionsTemplate],
  );

  const tableData = useMemo(() => users.map(transformForTable), [users]);

  return (
    <TableNative
      columns={columnsWithActions}
      data={tableData}
      emptyText={FM('forms.user.noUsersFound')}
      testId="native-user-crud-table"
    />
  );
};
