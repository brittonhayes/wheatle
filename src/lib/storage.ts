import { Stats, SavedGameState, Guess, GameState } from '../types'
import { STORAGE_KEYS } from '../config'

// Storage abstraction functions
export function getFromStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error(`Failed to get ${key} from localStorage:`, error)
    return null
  }
}

export function saveToStorage(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error)
    return false
  }
}

export function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Failed to remove ${key} from localStorage:`, error)
    return false
  }
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

// Stats storage operations
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

// Game state storage operations
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

// Utility functions
export function createInitialStats(): Stats {
  return {
    played: 0,
    won: 0,
    currentStreak: 0,
    bestStreak: 0
  }
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
