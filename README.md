# CodeQuest Trivia 🚀

A fun, interactive React web app featuring three engaging quiz topics with immediate feedback, progress tracking, and a global leaderboard!

## Features

### 🎮 Three Quiz Topics
- **Tech Trivia**: 10 questions on CS fundamentals (OS, DBMS, DSA, Networks, AI)
- **Guess the Output**: 10 code snippet questions (C/Java/Python) predicting console output
- **Bug Buster**: 10 buggy code snippets to identify errors

### 📊 Interactive Quiz Experience
- Multiple-choice questions (4 options per question)
- Immediate feedback (green for correct, red for wrong)
- Detailed explanations for every question
- Progress indicator with visual progress bar
- Skip and hint features (with useRef focus)
- Random option shuffling

### 🏆 Results & Tracking
- Score summary with percentage
- Pie chart visualization (correct/wrong/skipped)
- Confetti animation on high scores (≥80%)
- Share results functionality
- Quiz history with past scores

### 👤 User Dashboard
- Profile page with user stats
- Quiz history list
- Achievement badges (unlocked based on performance)
- Editable username and avatar
- Statistics: total quizzes, average score, best score

### 🌍 Global Leaderboard
- Top 10 scores table with rankings
- Topic distribution pie chart
- Search players by username
- Filter by quiz topic
- Global statistics (total quizzes, active players, average score)

### 🎨 Design Features
- Vibrant rainbow gradient theme (blues, pinks, oranges)
- Playful animations (bounce, wiggle, slide effects)
- Cartoonish UI with rounded cards and shadows
- Mobile-responsive (CSS Modules with media queries)
- Micro-animations on hover/focus
- Accessibility: ARIA labels, keyboard navigation, high contrast

## 📚 Technology Stack

### Core React Concepts Used
- **JSX Syntax**: Expressions, conditionals, lists rendering
- **Components**: Functional components, props, children, Fragments
- **Event Handling**: onChange, onClick with arrow functions, SyntheticEvent
- **Forms**: Controlled inputs, form submissions
- **State Management**: useState for quiz state, lifted state to App
- **Hooks**: useState, useEffect for persistence, useRef for focus control
- **Routing**: React Router with Link, NavLink, useParams, useLocation
- **Styling**: CSS Modules, inline styles for dynamic colors, CSS-in-JS animations
- **localStorage**: Persist user data and quiz scores

### Dependencies
- React 18.2.0
- React Router DOM 6.14.0
- CSS Modules
- localStorage API

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm start
```
Runs on http://localhost:3000

### Build
```bash
npm run build
```
Creates optimized production build

## 📦 Project Structure
```
src/
├── components/
│   ├── Home.js           # Landing page with auth
│   ├── Quiz.js           # Quiz play interface
│   ├── Results.js        # Score display & charts
│   ├── Profile.js        # User dashboard
│   └── Leaderboard.js    # Global scores table
├── data/
│   └── quizData.js       # Quiz questions & utilities
├── styles/
│   ├── Home.module.css
│   ├── Quiz.module.css
│   ├── Results.module.css
│   ├── Profile.module.css
│   └── Leaderboard.module.css
├── App.js                # Router setup
├── App.css               # Global styles
└── index.js              # React entry point

public/
└── index.html            # HTML template

.env                       # Environment variables
netlify.toml              # Netlify deployment config
```

## 🔄 State Management

### Global State (App.js)
- `user`: Current logged-in username
- Lifted to App component for persistence
- Synced with localStorage

### Local State per Component
- Quiz: currentIndex, score, selectedAnswer, showFeedback
- Profile: isEditing, editName
- Results: showConfetti
- Leaderboard: searchTerm, selectedTopic

### Data Persistence
- User data saved to localStorage
- Quiz scores array stored and retrieved
- Profile history pulled from saved scores

## 🎯 Key Features Implementation

### Quiz Flow
1. User logs in on Home page
2. Select quiz topic → navigate to `/quiz/:topic` with useParams
3. Answer questions with radio buttons
4. Immediate visual feedback (green/red backgrounds)
5. View explanation for each question
6. Submit score → navigate to Results page

### Results Page
- Displays score with percentage
- Animated pie chart showing correct/wrong/skipped
- Shows high score message with confetti
- Retry button re-enters same quiz
- Share button uses native share API

### Profile Page
- Shows user avatar (initial letter)
- Quiz history as list of past scores
- Achievement badges (conditional rendering)
- Edit username form (controlled input)
- Stats: total quizzes, average, best score

### Leaderboard
- Fetches top 10 scores from localStorage
- Filter by topic using buttons
- Search by username using controlled input
- Topic popularity pie chart
- Responsive table with rank medals

## 🌐 Deployment

### Netlify Deployment
```bash
npm run build
# Deploy 'build' folder to Netlify
```

**netlify.toml** includes:
- Build command: `npm run build`
- Publish directory: `build`
- Redirect rules for SPA routing
- Cache headers for assets

**Environment Variables** (.env):
```
REACT_APP_NETLIFY_SITE=your-site.netlify.app
```

## ♿ Accessibility
- ARIA labels on all form inputs and buttons
- Keyboard navigation (arrow functions for events)
- High contrast text and backgrounds
- Focus indicators on interactive elements
- Semantic HTML structure

## 🧪 Testing with React DevTools
- Inspect component state with React DevTools
- View props passed to components
- Monitor useState hook values
- Track component re-renders

## 📝 License
MIT License - Feel free to use and modify!

---

**Happy Quizzing! 🎉 Test your coding knowledge and climb the leaderboard!**
# codequest-trivia
