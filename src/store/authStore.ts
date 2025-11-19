import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface AuthState {
  currentUser: User | null;
  users: User[];
  login: (username: string, email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      users: [],
      isAuthenticated: false,

      login: (username: string, email: string, password: string) => {
        set((state) => {
          // Check if user exists
          let user = state.users.find((u) => u.email === email);
          
          // If user doesn't exist, create new user
          if (!user) {
            user = {
              id: crypto.randomUUID(),
              username,
              email,
              password, // Store the password for credentials login
            };
            return {
              currentUser: user,
              users: [...state.users, user],
              isAuthenticated: true,
            };
          }
          
          // If user exists, check password
          if (user.password !== password) {
            // In a real app, you would hash and compare passwords
            throw new Error('Invalid password');
          }
          
          // If user exists and password is correct, just log them in
          return {
            currentUser: user,
            isAuthenticated: true,
          };
        });
      },

      logout: () =>
        set({
          currentUser: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);