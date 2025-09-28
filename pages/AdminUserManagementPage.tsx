import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { User, UserRole } from '../types';
import { isAdmin } from '../utils/roleUtils';
import Spinner from '../components/Spinner';
import UserRoleBadge from '../components/UserRoleBadge';
import UserRoleManagement from '../components/UserRoleManagement';

const AdminUserManagementPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<{username: string; email: string; role: UserRole}>({username: '', email: '', role: UserRole.BUYER});
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [errors, setErrors] = useState<{username?: string; email?: string}>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRoleManagement, setShowRoleManagement] = useState(false);

  useEffect(() => {
    if (isAuthenticated && isAdmin(user)) {
      api.getUsers().then(fetchedUsers => {
        setUsers(fetchedUsers);
        setLoading(false);
      });
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || !isAdmin(user)) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border dark:border-gray-700">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">User Management</h1>
      <div className="mb-6">
        <button onClick={()=>setIsCreateOpen(true)} className="px-4 py-2 bg-brand-blue text-white rounded-md">Add User</button>
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg border dark:border-gray-700 relative">
            <button onClick={()=>setIsCreateOpen(false)} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">✕</button>
            <h2 className="text-xl font-semibold mb-4">Create User</h2>
            <div className="space-y-3">
              <input value={form.username} onChange={(e)=>{ const v = e.target.value; setForm({...form, username: v}); setErrors(prev=>({...prev, username: v.trim().length>=2 ? '' : 'Username min 2 chars'})); }} placeholder="Username" className={`w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.username ? 'border-brand-red' : ''}`}/>
              {errors.username && <p className="text-sm text-brand-red">{errors.username}</p>}
              <input value={form.email} onChange={(e)=>{ const v = e.target.value; setForm({...form, email: v}); const ok=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); setErrors(prev=>({...prev, email: ok ? '' : 'Invalid email'})); }} placeholder="Email" type="email" className={`w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.email ? 'border-brand-red' : ''}`}/>
              {errors.email && <p className="text-sm text-brand-red">{errors.email}</p>}
              <select value={form.role} onChange={(e)=>setForm({...form, role: e.target.value as UserRole})} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                <option value={UserRole.BUYER}>BUYER</option>
                <option value={UserRole.BIDDER}>BIDDER</option>
                <option value={UserRole.ADMIN}>ADMIN</option>
              </select>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={()=>setIsCreateOpen(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Cancel</button>
                <button onClick={async ()=>{ const hasErr = (form.username.trim().length<2) || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)); if(hasErr){ setErrors({ username: form.username.trim().length<2 ? 'Username min 2 chars' : '', email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Invalid email' }); return; } const created = await api.createUser(form); if(created){ setUsers([...users, created]); setForm({username:'',email:'',role:UserRole.BUYER}); setIsCreateOpen(false); } else { alert('Failed to create'); } }} className="px-4 py-2 bg-brand-blue text-white rounded-md">Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {loading ? <Spinner /> : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="text-left py-2 px-4">ID</th>
                <th className="text-left py-2 px-4">Username</th>
                <th className="text-left py-2 px-4">Email</th>
                <th className="text-left py-2 px-4">Role</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-4">{u.id}</td>
                  <td className="py-2 px-4 font-medium">{u.username}</td>
                  <td className="py-2 px-4">{u.email}</td>
                  <td className="py-2 px-4">
                    <UserRoleBadge user={u} showAll={true} />
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedUser(u);
                        setShowRoleManagement(true);
                      }}
                      className="text-brand-blue hover:underline"
                    >
                      Manage Roles
                    </button>
                    <button onClick={async ()=>{ const ok = confirm('Delete this user?'); if(!ok) return; const success = await api.deleteUser(u.id); if(success){ setUsers(users.filter(x=>x.id!==u.id)); } else { alert('Failed to delete user'); } }} className="text-brand-red hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Role Management Modal */}
      {showRoleManagement && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto border dark:border-gray-700 relative">
            <button
              onClick={() => {
                setShowRoleManagement(false);
                setSelectedUser(null);
              }}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <UserRoleManagement 
              user={selectedUser} 
              onRoleUpdate={() => {
                // Refresh users list
                api.getUsers().then(fetchedUsers => {
                  setUsers(fetchedUsers);
                });
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagementPage;