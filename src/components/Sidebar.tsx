'use client';

import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const { currentUser, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', href: '/' },
    { id: 'tasks', label: 'Tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', href: '/tasks' },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 font-poppins">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center" onClick={() => router.push("/")}>
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">Vibe<span className="text-indigo-600">Todo</span></span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-5">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`w-full flex items-center px-5 py-4 text-base font-medium rounded-xl transition-colors ${
                  pathname === item.href
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </Link>
            </li>
          ))}
          
          {/* Add New Task Button */}
          <li>
            <Link
              href="/tasks/add"
              className={`w-full flex items-center px-5 py-4 text-base font-medium rounded-xl transition-colors ${
                pathname === '/tasks/add'
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Task
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-5 border-t border-gray-200 dark:border-gray-700">
        {currentUser && (
          <div className="flex items-center justify-between">
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
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/50"
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
  );
}