import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole, AdItem } from '../types';
import { contentApi } from '../services/api';

const AdminAdsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState<AdItem[]>([] as any);
  const [form, setForm] = useState<any>({ title: '', advertiser: '', imageUrl: '', targetUrl: '', placement: 'homepage-hero', isActive: true });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== UserRole.ADMIN) return;
    contentApi.admin.listAds().then(setItems).catch(() => setItems([] as any));
  }, [isAuthenticated, user]);

  if (!isAuthenticated || user?.role !== UserRole.ADMIN) {
    return <div className="p-6 bg-white dark:bg-gray-800 rounded">Access denied</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as any;
    setForm((f: any) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const created = await contentApi.admin.createAd(form);
      setItems([created, ...items]);
      setForm({ title: '', advertiser: '', imageUrl: '', targetUrl: '', placement: 'homepage-hero', isActive: true });
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    await contentApi.admin.deleteAd(id);
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Advertising</h1>

      <form onSubmit={create} className="bg-white dark:bg-gray-800 p-6 rounded border dark:border-gray-700 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="px-3 py-2 border rounded dark:bg-gray-700" />
          <input name="advertiser" value={form.advertiser} onChange={handleChange} placeholder="Advertiser" className="px-3 py-2 border rounded dark:bg-gray-700" />
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="px-3 py-2 border rounded dark:bg-gray-700" />
          <input name="targetUrl" value={form.targetUrl} onChange={handleChange} placeholder="Target URL" required className="px-3 py-2 border rounded dark:bg-gray-700" />
          <select name="placement" value={form.placement} onChange={handleChange} className="px-3 py-2 border rounded dark:bg-gray-700">
            <option value="homepage-hero">Homepage Hero</option>
            <option value="homepage-sidebar">Homepage Sidebar</option>
            <option value="product-list-top">Product List Top</option>
            <option value="product-list-side">Product List Side</option>
          </select>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"><input type="checkbox" name="isActive" checked={!!form.isActive} onChange={handleChange} /> Active</label>
        </div>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-amber-600 text-white rounded disabled:opacity-50">{loading ? 'Saving...' : 'Create Ad'}</button>
      </form>

      <div className="bg-white dark:bg-gray-800 p-6 rounded border dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">All Ads</h2>
        <div className="divide-y dark:divide-gray-700">
          {items.map((ad) => (
            <div key={ad.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-semibold">{ad.title}</p>
                <p className="text-sm text-gray-500">{ad.placement} {ad.isActive ? '• Active' : '• Inactive'}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => remove(ad.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-sm text-gray-500">No ads yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminAdsPage;

