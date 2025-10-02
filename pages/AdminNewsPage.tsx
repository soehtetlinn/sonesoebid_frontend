import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole, NewsItem } from '../types';
import { contentApi } from '../services/api';

// Extract YouTube video id from a URL or return the provided id if already an id
function extractYouTubeId(input: string): string | null {
  try {
    const s = input.trim();
    if (!s) return null;
    // If it looks like a bare ID
    if (/^[A-Za-z0-9_-]{6,}$/.test(s)) return s;
    const url = new URL(s);
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return id || null;
    }
    if (url.hostname.includes('youtube.com')) {
      const id = url.searchParams.get('v');
      return id || null;
    }
    return null;
  } catch {
    // Not a URL; maybe an ID
    return /^[A-Za-z0-9_-]{6,}$/.test(input) ? input : null;
  }
}

const AdminNewsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState<NewsItem[]>([] as any);
  const [form, setForm] = useState<any>({ title: '', slug: '', excerpt: '', content: '', imageUrl: '', published: false });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [editForm, setEditForm] = useState<any>({ title: '', slug: '', excerpt: '', content: '', imageUrl: '', published: false });
  const [editSelectedFiles, setEditSelectedFiles] = useState<File[]>([]);
  const [videoInput, setVideoInput] = useState('');
  const [editVideoInput, setEditVideoInput] = useState('');
  const [newsCategories, setNewsCategories] = useState<{ id: string; name: string; description?: string }[]>([]);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== UserRole.ADMIN) return;
    // Load news first; categories are optional for list rendering.
    contentApi.admin.listNews()
      .then(list => setItems(list as any))
      .catch(() => setItems([] as any));
    contentApi.admin.listNewsCategories()
      .then(cats => setNewsCategories(cats))
      .catch(() => setNewsCategories([]));
  }, [isAuthenticated, user]);

  if (!isAuthenticated || user?.role !== UserRole.ADMIN) {
    return <div className="p-6 bg-white dark:bg-gray-800 rounded">Access denied</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as any;
    setForm((f: any) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as any;
    setEditForm((f: any) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const created = await contentApi.admin.createNews(form);
      let latest = created;
      if (selectedFiles.length > 0) {
        const filesToUpload = selectedFiles.slice(0, Math.max(0, 5 - (created.imageIds?.length || 0)));
        if (filesToUpload.length > 0) {
          latest = await contentApi.admin.uploadNewsImages(created.id, filesToUpload);
        }
      }
      const ids = (videoInput || '')
        .split(/[\,\s]+/)
        .map(s => s.trim())
        .filter(Boolean)
        .map(extractYouTubeId)
        .filter(Boolean) as string[];
      if (ids.length > 0) {
        latest = await contentApi.admin.addNewsVideos(created.id, ids);
      }
      setItems([latest, ...items]);
      setForm({ title: '', slug: '', excerpt: '', content: '', imageUrl: '', published: false, categoryId: '' });
      setSelectedFiles([]);
      setVideoInput('');
    } finally {
      setLoading(false);
    }
  };
  const onFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(files);
  };

  const removeImage = async (newsId: string, imageId: string) => {
    await contentApi.admin.deleteNewsImage(newsId, imageId);
    // refresh list
    const list = await contentApi.admin.listNews();
    setItems(list as any);
    // keep editing form in sync
    if (editing && editing.id === newsId) {
      const updated = (list as any[]).find(n => n.id === newsId) || null;
      setEditing(updated || null);
      if (updated) {
        setEditForm({
          title: updated.title || '',
          slug: updated.slug || '',
          excerpt: updated.excerpt || '',
          content: updated.content || '',
          imageUrl: updated.imageUrl || '',
          published: !!updated.published,
        });
      }
    }
  };

  const beginEdit = (n: NewsItem) => {
    setEditing(n);
    setEditForm({
      title: n.title || '',
      slug: n.slug || '',
      excerpt: n.excerpt || '',
      content: n.content || '',
      imageUrl: n.imageUrl || '',
      published: !!n.published,
      categoryId: n.category?.id || ''
    });
    setEditSelectedFiles([]);
    setEditVideoInput('');
  };

  const onEditFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setEditSelectedFiles(files);
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);
    try {
      const updated = await contentApi.admin.updateNews(editing.id, editForm);
      let latest = updated;
      if (editSelectedFiles.length > 0) {
        const room = Math.max(0, 5 - (updated.imageIds?.length || 0));
        const filesToUpload = editSelectedFiles.slice(0, room);
        if (filesToUpload.length > 0) {
          latest = await contentApi.admin.uploadNewsImages(editing.id, filesToUpload);
        }
      }
      // Add videos if provided (comma/space/newline separated IDs or URLs)
      const ids = (editVideoInput || '')
        .split(/[,\s]+/)
        .map(s => s.trim())
        .filter(Boolean)
        .map(extractYouTubeId)
        .filter(Boolean) as string[];
      if (ids.length > 0) {
        latest = await contentApi.admin.addNewsVideos(editing.id, ids);
      }
      setItems(items.map(i => (i.id === latest.id ? latest : i)));
      setEditing(null);
      setEditSelectedFiles([]);
      setEditVideoInput('');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditSelectedFiles([]);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select name="categoryId" value={form.categoryId || ''} onChange={handleChange} className="px-3 py-2 border rounded dark:bg-gray-700">
            <option value="">No category</option>
            {newsCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div className="flex gap-2">
            <input value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="New category name" className="flex-1 px-3 py-2 border rounded dark:bg-gray-700" />
            <button type="button" className="px-3 py-2 border rounded" onClick={async () => { if (!newCatName.trim()) return; await contentApi.admin.createNewsCategory(newCatName, newCatDesc || undefined); const cats = await contentApi.admin.listNewsCategories(); setNewsCategories(cats); setNewCatName(''); setNewCatDesc(''); }}>Add</button>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Attach images (max 5)</label>
          <input type="file" accept="image/*" multiple onChange={onFilesChange} className="block" />
          {selectedFiles.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">{selectedFiles.length} file(s) selected</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">YouTube URLs or IDs (comma/space/newline separated)</label>
          <textarea value={videoInput} onChange={(e) => setVideoInput(e.target.value)} rows={2} className="w-full px-3 py-2 border rounded dark:bg-gray-700" />
        </div>
        <textarea name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Excerpt" className="w-full px-3 py-2 border rounded dark:bg-gray-700" />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content (markdown/plain)" required rows={6} className="w-full px-3 py-2 border rounded dark:bg-gray-700" />
        <button type="submit" disabled={loading} className="px-4 py-2 bg-brand-blue text-white rounded disabled:opacity-50">{loading ? 'Publishing...' : 'Create News'}</button>
      </form>

      {editing && (
        <form onSubmit={saveEdit} className="bg-white dark:bg-gray-800 p-6 rounded border dark:border-gray-700 space-y-4">
          <h2 className="text-xl font-semibold">Edit News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" value={editForm.title} onChange={handleEditChange} placeholder="Title" required className="px-3 py-2 border rounded dark:bg-gray-700" />
            <input name="slug" value={editForm.slug} onChange={handleEditChange} placeholder="Slug (unique)" required className="px-3 py-2 border rounded dark:bg-gray-700" />
            <input name="imageUrl" value={editForm.imageUrl} onChange={handleEditChange} placeholder="Fallback Image URL" className="px-3 py-2 border rounded dark:bg-gray-700" />
            <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"><input type="checkbox" name="published" checked={!!editForm.published} onChange={handleEditChange} /> Published</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="categoryId" value={editForm.categoryId || ''} onChange={handleEditChange} className="px-3 py-2 border rounded dark:bg-gray-700">
              <option value="">No category</option>
              {newsCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <div className="flex gap-2">
              <input value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="New category name" className="flex-1 px-3 py-2 border rounded dark:bg-gray-700" />
              <button type="button" className="px-3 py-2 border rounded" onClick={async () => { if (!newCatName.trim()) return; await contentApi.admin.createNewsCategory(newCatName, newCatDesc || undefined); const cats = await contentApi.admin.listNewsCategories(); setNewsCategories(cats); setNewCatName(''); setNewCatDesc(''); }}>Add</button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Add images (max 5 total)</label>
            <input type="file" accept="image/*" multiple onChange={onEditFilesChange} className="block" />
            {editSelectedFiles.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">{editSelectedFiles.length} file(s) selected</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Add YouTube URLs or IDs</label>
            <textarea value={editVideoInput} onChange={(e) => setEditVideoInput(e.target.value)} rows={2} className="w-full px-3 py-2 border rounded dark:bg-gray-700" />
          </div>
          <textarea name="excerpt" value={editForm.excerpt} onChange={handleEditChange} placeholder="Excerpt" className="w-full px-3 py-2 border rounded dark:bg-gray-700" />
          <textarea name="content" value={editForm.content} onChange={handleEditChange} placeholder="Content (markdown/plain)" required rows={6} className="w-full px-3 py-2 border rounded dark:bg-gray-700" />

          {Array.isArray(editing.imageIds) && editing.imageIds.length > 0 && (
            <div className="">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Existing images (drag to reorder)</p>
              <div className="flex gap-2 flex-wrap" onDragOver={(e) => e.preventDefault()}>
                {editing.imageIds.slice(0,5).map((imgId: string, idx: number) => (
                  <div key={imgId} className="relative" draggable onDragStart={(e) => { e.dataTransfer.setData('text/plain', String(idx)); }} onDrop={async (e) => { e.preventDefault(); const fromIdx = Number(e.dataTransfer.getData('text/plain')); const ids = [...(editing.imageIds || [])]; const [moved] = ids.splice(fromIdx, 1); ids.splice(idx, 0, moved); await contentApi.admin.reorderNewsImages(editing.id, ids); const list = await contentApi.admin.listNews(); setItems(list as any); const up = (list as any[]).find(n => n.id === editing.id) || null; setEditing(up); }}>
                    <img src={contentApi.getNewsImageUrl(imgId)} className="w-20 h-20 object-cover rounded border" />
                    <button type="button" onClick={() => removeImage(editing.id, imgId)} className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5">×</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {Array.isArray(editing.videos) && editing.videos.length > 0 && (
            <div className="">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Existing videos (drag to reorder)</p>
              <div className="flex gap-3 flex-wrap" onDragOver={(e) => e.preventDefault()}>
                {editing.videos.map((v, idx) => (
                  <div key={v.id} className="relative" draggable onDragStart={(e) => { e.dataTransfer.setData('text/plain', String(idx)); }} onDrop={async (e) => { e.preventDefault(); const fromIdx = Number(e.dataTransfer.getData('text/plain')); const ids = (editing.videos || []).map(x => x.id); const [moved] = ids.splice(fromIdx, 1); ids.splice(idx, 0, moved); await contentApi.admin.reorderNewsVideos(editing.id, ids); const list = await contentApi.admin.listNews(); setItems(list as any); const up = (list as any[]).find(n => n.id === editing.id) || null; setEditing(up); }}>
                    <img src={contentApi.getYouTubeThumbUrl(v.youtubeId)} className="w-28 h-16 object-cover rounded border" />
                    <button type="button" onClick={async () => { await contentApi.admin.deleteNewsVideo(editing.id, v.id); const list = await contentApi.admin.listNews(); setItems(list as any); const up = (list as any[]).find(n => n.id === editing.id) || null; setEditing(up); }} className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5">×</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-brand-blue text-white rounded disabled:opacity-50">{loading ? 'Saving...' : 'Save Changes'}</button>
            <button type="button" onClick={cancelEdit} className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-gray-800 p-6 rounded border dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">All News</h2>
        <div className="divide-y dark:divide-gray-700">
          {items.map((n) => (
            <div key={n.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm text-gray-500">
                  /{n.slug} {n.published ? '• Published' : '• Draft'}
                  {n.author && ` • By ${n.author.firstName && n.author.lastName ? `${n.author.firstName} ${n.author.lastName}` : n.author.username}`}
                </p>
                {Array.isArray(n.imageIds) && n.imageIds.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {n.imageIds.slice(0,5).map((imgId: string) => (
                      <div key={imgId} className="relative">
                        <img src={contentApi.getNewsImageUrl(imgId)} className="w-16 h-16 object-cover rounded border" />
                        <button type="button" onClick={() => removeImage(n.id, imgId)} className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => beginEdit(n)} className="px-3 py-1 border rounded">Edit</button>
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

