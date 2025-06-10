import { ArrowUp, ArrowDown } from 'lucide-react'

interface Guess {
  value: number
  accuracy: {
    emoji: string
    label: string
    color: string
    borderColor: string
    direction: 'higher' | 'lower' | 'exact'
  }
  timestamp: string
}

interface GameGridProps {
  guesses: Guess[]
  guess: string
  gameComplete: boolean
  onGuessChange: (value: string) => void
  onGuessSubmit: () => void
}

export function GameGrid({
  guesses,
  guess,
  gameComplete,
  onGuessChange,
  onGuessSubmit
}: GameGridProps) {
  const maxGuesses = 6

  const createGameGrid = () => {
    const squares = []

    // Create squares for each slot
    for (let i = 0; i < maxGuesses; i++) {
      if (i < guesses.length) {
        // Filled square with guess result
        const guessData = guesses[i]
        if (guessData !== undefined) {
          squares.push(
            <div
              key={i}
              className={`
                w-16 h-16 border-2 ${guessData.accuracy.borderColor} ${guessData.accuracy.color}
                flex flex-col items-center justify-center rounded transition-all duration-250 ease-in-out
              `}
            >
              <div className="text-lg">{guessData.accuracy.emoji}</div>
              <div className="text-xs flex items-center gap-0.5 dark:text-white">
                {guessData.value.toFixed(2)}
                {guessData.accuracy.direction !== 'exact' &&
                  (guessData.accuracy.direction === 'higher' ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  ))}
              </div>
            </div>
          )
        }
      } else {
        // Empty dashed square for future guesses
        squares.push(
          <div
            key={i}
            className="w-16 h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800"
          />
        )
      }
    }

    return squares
  }

  return (
    <div className="max-w-sm mx-auto mb-4">
      {/* Grid of guess squares */}
      <div className="grid grid-cols-6 gap-2 mb-4">{createGameGrid()}</div>

      {/* Input field for current guess (only show if game not complete) */}
      {!gameComplete && (
        <div className="w-full h-14 border-2 border-gray-200 dark:border-gray-500 bg-white dark:bg-black flex items-center justify-center rounded shadow-sm">
          <input
            type="number"
            step="0.01"
            placeholder="How many bushels of wheat?"
            value={guess}
            onChange={e => onGuessChange(e.target.value)}
            onKeyUp={e => e.key === 'Enter' && onGuessSubmit()}
            className="w-full h-full text-lg text-center bg-transparent border-none px-4 outline-none placeholder-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
          />
        </div>
      )}
    </div>
  )
}
