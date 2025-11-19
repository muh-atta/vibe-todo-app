import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo } from '@/types/todo';

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  sort: 'createdAt' | 'dueDate';
  categories: string[];
  addTodo: (text: string, description?: string, dueDate?: Date, priority?: 'low' | 'medium' | 'high', category?: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string, description?: string, dueDate?: Date, priority?: 'low' | 'medium' | 'high', category?: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  setSort: (sort: 'createdAt' | 'dueDate') => void;
  addCategory: (category: string) => void;
  clearCompleted: () => void;
  toggleAllTodos: () => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',
      sort: 'createdAt',
      categories: ['Work', 'Personal', 'Urgent'],
      
      addTodo: (text: string, description?: string, dueDate?: Date, priority?: 'low' | 'medium' | 'high', category?: string) => {
        const newTodo: Todo = {
          id: crypto.randomUUID(),
          text,
          description,
          completed: false,
          createdAt: new Date(),
          dueDate,
          priority,
          category,
        };
        set((state) => ({ todos: [...state.todos, newTodo] }));
      },
      
      deleteTodo: (id: string) => {
        set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
      },
      
      updateTodo: (id: string, text: string, description?: string, dueDate?: Date, priority?: 'low' | 'medium' | 'high', category?: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { 
                  ...todo, 
                  text, 
                  description, 
                  dueDate, 
                  priority,
                  category,
                }
              : todo
          ),
        }));
      },
      
      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },
      
      setFilter: (filter: 'all' | 'active' | 'completed') => {
        set({ filter });
      },
      
      setSort: (sort: 'createdAt' | 'dueDate') => {
        set({ sort });
      },
      
      addCategory: (category: string) => {
        set((state) => ({
          categories: [...state.categories, category]
        }));
      },
      
      clearCompleted: () => {
        set((state) => ({ todos: state.todos.filter((todo) => !todo.completed) }));
      },
      
      toggleAllTodos: () => {
        const allCompleted = get().todos.every(todo => todo.completed);
        set((state) => ({
          todos: state.todos.map(todo => ({ ...todo, completed: !allCompleted }))
        }));
      },
    }),
    {
      name: 'todo-storage',
    }
  )
);