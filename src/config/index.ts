export const GAME_CONFIG = {
  MAX_GUESSES: 6,
  START_DATE: new Date('2024-01-01'),
  SHARE_URL: 'https://wheatle.netlify.app'
} as const

export const STORAGE_KEYS = {
  STATS: 'wheatle-stats',
  LAST_PLAYED: 'wheatle-last-played',
  GAME_STATE: 'wheatle-game-state',
  WHEAT_PRICE_CACHE: 'wheatle-wheat-price-cache'
} as const

export const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000
