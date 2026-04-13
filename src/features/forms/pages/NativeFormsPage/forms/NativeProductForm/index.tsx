/**
 * Native Product Form Component
 *
 * Product form using native HTML inputs (FormNativeInput + FormNativeSelect).
 * Supports create and edit modes with external category options.
 */
import { useEffect, useMemo } from 'react';

import { FormNativeInput, FormNativeSelect, FormNativeSpinner } from '@/components/ui/form-fields';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/utils/helpers';

import {
  defaultNativeProductFormValues,
  nativeProductFormSchema,
  type NativeProductFormData,
} from './schema';

const PRICE_STEP = 0.01;

interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  onSubmit: (data: NativeProductFormData) => void;
  categories: SelectOption[];
  defaultValues?: Partial<NativeProductFormData>;
  isSubmitting?: boolean;
  isEditing?: boolean;
}

export const NativeProductForm = ({
  onSubmit,
  categories,
  defaultValues,
  isSubmitting = false,
  isEditing = false,
}: Props): JSX.Element => {
  const formConfig = useMemo(
    () => ({
      schema: nativeProductFormSchema,
      defaultValues: { ...defaultNativeProductFormValues, ...defaultValues },
    }),
    [defaultValues],
  );
  const { handleSubmit, control, reset, formState } = useFormWithSchema(formConfig);
  const { isDirty } = formState;

  useEffect(() => {
    reset({ ...defaultNativeProductFormValues, ...defaultValues });
  }, [defaultValues, reset]);

  function handleFormSubmit(data: NativeProductFormData): void {
    onSubmit(data);
  }

  function handleReset(): void {
    reset({ ...defaultNativeProductFormValues });
  }

  const formControl = control;

  const submitLabel = isEditing
    ? FM('forms.product.updateProduct')
    : FM('forms.product.submit');

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <FormNativeInput
        fullWidth
        required
        control={formControl}
        label={FM('forms.product.productName')}
        name="productName"
        placeholder={FM('forms.product.productNamePlaceholder')}
        testId="native-product-form-name"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormNativeSelect
          fullWidth
          required
          control={formControl}
          label={FM('forms.product.category')}
          name="category"
          options={categories}
          placeholder={FM('forms.product.categoryPlaceholder')}
          testId="native-product-form-category"
        />
        <FormNativeSpinner
          fullWidth
          required
          control={formControl}
          helperText={FM('forms.product.priceHelper')}
          label={FM('forms.product.price')}
          min={0}
          name="price"
          step={PRICE_STEP}
          testId="native-product-form-price"
        />
      </div>

      <FormNativeInput
        fullWidth
        control={formControl}
        label={FM('forms.product.description')}
        name="description"
        placeholder={FM('forms.product.descriptionPlaceholder')}
        testId="native-product-form-description"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormNativeInput
          fullWidth
          control={formControl}
          label={FM('forms.product.brand')}
          name="brand"
          placeholder={FM('forms.product.brandPlaceholder')}
          testId="native-product-form-brand"
        />
        <FormNativeInput
          fullWidth
          control={formControl}
          helperText={FM('forms.product.stockHelper')}
          label={FM('forms.product.stock')}
          name="stock"
          placeholder={FM('forms.product.stockPlaceholder')}
          testId="native-product-form-stock"
          type="number"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <ButtonNative
          disabled={!isDirty || isSubmitting}
          testId="native-product-form-reset"
          type="button"
          variant={ButtonVariant.Outline}
          onClick={handleReset}
        >
          {FM('common.reset')}
        </ButtonNative>
        <ButtonNative
          disabled={isSubmitting}
          testId="native-product-form-submit"
          type="submit"
          variant={ButtonVariant.Primary}
        >
          {isSubmitting ? FM('common.loading') : submitLabel}
        </ButtonNative>
      </div>
    </form>
  );
};
