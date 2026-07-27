import { getEquipmentById } from '../data/equipmentDB';

export default function CharacterCard({ character, equipmentStats }) {
  const xpPercentage = (character.xp / character.maxXp) * 100;
  const totalStats = {
    strength: character.stats.strength + (equipmentStats?.strength || 0),
    intelligence: character.stats.intelligence + (equipmentStats?.intelligence || 0),
    wisdom: character.stats.wisdom + (equipmentStats?.wisdom || 0)
  };

  return (
    <div className="character-card">
      <div className="character-name">{character.name}</div>
      <div className="character-level">Niveau {character.level}</div>
      
      <div className="xp-bar">
        <div 
          className="xp-fill" 
          style={{ width: `${xpPercentage}%` }}
        >
          {Math.round(xpPercentage)}%
        </div>
      </div>
      <div className="xp-text">
        {character.xp} / {character.maxXp} XP
      </div>

      <div className="streak-combo-section">
        {character.perfectStreak > 0 && (
          <div className="streak-badge">
            <span className="streak-label">🔥 Streak</span>
            <span className="streak-value">{character.perfectStreak}</span>
          </div>
        )}
        {character.currentCombo > 0 && (
          <div className="combo-badge">
            <span className="combo-label">⚡ Combo</span>
            <span className="combo-value">{character.currentCombo}</span>
          </div>
        )}
      </div>

      <div className="equipment-preview">
        <div className="equipped-icons">
          {character.equipment.weapon && <span title="Arme">{getEquipmentEmoji(character.equipment.weapon)}</span>}
          {character.equipment.armor && <span title="Armure">{getEquipmentEmoji(character.equipment.armor)}</span>}
          {character.equipment.accessory && <span title="Accessoire">{getEquipmentEmoji(character.equipment.accessory)}</span>}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-value">{totalStats.strength}</div>
          <div className="stat-label">Force</div>
          {equipmentStats?.strength > 0 && (
            <div className="stat-bonus">+{equipmentStats.strength}</div>
          )}
        </div>
        <div className="stat-box">
          <div className="stat-value">{totalStats.intelligence}</div>
          <div className="stat-label">Intelligence</div>
          {equipmentStats?.intelligence > 0 && (
            <div className="stat-bonus">+{equipmentStats.intelligence}</div>
          )}
        </div>
        <div className="stat-box">
          <div className="stat-value">{totalStats.wisdom}</div>
          <div className="stat-label">Sagesse</div>
          {equipmentStats?.wisdom > 0 && (
            <div className="stat-bonus">+{equipmentStats.wisdom}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function getEquipmentEmoji(equipmentId) {
  const equipment = getEquipmentById(equipmentId);
  return equipment?.emoji || '?';
}
