import { useState, useEffect } from 'react'
import ITEMS_DATABASE from './data/items'
import { Header } from './components/Header'
import { GameGrid } from './components/GameGrid'
import { InputInterface } from './components/InputInterface'
import { Results } from './components/Results'
import { HowToPlayModal } from './components/HowToPlayModal'
import { StatisticsModal } from './components/StatisticsModal'
import { ToastNotification } from './components/ToastNotification'
import { Guess, Item, Stats } from './types'
import {
  calculateAccuracy,
  fetchWheatPrice,
  getActualBushels,
  saveGameState,
  loadGameState,
  loadStats,
  saveStats,
  calculateUpdatedStats,
  clearAllGameData,
  createShareText,
  copyTextToClipboard,
  createInitialStats,
  calculateGameNumber,
  selectTodaysItem,
  hasPlayedToday,
  isValidGuess,
  isGameComplete,
  isGameWon
} from './lib'
import { GAME_CONFIG } from './config'

export default function WheatleGame() {
  const [wheatPrice, setWheatPrice] = useState<number | undefined>(undefined)
  const [gameNumber, setGameNumber] = useState(1)
  const [todaysItem, setTodaysItem] = useState<Item | null>(null)
  const [guess, setGuess] = useState('')
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [gameComplete, setGameComplete] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [isLoadingPrice, setIsLoadingPrice] = useState(true)
  const [showAnswer, setShowAnswer] = useState(false)
  const [stats, setStats] = useState<Stats>(loadStats)

  // Initialize game on load
  useEffect(() => {
    const currentGameNumber = calculateGameNumber()
    setGameNumber(currentGameNumber)
    setTodaysItem(selectTodaysItem(ITEMS_DATABASE, currentGameNumber))

    // Fetch wheat price from API
    const loadWheatPrice = async () => {
      setIsLoadingPrice(true)
      try {
        const price = await fetchWheatPrice()
        setWheatPrice(price)
      } finally {
        setIsLoadingPrice(false)
      }
    }

    loadWheatPrice()

    // Check if already played today
    if (hasPlayedToday()) {
      const savedState = loadGameState()
      if (savedState) {
        setGuesses(savedState.guesses)
        setGameComplete(savedState.complete)
        setGameWon(savedState.won)
      }
    }
  }, [])

  const showToastMessage = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const handleGuess = () => {
    if (gameComplete || guesses.length >= GAME_CONFIG.MAX_GUESSES) return

    const validation = isValidGuess(guess)
    if (!validation.isValid) {
      showToastMessage(validation.error || 'Invalid guess')
      return
    }

    const guessValue = validation.value!
    const actualBushels = getActualBushels(wheatPrice, todaysItem?.price)
    const guessAccuracy = calculateAccuracy(guessValue, actualBushels)

    const newGuess: Guess = {
      value: guessValue,
      accuracy: guessAccuracy,
      timestamp: new Date().toISOString()
    }

    const newGuesses = [...guesses, newGuess]
    setGuesses(newGuesses)
    setGuess('')

    const complete = isGameComplete(newGuesses)
    const won = isGameWon(newGuesses)

    if (complete) {
      setGameComplete(true)
      setGameWon(won)
      handleGameComplete(won)
      saveGameState(newGuesses, complete, won)
      setTimeout(() => setShowStats(true), 1500)
    }
  }

  const handleGameComplete = (won: boolean) => {
    const newStats = calculateUpdatedStats(stats, won)
    setStats(newStats)
    saveStats(newStats)
  }

  const handleResetStats = () => {
    if (
      confirm(
        'Are you sure you want to reset all statistics? This cannot be undone.'
      )
    ) {
      const success = clearAllGameData()
      if (success) {
        setStats(createInitialStats())
        setGuesses([])
        setGameComplete(false)
        setGameWon(false)
        setShowStats(false)
        showToastMessage('Statistics have been reset!')
      } else {
        showToastMessage('Failed to reset statistics. Please try again.')
      }
    }
  }

  const handleShareResults = async () => {
    try {
      const gameResult = createShareText(gameNumber, guesses, gameWon)
      await copyTextToClipboard(gameResult)
      showToastMessage('Copied results to clipboard')
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      showToastMessage('Failed to copy results')
    }
  }

  if (!todaysItem || wheatPrice === undefined || isLoadingPrice) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isLoadingPrice ? 'Loading wheat prices...' : 'Loading game...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg flex-grow flex flex-col">
        <Header
          onShowHowToPlay={() => setShowHowToPlay(true)}
          onShowStats={() => setShowStats(true)}
        />

        <main className="px-4 py-6 flex-grow">
          <div className="text-center mb-6">
            <div className="inline-flex text-center items-center gap-3 px-6 py-3 rounded-lg">
              <div className="text-center">
                <div className="font-semibold text-gray-800 text-sm">
                  {todaysItem.name}
                </div>
                <span className="text-3xl">{todaysItem.emoji}</span>
                <div className="text-2xl font-bold text-green-600">
                  ${todaysItem.price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <GameGrid
            guesses={guesses}
            guess={guess}
            gameComplete={gameComplete}
            onGuessChange={setGuess}
            onGuessSubmit={handleGuess}
          />

          {!gameComplete && guesses.length < GAME_CONFIG.MAX_GUESSES && (
            <InputInterface
              guess={guess}
              guesses={guesses}
              onGuessSubmit={handleGuess}
            />
          )}

          {gameComplete && (
            <Results
              gameWon={gameWon}
              guesses={guesses}
              gameNumber={gameNumber}
              actualBushels={getActualBushels(wheatPrice, todaysItem.price)}
              showAnswer={showAnswer}
              onShowAnswer={() => setShowAnswer(true)}
              onShareResults={handleShareResults}
              onShowStats={() => setShowStats(true)}
            />
          )}
        </main>

        <footer className="mt-16 text-center text-xs text-gray-400">
          made with 🌾 by{' '}
          <a
            href="https://bsky.app/profile/brittonhayes.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-500"
          >
            @brittonhayes.dev
          </a>
        </footer>
      </div>

      {showHowToPlay && (
        <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
      )}

      {showStats && (
        <StatisticsModal
          stats={stats}
          gameComplete={gameComplete}
          onClose={() => setShowStats(false)}
          onShareResults={handleShareResults}
          onResetStats={handleResetStats}
        />
      )}

      {showToast && <ToastNotification message={toastMessage} />}
    </div>
  )
}
