import { Guess, Item } from '../types'
import { GAME_CONFIG } from '../config'
import { calculateGameNumber } from './calculations'

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
