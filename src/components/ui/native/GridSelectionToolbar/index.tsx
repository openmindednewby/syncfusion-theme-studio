/**
 * GridSelectionToolbar — shows a "SELECTED n" badge, removable chips
 * for each selected item, and a CLEAR button.
 * Styled via --component-datagrid-selbar-* CSS variables.
 */
import { memo } from 'react';

import { ChipCheckIcon, ChipCloseIcon } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

export interface SelectedItem {
  key: string;
  label: string;
}

export interface GridSelectionToolbarProps {
  selectedCount: number;
  selectedItems?: SelectedItem[];
  onRemoveItem?: (key: string) => void;
  onClearAll: () => void;
  showCheckIcon?: boolean;
  testId?: string;
}

function badgeTestId(testId: string | undefined): string | undefined {
  return isValueDefined(testId) ? `${testId}-badge` : undefined;
}

function chipTestId(testId: string | undefined, key: string): string | undefined {
  return isValueDefined(testId) ? `${testId}-chip-${key}` : undefined;
}

function clearTestId(testId: string | undefined): string | undefined {
  return isValueDefined(testId) ? `${testId}-clear` : undefined;
}

const ZERO = 0;

const GridSelectionToolbar = memo(
  ({ selectedCount, selectedItems, onRemoveItem, onClearAll, showCheckIcon, testId }: GridSelectionToolbarProps): JSX.Element | null => {
    if (selectedCount <= ZERO) return null;

    return (
      <div
        aria-label={FM('gridShowcase.selectionToolbar')}
        className="grid-selection-toolbar"
        data-testid={testId}
        role="toolbar"
      >
        <span className="grid-selection-toolbar-badge" data-testid={badgeTestId(testId)}>
          {FM('gridShowcase.selectedLabel')} {selectedCount}
        </span>

        {selectedItems?.map((item) => (
          <span key={item.key} className="grid-selection-toolbar-chip" data-testid={chipTestId(testId, item.key)}>
            {showCheckIcon === true && (
              <span className="grid-selection-toolbar-chip-check">
                <ChipCheckIcon />
              </span>
            )}
            <span className="grid-selection-toolbar-chip-label">{item.label}</span>
            {isValueDefined(onRemoveItem) && (
              <button
                aria-label={`${FM('common.remove')} ${item.label}`}
                className="grid-selection-toolbar-chip-close"
                type="button"
                onClick={() => onRemoveItem(item.key)}
              >
                <ChipCloseIcon />
              </button>
            )}
          </span>
        ))}

        <button
          className="grid-selection-toolbar-clear"
          data-testid={clearTestId(testId)}
          type="button"
          onClick={onClearAll}
        >
          <ChipCloseIcon />
          <span className="grid-selection-toolbar-clear-label">{FM('gridShowcase.clearSelection')}</span>
        </button>
      </div>
    );
  },
);

GridSelectionToolbar.displayName = 'GridSelectionToolbar';
export default GridSelectionToolbar;
