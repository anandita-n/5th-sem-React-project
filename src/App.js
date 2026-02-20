import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    localStorage.removeItem('currentUser');
    setUser(null);
  }, []);
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', user);
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);
  const handleLogin = (username) => {
    setUser(username);
  };
  const handleLogout = () => {
    setUser(null);
  };
  const handleUpdateUsername = (newUsername) => {
    setUser(newUsername);
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home user={user} onLogin={handleLogin} />}
        />
        <Route
          path="/quiz/:topic"
          element={user ? <Quiz user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/results"
          element={user ? <Results /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile user={user} onLogout={handleLogout} onUpdateUsername={handleUpdateUsername} /> : <Navigate to="/" />}
        />
        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
export default App;
