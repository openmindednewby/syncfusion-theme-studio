/**
 * Product Form Component
 *
 * Demonstrates select dropdown and date picker integration.
 * Includes number input with positive value validation.
 */
import { type Control, FormProvider, type FieldValues } from 'react-hook-form';

import { FormDatePicker, FormInput, FormSelect } from '@/components/ui/form-fields';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/helpers';

import {
  categoryOptions,
  defaultProductFormValues,
  productFormSchema,
  type ProductFormData,
} from './schema';

const FORM_CONFIG = { schema: productFormSchema, defaultValues: defaultProductFormValues };

interface Props {
  onSubmit: (data: ProductFormData) => void;
}

export const ProductForm = ({ onSubmit }: Props): JSX.Element => {
  const form = useFormWithSchema(FORM_CONFIG);

  const { handleSubmit, control, reset, formState } = form;
  const { isSubmitting, isDirty } = formState;

  // Cast data to the expected type - validation ensures fields are present
  function handleFormSubmit(data: FieldValues): void {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    onSubmit(data as ProductFormData);
    reset();
  }

  function handleReset(): void {
    reset();
  }

  // Cast control for use with form fields
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const formControl = control as Control<ProductFormData>;

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
        <FormInput
          fullWidth
          required
          control={formControl}
          label={FM('forms.product.productName')}
          name="productName"
          placeholder={FM('forms.product.productNamePlaceholder')}
          testId="product-form-name"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormSelect
            fullWidth
            required
            control={formControl}
            label={FM('forms.product.category')}
            name="category"
            options={categoryOptions}
            placeholder={FM('forms.product.categoryPlaceholder')}
            testId="product-form-category"
          />
          <FormInput
            fullWidth
            required
            control={formControl}
            helperText={FM('forms.product.priceHelper')}
            label={FM('forms.product.price')}
            name="price"
            placeholder={FM('forms.product.pricePlaceholder')}
            testId="product-form-price"
            type="number"
          />
        </div>

        <FormDatePicker
          fullWidth
          control={formControl}
          helperText={FM('forms.product.releaseDateHelper')}
          label={FM('forms.product.releaseDate')}
          min={new Date()}
          name="releaseDate"
          testId="product-form-release-date"
        />

        <div className="flex justify-end gap-2 pt-2">
          <ButtonNative
            disabled={!isDirty}
            testId="product-form-reset"
            type="button"
            variant={ButtonVariant.Outline}
            onClick={handleReset}
          >
            {FM('common.reset')}
          </ButtonNative>
          <ButtonNative
            disabled={isSubmitting}
            testId="product-form-submit"
            type="submit"
            variant={ButtonVariant.Primary}
          >
            {FM('forms.product.submit')}
          </ButtonNative>
        </div>
      </form>
    </FormProvider>
  );
};
