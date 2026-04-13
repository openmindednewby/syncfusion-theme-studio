import { describe, expect, it } from 'vitest';

import { contactSchema } from './schema';

describe('contactSchema', () => {
  it('validates a complete valid contact form', () => {
    const result = contactSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Hello',
      message: 'This is a test message that is long enough.',
    });
    expect(result.success).toBe(true);
  });

  it('rejects when name is empty', () => {
    const result = contactSchema.safeParse({
      name: '',
      email: 'john@example.com',
      subject: 'Hello',
      message: 'This is a test message that is long enough.',
    });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email format', () => {
    const result = contactSchema.safeParse({
      name: 'John Doe',
      email: 'not-an-email',
      subject: 'Hello',
      message: 'This is a test message that is long enough.',
    });
    expect(result.success).toBe(false);
  });

  it('rejects when subject is missing', () => {
    const result = contactSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      subject: '',
      message: 'This is a test message that is long enough.',
    });
    expect(result.success).toBe(false);
  });

  it('rejects when message is too short', () => {
    const result = contactSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Hello',
      message: 'Short',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a name that is only one character', () => {
    const result = contactSchema.safeParse({
      name: 'J',
      email: 'john@example.com',
      subject: 'Hello',
      message: 'This is a valid message for testing.',
    });
    expect(result.success).toBe(false);
  });
});
