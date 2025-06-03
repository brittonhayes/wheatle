import { useState, useEffect } from "react";
import { Share2, TrendingUp, X } from "lucide-react";

// Item database - starting with 20 items as specified in MVP
const ITEMS_DATABASE = [
  {
    id: "starbucks_latte",
    name: "Starbucks Grande Latte",
    emoji: "☕",
    price: 5.25,
    category: "household",
  },
  {
    id: "diesel_gallon",
    name: "Diesel Fuel (1 gallon)",
    emoji: "⛽",
    price: 3.89,
    category: "farm",
  },
  {
    id: "milk_gallon",
    name: "Gallon of Milk",
    emoji: "🥛",
    price: 4.29,
    category: "household",
  },
  {
    id: "seed_corn_bag",
    name: "Seed Corn (80k kernels)",
    emoji: "🌽",
    price: 285.0,
    category: "farm",
  },
  {
    id: "netflix_month",
    name: "Netflix Subscription",
    emoji: "📺",
    price: 15.49,
    category: "household",
  },
  {
    id: "hydraulic_hose",
    name: "Hydraulic Hose (10ft)",
    emoji: "🔧",
    price: 45.99,
    category: "farm",
  },
  {
    id: "bread_loaf",
    name: "Loaf of Bread",
    emoji: "🍞",
    price: 3.49,
    category: "household",
  },
  {
    id: "mcdonalds_meal",
    name: "McDonald's Big Mac Meal",
    emoji: "🍔",
    price: 11.99,
    category: "household",
  },
  {
    id: "fertilizer_ton",
    name: "Urea Fertilizer (per ton)",
    emoji: "🌱",
    price: 485.0,
    category: "farm",
  },
  {
    id: "ribeye_steak",
    name: "Ribeye Steak (1 lb)",
    emoji: "🥩",
    price: 14.99,
    category: "household",
  },
  {
    id: "tractor_tire",
    name: "Tractor Tire (Front)",
    emoji: "🚜",
    price: 1250.0,
    category: "farm",
  },
  {
    id: "gas_fillup",
    name: "Gas Tank Fill-up (15 gal)",
    emoji: "⛽",
    price: 52.35,
    category: "household",
  },
  {
    id: "crop_insurance",
    name: "Crop Insurance (per acre)",
    emoji: "📋",
    price: 28.5,
    category: "farm",
  },
  {
    id: "coffee_beans",
    name: "Coffee Beans (2 lbs)",
    emoji: "☕",
    price: 18.99,
    category: "household",
  },
  {
    id: "grain_elevator_fee",
    name: "Grain Elevator Fee",
    emoji: "🏭",
    price: 125.0,
    category: "farm",
  },
  {
    id: "pizza_large",
    name: "Large Pizza (Casey's)",
    emoji: "🍕",
    price: 16.99,
    category: "household",
  },
  {
    id: "oil_change",
    name: "Tractor Oil Change",
    emoji: "🛢️",
    price: 185.0,
    category: "farm",
  },
  {
    id: "eggs_dozen",
    name: "Dozen Eggs",
    emoji: "🥚",
    price: 4.89,
    category: "household",
  },
  {
    id: "herbicide_gallon",
    name: "Roundup (1 gallon)",
    emoji: "🌿",
    price: 32.99,
    category: "farm",
  },
  {
    id: "chicken_dinner",
    name: "Rotisserie Chicken",
    emoji: "🍗",
    price: 7.99,
    category: "household",
  },
];

// Mock wheat price - in production this would come from Alpha Vantage
const FALLBACK_WHEAT_PRICES = [5.89, 5.75, 6.12, 5.95, 6.03]; // Historical prices for fallback

interface Guess {
  value: number;
  accuracy: {
    emoji: string;
    label: string;
    color: string;
    borderColor: string;
  };
  timestamp: string;
}

interface Stats {
  played: number;
  won: number;
  currentStreak: number;
  bestStreak: number;
}

interface Item {
  id: string;
  name: string;
  emoji: string;
  price: number;
  category: string;
}

export default function WheatleGame() {
  const [wheatPrice] = useState(() => {
    // Use a different fallback price each day if API fails
    const dayIndex = new Date().getDate() % FALLBACK_WHEAT_PRICES.length;
    return FALLBACK_WHEAT_PRICES[dayIndex] ?? 5.89;
  });
  const [gameNumber, setGameNumber] = useState(1);
  const [todaysItem, setTodaysItem] = useState<Item | null>(null);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [stats, setStats] = useState<Stats>(() => {
    const saved = localStorage.getItem("wheatle-stats");
    return saved
      ? JSON.parse(saved)
      : {
          played: 0,
          won: 0,
          currentStreak: 0,
          bestStreak: 0,
        };
  });

  // Initialize game on load
  useEffect(() => {
    const today = new Date();
    const startDate = new Date("2025-06-01");
    const daysSince = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    setGameNumber(daysSince + 1);

    // Select item based on date seed
    const itemIndex = daysSince % ITEMS_DATABASE.length;
    setTodaysItem(ITEMS_DATABASE[itemIndex] ?? null);

    // Check if already played today
    const lastPlayed = localStorage.getItem("wheatle-last-played");
    if (lastPlayed === today.toDateString()) {
      const savedState = localStorage.getItem("wheatle-game-state");
      if (savedState) {
        const state = JSON.parse(savedState);
        setGuesses(state.guesses);
        setGameComplete(state.complete);
        setGameWon(state.won);
      }
    }
  }, []);

  const calculateAccuracy = (guessValue: number, actualValue: number) => {
    const percentOff = Math.abs((guessValue - actualValue) / actualValue) * 100;
    if (percentOff <= 5)
      return {
        emoji: "🎯",
        label: "Exact!",
        color: "bg-green-100",
        borderColor: "border-green-400",
      };
    if (percentOff <= 15)
      return {
        emoji: "🌾",
        label: "Close!",
        color: "bg-yellow-100",
        borderColor: "border-yellow-400",
      };
    if (percentOff <= 30)
      return {
        emoji: "🌱",
        label: "Warm",
        color: "bg-orange-100",
        borderColor: "border-orange-400",
      };
    return {
      emoji: "❄️",
      label: "Cold",
      color: "bg-gray-100",
      borderColor: "border-gray-400",
    };
  };

  // Calculate answer only when needed, not stored in state
  const getActualBushels = () => {
    if (!todaysItem || !wheatPrice) return 0;
    return todaysItem.price / wheatPrice;
  };

  const handleGuess = () => {
    if (!guess || gameComplete || guesses.length >= 6) return;

    const guessValue = parseFloat(guess);
    if (isNaN(guessValue) || guessValue <= 0) {
      alert("Please enter a valid number of bushels");
      return;
    }

    const actualBushels = getActualBushels();
    const accuracy = calculateAccuracy(guessValue, actualBushels);

    const newGuess: Guess = {
      value: guessValue,
      accuracy,
      timestamp: new Date().toISOString(),
    };

    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    setGuess("");

    const isWin = accuracy.emoji === "🎯";
    const isComplete = newGuesses.length >= 6 || isWin;

    if (isComplete) {
      setGameComplete(true);
      setGameWon(isWin);
      updateStats(isWin);
      saveGameState(newGuesses, isComplete, isWin);
      setTimeout(() => setShowStats(true), 1500);
    }
  };

  const updateStats = (won: boolean) => {
    const newStats = { ...stats };
    newStats.played += 1;
    if (won) {
      newStats.won += 1;
      newStats.currentStreak += 1;
      newStats.bestStreak = Math.max(
        newStats.bestStreak,
        newStats.currentStreak
      );
    } else {
      newStats.currentStreak = 0;
    }
    setStats(newStats);
    localStorage.setItem("wheatle-stats", JSON.stringify(newStats));
  };

  const saveGameState = (guesses: Guess[], complete: boolean, won: boolean) => {
    const today = new Date().toDateString();
    localStorage.setItem("wheatle-last-played", today);
    localStorage.setItem(
      "wheatle-game-state",
      JSON.stringify({
        guesses,
        complete,
        won,
        date: today,
      })
    );
  };

  const resetStats = () => {
    if (
      confirm(
        "Are you sure you want to reset all statistics? This cannot be undone."
      )
    ) {
      localStorage.removeItem("wheatle-stats");
      localStorage.removeItem("wheatle-last-played");
      localStorage.removeItem("wheatle-game-state");
      setStats({
        played: 0,
        won: 0,
        currentStreak: 0,
        bestStreak: 0,
      });
      setGuesses([]);
      setGameComplete(false);
      setGameWon(false);
      setShowStats(false);
      alert("Statistics have been reset!");
    }
  };

  const shareResults = () => {
    const emojiGrid = guesses.map((g) => g.accuracy.emoji).join("");
    const gameResult = `The Price Is Wheat #${gameNumber} ${
      gameWon ? guesses.length : "X"
    }/6\n\n${emojiGrid}`;

    navigator.clipboard
      .writeText(gameResult)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = gameResult;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      });
  };

  // Create empty rows for the grid (like Wordle)
  const createGameGrid = () => {
    const rows = [];
    for (let i = 0; i < 6; i++) {
      if (i < guesses.length) {
        // Filled row with guess
        const guess = guesses[i];
        if (guess) {
          rows.push(
            <div key={i} className="grid grid-cols-1 gap-2 mb-2">
              <div
                className={`
                w-full h-16 border-2 ${guess.accuracy.borderColor} ${guess.accuracy.color}
                flex items-center justify-center text-gray-800 font-bold text-lg
                rounded transition-all duration-500 transform scale-100
              `}
              >
                <div className="text-center">
                  <div className="text-xl">{guess.accuracy.emoji}</div>
                  <div className="text-sm">{guess.value.toFixed(2)}</div>
                </div>
              </div>
            </div>
          );
        }
      } else {
        // Empty row
        rows.push(
          <div key={i} className="grid grid-cols-1 gap-2 mb-2">
            <div className="w-full h-16 border-2 border-gray-200 flex items-center justify-center rounded">
              <div className="text-gray-400 text-sm">
                {i === guesses.length && !gameComplete ? "Next guess..." : ""}
              </div>
            </div>
          </div>
        );
      }
    }
    return rows;
  };

  if (!todaysItem)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg">
        {/* Header - Wordle style */}
        <header className="border-b border-gray-200 ">
          <div className="flex items-center justify-between">
            <div></div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-wide text-center">
              THE PRICE IS WHEAT
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowStats(true)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <TrendingUp className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Game Content */}
        <main className="px-4 py-6">
          {/* Item Display - Compact like Wordle */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 bg-amber-50 px-6 py-3 rounded-lg border border-amber-200">
              <span className="text-3xl">{todaysItem.emoji}</span>
              <div className="text-left">
                <div className="font-semibold text-gray-800 text-sm">
                  {todaysItem.name}
                </div>
                <div className="text-2xl font-bold text-green-600">
                  ${todaysItem.price.toFixed(2)}
                </div>
              </div>
            </div>
            <p className="text-gray-600 mt-2 text-sm">
              How many bushels of wheat?
            </p>
          </div>

          {/* Game Grid - Wordle style */}
          <div className="max-w-sm mx-auto mb-6">{createGameGrid()}</div>

          {/* Input Interface - Only show if game not complete */}
          {!gameComplete && (
            <div className="max-w-xs mx-auto">
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyUp={(e) => e.key === "Enter" && handleGuess()}
                  className="flex-1 px-4 py-3 text-lg text-center border-2 border-gray-300 rounded-md focus:outline-none focus:border-amber-500 transition-colors"
                  disabled={guesses.length >= 6}
                />
                <button
                  onClick={handleGuess}
                  disabled={guesses.length >= 6 || !guess}
                  className="px-6 py-3 bg-amber-600 text-white font-bold rounded-md hover:bg-amber-700 disabled:bg-gray-300 transition-colors"
                >
                  ENTER
                </button>
              </div>
              <div className="text-center">
                <span className="text-gray-500 text-sm">
                  {guesses.length}/6 guesses
                </span>
              </div>
            </div>
          )}

          {/* Results - Wordle style */}
          {gameComplete && (
            <div className="text-center space-y-4 mt-8">
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  {gameWon ? "🎉 Well done!" : "😔 Better luck tomorrow!"}
                </h3>
                <div className="text-lg text-gray-700 mb-2">
                  The answer was{" "}
                  <span className="font-bold text-amber-600">
                    {getActualBushels().toFixed(2)} bushels
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  The Price Is Wheat #{gameNumber} •{" "}
                  {gameWon ? guesses.length : "X"}/6
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={shareResults}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={() => setShowStats(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  Stats
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Statistics Modal - Wordle style */}
      {showStats && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-xl font-bold text-gray-800">Statistics</h2>
              <button
                onClick={() => setShowStats(false)}
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
                <div className="text-xs text-gray-600 uppercase">
                  Max Streak
                </div>
              </div>
            </div>

            {gameComplete && (
              <div className="border-t pt-4">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600 mb-2">Next Wheatle</div>
                  <div className="text-lg font-bold text-gray-800">
                    6:00 AM CT
                  </div>
                </div>
                <button
                  onClick={shareResults}
                  className="w-full py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors"
                >
                  Share
                </button>
              </div>
            )}

            <div className="border-t pt-4 mt-4">
              <button
                onClick={resetStats}
                className="w-full py-2 text-red-600 text-sm hover:bg-red-50 rounded transition-colors"
              >
                Reset Statistics
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50">
          Copied results to clipboard
        </div>
      )}
    </div>
  );
}
