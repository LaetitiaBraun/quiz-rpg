import '../styles/HubScreen.css';
import QuestCard from './QuestCard';
import CharacterCard from './CharacterCard';

export default function HubScreen({ character, onStartQuest, equipmentStats, onOpenEquipment, onOpenBadges, onOpenLeaderboard, onOpenDailyQuests, onOpenArena, onEditName, onOpenBackup, onOpenProfile }) {
  const handleQuestCardClick = (universe) => {
    if (universe === 'arena') {
      onOpenArena();
    } else {
      onStartQuest(universe);
    }
  };

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
        <button className="button button-daily-quests" onClick={onOpenDailyQuests}>
          📅 Quêtes Quotidiennes
        </button>
        <button className="button button-backup" onClick={onOpenBackup}>
          💾 Sauvegardes
        </button>
        <button className="button button-profile" onClick={onOpenProfile}>
          📊 Profil
        </button>
      </div>
      
      <div className="quest-grid">
        <QuestCard 
          universe="anime"
          character={character}
          onStart={handleQuestCardClick}
        />
        <QuestCard 
          universe="programming"
          character={character}
          onStart={handleQuestCardClick}
        />
        <QuestCard 
          universe="story"
          character={character}
          onStart={handleQuestCardClick}
        />
        <QuestCard 
          universe="arena"
          character={character}
          onStart={handleQuestCardClick}
        />
      </div>
    </div>
  );
}
