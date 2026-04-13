import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/utils/helpers';

import { TypescaleTable } from './TypescaleTable';

const FONT_WEIGHT_MEDIUM = 500;

export const TypescaleMediumSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.typographyShowcase.sections.medium')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.typographyShowcase.sections.mediumDesc')}
      </p>
    </div>
    <TypescaleTable componentName="TypoMedium" fontWeight={FONT_WEIGHT_MEDIUM} />
    <CopyableCodeSnippet code={'font-family: "Fira Sans", sans-serif;\nfont-weight: 500;\nfont-size: var(--font-base);'} />
  </section>
));

TypescaleMediumSection.displayName = 'TypescaleMediumSection';
