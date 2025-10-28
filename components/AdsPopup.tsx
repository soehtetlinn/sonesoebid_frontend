import React, { useState, useEffect } from 'react';

const AdsPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 1 second delay on every page load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-[100] transition-opacity animate-fadeIn"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4 animate-slideUp">
        <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 p-4 sm:p-5 relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white hover:bg-white/20 rounded-full p-1.5 transition-all"
              aria-label="Close"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center pr-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                🎉 Discover Our Services
              </h2>
              <p className="text-teal-50 text-xs sm:text-sm">
                Check out our amazing tools!
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 space-y-3">
            {/* Currex Ad */}
            <a
              href="https://www.shltechent.com/currex/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="block group"
            >
              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-teal-500 dark:hover:border-teal-500 transition-all hover:shadow-lg active:scale-[0.98] sm:hover:scale-[1.01] transform">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      💰 Currex
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2 line-clamp-2">
                      Real-time MMK ↔ THB exchange rates. Track rates, calculate exchanges, and stay updated!
                    </p>
                    <div className="flex items-center text-teal-600 dark:text-teal-400 font-semibold text-xs sm:text-sm">
                      <span>Visit Now</span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* QR Suite Ad */}
            <a
              href="https://www.shltechent.com/qr-suite/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="block group"
            >
              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-lg active:scale-[0.98] sm:hover:scale-[1.01] transform">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      📱 QR Suite
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2 line-clamp-2">
                      Create & manage QR codes for URLs, payments, contacts, and more. Professional solutions!
                    </p>
                    <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold text-xs sm:text-sm">
                      <span>Visit Now</span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-800 px-3 sm:px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                SHL Tech Enterprise
              </p>
              <button
                onClick={handleClose}
                className="px-4 py-1.5 sm:px-5 sm:py-2 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white rounded-lg font-medium transition-colors text-xs sm:text-sm flex-shrink-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default AdsPopup;

