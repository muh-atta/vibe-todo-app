'use client';

import TodoList from '@/components/TodoList';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function TasksPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          <div className="mb-8 pt-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your tasks and stay organized</p>
          </div>
          <div className="flex-1 overflow-hidden">
            <TodoList />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}