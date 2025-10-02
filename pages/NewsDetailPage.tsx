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
      <div className="flex items-center justify-between mt-4 mb-4">
        {item.author && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.author.firstName?.[0] || item.author.username[0].toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {item.author.firstName && item.author.lastName 
                  ? `${item.author.firstName} ${item.author.lastName}`
                  : item.author.username}
              </p>
              <p className="text-xs text-gray-500">Author</p>
            </div>
          </div>
        )}
        {item.publishedAt && <p className="text-sm text-gray-500">{new Date(item.publishedAt).toLocaleString()}</p>}
      </div>
      {Array.isArray(item.imageIds) && item.imageIds.length > 0 ? (
        <div className="mt-4">
          <div className="w-full">
            <img src={contentApi.getNewsImageUrl(item.imageIds[0])} alt={item.title} className="w-full max-h-[420px] object-cover rounded" />
          </div>
          {item.imageIds.length > 1 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
              {item.imageIds.slice(1, 5).map((imgId) => (
                <img key={imgId} src={contentApi.getNewsImageUrl(imgId)} className="w-full h-32 md:h-36 object-cover rounded" />
              ))}
            </div>
          )}
        </div>
      ) : (
        item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="w-full max-h-[420px] object-cover rounded mt-4" /> : null
      )}

      {Array.isArray(item.videos) && item.videos.length > 0 && (
        <div className="mt-6 space-y-4">
          {item.videos.map(v => (
            <div key={v.id} className="w-full">
              <iframe
                className="w-full h-64 md:h-96 rounded"
                src={contentApi.getYouTubeEmbedUrl(v.youtubeId)}
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      )}
      {item.excerpt && <p className="mt-4 text-gray-700 dark:text-gray-300">{item.excerpt}</p>}
      <div className="prose dark:prose-invert max-w-none mt-6 whitespace-pre-wrap text-gray-800 dark:text-gray-100">
        {item.content}
      </div>
    </article>
  );
};

export default NewsDetailPage;

