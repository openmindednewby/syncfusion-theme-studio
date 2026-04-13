/**
 * Native Product Form Schema
 *
 * Same fields as the Syncfusion ProductForm: productName, category, price,
 * description, brand, stock. Maps to MockServer Product API.
 */
import { z } from 'zod';

import { optionalString, requiredString } from '@/lib/forms/schemas';

const MIN_STOCK = 0;
const priceSchema = z.coerce.number().positive('validation.mustBePositive');
const stockSchema = z.coerce.number().min(MIN_STOCK, 'validation.mustBePositive');

export const nativeProductFormSchema = z.object({
  productName: requiredString,
  category: requiredString,
  price: priceSchema,
  description: optionalString,
  brand: optionalString,
  stock: stockSchema,
});

export type NativeProductFormData = z.infer<typeof nativeProductFormSchema>;

export const defaultNativeProductFormValues: NativeProductFormData = {
  productName: '',
  category: '',
  price: 0,
  description: undefined,
  brand: undefined,
  stock: 0,
};
