import { useState, useEffect } from 'react';
import { gameScoreService } from '@/lib/gameScores';
import { GAMES } from '@/constants/games';
import { Trophy, Medal, Award, X } from 'lucide-react';

interface LeaderboardProps {
  onClose: () => void;
}

export default function Leaderboard({ onClose }: LeaderboardProps) {
  const [selectedGame, setSelectedGame] = useState(GAMES[0].id);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, [selectedGame]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await gameScoreService.getLeaderboard(selectedGame);
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="text-white/60 font-bold">#{rank}</span>;
  };

  const selectedGameName = GAMES.find(g => g.id === selectedGame)?.name || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-gradient-to-br from-purple-900/95 to-blue-900/95 rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">Leaderboard</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="mb-6">
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {GAMES.map((game) => (
              <option key={game.id} value={game.id} className="bg-gray-900">
                {game.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 max-h-96 overflow-y-auto">
          {loading ? (
            <p className="text-white/60 text-center py-8">Loading...</p>
          ) : leaderboard.length === 0 ? (
            <p className="text-white/60 text-center py-8">
              No scores yet for {selectedGameName}
            </p>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    index < 3
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 flex justify-center">
                      {getRankIcon(index + 1)}
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {entry.user_profiles?.username || 'Unknown Player'}
                      </p>
                      <p className="text-white/60 text-sm">
                        {entry.total_plays} {entry.total_plays === 1 ? 'play' : 'plays'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-400">
                      {entry.best_score}
                    </p>
                    <p className="text-white/60 text-sm">points</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
          }
