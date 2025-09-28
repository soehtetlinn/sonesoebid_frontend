import { UserRole, User } from '../types';

export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return 'Administrator';
    case UserRole.BUYER:
      return 'Buyer';
    case UserRole.BIDDER:
      return 'Bidder';
    default:
      return role;
  }
}

export function getRoleColor(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case UserRole.BUYER:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case UserRole.BIDDER:
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
}

export function isAdmin(subject?: User | UserRole | null): boolean {
  if (!subject) return false;
  const role = typeof subject === 'string' ? subject : subject.role;
  return role === UserRole.ADMIN;
}

export function getAllUserRoles(): UserRole[] {
  return [UserRole.ADMIN, UserRole.BUYER, UserRole.BIDDER];
}
