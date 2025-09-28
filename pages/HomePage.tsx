import React, { useState, useEffect } from 'react';
import { Product, NewsItem } from '../types';
import { api, contentApi } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([] as any);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // FIX: api.getProducts expects a filters object. Pass empty object for no filters.
      const allProducts = await api.getProducts({});
      // Feature first 4 products
      setProducts(allProducts.slice(0, 4));
      setLoading(false);
    };
    fetchProducts();
    // Load latest news (top 3)
    contentApi.getNews().then((list: any) => setLatestNews((list || []).slice(0, 3)));
  }, []);

  return (
    <div>
      {/* Hero: Selling banner with right callout */}
      <section className="relative overflow-hidden rounded-lg shadow-md mb-12 border dark:border-gray-700">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920&auto=format&fit=crop"
          alt="Selling banner"
          className="w-full h-[360px] sm:h-[420px] md:h-[520px] object-cover"
        />

        {/* Right side callout card */}
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div className="bg-white/95 dark:bg-gray-900/90 backdrop-blur rounded-xl shadow-xl border dark:border-gray-700 max-w-xl m-4 sm:m-6 md:m-8 p-6 sm:p-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
              Make money selling
              <br />
              on SoneSoe Bid
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Sell your items fast—millions of buyers are waiting.
            </p>
            <div className="mt-6">
              {isAuthenticated ? (
                <Link
                  to="/dashboard/product/new"
                  className="inline-flex items-center justify-center bg-brand-blue text-white font-semibold py-3 px-6 rounded-full text-base sm:text-lg hover:bg-blue-700 transition-colors"
                >
                  List an item
                </Link>
              ) : (
                <button
                  onClick={() => navigate('/?auth=login')}
                  className="inline-flex items-center justify-center bg-brand-blue text-white font-semibold py-3 px-6 rounded-full text-base sm:text-lg hover:bg-blue-700 transition-colors"
                >
                  List an item
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Featured Items</h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Latest News */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Latest News</h2>
          <Link to="/news" className="text-brand-blue hover:underline">View all</Link>
        </div>
        {latestNews.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No news yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((n) => (
              <Link key={n.id} to={`/news/${n.slug}`} className="bg-white dark:bg-gray-800 p-4 rounded border dark:border-gray-700 hover:shadow">
                {n.imageUrl && <img src={n.imageUrl} alt={n.title} className="w-full h-36 object-cover rounded mb-3" />}
                <p className="font-semibold text-gray-900 dark:text-gray-100">{n.title}</p>
                {n.excerpt && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{n.excerpt}</p>}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;