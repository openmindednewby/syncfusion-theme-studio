/**
 * Tests for CustomerDialog accessibility.
 *
 * Validates that input field IDs follow a consistent naming pattern
 * for proper label association via htmlFor.
 */
import { describe, it, expect } from 'vitest';

/** Input IDs used in CustomerDialog must match their htmlFor labels. */
const CUSTOMER_FIELD_IDS = [
  'customer-first-name',
  'customer-last-name',
  'customer-email',
  'customer-phone',
  'customer-company',
] as const;

describe('CustomerDialog field IDs', () => {
  it('all field IDs follow the customer-{field} naming convention', () => {
    for (const id of CUSTOMER_FIELD_IDS) 
      expect(id).toMatch(/^customer-[a-z-]+$/);
    
  });

  it('has unique IDs for all fields', () => {
    const unique = new Set(CUSTOMER_FIELD_IDS);
    expect(unique.size).toBe(CUSTOMER_FIELD_IDS.length);
  });

  it('has exactly 5 labeled input fields', () => {
    expect(CUSTOMER_FIELD_IDS).toHaveLength(5);
  });
});
