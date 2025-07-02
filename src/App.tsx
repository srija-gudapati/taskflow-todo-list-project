import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { PomodoroTimer } from './components/PomodoroTimer';
import { AffirmationCard } from './components/AffirmationCard';
import { StatsCard } from './components/StatsCard';
import { useTasks } from './hooks/useTasks';

function App() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const {
    tasks,
    filter,
    sortBy,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    setFilter,
    setSortBy,
    getTaskStats
  } = useTasks();

  const stats = getTaskStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <Header
          filter={filter}
          sortBy={sortBy}
          onFilterChange={setFilter}
          onSortChange={setSortBy}
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Tasks</h2>
              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors font-medium"
              >
                <Plus size={16} />
                Add Task
              </button>
            </div>
            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onUpdateTask={updateTask}
            />
          </div>

          <div className="space-y-6">
            <StatsCard stats={stats} />
            <PomodoroTimer />
          </div>
        </div>

        {showTaskForm && (
          <TaskForm
            onAddTask={addTask}
            onClose={() => setShowTaskForm(false)}
          />
        )}

        <AffirmationCard />
      </div>
    </div>
  );
}

export default App;