import React, { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { UserRole } from '../types';
import Spinner from '../components/Spinner';

interface Category {
  id: string;
  name: string;
  description?: string;
}

const AdminCategoryManagementPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editCategory, setEditCategory] = useState({ name: '', description: '' });

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const fetchedCategories = await api.getCategories();
    setCategories(fetchedCategories);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated && user?.role === UserRole.ADMIN) {
      fetchCategories();
    }
  }, [isAuthenticated, user, fetchCategories]);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;

    const created = await api.createCategory(newCategory.name.trim(), newCategory.description.trim() || undefined);
    if (created) {
      setCategories(prev => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
      setNewCategory({ name: '', description: '' });
      setCreating(false);
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editCategory.name.trim()) return;

    const updated = await api.updateCategory(editing, editCategory.name.trim(), editCategory.description.trim() || undefined);
    if (updated) {
      setCategories(prev => prev.map(cat => cat.id === editing ? updated : cat).sort((a, b) => a.name.localeCompare(b.name)));
      setEditing(null);
      setEditCategory({ name: '', description: '' });
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      const success = await api.deleteCategory(categoryId);
      if (success) {
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      }
    }
  };

  const startEdit = (category: Category) => {
    setEditing(category.id);
    setEditCategory({ name: category.name, description: category.description || '' });
  };

  if (!isAuthenticated || user?.role !== UserRole.ADMIN) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border dark:border-gray-700">
      <div className="flex justify-between items-center mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Category Management</h1>
        <button 
          onClick={() => setCreating(true)} 
          className="bg-brand-green text-white font-bold py-2 px-4 rounded-md hover:bg-green-700"
        >
          Add New Category
        </button>
      </div>

      {/* Create Category Modal */}
      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md border dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Create New Category</h2>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue dark:bg-gray-700 dark:text-white"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="categoryDescription"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue dark:bg-gray-700 dark:text-white"
                  placeholder="Enter category description (optional)"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setCreating(false);
                    setNewCategory({ name: '', description: '' });
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-green-700"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md border dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Edit Category</h2>
            <form onSubmit={handleUpdateCategory} className="space-y-4">
              <div>
                <label htmlFor="editCategoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  id="editCategoryName"
                  value={editCategory.name}
                  onChange={(e) => setEditCategory(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue dark:bg-gray-700 dark:text-white"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label htmlFor="editCategoryDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="editCategoryDescription"
                  value={editCategory.description}
                  onChange={(e) => setEditCategory(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue dark:bg-gray-700 dark:text-white"
                  placeholder="Enter category description (optional)"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setEditCategory({ name: '', description: '' });
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-blue-700"
                >
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Description</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? categories.map(category => (
                <tr key={category.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-4 font-medium text-gray-800 dark:text-gray-100">{category.name}</td>
                  <td className="py-2 px-4 text-gray-600 dark:text-gray-400">
                    {category.description || 'No description'}
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button 
                      onClick={() => startEdit(category)} 
                      className="text-brand-blue hover:underline"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteCategory(category.id)} 
                      className="text-brand-red hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No categories found. Create your first category to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCategoryManagementPage;
