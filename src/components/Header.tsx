import React from 'react';
import { CheckSquare, Filter, SortAsc } from 'lucide-react';

interface HeaderProps {
  filter: 'all' | 'active' | 'completed';
  sortBy: 'dueDate' | 'priority' | 'created';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  onSortChange: (sort: 'dueDate' | 'priority' | 'created') => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  filter, 
  sortBy, 
  onFilterChange, 
  onSortChange 
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <CheckSquare className="text-emerald-400" size={32} />
          <h1 className="text-3xl font-bold text-white">TaskFlow</h1>
        </div>
        <div className="ml-auto text-right">
          <p className="text-gray-400 text-sm">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400" size={16} />
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value as any)}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <SortAsc className="text-gray-400" size={16} />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="created">Date Created</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
    </div>
  );
};