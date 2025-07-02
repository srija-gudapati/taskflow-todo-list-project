import React, { useState, useEffect } from 'react';
import { Sparkles, X, RotateCcw } from 'lucide-react';
import { getRandomAffirmation } from '../data/affirmations';
import { storage } from '../utils/storage';
import { Affirmation } from '../types';

export const AffirmationCard: React.FC = () => {
  const [affirmation, setAffirmation] = useState<Affirmation | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!storage.getDailyAffirmationShown()) {
      setAffirmation(getRandomAffirmation());
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    storage.setDailyAffirmationShown();
  };

  const getNewAffirmation = () => {
    setAffirmation(getRandomAffirmation());
  };

  if (!isVisible || !affirmation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-emerald-600 to-blue-600 rounded-xl p-6 max-w-md w-full text-white shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-yellow-300" size={24} />
            <h2 className="text-xl font-semibold">Daily Affirmation</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="text-center mb-6">
          <p className="text-lg font-medium leading-relaxed">
            "{affirmation.text}"
          </p>
          <div className="mt-3">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              {affirmation.category}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={getNewAffirmation}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <RotateCcw size={16} />
            New Quote
          </button>
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 bg-white text-emerald-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Start Day
          </button>
        </div>
      </div>
    </div>
  );
};