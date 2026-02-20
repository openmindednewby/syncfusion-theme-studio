import { forwardRef, memo, useCallback } from 'react';

import { FM } from '@/localization/utils/helpers';
import { NativeTestIds } from '@/shared/testIds.native';

const ELLIPSIS_PATH = 'M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z';

interface ColumnMenuTriggerProps {
  field: string;
  headerText: string;
  isOpen: boolean;
  onToggle: (field: string) => void;
}

const ColumnMenuTrigger = memo(
  forwardRef<HTMLButtonElement, ColumnMenuTriggerProps>(
    ({ field, headerText, isOpen, onToggle }, ref): JSX.Element => {
      const handleClick = useCallback(
        (e: React.MouseEvent) => {
          e.stopPropagation();
          onToggle(field);
        },
        [field, onToggle],
      );

      return (
        <button
          ref={ref}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-label={FM('table.columnMenu', headerText)}
          className="native-grid-colmenu-trigger ml-1 inline-flex shrink-0 items-center rounded p-0.5 opacity-0 transition-opacity focus:opacity-100 group-hover/th:opacity-100"
          data-testid={NativeTestIds.NATIVE_GRID_COLUMN_MENU_TRIGGER}
          type="button"
          onClick={handleClick}
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path d={ELLIPSIS_PATH} fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      );
    },
  ),
);

ColumnMenuTrigger.displayName = 'ColumnMenuTrigger';

export default ColumnMenuTrigger;
