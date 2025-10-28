import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { isAdmin } from '../utils/roleUtils';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import ThemeToggle from './ThemeToggle';
import NotificationBell from './NotificationBell';
import UserRoleBadge from './UserRoleBadge';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const auth = params.get('auth');
    if (auth === 'login') setLoginModalOpen(true);
    if (auth === 'signup') setSignUpModalOpen(true);
  }, [location]);

  const clearAuthQuery = () => {
    if (location.search) {
      navigate(location.pathname, { replace: true });
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    return isAdmin(user) ? '/admin' : '/dashboard';
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <>
      <header className="bg-white dark:bg-black shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center" onClick={()=>setMobileMenuOpen(false)}>
              <img 
                src="/logo-light.svg" 
                alt="SHL Hub" 
                className="h-12 w-auto"
              />
            </Link>
            
            {/* Search bar - visible on desktop, hidden on mobile */}
            <div className="hidden md:block flex-grow max-w-xl mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for anything..."
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-brand-teal dark:focus:border-brand-teal bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                />
                <button type="submit" className="absolute right-0 top-0 mt-1 mr-1 px-4 py-1.5 bg-brand-teal text-white rounded-full hover:bg-teal-700">
                  Search
                </button>
              </form>
            </div>
            
            {/* Hamburger menu toggle - visible on all screen sizes */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Overlay backdrop */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        
        {/* Side menu drawer - works on all screen sizes */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-black shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 space-y-6">
            {/* Close button */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search */}
            <form onSubmit={(e)=>{handleSearch(e); setMobileMenuOpen(false);}} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for anything..."
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-brand-teal dark:focus:border-brand-teal bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
              <button type="submit" className="absolute right-2 top-2 px-4 py-1.5 bg-brand-teal text-white rounded-lg hover:bg-teal-700 text-sm">
                Search
              </button>
            </form>

            {/* Navigation Links */}
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-3">Browse</p>
              <div className="space-y-2">
                <Link 
                  to="/products" 
                  onClick={()=>setMobileMenuOpen(false)} 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium">Listings</span>
                </Link>
                <Link 
                  to="/news" 
                  onClick={()=>setMobileMenuOpen(false)} 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <span className="font-medium">News</span>
                </Link>
                <a 
                  href="https://www.shltechent.com/currex/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={()=>setMobileMenuOpen(false)} 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Currex</span>
                </a>
                <a 
                  href="https://www.shltechent.com/qr-suite/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={()=>setMobileMenuOpen(false)} 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <span className="font-medium">QR Suite</span>
                </a>
                <a 
                  href="https://sanpyashaesaung.shltechent.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={()=>setMobileMenuOpen(false)} 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="font-medium">Sanpyashaesaung</span>
                  <span className="ml-auto px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-semibold">NEW</span>
                </a>
              </div>
            </div>

            {/* Account Section */}
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-3">Account</p>
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <Link 
                      to={`/user/${user.id}`} 
                      onClick={()=>setMobileMenuOpen(false)} 
                      className="font-semibold text-gray-900 dark:text-white hover:text-brand-teal"
                    >
                      Hi, {user.username}
                    </Link>
                    <UserRoleBadge user={user} maxDisplay={2} className="mt-1" />
                  </div>
                  <Link 
                    to="/cart" 
                    onClick={()=>setMobileMenuOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium">Cart ({cartItemCount})</span>
                  </Link>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <NotificationBell />
                  </div>
                  <Link 
                    to={getDashboardLink()} 
                    onClick={()=>setMobileMenuOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  <Link 
                    to={`/user/${user.id}`} 
                    onClick={()=>setMobileMenuOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Profile</span>
                  </Link>
                  <button 
                    onClick={()=>{ logout(); setMobileMenuOpen(false); navigate('/'); }} 
                    className="w-full flex items-center gap-3 px-4 py-3 bg-brand-red text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button 
                    onClick={()=>{ setLoginModalOpen(true); setMobileMenuOpen(false); }} 
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-brand-teal text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Sign In</span>
                  </button>
                  <button 
                    onClick={()=>{ setSignUpModalOpen(true); setMobileMenuOpen(false); }} 
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span className="font-medium">Sign Up</span>
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span className="font-medium text-gray-700 dark:text-gray-200">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => { setLoginModalOpen(false); clearAuthQuery(); }} onSwitchToSignUp={() => { setLoginModalOpen(false); setSignUpModalOpen(true); }} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={() => { setSignUpModalOpen(false); clearAuthQuery(); }} onSwitchToLogin={() => { setSignUpModalOpen(true); setLoginModalOpen(true); }} />
    </>
  );
};

export default Header;