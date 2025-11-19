'use client';

import { useAuthStore } from '@/store/authStore';
import LoginScreen from '@/components/LoginScreen';
import TodoList from '@/components/TodoList';

export default function Home() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <TodoList />
    </div>
  );
}