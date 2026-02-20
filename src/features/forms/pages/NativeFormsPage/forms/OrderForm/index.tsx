/**
 * OrderForm - Native form with dynamic item rows using useFieldArray.
 *
 * Displays a user selector, dynamic order item rows (product + quantity),
 * a calculated total, and submit/add/remove controls.
 */
import { useMemo } from 'react';

import { useFieldArray } from 'react-hook-form';

import type { ProductDto, UserDto } from '@/api/generated/mockserver/models';
import { FormNativeInput, FormNativeSelect } from '@/components/ui/form-fields';
import { ButtonNative, ButtonVariant, ButtonSize } from '@/components/ui/native';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/utils/helpers';

import { orderFormSchema, type OrderFormData } from './schema';


const FORM_CONFIG = { schema: orderFormSchema, defaultValues: { userId: 0, items: [{ productId: 0, quantity: 1 }] } };
const ZERO_PRICE = 0;
const DEFAULT_QUANTITY = 1;
const DECIMAL_PLACES = 2;

interface Props {
  users: UserDto[];
  products: ProductDto[];
  onSubmit: (data: OrderFormData) => void;
  isSubmitting: boolean;
}

function buildUserOptions(users: UserDto[]): Array<{ value: number; label: string }> {
  return users.map((u) => ({
    value: u.id ?? 0,
    label: `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim(),
  }));
}

function buildProductOptions(products: ProductDto[]): Array<{ value: number; label: string }> {
  return products.map((p) => ({
    value: p.id ?? 0,
    label: `${p.title ?? ''} ($${String(p.price ?? 0)})`,
  }));
}

export const OrderForm = ({ users, products, onSubmit, isSubmitting }: Props): JSX.Element => {
  const { control, handleSubmit, watch } = useFormWithSchema(FORM_CONFIG);
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const userOptions = useMemo(() => buildUserOptions(users), [users]);
  const productOptions = useMemo(() => buildProductOptions(products), [products]);

  const watchedItems = watch('items');

  const orderTotal = useMemo(() => {
    return watchedItems.reduce((sum, item) => {
      const product = products.find((p) => p.id === Number(item.productId));
      const price = product?.price ?? ZERO_PRICE;
      const rawQty = Number(item.quantity);
      const qty = Number.isNaN(rawQty) ? 0 : rawQty;
      return sum + price * qty;
    }, 0);
  }, [watchedItems, products]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FormNativeSelect
        fullWidth
        required
        control={control}
        label={FM('forms.order.selectUser')}
        name="userId"
        options={userOptions}
        placeholder={FM('forms.order.selectUserPlaceholder')}
        testId="order-user"
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-text-primary">{FM('forms.order.items')}</h4>
          <ButtonNative
            size={ButtonSize.Sm}
            testId="order-add-item"
            type="button"
            variant={ButtonVariant.Outline}
            onClick={() => append({ productId: 0, quantity: DEFAULT_QUANTITY })}
          >
            {FM('forms.order.addItem')}
          </ButtonNative>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2">
            <div className="flex-1">
              <FormNativeSelect
                fullWidth
                required
                control={control}
                label={FM('forms.order.product')}
                name={`items.${index}.productId` as const}
                options={productOptions}
                placeholder={FM('forms.order.selectProductPlaceholder')}
                testId={`order-product-${String(index)}`}
              />
            </div>
            <div className="w-24">
              <FormNativeInput
                fullWidth
                required
                control={control}
                label={FM('forms.order.quantity')}
                name={`items.${index}.quantity` as const}
                testId={`order-quantity-${String(index)}`}
                type="number"
              />
            </div>
            {fields.length > 1 && (
              <ButtonNative
                className="mt-6"
                size={ButtonSize.Sm}
                testId={`order-remove-item-${String(index)}`}
                type="button"
                variant={ButtonVariant.Danger}
                onClick={() => remove(index)}
              >
                {FM('forms.order.remove')}
              </ButtonNative>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm font-medium text-text-primary">
          {FM('forms.order.totalLabel', `$${orderTotal.toFixed(DECIMAL_PLACES)}`)}
        </span>
        <ButtonNative
          disabled={isSubmitting}
          testId="order-submit"
          type="submit"
          variant={ButtonVariant.Primary}
        >
          {isSubmitting ? FM('common.loading') : FM('forms.order.createOrder')}
        </ButtonNative>
      </div>
    </form>
  );
};
