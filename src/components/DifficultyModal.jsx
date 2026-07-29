import '../styles/DifficultyModal.css';

export default function DifficultyModal({ onSelectDifficulty, onCancel, universeName, character, questionsEasy = [], questionsMedium = [], questionsHard = [] }) {

  const completed = character?.completedQuestions || {};

  // Compte les questions réussies pour un pool donné
  const countProgress = (questions, prefix) => {
    let done = 0;
    let failed = 0;
    questions.forEach(q => {
      const v = completed[`${prefix}_${q.id}`];
      // Aussi compter les anciennes clés sans suffixe (ex: anime_1)
      const vOld = completed[`${universeName}_${q.id}`];
      if (v === true || vOld === true) done++;
      else if (v === false) failed++;
    });
    return { done, failed, total: questions.length };
  };

  const isStory = universeName === 'story';

  // Pour la story, pas de niveaux de difficulté — une seule entrée
  const levels = isStory ? [
    { level: 1, name: 'Histoire', emoji: '📖', description: 'Campagne narrative', xpMultiplier: 1, color: '#7f77dd',
      stats: countProgress(questionsEasy, 'story') }
  ] : [
    { level: 1, name: 'Facile',    emoji: '🟢', description: 'Questions accessibles', xpMultiplier: 0.5, color: '#5dcaa5',
      stats: countProgress(questionsEasy,   `${universeName}_easy`) },
    { level: 2, name: 'Moyen',     emoji: '🟡', description: 'Connaissances solides',  xpMultiplier: 1,   color: '#ffc107',
      stats: countProgress(questionsMedium, `${universeName}_medium`) },
    { level: 3, name: 'Difficile', emoji: '🔴', description: 'Expert seulement !',      xpMultiplier: 1.5, color: '#ff6b6b',
      stats: countProgress(questionsHard,   `${universeName}_hard`) },
  ];

  return (
    <div className="difficulty-modal-overlay" onClick={onCancel}>
      <div className="difficulty-modal" onClick={(e) => e.stopPropagation()}>
        <div className="difficulty-header">
          <h2>{isStory ? 'Story Quest' : 'Choisir la Difficulté'}</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <div className="difficulty-grid" style={{ gridTemplateColumns: isStory ? '1fr' : 'repeat(3, 1fr)' }}>
          {levels.map((diff) => {
            const { done, failed, total } = diff.stats;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            const allDone = done === total;
            const hasFailed = failed > 0;

            return (
              <div
                key={diff.level}
                className={`difficulty-card ${allDone ? 'difficulty-card-complete' : ''}`}
                style={{ borderColor: diff.color }}
                onClick={() => onSelectDifficulty(diff.level)}
              >
                <div className="difficulty-emoji">{diff.emoji}</div>
                <h3 style={{ color: diff.color }}>{diff.name}</h3>
                <p className="description">{diff.description}</p>

                {/* Barre de progression */}
                <div className="diff-progress-bar">
                  <div
                    className="diff-progress-fill"
                    style={{ width: `${pct}%`, background: diff.color }}
                  />
                </div>

                {/* Stats */}
                <div className="diff-stats">
                  <span className="diff-done">{done} / {total}</span>
                  {hasFailed && <span className="diff-failed">⚠️ {failed} à revoir</span>}
                  {allDone && !hasFailed && <span className="diff-perfect">✓ Complété!</span>}
                </div>

                <div className="xp-multiplier">{diff.xpMultiplier}x XP</div>
              </div>
            );
          })}
        </div>

        <div className="difficulty-info">
          <p>💡 Plus la difficulté est élevée, plus vous gagnez d'XP!</p>
        </div>
      </div>
    </div>
  );
}
