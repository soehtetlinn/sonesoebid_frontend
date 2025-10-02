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
    contentApi.getNews().then((list) => { setNews(list as any); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(news.length / pageSize));
  const pageItems = news.slice((page - 1) * pageSize, page * pageSize);
  const featured = pageItems[0];
  const trending = pageItems.slice(1, 4);
  const others = pageItems.slice(4);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">News</h1>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      ) : news.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No news yet.</p>
      ) : (
        <>
          {/* Hero + Trending layout */}
          {featured && (
            <div className="grid md:grid-cols-3 gap-6 items-start">
              <Link to={`/news/${featured.slug}`} className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700 overflow-hidden block">
                <div className="w-full">
                  <img
                    src={(Array.isArray(featured.imageIds) && featured.imageIds.length > 0) ? contentApi.getNewsImageUrl(featured.imageIds[0]) : (featured.imageUrl || PLACEHOLDER_IMG)}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                    alt={featured.title}
                    className="w-full h-64 md:h-[420px] object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-snug">{featured.title}</h2>
                  {featured.excerpt && <p className="text-gray-600 dark:text-gray-300 mt-3">{featured.excerpt}</p>}
                  <div className="flex items-center justify-between mt-4">
                    {featured.author && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {featured.author.firstName?.[0] || featured.author.username[0].toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {featured.author.firstName && featured.author.lastName 
                            ? `${featured.author.firstName} ${featured.author.lastName}`
                            : featured.author.username}
                        </span>
                      </div>
                    )}
                    {featured.publishedAt && <p className="text-xs text-gray-500">{new Date(featured.publishedAt).toLocaleString()}</p>}
                  </div>
                </div>
              </Link>

              <aside className="bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700 overflow-hidden">
                <div className="p-5 border-b dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Trending</h3>
                </div>
                <div className="divide-y dark:divide-gray-700">
                  {trending.map(t => (
                    <Link key={t.id} to={`/news/${t.slug}`} className="flex gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <img
                        src={(Array.isArray(t.imageIds) && t.imageIds.length > 0) ? contentApi.getNewsImageUrl(t.imageIds[0]) : (t.imageUrl || PLACEHOLDER_IMG)}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                        className="w-28 h-16 object-cover rounded border dark:border-gray-700"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2">{t.title}</p>
                        <div className="flex items-center justify-between mt-1">
                          {t.author && (
                            <span className="text-xs text-gray-500">
                              {t.author.firstName && t.author.lastName 
                                ? `${t.author.firstName} ${t.author.lastName}`
                                : t.author.username}
                            </span>
                          )}
                          {t.publishedAt && <p className="text-xs text-gray-500">{new Date(t.publishedAt).toLocaleDateString()}</p>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          )}

          {/* More stories */}
          {others.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">More stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {others.map(n => (
                  <Link key={n.id} to={`/news/${n.slug}`} className="bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700 hover:shadow-md block overflow-hidden">
                    <div className="w-full">
                <img
                        src={(Array.isArray(n.imageIds) && n.imageIds.length > 0) ? contentApi.getNewsImageUrl(n.imageIds[0]) : (n.imageUrl || PLACEHOLDER_IMG)}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                  alt={n.title}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">{n.title}</h4>
                      {n.excerpt && <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">{n.excerpt}</p>}
                      <div className="flex items-center justify-between mt-3">
                        {n.author && (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                {n.author.firstName?.[0] || n.author.username[0].toUpperCase()}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {n.author.firstName && n.author.lastName 
                                ? `${n.author.firstName} ${n.author.lastName}`
                                : n.author.username}
                            </span>
                          </div>
                        )}
                        {n.publishedAt && <p className="text-xs text-gray-500">{new Date(n.publishedAt).toLocaleDateString()}</p>}
                      </div>
                    </div>
              </Link>
            ))}
          </div>
            </div>
          )}

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

