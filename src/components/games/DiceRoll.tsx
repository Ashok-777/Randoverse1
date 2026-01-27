import { useState } from 'react';
import GameLayout from '@/components/layout/GameLayout';
import { Dices } from 'lucide-react';

interface DiceRollProps {
  onBack: () => void;
}

export default function DiceRoll({ onBack }: DiceRollProps) {
  const [diceCount, setDiceCount] = useState<1 | 2 | null>(null);
  const [result, setResult] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (!diceCount) return;
    
    setIsRolling(true);
    setResult([]);

    setTimeout(() => {
      const results: number[] = [];
      for (let i = 0; i < diceCount; i++) {
        results.push(Math.floor(Math.random() * 6) + 1);
      }
      setResult(results);
      setIsRolling(false);
    }, 1000);
  };

  const handleRetry = () => {
    setDiceCount(null);
    setResult([]);
    setIsRolling(false);
  };

  const renderDiceFace = (value: number) => {
    const dots = Array(value).fill(0);
    return (
      <div className="w-24 h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center relative border-4 border-gray-200">
        <div className={`grid gap-2 ${value === 1 ? 'grid-cols-1' : value <= 3 ? 'grid-cols-1' : value === 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {dots.map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-800 rounded-full"></div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <GameLayout 
      gameName="Roll a Dice" 
      onBack={onBack}
      onRetry={handleRetry}
      showRetry={result.length > 0}
    >
      <div className="max-w-2xl mx-auto">
        {!diceCount ? (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Choose number of dice
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => setDiceCount(1)}
                className="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <Dices className="w-16 h-16 mx-auto mb-4" />
                <p className="text-2xl font-bold">1 Dice</p>
              </button>
              
              <button
                onClick={() => setDiceCount(2)}
                className="flex-1 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <div className="flex justify-center gap-2 mb-4">
                  <Dices className="w-12 h-12" />
                  <Dices className="w-12 h-12" />
                </div>
                <p className="text-2xl font-bold">2 Dice</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
            <div className="flex justify-center gap-6 mb-8">
              {isRolling ? (
                <div className="flex gap-6">
                  {Array(diceCount).fill(0).map((_, i) => (
                    <div key={i} className="w-24 h-24 bg-white rounded-2xl animate-spin-3d"></div>
                  ))}
                </div>
              ) : result.length > 0 ? (
                <div className="flex gap-6">
                  {result.map((value, i) => (
                    <div key={i} className="animate-bounce-in" style={{ animationDelay: `${i * 0.1}s` }}>
                      {renderDiceFace(value)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-6">
                  {Array(diceCount).fill(0).map((_, i) => (
                    <div key={i} className="w-24 h-24 bg-white/20 rounded-2xl"></div>
                  ))}
                </div>
              )}
            </div>

            {result.length > 0 && (
              <div className="text-center mb-8 animate-bounce-in">
                <p className="text-3xl font-bold text-green-400 mb-2">
                  Congratulations!
                </p>
                <p className="text-2xl text-white">
                  You got: <span className="font-bold text-yellow-400">{result.reduce((a, b) => a + b, 0)}</span>
                </p>
              </div>
            )}

            <button
              onClick={rollDice}
              disabled={isRolling}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRolling ? 'Rolling...' : 'Roll Dice'}
            </button>
          </div>
        )}
      </div>
    </GameLayout>
  );
                  }
