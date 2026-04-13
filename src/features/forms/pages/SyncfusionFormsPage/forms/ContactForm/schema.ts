/**
 * Contact Form Schema
 *
 * Basic form with name, email, phone, and message fields.
 * Demonstrates required fields and email validation.
 */
import { z } from 'zod';

import { emailSchema, requiredString, optionalString } from '@/lib/forms/schemas';

export const contactFormSchema = z.object({
  name: requiredString,
  email: emailSchema,
  phone: optionalString,
  message: requiredString,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const defaultContactFormValues: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
};
