import { useState } from 'react';
import GameLayout from '@/components/layout/GameLayout';

interface CoinTossProps {
  onBack: () => void;
}

export default function CoinToss({ onBack }: CoinTossProps) {
  const [result, setResult] = useState<'Heads' | 'Tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);

    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';
      setResult(outcome);
      setIsFlipping(false);
    }, 1000);
  };

  const handleRetry = () => {
    setResult(null);
    setIsFlipping(false);
  };

  return (
    <GameLayout 
      gameName="Toss a Coin" 
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
                You got: <span className="font-bold text-yellow-400">{result}</span>
              </p>
            </div>
          )}

          <div className="flex justify-center mb-8">
            <div className={`relative w-40 h-40 ${isFlipping ? 'animate-spin-3d' : ''}`}>
              <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl flex items-center justify-center border-8 border-yellow-500">
                <span className="text-6xl font-black text-white">
                  {isFlipping ? '?' : result ? (result === 'Heads' ? 'H' : 'T') : '🪙'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={flipCoin}
            disabled={isFlipping}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFlipping ? 'Flipping...' : 'Flip Coin'}
          </button>
        </div>
      </div>
    </GameLayout>
  );
}
