
import { FM } from '@/localization/utils/helpers';
import { TransitionType } from '@/stores/theme/types';
import { useThemeStore } from '@/stores/useThemeStore';


import { FontFamilyEditor } from './components/FontFamilyEditor';
import { FontSizeEditor } from './components/FontSizeEditor';
import { FontWeightEditor } from './components/FontWeightEditor';
import { LetterSpacingEditor } from './components/LetterSpacingEditor';
import { LineHeightEditor } from './components/LineHeightEditor';
import { TextInputRow } from '../../components/TextInputRow';

export const TypographySection = (): JSX.Element => {
  const {
    theme,
    updateFontFamily,
    updateFontSize,
    updateFontWeight,
    updateLetterSpacing,
    updateLineHeight,
    updateTransition,
  } = useThemeStore();

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

      <FontFamilyEditor
        fontMono={theme.typography.fontMono}
        fontSans={theme.typography.fontSans}
        onUpdateFontFamily={updateFontFamily}
      />

      <FontSizeEditor
        fontSize={theme.typography.fontSize}
        onUpdateFontSize={updateFontSize}
      />

      <FontWeightEditor
        fontWeight={theme.typography.fontWeight}
        onUpdateFontWeight={updateFontWeight}
      />

      <LineHeightEditor
        lineHeight={theme.typography.lineHeight}
        onUpdateLineHeight={updateLineHeight}
      />

      <LetterSpacingEditor
        letterSpacing={theme.typography.letterSpacing}
        onUpdateLetterSpacing={updateLetterSpacing}
      />

      {/* Transitions */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.layout.transitions')}
        </h5>
        <div className="space-y-2">
          <TextInputRow
            label={FM('themeSettings.typography.transitions.fast')}
            placeholder={FM('themeSettings.typography.transitions.fastPlaceholder')}
            value={theme.transitions.fast}
            onChange={(value) => updateTransition(TransitionType.Fast, value)}
          />
          <TextInputRow
            label={FM('themeSettings.typography.transitions.normal')}
            placeholder={FM('themeSettings.typography.transitions.normalPlaceholder')}
            value={theme.transitions.normal}
            onChange={(value) => updateTransition(TransitionType.Normal, value)}
          />
          <TextInputRow
            label={FM('themeSettings.typography.transitions.slow')}
            placeholder={FM('themeSettings.typography.transitions.slowPlaceholder')}
            value={theme.transitions.slow}
            onChange={(value) => updateTransition(TransitionType.Slow, value)}
          />
          <TextInputRow
            label={FM('themeSettings.typography.transitions.easing')}
            placeholder={FM('themeSettings.typography.transitions.easingPlaceholder')}
            value={theme.transitions.easing}
            onChange={(value) => updateTransition(TransitionType.Easing, value)}
          />
        </div>
      </div>
    </section>
  );
};
