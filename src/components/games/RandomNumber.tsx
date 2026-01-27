import { useState } from 'react';
import GameLayout from '@/components/layout/GameLayout';
import { Slider } from '@/components/ui/slider';

interface RandomNumberProps {
  onBack: () => void;
}

export default function RandomNumber({ onBack }: RandomNumberProps) {
  const [maxLimit, setMaxLimit] = useState(50);
  const [result, setResult] = useState<number | null>(null);
  const [usedNumbers, setUsedNumbers] = useState<Set<number>>(new Set());
  const [isExceeded, setIsExceeded] = useState(false);

  const generateNumber = () => {
    if (usedNumbers.size >= maxLimit) {
      setIsExceeded(true);
      return;
    }

    let randomNum: number;
    do {
      randomNum = Math.floor(Math.random() * maxLimit) + 1;
    } while (usedNumbers.has(randomNum));

    setUsedNumbers(prev => new Set([...prev, randomNum]));
    setResult(randomNum);
    setIsExceeded(false);
  };

  const handleRetry = () => {
    setResult(null);
    setUsedNumbers(new Set());
    setIsExceeded(false);
  };

  return (
    <GameLayout 
      gameName="Random Number Generator" 
      onBack={onBack}
      onRetry={handleRetry}
      showRetry={result !== null || isExceeded}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
          {isExceeded ? (
            <div className="text-center mb-8 animate-bounce-in">
              <p className="text-3xl font-bold text-red-400 mb-2">
                Limit Exceeded!
              </p>
              <p className="text-xl text-white">
                You exceeded chosen limit. Click retry to try again!
              </p>
            </div>
          ) : result !== null ? (
            <div className="text-center mb-8 animate-bounce-in">
              <p className="text-3xl font-bold text-green-400 mb-2">
                Congratulations!
              </p>
              <p className="text-2xl text-white">
                You got: <span className="font-bold text-6xl text-yellow-400 block mt-4">{result}</span>
              </p>
            </div>
          ) : null}

          <div className="mb-8">
            <label className="block text-white text-xl font-semibold mb-4 text-center">
              Select Maximum Limit: <span className="text-yellow-400">{maxLimit}</span>
            </label>
            <Slider
              value={[maxLimit]}
              onValueChange={(value) => setMaxLimit(value[0])}
              min={1}
              max={100}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-white/60 text-sm">
              <span>1</span>
              <span>100</span>
            </div>
          </div>

          <button
            onClick={generateNumber}
            className="btn-primary w-full"
          >
            Generate Number
          </button>

          {usedNumbers.size > 0 && (
            <p className="text-center text-white/60 mt-4">
              Numbers used: {usedNumbers.size} / {maxLimit}
            </p>
          )}
        </div>
      </div>
    </GameLayout>
  );
}
