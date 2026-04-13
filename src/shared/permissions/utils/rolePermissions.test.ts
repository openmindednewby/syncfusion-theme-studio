import { describe, it, expect } from 'vitest';

import { Permission } from './Permission';
import { Role } from './Role';
import { ROLE_PERMISSIONS, getPermissionsForRole } from './rolePermissions';

describe('rolePermissions', () => {
  describe('ROLE_PERMISSIONS mapping', () => {
    it('contains all four roles', () => {
      expect(Object.keys(ROLE_PERMISSIONS)).toHaveLength(4);
      expect(ROLE_PERMISSIONS[Role.Admin]).toBeDefined();
      expect(ROLE_PERMISSIONS[Role.Manager]).toBeDefined();
      expect(ROLE_PERMISSIONS[Role.Viewer]).toBeDefined();
      expect(ROLE_PERMISSIONS[Role.Analyst]).toBeDefined();
    });

    it('grants Admin the AdminAccess permission', () => {
      const adminPerms = ROLE_PERMISSIONS[Role.Admin]!;

      expect(adminPerms).toContain(Permission.AdminAccess);
    });

    it('does not grant AdminAccess to non-Admin roles', () => {
      const managerPerms = ROLE_PERMISSIONS[Role.Manager]!;
      const viewerPerms = ROLE_PERMISSIONS[Role.Viewer]!;
      const analystPerms = ROLE_PERMISSIONS[Role.Analyst]!;

      expect(managerPerms).not.toContain(Permission.AdminAccess);
      expect(viewerPerms).not.toContain(Permission.AdminAccess);
      expect(analystPerms).not.toContain(Permission.AdminAccess);
    });

    it('grants Admin all management permissions', () => {
      const adminPerms = ROLE_PERMISSIONS[Role.Admin]!;

      expect(adminPerms).toContain(Permission.ManageUsers);
      expect(adminPerms).toContain(Permission.ManageRoles);
      expect(adminPerms).toContain(Permission.ManageSettings);
      expect(adminPerms).toContain(Permission.ManageReports);
    });

    it('does not grant Viewer any management permissions', () => {
      const viewerPerms = ROLE_PERMISSIONS[Role.Viewer]!;

      expect(viewerPerms).not.toContain(Permission.ManageUsers);
      expect(viewerPerms).not.toContain(Permission.ManageRoles);
      expect(viewerPerms).not.toContain(Permission.EditProducts);
      expect(viewerPerms).not.toContain(Permission.ManageSettings);
      expect(viewerPerms).not.toContain(Permission.ManageOrders);
    });

    it('grants Viewer all view-only permissions for core features', () => {
      const viewerPerms = ROLE_PERMISSIONS[Role.Viewer]!;

      expect(viewerPerms).toContain(Permission.ViewDashboard);
      expect(viewerPerms).toContain(Permission.ViewProducts);
      expect(viewerPerms).toContain(Permission.ViewOrders);
      expect(viewerPerms).toContain(Permission.ViewReports);
      expect(viewerPerms).toContain(Permission.ViewCalendar);
    });

    it('grants Manager manage permissions for orders and alerts but not users', () => {
      const managerPerms = ROLE_PERMISSIONS[Role.Manager]!;

      expect(managerPerms).toContain(Permission.ManageOrders);
      expect(managerPerms).toContain(Permission.ManageAlerts);
      expect(managerPerms).not.toContain(Permission.ManageUsers);
      expect(managerPerms).not.toContain(Permission.ManageRoles);
      expect(managerPerms).not.toContain(Permission.ManageSettings);
    });

    it('gives Analyst fewer permissions than Viewer for kanban and forms', () => {
      const analystPerms = ROLE_PERMISSIONS[Role.Analyst]!;

      expect(analystPerms).not.toContain(Permission.ViewKanban);
      expect(analystPerms).not.toContain(Permission.ViewForms);
      expect(analystPerms).not.toContain(Permission.ViewComponents);
      expect(analystPerms).not.toContain(Permission.ViewMarketplace);
    });
  });

  describe('getPermissionsForRole', () => {
    it('returns Admin permissions for Admin role', () => {
      const perms = getPermissionsForRole(Role.Admin);

      expect(perms).toBe(ROLE_PERMISSIONS[Role.Admin]);
    });

    it('returns Viewer permissions for Viewer role', () => {
      const perms = getPermissionsForRole(Role.Viewer);

      expect(perms).toBe(ROLE_PERMISSIONS[Role.Viewer]);
    });

    it('returns empty array for unknown role', () => {
      const perms = getPermissionsForRole('UnknownRole');

      expect(perms).toEqual([]);
    });

    it('returns empty array for empty string', () => {
      const perms = getPermissionsForRole('');

      expect(perms).toEqual([]);
    });
  });
});
