import React from 'react';
import { useLocation } from 'wouter';

const NotFound: React.FC = () => {
  const [_, navigate] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="w-32 h-32 text-blue-600 dark:text-blue-400">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              className="w-full h-full"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
          Page not found
        </h2>
        
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-base font-medium text-blue-600 bg-white border border-blue-600 rounded-md shadow-sm hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Return Home
          </button>
        </div>
        
        <div className="mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help?{' '}
            <a 
              href="#" 
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
