/**
 * InteractiveSection connects the ThemeToggleNative to the real theme store,
 * allowing live toggling between light and dark modes.
 */
import { memo, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { ThemeToggleNative, ThemeToggleSize } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';

export const InteractiveSection = memo((): JSX.Element => {
  const { mode, toggleMode } = useThemeStore();
  const isDark = mode === Mode.Dark;

  const handleChange = useCallback(() => {
    toggleMode();
  }, [toggleMode]);

  const modeLabel = isDark
    ? FM('components.themeToggleShowcase.labels.darkMode')
    : FM('components.themeToggleShowcase.labels.lightMode');

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.themeToggleShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.themeToggleShowcase.sections.interactiveDesc')}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggleNative
          checked={isDark}
          label={modeLabel}
          size={ThemeToggleSize.Md}
          onChange={handleChange}
        />
        <span className="text-sm font-medium text-text-primary">
          {FM('components.themeToggleShowcase.labels.currentMode', modeLabel)}
        </span>
      </div>
      <CopyableCodeSnippet code={'<ThemeToggleNative\n  checked={isDark}\n  label="Dark mode"\n  size={ThemeToggleSize.Md}\n  onChange={handleChange}\n/>'} />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
