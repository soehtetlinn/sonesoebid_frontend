import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { fxApi } from '../services/api';

const AdminFxPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [text, setText] = useState('');
  const [base, setBase] = useState('THB');
  const [quote, setQuote] = useState('MMK');
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fxApi.listAdmin().then(setList).catch(()=>setList([])); }, []);

  if (!isAuthenticated || user?.role !== UserRole.ADMIN) {
    return <div className="p-6 bg-white dark:bg-gray-900 rounded">Access denied</div>;
  }

  const parseAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const created = await fxApi.parse(text, base, quote);
      setList([created, ...list]);
      setText('');
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Currency Exchange Management</h1>

      <form onSubmit={parseAndSave} className="bg-white dark:bg-gray-900 p-6 rounded border dark:border-gray-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm mb-1">Base</label>
            <input value={base} readOnly className="w-full px-3 py-2 border rounded dark:bg-gray-800 bg-gray-100 dark:bg-gray-600 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm mb-1">Quote</label>
            <input value={quote} readOnly className="w-full px-3 py-2 border rounded dark:bg-gray-800 bg-gray-100 dark:bg-gray-600 cursor-not-allowed" />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Paste Text Message</label>
          <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={6} className="w-full px-3 py-2 border rounded dark:bg-gray-800" placeholder="Paste Myanmar text here..." />
        </div>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50">{loading? 'Parsing...' : 'Parse & Save'}</button>
      </form>

      <div className="bg-white dark:bg-gray-900 p-6 rounded border dark:border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Recent Rates</h2>
        <div className="divide-y dark:divide-gray-700">
          {list.map((it)=> (
            <div key={it.id || it.parsedAt} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-semibold">{(it.base||'THB')}/{(it.quote||'MMK')}</p>
                <p className="text-sm text-gray-500">Buy ≤1M/100k: {it.buyBelow1mPer100k ?? '-'} • Buy &gt;1M/100k: {it.buyAbove1mPer100k ?? '-'} • Sell ≤1M/100k: {it.sellBelow1mPer100k ?? '-'} • Sell &gt;1M/100k: {it.sellAbove1mPer100k ?? '-'} • {new Date(it.parsedAt || it.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
          {list.length === 0 && <p className="text-sm text-gray-500">No entries yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminFxPage;


