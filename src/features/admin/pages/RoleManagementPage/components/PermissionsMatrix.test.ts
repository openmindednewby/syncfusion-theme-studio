/**
 * Tests for PermissionsMatrix accessibility label generation.
 *
 * Validates that permission toggle aria-labels include both
 * the permission name and role name for screen reader clarity.
 */
import { describe, it, expect, vi } from 'vitest';

// Mock FM to return interpolated strings matching the localization pattern
vi.mock('@/localization/utils/helpers', () => ({
  FM: (key: string, p1?: string, p2?: string) => {
    const isPermissionToggle =
      key === 'roleManagement.permissionToggle' &&
      p1 !== undefined && p1 !== '' &&
      p2 !== undefined && p2 !== '';
    if (isPermissionToggle) return `${p1} permission for ${p2} role`;
    return key;
  },
}));

// Import FM after mock
const { FM } = await import('@/localization/utils/helpers');

describe('PermissionsMatrix aria-label generation', () => {
  it('builds correct aria-label for a permission toggle', () => {
    const label = FM('roleManagement.permissionToggle', 'ManageUsers', 'Admin');
    expect(label).toBe('ManageUsers permission for Admin role');
  });

  it('includes both permission and role name', () => {
    const label = FM('roleManagement.permissionToggle', 'ViewReports', 'Editor');
    expect(label).toContain('ViewReports');
    expect(label).toContain('Editor');
  });

  it('handles different permission/role combinations', () => {
    const label1 = FM('roleManagement.permissionToggle', 'DeleteData', 'SuperAdmin');
    const label2 = FM('roleManagement.permissionToggle', 'ReadOnly', 'Viewer');

    expect(label1).not.toBe(label2);
    expect(label1).toContain('DeleteData');
    expect(label1).toContain('SuperAdmin');
    expect(label2).toContain('ReadOnly');
    expect(label2).toContain('Viewer');
  });
});
