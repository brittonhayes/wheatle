# The Price is Wheat 🌾

A daily guessing game where you estimate how many bushels of wheat you can buy with the price of everyday items. Inspired by Wordle, but with a twist on agricultural economics!

## 🎮 How to Play

1. **Daily Item**: Each day features a different item with its current price
2. **Make Your Guess**: Estimate how many bushels of wheat you could buy for that price
3. **Get Feedback**: Receive accuracy feedback on your guess:
   - 🎯 **Exact!** - Within 10% of the actual answer
   - 🌾 **Close!** - Within 25% of the actual answer  
   - 🌱 **Warm** - Within 50% of the actual answer
   - ❄️ **Cold** - More than 50% off
4. **Six Chances**: You have up to 6 attempts to get as close as possible
5. **Share Results**: Share your daily performance with friends

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/brittonhayes/wheatle.git
cd wheatle
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables for the Netlify function:

```bash
# Add to .env or Netlify environment
ALPHA_VANTAGE_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Tech Stack

- **React 18** - UI framework with hooks
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Netlify Functions** - Serverless API endpoints
- **Alpha Vantage API** - Real-time wheat futures pricing
- **LocalStorage** - Client-side game state persistence

## 📱 Features

- **Daily Challenge**: New item every day based on game start date
- **Real Wheat Prices**: Live wheat futures data from commodity markets
- **Statistics Tracking**: Win rate, streaks, and detailed game history
- **Share Results**: Copy results to clipboard with emoji visualization
- **Responsive Design**: Optimized for both desktop and mobile
- **Offline Persistence**: Game state and statistics saved locally
- **Modern UI**: Clean design with smooth animations and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🌾 Game Items

The game features over 100 different items ranging from:
- **Everyday Items**: Coffee, gas station hot dogs, phone bills
- **Luxury Items**: Tesla Model S, diamond rings, private jets  
- **Random Fun**: Bugatti Veyron, space tourism, artisanal toast
- **Household Staples**: Toilet paper, bananas, energy drinks

Each item includes realistic pricing to make the game both educational and entertaining.

## 🔧 Development

### Project Structure

```
src/
├── app.tsx              # Main game component
├── main.tsx             # React entry point
├── index.css            # Global styles and animations
├── config.ts            # Game configuration constants
├── lib.ts               # Core game logic and utilities
├── types.ts             # TypeScript type definitions
├── components/          # React components
│   ├── Header.tsx       # Game header with navigation
│   ├── GameGrid.tsx     # Guess display grid
│   ├── InputInterface.tsx # Number input component
│   ├── Results.tsx      # End game results display
│   ├── HowToPlayModal.tsx # Game instructions modal
│   ├── StatisticsModal.tsx # Stats and sharing modal
│   └── ToastNotification.tsx # Toast messages
└── data/
    └── items.ts         # Game items database

netlify/
└── functions/
    └── pullWheatFutures.mts # Serverless function for wheat prices

utils/
└── [conversion utilities] # Price conversion helpers
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production with TypeScript compilation
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint with TypeScript support
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Game Logic

The game uses several key calculations:
- **Game Number**: Based on days since start date (June 1, 2025)
- **Item Selection**: Rotates through items using modulo of game number
- **Wheat Price**: Fetched from Alpha Vantage API with fallback prices
- **Accuracy Calculation**: Percentage difference with directional feedback
- **Statistics**: Win rate, streaks, and game history tracking

### Customization

To modify game items, edit the `ITEMS_DATABASE` array in `src/data/items.ts`:

```typescript
{
  id: 'unique_id',
  name: 'Item Name',
  emoji: '📱',
  price: 99.99,
}
```

Game configuration can be adjusted in `src/config.ts`:
- Start date
- Maximum guesses
- Accuracy thresholds
- Share URL

## 🌐 Deployment

The app is deployed on Netlify with:
- Automatic builds from Git pushes
- Serverless functions for API calls
- Environment variable configuration
- CDN distribution for fast loading

Live at: [thepriceiswheat.netlify.app](https://thepriceiswheat.netlify.app)

## 📊 Statistics

The game tracks and displays:
- **Games Played**: Total number of games attempted
- **Win Percentage**: Success rate across all games
- **Current Streak**: Consecutive wins
- **Best Streak**: Longest winning streak achieved

All statistics persist in browser localStorage and can be reset if needed.

---

Made with ❤️ and 🌾 by [@brittonhayes.dev](https://bsky.app/profile/brittonhayes.dev)
