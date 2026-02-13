/**
 * User Form Schema
 *
 * Form with first name, last name, email, phone, and username fields.
 * Used for creating and updating users via MockServer Users API.
 */
import { z } from 'zod';

import { emailSchema, requiredString, optionalString } from '@/lib/forms/schemas';

export const userFormSchema = z.object({
  firstName: requiredString,
  lastName: requiredString,
  email: emailSchema,
  phone: optionalString,
  username: requiredString,
});

export type UserFormData = z.infer<typeof userFormSchema>;

export const defaultUserFormValues: UserFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  username: '',
};
