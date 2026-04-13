/**
 * InputMessageSection - Demonstrates validation status messages at different scales.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { InputMessageNative, InputMessageStatus, InputMessageScale } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const InputMessageSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.inputShowcase.sections.inputMessage')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.inputShowcase.sections.inputMessageDesc')}
      </p>
    </div>
    <div className="grid max-w-lg gap-6">
      <div className="space-y-2">
        <p className="native-input-label">{FM('components.inputs.scaleSmall')}</p>
        <InputMessageNative
          message={FM('components.inputs.messageIdle')}
          scale={InputMessageScale.Small}
          status={InputMessageStatus.Idle}
          testId="native-showcase-msg-idle-s"
        />
        <InputMessageNative
          message={FM('components.inputs.messageValid')}
          scale={InputMessageScale.Small}
          status={InputMessageStatus.Valid}
          testId="native-showcase-msg-valid-s"
        />
        <InputMessageNative
          message={FM('components.inputs.messageInvalid')}
          scale={InputMessageScale.Small}
          status={InputMessageStatus.Invalid}
          testId="native-showcase-msg-invalid-s"
        />
      </div>
      <div className="space-y-2">
        <p className="native-input-label">{FM('components.inputs.scaleMedium')}</p>
        <InputMessageNative
          message={FM('components.inputs.messageIdle')}
          scale={InputMessageScale.Medium}
          status={InputMessageStatus.Idle}
          testId="native-showcase-msg-idle-m"
        />
        <InputMessageNative
          message={FM('components.inputs.messageValid')}
          scale={InputMessageScale.Medium}
          status={InputMessageStatus.Valid}
          testId="native-showcase-msg-valid-m"
        />
        <InputMessageNative
          message={FM('components.inputs.messageInvalid')}
          scale={InputMessageScale.Medium}
          status={InputMessageStatus.Invalid}
          testId="native-showcase-msg-invalid-m"
        />
      </div>
      <div className="space-y-2">
        <p className="native-input-label">{FM('components.inputs.scaleLarge')}</p>
        <InputMessageNative
          message={FM('components.inputs.messageIdle')}
          scale={InputMessageScale.Large}
          status={InputMessageStatus.Idle}
          testId="native-showcase-msg-idle-l"
        />
        <InputMessageNative
          message={FM('components.inputs.messageValid')}
          scale={InputMessageScale.Large}
          status={InputMessageStatus.Valid}
          testId="native-showcase-msg-valid-l"
        />
        <InputMessageNative
          message={FM('components.inputs.messageInvalid')}
          scale={InputMessageScale.Large}
          status={InputMessageStatus.Invalid}
          testId="native-showcase-msg-invalid-l"
        />
      </div>
    </div>
    <CopyableCodeSnippet code='<InputMessageNative message="Email is valid" status={InputMessageStatus.Valid} scale={InputMessageScale.Medium} />' />
  </section>
));

InputMessageSection.displayName = 'InputMessageSection';
