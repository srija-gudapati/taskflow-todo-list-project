import React from 'react';
import { CheckCircle, Circle, AlertTriangle, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-emerald-400" size={20} />
        <h2 className="text-lg font-semibold text-white">Progress Overview</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Circle className="text-blue-400" size={16} />
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
          <p className="text-sm text-gray-400">Total Tasks</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <CheckCircle className="text-emerald-400" size={16} />
            <span className="text-2xl font-bold text-white">{stats.completed}</span>
          </div>
          <p className="text-sm text-gray-400">Completed</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Circle className="text-yellow-400" size={16} />
            <span className="text-2xl font-bold text-white">{stats.active}</span>
          </div>
          <p className="text-sm text-gray-400">Active</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <AlertTriangle className="text-red-400" size={16} />
            <span className="text-2xl font-bold text-white">{stats.overdue}</span>
          </div>
          <p className="text-sm text-gray-400">Overdue</p>
        </div>
      </div>

      <div className="bg-slate-700 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">Completion Rate</span>
          <span className="text-sm font-medium text-emerald-400">{completionRate}%</span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};