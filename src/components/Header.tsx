'use client';

import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function Header() {
  const { currentUser, logout } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center" onClick={() => router.push("/")}>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white font-poppins">Vibe<span className="text-indigo-600">Todo</span></span>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser && (
              <div className="flex items-center">
                {currentUser.image && (
                  <img 
                    src={currentUser.image} 
                    alt={currentUser.username} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                )}
                <div>
                  <p className="text-base font-medium text-gray-900 dark:text-white">{currentUser.username}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-4 p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/50"
                  aria-label="Logout"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}