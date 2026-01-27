import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/lib/auth';
import { Trophy, LogOut, User } from 'lucide-react';

interface NavbarProps {
  onShowLeaderboard?: () => void;
  onShowProfile?: () => void;
}

export default function Navbar({ onShowLeaderboard, onShowProfile }: NavbarProps) {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authService.signOut();
      logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <p className="text-white font-semibold">{user.username}</p>
            <p className="text-white/60 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onShowProfile && (
            <button
              onClick={onShowProfile}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Profile"
            >
              <User className="w-5 h-5 text-white" />
            </button>
          )}
          
          {onShowLeaderboard && (
            <button
              onClick={onShowLeaderboard}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Leaderboard"
            >
              <Trophy className="w-5 h-5 text-white" />
            </button>
          )}
          
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>
    </nav>
  );
}
