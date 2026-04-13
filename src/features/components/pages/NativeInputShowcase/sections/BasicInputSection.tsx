/**
 * BasicInputSection - Demonstrates standard native input types:
 * text, email, password, and number.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { InputNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

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
      <InputNative
        fullWidth
        helperText={FM('components.inputs.nameHelper')}
        label={FM('components.inputs.nameLabel')}
        placeholder={FM('components.inputs.namePlaceholder')}
        testId="native-showcase-text"
      />
      <InputNative
        fullWidth
        label={FM('components.inputs.emailLabel')}
        placeholder={FM('components.inputs.emailPlaceholder')}
        testId="native-showcase-email"
        type="email"
      />
      <InputNative
        fullWidth
        label={FM('components.inputs.passwordLabel')}
        placeholder={FM('components.inputs.passwordPlaceholder')}
        testId="native-showcase-password"
        type="password"
      />
      <InputNative
        fullWidth
        label={FM('components.inputs.numberLabel')}
        placeholder={FM('components.inputs.numberPlaceholder')}
        testId="native-showcase-number"
        type="number"
      />
    </div>
    <CopyableCodeSnippet code='<InputNative label="Name" placeholder="Enter name" helperText="Your full name" fullWidth />' />
  </section>
));

BasicInputSection.displayName = 'BasicInputSection';
