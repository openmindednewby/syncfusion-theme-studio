/**
 * TextareaSection - Demonstrates the native textarea component.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { TextareaNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const TextareaSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.inputShowcase.sections.textarea')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.inputShowcase.sections.textareaDesc')}
      </p>
    </div>
    <div className="grid max-w-lg gap-4">
      <TextareaNative
        fullWidth
        helperText={FM('components.inputs.textareaHelper')}
        label={FM('components.inputs.textareaLabel')}
        placeholder={FM('components.inputs.textareaPlaceholder')}
        testId="native-showcase-textarea"
      />
      <TextareaNative
        disabled
        fullWidth
        label={FM('components.inputs.disabledLabel')}
        placeholder={FM('components.inputs.disabledPlaceholder')}
        testId="native-showcase-textarea-disabled"
      />
      <TextareaNative
        fullWidth
        error={FM('validation.required')}
        label={FM('components.inputs.errorLabel')}
        placeholder={FM('components.inputs.errorPlaceholder')}
        testId="native-showcase-textarea-error"
      />
    </div>
    <CopyableCodeSnippet code='<TextareaNative label="Message" placeholder="Enter your message..." fullWidth />' />
  </section>
));

TextareaSection.displayName = 'TextareaSection';
