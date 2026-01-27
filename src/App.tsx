import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useAuthStore, mapSupabaseUser } from '@/stores/authStore';
import { supabase } from '@/lib/supabase';
import Auth from '@/pages/Auth';
import Home from '@/pages/Home';
import DiceRoll from '@/components/games/DiceRoll';
import CoinToss from '@/components/games/CoinToss';
import RandomNumber from '@/components/games/RandomNumber';
import PersonPicker from '@/components/games/PersonPicker';
import SpinWheel from '@/components/games/SpinWheel';
import ColorBall from '@/components/games/ColorBall';
import GameOutcome from '@/components/games/GameOutcome';
import WeatherPredictor from '@/components/games/WeatherPredictor';
import GenreSelection from '@/components/games/GenreSelection';
import TeamGenerator from '@/components/games/TeamGenerator';
import MoodPredictor from '@/components/games/MoodPredictor';

export default function App() {
  const { user, loading, login, logout, setLoading } = useAuthStore();
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted && session?.user) login(mapSupabaseUser(session.user));
      if (mounted) setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        
        if (event === 'SIGNED_IN' && session?.user) {
          login(mapSupabaseUser(session.user));
          setLoading(false);
        } else if (event === 'SIGNED_OUT') {
          logout();
          setLoading(false);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          login(mapSupabaseUser(session.user));
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleGameSelect = (gameId: string) => {
    setCurrentGame(gameId);
  };

  const handleBackToHome = () => {
    setCurrentGame(null);
  };

  const renderGame = () => {
    switch (currentGame) {
      case 'dice-roll':
        return <DiceRoll onBack={handleBackToHome} />;
      case 'coin-toss':
        return <CoinToss onBack={handleBackToHome} />;
      case 'random-number':
        return <RandomNumber onBack={handleBackToHome} />;
      case 'person-picker':
        return <PersonPicker onBack={handleBackToHome} />;
      case 'spin-wheel':
        return <SpinWheel onBack={handleBackToHome} />;
      case 'color-ball':
        return <ColorBall onBack={handleBackToHome} />;
      case 'game-outcome':
        return <GameOutcome onBack={handleBackToHome} />;
      case 'weather-predictor':
        return <WeatherPredictor onBack={handleBackToHome} />;
      case 'genre-selection':
        return <GenreSelection onBack={handleBackToHome} />;
      case 'team-generator':
        return <TeamGenerator onBack={handleBackToHome} />;
      case 'mood-predictor':
        return <MoodPredictor onBack={handleBackToHome} />;
      default:
        return <Home onGameSelect={handleGameSelect} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Auth />
        <Toaster />
      </>
    );
  }

  return (
    <>
      {renderGame()}
      <Toaster />
    </>
  );
}
