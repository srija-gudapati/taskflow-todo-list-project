import React from 'react';
import { Play, Pause, RotateCcw, SkipForward, Settings } from 'lucide-react';
import { usePomodoro } from '../hooks/usePomodoro';

export const PomodoroTimer: React.FC = () => {
  const {
    isActive,
    timeLeft,
    currentSession,
    sessionsCompleted,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    formatTime
  } = usePomodoro();

  const progress = currentSession === 'work' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            {currentSession === 'work' ? '🍅 Focus Time' : '☕ Break Time'}
          </h2>
          <p className="text-gray-400">
            Session {sessionsCompleted + 1} • {currentSession === 'work' ? 'Work' : 'Break'}
          </p>
        </div>

        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 144 144">
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="#374151"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke={currentSession === 'work' ? '#10b981' : '#3b82f6'}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 60}`}
              strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-mono font-bold text-white">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={isActive ? pauseTimer : startTimer}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentSession === 'work'
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {isActive ? <Pause size={20} /> : <Play size={20} />}
            {isActive ? 'Pause' : 'Start'}
          </button>

          <button
            onClick={resetTimer}
            className="p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            title="Reset"
          >
            <RotateCcw size={20} />
          </button>

          <button
            onClick={skipSession}
            className="p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            title="Skip"
          >
            <SkipForward size={20} />
          </button>
        </div>

        <div className="text-sm text-gray-400">
          <p>Sessions completed today: <span className="text-emerald-400 font-medium">{sessionsCompleted}</span></p>
        </div>
      </div>
    </div>
  );
};