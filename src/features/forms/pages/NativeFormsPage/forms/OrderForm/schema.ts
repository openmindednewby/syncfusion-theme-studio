/**
 * Order Form Schema
 *
 * Form with user selection and dynamic item rows (product + quantity).
 * Used for creating orders via MockServer Orders API.
 */
import { z } from 'zod';

const orderItemSchema = z.object({
  productId: z.coerce.number().positive('validation.pleaseSelect'),
  quantity: z.coerce.number().int().positive('validation.mustBePositive'),
});

export const orderFormSchema = z.object({
  userId: z.coerce.number().positive('validation.pleaseSelect'),
  items: z.array(orderItemSchema).min(1, 'validation.minOneItem'),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
