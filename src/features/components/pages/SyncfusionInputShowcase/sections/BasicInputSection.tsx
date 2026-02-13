/**
 * BasicInputSection - Demonstrates standard Syncfusion input types:
 * text, email, password, and number.
 */
import { memo } from 'react';

import { Input } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

export const BasicInputSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.inputShowcase.sections.basic')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.inputShowcase.sections.basicDesc')}
      </p>
    </div>
    <div className="grid max-w-lg gap-4">
      <Input
        fullWidth
        helperText={FM('components.inputs.nameHelper')}
        label={FM('components.inputs.nameLabel')}
        placeholder={FM('components.inputs.namePlaceholder')}
        testId="sf-showcase-text"
      />
      <Input
        fullWidth
        label={FM('components.inputs.emailLabel')}
        placeholder={FM('components.inputs.emailPlaceholder')}
        testId="sf-showcase-email"
        type="email"
      />
      <Input
        fullWidth
        label={FM('components.inputs.passwordLabel')}
        placeholder={FM('components.inputs.passwordPlaceholder')}
        testId="sf-showcase-password"
        type="password"
      />
      <Input
        fullWidth
        label={FM('components.inputs.numberLabel')}
        placeholder={FM('components.inputs.numberPlaceholder')}
        testId="sf-showcase-number"
        type="number"
      />
    </div>
  </section>
));

BasicInputSection.displayName = 'BasicInputSection';
