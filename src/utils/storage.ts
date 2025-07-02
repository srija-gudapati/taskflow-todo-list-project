import { Task, PomodoroSession, AppSettings } from '../types';

export const storage = {
  getTasks(): Task[] {
    try {
      const tasks = localStorage.getItem('productivity-tasks');
      return tasks ? JSON.parse(tasks) : [];
    } catch {
      return [];
    }
  },

  saveTasks(tasks: Task[]): void {
    localStorage.setItem('productivity-tasks', JSON.stringify(tasks));
  },

  getSessions(): PomodoroSession[] {
    try {
      const sessions = localStorage.getItem('productivity-sessions');
      return sessions ? JSON.parse(sessions) : [];
    } catch {
      return [];
    }
  },

  saveSessions(sessions: PomodoroSession[]): void {
    localStorage.setItem('productivity-sessions', JSON.stringify(sessions));
  },

  getSettings(): AppSettings {
    try {
      const settings = localStorage.getItem('productivity-settings');
      return settings ? JSON.parse(settings) : {
        workDuration: 25,
        breakDuration: 5,
        longBreakDuration: 15,
        sessionsUntilLongBreak: 4,
        notificationsEnabled: true,
        dailyAffirmations: true,
      };
    } catch {
      return {
        workDuration: 25,
        breakDuration: 5,
        longBreakDuration: 15,
        sessionsUntilLongBreak: 4,
        notificationsEnabled: true,
        dailyAffirmations: true,
      };
    }
  },

  saveSettings(settings: AppSettings): void {
    localStorage.setItem('productivity-settings', JSON.stringify(settings));
  },

  getDailyAffirmationShown(): boolean {
    const today = new Date().toDateString();
    return localStorage.getItem('daily-affirmation-shown') === today;
  },

  setDailyAffirmationShown(): void {
    const today = new Date().toDateString();
    localStorage.setItem('daily-affirmation-shown', today);
  }
};