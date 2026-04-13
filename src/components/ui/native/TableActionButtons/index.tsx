/**
 * TableActionButtons renders styled Edit and Delete action buttons
 * for business page table rows. Uses outlined button styling with
 * icons to replace bare text links.
 */
import { memo, useState, useCallback } from 'react';

import { IconEdit2 } from '@/components/icons/FeatherIconsE';
import { IconTrash2 } from '@/components/icons/FeatherIconsT';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

interface EditOnlyProps {
  /** Test ID prefix for E2E testing */
  testIdPrefix: string;
  /** Callback when edit button is clicked */
  onEdit: () => void;
}

interface DeleteOnlyProps {
  /** Test ID prefix for E2E testing */
  testIdPrefix: string;
  /** Callback when delete is confirmed */
  onDelete: () => void;
  /** Localization key for confirm text (defaults to common.confirm) */
  confirmKey?: string;
}

interface EditDeleteProps {
  /** Test ID prefix for E2E testing */
  testIdPrefix: string;
  /** Callback when edit button is clicked */
  onEdit: () => void;
  /** Callback when delete is confirmed */
  onDelete: () => void;
  /** Localization key for confirm text (defaults to common.confirm) */
  confirmKey?: string;
}

const ICON_CLASS = 'shrink-0';
const BTN_BASE = 'inline-flex items-center gap-1 rounded border px-2 py-1 text-xs font-medium transition-colors min-h-[32px]';
const EDIT_BTN = `${BTN_BASE} border-primary-300 text-primary-600 hover:bg-primary-50 dark:border-primary-600 dark:text-primary-400 dark:hover:bg-primary-900/30`;
const DELETE_BTN = `${BTN_BASE} border-error-300 text-error-600 hover:bg-error-50 dark:border-error-600 dark:text-error-400 dark:hover:bg-error-900/30`;
const CANCEL_BTN = 'text-xs text-text-muted hover:underline min-h-[32px]';

/** Edit-only action button */
export const EditButton = memo(({ testIdPrefix, onEdit }: EditOnlyProps): JSX.Element => (
  <button
    className={EDIT_BTN}
    data-testid={`${testIdPrefix}-edit`}
    type="button"
    onClick={onEdit}
  >
    <IconEdit2 className={ICON_CLASS} />
    {FM('common.edit')}
  </button>
));
EditButton.displayName = 'EditButton';

/** Delete button with inline confirmation */
export const DeleteButton = memo(({
  testIdPrefix, onDelete, confirmKey = 'common.confirm',
}: DeleteOnlyProps): JSX.Element => {
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = useCallback(() => {
    onDelete();
    setConfirming(false);
  }, [onDelete]);

  const handleCancel = useCallback(() => {
    setConfirming(false);
  }, []);

  if (confirming)
    return (
      <span className="flex items-center gap-2">
        <button
          className={DELETE_BTN}
          data-testid={`${testIdPrefix}-confirm`}
          type="button"
          onClick={handleConfirm}
        >
          {FM(confirmKey)}
        </button>
        <button
          aria-label={FM('common.cancel')}
          className={CANCEL_BTN}
          data-testid={`${testIdPrefix}-cancel`}
          type="button"
          onClick={handleCancel}
        >
          {FM('common.cancel')}
        </button>
      </span>
    );

  return (
    <button
      className={DELETE_BTN}
      data-testid={`${testIdPrefix}-delete`}
      type="button"
      onClick={() => setConfirming(true)}
    >
      <IconTrash2 className={ICON_CLASS} />
      {FM('common.delete')}
    </button>
  );
});
DeleteButton.displayName = 'DeleteButton';

/** Combined Edit + Delete action buttons for a table row */
const TableActionButtons = ({
  testIdPrefix, onEdit, onDelete, confirmKey,
}: EditDeleteProps): JSX.Element => (
  <div className="flex items-center gap-2">
    <EditButton testIdPrefix={testIdPrefix} onEdit={onEdit} />
    <DeleteButton
      {...(isValueDefined(confirmKey) ? { confirmKey } : {})}
      testIdPrefix={testIdPrefix}
      onDelete={onDelete}
    />
  </div>
);

export default memo(TableActionButtons);
export type { EditDeleteProps as TableActionButtonsProps };
