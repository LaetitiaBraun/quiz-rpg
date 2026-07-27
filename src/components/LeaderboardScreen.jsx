import { useState, useEffect } from 'react';
import '../styles/LeaderboardScreen.css';
import { storageManager } from '../utils/StorageManager';

export default function LeaderboardScreen({ character, onBack }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerRank, setPlayerRank] = useState(null);

  useEffect(() => {
    const loadAndUpdateLeaderboard = async () => {
      try {
        // Charger depuis IndexedDB
        let lb = await storageManager.loadLeaderboard();

        // Ajouter ou mettre à jour le joueur actuel
        const playerEntry = {
          name: character.name,
          level: character.level,
          totalXP: character.totalXP || 0,
          timestamp: new Date().toISOString()
        };

        // Supprimer ancienne entrée du même nom si elle existe
        lb = lb.filter(entry => entry.name !== character.name);
        
        // Ajouter la nouvelle
        lb.push(playerEntry);

        // Trier par totalXP (descending)
        lb.sort((a, b) => b.totalXP - a.totalXP);

        // Garder seulement top 10
        lb = lb.slice(0, 10);

        // Sauvegarder dans IndexedDB
        await storageManager.saveLeaderboard(lb);
        setLeaderboard(lb);

        // Trouver le rank du joueur actuel
        const rank = lb.findIndex(entry => entry.name === character.name);
        setPlayerRank(rank + 1);
      } catch (error) {
        console.warn('Leaderboard load/save failed:', error);
      }
    };

    loadAndUpdateLeaderboard();
  }, [character.name, character.level, character.totalXP]);

  return (
    <div className="leaderboard-screen">
      <button className="button button-back" onClick={onBack}>← Retour au Hub</button>

      <div className="leaderboard-header">
        <h1>🏅 Classement des Héros</h1>
        {playerRank && (
          <div className="player-rank-badge">
            <p>Ta position: <strong>#{playerRank}</strong></p>
            <p className="player-xp">{character.totalXP || 0} XP</p>
          </div>
        )}
      </div>

      <div className="leaderboard-table">
        <div className="leaderboard-header-row">
          <div className="rank-col">Rang</div>
          <div className="name-col">Nom du Héros</div>
          <div className="level-col">Niveau</div>
          <div className="xp-col">XP Total</div>
        </div>

        {leaderboard.length === 0 ? (
          <div className="empty-leaderboard">
            <p>Aucun score enregistré... Sois le premier! 🚀</p>
          </div>
        ) : (
          leaderboard.map((entry, idx) => {
            const isCurrentPlayer = entry.name === character.name;
            const medalEmoji = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`;

            return (
              <div 
                key={idx} 
                className={`leaderboard-row ${isCurrentPlayer ? 'current-player' : ''} rank-${idx}`}
              >
                <div className="rank-col medal">{medalEmoji}</div>
                <div className="name-col">
                  {isCurrentPlayer && '👑 '}
                  {entry.name}
                </div>
                <div className="level-col">
                  <span className="level-badge">Lvl {entry.level}</span>
                </div>
                <div className="xp-col">
                  <span className="xp-amount">{entry.totalXP.toLocaleString()}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="leaderboard-footer">
        <p className="leaderboard-tip">
          📊 Le classement se met à jour automatiquement après chaque quête!
        </p>
        <p className="leaderboard-stats">
          Total des joueurs: <strong>{leaderboard.length}</strong>
        </p>
      </div>
    </div>
  );
}
