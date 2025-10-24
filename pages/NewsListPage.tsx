import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../types';
import { contentApi } from '../services/api';

const PLACEHOLDER_IMG = 'https://via.placeholder.com/800x400?text=News';

const NewsListPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([] as any);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    setLoading(true);
    contentApi.getNews().then((list) => { setNews(list as any); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  // Fox News style layout organization
  const totalPages = Math.max(1, Math.ceil(news.length / pageSize));
  const pageItems = news.slice((page - 1) * pageSize, page * pageSize);
  const mainStory = pageItems[0];
  const topStories = pageItems.slice(1, 4); // 3 top stories
  const trendingNews = pageItems.slice(4, 14); // 10 trending news
  const moreStories = pageItems.slice(14, 15); // remaining stories

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Fox News Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-brand-primary">LATEST NEWS</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">LIVE</span>
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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
        </div>
      ) : news.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-center py-12">No news available at this time.</p>
      ) : (
        <div className="space-y-8">
          {/* Main Story Section - Fox News Hero Style */}
          {mainStory && (
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <Link to={`/news/${mainStory.slug}`} className="block group">
                <div className="relative">
                  <img
                    src={(Array.isArray(mainStory.imageIds) && mainStory.imageIds.length > 0) 
                      ? contentApi.getNewsImageUrl(mainStory.imageIds[0]) 
                      : (mainStory.imageUrl || PLACEHOLDER_IMG)}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                    alt={mainStory.title}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">BREAKING</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                      {mainStory.title}
                    </h2>
                    {mainStory.excerpt && (
                      <p className="text-lg text-gray-200 mb-4 line-clamp-2">{mainStory.excerpt}</p>
                    )}
                    <div className="flex items-center gap-4 text-white/80">
                      {mainStory.author && (
                        <span className="text-sm">
                          By {mainStory.author.firstName && mainStory.author.lastName 
                            ? `${mainStory.author.firstName} ${mainStory.author.lastName}`
                            : mainStory.author.username}
                        </span>
                      )}
                      {mainStory.publishedAt && (
                        <span className="text-sm">{formatTimeAgo(mainStory.publishedAt)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Top Stories Section - Fox News Style */}
          {topStories.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <h3 className="text-2xl font-bold text-brand-primary">TOP STORIES</h3>
                <div className="flex-1 h-px bg-gray-300 ml-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topStories.map((story, index) => (
                  <Link key={story.id} to={`/news/${story.slug}`} className="group">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={(Array.isArray(story.imageIds) && story.imageIds.length > 0) 
                            ? contentApi.getNewsImageUrl(story.imageIds[0]) 
                            : (story.imageUrl || PLACEHOLDER_IMG)}
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                          alt={story.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-brand-primary text-white px-2 py-1 rounded text-xs font-bold">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors">
                          {story.title}
                        </h4>
                        {story.excerpt && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                            {story.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          {story.author && (
                            <span>
                              {story.author.firstName && story.author.lastName 
                                ? `${story.author.firstName} ${story.author.lastName}`
                                : story.author.username}
                            </span>
                          )}
                          {story.publishedAt && <span>{formatTimeAgo(story.publishedAt)}</span>}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Trending News Section */}
          {trendingNews.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <h3 className="text-2xl font-bold text-brand-primary flex items-center gap-2">
                  <span className="bg-brand-accent text-white px-2 py-1 rounded text-sm font-bold">TRENDING</span>
                  TRENDING NEWS
                </h3>
                <div className="flex-1 h-px bg-gray-300 ml-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {trendingNews.map((story, index) => (
                  <Link key={story.id} to={`/news/${story.slug}`} className="group">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={(Array.isArray(story.imageIds) && story.imageIds.length > 0) 
                            ? contentApi.getNewsImageUrl(story.imageIds[0]) 
                            : (story.imageUrl || PLACEHOLDER_IMG)}
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                          alt={story.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-brand-primary text-white px-2 py-1 rounded text-xs font-bold">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-brand-primary transition-colors">
                          {story.title}
                        </h4>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                          {story.author && (
                            <span>
                              {story.author.firstName && story.author.lastName 
                                ? `${story.author.firstName} ${story.author.lastName}`
                                : story.author.username}
                            </span>
                          )}
                          {story.publishedAt && <span>{formatTimeAgo(story.publishedAt)}</span>}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* More Stories Grid */}
          {moreStories.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <h3 className="text-2xl font-bold text-brand-primary">MORE STORIES</h3>
                <div className="flex-1 h-px bg-gray-300 ml-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {moreStories.map((story) => (
                  <Link key={story.id} to={`/news/${story.slug}`} className="group">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={(Array.isArray(story.imageIds) && story.imageIds.length > 0) 
                            ? contentApi.getNewsImageUrl(story.imageIds[0]) 
                            : (story.imageUrl || PLACEHOLDER_IMG)}
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                          alt={story.title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors">
                          {story.title}
                        </h4>
                        {story.excerpt && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                            {story.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          {story.author && (
                            <span>
                              {story.author.firstName && story.author.lastName 
                                ? `${story.author.firstName} ${story.author.lastName}`
                                : story.author.username}
                            </span>
                          )}
                          {story.publishedAt && <span>{formatTimeAgo(story.publishedAt)}</span>}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Fox News Style Pagination */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))} 
              disabled={page === 1} 
              className="px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-secondary transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Page {page} of {totalPages}
              </span>
            </div>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
              disabled={page === totalPages} 
              className="px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-secondary transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsListPage;