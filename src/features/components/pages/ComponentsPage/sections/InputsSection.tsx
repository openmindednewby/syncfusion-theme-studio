import { memo, useState, useCallback, useMemo } from 'react';

import { Input, Select } from '@/components/ui/syncfusion';
import type { SelectOption } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

const OPTION_COUNT = 3;

export const InputsSection = memo((): JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState<string | number>('');

  const selectOptions = useMemo((): SelectOption[] => {
    const options: SelectOption[] = [];
    for (let i = 1; i <= OPTION_COUNT; i++) 
      options.push({ value: `option${i}`, label: FM('components.select.option', String(i)) });
    
    return options;
  }, []);

  const handleInputChange = useCallback((args: { value?: string }) => {
    setInputValue(args.value ?? '');
  }, []);

  const handleSelectChange = useCallback((value: string | number) => {
    setSelectValue(value);
  }, []);

  return (
    <>
      {/* Syncfusion Inputs */}
      <section className="card">
        <h3 className="mb-4 text-lg font-semibold text-text-primary">
          {FM('components.sections.inputs')}
        </h3>
        <div className="grid max-w-lg gap-4">
          <Input
            fullWidth
            helperText={FM('components.inputs.nameHelper')}
            input={handleInputChange}
            label={FM('components.inputs.nameLabel')}
            placeholder={FM('components.inputs.namePlaceholder')}
            testId="input-name"
            value={inputValue}
          />
          <Input
            fullWidth
            label={FM('components.inputs.emailLabel')}
            placeholder={FM('components.inputs.emailPlaceholder')}
            testId="input-email"
            type="email"
          />
          <Input
            fullWidth
            enabled={false}
            label={FM('components.inputs.disabledLabel')}
            placeholder={FM('components.inputs.disabledPlaceholder')}
            testId="input-disabled"
          />
          <Input
            fullWidth
            error={FM('validation.required')}
            label={FM('components.inputs.errorLabel')}
            placeholder={FM('components.inputs.errorPlaceholder')}
            testId="input-error"
          />
        </div>
      </section>

      {/* Syncfusion Select */}
      <section className="card">
        <h3 className="mb-4 text-lg font-semibold text-text-primary">
          {FM('components.sections.select')}
        </h3>
        <div className="grid max-w-lg gap-4">
          <Select
            fullWidth
            helperText={FM('components.select.basicHelper')}
            label={FM('components.select.basicLabel')}
            options={selectOptions}
            testId="select-basic"
            value={selectValue}
            onChange={handleSelectChange}
          />
          <Select
            fullWidth
            error={FM('validation.pleaseSelect')}
            label={FM('components.select.errorLabel')}
            options={selectOptions}
            testId="select-error"
          />
        </div>
      </section>
    </>
  );
});

InputsSection.displayName = 'InputsSection';
