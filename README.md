# CodeQuest Trivia 

A fun, interactive React web app featuring three engaging quiz topics with immediate feedback, progress tracking, and a global leaderboard.

## Application Flow
1. User logs in
2. Selects quiz topic
3. Answers questions with instant feedback
4. Views results & statistics
5. Scores saved to localStorage

## Technology Stack
- React 18.2.0
- React Router DOM 
- CSS Modules
- localStorage API
- Netlify (deployment)

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

## Project Structure
```
src/
├── components/
│   ├── Home.js           
│   ├── Quiz.js           
│   ├── Results.js        
│   ├── Profile.js        
│   └── Leaderboard.js    
├── data/
│   └── quizData.js       
├── styles/
│   ├── Home.module.css
│   ├── Quiz.module.css
│   ├── Results.module.css
│   ├── Profile.module.css
│   └── Leaderboard.module.css
├── App.js                
├── App.css               
└── index.js              

public/
└── index.html            

.env                       
netlify.toml              
```
## Deployment

### Netlify Deployment
```bash
npm run build
```







