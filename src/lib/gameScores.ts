import { supabase } from './supabase';

export interface GameScore {
  game_id: string;
  score: number;
  game_data?: any;
}

export class GameScoreService {
  async saveScore(userId: string, gameScore: GameScore) {
    // Insert score
    const { error: scoreError } = await supabase
      .from('game_scores')
      .insert({
        user_id: userId,
        game_id: gameScore.game_id,
        score: gameScore.score,
        game_data: gameScore.game_data,
      });

    if (scoreError) throw scoreError;

    // Update or insert leaderboard
    const { data: existingRecord } = await supabase
      .from('leaderboards')
      .select('*')
      .eq('user_id', userId)
      .eq('game_id', gameScore.game_id)
      .single();

    if (existingRecord) {
      // Update if new score is better (higher)
      if (gameScore.score > existingRecord.best_score) {
        const { error: updateError } = await supabase
          .from('leaderboards')
          .update({
            best_score: gameScore.score,
            total_plays: existingRecord.total_plays + 1,
            last_played_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingRecord.id);

        if (updateError) throw updateError;
      } else {
        // Just increment plays
        const { error: updateError } = await supabase
          .from('leaderboards')
          .update({
            total_plays: existingRecord.total_plays + 1,
            last_played_at: new Date().toISOString(),
          })
          .eq('id', existingRecord.id);

        if (updateError) throw updateError;
      }
    } else {
      // Insert new leaderboard entry
      const { error: insertError } = await supabase
        .from('leaderboards')
        .insert({
          user_id: userId,
          game_id: gameScore.game_id,
          best_score: gameScore.score,
          total_plays: 1,
        });

      if (insertError) throw insertError;
    }

    // Update user stats
    await this.updateUserStats(userId, gameScore.game_id);
  }

  async updateUserStats(userId: string, gameId: string) {
    const { data: stats } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (stats) {
      const { error } = await supabase
        .from('user_stats')
        .update({
          total_games_played: stats.total_games_played + 1,
          favorite_game: gameId,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('user_stats')
        .insert({
          user_id: userId,
          total_games_played: 1,
          favorite_game: gameId,
        });

      if (error) throw error;
    }
  }

  async getLeaderboard(gameId: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('leaderboards')
      .select(`
        *,
        user_profiles (username, email)
      `)
      .eq('game_id', gameId)
      .order('best_score', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  async getUserStats(userId: string) {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
}

export const gameScoreService = new GameScoreService();
