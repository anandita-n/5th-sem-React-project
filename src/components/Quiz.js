import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/Quiz.module.css';
import { quizData, shuffleArray } from '../data/quizData';

const Quiz = ({ user }) => {
  const { topic } = useParams();
  const navigate = useNavigate();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const hintRef = useRef(null);

  const quiz = quizData[topic];
  const currentQuestion = quiz?.questions[currentIndex];

  useEffect(() => {
    if (currentQuestion) {
      const options = currentQuestion.options.map((opt, idx) => ({
        text: opt,
        originalIndex: idx
      }));
      setShuffledOptions(shuffleArray(options));
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHint(false);
    setAnswered(false);
  }, [currentIndex, currentQuestion]);

  if (!quiz) {
    return <div className={styles['quiz-container']}>Quiz not found</div>;
  }

  const handleAnswerSelect = (index) => {
    if (!answered) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      alert('Please select an answer');
      return;
    }

    setAnswered(true);
    setShowFeedback(true);

    const originalIndex = shuffledOptions[selectedAnswer].originalIndex;
    if (originalIndex === currentQuestion.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/results', {
        state: {
          topic: quiz.title,
          score,
          totalQuestions: quiz.questions.length,
          skipped,
          username: user
        }
      });
    }
  };

  const handleSkip = () => {
    setSkipped(skipped + 1);
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/results', {
        state: {
          topic: quiz.title,
          score,
          totalQuestions: quiz.questions.length,
          skipped,
          username: user
        }
      });
    }
  };

  const isLastQuestion = currentIndex === quiz.questions.length - 1;
  const progress = ((currentIndex + 1) / quiz.questions.length) * 100;

  const getHint = () => {
    // Use the hint from the current question, fallback to topic-based hint
    if (currentQuestion?.hint) {
      return currentQuestion.hint;
    }
    // Fallback generic hints by topic if question doesn't have specific hint
    if (topic === 'tech-trivia') {
      return 'Review the definition or concept related to this topic.';
    } else if (topic === 'guess-output') {
      return 'Trace through the code step by step carefully.';
    } else {
      return 'Look for syntax errors, logic errors, or resource issues.';
    }
  };

  return (
    <div className={styles['quiz-container']}>
      <div className={styles['quiz-wrapper']}>
        <div className={styles['quiz-header']}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 className={styles['quiz-title']}>{quiz.icon} {quiz.title}</h2>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to quit? Your progress will not be saved.')) {
                  navigate('/');
                }
              }}
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              aria-label="Quit quiz"
            >
              ✕ Quit Quiz
            </button>
          </div>
          <div className={styles['progress-container']}>
            <div className={styles['progress-bar']}>
              <div
                className={styles['progress-fill']}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={styles['progress-text']}>
              {currentIndex + 1}/{quiz.questions.length}
            </span>
          </div>
        </div>

        <div className={styles['question-card']}>
          <div className={styles['question-number']}>
            Question {currentIndex + 1} of {quiz.questions.length}
          </div>

          <div className={styles['question-text']}>
            {currentQuestion.question}
          </div>

          <div className={styles['options-container']}>
            {shuffledOptions.map((option, index) => {
              const isCorrect = option.originalIndex === currentQuestion.correct;
              const isSelected = selectedAnswer === index;

              let className = styles.option;
              if (isSelected) className += ' ' + styles.selected;
              if (showFeedback && isSelected && isCorrect) className += ' ' + styles.correct;
              if (showFeedback && isSelected && !isCorrect) className += ' ' + styles.incorrect;
              if (showFeedback && isCorrect && !isSelected) className += ' ' + styles.correct;

              return (
                <label key={index} className={className}>
                  <input
                    type="radio"
                    name={`question-${currentIndex}`}
                    checked={isSelected}
                    onChange={() => handleAnswerSelect(index)}
                    disabled={answered}
                    aria-label={`Option ${index + 1}: ${option.text}`}
                  />
                  <span>{option.text}</span>
                </label>
              );
            })}
          </div>

          {showFeedback && (
            <>
              <div className={`${styles.feedback} ${selectedAnswer !== null && shuffledOptions[selectedAnswer].originalIndex === currentQuestion.correct ? styles.correct : styles.incorrect}`}>
                <div className={styles['feedback-text']}>
                  <span>
                    {shuffledOptions[selectedAnswer].originalIndex === currentQuestion.correct
                      ? '✅ Correct!'
                      : '❌ Incorrect'}
                  </span>
                </div>
              </div>

              <div className={styles.explanation}>
                <strong>💡 Explanation:</strong> {currentQuestion.explanation}
              </div>
            </>
          )}

          {!answered && (
            <button
              className={styles['hint-button']}
              onClick={() => setShowHint(!showHint)}
              ref={hintRef}
              aria-label="Toggle hint"
            >
              💡 Hint
            </button>
          )}

          {showHint && !answered && (
            <div className={styles['hint-text']}>
              {getHint()}
            </div>
          )}

          {answered && isLastQuestion && currentIndex === quiz.questions.length - 1 && (
            <div className={styles['completion-message']}>
              ✨ Quiz Complete! Ready to see your results?
            </div>
          )}
        </div>

        <div className={styles['buttons-container']}>
          {!answered ? (
            <>
              <button
                className={styles['btn-next']}
                onClick={handleSubmit}
                aria-label="Submit answer"
              >
                Submit Answer
              </button>
              <button
                className={styles['btn-skip']}
                onClick={handleSkip}
                aria-label="Skip question"
              >
                Skip
              </button>
            </>
          ) : (
            <>
              <button
                className={styles['btn-next']}
                onClick={handleNext}
                aria-label={isLastQuestion ? 'View results' : 'Next question'}
              >
                {isLastQuestion ? 'View Results →' : 'Next Question →'}
              </button>
            </>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', color: 'white', fontSize: '14px' }}>
          Score: {score}/{quiz.questions.length} | Skipped: {skipped}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
