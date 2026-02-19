import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { DescriptionNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const StatesSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.textDescriptionShowcase.sections.states')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.textDescriptionShowcase.sections.statesDesc')}
      </p>
    </div>
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-xs font-medium text-text-muted">{FM('components.textDescriptionShowcase.labelTruncated')}</p>
        <DescriptionNative
          className="truncate"
          style={{ maxWidth: '300px' }}
          testId="desc-truncated"
        >
          {FM('components.textDescriptionShowcase.longContent')}
        </DescriptionNative>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-text-muted">{FM('components.textDescriptionShowcase.labelMultiLine')}</p>
        <DescriptionNative testId="desc-multiline">
          {FM('components.textDescriptionShowcase.multiLine')}
        </DescriptionNative>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-text-muted">{FM('components.textDescriptionShowcase.labelConstrained')}</p>
        <DescriptionNative style={{ maxWidth: '320px' }} testId="desc-constrained">
          {FM('components.textDescriptionShowcase.constrained')}
        </DescriptionNative>
      </div>
    </div>
    <CopyableCodeSnippet code={'<DescriptionNative className="truncate" style={{ maxWidth: "300px" }}>\n  Long text that will be truncated...\n</DescriptionNative>'} />
  </section>
));

StatesSection.displayName = 'StatesSection';
