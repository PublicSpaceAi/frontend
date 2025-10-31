'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};

const TodoListWidget = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load todos from localStorage
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        console.error('Error parsing todos:', e);
      }
    }
  }, []);

  const saveTodos = (updatedTodos: TodoItem[]) => {
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleAddTodo = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!newTodo.trim()) {
      alert('Please enter a task');
      return;
    }

    const newTodoItem: TodoItem = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
    };

    saveTodos([...todos, newTodoItem]);
    setNewTodo('');
    setIsAdding(false);
  };

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    saveTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const progressPercent = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  if (!mounted) return null;

  return (
    <div className="col-span-12 lg:col-span-5 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">My Tasks</h3>
            <p className="text-sm text-orange-100">
              {completedCount} of {todos.length} completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{Math.round(progressPercent)}%</div>
          </div>
        </div>

        {/* Progress Bar */}
        {todos.length > 0 && (
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-orange-200 dark:bg-orange-900/30">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Todos List */}
        {todos.length === 0 && !isAdding ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="mb-3 h-12 w-12 text-gray-300 dark:text-gray-600" />
            <p className="mb-3 text-gray-500 dark:text-gray-400">No tasks yet</p>
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
            >
              <Plus size={16} />
              Add Task
            </button>
          </div>
        ) : (
          <>
            {/* Todo Items */}
            {todos.length > 0 && (
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <button
                      onClick={() => handleToggleTodo(todo.id)}
                      className="flex-shrink-0 text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      {todo.completed ? (
                        <CheckCircle2 size={20} className="fill-current" />
                      ) : (
                        <Circle size={20} />
                      )}
                    </button>

                    <span
                      className={`flex-1 text-sm transition-all ${
                        todo.completed
                          ? 'line-through text-gray-400 dark:text-gray-500'
                          : 'text-gray-800 dark:text-white'
                      }`}
                    >
                      {todo.text}
                    </span>

                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Todo Form */}
            {isAdding ? (
              <form onSubmit={handleAddTodo} className="space-y-2 border-t border-gray-200 pt-3 dark:border-gray-700">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Enter a new task..."
                  autoFocus
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-orange-900"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setNewTodo('');
                    }}
                    className="flex-1 rounded-lg bg-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="w-full rounded-lg border-2 border-orange-500 py-2 text-center text-sm font-medium text-orange-600 hover:bg-orange-50 transition-colors dark:text-orange-400 dark:hover:bg-orange-900/20"
              >
                <Plus size={16} className="inline-block mr-1" />
                Add Task
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TodoListWidget;
