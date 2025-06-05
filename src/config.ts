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
