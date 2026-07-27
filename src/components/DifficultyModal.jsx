import '../styles/DifficultyModal.css';

export default function DifficultyModal({ onSelectDifficulty, onCancel, universeName }) {
  const difficulties = [
    {
      level: 1,
      name: 'Facile',
      emoji: '🟢',
      description: 'Questions basiques',
      xpMultiplier: 0.5,
      color: '#5dcaa5'
    },
    {
      level: 2,
      name: 'Normal',
      emoji: '🟡',
      description: 'Questions classiques',
      xpMultiplier: 1,
      color: '#ffc107'
    },
    {
      level: 3,
      name: 'Difficile',
      emoji: '🔴',
      description: 'Questions avancées',
      xpMultiplier: 1.5,
      color: '#ff6b6b'
    }
  ];

  return (
    <div className="difficulty-modal-overlay" onClick={onCancel}>
      <div className="difficulty-modal" onClick={(e) => e.stopPropagation()}>
        <div className="difficulty-header">
          <h2>Choisir la Difficulté</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

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
              <div className="xp-multiplier">
                {diff.xpMultiplier}x XP
              </div>
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
