/** Reusable confirmation dialog for playground delete/archive actions. */
import { memo } from 'react';

import { DialogNative, DialogVariant } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  testId: string;
}

const PlaygroundConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, testId }: Props): JSX.Element => (
  <DialogNative
    isOpen={isOpen}
    primaryButton={{ text: FM('common.confirm'), onClick: onConfirm, testId: `${testId}-confirm-btn` }}
    secondaryButton={{ text: FM('common.cancel'), onClick: onCancel, testId: `${testId}-cancel-btn` }}
    testId={testId}
    title={title}
    variant={DialogVariant.Danger}
    onClose={onCancel}
  >
    <p className="text-sm text-text-secondary">{message}</p>
  </DialogNative>
);

const Memoized = memo(PlaygroundConfirmDialog);
Memoized.displayName = 'PlaygroundConfirmDialog';

export { Memoized as PlaygroundConfirmDialog };
