import { z } from 'zod';

import { emailSchema, nameSchema, messageSchema, requiredString } from '@/lib/forms/schemas/common';

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: requiredString,
  message: messageSchema,
});

export type ContactFormData = z.infer<typeof contactSchema>;
