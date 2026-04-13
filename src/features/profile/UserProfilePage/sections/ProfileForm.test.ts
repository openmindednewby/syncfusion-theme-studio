import { describe, expect, it } from 'vitest';

import type { UserDto } from '@/api/generated/mockserver/models';

import { toFormState } from './ProfileForm';

const makeUser = (overrides: Partial<UserDto> = {}): UserDto => ({
  id: 1,
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@example.com',
  phone: '+1-555-0100',
  username: 'jane.doe',
  ...overrides,
});

describe('toFormState', () => {
  it('maps user fields correctly', () => {
    const user = makeUser();
    const state = toFormState(user);
    expect(state.firstName).toBe('Jane');
    expect(state.lastName).toBe('Doe');
    expect(state.email).toBe('jane.doe@example.com');
    expect(state.phone).toBe('+1-555-0100');
    expect(state.username).toBe('jane.doe');
  });

  it('returns empty strings for undefined user', () => {
    const state = toFormState(undefined);
    expect(state.firstName).toBe('');
    expect(state.lastName).toBe('');
    expect(state.email).toBe('');
    expect(state.phone).toBe('');
    expect(state.username).toBe('');
  });

  it('returns empty string for fields not set on user', () => {
    const user: UserDto = { id: 1 };
    const state = toFormState(user);
    expect(state.firstName).toBe('');
    expect(state.phone).toBe('');
    expect(state.username).toBe('');
  });
});
