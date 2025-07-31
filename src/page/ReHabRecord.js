import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { api, tokenManager } from '../utils/api';
import './ReHabRecord.css';

function ReHabRecord() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scores, setScores] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const token = tokenManager.getToken();
      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      const [scoresResponse, statsResponse] = await Promise.all([
        api.scores.getAll(token),
        api.scores.getStats(token)
      ]);

      if (scoresResponse.success) {
        setScores(scoresResponse.scores || []);
      }

      if (statsResponse.success) {
        setStats(statsResponse.stats);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching scores:', error);
      setError('Failed to load scores');
      setLoading(false);
    }
  };

  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = {};
    
    // Initialize all months with 0
    months.forEach(month => {
      monthlyData[month] = 0;
    });

    // Fill in actual data from scores
    scores.forEach(score => {
      const date = new Date(score.createdAt);
      const month = months[date.getMonth()];
      if (monthlyData[month] !== undefined) {
        monthlyData[month] = Math.max(monthlyData[month], score.score);
      }
    });

    return months.map(month => ({
      month,
      value: monthlyData[month]
    }));
  };

  const getTopScore = () => {
    if (scores.length === 0) return { score: 0, exercise: 'No exercises yet' };
    const topScore = scores.reduce((max, score) => 
      score.score > max.score ? score : max
    );
    return {
      score: topScore.score,
      exercise: topScore.exercise || 'Office Syndrome Rehab'
    };
  };

  const getAverageScore = () => {
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, score) => sum + score.score, 0);
    return Math.round(total / scores.length);
  };

  const getLowestScore = () => {
    if (scores.length === 0) return { score: 0, exercise: 'No exercises yet' };
    const lowestScore = scores.reduce((min, score) => 
      score.score < min.score ? score : min
    );
    return {
      score: lowestScore.score,
      exercise: lowestScore.exercise || 'Office Syndrome Rehab'
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="rehab-record-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rehab-record-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  const monthlyData = getMonthlyData();
  const topScore = getTopScore();
  const averageScore = getAverageScore();
  const lowestScore = getLowestScore();

  return (
    <div className="rehab-record-container">
      {/* Header */}
      <div className="record-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="record-title">Rehab Record</h1>
      </div>

      {/* Main Content Card */}
      <div className="record-card">
        {/* Performance Chart */}
        <div className="chart-section">
          <h2 className="chart-title">Performance</h2>
          <div className="chart-container">
            <div className="chart-bars">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="chart-bar-container">
                  <div 
                    className={`chart-bar ${data.value > 0 ? 'has-data' : ''}`}
                    style={{ height: `${(data.value / 10) * 100}%` }}
                  >
                    <span className="bar-value">{data.value}</span>
                  </div>
                  <span className="bar-label">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="chart-y-axis">
              {[10, 8, 6, 4, 2, 0].map(value => (
                <div key={value} className="y-axis-label">{value}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Score Cards */}
        <div className="score-cards">
          <div className="score-card">
            <h3 className="score-title">Top Score</h3>
            <div className="score-circle">
              <div className="circle-progress" style={{ '--progress': `${(topScore.score / 10) * 100}%` }}>
                <span className="score-value">{topScore.score}</span>
              </div>
            </div>
            <p className="score-description">{topScore.exercise}</p>
          </div>

          <div className="score-card">
            <h3 className="score-title">Average Score</h3>
            <div className="score-circle">
              <div className="circle-progress" style={{ '--progress': `${(averageScore / 10) * 100}%` }}>
                <span className="score-value">{averageScore}</span>
              </div>
            </div>
          </div>

          <div className="score-card">
            <h3 className="score-title">Lowest Score</h3>
            <div className="score-circle">
              <div className="circle-progress" style={{ '--progress': `${(lowestScore.score / 10) * 100}%` }}>
                <span className="score-value">{lowestScore.score}</span>
              </div>
            </div>
            <p className="score-description">{lowestScore.exercise}</p>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-section">
          <div className="table-header">
            <div className="table-cell">Symptom</div>
            <div className="table-cell">Exercise</div>
            <div className="table-cell">Score</div>
            <div className="table-cell">Date</div>
            <div className="table-cell">Video Detail</div>
          </div>
          
          {scores.length > 0 ? (
            scores.slice(0, 3).map((score, index) => (
              <div key={score._id || index} className="table-row">
                <div className="table-cell">Office Syndrome</div>
                <div className="table-cell">{score.exercise || 'Office Syndrome Rehab'}</div>
                <div className="table-cell score-cell">{score.score}/10</div>
                <div className="table-cell">{formatDate(score.createdAt)}</div>
                <div className="table-cell">
                  <button className="video-detail-btn">View</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="placeholder-row"></div>
              <div className="placeholder-row"></div>
              <div className="placeholder-row"></div>
            </div>
          )}
        </div>

        {/* View More Button */}
        <div className="view-more-section">
          <button className="view-more-btn" onClick={() => navigate('/officesyndromerehab')}>
            View More
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReHabRecord; 