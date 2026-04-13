import { useCallback, useEffect, useState } from 'react';

import { ROLES_API_BASE } from '../constants';

import type { CreateRolePayload, RoleDto, UpdateRolePayload } from '../types';

interface UseRoleManagementResult {
  roles: RoleDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createRole: (payload: CreateRolePayload) => Promise<boolean>;
  updateRole: (id: number, payload: UpdateRolePayload) => Promise<boolean>;
  deleteRole: (id: number) => Promise<boolean>;
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Request failed: ${String(res.status)}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: T = await res.json();
  return data;
}

function extractErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Failed to load roles';
}

async function fetchRoles(): Promise<RoleDto[]> {
  return fetchJson<RoleDto[]>(ROLES_API_BASE);
}

async function postRole(
  payload: CreateRolePayload,
  refetch: () => Promise<void>,
): Promise<boolean> {
  try {
    await fetchJson<RoleDto>(ROLES_API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    await refetch();
    return true;
  } catch {
    return false;
  }
}

async function putRole(
  id: number,
  payload: UpdateRolePayload,
  refetch: () => Promise<void>,
): Promise<boolean> {
  try {
    await fetchJson<RoleDto>(`${ROLES_API_BASE}/${String(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    await refetch();
    return true;
  } catch {
    return false;
  }
}

async function removeRole(
  id: number,
  refetch: () => Promise<void>,
): Promise<boolean> {
  try {
    const res = await fetch(`${ROLES_API_BASE}/${String(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) return false;
    await refetch();
    return true;
  } catch {
    return false;
  }
}

/** Provides CRUD operations for role management via direct fetch. */
export function useRoleManagement(): UseRoleManagementResult {
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try { setRoles(await fetchRoles()); }
    catch (err: unknown) { setError(extractErrorMessage(err)); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { refetch().catch(() => undefined); }, [refetch]);

  const createRole = useCallback(
    async (payload: CreateRolePayload) => postRole(payload, refetch),
    [refetch],
  );
  const updateRole = useCallback(
    async (id: number, payload: UpdateRolePayload) => putRole(id, payload, refetch),
    [refetch],
  );
  const deleteRole = useCallback(
    async (id: number) => removeRole(id, refetch),
    [refetch],
  );

  return { roles, isLoading, error, refetch, createRole, updateRole, deleteRole };
}
