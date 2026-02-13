/**
 * Search Form Schema
 *
 * Product search form with query and optional category filter.
 */
import { z } from 'zod';

import { optionalString, requiredString } from '@/lib/forms/schemas';

export const searchFormSchema = z.object({
  query: requiredString,
  category: optionalString,
});

export type SearchFormData = z.infer<typeof searchFormSchema>;

export const defaultSearchFormValues: SearchFormData = {
  query: '',
  category: '',
};

/** Value used by the "All Categories" option */
export const ALL_CATEGORIES_VALUE = '';
