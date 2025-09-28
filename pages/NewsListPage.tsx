import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../types';
import { contentApi } from '../services/api';

const PLACEHOLDER_IMG = 'https://via.placeholder.com/800x400?text=News';

const NewsListPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([] as any);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    setLoading(true);
    contentApi.getNews().then(list => { setNews(list as any); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(news.length / pageSize));
  const pageItems = news.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">News</h1>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      ) : news.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No news yet.</p>
      ) : (
        <>
          {/* Kanban-like masonry grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {pageItems.map((n) => (
              <Link key={n.id} to={`/news/${n.slug}`} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700 hover:shadow-md block">
                <img
                  src={n.imageUrl || PLACEHOLDER_IMG}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                  alt={n.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{n.title}</h2>
                {n.excerpt && <p className="text-gray-600 dark:text-gray-300 mt-2">{n.excerpt}</p>}
                {n.publishedAt && <p className="text-xs text-gray-500 mt-3">{new Date(n.publishedAt).toLocaleString()}</p>}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-8">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
            <span className="text-sm text-gray-600 dark:text-gray-300">Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsListPage;

