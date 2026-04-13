/**
 * Search Form Component
 *
 * Inline/horizontal layout for product search with category filter.
 * Accepts dynamic categories from the API and loading state.
 */
import { useMemo } from 'react';

import { FormProvider } from 'react-hook-form';

import { FormInput, FormSelect } from '@/components/ui/form-fields';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/utils/helpers';

import {
  searchFormSchema,
  defaultSearchFormValues,
  ALL_CATEGORIES_VALUE,
  type SearchFormData,
} from './schema';

const FORM_CONFIG = { schema: searchFormSchema, defaultValues: defaultSearchFormValues };

interface Props {
  onSubmit: (data: SearchFormData) => void;
  /** Available product categories from the API */
  categories: string[];
  /** Whether a search is currently in progress */
  isSearching: boolean;
}

export const SearchForm = ({ onSubmit, categories, isSearching }: Props): JSX.Element => {
  const form = useFormWithSchema(FORM_CONFIG);

  const { handleSubmit, control, reset, formState } = form;
  const { isDirty } = formState;

  const categoryOptions = useMemo(() => {
    const allOption = { value: ALL_CATEGORIES_VALUE, label: FM('forms.search.allCategories') };
    const apiOptions = categories.map((cat) => ({ value: cat, label: cat }));
    return [allOption, ...apiOptions];
  }, [categories]);

  function handleFormSubmit(data: SearchFormData): void {
    onSubmit(data);
  }

  function handleReset(): void {
    reset();
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[200px] flex-1">
            <FormInput<SearchFormData>
              fullWidth
              control={control}
              label={FM('forms.search.query')}
              name="query"
              placeholder={FM('forms.search.queryPlaceholder')}
              testId="search-form-query"
            />
          </div>

          <div className="min-w-[150px]">
            <FormSelect<SearchFormData>
              fullWidth
              control={control}
              label={FM('forms.search.category')}
              name="category"
              options={categoryOptions}
              testId="search-form-category"
            />
          </div>

          <div className="flex gap-2">
            <ButtonNative
              disabled={!isDirty}
              testId="search-form-reset"
              type="button"
              variant={ButtonVariant.Outline}
              onClick={handleReset}
            >
              {FM('common.reset')}
            </ButtonNative>
            <ButtonNative
              disabled={isSearching}
              testId="search-form-submit"
              type="submit"
              variant={ButtonVariant.Primary}
            >
              {isSearching ? FM('common.loading') : FM('forms.search.submit')}
            </ButtonNative>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
