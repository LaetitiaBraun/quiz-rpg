import '../styles/EquipmentScreen.css';
import { getEquipmentById, getAvailableEquipment, getRarityColor } from '../data/equipmentDB';

export default function EquipmentScreen({ character, onEquip, onUnequip, onBack }) {
  const equipmentStats = calculateEquipmentStats(character.equipment);
  const availableEquipment = getAvailableEquipment(character.level);

  return (
    <div className="equipment-screen">
      <button className="button button-back" onClick={onBack}>← Retour au Hub</button>

      <div className="equipment-container">
        {/* Équipement Actuellement Équipé */}
        <div className="equipped-section">
          <h2 className="section-title">⚔️ Équipement Équipé</h2>
          
          <div className="equipment-slots">
            <EquipmentSlot 
              slot="weapon"
              label="Arme"
              equipmentId={character.equipment.weapon}
              onUnequip={() => onUnequip('weapon')}
            />
            <EquipmentSlot 
              slot="armor"
              label="Armure"
              equipmentId={character.equipment.armor}
              onUnequip={() => onUnequip('armor')}
            />
            <EquipmentSlot 
              slot="accessory"
              label="Accessoire"
              equipmentId={character.equipment.accessory}
              onUnequip={() => onUnequip('accessory')}
            />
          </div>

          {/* Bonus Stats */}
          <div className="bonus-stats">
            <h3>Bonus d'Équipement</h3>
            <div className="bonus-stat">
              <span>Force:</span>
              <span className="bonus-value">+{equipmentStats.strength}</span>
            </div>
            <div className="bonus-stat">
              <span>Intelligence:</span>
              <span className="bonus-value">+{equipmentStats.intelligence}</span>
            </div>
            <div className="bonus-stat">
              <span>Sagesse:</span>
              <span className="bonus-value">+{equipmentStats.wisdom}</span>
            </div>
          </div>
        </div>

        {/* Inventaire */}
        <div className="inventory-section">
          <h2 className="section-title">🎒 Inventaire ({character.inventory.length})</h2>
          
          {character.inventory.length === 0 ? (
            <p className="empty-inventory">Aucun objet dans l'inventaire</p>
          ) : (
            <div className="inventory-grid">
              {character.inventory.map(equipId => (
                <InventoryItem 
                  key={equipId}
                  equipmentId={equipId}
                  isEquipped={Object.values(character.equipment).includes(equipId)}
                  onEquip={onEquip}
                />
              ))}
            </div>
          )}

          {/* Équipement Disponible */}
          <div className="available-section">
            <h3>🔓 Équipement Disponible (Niveau {character.level})</h3>
            {availableEquipment.length === 0 ? (
              <p className="empty-msg">Aucun nouvel équipement disponible</p>
            ) : (
              <div className="available-grid">
                {availableEquipment
                  .filter(eq => !character.inventory.includes(eq.id))
                  .slice(0, 6)
                  .map(equipment => (
                    <div key={equipment.id} className="available-item">
                      <div className="item-emoji">{equipment.emoji}</div>
                      <div className="item-name">{equipment.name}</div>
                      <div 
                        className="item-rarity"
                        style={{ color: getRarityColor(equipment.rarity) }}
                      >
                        {equipment.rarity}
                      </div>
                      <button 
                        className="button button-small"
                        onClick={() => {
                          // Ajoute à l'inventaire
                          character.inventory.push(equipment.id);
                          onEquip(equipment.id);
                        }}
                      >
                        Obtenir
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EquipmentSlot({ slot, label, equipmentId, onUnequip }) {
  const equipment = equipmentId ? getEquipmentById(equipmentId) : null;

  return (
    <div className="equipment-slot">
      <div className="slot-label">{label}</div>
      {equipment ? (
        <div className="equipped-item">
          <div className="item-emoji-big">{equipment.emoji}</div>
          <div className="item-details">
            <div className="item-name-small">{equipment.name}</div>
            <div className="item-stats-small">
              +{equipment.stats.strength} Force | +{equipment.stats.intelligence} Int | +{equipment.stats.wisdom} Sag
            </div>
          </div>
          <button className="button-remove" onClick={onUnequip}>✕</button>
        </div>
      ) : (
        <div className="empty-slot">
          <div className="empty-text">Vide</div>
        </div>
      )}
    </div>
  );
}

function InventoryItem({ equipmentId, isEquipped, onEquip }) {
  const equipment = getEquipmentById(equipmentId);

  return (
    <div 
      className="inventory-item"
      style={{ opacity: isEquipped ? 1 : 0.7 }}
    >
      <div className="item-emoji">{equipment.emoji}</div>
      <div className="item-name">{equipment.name}</div>
      <div 
        className="item-rarity"
        style={{ color: getRarityColor(equipment.rarity) }}
      >
        {equipment.rarity}
      </div>
      {isEquipped && <div className="equipped-badge">✓ Équipé</div>}
      {!isEquipped && (
        <button 
          className="button button-small"
          onClick={() => onEquip(equipmentId)}
        >
          Équiper
        </button>
      )}
    </div>
  );
}

function calculateEquipmentStats(equipment) {
  const stats = { strength: 0, intelligence: 0, wisdom: 0 };
  
  Object.values(equipment).forEach(equipId => {
    if (equipId) {
      const eq = getEquipmentById(equipId);
      if (eq) {
        stats.strength += eq.stats.strength;
        stats.intelligence += eq.stats.intelligence;
        stats.wisdom += eq.stats.wisdom;
      }
    }
  });

  return stats;
}
