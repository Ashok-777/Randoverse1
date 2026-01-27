import { Game } from '@/types/game.types';

export const GAMES: Game[] = [
  {
    id: 'dice-roll',
    name: 'Roll a Dice',
    icon: '🎲',
    description: 'Roll one or two dice and get random results',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'coin-toss',
    name: 'Toss a Coin',
    icon: '🪙',
    description: 'Flip a coin - Heads or Tails',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'random-number',
    name: 'Random Number',
    icon: '🔢',
    description: 'Generate random numbers within a range',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'person-picker',
    name: 'Person Picker',
    icon: '👥',
    description: 'Randomly select or eliminate people',
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 'spin-wheel',
    name: 'Spin a Wheel',
    icon: '🎡',
    description: 'Spin the prize wheel and win rewards',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'color-ball',
    name: 'Draw Color Ball',
    icon: '⚽',
    description: 'Draw a random colored ball',
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 'game-outcome',
    name: 'Game Outcome',
    icon: '🎮',
    description: 'Predict if you will win or lose',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'weather-predictor',
    name: 'Weather Predictor',
    icon: '🌤️',
    description: 'Predict tomorrow\'s random weather',
    color: 'from-sky-500 to-blue-500',
  },
  {
    id: 'genre-selection',
    name: 'Genre Selection',
    icon: '🎬',
    description: 'Randomly select a genre',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'team-generator',
    name: 'Team Generator',
    icon: '⚽',
    description: 'Generate random teams from names',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'mood-predictor',
    name: 'Mood Predictor',
    icon: '😊',
    description: 'Detect your current mood randomly',
    color: 'from-fuchsia-500 to-purple-500',
  },
];

export const MOODS = [
  { name: 'Happy', emoji: '😊' },
  { name: 'Excited', emoji: '🤩' },
  { name: 'Calm', emoji: '😌' },
  { name: 'Energetic', emoji: '⚡' },
  { name: 'Thoughtful', emoji: '🤔' },
  { name: 'Creative', emoji: '🎨' },
  { name: 'Relaxed', emoji: '😎' },
  { name: 'Adventurous', emoji: '🚀' },
  { name: 'Focused', emoji: '🎯' },
  { name: 'Playful', emoji: '🎈' },
];

export const WEATHER_CONDITIONS = [
  { name: 'Sunny', emoji: '☀️' },
  { name: 'Cloudy', emoji: '☁️' },
  { name: 'Rainy', emoji: '🌧️' },
  { name: 'Stormy', emoji: '⛈️' },
  { name: 'Snowy', emoji: '❄️' },
  { name: 'Windy', emoji: '💨' },
  { name: 'Foggy', emoji: '🌫️' },
  { name: 'Partly Cloudy', emoji: '⛅' },
];

export const GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
  'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Western', 'Animation',
  'Documentary', 'Musical', 'Crime', 'War', 'Historical', 'Sports',
];

export const COLOR_BALLS = [
  { name: 'Red', color: '#EF4444' },
  { name: 'Blue', color: '#3B82F6' },
  { name: 'Green', color: '#10B981' },
  { name: 'Yellow', color: '#F59E0B' },
  { name: 'Purple', color: '#A855F7' },
  { name: 'Orange', color: '#F97316' },
  { name: 'Pink', color: '#EC4899' },
  { name: 'Cyan', color: '#06B6D4' },
];

export const WHEEL_PRIZES = [
  { name: 'Bronze Prize', points: 10, color: '#CD7F32' },
  { name: 'Silver Prize', points: 25, color: '#C0C0C0' },
  { name: 'Gold Prize', points: 50, color: '#FFD700' },
  { name: 'Diamond Prize', points: 100, color: '#B9F2FF' },
  { name: 'Platinum Prize', points: 200, color: '#E5E4E2' },
  { name: 'Legendary Prize', points: 500, color: '#FF6B35' },
];
