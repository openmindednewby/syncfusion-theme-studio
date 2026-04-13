/**
 * Native Search Form Schema
 *
 * Product search form with query and optional category filter.
 * Same structure as the Syncfusion SearchForm.
 */
import { z } from 'zod';

import { optionalString, requiredString } from '@/lib/forms/schemas';

export const nativeSearchFormSchema = z.object({
  query: requiredString,
  category: optionalString,
});

export type NativeSearchFormData = z.infer<typeof nativeSearchFormSchema>;

export const defaultNativeSearchFormValues: NativeSearchFormData = {
  query: '',
  category: '',
};

/** Value used by the "All Categories" option */
export const ALL_CATEGORIES_VALUE = '';
