import { useState } from 'react';
import GameLayout from '@/components/layout/GameLayout';
import { GENRES } from '@/constants/games';
import { Film } from 'lucide-react';

interface GenreSelectionProps {
  onBack: () => void;
}

export default function GenreSelection({ onBack }: GenreSelectionProps) {
  const [result, setResult] = useState<string | null>(null);

  const selectGenre = () => {
    const randomIndex = Math.floor(Math.random() * GENRES.length);
    setResult(GENRES[randomIndex]);
  };

  const handleRetry = () => {
    setResult(null);
  };

  return (
    <GameLayout 
      gameName="Random Genre Selection" 
      onBack={onBack}
      onRetry={handleRetry}
      showRetry={result !== null}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
          {result ? (
            <div className="text-center mb-8 animate-bounce-in">
              <Film className="w-24 h-24 mx-auto mb-6 text-purple-400" />
              <p className="text-3xl font-bold text-green-400 mb-4">
                Your Genre is:
              </p>
              <p className="text-5xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {result}
              </p>
            </div>
          ) : (
            <div className="text-center mb-8">
              <Film className="w-24 h-24 mx-auto mb-6 text-white/40" />
              <p className="text-2xl text-white/60">
                Discover your random genre
              </p>
            </div>
          )}

          <button
            onClick={selectGenre}
            className="btn-primary w-full"
          >
            Choose Genre
          </button>
        </div>
      </div>
    </GameLayout>
  );
}
