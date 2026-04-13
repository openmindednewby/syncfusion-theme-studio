/**
 * useFormCompletion - Calculates form completion percentage.
 *
 * Watches form values and counts non-empty fields against total.
 */
import { useMemo } from 'react';

import { useFormContext } from 'react-hook-form';

import { isValueDefined } from '@/utils/is';

import type { AllComponentsFormData } from '../../../forms/AllComponentsForm/schema';

const REQUIRED_FIELDS: Array<keyof AllComponentsFormData> = [
  'title',
  'firstName',
  'lastName',
  'email',
  'phone',
  'eventTrack',
  'preferredDate',
  'mealPreference',
  'agreeToTerms',
];

export function useFormCompletion(): number {
  const { watch } = useFormContext<AllComponentsFormData>();
  const values = watch();

  return useMemo(() => {
    const filledCount = REQUIRED_FIELDS.filter((field) => {
      const value = values[field];
      if (typeof value === 'boolean') return value === true;
      if (typeof value === 'string') return value !== '';
      return isValueDefined(value);
    }).length;

    return filledCount / REQUIRED_FIELDS.length;
  }, [values]);
}
