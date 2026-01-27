import { useState } from 'react';
import { GAMES } from '@/constants/games';
import GameCard from '@/components/GameCard';
import Navbar from '@/components/layout/Navbar';
import Leaderboard from '@/components/leaderboard/Leaderboard';

interface HomeProps {
  onGameSelect: (gameId: string) => void;
}

export default function Home({ onGameSelect }: HomeProps) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div className="min-h-screen animated-gradient relative overflow-hidden">
      <Navbar onShowLeaderboard={() => setShowLeaderboard(true)} />
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 pt-24">
        {/* Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-2xl animate-pulse-glow">
            RandoVerse
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-medium">
            Enter the Universe of Random Games
          </p>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto animate-slide-up">
          {GAMES.map((game, index) => (
            <div
              key={game.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <GameCard game={game} onClick={() => onGameSelect(game.id)} />
            </div>
          ))}
        </div>
      </div>

      {showLeaderboard && (
        <Leaderboard onClose={() => setShowLeaderboard(false)} />
      )}
    </div>
  );
          }
