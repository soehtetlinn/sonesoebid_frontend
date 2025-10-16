import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [needsScroll, setNeedsScroll] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const measure = () => {
      const el = modalRef.current;
      if (!el) return;
      const verticalPadding = 32; // p-4 on wrapper
      const available = window.innerHeight - verticalPadding;
      setNeedsScroll(el.scrollHeight > available);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [isOpen, username, email, password, confirmPassword, firstName, lastName, phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }
    
    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await register(username, email, password, firstName, lastName, phone);
      if (result.user) {
        onClose();
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFirstName('');
        setLastName('');
        setPhone('');
        const destination = result.user.role === UserRole.ADMIN ? '/admin' : '/dashboard';
        navigate(destination);
      } else {
        setError(result.error || 'Sign up failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // OAuth handled in dedicated sign-in flow; keep sign-up form simple

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 md:p-6">
      <div ref={modalRef} className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md relative ${needsScroll ? 'max-h-[90vh] overflow-y-auto' : ''}`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName-signup" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">First Name</label>
              <input
                type="text"
                id="firstName-signup"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="First Name"
              />
            </div>
            <div>
              <label htmlFor="lastName-signup" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Last Name</label>
              <input
                type="text"
                id="lastName-signup"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="username-signup" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Username *</label>
            <input
              type="text"
              id="username-signup"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Choose a username"
              required
              minLength={3}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email-signup" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email Address *</label>
            <input
              type="email"
              id="email-signup"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone-signup" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone-signup"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password-signup" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Password *</label>
            <input
              type="password"
              id="password-signup"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword-signup" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword-signup"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Confirm your password"
              required
            />
          </div>
          {error && <p className="text-brand-red text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-blue text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="font-medium text-brand-blue hover:underline">
                Sign in
            </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
