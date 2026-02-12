/**
 * Search Form Schema
 *
 * Inline/horizontal search form with multiple filter options.
 * Demonstrates optional fields and date range.
 */
import { z } from 'zod';

import { optionalString } from '@/lib/forms/schemas';

export const searchFormSchema = z.object({
  query: optionalString,
  category: optionalString,
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
});

export type SearchFormData = z.infer<typeof searchFormSchema>;

export const defaultSearchFormValues: SearchFormData = {
  query: '',
  category: '',
  dateFrom: undefined,
  dateTo: undefined,
};

export const searchCategoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'products', label: 'Products' },
  { value: 'users', label: 'Users' },
  { value: 'orders', label: 'Orders' },
  { value: 'reports', label: 'Reports' },
];
