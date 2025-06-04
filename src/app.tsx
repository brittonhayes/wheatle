import { useState, useEffect } from "react";
import {
  Share2,
  TrendingUp,
  X,
  ChevronUp,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Info,
} from "lucide-react";
import ITEMS_DATABASE from "./data/items";

// Fallback wheat prices in case API fails
const FALLBACK_WHEAT_PRICES = [5.89, 5.75, 6.12, 5.95, 6.03];

interface Guess {
  value: number;
  accuracy: {
    emoji: string;
    label: string;
    color: string;
    borderColor: string;
    direction: "higher" | "lower" | "exact";
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

interface WheatFuturesResponse {
  data: Array<{
    date: string;
    value: string;
  }>;
  unit: string;
  name: string;
}

// Function to fetch wheat price from API with caching
async function fetchWheatPrice(): Promise<number> {
  const CACHE_KEY = "wheatle-wheat-price-cache";
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  try {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { price, timestamp } = JSON.parse(cached);
      const now = Date.now();

      // If cache is less than 24 hours old, use cached price
      if (now - timestamp < CACHE_DURATION) {
        return price;
      }
    }

    const response = await fetch("/.netlify/functions/pullWheatFutures");

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: WheatFuturesResponse = await response.json();

    // Extract the most recent wheat price from the API response
    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      const mostRecentPrice = data.data[0]?.value;
      if (mostRecentPrice && !isNaN(parseFloat(mostRecentPrice))) {
        const price = parseFloat(mostRecentPrice);

        // Cache the price with timestamp
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            price,
            timestamp: Date.now(),
          })
        );

        return price;
      }
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Failed to fetch wheat price from API:", error);
    // Use fallback price based on current day
    const dayIndex = new Date().getDate() % FALLBACK_WHEAT_PRICES.length;
    return FALLBACK_WHEAT_PRICES[dayIndex] ?? 5.89;
  }
}

export default function WheatleGame() {
  const [wheatPrice, setWheatPrice] = useState<number | null>(null);
  const [gameNumber, setGameNumber] = useState(1);
  const [todaysItem, setTodaysItem] = useState<Item | null>(null);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
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

    // Fetch wheat price from API
    const loadWheatPrice = async () => {
      setIsLoadingPrice(true);
      try {
        const price = await fetchWheatPrice();
        setWheatPrice(price);
      } finally {
        setIsLoadingPrice(false);
      }
    };

    loadWheatPrice();

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

  const calculateAccuracy = (
    guessValue: number,
    actualValue: number
  ): {
    emoji: string;
    label: string;
    color: string;
    borderColor: string;
    direction: "higher" | "lower" | "exact";
  } => {
    const percentOff = Math.abs((guessValue - actualValue) / actualValue) * 100;
    const direction: "higher" | "lower" | "exact" =
      guessValue < actualValue
        ? "higher"
        : guessValue > actualValue
        ? "lower"
        : "exact";

    if (percentOff <= 10)
      return {
        emoji: "🎯",
        label: "Exact",
        color: "bg-green-100",
        borderColor: "border-green-400",
        direction,
      };
    if (percentOff <= 25)
      return {
        emoji: "🌾",
        label: "Close",
        color: "bg-yellow-100",
        borderColor: "border-yellow-400",
        direction,
      };
    if (percentOff <= 50)
      return {
        emoji: "🌱",
        label: "Warm",
        color: "bg-orange-100",
        borderColor: "border-orange-400",
        direction,
      };
    return {
      emoji: "❄️",
      label: "Cold",
      color: "bg-blue-100",
      borderColor: "border-blue-400",
      direction,
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
    }/6

${emojiGrid}

https://thepriceiswheat.netlify.app`;

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
    // Only show slots up to current guess + 1 (for input), or all if game is complete
    const slotsToShow = gameComplete ? 6 : Math.min(6, guesses.length + 1);

    for (let i = 0; i < slotsToShow; i++) {
      if (i < guesses.length) {
        // Filled row with guess
        const guess = guesses[i];
        if (guess) {
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
                    {guess.accuracy.direction !== "exact" &&
                      (guess.accuracy.direction === "higher" ? (
                        <ArrowUp className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-gray-600" />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }
      } else if (i === guesses.length && !gameComplete) {
        // Current input row
        rows.push(
          <div key={i} className="grid grid-cols-1 gap-2 mb-2">
            <div className="w-full h-14 border-2 border-gray-200 mt-5 bg-white flex items-center justify-center rounded shadow-sm">
              <input
                type="number"
                step="0.01"
                placeholder="How many bushels of wheat?"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && handleGuess()}
                className="w-full h-full text-lg text-center bg-transparent border-none px-4 outline-none placeholder-gray-600"
              />
            </div>
          </div>
        );
      }
    }
    return rows;
  };

  if (!todaysItem || wheatPrice === null || isLoadingPrice)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isLoadingPrice ? "Loading wheat prices..." : "Loading game..."}
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg flex-grow flex flex-col">
        {/* Header - Wordle style */}
        <header className="border-b border-gray-200 ">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setShowHowToPlay(true)}
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
                onClick={() => setShowStats(true)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <TrendingUp className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Game Content */}
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
            <p className="text-gray-600 mt-2 text-sm"></p>
          </div>

          {/* Game Grid - Wordle style */}
          <div className="max-w-sm mx-auto mb-4">{createGameGrid()}</div>

          {/* Input Interface - Only show if game not complete */}
          {!gameComplete && guesses.length < 6 && (
            <div className="text-center">
              <div className="text-xs text-gray-400 mt-0 mb-4">
                Type your guess above and press Enter or Submit
              </div>
              <button
                onClick={handleGuess}
                disabled={!guess || guess.trim() === ""}
                className="px-8 py-2 bg-amber-600 text-white font-bold rounded-md hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors mb-3"
              >
                SUBMIT
              </button>
              <div className="text-gray-500 text-sm mb-2">
                {guesses.length}/6 guesses
              </div>
            </div>
          )}

          {/* Results - Wordle style */}
          {gameComplete && (
            <div className="text-center space-y-4 mt-8">
              <div className="rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  {gameWon ? "🎉 Well done!" : "😔 Better luck tomorrow!"}
                </h3>
                {gameWon && (
                  <div className="text-lg text-gray-700 mb-2">
                    The answer was{" "}
                    <span className="font-bold text-amber-600">
                      {getActualBushels().toFixed(2)} bushels
                    </span>
                  </div>
                )}
                {!gameWon && (
                  <div className="mb-4">
                    {!showAnswer ? (
                      <button
                        onClick={() => setShowAnswer(true)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm"
                      >
                        🔍 Reveal Answer
                      </button>
                    ) : (
                      <div className="text-lg text-gray-700">
                        The answer was{" "}
                        <span className="font-bold text-amber-600">
                          {getActualBushels().toFixed(2)} bushels
                        </span>
                      </div>
                    )}
                  </div>
                )}
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

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-gray-400">
          made with 🌾 by{" "}
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

      {/* How to Play Modal */}
      {showHowToPlay && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">How to Play</h2>
              <button
                onClick={() => setShowHowToPlay(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <p className="font-semibold mb-2">🎯 Objective</p>
                <p>
                  Guess how many bushels of wheat you could buy with the price
                  of today's item!
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">🎮 How to Play</p>
                <ul className="space-y-1 ml-4">
                  <li>• You'll see an item and its current price</li>
                  <li>
                    • Guess how many bushels of wheat that price could buy
                  </li>
                  <li>• You have 6 attempts to get it right</li>
                  <li>• Each guess gives you a hint about how close you are</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">📊 Feedback</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🎯</span>
                    <span>
                      <strong>Exact:</strong> Within 10% of the answer
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🌾</span>
                    <span>
                      <strong>Close:</strong> Within 25% of the answer
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🌱</span>
                    <span>
                      <strong>Warm:</strong> Within 50% of the answer
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">❄️</span>
                    <span>
                      <strong>Cold:</strong> More than 50% off
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">🔄 Arrows</p>
                <p>
                  Arrows show whether the actual answer is higher ⬆️ or lower ⬇️
                  than your guess.
                </p>
              </div>

              <div className="bg-amber-50 p-3 rounded-lg">
                <p className="font-semibold text-amber-800 mb-1">💡 Pro Tip</p>
                <p className="text-amber-700">
                  A new game starts every day at 6:00 AM CT with a fresh item
                  and updated wheat prices!
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowHowToPlay(false)}
                className="w-full py-3 bg-amber-600 text-white font-bold rounded-md hover:bg-amber-700 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <div className="text-sm text-gray-600 mb-2">Next Game</div>
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
