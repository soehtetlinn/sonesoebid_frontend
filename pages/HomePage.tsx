import React, { useState, useEffect } from 'react';
import { Product, NewsItem } from '../types';
import { api, contentApi } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import ThreeScene from '../components/ThreeScene';
import SimpleThreeHero from '../components/SimpleThreeHero';

const PLACEHOLDER_IMG = 'https://via.placeholder.com/800x400?text=News';

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
      // Feature first 6 products
      setProducts(allProducts.slice(0, 6));
      setLoading(false);
    };
    fetchProducts();
    // Load latest news (top 5)
    contentApi.getNews().then((list: any) => setLatestNews((list || []).slice(0, 5)));
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-black dark:to-black">
      {/* Continuous 3D Background for entire page */}
      <div className="fixed inset-0 w-full h-full opacity-20 z-0">
        <ThreeScene />
      </div>
      
      {/* 3D Hero Section - Full Width */}
      <div className="relative w-full z-10">
        <SimpleThreeHero />
      </div>

      {/* Featured Items Section - Full Width */}
      <motion.section 
        className="relative w-full mb-16 py-20 overflow-hidden z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header - Centered and Beautiful */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.h2 
                className="text-5xl md:text-6xl font-extrabold mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="bg-gradient-to-r from-brand-teal via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Featured Items
                </span>
              </motion.h2>
              
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-brand-teal to-blue-500 mx-auto mb-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                Discover trending products from our community
              </motion.p>
            </motion.div>
          </div>

          {/* View All Link - Positioned nicely */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Link 
              to="/products" 
              className="group inline-flex items-center px-6 py-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-brand-teal/20 text-brand-teal hover:bg-brand-teal hover:text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Products
              <motion.svg 
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </Link>
          </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Spinner />
            </motion.div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="transform transition-all duration-300"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
        </div>
      </motion.section>

      {/* Latest News Section - Full Width */}
      <motion.section 
        className="relative w-full mb-16 py-20 overflow-hidden z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header - Centered and Beautiful */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.h2 
                className="text-5xl md:text-6xl font-extrabold mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="bg-gradient-to-r from-brand-teal via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Latest News
                </span>
              </motion.h2>
              
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-brand-teal to-blue-500 mx-auto mb-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              />
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Stay updated with the latest marketplace insights
              </motion.p>
            </motion.div>
          </div>

          {/* View All Link - Positioned nicely */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <Link 
              to="/news" 
              className="group inline-flex items-center px-6 py-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-brand-teal/20 text-brand-teal hover:bg-brand-teal hover:text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All News
              <motion.svg 
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </Link>
          </motion.div>
        
        {latestNews.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">No news yet.</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Check back later for updates!</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {latestNews.map((n, index) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="transform transition-all duration-300"
              >
                <Link 
                  to={`/news/${n.slug}`} 
                  className="group block bg-white/80 dark:bg-black/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 hover:border-brand-teal/50 dark:hover:border-brand-teal/50 hover:shadow-xl hover:shadow-brand-teal/10 transition-all duration-300 overflow-hidden relative"
                >
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="relative overflow-hidden rounded-xl mb-4">
                      <img
                        src={(Array.isArray(n.imageIds) && n.imageIds.length > 0)
                          ? contentApi.getNewsImageUrl(n.imageIds[0])
                          : (n.imageUrl || PLACEHOLDER_IMG)}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                        alt={n.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg leading-tight group-hover:text-brand-teal transition-colors duration-300 line-clamp-2">
                      {n.title}
                    </h3>
                    
                    {n.excerpt && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-3 leading-relaxed">
                        {n.excerpt}
                      </p>
                    )}
                    
                    <div className="mt-4 flex items-center text-brand-teal font-medium text-sm group-hover:text-teal-600 transition-colors duration-300">
                      <span>Read more</span>
                      <motion.svg 
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;