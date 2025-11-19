export interface Todo {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
}