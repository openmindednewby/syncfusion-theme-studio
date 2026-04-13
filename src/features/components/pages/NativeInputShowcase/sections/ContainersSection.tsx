/**
 * ContainersSection - Light/dark input containers showing text, file, and multiline inputs.
 */
import { memo } from 'react';

import { InputNative, TextareaNative, FileInputNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const ContainersSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.inputShowcase.sections.containers')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.inputShowcase.sections.containersDesc')}
      </p>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3 rounded-lg border border-border bg-surface p-4">
        <p className="native-input-label">{FM('components.inputs.containerTextInput')}</p>
        <InputNative
          fullWidth
          label={FM('components.inputs.nameLabel')}
          placeholder={FM('components.inputs.namePlaceholder')}
          testId="native-container-text"
        />
        <p className="native-input-label">{FM('components.inputs.containerFileInput')}</p>
        <FileInputNative
          fullWidth
          label={FM('components.inputs.fileLabel')}
          placeholder={FM('components.inputs.filePlaceholder')}
          testId="native-container-file"
        />
        <p className="native-input-label">{FM('components.inputs.containerMultiline')}</p>
        <TextareaNative
          fullWidth
          label={FM('components.inputs.textareaLabel')}
          placeholder={FM('components.inputs.textareaPlaceholder')}
          testId="native-container-textarea"
        />
      </div>
      <div className="space-y-3 rounded-lg border border-border bg-background p-4">
        <p className="native-input-label">{FM('components.inputs.containerTextInput')}</p>
        <InputNative
          fullWidth
          label={FM('components.inputs.emailLabel')}
          placeholder={FM('components.inputs.emailPlaceholder')}
          testId="native-container-text-alt"
        />
        <p className="native-input-label">{FM('components.inputs.containerFileInput')}</p>
        <FileInputNative
          fullWidth
          accept=".png,.jpg"
          label={FM('components.inputs.fileLabel')}
          testId="native-container-file-alt"
        />
        <p className="native-input-label">{FM('components.inputs.containerMultiline')}</p>
        <TextareaNative
          fullWidth
          label={FM('components.inputs.textareaLabel')}
          placeholder={FM('components.inputs.textareaPlaceholder')}
          testId="native-container-textarea-alt"
        />
      </div>
    </div>
  </section>
));

ContainersSection.displayName = 'ContainersSection';
