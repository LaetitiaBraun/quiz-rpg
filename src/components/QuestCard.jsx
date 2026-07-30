import { UNIVERSE_CONFIG } from '../data/constants';
import { QUESTIONS_DB } from '../data/questionsDB';

export default function QuestCard({ universe, character, onStart, disabled, t }) {
  if (!character || !character.progress) return null;

  const config = UNIVERSE_CONFIG[universe];
  const completed = character.completedQuestions || {};

  const countDone = (prefix) =>
    Object.keys(completed).filter(k => k.startsWith(prefix + '_') && completed[k] === true).length;

  let progressText = '';
  let progressPct = 0;

  if (universe === 'arena') {
    progressText = `${character.arenaWins || 0} ${t?.victories || 'victoires'}`;
  } else if (universe === 'story') {
    const storyQuestions = QUESTIONS_DB.story || [];
    const maxAct = Math.max(...storyQuestions.map(q => q.act || 1));
    const currentChapter = character.progress?.story?.chapter || 1;
    const storyDone = countDone('story');
    progressText = `${t?.chapter || 'Chapitre'} ${currentChapter} / ${maxAct}`;
    progressPct = (storyDone / storyQuestions.length) * 100;
  } else {
    const easyDone   = Object.keys(completed).filter(k => k.startsWith(`${universe}_easy_`)   && completed[k] === true).length;
    const mediumDone = Object.keys(completed).filter(k => k.startsWith(`${universe}_medium_`) && completed[k] === true).length;
    const hardDone   = Object.keys(completed).filter(k => k.startsWith(`${universe}_hard_`)   && completed[k] === true).length;
    const oldDone    = Object.keys(completed).filter(k => {
      if (!k.startsWith(`${universe}_`)) return false;
      const suffix = k.slice(universe.length + 1);
      return /^\d+$/.test(suffix) && completed[k] === true;
    }).length;
    const totalDone = easyDone + mediumDone + hardDone + oldDone;
    const totalAll  = (QUESTIONS_DB[`${universe}_easy`]?.length || 25) * 3;
    progressText = `${totalDone} / ${totalAll} ${t?.questions || 'questions'}`;
    progressPct = (totalDone / totalAll) * 100;
  }

  return (
    <div
      className="quest-card"
      onClick={() => !disabled && onStart(universe)}
      style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <div className="quest-icon">{config.icon}</div>
      <div className="quest-title">{t ? (universe === 'anime' ? t.animeTitle : universe === 'programming' ? t.codeTitle : universe === 'story' ? t.storyTitle : t.arenaTitle2) : config.title}</div>
      <div className="quest-description">{t ? (universe === 'anime' ? t.animeDesc : universe === 'programming' ? t.codeDesc : universe === 'story' ? t.storyDesc : t.arenaDesc) : config.description}</div>

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
