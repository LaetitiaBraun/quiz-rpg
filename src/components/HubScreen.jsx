import '../styles/HubScreen.css';
import QuestCard from './QuestCard';
import CharacterCard from './CharacterCard';

export default function HubScreen({ character, onStartQuest, equipmentStats, onOpenEquipment }) {
  return (
    <div className="hub-screen">
      <CharacterCard character={character} equipmentStats={equipmentStats} />
      
      <button className="button button-equipment" onClick={onOpenEquipment}>
        ⚔️ Équipement
      </button>
      
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
