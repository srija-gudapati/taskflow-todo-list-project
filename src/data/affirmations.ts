import { Affirmation } from '../types';

export const affirmations: Affirmation[] = [
  {
    id: '1',
    text: 'I am capable of achieving great things today.',
    category: 'confidence'
  },
  {
    id: '2',
    text: 'Every task I complete brings me closer to my goals.',
    category: 'motivation'
  },
  {
    id: '3',
    text: 'I focus on progress, not perfection.',
    category: 'mindset'
  },
  {
    id: '4',
    text: 'I have the power to create positive change in my life.',
    category: 'empowerment'
  },
  {
    id: '5',
    text: 'Today is full of possibilities and opportunities.',
    category: 'optimism'
  },
  {
    id: '6',
    text: 'I embrace challenges as opportunities to grow.',
    category: 'growth'
  },
  {
    id: '7',
    text: 'My productivity flows naturally and effortlessly.',
    category: 'productivity'
  },
  {
    id: '8',
    text: 'I am organized, focused, and ready to succeed.',
    category: 'focus'
  },
  {
    id: '9',
    text: 'Each moment is a fresh start to make great choices.',
    category: 'renewal'
  },
  {
    id: '10',
    text: 'I celebrate small wins and progress every day.',
    category: 'celebration'
  },
  {
    id: '11',
    text: 'I am resilient and can overcome any challenge.',
    category: 'resilience'
  },
  {
    id: '12',
    text: 'My time is valuable and I use it wisely.',
    category: 'time'
  }
];

export const getRandomAffirmation = (): Affirmation => {
  return affirmations[Math.floor(Math.random() * affirmations.length)];
};