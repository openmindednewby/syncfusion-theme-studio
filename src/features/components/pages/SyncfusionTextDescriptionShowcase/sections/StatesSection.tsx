import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { SyncfusionDescription } from '@/components/ui/syncfusion';
import { FM } from '@/localization/utils/helpers';

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
        <SyncfusionDescription
          className="truncate"
          style={{ maxWidth: '300px' }}
          testId="sf-desc-truncated"
        >
          {FM('components.textDescriptionShowcase.longContent')}
        </SyncfusionDescription>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-text-muted">{FM('components.textDescriptionShowcase.labelMultiLine')}</p>
        <SyncfusionDescription testId="sf-desc-multiline">
          {FM('components.textDescriptionShowcase.multiLine')}
        </SyncfusionDescription>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-text-muted">{FM('components.textDescriptionShowcase.labelConstrained')}</p>
        <SyncfusionDescription style={{ maxWidth: '320px' }} testId="sf-desc-constrained">
          {FM('components.textDescriptionShowcase.constrained')}
        </SyncfusionDescription>
      </div>
    </div>
    <CopyableCodeSnippet code='<SyncfusionDescription className="truncate" style={{ maxWidth: "300px" }}>Long text...</SyncfusionDescription>' />
  </section>
));

StatesSection.displayName = 'StatesSection';
