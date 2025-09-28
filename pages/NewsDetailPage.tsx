import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NewsItem } from '../types';
import { contentApi } from '../services/api';

const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    contentApi.getNewsBySlug(slug).then((n) => { setItem(n as any); setLoading(false); }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-gray-600 dark:text-gray-300">Loading...</p>;
  if (!item) return <p className="text-gray-600 dark:text-gray-300">Not found.</p>;

  return (
    <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{item.title}</h1>
      {item.publishedAt && <p className="text-xs text-gray-500 mt-2">{new Date(item.publishedAt).toLocaleString()}</p>}
      {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full max-h-[420px] object-cover rounded mt-4" />}
      {item.excerpt && <p className="mt-4 text-gray-700 dark:text-gray-300">{item.excerpt}</p>}
      <div className="prose dark:prose-invert max-w-none mt-6 whitespace-pre-wrap text-gray-800 dark:text-gray-100">
        {item.content}
      </div>
    </article>
  );
};

export default NewsDetailPage;

