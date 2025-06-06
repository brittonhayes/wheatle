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
  const createGameGrid = () => {
    const rows = []
    const slotsToShow = gameComplete ? 6 : Math.min(6, guesses.length + 1)

    for (let i = 0; i < slotsToShow; i++) {
      if (i < guesses.length) {
        const guess = guesses[i]
        if (guess !== undefined) {
          rows.push(
            <div key={i} className="grid grid-cols-1 gap-2 mb-2">
              <div
                className={`
                w-full h-18 border ${guess.accuracy.borderColor} ${guess.accuracy.color}
                flex items-center justify-center text-gray-800 font-bold text-lg
                rounded transition-all duration-250 ease-in-out transform scale-100
              `}
              >
                <div className="text-center">
                  <div className="text-md">{guess.accuracy.emoji}</div>
                  <div className="text-sm font-medium text-gray-600">
                    {guess.accuracy.label}
                  </div>
                  <div className="text-sm flex items-center justify-center gap-1 pl-2">
                    {guess.value.toFixed(2)}
                    {guess.accuracy.direction !== 'exact' &&
                      (guess.accuracy.direction === 'higher' ? (
                        <ArrowUp className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-gray-600" />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )
        }
      } else if (i === guesses.length && !gameComplete) {
        rows.push(
          <div key={i} className="grid grid-cols-1 gap-2 mb-2">
            <div className="w-full h-14 border-2 border-gray-200 mt-5 bg-white flex items-center justify-center rounded shadow-sm">
              <input
                type="number"
                step="0.01"
                placeholder="How many bushels of wheat?"
                value={guess}
                onChange={e => onGuessChange(e.target.value)}
                onKeyUp={e => e.key === 'Enter' && onGuessSubmit()}
                className="w-full h-full text-lg text-center bg-transparent border-none px-4 outline-none placeholder-gray-600"
              />
            </div>
          </div>
        )
      }
    }
    return rows
  }

  return <div className="max-w-sm mx-auto mb-4">{createGameGrid()}</div>
}
