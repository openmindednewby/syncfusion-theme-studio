import { useCallback, useMemo, useState } from 'react';

import { useDialog } from '@/hooks/useDialog';
import { FM } from '@/localization/utils/helpers';

import type { CreateRolePayload, RoleDto } from '../types';

interface RoleDialogProps {
  isOpen: boolean;
  roles: RoleDto[];
  onClose: () => void;
  onCreate: (payload: CreateRolePayload) => Promise<boolean>;
}

const TEST_ID_PREFIX = 'role-dialog';

/** Dialog for creating a new custom role, optionally cloning from an existing one. */
export const RoleDialog = ({
  isOpen,
  roles,
  onClose,
  onCreate,
}: RoleDialogProps): JSX.Element | null => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cloneFromId, setCloneFromId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dialogOptions = useMemo(() => ({ isOpen, onClose }), [isOpen, onClose]);
  const { backdropProps, dialogProps, titleId } = useDialog(dialogOptions);

  const cloneSource = useMemo(() => {
    if (cloneFromId === '') return null;
    return roles.find((r) => r.id === Number(cloneFromId)) ?? null;
  }, [cloneFromId, roles]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      if (name.trim() === '') return;

      setIsSubmitting(true);
      const permissions = cloneSource?.permissions ?? [];
      const success = await onCreate({ name, description, permissions });
      setIsSubmitting(false);

      if (success) {
        setName('');
        setDescription('');
        setCloneFromId('');
        onClose();
      }
    },
    [name, description, cloneSource, onCreate, onClose],
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      data-testid={`${TEST_ID_PREFIX}-overlay`}
      {...backdropProps}
    >
      <div
        className="card w-full max-w-md p-6"
        data-testid={`${TEST_ID_PREFIX}-container`}
        {...dialogProps}
      >
        <h3
          className="mb-4 text-lg font-semibold text-text-primary"
          id={titleId}
        >
          {FM('roleManagement.createRole')}
        </h3>
        <form onSubmit={(e) => { handleSubmit(e).catch(() => undefined); }}>
          <div className="mb-4">
            <label
              className="mb-1 block text-sm font-medium text-text-secondary"
              htmlFor="role-name"
            >
              {FM('roleManagement.roleName')}
            </label>
            <input
              required
              className="w-full rounded-md border border-border-primary bg-surface-primary px-3 py-2 text-sm text-text-primary focus:border-brand-primary focus:outline-none"
              data-testid={`${TEST_ID_PREFIX}-name`}
              id="role-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-1 block text-sm font-medium text-text-secondary"
              htmlFor="role-description"
            >
              {FM('roleManagement.roleDescription')}
            </label>
            <textarea
              className="w-full rounded-md border border-border-primary bg-surface-primary px-3 py-2 text-sm text-text-primary focus:border-brand-primary focus:outline-none"
              data-testid={`${TEST_ID_PREFIX}-description`}
              id="role-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-1 block text-sm font-medium text-text-secondary"
              htmlFor="role-clone"
            >
              {FM('roleManagement.cloneFrom')}
            </label>
            <select
              className="w-full rounded-md border border-border-primary bg-surface-primary px-3 py-2 text-sm text-text-primary focus:border-brand-primary focus:outline-none"
              data-testid={`${TEST_ID_PREFIX}-clone`}
              id="role-clone"
              value={cloneFromId}
              onChange={(e) => setCloneFromId(e.target.value)}
            >
              <option value="">{FM('roleManagement.noClone')}</option>
              {roles.map((role) => (
                <option key={role.id} value={String(role.id)}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="rounded-md border border-border-primary px-4 py-2 text-sm text-text-secondary hover:bg-surface-secondary"
              data-testid={`${TEST_ID_PREFIX}-cancel`}
              disabled={isSubmitting}
              type="button"
              onClick={onClose}
            >
              {FM('common.cancel')}
            </button>
            <button
              className="rounded-md bg-brand-primary px-4 py-2 text-sm text-white hover:bg-brand-primary-hover disabled:opacity-50"
              data-testid={`${TEST_ID_PREFIX}-submit`}
              disabled={isSubmitting || name.trim() === ''}
              type="submit"
            >
              {isSubmitting
                ? FM('common.loading')
                : FM('common.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
