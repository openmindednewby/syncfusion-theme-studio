import { useMemo, useState } from 'react';

import { useDialog } from '@/hooks/useDialog';
import { FM } from '@/localization/utils/helpers';
import { Role } from '@/shared/permissions';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils/is';

import type { UserFormData, UserWithId } from '../types';

interface UserDialogProps {
  user: UserWithId | null;
  onSave: (data: UserFormData) => void;
  onClose: () => void;
}

const INPUT_CLASS =
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';
const LABEL_CLASS = 'mb-1 block text-sm font-medium text-text-secondary';

const ROLE_OPTIONS = [Role.Admin, Role.Manager, Role.Viewer, Role.Analyst] as const;

const UserDialog = ({ user, onSave, onClose }: UserDialogProps): JSX.Element => {
  const isEditing = isValueDefined(user);
  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [role, setRole] = useState(user?.role ?? '');

  const dialogOptions = useMemo(() => ({ isOpen: true, onClose }), [onClose]);
  const { backdropProps, dialogProps, titleId } = useDialog(dialogOptions);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSave({ firstName, lastName, email, phone, role });
  };

  const titleKey = isEditing ? 'users.dialog.editTitle' : 'users.dialog.createTitle';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      data-testid={TestIds.ADMIN_USERS_DIALOG}
      {...backdropProps}
    >
      <div
        className="w-full max-w-md rounded-lg bg-surface p-6 shadow-xl"
        {...dialogProps}
      >
        <h2
          className="mb-4 text-lg font-semibold text-text-primary"
          id={titleId}
        >
          {FM(titleKey)}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLASS}>{FM('users.dialog.firstName')}</label>
              <input
                required
                className={INPUT_CLASS}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className={LABEL_CLASS}>{FM('users.dialog.lastName')}</label>
              <input
                required
                className={INPUT_CLASS}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className={LABEL_CLASS}>{FM('users.dialog.email')}</label>
            <input
              required
              className={INPUT_CLASS}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className={LABEL_CLASS}>{FM('users.dialog.phone')}</label>
            <input
              className={INPUT_CLASS}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className={LABEL_CLASS}>{FM('users.dialog.role')}</label>
            <select
              required
              aria-label={FM('users.dialog.role')}
              className={INPUT_CLASS}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">{FM('users.dialog.selectRole')}</option>
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {FM(`users.role.${r.toLowerCase()}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              className="rounded-md px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover"
              data-testid={TestIds.ADMIN_USERS_DIALOG_CANCEL}
              type="button"
              onClick={onClose}
            >
              {FM('common.cancel')}
            </button>
            <button
              className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700"
              data-testid={TestIds.ADMIN_USERS_DIALOG_SAVE}
              type="submit"
            >
              {FM('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDialog;
