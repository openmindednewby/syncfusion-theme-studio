/**
 * GridDropdownSection - Demonstrates native grid dropdown (kebab menu) matching Figma specs.
 * Includes an interactive subsection with onClick handlers that fire toast feedback.
 */
import { useMemo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import type { GridDropdownItem } from '@/components/ui/native';
import { useToast, ToastSeverity } from '@/components/ui/native';
import GridDropdownNative from '@/components/ui/native/GridDropdownNative';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const MENU_ITEMS: GridDropdownItem[] = [
  { labelKey: 'common.edit', testId: 'grid-dropdown-edit', danger: false },
  { labelKey: 'common.view', testId: 'grid-dropdown-view', danger: false },
  { labelKey: 'common.delete', testId: 'grid-dropdown-delete', danger: true },
];

export const GridDropdownSection = (): JSX.Element => {
  const { addToast } = useToast();

  const interactiveItems: GridDropdownItem[] = useMemo(
    () => [
      {
        labelKey: 'common.edit',
        testId: 'grid-dropdown-interactive-edit',
        onClick: () => addToast({ severity: ToastSeverity.Info, title: FM('common.edit'), message: FM('common.edit') }),
      },
      {
        labelKey: 'common.view',
        testId: 'grid-dropdown-interactive-view',
        onClick: () => addToast({ severity: ToastSeverity.Success, title: FM('common.view'), message: FM('common.view') }),
      },
      {
        labelKey: 'common.delete',
        testId: 'grid-dropdown-interactive-delete',
        danger: true,
        onClick: () => addToast({ severity: ToastSeverity.Error, title: FM('common.delete'), message: FM('common.delete') }),
      },
    ],
    [addToast],
  );

  return (
    <section className="card space-y-4" data-testid={TestIds.NATIVE_GRID_DROPDOWN_SECTION}>
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.buttonShowcase.sections.gridDropdown')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.buttonShowcase.sections.gridDropdownDesc')}
        </p>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-text-secondary">{FM('common.enabled')}</p>
        <div className="flex items-start gap-6">
          {[0, 1, 2].map((idx) => (
            <GridDropdownNative
              key={idx}
              ariaLabel={FM('common.moreActions')}
              defaultOpen={idx === 1}
              items={MENU_ITEMS}
              testId={`${TestIds.NATIVE_GRID_DROPDOWN_TRIGGER}-${idx}`}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-text-secondary">{FM('common.disabled')}</p>
        <div className="flex gap-6">
          <GridDropdownNative
            disabled
            ariaLabel={FM('common.moreActions')}
            items={MENU_ITEMS}
            testId={`${TestIds.NATIVE_GRID_DROPDOWN_TRIGGER}-disabled`}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-text-secondary">
          {FM('components.buttonShowcase.sections.gridDropdownInteractive')}
        </p>
        <p className="mb-3 text-xs text-text-tertiary">
          {FM('components.buttonShowcase.sections.gridDropdownInteractiveDesc')}
        </p>
        <div className="flex items-start gap-6">
          <GridDropdownNative
            ariaLabel={FM('common.moreActions')}
            items={interactiveItems}
            testId={`${TestIds.NATIVE_GRID_DROPDOWN_TRIGGER}-interactive`}
          />
        </div>
      </div>

      <CopyableCodeSnippet code={'<GridDropdownNative\n  items={[\n    { labelKey: "common.edit", testId: "edit", onClick: () => handleEdit() },\n    { labelKey: "common.delete", testId: "delete", danger: true, onClick: () => handleDelete() },\n  ]}\n  ariaLabel="More actions"\n  testId="my-dropdown"\n/>'} />
    </section>
  );
}

GridDropdownSection.displayName = 'GridDropdownSection';
