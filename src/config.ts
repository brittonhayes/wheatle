import { GuessAccuracyLevels } from './types'

// Constants for localStorage keys
export const STORAGE_KEYS = {
  STATS: 'wheatle-stats',
  LAST_PLAYED: 'wheatle-last-played',
  GAME_STATE: 'wheatle-game-state',
  WHEAT_PRICE_CACHE: 'wheatle-wheat-price-cache'
} as const

// Game configuration
export const GAME_CONFIG = {
  START_DATE: new Date('2025-06-01'),
  MAX_GUESSES: 6,
  SHARE_URL: 'https://thepriceiswheat.netlify.app'
} as const

export const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000

export const GUESS_ACCURACY_LEVELS: GuessAccuracyLevels = {
  EXACT: {
    threshold: 10,
    emoji: '🎯',
    label: 'Exact',
    color: 'bg-green-100',
    borderColor: 'border-green-400'
  },
  CLOSE: {
    threshold: 25,
    emoji: '🌾',
    label: 'Close',
    color: 'bg-yellow-100',
    borderColor: 'border-yellow-400'
  },
  WARM: {
    threshold: 50,
    emoji: '🌱',
    label: 'Warm',
    color: 'bg-orange-100',
    borderColor: 'border-orange-400'
  }
}
