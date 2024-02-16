/**
 * @enum {string}
 * @readonly
 */
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export const UserRoles: string[] = Object.values(UserRole);
