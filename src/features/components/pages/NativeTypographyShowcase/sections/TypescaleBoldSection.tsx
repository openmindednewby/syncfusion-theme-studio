import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/utils/helpers';

import { TypescaleTable } from './TypescaleTable';

const FONT_WEIGHT_BOLD = 700;

export const TypescaleBoldSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.typographyShowcase.sections.bold')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.typographyShowcase.sections.boldDesc')}
      </p>
    </div>
    <TypescaleTable componentName="TypoBold" fontWeight={FONT_WEIGHT_BOLD} />
    <CopyableCodeSnippet code={'font-family: "Fira Sans", sans-serif;\nfont-weight: 700;\nfont-size: var(--font-base);'} />
  </section>
));

TypescaleBoldSection.displayName = 'TypescaleBoldSection';
