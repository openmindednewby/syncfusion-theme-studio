/** Renders all playground action dialogs (edit, view, delete, archive). */
import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';

import { PlaygroundConfirmDialog } from './PlaygroundConfirmDialog';
import { PlaygroundEditDialog } from './PlaygroundEditDialog';
import { PlaygroundViewDialog } from './PlaygroundViewDialog';

import type { PlaygroundActions } from '../hooks/usePlaygroundActions';

interface Props {
  actions: PlaygroundActions;
  testPrefix: string;
}

const PlaygroundDialogs = ({ actions, testPrefix }: Props): JSX.Element => (
  <>
    <PlaygroundEditDialog
      isOpen={actions.editState.isOpen}
      row={actions.editState.row}
      testId={`${testPrefix}-edit-dialog`}
      onCancel={actions.handleEditClose}
      onSave={actions.handleEditSave}
    />
    <PlaygroundViewDialog
      isOpen={actions.viewState.isOpen}
      row={actions.viewState.row}
      testId={`${testPrefix}-view-dialog`}
      onClose={actions.handleViewClose}
    />
    <PlaygroundConfirmDialog
      isOpen={actions.deleteState.isOpen}
      message={FM('gridShowcase.deleteConfirmMessage', String(actions.deleteState.row?.['name'] ?? ''))}
      testId={`${testPrefix}-delete-dialog`}
      title={FM('gridShowcase.deleteConfirmTitle')}
      onCancel={actions.handleDeleteClose}
      onConfirm={actions.handleDeleteConfirm}
    />
    <PlaygroundConfirmDialog
      isOpen={actions.archiveState.isOpen}
      message={FM('gridShowcase.archiveConfirmMessage', String(actions.archiveState.row?.['name'] ?? ''))}
      testId={`${testPrefix}-archive-dialog`}
      title={FM('gridShowcase.archiveConfirmTitle')}
      onCancel={actions.handleArchiveClose}
      onConfirm={actions.handleArchiveConfirm}
    />
  </>
);

const Memoized = memo(PlaygroundDialogs);
Memoized.displayName = 'PlaygroundDialogs';

export { Memoized as PlaygroundDialogs };
