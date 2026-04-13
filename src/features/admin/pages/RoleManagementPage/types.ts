/** API response shape for a role from the MockServer. */
export interface RoleDto {
  id: number;
  name: string;
  description: string;
  isBuiltIn: boolean;
  permissions: string[];
}

/** Request body for creating a new role. */
export interface CreateRolePayload {
  name: string;
  description: string;
  permissions: string[];
}

/** Request body for updating an existing role. */
export interface UpdateRolePayload {
  name: string;
  description: string;
  permissions: string[];
}
