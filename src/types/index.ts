export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
  reminder?: string;
}

export interface PomodoroSession {
  id: string;
  type: 'work' | 'break';
  duration: number;
  startTime: string;
  endTime?: string;
  completed: boolean;
}

export interface Affirmation {
  id: string;
  text: string;
  category: string;
}

export interface AppSettings {
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  notificationsEnabled: boolean;
  dailyAffirmations: boolean;
}