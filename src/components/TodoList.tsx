'use client';

import { useState } from 'react';
import { useTodoStore } from '@/store/todoStore';
import Link from 'next/link';

export default function TodoList() {
  const { todos, filter, sort, setFilter, setSort, clearCompleted, toggleAllTodos } = useTodoStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const filteredTodos = todos
    .filter(todo => {
      // Filter by status
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          todo.text.toLowerCase().includes(query) ||
          (todo.description && todo.description.toLowerCase().includes(query))
        );
      }
      
      // Filter by category
      if (selectedCategory !== 'all') {
        return todo.category === selectedCategory;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      if (sort === 'dueDate') {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      
      // Default sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const categories = Array.from(new Set(todos.map(todo => todo.category).filter(Boolean))) as string[];

  const isOverdue = (dueDate?: Date) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">My Tasks</h1>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' 
                  : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'active' 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' 
                  : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'completed' 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' 
                  : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as 'createdAt' | 'dueDate')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="createdAt">Sort by Created</option>
              <option value="dueDate">Sort by Due Date</option>
            </select>
          </div>
        </div>
        
        {/* Add Task Button */}
        <div className="mb-6">
          <Link
            href="/tasks/add"
            className="flex items-center gap-2 px-4 py-2 w-fit bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Task
          </Link>
        </div>
        
        {/* Bulk Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={toggleAllTodos}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Toggle All
          </button>
          <button
            onClick={clearCompleted}
            disabled={!todos.some(t => t.completed)}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              todos.some(t => t.completed)
                ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
            }`}
          >
            Clear Completed
          </button>
        </div>

        {/* Todo List Container */}
<div className="flex-1 overflow-y-auto max-h-[450px] custom-scroll-hide">
          <div className="space-y-3 mb-6">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  {filter === 'completed' 
                    ? 'No completed tasks' 
                    : filter === 'active' 
                      ? 'All tasks completed!' 
                      : searchQuery || selectedCategory !== 'all'
                        ? 'No matching tasks found'
                        : 'No tasks yet'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery || selectedCategory !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Add a new task to get started'}
                </p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex flex-col p-4 rounded-lg border transition-all duration-200 ${
                    todo.completed 
                      ? 'bg-gray-50 border-gray-200 dark:bg-gray-700/30 dark:border-gray-600' 
                      : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:hover:border-indigo-500'
                  }`}
                >
                  {editingId === todo.id ? (
                    <div className="w-full">
                      {/* We'll keep the inline edit form for existing tasks */}
                      {/* This would typically be another component, but keeping it simple */}
                      <div className="mb-4">
                        <input
                          type="text"
                          defaultValue={todo.text}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Task title"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => useTodoStore.getState().toggleTodo(todo.id)}
                          className="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer dark:bg-gray-600 dark:border-gray-500"
                        />

                        {/* Task Content */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                              {todo.text}
                            </h3>
                            
                            <div className="flex flex-wrap gap-2">
                              {todo.priority && (
                                <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[todo.priority]}`}>
                                  {todo.priority}
                                </span>
                              )}
                              {todo.category && (
                                <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                                  {todo.category}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {todo.description && (
                            <p className={`mt-2 text-sm ${todo.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
                              {todo.description}
                            </p>
                          )}
                          
                          <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                            <span>
                              Created: {new Date(todo.createdAt).toLocaleDateString()}
                            </span>
                            {todo.dueDate && (
                              <span className={isOverdue(todo.dueDate) && !todo.completed ? 'text-red-500 dark:text-red-400 font-medium' : ''}>
                                Due: {new Date(todo.dueDate).toLocaleDateString()}
                                {isOverdue(todo.dueDate) && !todo.completed && ' (Overdue)'}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEdit(todo.id)}
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => useTodoStore.getState().deleteTodo(todo.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
          <span>
            Total: {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
          </span>
          <span>
            Completed: {todos.filter(t => t.completed).length}
          </span>
          <span>
            Active: {todos.filter(t => !t.completed).length}
          </span>
        </div>
      </div>
    </div>
  );
}