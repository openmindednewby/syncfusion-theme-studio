/**
 * Manual API hooks for system settings endpoints.
 *
 * Follows the same patterns as other manual hooks (e.g. useAuditLog)
 * since these endpoints were added after the last Orval generation run.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

import { mockserverInstance } from '@/api/mutators/mockserverMutator';
import { isValueDefined } from '@/utils/is';

import { SETTINGS_API_PATH } from '../constants';

import type { SystemSettingsDto } from '../types';

// ─── Response shapes ────────────────────────────────────────────────────────

interface SettingsResponse {
  data: SystemSettingsDto;
  status: number;
  headers: Headers;
}

// ─── Query key factory ──────────────────────────────────────────────────────

export function getSystemSettingsQueryKey(): readonly string[] {
  return [SETTINGS_API_PATH] as const;
}

// ─── Fetch helpers ──────────────────────────────────────────────────────────

async function fetchSettings(signal?: AbortSignal): Promise<SettingsResponse> {
  return mockserverInstance<SettingsResponse>(SETTINGS_API_PATH, {
    method: 'GET',
    ...(isValueDefined(signal) ? { signal } : {}),
  });
}

async function updateSettings(dto: SystemSettingsDto): Promise<SettingsResponse> {
  return mockserverInstance<SettingsResponse>(SETTINGS_API_PATH, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
}

// ─── Exported hooks ─────────────────────────────────────────────────────────

export function useSystemSettings(): UseQueryResult<SettingsResponse> {
  return useQuery({
    queryKey: getSystemSettingsQueryKey(),
    queryFn: async ({ signal }) => fetchSettings(signal),
  });
}

export function useUpdateSystemSettings(): UseMutationResult<
  SettingsResponse,
  Error,
  SystemSettingsDto
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: getSystemSettingsQueryKey() })
        .catch(() => undefined);
    },
  });
}
