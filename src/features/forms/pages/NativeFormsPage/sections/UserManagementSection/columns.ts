/**
 * User grid column definitions for the native UserManagement TableNative.
 */
import type { TableColumn } from '@/components/ui/native';
import { TextAlign } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

const ID_WIDTH = 60;
const NAME_WIDTH = 140;
const EMAIL_WIDTH = 200;
const PHONE_WIDTH = 150;
const USERNAME_WIDTH = 140;
const ACTIONS_WIDTH = 120;

export function getNativeUserColumns(): TableColumn[] {
  return [
    { field: 'id', headerText: FM('common.id'), width: ID_WIDTH, textAlign: TextAlign.Right },
    { field: 'firstName', headerText: FM('forms.user.firstName'), width: NAME_WIDTH },
    { field: 'lastName', headerText: FM('forms.user.lastName'), width: NAME_WIDTH },
    { field: 'email', headerText: FM('common.email'), width: EMAIL_WIDTH },
    { field: 'phone', headerText: FM('forms.user.phone'), width: PHONE_WIDTH },
    { field: 'username', headerText: FM('forms.user.username'), width: USERNAME_WIDTH },
    { field: 'actions', headerText: FM('table.actions'), width: ACTIONS_WIDTH },
  ];
}
