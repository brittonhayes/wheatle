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
  SHARE_URL: 'thepriceiswheat.netlify.app'
} as const

export const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000

export const GUESS_ACCURACY_LEVELS: GuessAccuracyLevels = {
  EXACT: {
    threshold: 10,
    emoji: '🌾',
    label: 'Exact',
    color: 'bg-green-100 dark:bg-green-900',
    borderColor: 'border-green-400 dark:border-green-500',
    isWinCondition: true
  },
  CLOSE: {
    threshold: 25,
    emoji: '🤏',
    label: 'Close',
    color: 'bg-yellow-100 dark:bg-yellow-900',
    borderColor: 'border-yellow-400',
    isWinCondition: false
  },
  WARM: {
    threshold: 50,
    emoji: '🌱',
    label: 'Warm',
    color: 'bg-orange-100 dark:bg-orange-900',
    borderColor: 'border-orange-400 dark:border-orange-500',
    isWinCondition: false
  }
}
