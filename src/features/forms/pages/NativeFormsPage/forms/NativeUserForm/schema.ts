/**
 * Native User Form Schema
 *
 * Same fields as the Syncfusion UserForm: firstName, lastName, email, phone, username.
 * Used for creating and updating users via MockServer Users API.
 */
import { z } from 'zod';

import { emailSchema, requiredString, optionalString } from '@/lib/forms/schemas';

export const nativeUserFormSchema = z.object({
  firstName: requiredString,
  lastName: requiredString,
  email: emailSchema,
  phone: optionalString,
  username: requiredString,
});

export type NativeUserFormData = z.infer<typeof nativeUserFormSchema>;

export const defaultNativeUserFormValues: NativeUserFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  username: '',
};
