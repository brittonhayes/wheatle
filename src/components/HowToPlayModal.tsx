import { X } from "lucide-react";

interface HowToPlayModalProps {
  onClose: () => void;
}

export function HowToPlayModal({ onClose }: HowToPlayModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-3 z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-sm mx-2 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">How to Play</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-gray-700">
          <div>
            <p className="font-semibold mb-1 text-sm">🎯 Objective</p>
            <p>
              Guess how many bushels of wheat you'd need to sell to buy today's
              item!
            </p>
          </div>

          <div>
            <p className="font-semibold mb-1 text-sm">🎮 Rules</p>
            <ul className="space-y-0.5 list-disc list-outside ml-4 text-xs">
              <li>See an item and its price</li>
              <li>Guess wheat bushels needed</li>
              <li>6 attempts to get it right</li>
              <li>Get hints after each guess</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-1 text-sm">📊 Feedback</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-sm">🎯</span>
                <span>
                  <strong>Exact:</strong> Within 10%
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-sm">🌾</span>
                <span>
                  <strong>Close:</strong> Within 25%
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-sm">🌱</span>
                <span>
                  <strong>Warm:</strong> Within 50%
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-sm">❄️</span>
                <span>
                  <strong>Cold:</strong> More than 50% off
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-1 text-sm">🔄 Arrows</p>
            <p className="text-xs">
              Arrows show if the answer is higher ⬆️ or lower ⬇️.
            </p>
          </div>

          <div className="bg-amber-50 p-2 rounded">
            <p className="font-semibold text-amber-800 text-xs mb-0.5">
              💡 Daily Game
            </p>
            <p className="text-amber-700 text-xs">
              New game daily at 5:00 AM PST with fresh items and wheat prices!
            </p>
            <p className="text-amber-700 text-xs mt-1">
              Wheat prices are based on this month's real commodity price,
              converted to dollars per bushel for the game.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full py-2 bg-amber-600 text-white font-bold rounded-md hover:bg-amber-700 transition-colors text-sm"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
