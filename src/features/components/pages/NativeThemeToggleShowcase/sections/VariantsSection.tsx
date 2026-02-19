/**
 * VariantsSection demonstrates the ThemeToggleNative component
 * in all size variants (sm, md, lg) and disabled state.
 */
import { memo, useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { ThemeToggleNative, ThemeToggleSize } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

const SIZE_ITEMS: ReadonlyArray<{
  size: ThemeToggleSize;
  labelKey: string;
}> = [
  { size: ThemeToggleSize.Sm, labelKey: 'components.themeToggleShowcase.labels.small' },
  { size: ThemeToggleSize.Md, labelKey: 'components.themeToggleShowcase.labels.medium' },
  { size: ThemeToggleSize.Lg, labelKey: 'components.themeToggleShowcase.labels.large' },
];

export const VariantsSection = memo((): JSX.Element => {
  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({
    sm: false,
    md: true,
    lg: false,
  });

  const handleChange = useCallback((size: string, value: boolean) => {
    setCheckedStates((prev) => ({ ...prev, [size]: value }));
  }, []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.themeToggleShowcase.sections.variants')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.themeToggleShowcase.sections.variantsDesc')}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-8">
        {SIZE_ITEMS.map(({ size, labelKey }) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <ThemeToggleNative
              checked={checkedStates[size] ?? false}
              label={FM(labelKey)}
              size={size}
              onChange={(val) => handleChange(size, val)}
            />
            <span className="text-xs text-text-secondary">{FM(labelKey)}</span>
          </div>
        ))}
      </div>

      {/* Disabled state */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center gap-4">
          <ThemeToggleNative
            checked
            disabled
            label={FM('components.themeToggleShowcase.labels.disabled')}
            size={ThemeToggleSize.Md}
            onChange={() => undefined}
          />
          <span className="text-sm text-text-secondary">
            {FM('components.themeToggleShowcase.labels.disabled')}
          </span>
        </div>
      </div>
      <CopyableCodeSnippet code={'<ThemeToggleNative\n  checked={false}\n  label="Small"\n  size={ThemeToggleSize.Sm}\n  onChange={handleChange}\n/>\n<ThemeToggleNative\n  checked\n  disabled\n  label="Disabled"\n  size={ThemeToggleSize.Md}\n/>'} />
    </section>
  );
});

VariantsSection.displayName = 'VariantsSection';
