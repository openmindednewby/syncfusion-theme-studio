import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import { DEFAULT_ORG_ID } from '../constants';
import { useOrgStore } from './useOrgStore';

import type { Organization } from '../types';

const ACME: Organization = {
  id: 1,
  name: 'Acme Corp',
  slug: 'acme-corp',
  logoUrl: 'https://example.com/acme.png',
  plan: 'Enterprise',
  memberCount: 150,
};

const GLOBEX: Organization = {
  id: 2,
  name: 'Globex Inc',
  slug: 'globex-inc',
  logoUrl: 'https://example.com/globex.png',
  plan: 'Pro',
  memberCount: 45,
};

describe('useOrgStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useOrgStore());
    act(() => {
      useOrgStore.setState({
        activeOrgId: DEFAULT_ORG_ID,
        activeOrg: null,
      });
    });
    expect(result.current.activeOrg).toBeNull();
  });

  describe('initial state', () => {
    it('starts with default org id and no active org', () => {
      const { result } = renderHook(() => useOrgStore());
      expect(result.current.activeOrgId).toBe(DEFAULT_ORG_ID);
      expect(result.current.activeOrg).toBeNull();
    });
  });

  describe('setActiveOrg', () => {
    it('updates activeOrgId and activeOrg', () => {
      const { result } = renderHook(() => useOrgStore());

      act(() => {
        result.current.setActiveOrg(ACME);
      });

      expect(result.current.activeOrgId).toBe(ACME.id);
      expect(result.current.activeOrg).toEqual(ACME);
    });

    it('switches between organizations', () => {
      const { result } = renderHook(() => useOrgStore());

      act(() => {
        result.current.setActiveOrg(ACME);
      });
      expect(result.current.activeOrgId).toBe(ACME.id);

      act(() => {
        result.current.setActiveOrg(GLOBEX);
      });
      expect(result.current.activeOrgId).toBe(GLOBEX.id);
      expect(result.current.activeOrg).toEqual(GLOBEX);
    });

    it('shares state between multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useOrgStore());
      const { result: result2 } = renderHook(() => useOrgStore());

      act(() => {
        result1.current.setActiveOrg(ACME);
      });

      expect(result2.current.activeOrgId).toBe(ACME.id);
      expect(result2.current.activeOrg).toEqual(ACME);
    });
  });
});
