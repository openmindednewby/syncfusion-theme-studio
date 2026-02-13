/**
 * Product Form Component
 *
 * Demonstrates select dropdown and text input integration.
 * Supports create and edit modes with external category options.
 */
import { useEffect, useMemo } from 'react';

import { type Control, FormProvider, type FieldValues } from 'react-hook-form';

import { FormInput, FormSelect } from '@/components/ui/form-fields';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import type { SelectOption } from '@/components/ui/syncfusion';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/helpers';

import {
  defaultProductFormValues,
  productFormSchema,
  type ProductFormData,
} from './schema';

interface Props {
  onSubmit: (data: ProductFormData) => void;
  categories: SelectOption[];
  defaultValues?: Partial<ProductFormData>;
  isSubmitting?: boolean;
  isEditing?: boolean;
}

export const ProductForm = ({
  onSubmit,
  categories,
  defaultValues,
  isSubmitting = false,
  isEditing = false,
}: Props): JSX.Element => {
  const formConfig = useMemo(
    () => ({
      schema: productFormSchema,
      defaultValues: { ...defaultProductFormValues, ...defaultValues },
    }),
    [defaultValues],
  );
  const form = useFormWithSchema(formConfig);

  const { handleSubmit, control, reset, formState } = form;
  const { isDirty } = formState;

  // Reset form when defaultValues change (edit mode toggle)
  useEffect(() => {
    reset({ ...defaultProductFormValues, ...defaultValues });
  }, [defaultValues, reset]);

  // Cast data to the expected type - validation ensures fields are present
  function handleFormSubmit(data: FieldValues): void {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    onSubmit(data as ProductFormData);
  }

  function handleReset(): void {
    reset({ ...defaultProductFormValues });
  }

  // Cast control for use with form fields
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const formControl = control as Control<ProductFormData>;

  const submitLabel = isEditing
    ? FM('forms.product.updateProduct')
    : FM('forms.product.submit');

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
            options={categories}
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

        <FormInput
          fullWidth
          control={formControl}
          label={FM('forms.product.description')}
          name="description"
          placeholder={FM('forms.product.descriptionPlaceholder')}
          testId="product-form-description"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            fullWidth
            control={formControl}
            label={FM('forms.product.brand')}
            name="brand"
            placeholder={FM('forms.product.brandPlaceholder')}
            testId="product-form-brand"
          />
          <FormInput
            fullWidth
            control={formControl}
            helperText={FM('forms.product.stockHelper')}
            label={FM('forms.product.stock')}
            name="stock"
            placeholder={FM('forms.product.stockPlaceholder')}
            testId="product-form-stock"
            type="number"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <ButtonNative
            disabled={!isDirty || isSubmitting}
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
            {isSubmitting ? FM('common.loading') : submitLabel}
          </ButtonNative>
        </div>
      </form>
    </FormProvider>
  );
};
