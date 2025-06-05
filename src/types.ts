export interface Guess {
  value: number
  accuracy: Accuracy
  timestamp: string
}

export interface Stats {
  played: number
  won: number
  currentStreak: number
  bestStreak: number
}

export interface Item {
  id: string
  name: string
  emoji: string
  price: number
  category: string
}

export interface WheatFuturesResponse {
  name: string
  interval: string
  unit: string
  data: WheatFuture[]
}

export interface WheatFuture {
  date: string
  value: string
}

export interface Accuracy {
  emoji: string
  label: string
  color: string
  borderColor: string
  direction: 'higher' | 'lower' | 'exact'
}

// Interfaces
export interface GameState {
  guesses: Guess[]
  complete: boolean
  won: boolean
  date: string
}

export interface SavedGameState {
  guesses: Guess[]
  complete: boolean
  won: boolean
}
