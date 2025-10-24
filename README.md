# Ontario DrivePrep - Master Your G1 Test 🚗

A Progressive Web App (PWA) designed to help users study for the Ontario Class G driver's license exam with practice tests, flashcards, and progress tracking.

## 🌟 Features

### Core Functionality
- **Practice Tests**: 40-question G1 simulation with timer and instant feedback
- **Flashcards**: Swipeable study cards with spaced repetition tracking
- **Progress Tracking**: Category mastery, badges, test history, and streak tracking
- **Offline Support**: All content cached locally using localStorage
- **PWA Ready**: Install directly to home screen on mobile devices

### Study Content
- 85+ practice questions across 6 categories:
  - Road Signs & Signals
  - Rules of the Road
  - Safe Driving & Vehicle Handling
  - Alcohol/Drugs & Penalties
  - Licensing & Documents
  - Miscellaneous
- Detailed explanations for each answer
- Based on Ontario Driver's Handbook guidelines

### Gamification
- Daily streak tracking
- Achievement badges (Sign Master, Road Scholar, Perfect Score, Consistent Learner)
- Progress visualization with charts
- Test history and performance analytics

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser (Chrome, Safari, Firefox, Edge)

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project
cd ontario-driveprep

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:8080` to view the app.

### Building for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

## 📱 Installing as PWA

### On Mobile (iOS)
1. Open the app in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

### On Mobile (Android)
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home Screen"
4. Tap "Add"

### On Desktop
1. Open the app in Chrome/Edge
2. Look for the install icon in the address bar
3. Click "Install"

## 🏗️ Project Structure

```
ontario-driveprep/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn components
│   │   ├── InstallPrompt.tsx
│   │   ├── ProgressBar.tsx
│   │   └── StatCard.tsx
│   ├── data/             # Question bank and data
│   │   └── questions.ts
│   ├── pages/            # Route pages
│   │   ├── Dashboard.tsx
│   │   ├── PracticeTest.tsx
│   │   ├── TestResults.tsx
│   │   ├── Flashcards.tsx
│   │   └── Progress.tsx
│   ├── utils/            # Helper functions
│   │   └── storage.ts    # LocalStorage utilities
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/               # Static assets
│   ├── pwa-*.png        # PWA icons
│   └── apple-touch-icon.png
├── vite.config.ts       # Vite + PWA config
└── package.json
```

## 🎨 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **State Management**: React hooks + localStorage
- **PWA**: vite-plugin-pwa + Workbox
- **Icons**: Lucide React

## 📝 Expanding Content

To add more questions, edit `src/data/questions.ts`:

```typescript
export const questions: Question[] = [
  {
    id: "unique_id",
    category: CATEGORIES.SIGNS, // or other category
    question: "Your question here?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 0, // Index of correct option (0-3)
    explanation: "Detailed explanation here"
  },
  // ... more questions
];
```

## 🔒 Data Privacy

- All user data is stored locally in the browser (localStorage)
- No personal information is collected or sent to servers
- Progress data can be cleared by clearing browser data

## 📚 Study Tips

1. **Start with categories** you're least familiar with
2. **Review explanations** even when you answer correctly
3. **Maintain your streak** for consistent learning
4. **Take full practice tests** to simulate the real exam
5. **Aim for 80%+** consistently before booking your G1 test

## 🤝 Contributing

This is a Lovable-generated project. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## ⚖️ Legal Disclaimer

**For study purposes only. Not official advice.**

This app is designed to help study for the Ontario G1 test but is not affiliated with the Ontario Ministry of Transportation. Always refer to the official Ontario Driver's Handbook for the most current information.

## 📄 License

MIT License - Feel free to use this project for learning purposes.

## 🔗 Resources

- [Official Ontario Driver's Handbook](https://www.ontario.ca/document/official-mto-drivers-handbook)
- [Book Your G1 Test](https://drivetest.ca/)
- [Lovable Documentation](https://docs.lovable.dev/)

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Good luck on your G1 test!** 🎉
