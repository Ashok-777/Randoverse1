import { useState } from 'react';
import GameLayout from '@/components/layout/GameLayout';
import { COLOR_BALLS } from '@/constants/games';

interface ColorBallProps {
  onBack: () => void;
}

export default function ColorBall({ onBack }: ColorBallProps) {
  const [result, setResult] = useState<typeof COLOR_BALLS[0] | null>(null);

  const drawBall = () => {
    const randomIndex = Math.floor(Math.random() * COLOR_BALLS.length);
    setResult(COLOR_BALLS[randomIndex]);
  };

  const handleRetry = () => {
    setResult(null);
  };

  return (
    <GameLayout 
      gameName="Draw a Random Color Ball" 
      onBack={onBack}
      onRetry={handleRetry}
      showRetry={result !== null}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
          {result && (
            <div className="text-center mb-8 animate-bounce-in">
              <p className="text-3xl font-bold text-green-400 mb-2">
                Congratulations!
              </p>
              <p className="text-2xl text-white">
                You got: <span className="font-bold text-yellow-400">{result.name}</span>
              </p>
            </div>
          )}

          <div className="flex justify-center mb-8">
            {result ? (
              <div 
                className="w-48 h-48 rounded-full shadow-2xl animate-bounce-in border-8 border-white/30"
                style={{ backgroundColor: result.color }}
              ></div>
            ) : (
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-2xl border-8 border-white/30 flex items-center justify-center">
                <span className="text-6xl">?</span>
              </div>
            )}
          </div>

          <button
            onClick={drawBall}
            className="btn-primary w-full"
          >
            Draw Ball
          </button>
        </div>
      </div>
    </GameLayout>
  );
}
