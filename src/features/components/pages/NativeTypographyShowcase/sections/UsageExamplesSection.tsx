import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import {
  TypoBold,
  TypoItalic,
  TypoMedium,
  TypoRegular,
  TypographySize,
} from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

const IMPORT_SNIPPET = `import {
  TypoRegular, TypoMedium, TypoItalic, TypoBold,
  TypographyNative, TypographySize, TypographyWeight,
} from '@/components/ui/native';`;

const USAGE_SNIPPET = `<TypoRegular size={TypographySize.Md}>Body text</TypoRegular>
<TypoMedium size={TypographySize.Lg}>Medium label</TypoMedium>
<TypoItalic size={TypographySize.Sm}>Annotation</TypoItalic>
<TypoBold size={TypographySize.Xl}>Title</TypoBold>

{/* Base component with explicit weight */}
<TypographyNative weight={TypographyWeight.Bold} size={TypographySize.Xl4}>
  Heading
</TypographyNative>`;

export const UsageExamplesSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.typographyShowcase.sections.usageTitle')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.typographyShowcase.sections.usageDesc')}
      </p>
    </div>

    <div className="flex flex-wrap items-baseline gap-4 rounded-lg border border-border-default bg-bg-surface-sunken p-4">
      <TypoRegular size={TypographySize.Md}>{FM('components.typographyShowcase.sections.sampleRegular14')}</TypoRegular>
      <TypoMedium size={TypographySize.Lg}>{FM('components.typographyShowcase.sections.sampleMedium16')}</TypoMedium>
      <TypoItalic size={TypographySize.Sm}>{FM('components.typographyShowcase.sections.sampleItalic12')}</TypoItalic>
      <TypoBold size={TypographySize.Xl}>{FM('components.typographyShowcase.sections.sampleBold18')}</TypoBold>
      <TypoBold size={TypographySize.Xl4}>{FM('components.typographyShowcase.sections.sampleBold24')}</TypoBold>
    </div>

    <CopyableCodeSnippet code={IMPORT_SNIPPET} />
    <CopyableCodeSnippet code={USAGE_SNIPPET} />
  </section>
));

UsageExamplesSection.displayName = 'UsageExamplesSection';
