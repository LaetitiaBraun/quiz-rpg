import { useState, useEffect } from 'react';
import '../styles/ProfileScreen.css';

export default function ProfileScreen({ character, onBack }) {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    successRate: 0,
    storyProgress: 0,
    animeProgress: 0,
    codeProgress: 0,
    totalTime: 0,
    sessions: 0,
    achievements: 0
  });

  useEffect(() => {
    calculateStats();
  }, [character]);

  const calculateStats = () => {
    const completedQuestions = Object.keys(character.completedQuestions || {}).length;
    const correctAnswers = Object.values(character.completedQuestions || {}).filter(q => q.correct).length;
    const successRate = completedQuestions > 0 ? Math.round((correctAnswers / completedQuestions) * 100) : 0;

    const storyMax = 15;
    const animeMax = 25;
    const codeMax = 25;

    const storyCompleted = character.progress?.story?.chapter || 1;
    const animeCompleted = character.progress?.anime?.completed || 0;
    const codeCompleted = character.progress?.programming?.completed || 0;

    const unlockedBadges = (character.unlockedBadges || []).length;

    setStats({
      totalQuestions: completedQuestions,
      correctAnswers: correctAnswers,
      successRate: successRate,
      storyProgress: Math.min(storyCompleted / storyMax * 100, 100),
      animeProgress: Math.min(animeCompleted / animeMax * 100, 100),
      codeProgress: Math.min(codeCompleted / codeMax * 100, 100),
      storyCompleted: storyCompleted,
      animeCompleted: animeCompleted,
      codeCompleted: codeCompleted,
      totalTime: Math.floor((character.totalXP || 0) / 50), // estimation en minutes
      sessions: Math.max(completedQuestions / 10, 1),
      achievements: unlockedBadges,
      maxCombo: character.maxCombo || 0,
      arenaWins: character.arenaWins || 0
    });
  };

  const getSuccessRateColor = (rate) => {
    if (rate >= 80) return '#5dcaa5'; // green
    if (rate >= 60) return '#ffd700'; // gold
    return '#ff6b6b'; // red
  };

  const getProgressBarColor = (progress) => {
    if (progress >= 75) return 'progress-high';
    if (progress >= 50) return 'progress-medium';
    return 'progress-low';
  };

  return (
    <div className="profile-screen">
      <div className="profile-container">
        <div className="profile-header">
          <button className="profile-back" onClick={onBack}>← Retour</button>
          <h1>Profil de {character.name}</h1>
          <div className="profile-level">
            Niveau <span className="level-number">{character.level}</span>
          </div>
        </div>

        {/* XP Bar */}
        <div className="profile-xp-section">
          <div className="xp-info">
            <span className="xp-label">Progression XP</span>
            <span className="xp-value">{character.xp} / {character.maxXp}</span>
          </div>
          <div className="xp-bar">
            <div 
              className="xp-fill" 
              style={{ width: `${(character.xp / character.maxXp) * 100}%` }}
            >
              {Math.round((character.xp / character.maxXp) * 100)}%
            </div>
          </div>
          <div className="total-xp">XP Total: {character.totalXP || 0}</div>
        </div>

        {/* Main Stats Grid */}
        <div className="stats-grid">
          {/* Success Rate */}
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Taux de Réussite</h3>
              <div className="stat-value" style={{ color: getSuccessRateColor(stats.successRate) }}>
                {stats.successRate}%
              </div>
              <p className="stat-detail">{stats.correctAnswers} / {stats.totalQuestions}</p>
            </div>
          </div>

          {/* Total Questions */}
          <div className="stat-card">
            <div className="stat-icon">❓</div>
            <div className="stat-content">
              <h3>Questions</h3>
              <div className="stat-value">{stats.totalQuestions}</div>
              <p className="stat-detail">répondues</p>
            </div>
          </div>

          {/* Max Combo */}
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <h3>Meilleur Combo</h3>
              <div className="stat-value">{stats.maxCombo}</div>
              <p className="stat-detail">réponses consécutives</p>
            </div>
          </div>

          {/* Arena Wins */}
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <h3>Victoires Arena</h3>
              <div className="stat-value">{stats.arenaWins}</div>
              <p className="stat-detail">combats remportés</p>
            </div>
          </div>

          {/* Achievements */}
          <div className="stat-card">
            <div className="stat-icon">🎖️</div>
            <div className="stat-content">
              <h3>Achievements</h3>
              <div className="stat-value">{stats.achievements}</div>
              <p className="stat-detail">débloqués</p>
            </div>
          </div>

          {/* Time Played */}
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <h3>Temps Joué</h3>
              <div className="stat-value">{stats.totalTime}m</div>
              <p className="stat-detail">estimé</p>
            </div>
          </div>
        </div>

        {/* Progress by Universe */}
        <div className="progress-section">
          <h2>Progression par Univers</h2>

          <div className="universe-progress">
            <div className="universe-card">
              <div className="universe-header">
                <span className="universe-icon">📖</span>
                <h3>Story Quest</h3>
              </div>
              <div className="progress-info">
                <span>{stats.storyCompleted} / 15 Chapitres</span>
              </div>
              <div className={`progress-bar ${getProgressBarColor(stats.storyProgress)}`}>
                <div 
                  className="progress-fill" 
                  style={{ width: `${stats.storyProgress}%` }}
                ></div>
              </div>
              <div className="progress-percentage">{Math.round(stats.storyProgress)}%</div>
            </div>

            <div className="universe-card">
              <div className="universe-header">
                <span className="universe-icon">✂️</span>
                <h3>Anime Quest</h3>
              </div>
              <div className="progress-info">
                <span>{stats.animeCompleted} / 25 Questions</span>
              </div>
              <div className={`progress-bar ${getProgressBarColor(stats.animeProgress)}`}>
                <div 
                  className="progress-fill" 
                  style={{ width: `${stats.animeProgress}%` }}
                ></div>
              </div>
              <div className="progress-percentage">{Math.round(stats.animeProgress)}%</div>
            </div>

            <div className="universe-card">
              <div className="universe-header">
                <span className="universe-icon">💻</span>
                <h3>Code Quest</h3>
              </div>
              <div className="progress-info">
                <span>{stats.codeCompleted} / 25 Questions</span>
              </div>
              <div className={`progress-bar ${getProgressBarColor(stats.codeProgress)}`}>
                <div 
                  className="progress-fill" 
                  style={{ width: `${stats.codeProgress}%` }}
                ></div>
              </div>
              <div className="progress-percentage">{Math.round(stats.codeProgress)}%</div>
            </div>
          </div>
        </div>

        {/* Character Stats */}
        <div className="character-stats-section">
          <h2>Stats du Personnage</h2>
          <div className="character-stats-grid">
            <div className="char-stat">
              <span className="stat-name">Force</span>
              <div className="stat-bar">
                <div className="stat-bar-fill" style={{ width: `${(character.stats.strength / 20) * 100}%` }}></div>
              </div>
              <span className="stat-number">{character.stats.strength}</span>
            </div>
            <div className="char-stat">
              <span className="stat-name">Intelligence</span>
              <div className="stat-bar">
                <div className="stat-bar-fill" style={{ width: `${(character.stats.intelligence / 20) * 100}%` }}></div>
              </div>
              <span className="stat-number">{character.stats.intelligence}</span>
            </div>
            <div className="char-stat">
              <span className="stat-name">Sagesse</span>
              <div className="stat-bar">
                <div className="stat-bar-fill" style={{ width: `${(character.stats.wisdom / 20) * 100}%` }}></div>
              </div>
              <span className="stat-number">{character.stats.wisdom}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
