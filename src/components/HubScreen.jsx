import '../styles/HubScreen.css';
import QuestCard from './QuestCard';
import CharacterCard from './CharacterCard';

export default function HubScreen({ character, onStartQuest, equipmentStats, onOpenEquipment, onOpenBadges, onOpenLeaderboard, onOpenDailyQuests, onOpenArena, onEditName, onOpenBackup, onOpenProfile, t }) {
  const handleQuestCardClick = (universe) => {
    if (universe === 'arena') onOpenArena();
    else onStartQuest(universe);
  };

  return (
    <div className="hub-screen">
      <CharacterCard character={character} equipmentStats={equipmentStats} t={t} />
      
      <div className="hub-buttons">
        <button className="button button-edit-name" onClick={onEditName}>{t?.editName || '✏️ Éditer Nom'}</button>
        <button className="button button-equipment" onClick={onOpenEquipment}>{t?.equipment || '⚔️ Équipement'}</button>
        <button className="button button-badges" onClick={onOpenBadges}>{t?.badges || '🏆 Badges'} ({character.unlockedBadges?.length || 0})</button>
        <button className="button button-leaderboard" onClick={onOpenLeaderboard}>{t?.leaderboard || '🏅 Classement'}</button>
        <button className="button button-daily-quests" onClick={onOpenDailyQuests}>{t?.dailyQuests || '📅 Quêtes Quotidiennes'}</button>
        <button className="button button-backup" onClick={onOpenBackup}>{t?.saves || '💾 Sauvegardes'}</button>
        <button className="button button-profile" onClick={onOpenProfile}>{t?.profile || '📊 Profil'}</button>
      </div>
      
      <div className="quest-grid">
        <QuestCard universe="anime" character={character} onStart={handleQuestCardClick} t={t} />
        <QuestCard universe="programming" character={character} onStart={handleQuestCardClick} t={t} />
        <QuestCard universe="story" character={character} onStart={handleQuestCardClick} t={t} />
        <QuestCard universe="arena" character={character} onStart={handleQuestCardClick} t={t} />
      </div>
    </div>
  );
}
