import { useState, useEffect } from 'react';
import '../styles/DailyQuestsScreen.css';
import { DAILY_QUESTS, checkDailyQuestCompletion, generateDailyQuests } from '../data/dailyQuestsDB';

export default function DailyQuestsScreen({ character, onBack, onClaimReward }) {
  const [quests, setQuests] = useState([]);
  const [claimedToday, setClaimedToday] = useState({});

  useEffect(() => {
    const initialQuests = DAILY_QUESTS.map(quest => ({
      ...quest,
      completed: checkDailyQuestCompletion(quest, character),
      currentProgress: getQuestProgress(quest, character)
    }));
    setQuests(initialQuests);

    const claimed = {};
    (character.dailyQuests?.completed || []).forEach(questId => {
      claimed[questId] = true;
    });
    setClaimedToday(claimed);
  }, [character]);

  const getQuestProgress = (quest, character) => {
    const progress = character.dailyQuests?.progress || {};
    if (quest.id === 'daily_1') return progress.correctAnswers || 0;
    if (quest.id === 'daily_2') return character.maxCombo || 0;
    if (quest.id === 'daily_3') return progress.storyAnswers || 0;
    if (quest.id === 'daily_4') return progress.codeAnswers || 0;
    if (quest.id === 'daily_5') return progress.animeAnswers || 0;
    return 0;
  };

  const handleClaimReward = (quest) => {
    setClaimedToday(prev => ({ ...prev, [quest.id]: true }));
    onClaimReward(quest);
  };

  const totalReward = quests.reduce((sum, quest) => {
    return sum + (quest.completed && !claimedToday[quest.id] ? quest.reward : 0);
  }, 0);

  return (
    <div className="daily-quests-screen">
      <button className="button button-back" onClick={onBack}>← Retour au Hub</button>

      <div className="daily-header">
        <h1>📅 Quêtes Quotidiennes</h1>
        <p className="reset-info">Reset à minuit</p>
      </div>

      <div className="reward-summary">
        <div className="total-reward">
          <span className="reward-label">Récompense totale</span>
          <span className="reward-value">⭐ {totalReward} XP</span>
        </div>
      </div>

      <div className="quests-list">
        {quests.map(quest => {
          const progressPct = Math.min((quest.currentProgress / quest.goal) * 100, 100);
          return (
            <div
              key={quest.id}
              className={`quest-item ${quest.completed ? 'completed' : 'incomplete'}`}
            >
              <div className="quest-info">
                <div className="quest-title">{quest.title}</div>
                <div className="quest-description">{quest.description}</div>
                <div className="quest-progress-bar">
                  <div className="quest-progress-fill" style={{ width: `${progressPct}%` }} />
                </div>
                <div className="quest-progress-text">
                  {Math.min(quest.currentProgress, quest.goal)} / {quest.goal}
                </div>
                <div className="quest-difficulty" style={{
                  color: quest.difficulty === 'Facile' ? '#5dcaa5' :
                         quest.difficulty === 'Moyen' ? '#c9a961' : '#d85a30'
                }}>
                  {quest.difficulty}
                </div>
              </div>

              <div className="quest-reward">
                <span className="reward-amount">⭐ {quest.reward} XP</span>
                {quest.completed ? (
                  claimedToday[quest.id] ? (
                    <div className="claimed-badge">✓ Claimée</div>
                  ) : (
                    <button
                      className="button button-claim"
                      onClick={() => handleClaimReward(quest)}
                    >
                      Claim
                    </button>
                  )
                ) : (
                  <div className="incomplete-badge">Pas finie</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="daily-info">
        <h3>💡 Conseil</h3>
        <p>Complète les quêtes quotidiennes pour gagner des XP supplémentaires et progresser plus vite!</p>
      </div>
    </div>
  );
}
