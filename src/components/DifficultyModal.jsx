import '../styles/DifficultyModal.css';

export default function DifficultyModal({ onSelectDifficulty, onCancel, universeName, character, questionsEasy = [], questionsMedium = [], questionsHard = [], t }) {
  const completed = character?.completedQuestions || {};

  const countProgress = (questions, prefix, isLegacyFallback = false) => {
    let done = 0, failed = 0;
    questions.forEach(q => {
      const v = completed[`${prefix}_${q.id}`];
      const vOld = isLegacyFallback ? completed[`${universeName}_${q.id}`] : undefined;
      if (v === true || vOld === true) done++;
      else if (v === false && vOld !== true) failed++;
    });
    return { done, failed, total: questions.length };
  };

  const isStory = universeName === 'story';

  const levels = isStory ? [
    { level: 1, name: t?.storyTitle || 'Story Quest', emoji: '📖', description: t?.storyDesc || 'Campagne narrative', xpMultiplier: 1, color: '#7f77dd',
      stats: countProgress(questionsEasy, 'story') }
  ] : [
    { level: 1, name: t?.easy || 'Facile',    emoji: '🟢', description: t?.easyDesc || 'Questions accessibles', xpMultiplier: 0.5, color: '#5dcaa5',
      stats: countProgress(questionsEasy,   `${universeName}_easy`, true) },
    { level: 2, name: t?.medium || 'Moyen',   emoji: '🟡', description: t?.mediumDesc || 'Connaissances solides', xpMultiplier: 1, color: '#ffc107',
      stats: countProgress(questionsMedium, `${universeName}_medium`) },
    { level: 3, name: t?.hard || 'Difficile', emoji: '🔴', description: t?.hardDesc || 'Expert seulement !', xpMultiplier: 1.5, color: '#ff6b6b',
      stats: countProgress(questionsHard,   `${universeName}_hard`) },
  ];

  return (
    <div className="difficulty-modal-overlay" onClick={onCancel}>
      <div className="difficulty-modal" onClick={(e) => e.stopPropagation()}>
        <div className="difficulty-header">
          <h2>{isStory ? (t?.storyTitle || 'Story Quest') : (t?.choosesDifficulty || 'Choisir la Difficulté')}</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <div className={`difficulty-grid ${isStory ? 'difficulty-grid-story' : ''}`}>
          {levels.map((diff) => {
            const { done, failed, total } = diff.stats;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            const allDone = done === total;
            const hasFailed = failed > 0;
            return (
              <div key={diff.level} className={`difficulty-card ${allDone ? 'difficulty-card-complete' : ''}`}
                style={{ borderColor: diff.color }} onClick={() => onSelectDifficulty(diff.level)}>
                <div className="difficulty-emoji">{diff.emoji}</div>
                <h3 style={{ color: diff.color }}>{diff.name}</h3>
                <p className="description">{diff.description}</p>
                <div className="diff-progress-bar">
                  <div className="diff-progress-fill" style={{ width: `${pct}%`, background: diff.color }} />
                </div>
                <div className="diff-stats">
                  <span className="diff-done">{done} / {total}</span>
                  {hasFailed && <span className="diff-failed">⚠️ {failed} {t?.toReview || 'à revoir'}</span>}
                  {allDone && !hasFailed && <span className="diff-perfect">✓ {t?.completed || 'Complété!'}</span>}
                </div>
                <div className="xp-multiplier">{diff.xpMultiplier}x XP</div>
              </div>
            );
          })}
        </div>

        <div className="difficulty-info">
          <p>{t?.difficultyTip || '💡 Plus la difficulté est élevée, plus vous gagnez d\'XP!'}</p>
        </div>
      </div>
    </div>
  );
}
