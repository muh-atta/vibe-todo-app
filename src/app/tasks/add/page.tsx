'use client';

import { useRouter } from 'next/navigation';
import TodoForm from '@/components/TodoForm';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AddTaskPage() {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = () => {
    router.push('/tasks');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Task</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Create a new task to stay organized</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <TodoForm onCancel={handleCancel} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}