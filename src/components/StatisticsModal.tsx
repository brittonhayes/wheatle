import { X } from 'lucide-react'

interface Stats {
  played: number
  won: number
  currentStreak: number
  bestStreak: number
}

interface StatisticsModalProps {
  stats: Stats
  gameComplete: boolean
  onClose: () => void
  onShareResults: () => void
  onResetStats: () => void
}

export function StatisticsModal({
  stats,
  gameComplete,
  onClose,
  onShareResults,
  onResetStats
}: StatisticsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-xl font-bold text-gray-800">Statistics</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">
              {stats.played}
            </div>
            <div className="text-xs text-gray-600 uppercase">Played</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">
              {stats.played > 0
                ? Math.round((stats.won / stats.played) * 100)
                : 0}
            </div>
            <div className="text-xs text-gray-600 uppercase">Win %</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">
              {stats.currentStreak}
            </div>
            <div className="text-xs text-gray-600 uppercase">
              Current Streak
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">
              {stats.bestStreak}
            </div>
            <div className="text-xs text-gray-600 uppercase">Max Streak</div>
          </div>
        </div>

        {gameComplete && (
          <div className="border-t pt-4">
            <div className="text-center mb-4">
              <div className="text-sm text-gray-600 mb-2">Next Game</div>
              <div className="text-lg font-bold text-gray-800">5:00 AM PST</div>
            </div>
            <button
              onClick={onShareResults}
              className="w-full py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors"
            >
              Share
            </button>
          </div>
        )}

        <div className="border-t pt-4 mt-4">
          <button
            onClick={onResetStats}
            className="w-full py-2 text-red-600 text-sm hover:bg-red-50 rounded transition-colors"
          >
            Reset Statistics
          </button>
        </div>
      </div>
    </div>
  )
}
