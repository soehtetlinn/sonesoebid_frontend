import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold text-brand-blue" onClick={()=>setMobileMenuOpen(false)}>
              SoneSoe<span className="text-brand-yellow">Bid</span>
            </Link>
            {/* Desktop search */}
            <div className="hidden md:block flex-grow max-w-xl mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for anything..."
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-brand-blue dark:focus:border-brand-blue bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <button type="submit" className="absolute right-0 top-0 mt-1 mr-1 px-4 py-1.5 bg-brand-blue text-white rounded-full hover:bg-blue-700">
                  Search
                </button>
              </form>
            </div>
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/products" className="text-gray-600 dark:text-gray-300 hover:text-brand-blue">
                All Products
              </Link>
              {isAuthenticated && user ? (
                <>
                  <NotificationBell />
                  <Link to="/cart" className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                    {cartItemCount > 0 && (
                        <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-brand-red text-white text-xs flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                  </Link>
                  <div className="flex items-center space-x-2">
                    <Link 
                      to={getDashboardLink()} 
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      Dashboard
                    </Link>
                    <div className="flex flex-col items-end">
                      <Link 
                        to={`/user/${user.id}`} 
                        className="font-semibold text-gray-700 dark:text-gray-200 hover:text-brand-blue"
                      >
                        Hi, {user.username}
                      </Link>
                      <UserRoleBadge user={user} maxDisplay={2} className="mt-1" />
                    </div>
                  </div>
                  <button onClick={() => { logout(); navigate('/'); }} className="px-4 py-2 bg-brand-red text-white rounded-md hover:bg-red-700">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setLoginModalOpen(true)}
                    className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-blue-700"
                  >
                    Sign In
                  </button>
                   <button 
                    onClick={() => setSignUpModalOpen(true)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </nav>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="px-4 py-3 space-y-6">
              {/* Mobile search */}
              <form onSubmit={(e)=>{handleSearch(e); setMobileMenuOpen(false);}} className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for anything..."
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-brand-blue dark:focus:border-brand-blue bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <button type="submit" className="absolute right-1 top-1 px-3 py-1 bg-brand-blue text-white rounded-md hover:bg-blue-700 text-sm">
                  Search
                </button>
              </form>
              {/* Groups */}
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Browse</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <Link to="/products" onClick={()=>setMobileMenuOpen(false)} className="text-gray-700 dark:text-gray-200">All Products</Link>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Account</p>
                {isAuthenticated && user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <NotificationBell />
                      <Link to="/cart" onClick={()=>setMobileMenuOpen(false)} className="text-gray-700 dark:text-gray-200">Cart ({cartItemCount})</Link>
                    </div>
                    <Link to={getDashboardLink()} onClick={()=>setMobileMenuOpen(false)} className="block text-gray-700 dark:text-gray-200">Dashboard</Link>
                    <Link to={`/user/${user.id}`} onClick={()=>setMobileMenuOpen(false)} className="block text-gray-700 dark:text-gray-200">Profile</Link>
                    <button onClick={()=>{ logout(); setMobileMenuOpen(false); navigate('/'); }} className="w-full px-4 py-2 bg-brand-red text-white rounded-md">Logout</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <button onClick={()=>{ setLoginModalOpen(true); setMobileMenuOpen(false); }} className="flex-1 px-4 py-2 bg-brand-blue text-white rounded-md">Sign In</button>
                    <button onClick={()=>{ setSignUpModalOpen(true); setMobileMenuOpen(false); }} className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md">Sign Up</button>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </header>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onSwitchToSignUp={() => { setLoginModalOpen(false); setSignUpModalOpen(true); }} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={() => setSignUpModalOpen(false)} onSwitchToLogin={() => { setSignUpModalOpen(false); setLoginModalOpen(true); }} />
    </>
  );
};

export default Header;