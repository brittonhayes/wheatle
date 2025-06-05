import { Info, TrendingUp } from 'lucide-react'

interface HeaderProps {
  onShowHowToPlay: () => void
  onShowStats: () => void
}

export function Header({ onShowHowToPlay, onShowStats }: HeaderProps) {
  return (
    <header className="border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={onShowHowToPlay}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Info className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide text-center">
          THE PRICE IS WHEAT
        </h1>
        <div className="flex gap-2">
          <button
            onClick={onShowStats}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <TrendingUp className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  )
}
