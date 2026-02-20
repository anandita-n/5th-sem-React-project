import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Leaderboard.module.css';
import { quizData } from '../data/quizData';

function safeParseScores() {
  try {
    const raw = localStorage.getItem('quizScores');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

const getTopicTitle = (topicOrKey) => {
  if (!topicOrKey) return 'Unknown';
  // topicOrKey may be a key (e.g. 'tech-trivia') or a title ('Tech Trivia')
  if (quizData[topicOrKey]) return quizData[topicOrKey].title;
  const byTitle = Object.keys(quizData).find((k) => quizData[k].title === topicOrKey);
  if (byTitle) return quizData[byTitle].title;
  return topicOrKey;
};

const Leaderboard = () => {
  const location = useLocation();
  const q = new URLSearchParams(location.search);
  const initialTopic = q.get('topic') || 'All';

  const [allScores, setAllScores] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [sortBy, setSortBy] = useState('percentage');
  const [sortDir, setSortDir] = useState('desc');

  // build topics list from quizData titles
  const topicTitles = Object.keys(quizData).map((k) => quizData[k].title);
  const topics = ['All', ...topicTitles];

  useEffect(() => {
    setSelectedTopic(initialTopic);
  }, [initialTopic]);

  useEffect(() => {
    const demoData = [
      { id: 1, username: 'Anandita', topic: 'tech-trivia', topicTitle: 'Tech Trivia', score: 4, maxScore: 5, percentage: 80, date: '12/1/2025', isoDate: '2025-12-01T10:00:00Z' },
      { id: 2, username: 'Roshna', topic: 'guess-output', topicTitle: 'Guess the Output', score: 4, maxScore: 5, percentage: 80, date: '12/2/2025', isoDate: '2025-12-02T11:00:00Z' },
      { id: 3, username: 'Adi', topic: 'bug-buster', topicTitle: 'Bug Buster', score: 3, maxScore: 5, percentage: 60, date: '12/3/2025', isoDate: '2025-12-03T12:00:00Z' },
      { id: 4, username: 'Anandita', topic: 'guess-output', topicTitle: 'Guess the Output', score: 5, maxScore: 5, percentage: 100, date: '12/3/2025', isoDate: '2025-12-03T13:00:00Z' },
      { id: 5, username: 'Roshna', topic: 'tech-trivia', topicTitle: 'Tech Trivia', score: 3, maxScore: 5, percentage: 60, date: '12/2/2025', isoDate: '2025-12-02T14:00:00Z' },
    ];
    
    // Always set demo data on component mount
    localStorage.setItem('quizScores', JSON.stringify(demoData));
    setAllScores(demoData);
    console.log('Loaded demo data:', demoData);
  }, []);

  // derived filtered & sorted list
  const filtered = React.useMemo(() => {
    let list = allScores.slice();

    if (selectedTopic && selectedTopic !== 'All') {
      // find key by title if possible
      const keyForTitle = Object.keys(quizData).find((k) => quizData[k].title === selectedTopic);
      list = list.filter((s) => {
        if (!s) return false;
        // accept either stored topic key or stored topicTitle or the title string
        return s.topic === keyForTitle || s.topic === selectedTopic || s.topicTitle === selectedTopic || s.topicTitle === keyForTitle;
      });
    }

    const compare = (a, b) => {
      if (!a) return 1;
      if (!b) return -1;
      if (sortBy === 'percentage') {
        return (a.percentage || 0) - (b.percentage || 0);
      }
      if (sortBy === 'score') {
        return (a.score || 0) - (b.score || 0);
      }
      if (sortBy === 'date') {
        const ta = a.isoDate ? new Date(a.isoDate).getTime() : (a.date ? new Date(a.date).getTime() : 0);
        const tb = b.isoDate ? new Date(b.isoDate).getTime() : (b.date ? new Date(b.date).getTime() : 0);
        return ta - tb;
      }
      if (sortBy === 'username') {
        return (a.username || '').localeCompare(b.username || '');
      }
      return 0;
    };

    list.sort((a, b) => {
      const res = compare(a, b);
      return sortDir === 'asc' ? res : -res;
    });

    return list;
  }, [allScores, selectedTopic, sortBy, sortDir]);

  // stats use either filtered (if not empty) else allScores
  const statsSource = filtered.length > 0 ? filtered : allScores;
  const average = statsSource.length > 0 ? Math.round(statsSource.reduce((s, e) => s + (e.percentage || 0), 0) / statsSource.length) : 0;
  const top = statsSource.length > 0 ? Math.max(...statsSource.map((s) => s.percentage || 0)) : 0;

  // topic distribution (counts from allScores)
  const topicCounts = React.useMemo(() => {
    const m = {};
    allScores.forEach((s) => {
      const key = s.topic || s.topicTitle || 'Unknown';
      m[key] = (m[key] || 0) + 1;
    });
    return Object.entries(m);
  }, [allScores]);

  const colors = ['#667eea', '#f093fb', '#fa709a', '#fee140', '#30b0c0'];

  const getMedal = (rank) => (rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`);

  return (
    <div className={styles['leaderboard-container']}>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 20 }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', background: 'rgba(255,255,255,0.12)', borderRadius: 8 }}>🏠 Home</Link>
      </div>

      <div className={styles['leaderboard-wrapper']}>
        <div className={styles['leaderboard-header']}>
          <h2>🏆 Global Leaderboard</h2>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
            <div className={styles['filter-buttons']}>
              {topics.map((t) => (
                <button
                  key={t}
                  className={`${styles['filter-btn']} ${selectedTopic === t ? styles.active : ''}`}
                  onClick={() => setSelectedTopic(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
              <label style={{ color: 'white', fontSize: 13 }}>Sort</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: 6, borderRadius: 6 }}>
                <option value="percentage">Percentage</option>
                <option value="score">Score</option>
                <option value="date">Date</option>
                <option value="username">Username</option>
              </select>
              <button onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))} style={{ padding: '6px 8px', borderRadius: 6 }}>
                {sortDir === 'asc' ? '▲' : '▼'}
              </button>
            </div>
          </div>
        </div>

        <div className={styles['stats-grid']}>
          <div className={styles['stat-card']}>
            <div className={styles['stat-label']}>Average Score</div>
            <div className={styles['stat-value']}>{average}%</div>
          </div>
          <div className={styles['stat-card']}>
            <div className={styles['stat-label']}>Top Score</div>
            <div className={styles['stat-value']}>{top}%</div>
          </div>
        </div>

        <div className={styles['chart-container']}>
          <div className={styles['chart-title']}>Topic Popularity Distribution</div>

          <div className={styles['pie-chart']}>
            <svg viewBox="0 0 100 100">
              {topicCounts.length === 0 ? (
                <circle cx="50" cy="50" r="45" fill="#e5e7eb" />
              ) : (
                (() => {
                  const total = topicCounts.reduce((s, e) => s + e[1], 0);
                  let acc = 0;
                  return topicCounts.map(([topicKey, count], idx) => {
                    const pct = (count / total) * 100;
                    const start = (acc / total) * 360;
                    const end = ((acc + count) / total) * 360;
                    acc += count;

                    const startRad = (start - 90) * (Math.PI / 180);
                    const endRad = (end - 90) * (Math.PI / 180);
                    const x1 = 50 + 45 * Math.cos(startRad);
                    const y1 = 50 + 45 * Math.sin(startRad);
                    const x2 = 50 + 45 * Math.cos(endRad);
                    const y2 = 50 + 45 * Math.sin(endRad);
                    const large = pct > 50 ? 1 : 0;
                    const d = `M 50 50 L ${x1} ${y1} A 45 45 0 ${large} 1 ${x2} ${y2} Z`;

                    return <path key={topicKey} d={d} fill={colors[idx % colors.length]} stroke="white" strokeWidth="1" />;
                  });
                })()
              )}
            </svg>
          </div>

          <div className={styles['chart-legend']}>
            {topicCounts.length > 0 ? (
              topicCounts.map(([topicKey, count], idx) => (
                <div key={topicKey} className={styles['legend-item']}>
                  <div className={styles['legend-color']} style={{ backgroundColor: colors[idx % colors.length] }} />
                  <span>{getTopicTitle(topicKey)} ({count})</span>
                </div>
              ))
            ) : (
              <div className={styles['legend-item']}>No data yet</div>
            )}
          </div>
        </div>

        <div className={styles['table-container']}>
          <div className={styles['table-title']}>Top 10 Scores {selectedTopic !== 'All' ? `- ${selectedTopic}` : ''}</div>

          {filtered.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Topic</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 10).map((s, i) => (
                  <tr key={s.id || `${s.username}-${i}`}>
                    <td className={styles.rank}><span className={styles.medal}>{getMedal(i + 1)}</span></td>
                    <td className={styles.username}>{s.username}</td>
                    <td><span className={styles['topic-badge']}>{getTopicTitle(s.topic || s.topicTitle)}</span></td>
                    <td className={styles['score-cell']}>{s.score}/{s.maxScore}</td>
                    <td>{s.percentage}%</td>
                    <td>{s.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles['empty-message']}>No scores found. Be the first to take a quiz!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
