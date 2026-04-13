import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface DiagramToolbarProps {
  readonly onUndo: () => void;
  readonly onRedo: () => void;
  readonly onZoomIn: () => void;
  readonly onZoomOut: () => void;
  readonly onFitToPage: () => void;
  readonly onExportPng: () => void;
  readonly onExportSvg: () => void;
  readonly onClear: () => void;
}

const BUTTON_BASE = 'rounded-md px-3 py-1.5 text-sm font-medium transition-colors';
const BUTTON_DEFAULT = `${BUTTON_BASE} bg-surface-alt text-text-secondary hover:bg-surface-hover`;
const BUTTON_DANGER = `${BUTTON_BASE} bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800`;

/** Toolbar with undo/redo, zoom, export, and clear actions for the diagram editor. */
export const DiagramToolbar = memo(
  ({
    onUndo,
    onRedo,
    onZoomIn,
    onZoomOut,
    onFitToPage,
    onExportPng,
    onExportSvg,
    onClear,
  }: DiagramToolbarProps): JSX.Element => (
    <div
      className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-surface p-2"
      data-testid={TestIds.DIAGRAM_TOOLBAR}
    >
      <button
        className={BUTTON_DEFAULT}
        data-testid={TestIds.DIAGRAM_UNDO_BTN}
        type="button"
        onClick={onUndo}
      >
        {FM('diagram.toolbar.undo')}
      </button>
      <button
        className={BUTTON_DEFAULT}
        data-testid={TestIds.DIAGRAM_REDO_BTN}
        type="button"
        onClick={onRedo}
      >
        {FM('diagram.toolbar.redo')}
      </button>

      <span className="mx-1 h-5 w-px bg-border" />

      <button
        className={BUTTON_DEFAULT}
        data-testid={TestIds.DIAGRAM_ZOOM_IN_BTN}
        type="button"
        onClick={onZoomIn}
      >
        {FM('diagram.toolbar.zoomIn')}
      </button>
      <button
        className={BUTTON_DEFAULT}
        data-testid={TestIds.DIAGRAM_ZOOM_OUT_BTN}
        type="button"
        onClick={onZoomOut}
      >
        {FM('diagram.toolbar.zoomOut')}
      </button>
      <button
        className={BUTTON_DEFAULT}
        data-testid={TestIds.DIAGRAM_FIT_BTN}
        type="button"
        onClick={onFitToPage}
      >
        {FM('diagram.toolbar.fitToPage')}
      </button>

      <span className="mx-1 h-5 w-px bg-border" />

      <button
        className={BUTTON_DEFAULT}
        data-testid={TestIds.DIAGRAM_EXPORT_PNG_BTN}
        type="button"
        onClick={onExportPng}
      >
        {FM('diagram.toolbar.exportPng')}
      </button>
      <button
        className={BUTTON_DEFAULT}
        data-testid={TestIds.DIAGRAM_EXPORT_SVG_BTN}
        type="button"
        onClick={onExportSvg}
      >
        {FM('diagram.toolbar.exportSvg')}
      </button>

      <span className="mx-1 h-5 w-px bg-border" />

      <button
        className={BUTTON_DANGER}
        data-testid={TestIds.DIAGRAM_CLEAR_BTN}
        type="button"
        onClick={onClear}
      >
        {FM('diagram.toolbar.clear')}
      </button>
    </div>
  ),
);

DiagramToolbar.displayName = 'DiagramToolbar';
