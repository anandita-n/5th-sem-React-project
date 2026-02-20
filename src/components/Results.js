import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styles from '../styles/Results.module.css';
import { saveScore, quizData } from '../data/quizData';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (state?.score >= state?.totalQuestions * 0.8) {
      setShowConfetti(true);
      createConfetti();
    }

    if (state?.username && state?.topic && state?.score !== undefined) {
      saveScore(state.topic, state.score, state.totalQuestions, state.username);
    }
  }, [state]);

  const createConfetti = () => {
    const confettiCount = 50;
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = styles.confetti;
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.backgroundColor = ['#667eea', '#f093fb', '#fa709a', '#fee140', '#30b0c0'][Math.floor(Math.random() * 5)];
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 3000);
    }
  };

  if (!state) {
    return (
      <div className={styles['results-container']}>
        <div className={styles['results-wrapper']}>
          <div className={styles['results-card']}>
            <h2>No Quiz Data Found</h2>
            <button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { topic, score, totalQuestions, skipped, username } = state;
  const percentage = Math.round((score / totalQuestions) * 100);
  const missed = totalQuestions - score - skipped;

  let messageClass = '';
  let message = '';

  if (percentage === 100) {
    message = '🌟 Perfect Score! You\'re a coding master!';
    messageClass = 'excellent';
  } else if (percentage >= 80) {
    message = '🎉 Excellent! You really know your stuff!';
    messageClass = 'excellent';
  } else if (percentage >= 60) {
    message = '👍 Good job! Keep practicing to improve.';
    messageClass = 'good';
  } else if (percentage >= 40) {
    message = '📚 Fair attempt. Review the concepts and try again!';
    messageClass = 'fair';
  } else {
    message = '💪 Keep learning! Practice makes perfect.';
    messageClass = 'needsImprovement';
  }

  const handleRetry = () => {
    const topicKeys = Object.keys(quizData);
    const topicKey = topicKeys.find(key => quizData[key].title === topic);
    navigate(`/quiz/${topicKey}`);
  };

  const handleShare = () => {
    const shareText = `I scored ${score}/${totalQuestions} (${percentage}%) on "${topic}" in CodeQuest Trivia! Can you beat my score? 🚀`;
    if (navigator.share) {
      navigator.share({
        title: 'CodeQuest Trivia Results',
        text: shareText
      });
    } else {
      alert(shareText);
    }
  };

  return (
    <div className={styles['results-container']}>
      <div className={styles['results-wrapper']}>
        <div className={styles['results-card']}>
          <h1 className={styles['results-title']}>Quiz Complete! 🎊</h1>

          <div className={styles['score-display']}>
            <h2 style={{ color: 'white', margin: '10px 0' }}>{topic}</h2>
            <div className={styles['final-score']}>
              {score}/{totalQuestions}
            </div>
          </div>

          <div
            className={`${styles['message']} ${styles[messageClass]}`}
            style={{ backgroundColor: `rgba(${messageClass === 'excellent' ? '34, 197, 94' : messageClass === 'good' ? '59, 130, 246' : messageClass === 'fair' ? '251, 191, 36' : '239, 68, 68'}, 0.2)` }}
          >
            {message}
          </div>

          <div className={styles['pie-chart']}>
            <svg viewBox="0 0 100 100">
              {/* Correct segment (green) */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#22c55e" strokeWidth="20"
                strokeDasharray={`${(score / totalQuestions) * 283} 283`}
                transform="rotate(-90 50 50)"
              />
              {/* Incorrect segment (red) */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#ef4444" strokeWidth="20"
                strokeDasharray={`${(missed / totalQuestions) * 283} 283`}
                strokeDashoffset={`-${(score / totalQuestions) * 283}`}
                transform="rotate(-90 50 50)"
              />
              {/* Skipped segment (gray) */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#6b7280" strokeWidth="20"
                strokeDasharray={`${(skipped / totalQuestions) * 283} 283`}
                strokeDashoffset={`-${((score + missed) / totalQuestions) * 283}`}
                transform="rotate(-90 50 50)"
              />
              <text x="50" y="55" textAnchor="middle" fontSize="20" fill="white" fontWeight="bold">
                {percentage}%
              </text>
            </svg>
          </div>

          <div className={styles['chart-legend']}>
            <div className={styles['legend-item']}>
              <div className={`${styles['legend-color']} ${styles.correct}`}></div>
              <span>Correct ({score})</span>
            </div>
            <div className={styles['legend-item']}>
              <div className={`${styles['legend-color']} ${styles.incorrect}`}></div>
              <span>Incorrect ({missed})</span>
            </div>
            <div className={styles['legend-item']}>
              <div className={`${styles['legend-color']} ${styles.skipped}`}></div>
              <span>Skipped ({skipped})</span>
            </div>
          </div>

          <div className={styles['buttons-container']}>
            <button
              className={`${styles.btn} ${styles['btn-primary']}`}
              onClick={handleRetry}
              aria-label="Retry quiz"
            >
              🔄 Retry Quiz
            </button>
            <button
              className={`${styles.btn} ${styles['btn-secondary']}`}
              onClick={handleShare}
              aria-label="Share results"
            >
              📤 Share Results
            </button>
            <button
              className={`${styles.btn} ${styles['btn-secondary']}`}
              onClick={() => navigate('/')}
              aria-label="Go back to home"
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
