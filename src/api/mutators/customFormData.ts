/**
 * Custom FormData serializer for Orval multipart/form-data endpoints.
 *
 * Orval calls this instead of inline `formData.append()` when the
 * `formData` mutator is configured in orval.config.ts.
 *
 * Handles: Blob/File → direct append, complex objects → JSON.stringify,
 * arrays → per-element handling, primitives → String(), null/undefined → skip.
 */
import { isNullOrUndefined, isValueDefined } from '@/utils';

const appendItem = (formData: FormData, key: string, item: unknown): void => {
  if (item instanceof Blob) formData.append(key, item);
  else if (typeof item === 'object' && isValueDefined(item))
    formData.append(key, JSON.stringify(item));
  else formData.append(key, String(item));
};

export function customFormData<Body extends Record<string, unknown>>(
  body: Body,
): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(body)) {
    if (isNullOrUndefined(value)) continue;

    if (value instanceof Blob) formData.append(key, value);
    else if (Array.isArray(value))
      for (const item of value) appendItem(formData, key, item);
    else if (typeof value === 'object') formData.append(key, JSON.stringify(value));
    else formData.append(key, String(value));
  }

  return formData;
}

export default customFormData;
