# Wheatle 🌾

A daily word game inspired by Wordle, but for wheat prices! Guess how many bushels of wheat you can buy with the price of everyday items.

## 🎮 How to Play

1. Each day, you'll see a different item with its current price
2. Guess how many bushels of wheat you could buy for that price
3. You have 6 attempts to get as close as possible
4. Get feedback on how accurate your guess was:
   - 🎯 **Exact!** - Within 5% of the actual answer
   - 🔥 **Close!** - Within 15% of the actual answer
   - 🌱 **Warm** - Within 30% of the actual answer
   - 🌾 **Cold** - More than 30% off

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

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **LocalStorage** - Data persistence

## 📱 Features

- **Daily Challenge**: New item every day
- **Statistics Tracking**: Win rate, streaks, and game history
- **Share Results**: Share your performance with emojis
- **Responsive Design**: Works on desktop and mobile
- **Offline Storage**: Game state persists in browser
- **Beautiful UI**: Clean, modern design with animations

## 🌾 Game Items

The game includes 20 different items across two categories:

- **Household**: Everyday items like coffee, groceries, and services
- **Farm**: Agricultural items like fuel, equipment, and supplies

## 🔧 Development

### Project Structure

```
src/
├── app.tsx          # Main game component
├── main.tsx         # React entry point
├── index.css        # Global styles and animations
└── ...

public/
├── wheatle-icon.svg # Game icon
└── ...
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Customization

To modify game items, edit the `ITEMS_DATABASE` array in `src/app.tsx`. Each item should have:

- `id`: Unique identifier
- `name`: Display name
- `emoji`: Visual representation
- `price`: Current price in USD
- `category`: "household" or "farm"

## 📊 Statistics

The game tracks:

- Games played
- Win percentage
- Current streak
- Best streak

All statistics are stored locally in your browser.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Wordle](https://www.nytimes.com/games/wordle/index.html)
- Wheat price data concepts from agricultural commodity markets
- Built with modern web technologies for optimal performance

---

Made with ❤️ and 🌾 by [Britton Hayes](https://github.com/brittonhayes)
