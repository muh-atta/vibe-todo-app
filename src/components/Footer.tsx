'use client';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-6 h-6 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white font-poppins">Vibe<span className="text-indigo-600">Todo</span></span>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} VibeTodo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}