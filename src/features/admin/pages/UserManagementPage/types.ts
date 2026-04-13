import type { UserDto } from '@/api/generated/mockserver/models';

/** UserDto extended with guaranteed id and role fields for table display. */
export interface UserWithId extends UserDto {
  id: number;
  /** Client-side role assignment (mock); not in the generated UserDto. */
  role?: string;
  /** Client-side active status (mock); not in the generated UserDto. */
  isActive?: boolean;
}

/** Shape of the user form data submitted from the dialog. */
export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}
