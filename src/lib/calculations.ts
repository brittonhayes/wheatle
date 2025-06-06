import {
  Accuracy,
  AccuracyDirection,
  GuessAccuracyLevels,
  Stats
} from '../types'
import { GAME_CONFIG, ONE_DAY_IN_MILLISECONDS } from '../config'

export const calculateAccuracy = (
  guessValue: number,
  actualValue: number,
  guessAccuracyLevels: GuessAccuracyLevels
): Accuracy => {
  const percentOff = Math.abs((guessValue - actualValue) / actualValue) * 100
  const direction: AccuracyDirection =
    guessValue < actualValue
      ? 'higher'
      : guessValue > actualValue
        ? 'lower'
        : 'exact'

  const level = Object.values(guessAccuracyLevels).find(
    level => percentOff <= level.threshold
  )

  if (level) {
    return {
      ...level,
      direction
    }
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
): number => {
  if (
    wheatPrice === null ||
    wheatPrice === undefined ||
    todaysItemPrice === null ||
    todaysItemPrice === undefined
  ) {
    return 0
  }
  return todaysItemPrice / wheatPrice
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
