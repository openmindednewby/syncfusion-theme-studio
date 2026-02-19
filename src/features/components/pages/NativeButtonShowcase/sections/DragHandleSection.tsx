/**
 * DragHandleSection - Demonstrates themed drag handle icon.
 */
import { memo } from 'react';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

export const DragHandleSection = memo((): JSX.Element => (
  <section className="card space-y-4" data-testid={TestIds.NATIVE_DRAG_HANDLE_SECTION}>
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.buttonShowcase.sections.dragHandle')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.buttonShowcase.sections.dragHandleDesc')}
      </p>
    </div>
    <div className="flex items-center gap-6">
      {/* Drag handle icon with theme color */}
      <div className="flex items-center gap-3">
        <div
          className="flex cursor-grab items-center justify-center rounded p-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          style={{ color: 'var(--component-datagrid-drag-handle)' }}
        >
          <svg
            fill="currentColor"
            height="20"
            viewBox="0 0 24 24"
            width="20"
          >
            <circle cx="9" cy="5" r="1.5" />
            <circle cx="15" cy="5" r="1.5" />
            <circle cx="9" cy="12" r="1.5" />
            <circle cx="15" cy="12" r="1.5" />
            <circle cx="9" cy="19" r="1.5" />
            <circle cx="15" cy="19" r="1.5" />
          </svg>
        </div>
        <span className="text-sm text-text-secondary">
          {FM('components.buttonShowcase.dragHandleLabel')}
        </span>
      </div>

      {/* Larger drag handle */}
      <div className="flex items-center gap-3">
        <div
          className="flex cursor-grab items-center justify-center rounded p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          style={{ color: 'var(--component-datagrid-drag-handle)' }}
        >
          <svg
            fill="currentColor"
            height="28"
            viewBox="0 0 24 24"
            width="28"
          >
            <circle cx="9" cy="5" r="1.5" />
            <circle cx="15" cy="5" r="1.5" />
            <circle cx="9" cy="12" r="1.5" />
            <circle cx="15" cy="12" r="1.5" />
            <circle cx="9" cy="19" r="1.5" />
            <circle cx="15" cy="19" r="1.5" />
          </svg>
        </div>
        <span className="text-sm text-text-secondary">
          {FM('components.buttonShowcase.dragHandleLargeLabel')}
        </span>
      </div>
    </div>
  </section>
));

DragHandleSection.displayName = 'DragHandleSection';
