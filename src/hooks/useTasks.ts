import { useState, useEffect } from 'react';
import { Task } from '../types';
import { storage } from '../utils/storage';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'created'>('created');

  useEffect(() => {
    setTasks(storage.getTasks());
  }, []);

  useEffect(() => {
    storage.saveTasks(tasks);
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : undefined
          }
        : task
    ));
  };

  const getFilteredTasks = () => {
    let filteredTasks = tasks;

    switch (filter) {
      case 'active':
        filteredTasks = tasks.filter(task => !task.completed);
        break;
      case 'completed':
        filteredTasks = tasks.filter(task => task.completed);
        break;
      default:
        filteredTasks = tasks;
    }

    return filteredTasks.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    const overdue = tasks.filter(task => 
      !task.completed && task.dueDate && new Date(task.dueDate) < new Date()
    ).length;

    return { total, completed, active, overdue };
  };

  return {
    tasks: getFilteredTasks(),
    filter,
    sortBy,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    setFilter,
    setSortBy,
    getTaskStats
  };
};