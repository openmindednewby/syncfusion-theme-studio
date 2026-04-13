/**
 * FileInputSection - Demonstrates the styled file input.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { FileInputNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const FileInputSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.inputShowcase.sections.file')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.inputShowcase.sections.fileDesc')}
      </p>
    </div>
    <div className="grid max-w-lg gap-4">
      <FileInputNative
        fullWidth
        accept=".png,.jpg,.pdf"
        helperText={FM('components.inputs.fileHelper')}
        label={FM('components.inputs.fileLabel')}
        placeholder={FM('components.inputs.filePlaceholder')}
        testId="native-showcase-file"
      />
      <FileInputNative
        fullWidth
        multiple
        label={FM('components.inputs.fileLabel')}
        placeholder={FM('components.inputs.filePlaceholder')}
        testId="native-showcase-file-multi"
      />
      <FileInputNative
        disabled
        fullWidth
        label={FM('components.inputs.disabledLabel')}
        testId="native-showcase-file-disabled"
      />
    </div>
    <CopyableCodeSnippet code='<FileInputNative label="Upload File" accept=".png,.jpg,.pdf" fullWidth />' />
  </section>
));

FileInputSection.displayName = 'FileInputSection';
