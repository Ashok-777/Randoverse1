import { useState } from 'react';
import GameLayout from '@/components/layout/GameLayout';
import { WHEEL_PRIZES } from '@/constants/games';

interface SpinWheelProps {
  onBack: () => void;
}

export default function SpinWheel({ onBack }: SpinWheelProps) {
  const [spinsLeft, setSpinsLeft] = useState(3);
  const [result, setResult] = useState<typeof WHEEL_PRIZES[0] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    if (spinsLeft === 0 || isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    const randomIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const prize = WHEEL_PRIZES[randomIndex];
    const targetRotation = rotation + 360 * 5 + (randomIndex * (360 / WHEEL_PRIZES.length));
    
    setRotation(targetRotation);

    setTimeout(() => {
      setResult(prize);
      setSpinsLeft(prev => prev - 1);
      setIsSpinning(false);
    }, 3000);
  };

  const handleRetry = () => {
    setSpinsLeft(3);
    setResult(null);
    setIsSpinning(false);
    setRotation(0);
  };

  return (
    <GameLayout 
      gameName="Spin a Wheel" 
      onBack={onBack}
      onRetry={handleRetry}
      showRetry={spinsLeft === 0}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
          {result && (
            <div className="text-center mb-8 animate-bounce-in">
              <p className="text-3xl font-bold text-green-400 mb-2">
                Congratulations!
              </p>
              <p className="text-2xl text-white mb-2">
                You got: <span className="font-bold text-yellow-400">{result.name}</span>
              </p>
              <p className="text-xl text-purple-300">
                Points: {result.points}
              </p>
              <p className="text-lg text-white/60 mt-2">
                Remaining spins: {spinsLeft}
              </p>
            </div>
          )}

          {spinsLeft === 0 && !result && (
            <div className="text-center mb-8 animate-bounce-in">
              <p className="text-2xl font-bold text-red-400">
                You reached the maximum number of spins. Reset to try again!
              </p>
            </div>
          )}

          {/* Wheel */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div 
                className="w-64 h-64 rounded-full border-8 border-yellow-500 shadow-2xl relative overflow-hidden transition-transform duration-3000 ease-out"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  background: `conic-gradient(${WHEEL_PRIZES.map((p, i) => 
                    `${p.color} ${i * (360 / WHEEL_PRIZES.length)}deg ${(i + 1) * (360 / WHEEL_PRIZES.length)}deg`
                  ).join(', ')})`
                }}
              >
                {WHEEL_PRIZES.map((prize, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 origin-left text-white font-bold text-xs"
                    style={{
                      transform: `rotate(${i * (360 / WHEEL_PRIZES.length) + (360 / WHEEL_PRIZES.length / 2)}deg) translateX(60px)`,
                    }}
                  >
                    {prize.points}
                  </div>
                ))}
              </div>
              
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-16 border-l-transparent border-r-transparent border-t-white"></div>
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-2xl font-bold text-white">
              Spins Left: <span className="text-yellow-400">{spinsLeft}</span>
            </p>
          </div>

          <button
            onClick={spinWheel}
            disabled={isSpinning || spinsLeft === 0}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSpinning ? 'Spinning...' : 'Spin Wheel'}
          </button>
        </div>
      </div>
    </GameLayout>
  );
      }
