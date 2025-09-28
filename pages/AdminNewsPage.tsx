import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole, NewsItem } from '../types';
import { contentApi } from '../services/api';

const AdminNewsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState<NewsItem[]>([] as any);
  const [form, setForm] = useState<any>({ title: '', slug: '', excerpt: '', content: '', imageUrl: '', published: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== UserRole.ADMIN) return;
    contentApi.admin.listNews().then(setItems).catch(() => setItems([] as any));
  }, [isAuthenticated, user]);

  if (!isAuthenticated || user?.role !== UserRole.ADMIN) {
    return <div className="p-6 bg-white dark:bg-gray-800 rounded">Access denied</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as any;
    setForm((f: any) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const created = await contentApi.admin.createNews(form);
      setItems([created, ...items]);
      setForm({ title: '', slug: '', excerpt: '', content: '', imageUrl: '', published: false });
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    await contentApi.admin.deleteNews(id);
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage News</h1>

      <form onSubmit={create} className="bg-white dark:bg-gray-800 p-6 rounded border dark:border-gray-700 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="px-3 py-2 border rounded dark:bg-gray-700" />
          <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug (unique)" required className="px-3 py-2 border rounded dark:bg-gray-700" />
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="px-3 py-2 border rounded dark:bg-gray-700" />
          <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"><input type="checkbox" name="published" checked={!!form.published} onChange={handleChange} /> Published</label>
        </div>
        <textarea name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Excerpt" className="w-full px-3 py-2 border rounded dark:bg-gray-700" />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content (markdown/plain)" required rows={6} className="w-full px-3 py-2 border rounded dark:bg-gray-700" />
        <button type="submit" disabled={loading} className="px-4 py-2 bg-brand-blue text-white rounded disabled:opacity-50">{loading ? 'Publishing...' : 'Create News'}</button>
      </form>

      <div className="bg-white dark:bg-gray-800 p-6 rounded border dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">All News</h2>
        <div className="divide-y dark:divide-gray-700">
          {items.map((n) => (
            <div key={n.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm text-gray-500">/{n.slug} {n.published ? '• Published' : '• Draft'}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => remove(n.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-sm text-gray-500">No news yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminNewsPage;

