import React, { useState, useEffect } from 'react';
import { User, UserRole, UserRoleAssignment } from '../types';
import { api } from '../services/api';
import { getRoleDisplayName, getRoleColor, getAllUserRoles } from '../utils/roleUtils';
import Spinner from './Spinner';

interface UserRoleManagementProps {
  user: User;
  onRoleUpdate?: () => void;
}

const UserRoleManagement: React.FC<UserRoleManagementProps> = ({ user, onRoleUpdate }) => {
  const [userRoles, setUserRoles] = useState<UserRoleAssignment[]>([]);
  const [availableRoles, setAvailableRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.BUYER);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserRoles();
    // Use static roles from enum/util since backend role listing endpoint is not implemented
    setAvailableRoles(getAllUserRoles());
  }, [user.id]);

  const fetchUserRoles = async () => {
    try {
      setLoading(true);
      // Backend does not have role history; derive current role from user profile
      const profile = await api.getUserProfile(user.id);
      const currentRole: UserRole = profile?.role ?? user.role;
      const assignment: UserRoleAssignment = {
        id: Number(`${user.id}000`),
        userId: user.id,
        role: currentRole,
        assignedBy: undefined,
        assignedAt: new Date().toISOString(),
        isActive: true,
      };
      setUserRoles([assignment]);
    } catch (err) {
      setError('Failed to fetch user roles');
    } finally {
      setLoading(false);
    }
  };

  // Removed backend call for available roles; using getAllUserRoles()

  const handleAssignRole = async () => {
    if (userRoles.some(ur => ur.role === selectedRole && ur.isActive)) {
      setError('User already has this role');
      return;
    }

    try {
      setAssigning(true);
      setError(null);
      
      const updated = await api.updateUserProfile(user.id, { role: selectedRole });
      if (updated) {
        await fetchUserRoles();
        onRoleUpdate?.();
      } else {
        setError('Failed to assign role');
      }
    } catch (err) {
      setError('Failed to assign role');
    } finally {
      setAssigning(false);
    }
  };

  const handleRemoveRole = async (role: UserRole) => {
    if (window.confirm(`Are you sure you want to remove the ${getRoleDisplayName(role)} role from this user?`)) {
      try {
        setError(null);
        // With single primary role model, remove by resetting to BUYER
        const fallbackRole = UserRole.BUYER;
        const updated = await api.updateUserProfile(user.id, { role: fallbackRole });
        if (updated) {
          await fetchUserRoles();
          onRoleUpdate?.();
        } else {
          setError('Failed to remove role');
        }
      } catch (err) {
        setError('Failed to remove role');
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  const activeRoles = userRoles.filter(ur => ur.isActive);
  const unassignedRoles = availableRoles.filter(role => 
    !activeRoles.some(ur => ur.role === role)
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Role Management for {user.username}
      </h3>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Current Roles */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
          Current Roles
        </h4>
        {activeRoles.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {activeRoles.map((userRole) => (
              <div
                key={userRole.role}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(userRole.role)}`}
              >
                {getRoleDisplayName(userRole.role)}
                <button
                  onClick={() => handleRemoveRole(userRole.role)}
                  className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                  title="Remove role"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No roles assigned</p>
        )}
      </div>

      {/* Assign New Role */}
      {unassignedRoles.length > 0 && (
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
            Assign New Role
          </h4>
          <div className="flex gap-3 items-center">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
            >
              {unassignedRoles.map((role) => (
                <option key={role} value={role}>
                  {getRoleDisplayName(role)}
                </option>
              ))}
            </select>
            <button
              onClick={handleAssignRole}
              disabled={assigning}
              className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
            >
              {assigning ? 'Assigning...' : 'Assign Role'}
            </button>
          </div>
        </div>
      )}

      {/* Role History */}
      {userRoles.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
            Role History
          </h4>
          <div className="space-y-2">
            {userRoles.map((userRole) => (
              <div
                key={`${userRole.role}-${userRole.assignedAt}`}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
              >
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(userRole.role)}`}>
                    {getRoleDisplayName(userRole.role)}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Assigned: {new Date(userRole.assignedAt).toLocaleDateString()}
                  </span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  userRole.isActive 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                }`}>
                  {userRole.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRoleManagement;
