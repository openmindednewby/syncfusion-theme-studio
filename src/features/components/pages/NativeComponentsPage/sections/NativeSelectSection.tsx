import { memo, useState, useCallback, useMemo } from 'react';

import { SelectNative } from '@/components/ui/native';
import type { SelectNativeOption } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

const OPTION_COUNT = 3;

export const NativeSelectSection = memo((): JSX.Element => {
  const [selectValue, setSelectValue] = useState('');

  const selectOptions = useMemo((): SelectNativeOption[] => {
    const options: SelectNativeOption[] = [];
    for (let i = 1; i <= OPTION_COUNT; i++)
      options.push({ value: `option${i}`, label: FM('components.select.option', String(i)) });

    return options;
  }, []);

  const handleSelectChange = useCallback((value: string | number) => {
    setSelectValue(String(value));
  }, []);

  return (
    <section className="card">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('components.sections.nativeSelect')}
      </h3>
      <div className="grid max-w-lg gap-4">
        <SelectNative
          fullWidth
          helperText={FM('components.select.basicHelper')}
          label={FM('components.select.basicLabel')}
          options={selectOptions}
          testId="native-select-basic"
          value={selectValue}
          onChange={handleSelectChange}
        />
        <SelectNative
          fullWidth
          error={FM('validation.pleaseSelect')}
          label={FM('components.select.errorLabel')}
          options={selectOptions}
          testId="native-select-error"
        />
      </div>
    </section>
  );
});

NativeSelectSection.displayName = 'NativeSelectSection';
