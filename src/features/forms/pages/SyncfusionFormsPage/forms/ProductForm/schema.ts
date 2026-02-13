/**
 * Product Form Schema
 *
 * Form with select dropdown, text inputs, and number validation.
 * Maps to CreateProductRequest/UpdateProductRequest API models.
 */
import { z } from 'zod';

import { optionalString, requiredString } from '@/lib/forms/schemas';

const MIN_STOCK = 0;

// Price schema that coerces string to number
const priceSchema = z.coerce.number().positive('validation.mustBePositive');

// Stock schema that coerces string to number, minimum 0
const stockSchema = z.coerce.number().min(MIN_STOCK, 'validation.mustBePositive');

export const productFormSchema = z.object({
  productName: requiredString,
  category: requiredString,
  price: priceSchema,
  description: optionalString,
  brand: optionalString,
  stock: stockSchema,
});

export type ProductFormData = z.infer<typeof productFormSchema>;

export const defaultProductFormValues: ProductFormData = {
  productName: '',
  category: '',
  price: 0,
  description: undefined,
  brand: undefined,
  stock: 0,
};
