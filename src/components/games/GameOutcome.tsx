import { useState } from 'react';
import GameLayout from '@/components/layout/GameLayout';
import { Trophy, X } from 'lucide-react';

interface GameOutcomeProps {
  onBack: () => void;
}

export default function GameOutcome({ onBack }: GameOutcomeProps) {
  const [result, setResult] = useState<'win' | 'lose' | null>(null);

  const predict = () => {
    const outcome = Math.random() < 0.5 ? 'win' : 'lose';
    setResult(outcome);
  };

  const handleRetry = () => {
    setResult(null);
  };

  return (
    <GameLayout 
      gameName="Game Outcome Predictor" 
      onBack={onBack}
      onRetry={handleRetry}
      showRetry={result !== null}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
          {result && (
            <div className={`text-center mb-8 animate-bounce-in p-8 rounded-2xl ${
              result === 'win' 
                ? 'bg-green-500/20 border-2 border-green-500' 
                : 'bg-red-500/20 border-2 border-red-500'
            }`}>
              {result === 'win' ? (
                <>
                  <Trophy className="w-24 h-24 mx-auto mb-4 text-yellow-400" />
                  <p className="text-4xl font-bold text-green-400 mb-2">
                    Congratulations!
                  </p>
                  <p className="text-3xl text-white">
                    You Win!
                  </p>
                </>
              ) : (
                <>
                  <X className="w-24 h-24 mx-auto mb-4 text-red-400" />
                  <p className="text-4xl font-bold text-red-400 mb-2">
                    Oh no!
                  </p>
                  <p className="text-3xl text-white">
                    You Lose!
                  </p>
                </>
              )}
            </div>
          )}

          <button
            onClick={predict}
            className="btn-primary w-full"
          >
            Predict Outcome
          </button>
        </div>
      </div>
    </GameLayout>
  );
}
