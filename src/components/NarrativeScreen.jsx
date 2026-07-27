import '../styles/NarrativeScreen.css';

export default function NarrativeScreen({ narrative, npc, onContinue }) {
  return (
    <div className="narrative-screen">
      <div className="narrative-background">
        {/* NPC Display */}
        {npc && (
          <div className="npc-section">
            <div className="npc-avatar">{getNPCEmoji(npc)}</div>
            <div className="npc-name">{npc}</div>
          </div>
        )}

        {/* Narrative Text */}
        <div className="narrative-text-box">
          <p className="narrative-text">{narrative}</p>
        </div>

        {/* Continue Button */}
        <button className="button button-continue" onClick={onContinue}>
          Continuer →
        </button>
      </div>
    </div>
  );
}

function getNPCEmoji(npc) {
  const emojis = {
    'Eldara la Sage': '🧙‍♀️',
    'Le Gardien Spectral': '👻',
    'Le Démon Ancien': '🔥',
    'Le Roi Libéré': '👑',
    'Eldara la Sage + Le Démon Ancien': '⚔️'
  };
  return emojis[npc] || '🧝';
}
