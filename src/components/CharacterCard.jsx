import { getEquipmentById } from '../data/equipmentDB';
import '../styles/CharacterCard.css';

export default function CharacterCard({ character, equipmentStats, t }) {
  const xpPercentage = (character.xp / character.maxXp) * 100;
  const totalStats = {
    strength: character.stats.strength + (equipmentStats?.strength || 0),
    intelligence: character.stats.intelligence + (equipmentStats?.intelligence || 0),
    wisdom: character.stats.wisdom + (equipmentStats?.wisdom || 0)
  };

  return (
    <div className="character-card">
      <div className="character-name">{character.name}</div>
      <div className="character-level">{t?.level || 'Niveau'} {character.level}</div>
      
      <div className="xp-bar-container">
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${xpPercentage}%` }} />
          <div className="xp-percent">{Math.round(xpPercentage)}%</div>
        </div>
      </div>
      <div className="xp-text">{character.xp} / {character.maxXp} XP</div>

      <div className="streak-combo-section">
        <div className="streak-badge">
          <span className="streak-label">{t?.streak || '🔥 Streak'}</span>
          <span className="streak-value">{character.perfectStreak || 0}</span>
        </div>
        <div className="combo-badge">
          <span className="combo-label">{t?.combo || '⚡ Combo'}</span>
          <span className="combo-value">{character.currentCombo || 0}</span>
        </div>
      </div>

      <div className="equipment-preview">
        <div className="equipped-icons">
          {character.equipment.weapon && <span title={t?.weapon || 'Arme'}>{getEquipmentEmoji(character.equipment.weapon)}</span>}
          {character.equipment.armor && <span title={t?.armor || 'Armure'}>{getEquipmentEmoji(character.equipment.armor)}</span>}
          {character.equipment.accessory && <span title={t?.accessory || 'Accessoire'}>{getEquipmentEmoji(character.equipment.accessory)}</span>}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-value">{totalStats.strength}</div>
          <div className="stat-label">{t?.force || 'FORCE'}</div>
          {equipmentStats?.strength > 0 && <div className="stat-bonus">+{equipmentStats.strength}</div>}
        </div>
        <div className="stat-box">
          <div className="stat-value">{totalStats.intelligence}</div>
          <div className="stat-label">{t?.intelligence || 'INTELLIGENCE'}</div>
          {equipmentStats?.intelligence > 0 && <div className="stat-bonus">+{equipmentStats.intelligence}</div>}
        </div>
        <div className="stat-box">
          <div className="stat-value">{totalStats.wisdom}</div>
          <div className="stat-label">{t?.wisdom || 'SAGESSE'}</div>
          {equipmentStats?.wisdom > 0 && <div className="stat-bonus">+{equipmentStats.wisdom}</div>}
        </div>
      </div>
    </div>
  );
}

function getEquipmentEmoji(equipmentId) {
  const equipment = getEquipmentById(equipmentId);
  return equipment?.emoji || '?';
}
