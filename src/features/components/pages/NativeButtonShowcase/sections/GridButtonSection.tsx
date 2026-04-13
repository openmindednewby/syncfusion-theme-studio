/**
 * GridButtonSection - Demonstrates native grid action buttons matching Figma specs.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import GridButtonNative, { GridButtonVariant } from '@/components/ui/native/GridButtonNative';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const GRID_BTN_ITEMS = [
  { i18nKey: 'common.edit', variant: GridButtonVariant.Default },
  { i18nKey: 'common.delete', variant: GridButtonVariant.Delete },
  { i18nKey: 'common.save', variant: GridButtonVariant.Save },
  { i18nKey: 'common.cancel', variant: GridButtonVariant.Default },
] as const;

export const GridButtonSection = memo((): JSX.Element => (
  <section className="card space-y-4" data-testid={TestIds.NATIVE_GRID_BUTTON_SECTION}>
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.buttonShowcase.sections.gridButtons')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.buttonShowcase.sections.gridButtonsDesc')}
      </p>
    </div>
    <div>
      <p className="mb-2 text-xs font-medium text-text-secondary">{FM('common.enabled')}</p>
      <div className="flex flex-wrap gap-2">
        {GRID_BTN_ITEMS.map(({ i18nKey, variant }) => (
          <GridButtonNative key={i18nKey} variant={variant}>
            {FM(i18nKey)}
          </GridButtonNative>
        ))}
      </div>
    </div>
    <div>
      <p className="mb-2 text-xs font-medium text-text-secondary">{FM('common.disabled')}</p>
      <div className="flex flex-wrap gap-2">
        {GRID_BTN_ITEMS.map(({ i18nKey, variant }) => (
          <GridButtonNative key={i18nKey} disabled variant={variant}>
            {FM(i18nKey)}
          </GridButtonNative>
        ))}
      </div>
    </div>
    <CopyableCodeSnippet code={'<GridButtonNative>Edit</GridButtonNative>\n<GridButtonNative variant={GridButtonVariant.Save}>Save</GridButtonNative>\n<GridButtonNative variant={GridButtonVariant.Delete}>Delete</GridButtonNative>'} />
  </section>
));

GridButtonSection.displayName = 'GridButtonSection';
