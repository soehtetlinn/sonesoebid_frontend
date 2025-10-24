import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NewsItem } from '../types';
import { contentApi } from '../services/api';

const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState<NewsItem[]>([] as any);
  const PLACEHOLDER_IMG = 'https://via.placeholder.com/800x400?text=News';

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    contentApi.getNewsBySlug(slug)
      .then((n) => { setItem(n as any); setLoading(false); })
      .catch(() => setLoading(false));
    // Load trending (latest published), excluding the current slug if available
    contentApi.getNews()
      .then((list) => {
        const arr = (list || []) as any[];
        const filtered = arr.filter((x) => x.slug !== slug).slice(0, 8);
        setTrending(filtered as any);
      })
      .catch(() => setTrending([] as any));
  }, [slug]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
    </div>
  );
  
  if (!item) return (
    <div className="text-center py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Story Not Found</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">The news story you're looking for doesn't exist or has been removed.</p>
      <Link to="/news" className="bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-secondary transition-colors">
        Back to News
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Fox News Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">BREAKING</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">LATEST NEWS</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">LIVE</span>
            <span>{new Date().toLocaleString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Article Content */}
        <article className="lg:col-span-3">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-bold">EXCLUSIVE</span>
              <span className="bg-brand-accent text-white px-3 py-1 rounded-full text-sm font-bold">DEVELOPING</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-6">
              {item.title}
            </h1>

            {/* Author and Meta Info */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                {item.author && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {item.author.firstName?.[0] || item.author.username[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {item.author.firstName && item.author.lastName 
                          ? `${item.author.firstName} ${item.author.lastName}`
                          : item.author.username}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Senior Reporter</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {item.publishedAt && formatTimeAgo(item.publishedAt)}
                </p>
                <p className="text-xs text-gray-500">
                  {item.publishedAt && new Date(item.publishedAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </header>

          {/* Main Image */}
          {Array.isArray(item.imageIds) && item.imageIds.length > 0 ? (
            <div className="mb-8">
              <div className="relative">
                <img 
                  src={contentApi.getNewsImageUrl(item.imageIds[0])} 
                  alt={item.title} 
                  className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
                />
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                  FOX NEWS PHOTO
                </div>
              </div>
              {item.imageIds.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {item.imageIds.slice(1, 5).map((imgId) => (
                    <img 
                      key={imgId} 
                      src={contentApi.getNewsImageUrl(imgId)} 
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                      alt="Additional image"
                    />
                  ))}
                </div>
              )}
            </div>
          ) : item.imageUrl ? (
            <div className="mb-8">
              <div className="relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
                />
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                  FOX NEWS PHOTO
                </div>
              </div>
            </div>
          ) : null}

          {/* Videos */}
          {Array.isArray(item.videos) && item.videos.length > 0 && (
            <div className="mb-8 space-y-6">
              {item.videos.map(v => (
                <div key={v.id} className="relative">
                  <iframe
                    className="w-full h-64 md:h-96 lg:h-[500px] rounded-lg shadow-lg"
                    src={contentApi.getYouTubeEmbedUrl(v.youtubeId)}
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
                    FOX NEWS VIDEO
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Excerpt/Lead */}
            {item.excerpt && (
              <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-6 rounded-lg border-l-4 border-brand-primary mb-8">
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
            )}

            {/* Main Content */}
            <div className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {item.content}
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tags:</span>
                <div className="flex gap-2">
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                    Breaking News
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                    Latest Updates
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated: {formatTimeAgo(item.publishedAt || '')}</p>
              </div>
            </div>
          </footer>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Trending Stories */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="bg-red-600 px-2 py-1 rounded text-sm">LIVE</span>
                TRENDING NOW
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {trending.map((t, index) => (
                <Link key={t.id} to={`/news/${t.slug}`} className="group block">
                  <div className="flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors">
                    <div className="relative flex-shrink-0">
                      <img
                        src={(Array.isArray(t.imageIds) && t.imageIds.length > 0) ? contentApi.getNewsImageUrl(t.imageIds[0]) : (t.imageUrl || PLACEHOLDER_IMG)}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                        className="w-16 h-12 object-cover rounded border dark:border-gray-700"
                      />
                      <div className="absolute -top-1 -left-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-brand-primary transition-colors">
                        {t.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(t.publishedAt || '')}</p>
                    </div>
                  </div>
                </Link>
              ))}
              {trending.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No trending stories available.</p>
              )}
            </div>
          </div>

          {/* Related Stories */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-secondary to-brand-accent p-4">
              <h3 className="text-lg font-bold text-white">RELATED STORIES</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <Link to="/news" className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2">
                    More breaking news updates
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">Latest developments</p>
                </Link>
                <Link to="/news" className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2">
                    Expert analysis and commentary
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">In-depth coverage</p>
                </Link>
                <Link to="/news" className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2">
                    Live updates and reactions
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">Holy moment coverage</p>
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NewsDetailPage;