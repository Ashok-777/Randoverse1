import { useState } from 'react';
import GameLayout from '@/components/layout/GameLayout';
import { MOODS } from '@/constants/games';

interface MoodPredictorProps {
  onBack: () => void;
}

export default function MoodPredictor({ onBack }: MoodPredictorProps) {
  const [result, setResult] = useState<typeof MOODS[0] | null>(null);

  const predict = () => {
    const randomIndex = Math.floor(Math.random() * MOODS.length);
    setResult(MOODS[randomIndex]);
  };

  const handleRetry = () => {
    setResult(null);
  };

  return (
    <GameLayout 
      gameName="Mood Predictor" 
      onBack={onBack}
      onRetry={handleRetry}
      showRetry={result !== null}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
          {result ? (
            <div className="text-center mb-8 animate-bounce-in">
              <div className="text-9xl mb-6">{result.emoji}</div>
              <p className="text-3xl font-bold text-purple-400 mb-4">
                You are now:
              </p>
              <p className="text-5xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {result.name}
              </p>
            </div>
          ) : (
            <div className="text-center mb-8">
              <div className="text-9xl mb-6">🤔</div>
              <p className="text-2xl text-white/60">
                What's your mood right now?
              </p>
            </div>
          )}

          <button
            onClick={predict}
            className="btn-primary w-full"
          >
            Predict Mood
          </button>
        </div>
      </div>
    </GameLayout>
  );
}
