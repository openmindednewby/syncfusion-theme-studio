import { describe, expect, it } from 'vitest';

import { orderFormSchema } from './schema';

describe('orderFormSchema', () => {
  it('validates a complete valid order', () => {
    const result = orderFormSchema.safeParse({
      userId: 1,
      items: [{ productId: 10, quantity: 2 }],
    });
    expect(result.success).toBe(true);
  });

  it('rejects when userId is zero or negative', () => {
    const zeroResult = orderFormSchema.safeParse({
      userId: 0,
      items: [{ productId: 10, quantity: 2 }],
    });
    expect(zeroResult.success).toBe(false);

    const negativeResult = orderFormSchema.safeParse({
      userId: -1,
      items: [{ productId: 10, quantity: 2 }],
    });
    expect(negativeResult.success).toBe(false);
  });

  it('rejects when items array is empty', () => {
    const result = orderFormSchema.safeParse({
      userId: 1,
      items: [],
    });
    expect(result.success).toBe(false);
  });

  it('rejects an item with zero productId', () => {
    const result = orderFormSchema.safeParse({
      userId: 1,
      items: [{ productId: 0, quantity: 2 }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects an item with zero quantity', () => {
    const result = orderFormSchema.safeParse({
      userId: 1,
      items: [{ productId: 10, quantity: 0 }],
    });
    expect(result.success).toBe(false);
  });

  it('accepts multiple items in a single order', () => {
    const result = orderFormSchema.safeParse({
      userId: 1,
      items: [
        { productId: 10, quantity: 2 },
        { productId: 20, quantity: 1 },
        { productId: 30, quantity: 5 },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('coerces string numbers to numeric values', () => {
    const result = orderFormSchema.safeParse({
      userId: '5',
      items: [{ productId: '10', quantity: '3' }],
    });
    expect(result.success).toBe(true);
  });

  it('rejects non-integer quantities', () => {
    const result = orderFormSchema.safeParse({
      userId: 1,
      items: [{ productId: 10, quantity: 2.5 }],
    });
    expect(result.success).toBe(false);
  });
});
