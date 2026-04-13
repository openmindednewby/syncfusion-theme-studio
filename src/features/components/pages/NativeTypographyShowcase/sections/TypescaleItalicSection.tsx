import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/utils/helpers';

import { TypescaleTable } from './TypescaleTable';

const FONT_WEIGHT_REGULAR = 400;

export const TypescaleItalicSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.typographyShowcase.sections.italic')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.typographyShowcase.sections.italicDesc')}
      </p>
    </div>
    <TypescaleTable componentName="TypoItalic" fontStyle="italic" fontWeight={FONT_WEIGHT_REGULAR} />
    <CopyableCodeSnippet code={'font-family: "Fira Sans", sans-serif;\nfont-weight: 400;\nfont-style: italic;\nfont-size: var(--font-base);'} />
  </section>
));

TypescaleItalicSection.displayName = 'TypescaleItalicSection';
