import React from 'react';
import { User, UserRole } from '../types';
import { getRoleDisplayName, getRoleColor } from '../utils/roleUtils';

interface UserRoleBadgeProps {
  user: User;
  showAll?: boolean;
  maxDisplay?: number;
  className?: string;
}

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ 
  user, 
  showAll = false, 
  maxDisplay = 3,
  className = '' 
}) => {
  const assignedRoles: UserRole[] = Array.isArray(user.roles) && user.roles.length
    ? user.roles
    : [user.role];
  const displayRoles = showAll ? assignedRoles : assignedRoles.slice(0, maxDisplay);
  const hasMoreRoles = assignedRoles.length > maxDisplay;

  if (assignedRoles.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {displayRoles.map((role) => (
        <span
          key={role}
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(role)}`}
        >
          {getRoleDisplayName(role)}
        </span>
      ))}
      {!showAll && hasMoreRoles && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
          +{assignedRoles.length - maxDisplay} more
        </span>
      )}
    </div>
  );
};

export default UserRoleBadge;
