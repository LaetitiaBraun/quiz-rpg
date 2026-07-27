import '../styles/HubScreen.css';
import QuestCard from './QuestCard';
import CharacterCard from './CharacterCard';

export default function HubScreen({ character, onStartQuest, equipmentStats, onOpenEquipment, onOpenBadges, onOpenLeaderboard, onEditName }) {
  return (
    <div className="hub-screen">
      <CharacterCard character={character} equipmentStats={equipmentStats} />
      
      <div className="hub-buttons">
        <button className="button button-edit-name" onClick={onEditName}>
          ✏️ Éditer Nom
        </button>
        <button className="button button-equipment" onClick={onOpenEquipment}>
          ⚔️ Équipement
        </button>
        <button className="button button-badges" onClick={onOpenBadges}>
          🏆 Badges ({character.unlockedBadges?.length || 0})
        </button>
        <button className="button button-leaderboard" onClick={onOpenLeaderboard}>
          🏅 Classement
        </button>
      </div>
      
      <div className="quest-grid">
        <QuestCard 
          universe="anime"
          character={character}
          onStart={onStartQuest}
        />
        <QuestCard 
          universe="programming"
          character={character}
          onStart={onStartQuest}
        />
        <QuestCard 
          universe="story"
          character={character}
          onStart={onStartQuest}
        />
        <QuestCard 
          universe="arena"
          character={character}
          onStart={onStartQuest}
          disabled={true}
        />
      </div>
    </div>
  );
}
