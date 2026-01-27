import { useState } from 'react';
import GameLayout from '@/components/layout/GameLayout';
import { WEATHER_CONDITIONS } from '@/constants/games';

interface WeatherPredictorProps {
  onBack: () => void;
}

export default function WeatherPredictor({ onBack }: WeatherPredictorProps) {
  const [result, setResult] = useState<typeof WEATHER_CONDITIONS[0] | null>(null);

  const predict = () => {
    const randomIndex = Math.floor(Math.random() * WEATHER_CONDITIONS.length);
    setResult(WEATHER_CONDITIONS[randomIndex]);
  };

  const handleRetry = () => {
    setResult(null);
  };

  return (
    <GameLayout 
      gameName="Predict Weather" 
      onBack={onBack}
      onRetry={handleRetry}
      showRetry={result !== null}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
          {result ? (
            <div className="text-center mb-8 animate-bounce-in">
              <div className="text-9xl mb-6">{result.emoji}</div>
              <p className="text-3xl font-bold text-blue-400 mb-4">
                Tomorrow will be:
              </p>
              <p className="text-4xl font-bold text-white">
                {result.name}
              </p>
            </div>
          ) : (
            <div className="text-center mb-8">
              <div className="text-9xl mb-6">🌍</div>
              <p className="text-2xl text-white/60">
                What will the weather be tomorrow?
              </p>
            </div>
          )}

          <button
            onClick={predict}
            className="btn-primary w-full"
          >
            Predict Weather
          </button>
        </div>
      </div>
    </GameLayout>
  );
}
