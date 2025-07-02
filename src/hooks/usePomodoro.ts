import { useState, useEffect, useRef } from 'react';
import { PomodoroSession, AppSettings } from '../types';
import { storage } from '../utils/storage';

export const usePomodoro = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [currentSession, setCurrentSession] = useState<'work' | 'break'>('work');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [settings, setSettings] = useState<AppSettings>(storage.getSettings());
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      completeSession();
    }
  }, [timeLeft, isActive]);

  const completeSession = () => {
    const sessions = storage.getSessions();
    const newSession: PomodoroSession = {
      id: Date.now().toString(),
      type: currentSession,
      duration: currentSession === 'work' ? settings.workDuration : settings.breakDuration,
      startTime: new Date(Date.now() - (currentSession === 'work' ? settings.workDuration : settings.breakDuration) * 60 * 1000).toISOString(),
      endTime: new Date().toISOString(),
      completed: true
    };
    
    storage.saveSessions([...sessions, newSession]);
    
    if (settings.notificationsEnabled) {
      showNotification();
    }

    if (currentSession === 'work') {
      setSessionsCompleted(prev => prev + 1);
      const isLongBreak = (sessionsCompleted + 1) % settings.sessionsUntilLongBreak === 0;
      setCurrentSession('break');
      setTimeLeft(isLongBreak ? settings.longBreakDuration * 60 : settings.breakDuration * 60);
    } else {
      setCurrentSession('work');
      setTimeLeft(settings.workDuration * 60);
    }
    
    setIsActive(false);
  };

  const showNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(
        currentSession === 'work' ? 'Work Session Complete!' : 'Break Time Over!',
        {
          body: currentSession === 'work' ? 'Time for a break!' : 'Ready to get back to work?',
          icon: '/vite.svg'
        }
      );
    }
  };

  const startTimer = () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(settings.workDuration * 60);
    setCurrentSession('work');
  };

  const skipSession = () => {
    setTimeLeft(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    isActive,
    timeLeft,
    currentSession,
    sessionsCompleted,
    settings,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    formatTime,
    setSettings: (newSettings: AppSettings) => {
      setSettings(newSettings);
      storage.saveSettings(newSettings);
    }
  };
};