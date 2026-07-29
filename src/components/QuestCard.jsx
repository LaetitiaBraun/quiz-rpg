import { UNIVERSE_CONFIG } from '../data/constants';
import { QUESTIONS_DB } from '../data/questionsDB';

export default function QuestCard({ universe, character, onStart, disabled }) {
  if (!character || !character.progress) return null;

  const config = UNIVERSE_CONFIG[universe];
  const completed = character.completedQuestions || {};

  // Calculer le nombre de questions réussies pour cet univers (tous niveaux)
  const countDone = (prefix) => {
    return Object.keys(completed).filter(k => k.startsWith(prefix + '_') && completed[k] === true).length;
  };

  let progressText = '';
  let progressPct = 0;

  if (universe === 'arena') {
    progressText = `${character.arenaWins || 0} victoires`;
  } else if (universe === 'story') {
    const storyDone = countDone('story');
    const totalStory = QUESTIONS_DB.story?.length || 15;
    progressText = `${storyDone} / ${totalStory} questions`;
    progressPct = (storyDone / totalStory) * 100;
  } else {
    // Pour anime et programming: compter toutes les questions réussies (tous niveaux)
    // Nouvelles clés: anime_easy_1, anime_medium_1, anime_hard_1
    // Anciennes clés: anime_1 (avant le changement de structure)
    const easyDone   = Object.keys(completed).filter(k => k.startsWith(`${universe}_easy_`)   && completed[k] === true).length;
    const mediumDone = Object.keys(completed).filter(k => k.startsWith(`${universe}_medium_`) && completed[k] === true).length;
    const hardDone   = Object.keys(completed).filter(k => k.startsWith(`${universe}_hard_`)   && completed[k] === true).length;
    // Anciennes clés format: "anime_1", "programming_3" etc.
    const oldDone    = Object.keys(completed).filter(k => {
      if (!k.startsWith(`${universe}_`)) return false;
      const suffix = k.slice(universe.length + 1);
      return /^\d+$/.test(suffix) && completed[k] === true;
    }).length;
    const totalDone  = easyDone + mediumDone + hardDone + oldDone;
    const totalAll   = (QUESTIONS_DB[`${universe}_easy`]?.length || 25) * 3;
    progressText = `${totalDone} / ${totalAll} questions`;
    progressPct = (totalDone / totalAll) * 100;
  }

  return (
    <div
      className="quest-card"
      onClick={() => !disabled && onStart(universe)}
      style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <div className="quest-icon">{config.icon}</div>
      <div className="quest-title">{config.title}</div>
      <div className="quest-description">{config.description}</div>

      {universe !== 'arena' && progressPct > 0 && (
        <div className="quest-progress-bar-mini">
          <div className="quest-progress-bar-fill-mini" style={{ width: `${progressPct}%` }} />
        </div>
      )}

      <div className="quest-progress">{progressText}</div>

      {disabled && <div className="quest-progress">En développement</div>}
    </div>
  );
}
