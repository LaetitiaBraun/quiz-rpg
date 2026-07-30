import { useState, useEffect } from 'react';
import '../styles/ArenaBattle.css';
import { getOpponentById } from '../data/arenaDB';
import { SoundSystem } from '../utils/SoundSystem';

export default function ArenaBattle({ opponent, character, equipmentStats, onBattleEnd, t }) {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);
  const [battleLog, setBattleLog] = useState(['Le duel commence!']);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [battleOver, setBattleOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const calculateDamage = (attacker, defender, isPlayer = false) => {
    const attackerStats = isPlayer ? {
      strength: character.stats.strength + (equipmentStats?.strength || 0),
      wisdom: character.stats.wisdom + (equipmentStats?.wisdom || 0)
    } : attacker.stats;

    const defenderStats = isPlayer ? {
      wisdom: character.stats.wisdom + (equipmentStats?.wisdom || 0)
    } : {
      wisdom: defender.stats.wisdom
    };

    const baseDamage = attackerStats.strength * 0.8;
    const variability = Math.random() * 10 - 5;
    const defenseFactor = 1 - (defenderStats.wisdom * 0.02);
    return Math.max(5, Math.round((baseDamage + variability) * defenseFactor));
  };

  const playerAttack = () => {
    if (!isPlayerTurn || battleOver) return;

    const damage = calculateDamage(character, opponent, true);
    const newOpponentHealth = Math.max(0, opponentHealth - damage);
    
    setOpponentHealth(newOpponentHealth);
    setBattleLog(prev => [...prev, `${character.name} inflige ${damage} dégâts!`]);
    SoundSystem.playClick();

    if (newOpponentHealth <= 0) {
      setBattleOver(true);
      setWinner('player');
      setBattleLog(prev => [...prev, `🎉 ${character.name} a gagné le duel!`]);
      SoundSystem.playLevelUp();
    } else {
      setIsPlayerTurn(false);
    }
  };

  const opponentAttack = () => {
    const opponentObj = getOpponentById(opponent.id);
    const damage = calculateDamage(opponentObj, character, false);
    const newPlayerHealth = Math.max(0, playerHealth - damage);
    
    setPlayerHealth(newPlayerHealth);
    setBattleLog(prev => [...prev, `${opponent.name} inflige ${damage} dégâts!`]);
    SoundSystem.playClick();

    if (newPlayerHealth <= 0) {
      setBattleOver(true);
      setWinner('opponent');
      setBattleLog(prev => [...prev, `💀 ${opponent.name} a gagné le duel!`]);
    } else {
      setIsPlayerTurn(true);
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && !battleOver) {
      const timer = setTimeout(() => {
        opponentAttack();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, battleOver]);

  const playerPercentage = Math.max(0, playerHealth);
  const opponentPercentage = Math.max(0, opponentHealth);

  return (
    <div className="arena-battle">
      <div className="battle-container">
        {/* Joueur */}
        <div className="combatant-section player-section">
          <div className="combatant-name">{character.name}</div>
          <div className="combatant-emoji">🧙</div>
          <div className="health-bar-container">
            <div 
              className="health-bar"
              style={{ width: `${playerPercentage}%` }}
            ></div>
          </div>
          <div className="health-text">{Math.round(playerHealth)}/100 HP</div>
          <div className="stats-display">
            <div>Force: {character.stats.strength + (equipmentStats?.strength || 0)}</div>
            <div>Int: {character.stats.intelligence + (equipmentStats?.intelligence || 0)}</div>
            <div>Sag: {character.stats.wisdom + (equipmentStats?.wisdom || 0)}</div>
          </div>
        </div>

        {/* VS */}
        <div className="vs-indicator">VS</div>

        {/* Opposant */}
        <div className="combatant-section opponent-section">
          <div className="combatant-name">{opponent.name}</div>
          <div className="combatant-emoji">{opponent.emoji}</div>
          <div className="health-bar-container">
            <div 
              className="health-bar"
              style={{ width: `${opponentPercentage}%` }}
            ></div>
          </div>
          <div className="health-text">{Math.round(opponentHealth)}/100 HP</div>
          <div className="stats-display">
            <div>Force: {opponent.stats.strength}</div>
            <div>Int: {opponent.stats.intelligence}</div>
            <div>Sag: {opponent.stats.wisdom}</div>
          </div>
        </div>
      </div>

      {/* Battle Log */}
      <div className="battle-log">
        {battleLog.map((log, idx) => (
          <div key={idx} className="log-entry">{log}</div>
        ))}
      </div>

      {/* Controls */}
      <div className="battle-controls">
        {!battleOver ? (
          <>
            {isPlayerTurn ? (
              <button className="button button-attack" onClick={playerAttack}>
                ⚔️ Attaquer
              </button>
            ) : (
              <div className="waiting-text">L'opposant attaque...</div>
            )}
          </>
        ) : (
          <div className="battle-result">
            <div className={`result-text ${winner === 'player' ? 'victory' : 'defeat'}`}>
              {winner === 'player' ? (t?.victory || '🎉 VICTOIRE!') : (t?.defeat || '💀 DÉFAITE!')}
            </div>
            <button 
              className="button button-finish"
              onClick={() => onBattleEnd(winner === 'player')}
            >
              Retourner au Hub
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
