import { memo, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { DescriptionNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

const CONTENT_OPTIONS = [
  { labelKey: 'components.textDescriptionShowcase.toggleShort', key: 'shortContent' as const },
  { labelKey: 'components.textDescriptionShowcase.toggleLong', key: 'longContent' as const },
  { labelKey: 'components.textDescriptionShowcase.toggleWithHeading', key: 'withHeading' as const },
] as const;

const INITIAL_ACTIVE_INDEX = 0;

export const InteractiveSection = memo((): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(INITIAL_ACTIVE_INDEX);
  const activeOption = CONTENT_OPTIONS[activeIndex] ?? CONTENT_OPTIONS[0];
  const activeKey = activeOption.key;

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.textDescriptionShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.textDescriptionShowcase.sections.interactiveDesc')}
        </p>
      </div>
      <div className="flex gap-2">
        {CONTENT_OPTIONS.map((option, idx) => (
          <button
            key={option.key}
            className={`rounded px-3 py-1 text-sm transition-colors ${
              idx === activeIndex
                ? 'bg-primary-600 text-white'
                : 'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary'
            }`}
            data-testid={`desc-toggle-${option.key}`}
            type="button"
            onClick={() => setActiveIndex(idx)}
          >
            {FM(option.labelKey)}
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-surface p-4">
        <DescriptionNative testId="desc-interactive-preview">
          {FM(`components.textDescriptionShowcase.${activeKey}`)}
        </DescriptionNative>
      </div>
      <CopyableCodeSnippet code={'<DescriptionNative>\n  {content}\n</DescriptionNative>'} />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
