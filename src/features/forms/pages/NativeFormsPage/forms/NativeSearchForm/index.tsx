/**
 * Native Search Form Component
 *
 * Inline/horizontal layout for product search with category filter.
 * Uses native HTML inputs instead of Syncfusion components.
 */
import { useMemo } from 'react';

import { FormNativeInput, FormNativeSelect } from '@/components/ui/form-fields';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/utils/helpers';

import {
  nativeSearchFormSchema,
  defaultNativeSearchFormValues,
  ALL_CATEGORIES_VALUE,
  type NativeSearchFormData,
} from './schema';

const FORM_CONFIG = { schema: nativeSearchFormSchema, defaultValues: defaultNativeSearchFormValues };

interface Props {
  onSubmit: (data: NativeSearchFormData) => void;
  categories: string[];
  isSearching: boolean;
}

export const NativeSearchForm = ({ onSubmit, categories, isSearching }: Props): JSX.Element => {
  const { handleSubmit, control, reset, formState } = useFormWithSchema(FORM_CONFIG);
  const { isDirty } = formState;

  const categoryOptions = useMemo(() => {
    const allOption = { value: ALL_CATEGORIES_VALUE, label: FM('forms.search.allCategories') };
    const apiOptions = categories.map((cat) => ({ value: cat, label: cat }));
    return [allOption, ...apiOptions];
  }, [categories]);

  function handleFormSubmit(data: NativeSearchFormData): void {
    onSubmit(data);
  }

  function handleReset(): void {
    reset();
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[200px] flex-1">
          <FormNativeInput<NativeSearchFormData>
            fullWidth
            control={control}
            label={FM('forms.search.query')}
            name="query"
            placeholder={FM('forms.search.queryPlaceholder')}
            testId="native-search-form-query"
          />
        </div>

        <div className="min-w-[150px]">
          <FormNativeSelect<NativeSearchFormData>
            fullWidth
            control={control}
            label={FM('forms.search.category')}
            name="category"
            options={categoryOptions}
            testId="native-search-form-category"
          />
        </div>

        <div className="flex gap-2">
          <ButtonNative
            disabled={!isDirty}
            testId="native-search-form-reset"
            type="button"
            variant={ButtonVariant.Outline}
            onClick={handleReset}
          >
            {FM('common.reset')}
          </ButtonNative>
          <ButtonNative
            disabled={isSearching}
            testId="native-search-form-submit"
            type="submit"
            variant={ButtonVariant.Primary}
          >
            {isSearching ? FM('common.loading') : FM('forms.search.submit')}
          </ButtonNative>
        </div>
      </div>
    </form>
  );
};
