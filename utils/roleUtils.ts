import { UserRole, User } from '../types';

export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return 'Administrator';
    case UserRole.BUYER:
      return 'Buyer';
    case UserRole.BIDDER:
      return 'Bidder';
    case UserRole.MODERATOR:
      return 'Moderator';
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
    case UserRole.MODERATOR:
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
}

export function isAdmin(subject?: User | UserRole | null): boolean {
  if (!subject) return false;
  const role = typeof subject === 'string' ? subject : subject.role;
  return role === UserRole.ADMIN;
}

export function isModerator(subject?: User | UserRole | null): boolean {
  if (!subject) return false;
  const role = typeof subject === 'string' ? subject : subject.role;
  return role === UserRole.MODERATOR;
}

export function isModeratorOrAdmin(subject?: User | UserRole | null): boolean {
  if (!subject) return false;
  const role = typeof subject === 'string' ? subject : subject.role;
  return role === UserRole.ADMIN || role === UserRole.MODERATOR;
}

export function hasRole(user: User | null, role: UserRole): boolean {
  if (!user) return false;
  
  // Check primary role
  if (user.role === role) return true;
  
  // Check additional roles
  if (user.roles && user.roles.includes(role)) return true;
  
  return false;
}

export function hasAnyRole(user: User | null, roles: UserRole[]): boolean {
  if (!user) return false;
  
  // Check primary role
  if (roles.includes(user.role)) return true;
  
  // Check additional roles
  if (user.roles) {
    return user.roles.some(role => roles.includes(role));
  }
  
  return false;
}

export function getAllUserRoles(): UserRole[] {
  return [UserRole.ADMIN, UserRole.BUYER, UserRole.BIDDER, UserRole.MODERATOR];
}
