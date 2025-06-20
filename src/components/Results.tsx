import { Copy, TrendingUp } from 'lucide-react'
import { Guess } from '../types'

interface ResultsProps {
  gameWon: boolean
  guesses: Guess[]
  gameNumber: number
  actualBushels: number
  showAnswer: boolean
  onShowAnswer: () => void
  onShareResults: () => void
  onShowStats: () => void
}

export function Results({
  gameWon,
  guesses,
  gameNumber,
  actualBushels,
  showAnswer,
  onShowAnswer,
  onShareResults,
  onShowStats
}: ResultsProps) {
  return (
    <div className="text-center space-y-4 mt-8">
      <div className="rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
          {gameWon ? '🎉 Well done!' : '😔 Better luck tomorrow!'}
        </h3>
        {gameWon && (
          <div className="text-lg text-gray-700 mb-2 dark:text-gray-300">
            The answer was{' '}
            <span className="font-bold text-amber-600">
              {actualBushels.toFixed(2)} bushels
            </span>
          </div>
        )}
        {!gameWon && (
          <div className="mb-4">
            {!showAnswer ? (
              <button
                onClick={onShowAnswer}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                🔍 Reveal Answer
              </button>
            ) : (
              <div className="text-lg text-gray-700 dark:text-gray-300">
                The answer was&nbsp;
                <span className="font-bold text-amber-600">
                  {actualBushels.toFixed(2)} bushels
                </span>
              </div>
            )}
          </div>
        )}
        <div className="text-sm text-gray-500 dark:text-gray-300">
          The Price Is Wheat #{gameNumber} • {gameWon ? guesses.length : 'X'}/6
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={onShareResults}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors dark:bg-green-600 dark:hover:bg-green-800 dark:text-white"
        >
          <Copy className="w-4 h-4" />
          Share
        </button>
        <button
          onClick={onShowStats}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors dark:bg-blue-600 dark:hover:bg-blue-800 dark:text-white"
        >
          <TrendingUp className="w-4 h-4" />
          Stats
        </button>
      </div>
    </div>
  )
}
