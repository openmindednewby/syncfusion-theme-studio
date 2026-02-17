import { memo } from 'react';

import { IconShieldCheck } from '@/components/icons';
import { FM } from '@/localization/helpers';

const SNIPPET_DEFAULT = '<IconShieldCheck />';
const SNIPPET_SIZE = 'className="h-8 w-8"';
const SNIPPET_COLOR = 'className="h-6 w-6 text-status-success"';

const UsageExamplesSection = (): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.iconsShowcase.usage')}
    </h3>
    <p className="text-sm text-text-secondary">
      {FM('components.iconsShowcase.usageDescription')}
    </p>
    <div className="grid gap-6 sm:grid-cols-3">
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-muted">
          {FM('components.iconsShowcase.defaultSize')}
        </p>
        <div className="flex items-center gap-3">
          <IconShieldCheck />
          <code className="text-xs text-text-secondary">{SNIPPET_DEFAULT}</code>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-muted">
          {FM('components.iconsShowcase.customSize')}
        </p>
        <div className="flex items-center gap-3">
          <IconShieldCheck className="h-8 w-8" />
          <code className="text-xs text-text-secondary">{SNIPPET_SIZE}</code>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-muted">
          {FM('components.iconsShowcase.customColor')}
        </p>
        <div className="flex items-center gap-3">
          <IconShieldCheck className="h-6 w-6 text-status-success" />
          <code className="text-xs text-text-secondary">{SNIPPET_COLOR}</code>
        </div>
      </div>
    </div>
  </section>
);

export default memo(UsageExamplesSection);
