import { GAME_CONFIG, STORAGE_KEYS } from './config'
import {
  Accuracy,
  Guess,
  WheatFuturesResponse,
  Stats,
  Item,
  SavedGameState,
  GameState
} from './types'

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000

export const calculateAccuracy = (
  guessValue: number,
  actualValue: number
): Accuracy => {
  const percentOff = Math.abs((guessValue - actualValue) / actualValue) * 100
  const direction: 'higher' | 'lower' | 'exact' =
    guessValue < actualValue
      ? 'higher'
      : guessValue > actualValue
        ? 'lower'
        : 'exact'

  if (percentOff <= 10)
    return {
      emoji: '🎯',
      label: 'Exact',
      color: 'bg-green-100',
      borderColor: 'border-green-400',
      direction
    }
  if (percentOff <= 25)
    return {
      emoji: '🌾',
      label: 'Close',
      color: 'bg-yellow-100',
      borderColor: 'border-yellow-400',
      direction
    }
  if (percentOff <= 50)
    return {
      emoji: '🌱',
      label: 'Warm',
      color: 'bg-orange-100',
      borderColor: 'border-orange-400',
      direction
    }
  return {
    emoji: '❄️',
    label: 'Cold',
    color: 'bg-blue-100',
    borderColor: 'border-blue-400',
    direction
  }
}

export const getActualBushels = (
  wheatPrice?: number,
  todaysItemPrice?: number
) => {
  if (!wheatPrice || !todaysItemPrice) return 0
  return todaysItemPrice / wheatPrice
}

// Function to fetch wheat price from API with caching
export async function fetchWheatPrice(
  fallbackPrices: number[] = [5.89, 5.75, 6.12, 5.95, 6.03]
): Promise<number> {
  try {
    // Check cache first
    const cached = getFromStorage(STORAGE_KEYS.WHEAT_PRICE_CACHE)
    if (cached) {
      const { price, timestamp } = JSON.parse(cached)
      const now = Date.now()
      if (now - timestamp < ONE_DAY_IN_MILLISECONDS) {
        return price
      }
    }

    const response = await fetch('/.netlify/functions/pullWheatFutures')
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data: WheatFuturesResponse = await response.json()

    // Extract the most recent wheat price from the API response
    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      const mostRecentPrice = data.data[0]?.value
      if (mostRecentPrice && !isNaN(parseFloat(mostRecentPrice))) {
        const price = parseFloat(mostRecentPrice)
        setWheatPriceCache(price, Date.now())

        return price
      }
    }

    throw new Error('Invalid API response format')
  } catch (error) {
    console.error('Failed to fetch wheat price from API:', error)
    // Use fallback price based on current day
    const dayIndex = new Date().getDate() % fallbackPrices.length
    return fallbackPrices[dayIndex] ?? 5.89
  }
}

export function setWheatPriceCache(price: number, timestamp: number) {
  saveToStorage(
    STORAGE_KEYS.WHEAT_PRICE_CACHE,
    JSON.stringify({ price, timestamp })
  )
}

export function getWheatPriceCache(): {
  price: number
  timestamp: number
} | null {
  const cached = getFromStorage(STORAGE_KEYS.WHEAT_PRICE_CACHE)
  if (!cached) return null
  try {
    const { price, timestamp } = JSON.parse(cached)
    return { price, timestamp }
  } catch {
    return null
  }
}

// Pure business logic functions
export function createInitialStats(): Stats {
  return {
    played: 0,
    won: 0,
    currentStreak: 0,
    bestStreak: 0
  }
}

export function calculateUpdatedStats(
  currentStats: Stats,
  won: boolean
): Stats {
  const newStats: Stats = { ...currentStats }
  newStats.played += 1

  if (won) {
    newStats.won += 1
    newStats.currentStreak += 1
    newStats.bestStreak = Math.max(newStats.bestStreak, newStats.currentStreak)
  } else {
    newStats.currentStreak = 0
  }

  return newStats
}

export function calculateDaysSinceStart(
  startDate: Date = GAME_CONFIG.START_DATE
): number {
  const today = new Date()
  return Math.floor(
    (today.getTime() - startDate.getTime()) / ONE_DAY_IN_MILLISECONDS
  )
}

export function calculateGameNumber(
  startDate: Date = GAME_CONFIG.START_DATE
): number {
  return calculateDaysSinceStart(startDate) + 1
}

export function selectTodaysItem(
  items: Item[],
  gameNumber: number = calculateGameNumber()
): Item | null {
  if (items.length === 0) return null
  const itemIndex = (gameNumber - 1) % items.length
  return items[itemIndex] ?? null
}

export function createShareText(
  gameNumber: number,
  guesses: Guess[],
  gameWon: boolean
): string {
  const emojiGrid = guesses.map(g => g.accuracy.emoji).join('')
  const result = gameWon ? guesses.length.toString() : 'X'

  return `The Price Is Wheat #${gameNumber} ${result}/${GAME_CONFIG.MAX_GUESSES}

${emojiGrid}

${GAME_CONFIG.SHARE_URL}`
}

export function isGameComplete(
  guesses: Guess[],
  maxGuesses: number = GAME_CONFIG.MAX_GUESSES
): boolean {
  if (guesses.length >= maxGuesses) return true
  return guesses.some(guess => guess.accuracy.emoji === '🎯')
}

export function isGameWon(guesses: Guess[]): boolean {
  return guesses.some(guess => guess.accuracy.emoji === '🎯')
}

export function isValidGuess(guess: string): {
  isValid: boolean
  value?: number
  error?: string
} {
  if (!guess.trim()) {
    return { isValid: false, error: 'Please enter a number' }
  }

  const value = parseFloat(guess)
  if (isNaN(value)) {
    return { isValid: false, error: 'Please enter a valid number' }
  }

  if (value <= 0) {
    return { isValid: false, error: 'Please enter a positive number' }
  }

  return { isValid: true, value }
}

// Type guards
function isValidStats(data: unknown): data is Stats {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as Record<string, unknown>).played === 'number' &&
    typeof (data as Record<string, unknown>).won === 'number' &&
    typeof (data as Record<string, unknown>).currentStreak === 'number' &&
    typeof (data as Record<string, unknown>).bestStreak === 'number'
  )
}

function isValidGameState(data: unknown): data is SavedGameState {
  return (
    typeof data === 'object' &&
    data !== null &&
    Array.isArray((data as Record<string, unknown>).guesses) &&
    typeof (data as Record<string, unknown>).complete === 'boolean' &&
    typeof (data as Record<string, unknown>).won === 'boolean'
  )
}

// Storage abstraction functions
function getFromStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error(`Failed to get ${key} from localStorage:`, error)
    return null
  }
}

function saveToStorage(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error)
    return false
  }
}

function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Failed to remove ${key} from localStorage:`, error)
    return false
  }
}

// Public API functions (these handle storage and side effects)
export function loadStats(): Stats {
  const saved = getFromStorage(STORAGE_KEYS.STATS)
  if (!saved) return createInitialStats()

  try {
    const parsed = JSON.parse(saved)
    return isValidStats(parsed) ? parsed : createInitialStats()
  } catch {
    return createInitialStats()
  }
}

export function saveStats(stats: Stats): boolean {
  return saveToStorage(STORAGE_KEYS.STATS, JSON.stringify(stats))
}

export function loadGameState(): SavedGameState | null {
  const saved = getFromStorage(STORAGE_KEYS.GAME_STATE)
  if (!saved) return null

  try {
    const parsed = JSON.parse(saved)
    return isValidGameState(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function saveGameState(
  guesses: Guess[],
  complete: boolean,
  won: boolean
): boolean {
  const today = new Date().toDateString()
  const gameState: GameState = { guesses, complete, won, date: today }

  const success = saveToStorage(
    STORAGE_KEYS.GAME_STATE,
    JSON.stringify(gameState)
  )
  if (success) {
    saveToStorage(STORAGE_KEYS.LAST_PLAYED, today)
  }
  return success
}

export function clearAllGameData(): boolean {
  const keys = [
    STORAGE_KEYS.STATS,
    STORAGE_KEYS.LAST_PLAYED,
    STORAGE_KEYS.GAME_STATE
  ]
  return keys.every(key => removeFromStorage(key))
}

export function hasPlayedToday(): boolean {
  const lastPlayed = getFromStorage(STORAGE_KEYS.LAST_PLAYED)
  return lastPlayed === new Date().toDateString()
}

export async function copyTextToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  }

  // Fallback for older browsers
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}
