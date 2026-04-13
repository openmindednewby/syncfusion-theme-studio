/**
 * Manual API hooks for audit log endpoints.
 *
 * These follow the same patterns as Orval-generated hooks but are
 * hand-written because the audit-log endpoints were added after the
 * last Orval generation run.
 */
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import { isValueDefined } from '@/utils';

import { mockserverInstance } from '../mutators/mockserverMutator';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AuditEntryDto {
  id: number;
  userId: number;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface AuditLogStatsDto {
  created: number;
  updated: number;
  deleted: number;
  viewed: number;
  loggedIn: number;
  loggedOut: number;
  total: number;
}

export interface PaginatedAuditLog {
  items: AuditEntryDto[];
  total: number;
  skip: number;
  limit: number;
}

export interface AuditLogFilters {
  skip?: number;
  limit?: number;
  action?: string;
  entityType?: string;
  userId?: number;
  from?: string;
  to?: string;
}

// ─── Exported query key factories ────────────────────────────────────────────

export function getAuditLogQueryKey(filters: AuditLogFilters): readonly unknown[] {
  return ['/api/audit-log', filters] as const;
}

export function getAuditLogStatsQueryKey(): readonly string[] {
  return ['/api/audit-log/stats'] as const;
}

// ─── Exported hooks ──────────────────────────────────────────────────────────

export function useAuditLog(
  filters: AuditLogFilters = {},
  options?: Partial<UseQueryOptions<AuditLogListResponse>>,
): UseQueryResult<AuditLogListResponse> {
  return useQuery({
    queryKey: getAuditLogQueryKey(filters),
    queryFn: async ({ signal }) => fetchAuditLog(filters, signal),
    ...options,
  });
}

export function useAuditLogStats(
  options?: Partial<UseQueryOptions<AuditLogStatsResponse>>,
): UseQueryResult<AuditLogStatsResponse> {
  return useQuery({
    queryKey: getAuditLogStatsQueryKey(),
    queryFn: async ({ signal }) => fetchAuditLogStats(signal),
    ...options,
  });
}

// ─── Private helpers ─────────────────────────────────────────────────────────

interface AuditLogListResponse {
  data: PaginatedAuditLog;
  status: number;
  headers: Headers;
}

interface AuditLogStatsResponse {
  data: AuditLogStatsDto;
  status: number;
  headers: Headers;
}

function buildAuditLogUrl(filters: AuditLogFilters): string {
  const params = new URLSearchParams();
  if (isValueDefined(filters.skip)) params.set('skip', String(filters.skip));
  if (isValueDefined(filters.limit)) params.set('limit', String(filters.limit));
  if (isValueDefined(filters.action) && filters.action !== '') params.set('action', filters.action);
  if (isValueDefined(filters.entityType) && filters.entityType !== '') params.set('entityType', filters.entityType);
  if (isValueDefined(filters.userId)) params.set('userId', String(filters.userId));
  if (isValueDefined(filters.from) && filters.from !== '') params.set('from', filters.from);
  if (isValueDefined(filters.to) && filters.to !== '') params.set('to', filters.to);
  const qs = params.toString();
  return qs !== '' ? `/api/audit-log?${qs}` : '/api/audit-log';
}

async function fetchAuditLog(
  filters: AuditLogFilters,
  signal?: AbortSignal,
): Promise<AuditLogListResponse> {
  return mockserverInstance<AuditLogListResponse>(buildAuditLogUrl(filters), {
    method: 'GET',
    ...(isValueDefined(signal) ? { signal } : {}),
  });
}

async function fetchAuditLogStats(signal?: AbortSignal): Promise<AuditLogStatsResponse> {
  return mockserverInstance<AuditLogStatsResponse>('/api/audit-log/stats', {
    method: 'GET',
    ...(isValueDefined(signal) ? { signal } : {}),
  });
}
