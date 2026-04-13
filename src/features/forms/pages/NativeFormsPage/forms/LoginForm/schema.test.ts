import { describe, expect, it } from 'vitest';

import { loginSchema } from './schema';

const MIN_PASSWORD_LENGTH = 8;

describe('loginSchema', () => {
  it('validates a complete valid login form', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: 'securepassword123',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an empty email', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: 'securepassword123',
    });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email format', () => {
    const result = loginSchema.safeParse({
      email: 'invalid-email',
      password: 'securepassword123',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a password shorter than minimum length', () => {
    const shortPassword = 'a'.repeat(MIN_PASSWORD_LENGTH - 1);
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: shortPassword,
    });
    expect(result.success).toBe(false);
  });

  it('accepts a password exactly at minimum length', () => {
    const exactPassword = 'a'.repeat(MIN_PASSWORD_LENGTH);
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: exactPassword,
    });
    expect(result.success).toBe(true);
  });

  it('allows rememberMe as optional', () => {
    const withoutRemember = loginSchema.safeParse({
      email: 'user@example.com',
      password: 'securepassword123',
    });
    expect(withoutRemember.success).toBe(true);

    const withRemember = loginSchema.safeParse({
      email: 'user@example.com',
      password: 'securepassword123',
      rememberMe: true,
    });
    expect(withRemember.success).toBe(true);
  });
});
