import { useState } from 'react';
import '../styles/ArenaScreen.css';
import { ARENA_OPPONENTS, getOpponentById, getDifficultyColor, getRecommendedLevel } from '../data/arenaDB';

export default function ArenaScreen({ character, onBack, onStartDuel, t }) {
  const [selectedOpponent, setSelectedOpponent] = useState(null);

  const handleChallenge = (opponent) => {
    if (character.level < getRecommendedLevel(opponent.difficulty)) {
      alert(`Niveau recommandé: ${getRecommendedLevel(opponent.difficulty)}`);
      return;
    }
    onStartDuel(opponent);
  };

  return (
    <div className="arena-screen">
      <button className="button button-back" onClick={onBack}>← Retour au Hub</button>

      <div className="arena-header">
        <h1>🏟️ ARENA - Duels Multijoueur</h1>
        <p className="arena-subtitle">Affrontez d'autres guerriers et gagnez des récompenses!</p>
      </div>

      <div className="arena-stats">
        <div className="player-info">
          <div className="info-card">
            <span className="info-label">Niveau</span>
            <span className="info-value">{character.level}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Victoires</span>
            <span className="info-value">{character.arenaWins || 0}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Rang</span>
            <span className="info-value">#{character.arenaRank || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="opponents-section">
        <h2{t?.chooseOpponent || 'Opposants Disponibles'}</h2>
        
        <div className="opponents-grid">
          {ARENA_OPPONENTS.map(opponent => (
            <div 
              key={opponent.id} 
              className="opponent-card"
              style={{ 
                borderColor: getDifficultyColor(opponent.difficulty),
                opacity: character.level >= getRecommendedLevel(opponent.difficulty) ? 1 : 0.5
              }}
            >
              <div className="opponent-emoji">{opponent.emoji}</div>
              
              <div className="opponent-name">{opponent.name}</div>
              
              <div className="opponent-level">Niveau {opponent.level}</div>
              
              <div 
                className="difficulty-badge"
                style={{ backgroundColor: getDifficultyColor(opponent.difficulty) }}
              >
                {opponent.difficulty}
              </div>

              <div className="opponent-stats">
                <div className="stat-row">
                  <span>Force:</span>
                  <span>{opponent.stats.strength}</span>
                </div>
                <div className="stat-row">
                  <span>Int:</span>
                  <span>{opponent.stats.intelligence}</span>
                </div>
                <div className="stat-row">
                  <span>Sag:</span>
                  <span>{opponent.stats.wisdom}</span>
                </div>
              </div>

              <div className="reward-badge">⭐ +{opponent.reward} XP</div>

              <button 
                className={`button button-challenge ${character.level < getRecommendedLevel(opponent.difficulty) ? 'disabled' : ''}`}
                onClick={() => handleChallenge(opponent)}
                disabled={character.level < getRecommendedLevel(opponent.difficulty)}
              >
                Affronter
              </button>

              {character.level < getRecommendedLevel(opponent.difficulty) && (
                <div className="level-required">
                  Niv. {getRecommendedLevel(opponent.difficulty)} requis
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="arena-info">
        <h3>ℹ️ Règles Arena</h3>
        <ul>
          <li>Gagnez des XP en remportant des duels</li>
          <li>Montez en rang pour débloquer des opposants</li>
          <li>Chaque victoire augmente votre taux de réussite</li>
          <li>Les défaites ne vous font pas perdre d'XP</li>
        </ul>
      </div>
    </div>
  );
}
