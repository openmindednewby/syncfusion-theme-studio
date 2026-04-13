import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api/axiosInstance';

import { ORGANIZATIONS_API_URL, ORGANIZATIONS_QUERY_KEY } from '../constants';

import type { Organization } from '../types';
import type { AxiosResponse } from 'axios';

const MOCKSERVER_BASE = '/mockapi';

async function fetchOrganizations(): Promise<Organization[]> {
  const response: AxiosResponse<Organization[]> = await apiClient.get(
    ORGANIZATIONS_API_URL,
    { baseURL: MOCKSERVER_BASE },
  );
  return response.data;
}

interface UseOrganizationsReturn {
  organizations: Organization[];
  isLoading: boolean;
  isError: boolean;
}

export function useOrganizations(): UseOrganizationsReturn {
  const { data, isLoading, isError } = useQuery({
    queryKey: [...ORGANIZATIONS_QUERY_KEY],
    queryFn: fetchOrganizations,
  });

  return {
    organizations: data ?? [],
    isLoading,
    isError,
  };
}
