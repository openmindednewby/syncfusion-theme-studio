/** Template component for the playground Actions column. */
import { memo, useMemo } from 'react';

import GridButtonNative, { GridButtonVariant } from '@/components/ui/native/GridButtonNative';
import GridDropdownNative from '@/components/ui/native/GridDropdownNative';
import type { GridDropdownItem } from '@/components/ui/shared/gridDropdownTypes';
import { FM } from '@/localization/utils/helpers';

interface Props {
  showEdit: boolean;
  showDelete: boolean;
  showKebab: boolean;
  showView?: boolean;
  showExport?: boolean;
  showArchive?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onExport?: () => void;
  onArchive?: () => void;
}

const stopPropagation = (e: React.MouseEvent): void => { e.stopPropagation(); };

const PlaygroundActionsCell = ({ showEdit, showDelete, showKebab, showView, showExport, showArchive, onEdit, onDelete, onView, onExport, onArchive }: Props): JSX.Element => {
  const kebabItems = useMemo<GridDropdownItem[]>(() => {
    const items: GridDropdownItem[] = [];
    if (showView !== true) items.push({ labelKey: 'gridShowcase.kebabView', testId: 'pg-action-view', ...(onView ? { onClick: onView } : {}) });
    if (showExport !== true) items.push({ labelKey: 'gridShowcase.kebabExport', testId: 'pg-action-export', ...(onExport ? { onClick: onExport } : {}) });
    if (showArchive !== true) items.push({ labelKey: 'gridShowcase.kebabArchive', testId: 'pg-action-archive', ...(onArchive ? { onClick: onArchive } : {}) });
    return items;
  }, [showView, showExport, showArchive, onView, onExport, onArchive]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- stop grid event handling on action buttons
    <div className="flex flex-wrap items-center justify-center gap-1" onClick={stopPropagation} onDoubleClick={stopPropagation}>
      {showEdit ? (
        <GridButtonNative ariaLabel={FM('common.edit')} testId="pg-action-edit" onClick={onEdit}>{FM('common.edit')}</GridButtonNative>
      ) : null}
      {showDelete ? (
        <GridButtonNative ariaLabel={FM('common.delete')} testId="pg-action-delete" variant={GridButtonVariant.Delete} onClick={onDelete}>{FM('common.delete')}</GridButtonNative>
      ) : null}
      {showView === true ? (
        <GridButtonNative ariaLabel={FM('gridShowcase.kebabView')} testId="pg-action-view-btn" variant={GridButtonVariant.View} onClick={onView}>{FM('gridShowcase.kebabView')}</GridButtonNative>
      ) : null}
      {showExport === true ? (
        <GridButtonNative ariaLabel={FM('gridShowcase.kebabExport')} testId="pg-action-export-btn" variant={GridButtonVariant.Export} onClick={onExport}>{FM('gridShowcase.kebabExport')}</GridButtonNative>
      ) : null}
      {showArchive === true ? (
        <GridButtonNative ariaLabel={FM('gridShowcase.kebabArchive')} testId="pg-action-archive-btn" variant={GridButtonVariant.Archive} onClick={onArchive}>{FM('gridShowcase.kebabArchive')}</GridButtonNative>
      ) : null}
      {showKebab && kebabItems.length > 0 ? (
        <GridDropdownNative ariaLabel={FM('common.moreActions')} items={kebabItems} testId="pg-action-kebab" />
      ) : null}
    </div>
  );
};

const MemoizedCell = memo(PlaygroundActionsCell);
MemoizedCell.displayName = 'PlaygroundActionsCell';

export { MemoizedCell as PlaygroundActionsCell };
