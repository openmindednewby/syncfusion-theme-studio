import { memo, useState, useCallback } from 'react';

import { InputNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const NativeInputsSection = memo((): JSX.Element => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  return (
    <section className="card">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('components.sections.nativeInputs')}
      </h3>
      <div className="grid max-w-lg gap-4">
        <InputNative
          fullWidth
          helperText={FM('components.inputs.nameHelper')}
          label={FM('components.inputs.nameLabel')}
          placeholder={FM('components.inputs.namePlaceholder')}
          testId="native-input-name"
          value={inputValue}
          onChange={handleInputChange}
        />
        <InputNative
          fullWidth
          label={FM('components.inputs.emailLabel')}
          placeholder={FM('components.inputs.emailPlaceholder')}
          testId="native-input-email"
          type="email"
        />
        <InputNative
          disabled
          fullWidth
          label={FM('components.inputs.disabledLabel')}
          placeholder={FM('components.inputs.disabledPlaceholder')}
          testId="native-input-disabled"
        />
        <InputNative
          fullWidth
          error={FM('validation.required')}
          label={FM('components.inputs.errorLabel')}
          placeholder={FM('components.inputs.errorPlaceholder')}
          testId="native-input-error"
        />
      </div>
    </section>
  );
});

NativeInputsSection.displayName = 'NativeInputsSection';
