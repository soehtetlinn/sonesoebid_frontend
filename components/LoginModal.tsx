import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (emailOrUsername: string, password: string) => {
    setError('');
    setIsLoading(true);
    try {
      const result = await login(emailOrUsername, password);
      if (result.user) {
        onClose();
        setEmailOrUsername('');
        setPassword('');
        const destination = result.user.role === UserRole.ADMIN ? '/admin' : '/dashboard';
        navigate(destination);
      } else {
        setError(result.error || 'Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuth(emailOrUsername, password);
  };

  const handleGoogle = async () => {
    try {
      // Use Google Identity Services One Tap or popup token flow
      // For simplicity, expect window.google.accounts.id to be loaded and use prompt to get credential
      const token = await new Promise<string>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Google SDK not loaded')), 8000);
        try {
          // @ts-ignore
          if (window.google && window.google.accounts && window.google.accounts.id) {
            // @ts-ignore
            window.google.accounts.id.prompt((notification: any) => {
              // No direct token here; recommend using button callback approach; fallback to credential from a hidden onSuccess
            });
          }
        } catch (e) {}
        // Fallback: look for a global last credential set by a GIS button callback
        const check = () => {
          // @ts-ignore
          const cred = window.__lastGoogleIdToken;
          if (cred) { clearTimeout(timeout); resolve(cred as string); }
          else setTimeout(check, 300);
        };
        check();
      });
      const res = await loginWithGoogle(token);
      if (res.user) {
        onClose();
        navigate(res.user.role === UserRole.ADMIN ? '/admin' : '/dashboard');
      } else {
        setError(res.error || 'Google sign-in failed');
      }
    } catch (e: any) {
      setError(e?.message || 'Google sign-in failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">Sign In to SHL Hub</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="emailOrUsername" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email or Username</label>
            <input
              type="text"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-teal bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="your@email.com or username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-teal bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-brand-red text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-teal text-white py-2 rounded-md hover:bg-teal-700 disabled:bg-teal-300 transition-colors"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="mx-4 text-gray-500 dark:text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <div className="space-y-3">
            <button onClick={handleGoogle} disabled={isLoading} className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574	l6.19,5.238C39.99,35.53,44,29.891,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                Continue with Google
            </button>
            {false && (
              <button disabled className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 disabled:opacity-50">
                GitHub disabled
              </button>
            )}
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <button onClick={onSwitchToSignUp} className="font-medium text-brand-teal hover:underline">
                Sign up
            </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;