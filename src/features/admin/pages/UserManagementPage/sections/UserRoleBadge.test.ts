import { describe, it, expect } from 'vitest';

import { Role } from '@/shared/permissions';

import { ROLE_CONFIG } from './UserRoleBadge';

describe('UserRoleBadge ROLE_CONFIG semantic tokens', () => {
  it('Admin badge uses purple semantic classes', () => {
    const config = ROLE_CONFIG.get(Role.Admin);
    expect(config?.className).toContain('bg-purple-100');
    expect(config?.className).toContain('text-purple-700');
  });

  it('Manager badge uses primary semantic tokens', () => {
    const config = ROLE_CONFIG.get(Role.Manager);
    expect(config?.className).toContain('bg-primary-50');
    expect(config?.className).toContain('text-primary-700');
  });

  it('Viewer badge uses surface/muted semantic tokens', () => {
    const config = ROLE_CONFIG.get(Role.Viewer);
    expect(config?.className).toContain('bg-surface-200');
    expect(config?.className).toContain('text-text-muted');
  });

  it('Analyst badge uses amber semantic classes', () => {
    const config = ROLE_CONFIG.get(Role.Analyst);
    expect(config?.className).toContain('bg-amber-100');
    expect(config?.className).toContain('text-amber-700');
  });

  it('every role has a config entry', () => {
    expect(ROLE_CONFIG.size).toBeGreaterThanOrEqual(4);
    expect(ROLE_CONFIG.has(Role.Admin)).toBe(true);
    expect(ROLE_CONFIG.has(Role.Manager)).toBe(true);
    expect(ROLE_CONFIG.has(Role.Viewer)).toBe(true);
    expect(ROLE_CONFIG.has(Role.Analyst)).toBe(true);
  });

  it('every role config has a non-empty labelKey and className', () => {
    for (const [_role, config] of ROLE_CONFIG) {
      expect(config.labelKey).not.toBe('');
      expect(config.className).not.toBe('');
    }
  });
});
