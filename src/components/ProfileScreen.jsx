import { useState, useEffect } from 'react';
import '../styles/ProfileScreen.css';

export default function ProfileScreen({ character, onBack, t }) {
  const [stats, setStats] = useState({ totalQuestions: 0, correctAnswers: 0, successRate: 0, storyProgress: 0, animeProgress: 0, codeProgress: 0, totalTime: 0, achievements: 0 });

  useEffect(() => { calculateStats(); }, [character]);

  const calculateStats = () => {
    const completedQuestions = Object.keys(character.completedQuestions || {}).length;
    const correctAnswers = Object.values(character.completedQuestions || {}).filter(q => q === true).length;
    const successRate = completedQuestions > 0 ? Math.round((correctAnswers / completedQuestions) * 100) : 0;
    const storyCompleted = character.progress?.story?.chapter || 1;
    const animeCompleted = character.progress?.anime?.completed || 0;
    const codeCompleted = character.progress?.programming?.completed || 0;
    setStats({
      totalQuestions: completedQuestions, correctAnswers, successRate,
      storyProgress: Math.min(storyCompleted / 15 * 100, 100),
      animeProgress: Math.min(animeCompleted / 75 * 100, 100),
      codeProgress: Math.min(codeCompleted / 75 * 100, 100),
      storyCompleted, animeCompleted, codeCompleted,
      totalTime: Math.floor((character.totalXP || 0) / 50),
      achievements: (character.unlockedBadges || []).length,
      maxCombo: character.maxCombo || 0,
      arenaWins: character.arenaWins || 0
    });
  };

  const getSuccessRateColor = (rate) => rate >= 80 ? '#5dcaa5' : rate >= 60 ? '#ffd700' : '#ff6b6b';
  const getProgressBarColor = (p) => p >= 75 ? 'progress-high' : p >= 50 ? 'progress-medium' : 'progress-low';

  return (
    <div className="profile-screen">
      <div className="profile-container">
        <div className="profile-header">
          <button className="profile-back" onClick={onBack}>{t?.back || '← Retour'}</button>
          <h1>{t?.profileOf ? t.profileOf(character.name) : `Profil de ${character.name}`}</h1>
          <div className="profile-level">{t?.level || 'Niveau'} <span className="level-number">{character.level}</span></div>
        </div>

        <div className="profile-xp-section">
          <div className="xp-info">
            <span className="xp-label">{t?.xpProgress || 'Progression XP'}</span>
            <span className="xp-value">{character.xp} / {character.maxXp}</span>
          </div>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${(character.xp / character.maxXp) * 100}%` }}>
              {Math.round((character.xp / character.maxXp) * 100)}%
            </div>
          </div>
          <div className="total-xp">{t?.totalXP || 'XP Total:'} {character.totalXP || 0}</div>
        </div>

        <div className="profile-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{t?.successRate || 'Taux de Réussite'}</h3>
              <div className="stat-value" style={{ color: getSuccessRateColor(stats.successRate) }}>{stats.successRate}%</div>
              <p className="stat-detail">{stats.correctAnswers} / {stats.totalQuestions}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">❓</div>
            <div className="stat-content">
              <h3>{t?.questions || 'Questions'}</h3>
              <div className="stat-value">{stats.totalQuestions}</div>
              <p className="stat-detail">{t?.questionsAnswered || 'répondues'}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <h3>{t?.bestCombo || 'Meilleur Combo'}</h3>
              <div className="stat-value">{stats.maxCombo}</div>
              <p className="stat-detail">{t?.consecutiveAnswers || 'réponses consécutives'}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <h3>{t?.arenaWins || 'Victoires Arena'}</h3>
              <div className="stat-value">{stats.arenaWins}</div>
              <p className="stat-detail">{t?.battlesWon || 'combats remportés'}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎖️</div>
            <div className="stat-content">
              <h3>{t?.achievements || 'Achievements'}</h3>
              <div className="stat-value">{stats.achievements}</div>
              <p className="stat-detail">{t?.unlocked || 'débloqués'}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <h3>{t?.timePlayed || 'Temps Joué'}</h3>
              <div className="stat-value">{stats.totalTime}m</div>
              <p className="stat-detail">{t?.estimated || 'estimé'}</p>
            </div>
          </div>
        </div>

        <div className="progress-section">
          <h2>{t?.progressByUniverse || 'Progression par Univers'}</h2>
          <div className="universe-progress">
            {[
              { icon: '📖', title: t?.storyTitle || 'Story Quest', done: stats.storyCompleted, max: 15, unit: t?.chapter || 'Chapitres', pct: stats.storyProgress },
              { icon: '⚔️', title: t?.animeTitle || 'Anime Quest', done: stats.animeCompleted, max: 75, unit: t?.questions || 'Questions', pct: stats.animeProgress },
              { icon: '💻', title: t?.codeTitle || 'Code Quest', done: stats.codeCompleted, max: 75, unit: t?.questions || 'Questions', pct: stats.codeProgress },
            ].map((u) => (
              <div key={u.title} className="universe-card">
                <div className="universe-header">
                  <span className="universe-icon">{u.icon}</span>
                  <h3>{u.title}</h3>
                </div>
                <div className="progress-info"><span>{u.done} / {u.max} {u.unit}</span></div>
                <div className={`progress-bar ${getProgressBarColor(u.pct)}`}>
                  <div className="progress-fill" style={{ width: `${u.pct}%` }}></div>
                </div>
                <div className="progress-percentage">{Math.round(u.pct)}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="character-stats-section">
          <h2>{t?.characterStats || 'Stats du Personnage'}</h2>
          <div className="character-stats-grid">
            {[
              { label: t?.force || 'Force', val: character.stats.strength },
              { label: t?.intelligence || 'Intelligence', val: character.stats.intelligence },
              { label: t?.wisdom || 'Sagesse', val: character.stats.wisdom },
            ].map((s) => (
              <div key={s.label} className="char-stat">
                <span className="stat-name">{s.label}</span>
                <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${(s.val / 20) * 100}%` }}></div></div>
                <span className="stat-number">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
