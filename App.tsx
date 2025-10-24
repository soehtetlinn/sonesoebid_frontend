import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { WatchListProvider } from './contexts/WatchListContext';
import { CartProvider } from './contexts/CartContext';
import PageContainer from './components/PageContainer';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import UserMyProductsPage from './pages/UserMyProductsPage';
import ProductFormPage from './pages/ProductFormPage';
import AdminUserManagementPage from './pages/AdminUserManagementPage';
import AdminProductManagementPage from './pages/AdminProductManagementPage';
import AdminCategoryManagementPage from './pages/AdminCategoryManagementPage';
import UserNotificationsPage from './pages/UserNotificationsPage';
import WatchListPage from './pages/WatchListPage';
import UserProfilePage from './pages/UserProfilePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import CartPage from './pages/CartPage';
import MessagingPage from './pages/MessagingPage';
import DisputeCenterPage from './pages/DisputeCenterPage';
import AdminNewsPage from './pages/AdminNewsPage';
import AdminAdsPage from './pages/AdminAdsPage';
import AdminFxPage from './pages/AdminFxPage';
import CurrencyConverterPage from './pages/CurrencyConverterPage';
import NewsListPage from './pages/NewsListPage';
import NewsDetailPage from './pages/NewsDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import { useEffect } from 'react';
import { disableAds, enableAds, fillAdsIfContentful, shouldAllowAdsForPath } from './utils/adsense';


const PageLayout: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname || '/';
    const allow = shouldAllowAdsForPath(path);
    if (allow) {
      enableAds();
      // Defer fill slightly to let content render
      const id = setTimeout(() => fillAdsIfContentful(), 50);
      return () => clearTimeout(id);
    } else {
      disableAds();
    }
  }, [location]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<PageContainer><ProductListPage /></PageContainer>} />
          <Route path="/news" element={<PageContainer><NewsListPage /></PageContainer>} />
          <Route path="/news/:slug" element={<PageContainer><NewsDetailPage /></PageContainer>} />
          <Route path="/converter" element={<PageContainer><CurrencyConverterPage /></PageContainer>} />
          <Route path="/product/:id" element={<PageContainer><ProductDetailPage /></PageContainer>} />
          <Route path="/user/:userId" element={<PageContainer><UserProfilePage /></PageContainer>} />
          <Route path="/cart" element={<PageContainer><CartPage /></PageContainer>} />
          <Route path="/dashboard" element={<PageContainer><UserDashboardPage /></PageContainer>} />
          <Route path="/dashboard/products" element={<PageContainer><UserMyProductsPage /></PageContainer>} />
          <Route path="/dashboard/product/new" element={<PageContainer><ProductFormPage /></PageContainer>} />
          <Route path="/dashboard/product/edit/:id" element={<PageContainer><ProductFormPage /></PageContainer>} />
          <Route path="/dashboard/notifications" element={<PageContainer><UserNotificationsPage /></PageContainer>} />
          <Route path="/dashboard/watchlist" element={<PageContainer><WatchListPage /></PageContainer>} />
          <Route path="/dashboard/orders" element={<PageContainer><OrderHistoryPage /></PageContainer>} />
          <Route path="/dashboard/messages" element={<PageContainer><MessagingPage /></PageContainer>} />
          <Route path="/dashboard/messages/:conversationId" element={<PageContainer><MessagingPage /></PageContainer>} />
          <Route path="/disputes" element={<PageContainer><DisputeCenterPage /></PageContainer>} />
          <Route path="/about" element={<PageContainer><AboutPage /></PageContainer>} />
          <Route path="/contact" element={<PageContainer><ContactPage /></PageContainer>} />
          <Route path="/privacy" element={<PageContainer><PrivacyPolicyPage /></PageContainer>} />
          <Route path="/terms" element={<PageContainer><TermsOfServicePage /></PageContainer>} />
          <Route path="/admin" element={<PageContainer><AdminDashboardPage /></PageContainer>} />
          <Route path="/admin/users" element={<PageContainer><AdminUserManagementPage /></PageContainer>} />
          <Route path="/admin/products" element={<PageContainer><AdminProductManagementPage /></PageContainer>} />
          <Route path="/admin/categories" element={<PageContainer><AdminCategoryManagementPage /></PageContainer>} />
          <Route path="/admin/news" element={<PageContainer><AdminNewsPage /></PageContainer>} />
          <Route path="/admin/ads" element={<PageContainer><AdminAdsPage /></PageContainer>} />
          <Route path="/admin/fx" element={<PageContainer><AdminFxPage /></PageContainer>} />
          <Route path="*" element={<PageContainer><NotFoundPage /></PageContainer>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <WatchListProvider>
            <CartProvider>
              <HashRouter>
                <PageLayout />
              </HashRouter>
            </CartProvider>
          </WatchListProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;