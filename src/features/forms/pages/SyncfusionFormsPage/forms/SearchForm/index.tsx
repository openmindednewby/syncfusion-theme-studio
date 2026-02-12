/**
 * Search Form Component
 *
 * Inline/horizontal layout for search and filter functionality.
 * Demonstrates optional fields and date range selection.
 */
import { FormProvider } from 'react-hook-form';

import { FormInput, FormSelect, FormDatePicker } from '@/components/ui/form-fields';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/helpers';

import {
  searchFormSchema,
  defaultSearchFormValues,
  searchCategoryOptions,
  type SearchFormData,
} from './schema';

const FORM_CONFIG = { schema: searchFormSchema, defaultValues: defaultSearchFormValues };

interface Props {
  onSubmit: (data: SearchFormData) => void;
}

export const SearchForm = ({ onSubmit }: Props): JSX.Element => {
  const form = useFormWithSchema(FORM_CONFIG);

  const { handleSubmit, control, reset, formState } = form;
  const { isSubmitting, isDirty } = formState;

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
              options={searchCategoryOptions}
              testId="search-form-category"
            />
          </div>

          <div className="min-w-[140px]">
            <FormDatePicker<SearchFormData>
              fullWidth
              control={control}
              label={FM('forms.search.dateFrom')}
              name="dateFrom"
              testId="search-form-date-from"
            />
          </div>

          <div className="min-w-[140px]">
            <FormDatePicker<SearchFormData>
              fullWidth
              control={control}
              label={FM('forms.search.dateTo')}
              name="dateTo"
              testId="search-form-date-to"
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
              disabled={isSubmitting}
              testId="search-form-submit"
              type="submit"
              variant={ButtonVariant.Primary}
            >
              {FM('forms.search.submit')}
            </ButtonNative>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
