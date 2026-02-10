import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z.string().min(1, 'validation.required').email('validation.email'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
