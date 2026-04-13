/**
 * All Components Form Schema
 *
 * Event Registration form using all 38 native components.
 * Organized into personal info, preferences, dietary, and documents sections.
 */
import { z } from 'zod';

import {
  requiredString,
  optionalString,
  emailSchema,
  phoneSchema,
  booleanSchema,
} from '@/lib/forms/schemas';

const MIN_GUEST_PASSES = 0;
const MAX_GUEST_PASSES = 5;

export const allComponentsSchema = z.object({
  // Personal
  title: requiredString,
  firstName: requiredString,
  lastName: requiredString,
  email: emailSchema,
  phone: phoneSchema,
  bio: optionalString,

  // Preferences
  eventTrack: requiredString,
  preferredDate: requiredString,
  workshops: z.array(z.string()).default([]),
  attendDinner: booleanSchema,
  receiveUpdates: booleanSchema,
  guestPasses: z.coerce.number().min(MIN_GUEST_PASSES).max(MAX_GUEST_PASSES).default(0),

  // Dietary
  mealPreference: requiredString,
  allergies: optionalString,
  accessibilityNotes: optionalString,

  // Documents
  promoCode: optionalString,
  agreeToTerms: booleanSchema.refine((val) => val === true, { message: 'validation.required' }),
});

export type AllComponentsFormData = z.infer<typeof allComponentsSchema>;

export const defaultAllComponentsValues: AllComponentsFormData = {
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  bio: '',
  eventTrack: '',
  preferredDate: '',
  workshops: [],
  attendDinner: false,
  receiveUpdates: true,
  guestPasses: 0,
  mealPreference: '',
  allergies: '',
  accessibilityNotes: '',
  promoCode: '',
  agreeToTerms: false,
};
