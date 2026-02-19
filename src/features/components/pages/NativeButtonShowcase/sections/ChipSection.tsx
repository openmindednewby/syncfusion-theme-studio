/**
 * ChipSection - Demonstrates ChipNative with all variants and removable state.
 */
import { memo, useCallback } from 'react';

import { ChipNative, ChipVariant } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

export const ChipSection = memo((): JSX.Element => {
  const handleRemove = useCallback(() => {
    // No-op for showcase
  }, []);

  return (
    <section className="card space-y-4" data-testid={TestIds.NATIVE_CHIP_SECTION}>
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.buttonShowcase.sections.chip')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.buttonShowcase.sections.chipDesc')}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <ChipNative testId="chip-showcase-default">
          {FM('components.buttonShowcase.chipDefault')}
        </ChipNative>
        <ChipNative testId="chip-showcase-primary" variant={ChipVariant.Primary}>
          {FM('components.buttonShowcase.chipPrimary')}
        </ChipNative>
        <ChipNative testId="chip-showcase-success" variant={ChipVariant.Success}>
          {FM('components.buttonShowcase.chipSuccess')}
        </ChipNative>
        <ChipNative testId="chip-showcase-warning" variant={ChipVariant.Warning}>
          {FM('components.buttonShowcase.chipWarning')}
        </ChipNative>
        <ChipNative testId="chip-showcase-danger" variant={ChipVariant.Danger}>
          {FM('components.buttonShowcase.chipDanger')}
        </ChipNative>
        <ChipNative removable testId="chip-showcase-removable" onRemove={handleRemove}>
          {FM('components.buttonShowcase.chipRemovable')}
        </ChipNative>
        <ChipNative disabled testId="chip-showcase-disabled">
          {FM('components.buttonShowcase.chipDisabled')}
        </ChipNative>
      </div>
    </section>
  );
});

ChipSection.displayName = 'ChipSection';
