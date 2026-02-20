import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import { quizData } from '../data/quizData';

const Home = ({ user, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }
    if (!password.trim()) {
      alert('Please enter a password');
      return;
    }
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    if (isLogin) {
      if (!storedUsers[username]) {
        alert('Username not found. Please register first or check your username.');
        return;
      }
      if (storedUsers[username] !== password) {
        alert('Incorrect password. Please try again.');
        return;
      }
      onLogin(username);
    } else {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      if (storedUsers[username]) {
        alert('Username already exists. Please choose a different username.');
        return;
      }
      storedUsers[username] = password;
      localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
      alert('Registration successful! You can now login.');
      setIsLogin(true);
    }
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };
  const handleQuickStart = (topicKey) => {
    if (!user) {
      alert('Please login first to start a quiz');
      return;
    }
    navigate(`/quiz/${topicKey}`);
  };
  return (
    <div className={styles['home-container']}>
      <nav className={styles.navbar}>
        <h1>🚀 CodeQuest Trivia</h1>
        <ul className={styles['nav-links']}>
          {user ? (
            <>
              <li><span style={{ color: 'white', fontWeight: 'bold' }}>Welcome, {user}!</span></li>
              <li><Link to="/profile">👤 Profile</Link></li>
              <li><Link to="/leaderboard">🏆 Leaderboard</Link></li>
              <li>
                <button
                  onClick={() => {
                    onLogin(null);
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
                  aria-label="Logout"
                >
                  🚪 Logout
                </button>
              </li>
            </>
          ) : null}
        </ul>
      </nav>

      {!user ? (
        <>
          <section className={styles['hero-section']}>
              <h2>Welcome to CodeQuest Trivia!</h2>
            <p>Test your coding knowledge with fun, challenging quizzes on CS fundamentals, code output predictions, and bug hunting!</p>
          </section>

          <div className={styles['auth-section']}>
            <h3>{isLogin ? 'Login' : 'Register'}</h3>
            {!showForgot ? (
              <form onSubmit={handleSubmit}>
                <div className={styles['form-group']}>
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    aria-label="Username input"
                  />
                </div>

                <div className={styles['form-group']}>
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Password input"
                  />
                </div>

                {!isLogin && (
                  <div className={styles['form-group']}>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      aria-label="Confirm password input"
                    />
                  </div>
                )}

                <div className={styles['auth-buttons']}>
                  <button type="submit" className={styles['btn-login']}>
                    {isLogin ? 'Login' : 'Register'}
                  </button>
                  <button
                    type="button"
                    className={styles['btn-register']}
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setUsername('');
                      setPassword('');
                      setConfirmPassword('');
                    }}
                  >
                    {isLogin ? 'New User?' : 'Back to Login'}
                  </button>
                </div>
                {isLogin && (
                  <div style={{ marginTop: '12px', textAlign: 'center' }}>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', textDecoration: 'underline', fontSize: '14px' }}
                      onClick={() => {
                        setShowForgot(true);
                        setForgotInput('');
                        setForgotSent(false);
                      }}
                      aria-label="Forgot Password"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}
              </form>
            ) : (
              <div className={styles['form-group']} style={{ marginTop: '24px', textAlign: 'center' }}>
                {!forgotSent ? (
                  <>
                    <label htmlFor="forgot-input">Enter your username or email:</label>
                    <input
                      id="forgot-input"
                      type="text"
                      placeholder="Username or Email"
                      value={forgotInput}
                      onChange={(e) => setForgotInput(e.target.value)}
                      style={{ margin: '12px 0', padding: '8px', width: '80%' }}
                    />
                    <div>
                      <button
                        type="button"
                        className={styles['btn-login']}
                        onClick={() => {
                          if (!forgotInput.trim()) {
                            alert('Please enter your username or email');
                            return;
                          }
                          setForgotSent(true);
                        }}
                      >
                        Send Reset Link
                      </button>
                      <button
                        type="button"
                        className={styles['btn-register']}
                        style={{ marginLeft: '8px' }}
                        onClick={() => {
                          setShowForgot(false);
                          setForgotInput('');
                          setForgotSent(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={{ marginTop: '24px', color: '#16a34a', fontWeight: 'bold', fontSize: '16px' }}>
                    A link has been sent to your email to reset your password!
                    <div style={{ marginTop: '16px' }}>
                      <button
                        type="button"
                        className={styles['btn-login']}
                        onClick={() => {
                          setShowForgot(false);
                          setForgotInput('');
                          setForgotSent(false);
                        }}
                      >
                        Back to Login
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <section className={styles['hero-section']}>
              <h2>Welcome to CodeQuest Trivia!</h2>
            <p>Test your coding knowledge with fun, challenging quizzes on CS fundamentals, code output predictions, and bug hunting!</p>
          </section>

          <div className={styles['cards-container']}>
            {Object.entries(quizData).map(([key, quiz]) => (
              <div key={key} className={styles['quiz-card']}>
                <div className={styles['quiz-card-icon']}>{quiz.icon}</div>
                <h3>{quiz.title}</h3>
                <p>{quiz.description}</p>
                <p style={{ fontSize: '14px', opacity: 0.8 }}>
                  {quiz.questions.length} Questions
                </p>
                <button
                  className={styles['start-btn']}
                  onClick={() => handleQuickStart(key)}
                  aria-label={`Start ${quiz.title} quiz`}
                >
                  Start Quiz
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <footer className={styles.footer}>
        <p>🚀 CodeQuest Trivia</p>
      </footer>
    </div>
  );
};

export default Home;
