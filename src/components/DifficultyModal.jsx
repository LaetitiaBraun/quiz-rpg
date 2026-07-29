import '../styles/DifficultyModal.css';

export default function DifficultyModal({ onSelectDifficulty, onCancel, universeName, character, questions = [] }) {
  const difficulties = [
    { level: 1, name: 'Facile',   emoji: '🟢', description: 'Questions basiques',   xpMultiplier: 0.5, color: '#5dcaa5' },
    { level: 2, name: 'Normal',   emoji: '🟡', description: 'Questions classiques', xpMultiplier: 1,   color: '#ffc107' },
    { level: 3, name: 'Difficile',emoji: '🔴', description: 'Questions avancées',   xpMultiplier: 1.5, color: '#ff6b6b' }
  ];

  // Calculer le statut de progression
  const completed = character?.completedQuestions || {};
  const total = questions.length;
  const doneCorrect = questions.filter(q => completed[`${universeName}_${q.id}`] === true).length;
  const doneFailed  = questions.filter(q => completed[`${universeName}_${q.id}`] === false).length;
  const unseen      = questions.filter(q => completed[`${universeName}_${q.id}`] === undefined).length;

  let statusMsg = null;
  let statusColor = '#7f9d8c';

  if (total > 0) {
    if (unseen === 0 && doneFailed > 0) {
      statusMsg = `✅ Tout vu ! ${doneFailed} question${doneFailed > 1 ? 's' : ''} ratée${doneFailed > 1 ? 's' : ''} à revoir`;
      statusColor = '#ff6b6b';
    } else if (unseen === 0 && doneFailed === 0) {
      statusMsg = `🏆 Parfait ! Toutes les questions réussies`;
      statusColor = '#5dcaa5';
    } else if (doneCorrect > 0 || doneFailed > 0) {
      statusMsg = `📍 Reprise à la question ${doneCorrect + doneFailed + 1} / ${total}`;
      statusColor = '#c9a961';
    }
  }

  return (
    <div className="difficulty-modal-overlay" onClick={onCancel}>
      <div className="difficulty-modal" onClick={(e) => e.stopPropagation()}>
        <div className="difficulty-header">
          <h2>Choisir la Difficulté</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        {statusMsg && (
          <div className="difficulty-status" style={{ color: statusColor }}>
            {statusMsg}
          </div>
        )}

        <div className="difficulty-grid">
          {difficulties.map((diff) => (
            <div
              key={diff.level}
              className="difficulty-card"
              onClick={() => onSelectDifficulty(diff.level)}
            >
              <div className="difficulty-emoji">{diff.emoji}</div>
              <h3>{diff.name}</h3>
              <p className="description">{diff.description}</p>
              <div className="xp-multiplier">{diff.xpMultiplier}x XP</div>
            </div>
          ))}
        </div>

        <div className="difficulty-info">
          <p>💡 Plus la difficulté est élevée, plus vous gagnez d'XP!</p>
        </div>
      </div>
    </div>
  );
}
