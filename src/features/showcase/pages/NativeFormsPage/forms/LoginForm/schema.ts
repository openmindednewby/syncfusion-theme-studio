import { z } from 'zod';

import { emailSchema, passwordSchema, booleanSchema } from '@/lib/forms/schemas/common';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: booleanSchema.optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
