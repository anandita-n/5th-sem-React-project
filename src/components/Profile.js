import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Profile.module.css';
import { getQuizHistory } from '../data/quizData';

const Profile = ({ user, onLogout, onUpdateUsername }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user || '');
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    if (user) {
      const history = getQuizHistory(user);
      setQuizHistory(history);
    }
  }, [user]);

  const handleSaveProfile = () => {
    if (editName.trim()) {
      if (editName !== user && onUpdateUsername) {
        onUpdateUsername(editName);
      }
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditName(user || '');
    setIsEditing(false);
  };

  const totalQuizzes = quizHistory.length;
  // compute average and best using percentage when available
  const totalScore = quizHistory.reduce((sum, quiz) => sum + (typeof quiz.percentage === 'number' ? quiz.percentage : (quiz.maxScore ? Math.round((quiz.score / quiz.maxScore) * 100) : 0)), 0);
  const averageScore = totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;
  const bestScore = totalQuizzes > 0 ? Math.max(...quizHistory.map(q => (typeof q.percentage === 'number' ? q.percentage : (q.maxScore ? Math.round((q.score / q.maxScore) * 100) : 0)))) : 0;

  // Achievement badges
  const badges = [
    { icon: '🌟', label: 'First Quiz', unlocked: totalQuizzes >= 1 },
    { icon: '🔥', label: 'Quiz Streak', unlocked: totalQuizzes >= 5 },
    { icon: '🏆', label: 'Perfect Score', unlocked: quizHistory.some(q => q.percentage === 100) },
    { icon: '🎯', label: 'High Scorer', unlocked: bestScore >= 8 },
    { icon: '📚', label: 'Bookworm', unlocked: totalQuizzes >= 10 },
    { icon: '💪', label: 'Master', unlocked: averageScore >= 80 }
  ];

  if (!user) {
    return (
      <div className={styles['profile-container']}>
        <div className={styles['profile-wrapper']}>
          <div className={styles['profile-header']}>
            <h2>Please log in to view your profile</h2>
            <p>Go back to the home page to login or register.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['profile-container']}>
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: '10' }}>
        <Link to="/" style={{ color: 'white', fontSize: '14px', fontWeight: '600', textDecoration: 'none', padding: '10px 15px', background: 'rgba(255,255,255,0.2)', borderRadius: '6px', display: 'inline-block', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'} onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}>🏠 Home</Link>
      </div>
      <div className={styles['profile-wrapper']}>
        <div className={styles['profile-header']}>
          <div className={styles['avatar-container']}>
            <div className={styles.avatar}>
              {user.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className={styles['profile-info']}>
            {!isEditing ? (
              <>
                <h2>{user}</h2>
                <p>Joined CodeQuest Trivia</p>
              </>
            ) : (
              <div className={styles['edit-form']}>
                <div className={styles['form-group']}>
                  <label htmlFor="edit-name">Username</label>
                  <input
                    id="edit-name"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Enter new username"
                    aria-label="Edit username"
                  />
                </div>
              </div>
            )}

            <div className={styles['edit-buttons']}>
              {!isEditing ? (
                <>
                  <button
                    className={styles['btn-save']}
                    onClick={() => setIsEditing(true)}
                    aria-label="Edit profile"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className={styles['btn-cancel']}
                    onClick={onLogout}
                    aria-label="Logout"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={styles['btn-save']}
                    onClick={handleSaveProfile}
                    aria-label="Save changes"
                  >
                    💾 Save
                  </button>
                  <button
                    className={styles['btn-cancel']}
                    onClick={handleCancel}
                    aria-label="Cancel edit"
                  >
                    ❌ Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles['sections-grid']}>
          {/* Achievements Card (now includes compact stats) */}
          <div className={styles['section-card']}>
            <h3 className={styles['section-title']}>🏅 Achievements</h3>

            

            <div className={styles['badges-container']}>
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`${styles.badge} ${badge.unlocked ? styles.unlocked : styles.locked}`}
                  title={badge.unlocked ? `Unlocked: ${badge.label}` : `Locked: ${badge.label}`}
                  aria-label={`${badge.label} badge`}
                >
                  <div className={styles['badge-icon']}>{badge.icon}</div>
                  <div className={styles['badge-label']}>{badge.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz History Card (compact stats above history list) */}
          <div className={styles['section-card']}>
            <h3 className={styles['section-title']}>📜 Quiz History</h3>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Total</div>
              <div style={{ fontSize: 16, fontWeight: '700', color: '#667eea' }}>{totalQuizzes}</div>
              <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ fontSize: 12, opacity: 0.8 }}>Average</div>
              <div style={{ fontSize: 16, fontWeight: '700', color: '#f093fb' }}>{totalQuizzes > 0 ? `${averageScore}%` : '—'}</div>
              <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ fontSize: 12, opacity: 0.8 }}>Best</div>
              <div style={{ fontSize: 16, fontWeight: '700', color: '#22c55e' }}>{totalQuizzes > 0 ? `${bestScore}%` : '—'}</div>
            </div>

            <div className={styles['history-list']}>
              {quizHistory.length > 0 ? (
                quizHistory.slice().reverse().map((quiz, index) => (
                  <div key={index} className={styles['history-item']}>
                    <div className={styles['history-info']}>
                      <div className={styles['history-topic']}>
                        {quiz.topic}
                      </div>
                      <div className={styles['history-date']}>
                        {quiz.date}
                      </div>
                    </div>
                    <div className={styles['history-score']}>
                      {quiz.score}/{quiz.maxScore}
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles['empty-message']}>
                  No quizzes taken yet. Start your first quiz!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
