import { Guess } from '../types'

interface InputInterfaceProps {
  guess: string
  guesses: Guess[]
  onGuessSubmit: () => void
}

export function InputInterface({
  guess,
  guesses,
  onGuessSubmit
}: InputInterfaceProps) {
  return (
    <div className="text-center">
      <div className="text-xs text-gray-400 mt-0 mb-4 dark:text-gray-300">
        Type your guess above and press Enter or Submit
      </div>
      <button
        onClick={onGuessSubmit}
        disabled={guess === ''}
        className="px-8 py-2 bg-amber-600 text-white font-bold rounded-md hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors mb-3 dark:bg-amber-500 dark:hover:bg-amber-600 dark:disabled:bg-gray-500"
      >
        SUBMIT
      </button>
      <div className="text-gray-500 text-sm mb-2 dark:text-gray-300">
        {guesses.length}/6 guesses
      </div>
    </div>
  )
}
