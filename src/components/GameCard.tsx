import { Game } from '@/types/game.types';

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative group overflow-hidden
        bg-gradient-to-br ${game.color}
        rounded-2xl p-8 
        aspect-square w-full
        flex flex-col items-center justify-center gap-4
        game-card-hover
        border-2 border-white/10
      `}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
      
      {/* Icon */}
      <div className="text-7xl md:text-8xl transform group-hover:scale-110 transition-transform duration-300 relative z-10">
        {game.icon}
      </div>
      
      {/* Game Name */}
      <h3 className="text-xl md:text-2xl font-bold text-white text-center relative z-10 drop-shadow-lg">
        {game.name}
      </h3>
      
      {/* Hover Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </button>
  );
}
