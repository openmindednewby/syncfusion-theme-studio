import { useCallback, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/api/axiosInstance';
import { isValueDefined } from '@/utils/is';

import { ORGANIZATIONS_API_URL } from '../constants';
import { useOrganizations } from './useOrganizations';
import { useOrgStore } from '../stores/useOrgStore';

import type { Organization } from '../types';
import type { AxiosResponse } from 'axios';

const MOCKSERVER_BASE = '/mockapi';

async function switchOrganization(id: number): Promise<Organization> {
  const response: AxiosResponse<Organization> = await apiClient.post(
    `${ORGANIZATIONS_API_URL}/${id}/switch`,
    {},
    { baseURL: MOCKSERVER_BASE },
  );
  return response.data;
}

interface UseCurrentOrgReturn {
  currentOrg: Organization | null;
  switchOrg: (org: Organization) => void;
  isLoading: boolean;
}

export function useCurrentOrg(): UseCurrentOrgReturn {
  const { activeOrg, activeOrgId, setActiveOrg } = useOrgStore();
  const { organizations, isLoading } = useOrganizations();
  const queryClient = useQueryClient();

  // Auto-select first org if none is active yet
  useEffect(() => {
    if (isValueDefined(activeOrg)) return;
    if (organizations.length === 0) return;
    const match = organizations.find((o) => o.id === activeOrgId);
    const fallback = match ?? organizations[0];
    if (isValueDefined(fallback)) setActiveOrg(fallback);
  }, [activeOrg, activeOrgId, organizations, setActiveOrg]);

  const switchOrg = useCallback(
    (org: Organization) => {
      setActiveOrg(org);
      switchOrganization(org.id).catch(() => undefined);
      queryClient.invalidateQueries().catch(() => undefined);
    },
    [setActiveOrg, queryClient],
  );

  return {
    currentOrg: activeOrg,
    switchOrg,
    isLoading,
  };
}
