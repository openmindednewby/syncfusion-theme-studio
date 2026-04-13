/** Read-only detail modal for the playground View action. */
import { memo } from 'react';

import { DialogNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

type Row = Record<string, unknown>;

interface Props {
  isOpen: boolean;
  row: Row | null;
  testId: string;
  onClose: () => void;
}

const PlaygroundViewDialog = ({ isOpen, row, testId, onClose }: Props): JSX.Element => (
  <DialogNative
    isOpen={isOpen}
    secondaryButton={{ text: FM('common.close'), onClick: onClose, testId: 'pg-view-close-btn' }}
    testId={testId}
    title={FM('gridShowcase.viewDialogTitle')}
    onClose={onClose}
  >
    {row ? (
      <dl className="space-y-2 text-sm">
        {Object.entries(row).map(([key, value]) => (
          <div key={key} className="flex justify-between gap-4">
            <dt className="font-medium capitalize text-text-secondary">{key}</dt>
            <dd className="text-right text-text-primary">{String(value)}</dd>
          </div>
        ))}
      </dl>
    ) : null}
  </DialogNative>
);

const Memoized = memo(PlaygroundViewDialog);
Memoized.displayName = 'PlaygroundViewDialog';

export { Memoized as PlaygroundViewDialog };
