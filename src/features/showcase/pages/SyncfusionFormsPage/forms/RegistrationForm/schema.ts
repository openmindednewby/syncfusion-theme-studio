/**
 * Registration Form Schema
 *
 * Form with cross-field validation (password confirmation).
 * Demonstrates password matching and terms acceptance.
 */
import { z } from 'zod';

import { emailSchema, passwordSchema, booleanSchema } from '@/lib/forms/schemas';

export const registrationFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'validation.required'),
    acceptTerms: booleanSchema.refine((val) => val === true, {
      message: 'validation.acceptTerms',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'validation.passwordMismatch',
    path: ['confirmPassword'],
  });

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;

export const defaultRegistrationFormValues: RegistrationFormData = {
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};
