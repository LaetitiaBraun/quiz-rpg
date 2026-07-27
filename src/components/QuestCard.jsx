import { UNIVERSE_CONFIG } from '../data/constants';
import { QUESTIONS_DB } from '../data/questionsDB';

export default function QuestCard({ universe, character, onStart, disabled }) {
  if (!character || !character.progress) {
    return null;
  }

  const config = UNIVERSE_CONFIG[universe];
  const progress = character.progress[universe] || { completed: 0, difficulty: 1 };
  const totalQuestions = QUESTIONS_DB[universe]?.length || 0;

  const handleClick = () => {
    if (!disabled) {
      onStart(universe);
    }
  };

  return (
    <div 
      className="quest-card"
      onClick={handleClick}
      style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <div className="quest-icon">{config.icon}</div>
      <div className="quest-title">{config.title}</div>
      <div className="quest-description">{config.description}</div>
      
      {universe === 'arena' ? (
        <div className="quest-progress">
          {character.arenaWins || 0} victoires
        </div>
      ) : universe === 'story' ? (
        <div className="quest-progress">Chapitre {progress.chapter}</div>
      ) : (
        <div className="quest-progress">
          {progress.completed} / {totalQuestions} questions
        </div>
      )}
      
      {disabled && (
        <div className="quest-progress">En développement</div>
      )}
    </div>
  );
}
