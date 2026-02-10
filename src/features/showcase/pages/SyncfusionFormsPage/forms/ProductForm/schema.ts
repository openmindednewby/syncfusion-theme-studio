/**
 * Product Form Schema
 *
 * Form with select dropdown and date picker.
 * Demonstrates positive number validation and future date validation.
 */
import { z } from 'zod';

import { requiredString, futureDateSchema } from '@/lib/forms/schemas';

// Price schema that coerces string to number
const priceSchema = z.coerce.number().positive('validation.mustBePositive');

export const productFormSchema = z.object({
  productName: requiredString,
  category: requiredString,
  price: priceSchema,
  releaseDate: futureDateSchema.optional(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

export const defaultProductFormValues: ProductFormData = {
  productName: '',
  category: '',
  price: 0,
  releaseDate: undefined,
};

export const categoryOptions = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'sports', label: 'Sports & Outdoors' },
  { value: 'books', label: 'Books' },
];
