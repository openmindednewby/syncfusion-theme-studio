
import { FM } from '@/localization/helpers';
import { useThemeStore } from '@/stores/useThemeStore';

import { TextInputRow } from '../../TextInputRow';

export const TypographySection = (): JSX.Element => {
  const { theme, updateFontFamily, updateTransition } = useThemeStore();

  return (
    <section className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-text-primary">
          {FM('themeSettings.typography.title')}
        </h4>
        <p className="mt-1 text-xs text-text-muted">
          {FM('themeSettings.typography.description')}
        </p>
      </div>

      {/* Font Families */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.typography.fontFamily')}
        </h5>
        <div className="space-y-2">
          <TextInputRow
            label="Sans"
            value={theme.typography.fontSans}
            onChange={(value) => updateFontFamily('sans', value)}
          />
          <TextInputRow
            label="Mono"
            value={theme.typography.fontMono}
            onChange={(value) => updateFontFamily('mono', value)}
          />
        </div>
      </div>

      {/* Transitions */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.layout.transitions')}
        </h5>
        <div className="space-y-2">
          <TextInputRow
            label="Fast"
            placeholder="e.g., 150ms"
            value={theme.transitions.fast}
            onChange={(value) => updateTransition('fast', value)}
          />
          <TextInputRow
            label="Normal"
            placeholder="e.g., 250ms"
            value={theme.transitions.normal}
            onChange={(value) => updateTransition('normal', value)}
          />
          <TextInputRow
            label="Slow"
            placeholder="e.g., 350ms"
            value={theme.transitions.slow}
            onChange={(value) => updateTransition('slow', value)}
          />
          <TextInputRow
            label="Easing"
            placeholder="e.g., ease-in-out"
            value={theme.transitions.easing}
            onChange={(value) => updateTransition('easing', value)}
          />
        </div>
      </div>
    </section>
  );
};
