import React, { useState } from 'react';
import { Check, Clock, AlertTriangle, Edit2, Trash2, Calendar } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description
  });

  const handleEdit = () => {
    if (isEditing) {
      onUpdate(task.id, editData);
    }
    setIsEditing(!isEditing);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  const isDueSoon = task.dueDate && new Date(task.dueDate) < new Date(Date.now() + 24 * 60 * 60 * 1000) && !task.completed;

  return (
    <div className={`bg-slate-800 rounded-lg p-4 border border-slate-700 transition-all duration-200 hover:border-slate-600 ${
      task.completed ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'border-slate-500 hover:border-emerald-500'
          }`}
        >
          {task.completed && <Check size={12} />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm resize-none"
                rows={2}
              />
            </div>
          ) : (
            <>
              <h3 className={`font-medium text-white ${task.completed ? 'line-through' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm text-gray-400 mt-1 ${task.completed ? 'line-through' : ''}`}>
                  {task.description}
                </p>
              )}
            </>
          )}

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            
            <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">
              {task.category}
            </span>

            {task.dueDate && (
              <div className={`flex items-center gap-1 text-xs ${
                isOverdue ? 'text-red-400' : isDueSoon ? 'text-yellow-400' : 'text-gray-400'
              }`}>
                <Calendar size={12} />
                {new Date(task.dueDate).toLocaleDateString()}
                {isOverdue && <AlertTriangle size={12} />}
              </div>
            )}

            {task.reminder && (
              <div className="flex items-center gap-1 text-xs text-blue-400">
                <Clock size={12} />
                Reminder set
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-1">
          <button
            onClick={handleEdit}
            className="p-1 text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};